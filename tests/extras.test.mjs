import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {tasks,faqs} from '../data.js';
import {glyphNames} from '../experience.js';
import {freshProgress,normaliseProgress} from '../progress.js';
import {SPIN_SEGMENTS,FIXTAP,checkChatMessage,chatRewardsToday,spinUsedToday,spinResult,msUntilNextDay,fixTapPassed,addSpinEvent,filterListings,validateListing,activityBreakdown,sampleListings,articles,sponsors,sponsorQuestion,melodies,clips,clipQuiz} from '../extras-data.js';

test('the four Bolvah-parity activities are registered with artwork and unique ids',()=>{
 for(const id of ['fixtap','ads','music','clips'])assert.ok(tasks.some(t=>t.id===id),id);
 assert.equal(new Set(tasks.map(t=>t.id)).size,tasks.length);
 for(const t of tasks)assert.ok(glyphNames[t.id],'glyph for '+t.id);
 for(const t of tasks)assert.ok(['Skills','Surveys','Games','Partners'].includes(t.category),t.id);
});

test('chat filter blocks personal details, secrets, links and money requests',()=>{
 assert.equal(checkChatMessage('Hello everyone, happy Monday!').ok,true);
 assert.equal(checkChatMessage('Hello everyone, happy Monday!').qualifies,true);
 assert.equal(checkChatMessage('hi').qualifies,false);
 for(const bad of ['call me on 0772 123 456','+256701234567 whatsapp','what is your PIN','send me your otp','visit www.example.com','https://x.test','send money first','pay the activation fee here',''.padEnd(281,'a'),' '])assert.equal(checkChatMessage(bad).ok,false,bad);
});

test('chat rewards count only own rewarded messages from today',()=>{
 const now=new Date('2026-11-16T10:00:00+03:00');
 const msgs=[{mine:true,rewarded:true,at:'2026-11-16T08:00:00+03:00'},{mine:true,rewarded:false,at:'2026-11-16T08:05:00+03:00'},{mine:true,rewarded:true,at:'2026-11-15T23:00:00+03:00'},{mine:false,rewarded:true,at:'2026-11-16T09:00:00+03:00'}];
 assert.equal(chatRewardsToday(msgs,now),1);
});

test('free spin is once per East Africa day and only awards listed practice points',()=>{
 for(const r of [0,.12,.5,.999999,1,-1,NaN]){const {index,points}=spinResult(r);assert.ok(index>=0&&index<SPIN_SEGMENTS.length);assert.equal(points,SPIN_SEGMENTS[index]);}
 assert.ok(Math.max(...SPIN_SEGMENTS)<=60,'events above 60 points would be discarded by normaliseProgress');
 const now=new Date('2026-11-16T23:30:00+03:00');
 assert.equal(spinUsedToday({lastSpin:'2026-11-16'},now),true);
 assert.equal(spinUsedToday({lastSpin:'2026-11-15'},now),false);
 assert.equal(msUntilNextDay(now),30*60000);
 const p=freshProgress();
 assert.equal(addSpinEvent(p,40,now),true);
 assert.equal(addSpinEvent(p,40,now),false);
 assert.equal(normaliseProgress(p).points,40);
});

test('Fix Tap pass rule needs enough fixes and few wrong taps',()=>{
 assert.equal(fixTapPassed(FIXTAP.pass,0),true);
 assert.equal(fixTapPassed(FIXTAP.pass-1,0),false);
 assert.equal(fixTapPassed(FIXTAP.pass+2,FIXTAP.maxMisses+1),false);
});

test('marketplace listings validate and filter safely',()=>{
 const ok=validateListing({title:'Weekend braiding at home',category:'Tailoring',price:'20000',unit:'per session',area:'Kajjansi',text:'Simple styles, bring your own extensions.'});
 assert.equal(ok.price,20000);
 assert.throws(()=>validateListing({...ok,price:'12.5'}));
 assert.throws(()=>validateListing({...ok,category:'Casino'}));
 assert.throws(()=>validateListing({...ok,text:'Call 0772123456 to book a session today'}));
 assert.equal(filterListings(sampleListings,{category:'Food'}).length,1);
 assert.equal(filterListings(sampleListings,{query:'MATHS'}).length,1);
 assert.equal(filterListings(sampleListings,{}).length,sampleListings.length);
});

test('content is complete and self-consistent',()=>{
 assert.ok(articles.length>=8);assert.equal(new Set(articles.map(a=>a.id)).size,articles.length);
 assert.ok(sponsors[sponsorQuestion.correct].offer.toLowerCase().includes('vegetable'));
 for(const m of melodies){const high=m.correct==='a'?m.a:m.b,low=m.correct==='a'?m.b:m.a;assert.ok(Math.min(...high)>Math.max(...low));}
 assert.equal(clips.length,clipQuiz.length);
 for(const q of clipQuiz)assert.ok(q.correct<q.a.length);
});

test('activity breakdown merges points and sample credits per activity',()=>{
 const rows=activityBreakdown([{id:'quiz',points:60},{id:'quiz',points:60},{id:'spin',points:20}],[{name:'The daily knowledge quiz',amount:700},{name:'Free spin',amount:200}],{quiz:'The daily knowledge quiz',spin:'Free spin'});
 const quiz=rows.find(r=>r.id==='quiz'),spin=rows.find(r=>r.id==='spin');
 assert.deepEqual([quiz.points,quiz.times,quiz.sample],[120,2,700]);
 assert.deepEqual([spin.points,spin.sample],[20,200]);
});

test('no live-money, casino, loan or activation-fee paths were introduced',async()=>{
 const src=(await readFile(new URL('../extras.js',import.meta.url),'utf8'))+(await readFile(new URL('../extras-data.js',import.meta.url),'utf8'));
 assert.doesNotMatch(src,/fetch\(|api\(/,'new modules stay device-local');
 assert.match(faqs.map(f=>f.join(' ')).join(' '),/no activation fee/i);
 const sw=await readFile(new URL('../sw.js',import.meta.url),'utf8'),build=await readFile(new URL('../scripts/build.mjs',import.meta.url),'utf8'),html=await readFile(new URL('../index.html',import.meta.url),'utf8');
 for(const f of ['extras.js','extras-data.js','extras.css']){assert.match(sw,new RegExp(f.replace('.','\\.')));assert.match(build,new RegExp(f.replace('.','\\.')));}
 assert.match(html,/extras\.css/);
});
