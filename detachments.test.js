import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const load=name=>JSON.parse(readFileSync(new URL(name,import.meta.url))),data=load('./detachments.json'),db=load('./database.json');
test('every source-listed detachment is indexed for every faction',()=>{
 assert.equal(data.coverage.length,db.factions.length);assert.equal(data.detachments.length,328);
 assert.deepEqual(new Set(data.coverage.map(c=>c.factionId)),new Set(db.factions.map(f=>f.id)));
 for(const c of data.coverage){assert.deepEqual(c.unmatched,[]);assert.equal(c.imported,c.listed);assert.equal(data.detachments.filter(d=>d.factionId===c.factionId).length,c.listed);assert.match(c.sourceSha256,/^[a-f0-9]{64}$/);}
 assert.equal(new Set(data.detachments.map(d=>d.id)).size,data.detachments.length);
});
test('all names and costs link to the correct faction source',()=>{
 for(const d of data.detachments){assert.ok(db.factions.some(f=>f.id===d.factionId));assert.ok(d.name);assert.ok(d.editionEvidence);assert.ok([10,11,null].includes(d.edition));assert.ok(['standard','boarding-actions'].includes(d.mode));assert.ok(d.detachmentPoints===null||Number.isInteger(d.detachmentPoints));assert.ok(d.rules.length,d.name);
 for(const r of [d,...d.rules,...d.sections,...d.enhancements,...d.stratagems]){const url=new URL(r.sourceUrl||r.url);assert.equal(url.protocol,'https:');assert.equal(url.hostname,'wahapedia.ru');assert.equal(url.pathname,`/wh40k11ed/factions/${d.factionId}/`);assert.ok(url.hash);assert.ok(r.name);}
 }
});
test('edition separation, priority faction costs and chapter aliases survive import',()=>{
 const infantry=data.detachments.find(d=>d.name==='Armoured Infantry');assert.equal(infantry.factionId,'astra-militarum');assert.equal(infantry.detachmentPoints,2);assert.equal(infantry.forceDisposition,'Take and Hold');assert.equal(infantry.enhancements.length,4);assert.equal(infantry.stratagems.length,6);
 assert.ok(data.detachments.some(d=>d.factionId==='necrons'&&d.edition===11));
 assert.ok(data.detachments.some(d=>d.name==='Gladius Task Force'));assert.ok(data.detachments.some(d=>d.name==='Inner Circle Task Force'));assert.ok(data.detachments.some(d=>d.name==='Kauyon'));
 assert.equal(data.detachments.filter(d=>d.edition===10).length,59);assert.ok(data.detachments.filter(d=>d.edition===10).every(d=>d.mode==='boarding-actions'));assert.equal(data.detachments.filter(d=>d.factionId==='space-marines').length,57);
});
