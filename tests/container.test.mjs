import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,cp,rm} from 'node:fs/promises';
import {globSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,basename} from 'node:path';
import {pathToFileURL} from 'node:url';

test('Docker COPY source payload boots the account server and includes offline assets',async()=>{
 const stage=await mkdtemp(join(tmpdir(),'glorysake-container-'));let server;
 try{
  const docker=await readFile('Dockerfile','utf8');
  for(const line of docker.split('\n').filter(l=>l.startsWith('COPY '))){const tokens=line.split(/\s+/).slice(1),dest=tokens.pop();for(const pattern of tokens)for(const source of globSync(pattern)){const target=dest==='./'?join(stage,basename(source)):join(stage,dest);await cp(source,target,{recursive:true});}}
  const {createApp}=await import(pathToFileURL(join(stage,'server.mjs')).href);({server}=createApp({databasePath:':memory:'}));await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port;
  assert.equal((await(await fetch(url+'/api/health')).json()).ok,true);
  for(const path of ['/offline.html','/manifest.webmanifest','/work-ui.js','/assets/favicon.png'])assert.equal((await fetch(url+path)).status,200,path);
 }finally{if(server)await new Promise(r=>server.close(r));await rm(stage,{recursive:true,force:true});}
});
