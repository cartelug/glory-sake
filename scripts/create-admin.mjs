import {openDatabase,hashPassword} from '../server.mjs';
import {randomUUID} from 'node:crypto';
import {createInterface} from 'node:readline/promises';
const rl=createInterface({input:process.stdin,output:process.stdout});
const email=(process.env.ADMIN_EMAIL||await rl.question('Operator email: ')).trim().toLowerCase();
const name=(process.env.ADMIN_NAME||await rl.question('Operator name: ')).trim();
const password=process.env.ADMIN_PASSWORD;
if(!password||password.length<16){console.error('Set ADMIN_PASSWORD in your local environment to a unique password of at least 16 characters. It is never written to source control.');rl.close();process.exit(1);}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!name){console.error('A valid operator name and email are required.');rl.close();process.exit(1);}
const db=openDatabase();const existing=db.prepare('SELECT id FROM users WHERE email=?').get(email);if(existing){console.error('Account already exists. No role or password was changed.');rl.close();db.close();process.exit(1);}
const id=randomUUID();db.prepare("INSERT INTO users(id,name,email,password_hash,country,role) VALUES(?,?,?,?,?,'admin')").run(id,name,email,await hashPassword(password),'UG');db.prepare('INSERT INTO audits(id,actor_id,action,entity_id) VALUES(?,?,?,?)').run(randomUUID(),id,'operator.bootstrapped',id);db.close();rl.close();console.log('Operator created. Sign in at /#/login.');
