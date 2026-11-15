import {randomUUID, randomInt} from 'node:crypto';

// Server-owned, versioned practice work. No payment, reward amount or ledger posting.
const CATALOGUE = [
  {id:'account-survey',version:1,title:'Everyday habits survey',kind:'survey',minutes:4,
   instructions:'Choose both answers and explain your preference in at least 20 characters. Do not include personal or sensitive information.',
   fields:[{id:'discovery',label:'How do you usually discover new products?',choices:['Friends and family','Social media','Shops and markets','Online search']},{id:'priority',label:'What matters most when choosing a product?',choices:['Quality','Price','Recommendations','Convenience']}],textLabel:'Tell us why',minLength:20},
  {id:'account-images',version:1,title:'Image quality observations',kind:'review',minutes:3,
   instructions:'Look at the sample image. Describe at least two observations about lighting, focus, framing or colour in 20–1000 characters. An operator reviews the explanation.',
   image:'./assets/community.webp',textLabel:'Your two observations',minLength:20},
  {id:'account-quiz',version:1,title:'Digital safety check',kind:'quiz',minutes:3,
   instructions:'Answer five questions. Four correct answers pass. Your answers are scored on the server; the result is saved to your account.',passScore:4,
   questions:[
    {id:'private-code',prompt:'Someone asks for a mobile-money PIN to confirm a task. What should you do?',choices:['Keep the PIN private and report the request','Send the PIN','Send half the PIN','Post the PIN in a group'],correct:0},
    {id:'preview-money',prompt:'What does a sample balance in a practice preview represent?',choices:['A virtual example with no cash value','A verified bank deposit','A guaranteed payout','A loan approval'],correct:0},
    {id:'task-rules',prompt:'When should you read the completion and review rules?',choices:['Before starting the activity','Only after a rejection','After requesting a withdrawal','There is no need'],correct:0},
    {id:'unexpected-link',prompt:'An unexpected message links to a login page. What is the safer next step?',choices:['Open the official site independently','Enter your password immediately','Share the link as verified','Disable your security settings'],correct:0},
    {id:'strong-login',prompt:'Which combination helps protect an account?',choices:['A unique passphrase and two-factor authentication','A shared short password','An OTP posted publicly','Reusing a compromised password'],correct:0}
   ]}
];
const fail=(message,status=400)=>Object.assign(new Error(message),{status});
const dayFormatter=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Kampala',year:'numeric',month:'2-digit',day:'2-digit'});
function dayKey(now){const p=Object.fromEntries(dayFormatter.formatToParts(new Date(now)).map(p=>[p.type,p.value]));return `${p.year}-${p.month}-${p.day}`;}
const boundedText=(value,min,max,label)=>{if(typeof value!=='string'||value.trim().length<min||value.length>max)throw fail(`${label} must be ${min}–${max} characters.`);return value.trim();};
function publicSpec(spec){const {questions,...rest}=spec;return {...rest,...(questions?{questionCount:questions.length}:{}),mode:'practice',cashValue:0,dailyLimit:1,attemptMinutes:30};}
function challengeFor(spec){if(spec.kind!=='quiz')return null;return spec.questions.map(q=>{const choices=q.choices.map((text,i)=>({id:String(i),text}));for(let i=choices.length-1;i>0;i--){const j=randomInt(i+1);[choices[i],choices[j]]=[choices[j],choices[i]];}return {id:q.id,prompt:q.prompt,choices,correct:String(q.correct)};});}
function safeChallenge(challenge){return challenge?.map(({correct,...q})=>q);}

