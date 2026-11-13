import {cp,mkdir,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const f of ['index.html','styles.css','site.css','glow.css','fx.js','app.js','data.js','icons.js','pay.js','progress.js','experience.js','upgrades.js','activity-content.js','i18n.js','visuals.css','manifest.webmanifest','sw.js','offline.html'])await cp(f,'dist/'+f);
await cp('assets','dist/assets',{recursive:true,filter:source=>!/(glyphs|levels|badges|backgrounds)\/[^/]+\.png$/.test(source)});
console.log('Built static website in dist/. Run npm start for the secure account and operations API.');
