// Glorysake effects layer. Pure enhancement: the site works without it.
// 1. Glow field: a low-resolution canvas of drifting light, sunset at the top of a page, night at the bottom.
// 2. Preloader, scroll progress, pointer-lit cards, route fade, pause control, confetti.
(()=>{
const root=document.documentElement;
const sysReduce=matchMedia('(prefers-reduced-motion:reduce)');
let off=sysReduce.matches;
try{if(localStorage.getItem('gs-motion')==='off')off=true;}catch{}
root.classList.toggle('motion-off',off);

/* ---------- preloader ---------- */
const pre=document.getElementById('preloader');
if(pre){
  const bar=pre.querySelector('.pl-bar b');let p=0,loaded=document.readyState==='complete',minDone=false,closed=false;
  const close=()=>{if(closed)return;closed=true;clearInterval(iv);pre.classList.add('done');root.classList.add('ready');setTimeout(()=>pre.remove(),700);};
  addEventListener('load',()=>{loaded=true;});
  setTimeout(()=>{minDone=true;},off?0:1100);
  const iv=setInterval(()=>{p=(loaded&&minDone)?1:Math.min(.9,p+Math.random()*.09+.03);if(bar)bar.style.transform=`scaleX(${p})`;if(p>=1)setTimeout(close,220);},110);
  setTimeout(close,5000);
}else root.classList.add('ready');
addEventListener('pageshow',e=>{if(e.persisted)location.reload();});

/* ---------- glow field ---------- */
const cv=document.createElement('canvas');cv.id='glow';cv.setAttribute('aria-hidden','true');document.body.prepend(cv);
const g=cv.getContext('2d');
let W=0,H=0,scale=6,dim=1,prog=0,mx=.5,my=.3,tx=.5,ty=.3,last=0,running=false;
// warm: 1 = sunset light (fades as you scroll), 0 = night light (grows as you scroll)
const orbs=[
  {c:'255,176,74', r:.62,px:.82,py:.08,ax:.10,ay:.07,sp:.00013,ph:0,  a:.5,warm:1},
  {c:'255,104,84', r:.50,px:.60,py:.42,ax:.16,ay:.10,sp:.00010,ph:1.7,a:.3,warm:1},
  {c:'226,92,150', r:.46,px:.12,py:.30,ax:.10,ay:.14,sp:.00008,ph:3.1,a:.26,warm:1},
  {c:'124,92,255', r:.60,px:.14,py:.78,ax:.14,ay:.10,sp:.00011,ph:.6, a:.46,warm:0},
  {c:'70,110,255', r:.52,px:.86,py:.86,ax:.12,ay:.12,sp:.00009,ph:2.4,a:.36,warm:0},
  {c:'170,120,255',r:.40,px:.50,py:.60,ax:.22,ay:.16,sp:.00007,ph:4.2,a:.26,warm:0}
];
let lights=[];
function size(){
  scale=innerWidth<720?4:3;dim=innerWidth<720?.72:1;W=cv.width=Math.max(60,Math.ceil(innerWidth/scale));H=cv.height=Math.max(60,Math.ceil(innerHeight/scale));
  const n=innerWidth<720?18:34;
  lights=Array.from({length:n},(_,i)=>({x:Math.random(),y:Math.random(),r:2.5+Math.random()*5.5,tw:.0006+Math.random()*.0012,ph:Math.random()*6.3,vy:.000006+Math.random()*.000012,c:i%5===0?'255,205,130':i%3===0?'200,180,255':'255,255,255'}));
  draw(performance.now());
}
function draw(t){
  g.globalCompositeOperation='source-over';g.fillStyle='#0e0920';g.fillRect(0,0,W,H);
  g.globalCompositeOperation='lighter';
  const m=Math.max(W,H);
  for(const o of orbs){
    const x=(o.px+Math.sin(t*o.sp+o.ph)*o.ax+(mx-.5)*.05)*W,y=(o.py+Math.cos(t*o.sp*1.3+o.ph)*o.ay+(my-.5)*.05-prog*.12)*H,R=o.r*m;
    const a=o.a*dim*(o.warm?1-.72*prog:.42+.58*prog);
    const gr=g.createRadialGradient(x,y,0,x,y,R);gr.addColorStop(0,`rgba(${o.c},${a})`);gr.addColorStop(.55,`rgba(${o.c},${a*.32})`);gr.addColorStop(1,`rgba(${o.c},0)`);
    g.fillStyle=gr;g.fillRect(0,0,W,H);
  }
  // pointer light
  {const x=mx*W,y=my*H,R=m*.2,gr=g.createRadialGradient(x,y,0,x,y,R);gr.addColorStop(0,'rgba(255,214,150,.2)');gr.addColorStop(1,'rgba(255,214,150,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);}
  // city lights
  const base=.35+.65*prog;
  for(const l of lights){
    const y=((l.y-t*l.vy)%1+1)%1*H,x=l.x*W,a=(.1+.5*Math.abs(Math.sin(t*l.tw+l.ph)))*base,R=l.r/scale*2;
    const gr=g.createRadialGradient(x,y,0,x,y,R);gr.addColorStop(0,`rgba(${l.c},${a})`);gr.addColorStop(1,`rgba(${l.c},0)`);
    g.fillStyle=gr;g.fillRect(x-R,y-R,R*2,R*2);
  }
}
function loop(t){
  if(!running)return;
  if(t-last>32){last=t;mx+=(tx-mx)*.06;my+=(ty-my)*.06;draw(t);}
  requestAnimationFrame(loop);
}
const start=()=>{if(off||document.hidden||running)return;running=true;requestAnimationFrame(loop);};
const stop=()=>{running=false;};
addEventListener('resize',size);
document.addEventListener('visibilitychange',()=>{document.hidden?stop():start();});
if(matchMedia('(hover:hover) and (pointer:fine)').matches)addEventListener('pointermove',e=>{tx=e.clientX/innerWidth;ty=e.clientY/innerHeight;},{passive:true});
size();start();

/* ---------- scroll: progress bar + time of day ---------- */
const bar=document.createElement('div');bar.id='progress';bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);
let ticking=false;
const onScroll=()=>{ticking=false;const max=root.scrollHeight-innerHeight;prog=max>40?Math.min(1,Math.max(0,scrollY/max)):0;bar.style.transform=`scaleX(${prog})`;const h=document.querySelector('.public-header');if(h)h.classList.toggle('scrolled',scrollY>20);if(!running)draw(performance.now());};
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll);}},{passive:true});

