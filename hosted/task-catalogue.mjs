export const CATALOGUE = [
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
