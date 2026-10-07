/** Data contract. Null means unknown, never zero. Rules content lives in data, not UI. */
export type Id = string;
export type Verification = 'checked-against-approved-source' | 'unverified' | 'conflict' | 'source-extracted';
export interface Source {
 id:Id; url:string; edition:number|null; publication:string; version:string|null;
 publicationDate:string|null; datePrecision:'day'|'month'|null; verifiedAt:string|null; retrievedAt?:string;
 approval:string; status:Verification; officialCrossCheck:boolean;
 supersedes?:Id[]; conflictWith?:Id[];
}
export interface Provenance { sourceId:Id; fieldSources?:Record<string,Id>; }
export interface Faction {id:Id;name:string;sourceUrl:string;status:string;unitCount?:number}
export interface Profile extends Provenance {id:Id;name:string;characteristics:Record<'M'|'T'|'SV'|'W'|'LD'|'OC',string|null>}
export interface Weapon extends Provenance {
 id:Id;name:string;equipmentId:Id;kind:'ranged'|'melee';
 stats:Record<'range'|'attacks'|'skill'|'strength'|'ap'|'damage',string|null>;
 abilityNames:string[]; abilityReferences?:Record<string,Id>;
}
export interface Rule extends Provenance {
 id:Id; name:string; text:string|null; status:'source-link-only'|'verified'|'unverified'|'user-supplied'|'summary';
 html?:string; glossaryId?:Id; textSource?:string; kind?:string;
 factionId?:Id; unitIds?:Id[]; edition?:number; publicationDate?:string|null;
}
export interface Detachment extends Rule {ruleIds:Id[];enhancementIds:Id[];stratagemIds:Id[];restrictions:Rule[]}
export interface Enhancement extends Rule {detachmentId:Id;points:number|null;eligibility:Rule[]}
export interface Stratagem extends Rule {detachmentIds:Id[];cpCost:string|null;timing:Rule|null;target:Rule|null;effect:Rule|null;restrictions:Rule[]}
export interface EquipmentQuantity {id:Id;quantity:number}
export interface Option {id:Id;label:string;equipment:EquipmentQuantity[]}
export interface Slot {id:Id;label:string;options:Option[];default:Id}
/** Per-model and cross-slot constraints are representable, but MUST NOT be
 * labelled verified or enabled by this v1 validator. Add an evaluator first. */
export type Constraint =
 | {kind:'requires';optionId:Id;requiredOptionId:Id;sourceId:Id}
 | {kind:'excludes';optionIds:Id[];sourceId:Id}
 | {kind:'quantity';equipmentIds:Id[];minimum:number;maximum:number;perModels?:number;sourceId:Id}
 | {kind:'manual';rule:Rule};
export interface Wargear extends Provenance {status:'verified'|'unverified';modelScope:'single-model'|'per-model';slots:Slot[];constraints:Constraint[]}
export interface Points extends Provenance {
 tiers:{from:number;to:number|null;points:number}[];
 equipmentCosts:Record<Id,number>;publication:string|null;publicationDate:string|null;status:string;
 /** Different composition sizes require a new price evaluator. */
 rows?:{group:string;label:string;value:string}[];
 modelCountTiers?:{modelCount:number;points:number}[];
}
export interface Unit extends Provenance {
 id:Id;name:string;factionId:Id;edition:number|null;legends:boolean;revision:string;
 image:{path:string;sourceUrl:string;approved:boolean}|null;
 category?:string; dataStatus?:'source-extracted'|'requires-verification'; issues?:string[];
 keywordGroups?:{scope:string;values:string[]}[];
 invulnerable?:({values:string[];conditional:boolean}&Provenance)|null;
 keywords:string[];factionKeywords:string[];profiles:Profile[];weapons:Weapon[];
 composition:Provenance & {entries?:string[];models:{name:string;minimum:number;maximum:number}[]};
 abilities:Rule[];wargear:Wargear;points:Points;completeness:'partial'|'complete';missing:string[];
 abilityImportStatus?:'imported'|'blocked-edition'; ruleSections?:Rule[];
 equipmentRules?:Provenance & {defaultHtml:string;defaultText:string;optionsHtml:string;optionsText:string;status:'user-supplied'};
 transport?:Rule;leader?:Rule;otherRules?:Rule[];
}
export interface Database {schemaVersion:1;revision:string;edition:11;factions:Faction[];sources:Source[];units:Unit[];coverage?:Coverage[];armyRules:Rule[];detachments:Detachment[];enhancements:Enhancement[];stratagems:Stratagem[]}
export interface SavedLoadout {id:Id;unitId:Id;revision:string;name:string;ordinal:number;selection:Record<Id,Id>}
/** Future armies reference instances, allowing two differently equipped copies. */
export interface Army {id:Id;name:string;factionId:Id;detachmentIds:Id[];instances:SavedLoadout[];revision:string}

export interface Coverage {id:Id;name:string;sourceUrl:string;sourceSha256:string;sourceCards:number;imported:number;legends:number;profiles:number;weapons:number;unverified:{id:Id;name:string;issues:string[]}[];warnings:string[];navMissing:string[]}
