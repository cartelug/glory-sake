// Small effects layer. The site works without it.
// Only effect kept from the old design: confetti when a member finishes a practice task (fired by app.js).
(()=>{
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
let cv,cx,parts=[],raf=0;
function step(){
  cx.clearRect(0,0,cv.width,cv.height);
  parts=parts.filter(p=>p.l>0&&p.y<cv.height+20);
  for(const p of parts){p.vy+=.38;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;p.l-=.008;cx.save();cx.globalAlpha=Math.max(0,p.l);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore();}
  if(parts.length)raf=requestAnimationFrame(step);else{raf=0;cx.clearRect(0,0,cv.width,cv.height);}
}
addEventListener('fx:confetti',()=>{
  if(reduce)return;
  if(!cv){cv=document.createElement('canvas');cv.id='confetti';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);cx=cv.getContext('2d');}
  cv.width=innerWidth;cv.height=innerHeight;
  const cols=['#5b3fd6','#b7a8ff','#17734a','#ffcb05','#1a1433'];
  for(let i=0;i<90;i++)parts.push({x:innerWidth/2,y:innerHeight*.6,vx:(Math.random()-.5)*16,vy:-Math.random()*17-4,s:Math.random()*7+4,c:cols[i%cols.length],r:Math.random()*6,vr:(Math.random()-.5)*.3,l:1});
  if(!raf)raf=requestAnimationFrame(step);
});
})();
