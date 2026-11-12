import {cp,mkdir,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const f of ['index.html','styles.css','site.css','glow.css','fx.js','app.js','data.js','icons.js','pay.js'])await cp(f,'dist/'+f);
await cp('assets','dist/assets',{recursive:true});
console.log('Built static website in dist/. Run npm start for the secure account and operations API.');
