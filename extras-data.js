// Content and pure helpers for the community, spin, marketplace, library and new practice activities.
// Nothing in this module represents money. Sample amounts are virtual and device-local.
import {dayKey} from './progress.js?v=20261116';

export const SPIN_SEGMENTS=[10,25,15,40,20,60,30,50];
export const SPIN_SAMPLE_RATE=10; // virtual UGX per practice point, demo only
export const CHAT_DAILY_REWARDED=5;
export const CHAT_SAMPLE_REWARD=100;
export const FIXTAP={seconds:20,pass:12,maxMisses:3,size:16};

export const sponsors=[
{name:'Kijani Lamp Co.',line:'Solar reading lamps for evening study.',offer:'Lamps that charge all day and light all night.',tone:'lime'},
{name:'Shamba Box',line:'Fresh vegetables, packed weekly.',offer:'A weekly vegetable box from nearby farms.',tone:'peach'},
{name:'Somo Tutors',line:'Short evening revision sessions.',offer:'Small-group maths and English revision.',tone:'sky'}
];
export const sponsorQuestion={q:'Which spotlight offered a weekly vegetable box?',correct:1};

export const melodies=[
{a:[262,294,330,349],b:[523,587,659,698],correct:'b'},
{a:[784,740,698,659],b:[392,370,349,330],correct:'a'},
{a:[330,392,330,392],b:[660,784,660,784],correct:'b'}
];

export const clips=[
{title:'Your PIN is yours alone.',lines:['A message says “support” needs your PIN.','Real support never asks for it.','Keep it. Every time.'],tone:'violet'},
{title:'Check the name first.',lines:['Before you send, the screen shows a name.','Read it. Does it match?','If not, cancel. It costs nothing.'],tone:'peach'},
{title:'Small and steady.',lines:['Set aside a little every week.','Even small amounts add up.','Saving is a habit, not a lump sum.'],tone:'lime'}
];
export const clipQuiz=[
{q:'Who should know your mobile money PIN?',a:['Support staff','Only you','A trusted group admin'],correct:1},
{q:'What should you check before confirming a transfer?',a:['The recipient name','The weather','Your data bundle'],correct:0},
{q:'What makes saving work best?',a:['One big deposit','A regular small habit','Borrowing first'],correct:1}
];

export const chatSeed=[
{id:'seed-1',author:'Glorysake Guide',team:true,text:'Welcome to the lounge. Say hello, share a tip, or ask how an activity works.',at:'2026-11-16T06:00:00.000Z'},
{id:'seed-2',author:'Glorysake Guide',team:true,text:'Today’s prompt: what is one small habit that saves you time on busy days?',at:'2026-11-16T06:05:00.000Z'},
{id:'seed-3',author:'Glorysake Guide',team:true,text:'Reminder: never post phone numbers, PINs, OTPs or payment requests here.',at:'2026-11-16T06:10:00.000Z'}
];

export const marketCategories=['Design','Tutoring','Repairs','Errands','Food','Tailoring'];
export const sampleListings=[
{id:'s1',title:'Logo touch-ups and simple flyers',category:'Design',price:25000,unit:'per design',seller:'Sample seller',area:'Kampala',text:'Clean up an existing logo or lay out a one-page flyer. Two rounds of changes.'},
{id:'s2',title:'P.7 maths revision, one hour',category:'Tutoring',price:15000,unit:'per session',seller:'Sample seller',area:'Wakiso',text:'Fractions, percentages and word problems with practice sheets.'},
{id:'s3',title:'Phone screen protector fitting',category:'Repairs',price:8000,unit:'per phone',seller:'Sample seller',area:'Entebbe Road',text:'Bubble-free fitting while you wait. Bring your own protector or buy one there.'},
{id:'s4',title:'Market errands, same day',category:'Errands',price:5000,unit:'per trip',seller:'Sample seller',area:'Kampala',text:'Send a list before noon. Receipts photographed for every purchase.'},
{id:'s5',title:'Home-cooked lunch boxes',category:'Food',price:10000,unit:'per box',seller:'Sample seller',area:'Bwebajja',text:'Rice or matooke, beans, greens and a fruit. Order a day ahead.'},
{id:'s6',title:'Trouser hemming and repairs',category:'Tailoring',price:7000,unit:'per item',seller:'Sample seller',area:'Najjanankumbi',text:'Hems, zips and small tears. Ready in two days.'}
];