/* ---------- route fade + keep state in sync after each render ---------- */
const app=document.getElementById('app');
const syncToggle=()=>{const b=document.querySelector('[data-motion]');if(b){b.setAttribute('aria-pressed',String(off));b.textContent=off?'Resume animations':'Pause animations';}};
new MutationObserver(()=>{app.classList.remove('page-in');void app.offsetWidth;app.classList.add('page-in');syncToggle();onScroll();}).observe(app,{childList:true});

/* ---------- pause control (WCAG 2.2.2) ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest&&e.target.closest('[data-motion]');if(!b)return;
  off=!off;root.classList.toggle('motion-off',off);try{localStorage.setItem('gs-motion',off?'off':'on');}catch{}
  syncToggle();off?stop():start();
});

/* ---------- cards lit by the pointer ---------- */
document.addEventListener('pointermove',e=>{
  const c=e.target.closest&&e.target.closest('.n-card');if(!c)return;
  const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
},{passive:true});

/* ---------- confetti when a practice task is completed ---------- */
let cc,cx,parts=[],raf=0;
function step(){
  cx.clearRect(0,0,cc.width,cc.height);
  parts=parts.filter(p=>p.l>0&&p.y<cc.height+20);
  for(const p of parts){p.vy+=.38;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;p.l-=.008;cx.save();cx.globalAlpha=Math.max(0,p.l);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore();}
  if(parts.length)raf=requestAnimationFrame(step);else{raf=0;cx.clearRect(0,0,cc.width,cc.height);}
}
addEventListener('fx:confetti',()=>{
  if(off)return;
  if(!cc){cc=document.createElement('canvas');cc.id='confetti';cc.setAttribute('aria-hidden','true');document.body.appendChild(cc);cx=cc.getContext('2d');}
  cc.width=innerWidth;cc.height=innerHeight;
  const cols=['#ffc45e','#ff8a5c','#b9a4ff','#63e2a6','#ffffff'];
  for(let i=0;i<100;i++)parts.push({x:innerWidth/2,y:innerHeight*.6,vx:(Math.random()-.5)*16,vy:-Math.random()*17-4,s:Math.random()*7+4,c:cols[i%cols.length],r:Math.random()*6,vr:(Math.random()-.5)*.3,l:1});
  if(!raf)raf=requestAnimationFrame(step);
});
})();
