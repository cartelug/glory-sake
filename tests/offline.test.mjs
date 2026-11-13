import {test} from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import vm from 'node:vm';
const source=await readFile(new URL('../sw.js',import.meta.url),'utf8');
async function worker(){const events=new Map(),stores=new Map(),scope='https://preview.example.test/glorysake/',key=x=>new URL(typeof x==='string'?x:x.url,scope).href;
 const cacheFor=name=>{if(!stores.has(name))stores.set(name,new Map());const map=stores.get(name);return {addAll:async files=>{for(const f of files)map.set(key(f),new Response('cached '+f));},put:async(req,res)=>map.set(key(req),res.clone()),match:async(req,options={})=>{const k=key(req);const hit=[...map].find(([stored])=>options.ignoreSearch?stored.split('?')[0]===k.split('?')[0]:stored===k);return hit?.[1].clone();}};};
 const caches={open:async name=>cacheFor(name),keys:async()=>[...stores.keys()],delete:async name=>stores.delete(name)};
 const self={registration:{scope},location:{origin:new URL(scope).origin},clients:{claim:async()=>{}},skipWaiting(){},addEventListener:(name,handler)=>events.set(name,handler)};
 vm.runInNewContext(source,{self,caches,URL,Response,fetch:async()=>{throw Error('offline');}});
 let installed;events.get('install')({waitUntil:p=>installed=p});await installed;
 async function request(path,mode='cors'){let response;events.get('fetch')({request:{url:new URL(path,scope).href,method:'GET',mode},respondWith:p=>response=p,waitUntil:p=>p.catch(()=>{})});return response?await response:undefined;}
 return {request,stores,events};
}
test('offline navigation falls back to the cached public practice shell',async()=>{const w=await worker(),r=await w.request('achievements','navigate');assert.equal(r.status,200);assert.equal(await r.text(),'cached ./index.html');});
test('versioned language and UI modules resolve from the offline cache',async()=>{const w=await worker();for(const path of ['i18n.js?v=20261113','upgrades.js?v=20261113'])assert.match(await(await w.request(path)).text(),/cached/);});
test('private account and payment APIs are never intercepted by the cache',async()=>{const w=await worker();for(const path of ['api/account','api/wallet','api/support'])assert.equal(await w.request(path),undefined);});
test('cache cleanup preserves other applications',async()=>{const w=await worker();w.stores.set('another-app',new Map());w.stores.set('glorysake-_glorysake_-old',new Map());let activated;w.events.get('activate')({waitUntil:p=>activated=p});await activated;assert.ok(w.stores.has('another-app'));assert.ok(!w.stores.has('glorysake-_glorysake_-old'));});