export const libraryCategories=['Safety','Money basics','Work skills'];
export const articles=[
{id:'pin',category:'Safety',minutes:2,title:'Your PIN, your OTP, your rules',body:['Your mobile money PIN and any one-time code (OTP) are the keys to your money. Nobody legitimate needs them: not support staff, not an agent, not a relative calling from a new number.','If someone asks for either, stop the conversation. Call the official customer line from the number printed on your SIM pack or the provider’s website, not a number they give you.','Change your PIN if you think someone has seen it. Use one that is not your birth year or 1234.']},
{id:'pay-to-earn',category:'Safety',minutes:3,title:'How to spot a pay-to-earn trap',body:['Some apps ask you to pay an “activation”, “upgrade” or “VIP” fee before you can earn, then reward you for bringing in people who also pay. When earnings depend mainly on new members paying in, the money usually runs out and the late joiners lose.','Ask three questions: Who pays for the rewards? What happens if nobody new joins? Is the company registered, and can you find its address?','Glorysake does not charge an activation fee and does not pay for recruiting people.']},
{id:'wrong-send',category:'Safety',minutes:2,title:'Sent money to the wrong number?',body:['Act fast. Call your provider’s official customer line and ask them to reverse or hold the transaction. Have the transaction ID, amount and time ready.','Do not call back a stranger who says they sent money to you by mistake. Check your own balance and statement first. A fake “reversal” SMS is a common trick.']},
{id:'budget',category:'Money basics',minutes:3,title:'A simple weekly budget',body:['Write what comes in this week, then list the must-pays: transport, food, rent share, school costs. What is left is what you can plan with.','Pick one small amount to set aside first, before spending on extras. Moving it on the same day each week makes it automatic.','Review on Sunday. If something went over, adjust next week rather than giving up.']},
{id:'saving-groups',category:'Money basics',minutes:3,title:'Saving groups: questions to ask first',body:['Village savings groups and SACCOs can help people save together. Before you join, ask how the money is kept, who signs for withdrawals, and whether records are shared with every member.','A good group has written rules, regular meetings and a clear process when a member leaves. Avoid any group that promises fixed high returns.']},
{id:'data',category:'Money basics',minutes:2,title:'Make your data bundle last longer',body:['Turn off auto-play for videos in your social apps and download updates on Wi-Fi only.','Check which apps use data in the background in your phone settings and restrict the heavy ones. Lite versions of apps can use far less data.']},
{id:'cv',category:'Work skills',minutes:3,title:'A one-page CV that gets read',body:['Start with your name, phone and email. Then a two-line summary of what you do well.','List experience with action words: “served 60 customers a day”, “kept stock records”. Numbers make it real.','Keep it to one page. Ask a friend to check spelling before you send it.']},
{id:'message-client',category:'Work skills',minutes:2,title:'Writing a clear message to a client',body:['Say who you are, what you are offering and the price in the first three lines.','Give one clear next step: “Reply YES to book Thursday.” Short messages get faster answers.','Confirm agreements in writing, even on WhatsApp, so both sides remember the same thing.']}
];

const PHONE=/(?:\+?\d[\s-]?){9,}/;
const SECRET=/\b(pin|otp|password|passcode)\b/i;
const LINK=/(https?:\/\/|www\.)/i;
const MONEY_ASK=/\b(send me|send money|pay me|activation fee|deposit for)\b/i;
export function checkChatMessage(raw){const text=String(raw??'').replace(/\s+/g,' ').trim();if(text.length<2)return {ok:false,error:'Write a message first.'};if(text.length>280)return {ok:false,error:'Keep messages under 280 characters.'};if(PHONE.test(text))return {ok:false,error:'Phone numbers are not allowed in the lounge. Keep personal details private.'};if(SECRET.test(text))return {ok:false,error:'Messages mentioning PINs, OTPs or passwords are blocked for your safety.'};if(LINK.test(text))return {ok:false,error:'Links are not allowed in the lounge.'};if(MONEY_ASK.test(text))return {ok:false,error:'Requests for money or fees are not allowed in the lounge.'};return {ok:true,text,qualifies:text.length>=15};}

export function chatRewardsToday(messages,now=new Date()){const day=dayKey(now);return messages.filter(m=>m.mine&&m.rewarded&&dayKey(new Date(m.at))===day).length;}

export function spinUsedToday(state,now=new Date()){return Boolean(state&&state.lastSpin===dayKey(now));}
export function spinResult(random=Math.random()){const r=Math.min(Math.max(Number(random)||0,0),0.999999);const index=Math.floor(r*SPIN_SEGMENTS.length);return {index,points:SPIN_SEGMENTS[index]};}
export function msUntilNextDay(now=new Date()){const day=dayKey(now);for(let m=1;m<=26*60;m++){const t=new Date(now.getTime()+m*60000);if(dayKey(t)!==day)return m*60000;}return 0;}

export function fixTapPassed(fixed,misses){return fixed>=FIXTAP.pass&&misses<=FIXTAP.maxMisses;}

export function addSpinEvent(progress,points,now=new Date()){const day=dayKey(now);if(progress.events.some(e=>e.id==='spin'&&e.day===day))return false;const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Kampala',hour:'numeric',hourCycle:'h23'}).format(now));progress.events.push({id:'spin',category:'Games',day,points,hour,perfect:false});progress.points+=points;return true;}

export function filterListings(list,{category='All',query=''}={}){const q=query.trim().toLowerCase();return list.filter(l=>(category==='All'||l.category===category)&&(!q||(l.title+' '+l.text+' '+l.area).toLowerCase().includes(q)));}
export function validateListing(d){const title=String(d.title??'').trim(),text=String(d.text??'').trim(),area=String(d.area??'').trim(),price=Number(d.price);if(title.length<6||title.length>70)throw Error('Use a title of 6 to 70 characters.');if(!marketCategories.includes(d.category))throw Error('Choose a category.');if(!Number.isInteger(price)||price<500||price>5000000)throw Error('Enter a whole price between UGX 500 and UGX 5,000,000.');if(text.length<20||text.length>400)throw Error('Describe the offer in 20 to 400 characters.');if(area.length<2||area.length>40)throw Error('Add a general area, such as a town or neighbourhood.');const check=checkChatMessage(title+' '+text);if(!check.ok)throw Error(check.error.replace('the lounge','listings'));return {title,category:d.category,price,text,area,unit:String(d.unit||'per item').slice(0,20)};}

export function activityBreakdown(events,transactions,names){const rows=new Map();for(const e of events){const r=rows.get(e.id)||{id:e.id,name:names[e.id]||e.id,points:0,sample:0,times:0};r.points+=e.points;r.times++;rows.set(e.id,r);}const byName=Object.fromEntries(Object.entries(names).map(([id,n])=>[n,id]));for(const t of transactions||[]){const id=byName[t.name]||t.name;const r=rows.get(id)||{id,name:names[id]||t.name,points:0,sample:0,times:0};r.sample+=Number(t.amount)||0;rows.set(id,r);}return [...rows.values()].sort((a,b)=>b.points+b.sample/10-(a.points+a.sample/10));}
