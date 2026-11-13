// Payment instructions. Edit PAY_CONFIG before launch. Never commit PINs or secrets here.
export const PAY_CONFIG={
  // DRAFT placeholders: replace with the real, verified merchant codes issued by MTN / Airtel to the legal operator.
  mtn:{ussd:'*165*3#',merchantCode:null,name:'MTN Mobile Money'},
  airtel:{ussd:'*185#',merchantCode:null,name:'Airtel Money'},
  currency:'UGX',
  minimum:null // set the activation / top-up minimum once confirmed
};
const steps={
  mtn:[
    ['Dial the code','On the MTN number you want to pay from, dial <b class="ussd">*165*3#</b> and press call.'],
    ['Enter the merchant code','Type the Glorysake merchant code shown below, then press send.'],
    ['Enter the amount','Type the exact amount you wish to pay in UGX.'],
    ['Add your reference','Enter the phone number or email you registered with, so we can match your payment.'],
    ['Confirm the details','Check the merchant name, amount and reference on screen, then confirm.'],
    ['Approve with your PIN','Enter your MoMo PIN. Never share your PIN with anyone, including us.'],
    ['Keep the SMS','Save the confirmation SMS and its Transaction ID. You will need it below.']
  ],
  airtel:[
    ['Open Airtel Money','On your Airtel line dial <b class="ussd">*185#</b> and press call.'],
    ['Choose Make Payments','Select <b>Make Payments</b>, then <b>Pay Merchant</b> (Airtel Pay).'],
    ['Enter the merchant code','Type the Glorysake merchant code shown below.'],
    ['Enter the amount','Type the exact amount in UGX.'],
    ['Add your reference','Use the phone number or email you registered with.'],
    ['Approve with your PIN','Review the merchant name and amount, then enter your Airtel Money PIN.'],
    ['Keep the SMS','Save the confirmation SMS and its Transaction ID for the form below.']
  ]
};
export function payPage({nav,footer,icon,staticMode}){
  const panel=(k)=>{const c=PAY_CONFIG[k];return `<div class="pay-panel" role="tabpanel" id="panel-${k}" aria-labelledby="tab-${k}" data-panel="${k}" ${k==='airtel'?'hidden':''}>
  <div class="pay-brand ${k}"><img src="./assets/${k}-logo.svg" alt="" width="${k==='mtn'?96:120}" height="${k==='mtn'?48:31}" decoding="async"><div><small>Pay with</small><strong>${c.name}</strong></div></div>

  <div class="pay-code"><div><small>Dial</small><strong>${c.ussd}</strong></div><button class="copy" data-copy="${c.ussd}" type="button">Copy code</button></div>
  <div class="pay-code"><div><small>Merchant code <em class="draft">Draft</em></small><strong>${c.merchantCode||'Issued at launch'}</strong></div>${c.merchantCode?`<button class="copy" data-copy="${c.merchantCode}" type="button">Copy</button>`:''}</div>
  <ol class="pay-steps">${steps[k].map(([h,p],i)=>`<li style="--i:${i}"><span>${i+1}</span><div><h4>${h}</h4><p>${p}</p></div></li>`).join('')}</ol></div>`;};
  return `${nav()}<main id="main"><div class="g-page"><div class="g-wrap"><header class="g-page-head"><h1>How to pay</h1><p class="g-lead">A planning guide for future mobile money payments. No merchant code is active and no payment is required or accepted in this preview.</p></header>
  <section class="pay-grid"><div class="pay-card">
    <div class="pay-tabs" role="tablist" aria-label="Payment network"><button role="tab" id="tab-mtn" aria-controls="panel-mtn" class="active" data-tab="mtn" aria-selected="true"><i class="net-chip mtn"><img src="./assets/mtn-logo.svg" alt="" width="56" height="28" decoding="async"></i> MTN MoMo</button><button role="tab" id="tab-airtel" aria-controls="panel-airtel" tabindex="-1" data-tab="airtel" aria-selected="false"><i class="net-chip airtel"><img src="./assets/airtel-logo.svg" alt="" width="68" height="18" decoding="async"></i> Airtel Money</button></div>
    ${panel('mtn')}${panel('airtel')}
    <p class="fineprint tm-note">MTN, MTN MoMo and Airtel Money names and logos are trademarks of their respective owners and are shown only to identify the payment network. Glorysake is not affiliated with or endorsed by MTN or Airtel.</p>
    <div class="notice warn">Planning guide only. No merchant code or fee is active. Do not send money for this preview. Never share a PIN or OTP.</div>
  </div>
  <aside class="pay-side"><div class="panel"><h3>Preview payment tracking</h3><p class="muted">Try a labelled sample reference. This does not submit or confirm a real payment.</p><form id="pay-form" class="pay-form"><label>Sample reference<input name="txid" value="DEMO-TRY001" pattern="DEMO-[A-Za-z0-9-]{3,}" title="Use a sample reference starting DEMO-" required maxlength="40"></label><button class="btn primary" type="submit">Preview tracking</button><p class="fineprint" id="pay-status" role="status" aria-live="polite"></p></form><ol class="v-payment-timeline" id="payment-timeline" hidden><li>Submitted</li><li>Checking</li><li class="active">Needs attention</li></ol><p class="fineprint">A future Confirmed state will require verification by an authorised provider.</p></div><div class="panel safe"><h3>${icon('shield')} Stay safe</h3><ul><li>Never share your PIN or OTP.</li><li>Earnings are never guaranteed.</li><li>Keep every confirmation SMS.</li><li>Live confirmations are not enabled yet.</li></ul></div></aside></section></div></div></main>${footer()}`;
}
export function bindPay({api,toast,staticMode}){
  document.addEventListener('click',async e=>{
    const tab=e.target.closest('[data-tab]');if(tab){document.querySelectorAll('[data-tab]').forEach(b=>{const on=b===tab;b.classList.toggle('active',on);b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1});document.querySelectorAll('[data-panel]').forEach(p=>{p.hidden=p.dataset.panel!==tab.dataset.tab});}
    const cp=e.target.closest('[data-copy]');if(cp){try{await navigator.clipboard.writeText(cp.dataset.copy);cp.textContent='Copied ✓';setTimeout(()=>cp.textContent='Copy code',1800);}catch{toast('Copy failed. Select the text manually.');}}
  });
  document.addEventListener('keydown',e=>{const t=e.target.closest&&e.target.closest('[role=tab]');if(!t||!['ArrowLeft','ArrowRight'].includes(e.key))return;const tabs=[...document.querySelectorAll('[role=tab]')],n=tabs[(tabs.indexOf(t)+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];n.focus();n.click();});
  document.addEventListener('submit',async e=>{
    if(e.target.id!=='pay-form')return;e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),st=document.getElementById('pay-status');
    const ref=String(d.txid||'').trim();if(!/^DEMO-[A-Za-z0-9-]{3,}$/.test(ref)){st.textContent='Use a sample reference starting DEMO-. Do not enter a real transaction ID.';return;}st.textContent=`Sample ${ref}: needs attention. No provider is connected and no funds were submitted or confirmed.`;document.getElementById('payment-timeline').hidden=false;dispatchEvent(new CustomEvent('gs:payment-demo',{detail:{reference:ref,status:'Needs attention'}}));
  });
}
