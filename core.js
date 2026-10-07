export function defaultSelection(unit) {
  return Object.fromEntries((unit.wargear?.slots || []).map(s=>[s.id,s.default]));
}
export function validateSelection(unit, selection) {
  if(unit.wargear?.status!=='verified') return ['Wargear has not been verified.'];
  if(unit.wargear.modelScope!=='single-model' || unit.wargear.constraints?.length) return ['This ruleset requires an unsupported validator. Configuration is disabled.'];
  if(!selection || typeof selection!=='object' || Array.isArray(selection))return ['Invalid selection.'];
  const errors=[];
  for(const s of unit.wargear.slots) if(!s.options.some(o=>o.id===selection[s.id]))errors.push(`Choose a legal option for ${s.label}.`);
  for(const key of Object.keys(selection))if(!unit.wargear.slots.some(s=>s.id===key))errors.push(`Unknown slot: ${key}.`);
  return errors;
}
export function equipment(unit,selection) {
  if(validateSelection(unit,selection).length) return null;
  const counts={};
  for(const s of unit.wargear.slots)for(const e of s.options.find(o=>o.id===selection[s.id]).equipment)counts[e.id]=(counts[e.id]||0)+e.quantity;
  return counts;
}
export function cost(unit,selection,ordinal=1) {
  if(!Number.isInteger(ordinal)||ordinal<1)return null;
  const counts=equipment(unit,selection);if(!counts)return null;
  const tier=unit.points?.tiers.find(t=>ordinal>=t.from&&(t.to===null||ordinal<=t.to));if(!tier)return null;
  return tier.points+Object.entries(counts).reduce((n,[id,q])=>n+(unit.points.equipmentCosts[id]||0)*q,0);
}
export function loadoutIssue(unit,saved){
  if(!unit)return ['Unit is no longer available.'];
  if(saved.revision!==unit.revision)return ['Source revision changed. Review and re-save this loadout.'];
  return validateSelection(unit,saved.selection);
}
export function search(db,query){
  const q=query.trim().toLocaleLowerCase();if(!q)return [];
  const hits=[];
  for(const u of db.units){
    if((u.name+' '+u.keywords.join(' ')).toLocaleLowerCase().includes(q))hits.push({name:u.name,kind:'Unit',href:`#unit/${u.id}`,unit:u.name});
    for(const w of u.weapons)if((w.name+' '+w.abilityNames.join(' ')).toLocaleLowerCase().includes(q))hits.push({name:w.name,kind:'Weapon',unit:u.name,href:`#unit/${u.id}/weapon/${w.id}`});
    for(const r of u.abilities)if((r.name+' '+(r.text||'')).toLocaleLowerCase().includes(q))hits.push({name:r.name,kind:'Rule',unit:u.name,href:`#unit/${u.id}/rule/${r.id}`});
  }
  for(const group of ['armyRules','detachments','enhancements','stratagems'])for(const r of db[group]||[])if((r.name+' '+(r.text||'')).toLocaleLowerCase().includes(q))hits.push({name:r.name,kind:group,unit:'Faction rules',href:`#rule/${group}/${r.id}`});
  return hits;
}
export function validateDatabase(db){
  const errors=[];if(db.schemaVersion!==1||db.edition!==11)errors.push('Unsupported schema or edition.');
  const ids=new Set();const sources=new Map(db.sources.map(s=>[s.id,s]));
  for(const u of db.units){
    if(ids.has(u.id))errors.push(`Duplicate unit ${u.id}`);ids.add(u.id);
    if(u.dataStatus!=='requires-verification'&&u.edition!==11&&!u.legends)errors.push(`Unapproved older non-Legends record: ${u.id}`);
    if(!sources.has(u.sourceId)||sources.get(u.sourceId).edition!==u.edition)errors.push(`Unverified edition provenance: ${u.id}`);
    if(typeof u.legends!=='boolean')errors.push(`Missing Legends classification: ${u.id}`);
    const weapons=new Set();
    for(const w of u.weapons){if(weapons.has(w.id))errors.push(`Duplicate weapon: ${u.id}/${w.id}`);weapons.add(w.id);if(!sources.has(w.sourceId)||Object.values(w.stats).some(x=>typeof x!=='string'||!x))errors.push(`Missing weapon data: ${u.id}/${w.id}`);}
    const equipmentIds=new Set(u.weapons.map(w=>w.equipmentId));
    for(const slot of u.wargear?.slots||[])for(const option of slot.options)for(const e of option.equipment)if(!equipmentIds.has(e.id)||!Number.isInteger(e.quantity)||e.quantity<1)errors.push(`Invalid equipment option: ${u.id}/${e.id}`);
    if(u.wargear?.status==='verified')errors.push(...validateSelection(u,defaultSelection(u)).map(e=>u.id+': '+e));
    if(u.dataStatus==='requires-verification'&&(u.weapons.length||u.profiles.length))errors.push(`Unverified numerical data exposed: ${u.id}`);
  }
  return errors;
}
