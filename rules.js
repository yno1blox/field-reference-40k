export function normalizeRule(name){return name.toLowerCase().replace(/[\[\]]/g,'').replace(/[‐‑–—]/g,'-').replace(/\s+/g,' ').trim();}
export function findCoreRule(rules,name){const n=normalizeRule(name);return rules.find(r=>normalizeRule(r.name)===n)||rules.filter(r=>r.id!=='scout-move').sort((a,b)=>b.name.length-a.name.length).find(r=>{const base=normalizeRule(r.name);return n.startsWith(base)&&/^(?:\s+\d|\s+d\d|\s*[:(]|-)/.test(n.slice(base.length));});}
export function resolveAbility(core,reference,unit,ability){
 // Bespoke datasheet text takes precedence; core definitions fill generic named entries.
 if(ability.text)return {type:'unit',rule:ability};
 const c=unit.edition===11?findCoreRule(core,ability.name):null;
 if(c)return {type:'core',rule:c};
 const ref=reference.find(r=>r.id===ability.glossaryId);
 return ref?{type:'reference',rule:ref}:null;
}
