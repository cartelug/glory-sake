// Visual effects layer. Pure enhancement: the site works without it.
(()=>{
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const mk=(tag,id,cls)=>{const e=document.createElement(tag);if(id)e.id=id;if(cls)e.className=cls;document.body.appendChild(e);return e;};
const bar=mk('div','scrollbar'),route=mk('div','routebar'),top=mk('button','totop');top.type='button';top.setAttribute('aria-label','Back to top');top.textContent='↑';
const glow=fine&&!reduce?mk('div','cursor-glow'):null;
/* header height var + scroll progress + parallax */
let tick=false;const hdr=()=>{const h=document.querySelector('.public-header');document.documentElement.style.setProperty('--hh',(h?h.offsetHeight:76)+'px');};
const onScroll=()=>{tick=false;const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${max>0?Math.min(1,y/max):0})`;top.classList.toggle('show',y>700);const hh=document.querySelector('.public-header');if(hh)hh.classList.toggle('scrolled',y>20);document.documentElement.style.setProperty('--sy',Math.min(y,1200));};
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll);}},{passive:true});
addEventListener('resize',hdr);top.addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
/* cursor glow + magnetic buttons */
if(glow){addEventListener('pointermove',e=>{glow.style.transform=`translate(${e.clientX-200}px,${e.clientY-200}px)`;glow.style.opacity=1;},{passive:true});document.addEventListener('mouseleave',()=>glow.style.opacity=0);
document.addEventListener('pointermove',e=>{const b=e.target.closest&&e.target.closest('.btn.primary,.btn.light');document.querySelectorAll('.btn.mag').forEach(x=>{if(x!==b){x.style.translate='';x.classList.remove('mag');}});if(b){const r=b.getBoundingClientRect();b.classList.add('mag');b.style.translate=`${(e.clientX-r.left-r.width/2)*.18}px ${(e.clientY-r.top-r.height/2)*.28}px`;}},{passive:true});}
/* ripple */
document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('.btn,.copy,.pay-tabs button');if(!b||reduce)return;const r=b.getBoundingClientRect(),s=document.createElement('i');s.className='ripple';const d=Math.max(r.width,r.height)*2;s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.classList.add('has-ripple');b.appendChild(s);setTimeout(()=>s.remove(),700);});
/* route change loader */
let first=true;addEventListener('hashchange',()=>{hdr();route.classList.remove('go');void route.offsetWidth;route.classList.add('go');const a=document.getElementById('app');a.classList.remove('page-in');void a.offsetWidth;a.classList.add('page-in');setTimeout(hdr,60);});
/* back/forward cache: always replay the preloader */
addEventListener('pageshow',e=>{if(e.persisted)location.reload();});
/* confetti */
let cv,cx,parts=[],raf;
function confetti(){if(reduce)return;if(!cv){cv=mk('canvas','confetti');cx=cv.getContext('2d');}cv.width=innerWidth;cv.height=innerHeight;const cols=['#7c5ce9','#ab98f9','#5eead4','#a3e635','#f9a8d4','#ffcb05'];for(let i=0;i<110;i++)parts.push({x:innerWidth/2,y:innerHeight*.6,vx:(Math.random()-.5)*16,vy:-Math.random()*17-4,g:.38,s:Math.random()*7+4,c:cols[i%6],r:Math.random()*6,vr:(Math.random()-.5)*.4,l:1});if(!raf)raf=requestAnimationFrame(step);}
function step(){cx.clearRect(0,0,cv.width,cv.height);parts=parts.filter(p=>p.l>0&&p.y<cv.height+20);parts.forEach(p=>{p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;p.l-=.008;cx.save();cx.globalAlpha=Math.max(0,p.l);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore();});if(parts.length)raf=requestAnimationFrame(step);else{raf=0;cx.clearRect(0,0,cv.width,cv.height);}}
addEventListener('fx:confetti',confetti);
/* hero particles */
function particles(host){if(reduce||host.querySelector('canvas.hero-fx'))return;const c=document.createElement('canvas');c.className='hero-fx';c.setAttribute('aria-hidden','true');host.prepend(c);const g=c.getContext('2d');let w,h,dots=[],vis=true,mx=-999,my=-999;
const size=()=>{const dpr=Math.min(devicePixelRatio||1,2);w=host.clientWidth;h=host.clientHeight;c.width=w*dpr;c.height=h*dpr;g.setTransform(dpr,0,0,dpr,0,0);const n=Math.round(Math.min(70,w*h/16000));dots=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.8+.6}));};size();addEventListener('resize',size);
host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;},{passive:true});
new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis)loop();}).observe(host);
function loop(){if(!vis||!host.isConnected)return;g.clearRect(0,0,w,h);for(const d of dots){d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>w)d.vx*=-1;if(d.y<0||d.y>h)d.vy*=-1;const dm=Math.hypot(d.x-mx,d.y-my);if(dm<120){d.x+=(d.x-mx)/dm*1.2;d.y+=(d.y-my)/dm*1.2;}g.fillStyle='#c7b9ffaa';g.beginPath();g.arc(d.x,d.y,d.r,0,6.3);g.fill();}
for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){const a=dots[i],b=dots[j],dd=Math.hypot(a.x-b.x,a.y-b.y);if(dd<110){g.strokeStyle=`rgba(171,152,249,${.22*(1-dd/110)})`;g.lineWidth=.7;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();}}requestAnimationFrame(loop);}loop();}
const app=document.getElementById('app');
const scan=()=>{const h=document.querySelector('.hero-x');if(h)particles(h);hdr();onScroll();};
new MutationObserver(scan).observe(app,{childList:true});scan();
})();