export function initializeWork(db){
 db.exec(`
 CREATE TABLE IF NOT EXISTS work_task_versions(id TEXT PRIMARY KEY,task_id TEXT NOT NULL,version INTEGER NOT NULL,spec_json TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,UNIQUE(task_id,version));
 CREATE TRIGGER IF NOT EXISTS work_versions_no_update BEFORE UPDATE ON work_task_versions BEGIN SELECT RAISE(ABORT,'Task versions are immutable'); END;
 CREATE TRIGGER IF NOT EXISTS work_versions_no_delete BEFORE DELETE ON work_task_versions BEGIN SELECT RAISE(ABORT,'Task versions are immutable'); END;
 CREATE TABLE IF NOT EXISTS work_attempts(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,task_id TEXT NOT NULL,version_id TEXT NOT NULL REFERENCES work_task_versions(id),day_key TEXT NOT NULL,challenge_json TEXT,started_at INTEGER NOT NULL,expires_at INTEGER NOT NULL,UNIQUE(user_id,task_id,day_key));
 CREATE TABLE IF NOT EXISTS work_claims(id TEXT PRIMARY KEY,attempt_id TEXT NOT NULL UNIQUE REFERENCES work_attempts(id) ON DELETE CASCADE,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,task_id TEXT NOT NULL,version_id TEXT NOT NULL REFERENCES work_task_versions(id),evidence_json TEXT NOT NULL,status TEXT NOT NULL CHECK(status IN ('pending','approved','rejected','appealed')),score INTEGER,reason TEXT NOT NULL DEFAULT '',appeal_reason TEXT,revision INTEGER NOT NULL DEFAULT 1,created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS work_reviews(id TEXT PRIMARY KEY,claim_id TEXT NOT NULL REFERENCES work_claims(id) ON DELETE CASCADE,reviewer_id TEXT REFERENCES users(id) ON DELETE SET NULL,phase TEXT NOT NULL CHECK(phase IN ('automatic','initial','appeal')),decision TEXT NOT NULL CHECK(decision IN ('approved','rejected')),reason TEXT NOT NULL,created_at INTEGER NOT NULL);
 CREATE INDEX IF NOT EXISTS work_claims_member ON work_claims(user_id);
 CREATE INDEX IF NOT EXISTS work_claims_status ON work_claims(status);
 CREATE INDEX IF NOT EXISTS work_reviews_claim ON work_reviews(claim_id);
 `);
 const insert=db.prepare('INSERT OR IGNORE INTO work_task_versions(id,task_id,version,spec_json) VALUES(?,?,?,?)');
 for(const spec of CATALOGUE){const id=spec.id+'-v'+spec.version,json=JSON.stringify(spec);insert.run(id,spec.id,spec.version,json);if(db.prepare('SELECT spec_json FROM work_task_versions WHERE id=?').get(id)?.spec_json!==json)throw Error('Task specification changed without a new version: '+id);}
}

