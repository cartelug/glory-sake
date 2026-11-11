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
  const panel=(k)=>{const c=PAY_CONFIG[k];return `<div class="pay-panel" data-panel="${k}" ${k==='airtel'?'hidden':''}>
  <div class="pay-code"><div><small>DIAL</small><strong>${c.ussd}</strong></div><button class="copy" data-copy="${c.ussd}" type="button">Copy code</button></div>
  <div class="pay-code"><div><small>MERCHANT CODE <em class="draft">DRAFT</em></small><strong>${c.merchantCode||'Issued at launch'}</strong></div>${c.merchantCode?`<button class="copy" data-copy="${c.merchantCode}" type="button">Copy</button>`:''}</div>
  <ol class="pay-steps">${steps[k].map(([h,p],i)=>`<li style="--i:${i}"><span>${i+1}</span><div><h4>${h}</h4><p>${p}</p></div></li>`).join('')}</ol></div>`;};
  return `${nav()}<main id="main"><section class="page-hero"><div class="wrap"><span class="pill"><i></i> MOBILE MONEY</span><h1>Pay in<br><em>under a minute.</em></h1><p>Use MTN Mobile Money or Airtel Money. Follow the steps, keep your Transaction ID, then confirm it below.</p></div></section>
  <section class="section wrap pay-grid"><div class="pay-card" data-reveal>
    <div class="pay-tabs" role="tablist"><button role="tab" class="active" data-tab="mtn" aria-selected="true"><i class="dot mtn"></i> MTN MoMo</button><button role="tab" data-tab="airtel" aria-selected="false"><i class="dot airtel"></i> Airtel Money</button></div>
    ${panel('mtn')}${panel('airtel')}
    <div class="notice warn">Draft instructions. The merchant code and any fee are not final until the operator publishes them. Only pay to a code shown on this official page, and never pay anyone who asks you to send money to a personal number.</div>
  </div>
  <aside class="pay-side" data-reveal><div class="panel"><h3>I have paid</h3><p class="muted">Send your Transaction ID so the payment can be matched and confirmed manually.</p>
    <form id="pay-form" class="pay-form" novalidate><label>Network<select name="network"><option>MTN MoMo</option><option>Airtel Money</option></select></label><label>Amount (UGX)<input name="amount" inputmode="numeric" placeholder="e.g. 20000" required></label><label>Transaction ID<input name="txid" placeholder="From the confirmation SMS" required minlength="6"></label><label>Your phone or email<input name="who" required placeholder="Registered phone or email"></label>
    <button class="btn primary" type="submit">Submit for confirmation ${icon('arrow')}</button><p class="fineprint" id="pay-status" role="status"></p></form></div>
    <div class="panel safe"><h3>${icon('shield')} Stay safe</h3><ul><li>Never share your PIN or OTP.</li><li>Earnings are never guaranteed.</li><li>Keep every confirmation SMS.</li><li>Confirmation is manual and may take time.</li></ul></div></aside></section></main>${footer()}`;
}
export function bindPay({api,toast,staticMode}){
  document.addEventListener('click',async e=>{
    const tab=e.target.closest('[data-tab]');if(tab){document.querySelectorAll('[data-tab]').forEach(b=>{const on=b===tab;b.classList.toggle('active',on);b.setAttribute('aria-selected',on)});document.querySelectorAll('[data-panel]').forEach(p=>{p.hidden=p.dataset.panel!==tab.dataset.tab});}
    const cp=e.target.closest('[data-copy]');if(cp){try{await navigator.clipboard.writeText(cp.dataset.copy);cp.textContent='Copied ✓';setTimeout(()=>cp.textContent='Copy code',1800);}catch{toast('Copy failed. Select the text manually.');}}
  });
  document.addEventListener('submit',async e=>{
    if(e.target.id!=='pay-form')return;e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f)),st=document.getElementById('pay-status');
    if(!/^\d{3,9}$/.test(String(d.amount).replace(/[,\s]/g,''))||String(d.txid).trim().length<6||!String(d.who).trim()){st.textContent='Please complete every field with valid details.';return;}
    if(staticMode){st.textContent='The preview site cannot receive payment confirmations. Please contact support through the live service.';return;}
    try{const r=await api('support',{name:'Payment confirmation',email:/@/.test(d.who)?d.who:'payments@invalid.local',subject:'Payment confirmation',message:`Network: ${d.network}\nAmount: UGX ${d.amount}\nTransaction ID: ${d.txid}\nContact: ${d.who}`});st.textContent=`Received. Reference ${r.id}. We will confirm after verifying the Transaction ID.`;f.reset();}catch(err){st.textContent=err.message;}
  });
}