export function createWorkEngine({db,audit,clock=Date.now}){
 const transaction=fn=>{db.exec('BEGIN IMMEDIATE');try{const value=fn();db.exec('COMMIT');return value;}catch(e){db.exec('ROLLBACK');throw e;}};
 const version=id=>{const row=db.prepare('SELECT * FROM work_task_versions WHERE id=?').get(id);if(!row)throw fail('Task version not found.',404);return JSON.parse(row.spec_json);};
 function claimView(row,operator=false){const spec=version(row.version_id);return {id:row.id,attemptId:row.attempt_id,taskId:row.task_id,title:spec.title,version:spec.version,status:row.status,evidence:JSON.parse(row.evidence_json),score:row.score,questionCount:spec.questions?.length??null,reason:row.reason,appealReason:row.appeal_reason,revision:row.revision,createdAt:row.created_at,updatedAt:row.updated_at,mode:'practice',cashValue:0,...(operator?{memberId:row.user_id}:{}),reviews:db.prepare('SELECT phase,decision,reason,created_at FROM work_reviews WHERE claim_id=? ORDER BY rowid').all(row.id)};}
 function ownedAttempt(id,user){const a=db.prepare('SELECT * FROM work_attempts WHERE id=? AND user_id=?').get(id,user.id);if(!a)throw fail('Attempt not found.',404);return a;}
 function attemptView(a){const spec=version(a.version_id),claim=db.prepare('SELECT * FROM work_claims WHERE attempt_id=?').get(a.id);return {id:a.id,task:publicSpec(spec),dayKey:a.day_key,startedAt:a.started_at,expiresAt:a.expires_at,serverNow:clock(),status:claim?'submitted':clock()>=a.expires_at?'expired':'in_progress',questions:safeChallenge(JSON.parse(a.challenge_json||'null')),claim:claim?claimView(claim):null};}
 function evidenceFor(spec,challenge,input){if(!input||typeof input!=='object'||Array.isArray(input))throw fail('Send the activity answers.');if(spec.kind==='quiz'){
   if(!Array.isArray(input.answers)||input.answers.length!==challenge.length)throw fail('Answer every question.');
   const result=challenge.map(q=>{const matching=input.answers.filter(a=>a&&a.questionId===q.id);if(matching.length!==1||typeof matching[0].choiceId!=='string'||!q.choices.some(c=>c.id===matching[0].choiceId))throw fail('Choose one valid answer for every question.');return {questionId:q.id,choiceId:matching[0].choiceId};});
   return {answers:result};
  }
  const evidence={text:boundedText(input.text,spec.minLength,1000,'Explanation')};
  if(spec.kind==='survey')for(const f of spec.fields){if(!f.choices.includes(input[f.id]))throw fail('Choose a valid '+f.label.toLowerCase());evidence[f.id]=input[f.id];}
  return evidence;
 }
 function listClaims(user,query,operator){const status=query.get('status')||'all';if(!['all','pending','approved','rejected','appealed'].includes(status))throw fail('Choose a valid submission status.');const cursor=query.get('cursor');if(cursor&&(!/^\d+$/.test(cursor)||!Number.isSafeInteger(Number(cursor))||Number(cursor)<1))throw fail('Invalid page cursor.');const where=[],args=[];if(!operator){where.push('user_id=?');args.push(user.id);}if(status!=='all'){where.push('status=?');args.push(status);}if(cursor){where.push('rowid<?');args.push(Number(cursor));}const rows=db.prepare(`SELECT rowid AS cursor,* FROM work_claims ${where.length?'WHERE '+where.join(' AND '):''} ORDER BY rowid DESC LIMIT 51`).all(...args),page=rows.slice(0,50);return {claims:page.map(c=>claimView(c,operator)),nextCursor:rows.length>50?String(page.at(-1).cursor):null,mode:'practice',cashValue:0};}
 return {
 export(userId){return db.prepare('SELECT * FROM work_claims WHERE user_id=? ORDER BY rowid').all(userId).map(c=>claimView(c));},
 route({path,method,user,data={},query=new URLSearchParams()}){
  if(path.startsWith('/api/admin/work/')&&user.role!=='admin')throw fail('Operator access required.',403);
  if(path==='/api/work/tasks'&&method==='GET')return {status:200,body:{tasks:CATALOGUE.map(t=>{const a=db.prepare('SELECT * FROM work_attempts WHERE user_id=? AND task_id=? AND day_key=?').get(user.id,t.id,dayKey(clock()));return {...publicSpec(t),attempt:a?{id:a.id,status:attemptView(a).status}:null};}),mode:'practice',cashValue:0}};
  if(path==='/api/work/attempts'&&method==='POST'){
   const spec=CATALOGUE.find(t=>t.id===data.taskId);if(!spec)throw fail('Activity not found.',404);
   const result=transaction(()=>{const day=dayKey(clock()),existing=db.prepare('SELECT * FROM work_attempts WHERE user_id=? AND task_id=? AND day_key=?').get(user.id,spec.id,day);if(existing)return {status:200,body:attemptView(existing)};const now=clock(),id=randomUUID();db.prepare('INSERT INTO work_attempts(id,user_id,task_id,version_id,day_key,challenge_json,started_at,expires_at) VALUES(?,?,?,?,?,?,?,?)').run(id,user.id,spec.id,spec.id+'-v'+spec.version,day,JSON.stringify(challengeFor(spec)),now,now+30*60000);audit(user.id,'work.attempt_started',id);return {status:201,body:attemptView(ownedAttempt(id,user))};});return result;
  }
  const attemptMatch=path.match(/^\/api\/work\/attempts\/([a-f0-9-]{36})(\/submit)?$/);
  if(attemptMatch&&method==='GET'&&!attemptMatch[2])return {status:200,body:attemptView(ownedAttempt(attemptMatch[1],user))};
  if(attemptMatch&&method==='POST'&&attemptMatch[2])return transaction(()=>{
   const a=ownedAttempt(attemptMatch[1],user),existing=db.prepare('SELECT * FROM work_claims WHERE attempt_id=?').get(a.id);if(existing)return {status:200,body:{claim:claimView(existing),duplicate:true}};
   if(clock()>=a.expires_at)throw fail('This attempt expired. Your next daily attempt opens tomorrow in East Africa time.',409);
   const spec=version(a.version_id),challenge=JSON.parse(a.challenge_json||'null'),evidence=evidenceFor(spec,challenge,data.evidence);let score=null,status='pending',reason='';
   if(spec.kind==='quiz'){score=challenge.filter(q=>evidence.answers.some(a=>a.questionId===q.id&&a.choiceId===q.correct)).length;status=score>=spec.passScore?'approved':'rejected';reason=`Server score: ${score}/${challenge.length}. ${spec.passScore} correct answers are required. Practice only; no cash reward.`;}
   const id=randomUUID(),now=clock();db.prepare('INSERT INTO work_claims(id,attempt_id,user_id,task_id,version_id,evidence_json,status,score,reason,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').run(id,a.id,user.id,spec.id,a.version_id,JSON.stringify(evidence),status,score,reason,now,now);
   if(score!==null)db.prepare('INSERT INTO work_reviews(id,claim_id,reviewer_id,phase,decision,reason,created_at) VALUES(?,?,NULL,?,?,?,?)').run(randomUUID(),id,'automatic',status,reason,now);
   audit(user.id,'work.submitted',id);return {status:201,body:{claim:claimView(db.prepare('SELECT * FROM work_claims WHERE id=?').get(id)),duplicate:false}};
  });
  if(path==='/api/work/claims'&&method==='GET')return {status:200,body:listClaims(user,query,false)};
  if(path==='/api/admin/work/claims'&&method==='GET')return {status:200,body:listClaims(user,query,true)};
  const claimMatch=path.match(/^\/api\/(admin\/)?work\/claims\/([a-f0-9-]{36})$/);
  if(claimMatch&&method==='GET'){const operator=Boolean(claimMatch[1]),c=operator?db.prepare('SELECT * FROM work_claims WHERE id=?').get(claimMatch[2]):db.prepare('SELECT * FROM work_claims WHERE id=? AND user_id=?').get(claimMatch[2],user.id);if(!c)throw fail('Submission not found.',404);return {status:200,body:{claim:claimView(c,operator)}};}
  const appealMatch=path.match(/^\/api\/work\/claims\/([a-f0-9-]{36})\/appeal$/);
  if(appealMatch&&method==='POST')return transaction(()=>{const c=db.prepare('SELECT * FROM work_claims WHERE id=? AND user_id=?').get(appealMatch[1],user.id);if(!c)throw fail('Submission not found.',404);if(c.status!=='rejected'||c.appeal_reason!==null)throw fail('Only a rejected submission can be appealed, once.',409);const reason=boundedText(data.reason,20,1000,'Appeal explanation');db.prepare("UPDATE work_claims SET status='appealed',appeal_reason=?,revision=revision+1,updated_at=? WHERE id=?").run(reason,clock(),c.id);audit(user.id,'work.appealed',c.id);return {status:200,body:{claim:claimView(db.prepare('SELECT * FROM work_claims WHERE id=?').get(c.id))}};});
  const reviewMatch=path.match(/^\/api\/admin\/work\/claims\/([a-f0-9-]{36})\/review$/);
  if(reviewMatch&&method==='POST')return transaction(()=>{const c=db.prepare('SELECT * FROM work_claims WHERE id=?').get(reviewMatch[1]);if(!c)throw fail('Submission not found.',404);if(c.user_id===user.id)throw fail('You cannot review your own submission.',403);if(!['pending','appealed'].includes(c.status))throw fail('This submission already has a decision.',409);if(!Number.isSafeInteger(data.expectedRevision)||data.expectedRevision!==c.revision)throw fail('This submission changed. Refresh the review queue before deciding.',409);if(!['approved','rejected'].includes(data.decision))throw fail('Choose approve or reject.');const reason=boundedText(data.reason,10,1000,'Decision reason'),phase=c.status==='appealed'?'appeal':'initial';
   if(phase==='appeal'&&db.prepare("SELECT id FROM work_reviews WHERE claim_id=? AND reviewer_id=? AND phase='initial'").get(c.id,user.id))throw fail('An appeal needs a different operator from the initial reviewer.',403);
   db.prepare('INSERT INTO work_reviews(id,claim_id,reviewer_id,phase,decision,reason,created_at) VALUES(?,?,?,?,?,?,?)').run(randomUUID(),c.id,user.id,phase,data.decision,reason,clock());db.prepare('UPDATE work_claims SET status=?,reason=?,revision=revision+1,updated_at=? WHERE id=?').run(data.decision,reason,clock(),c.id);audit(user.id,'work.'+phase+'_'+data.decision,c.id);return {status:200,body:{claim:claimView(db.prepare('SELECT * FROM work_claims WHERE id=?').get(c.id),true)}};
  });
  throw fail('Activity route not found.',404);
 }
 };
}
