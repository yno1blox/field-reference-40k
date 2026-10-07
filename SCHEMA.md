# Data architecture

The exact contract is in `schema.d.ts`; actual source-extracted examples are in `database.json`.

| Record | Representation |
| --- | --- |
| Faction | Stable ID, name, approved source URL and coverage status |
| Unit | Faction ID, edition, independent Legends flag, revision, multiple model profiles, equipment, composition, keywords, image, missing fields |
| Weapon | Stable profile ID plus shared equipment ID; six string-valued statistics; kind; ability names; source ID |
| Ability/army rule | Name, nullable text, verification state, source ID; no fabricated text |
| Wargear | Slots containing mutually exclusive equipment bundles and quantities; source; model scope; additional constraints |
| Detachment | Rule record with linked rules, enhancements, stratagems and restrictions |
| Enhancement | Rule record, detachment ID, nullable points and eligibility rules |
| Stratagem | Rule record, detachment IDs, nullable CP cost, timing, targets, effects and restrictions |
| Points | Unit-copy tiers plus equipment surcharges; separate publication/date metadata |
| Source | URL, edition, version, publication date and precision, check date, verification status and optional supersession/conflicts |
| Saved unit | Unique instance ID, unit ID, source revision and slot selections |
| Future army | Collection of saved unit instances, faction and detachment IDs |

No pretend detachment or stratagem was inserted just to fill an example. Empty arrays mean not imported; null fields mean unknown. A source-link-only ability is not full verified text.

Two firing profiles can share one equipment ID. Two plasma cannons therefore show both firing modes with quantity two; their points surcharge is applied to two guns, not four profiles. Hull and sponson copies of the same weapon aggregate correctly.

Complex infantry can be represented with multiple profiles, composition ranges, per-model scope and explicit requires/excludes/quantity/manual constraints. This first evaluator supports only the reviewed single-model independent slots. It rejects unsupported scope or constraints, so the UI cannot assert legality without an implemented evaluator.

Record provenance can be overridden at field level through `fieldSources` when an erratum changes one statistic. A verified newer source must explicitly supersede the affected record; update dates are never guessed from access dates.

## All-faction extraction fields

Unit dataStatus distinguishes source-extracted records from requires-verification placeholders. A placeholder has no numerical model or weapon profiles. Edition can be null when the source marker is missing. Legends remains a separate explicit boolean.

keywordGroups preserves model-specific keyword scopes. composition.entries and points.rows retain the source grouping and labels without pretending that a legal pricing/composition evaluator exists. invulnerable stores displayed values and whether a conditional note exists; users follow the link for conditions. Sources distinguish retrievedAt from verifiedAt and publicationDate.

Database coverage and coverage.json report source-card/import counts, Legends totals, issues, navigation omissions and source checksums. The new catalogue supports 48-entry pagination. Existing three-unit saved-loadout IDs/revisions are preserved after comparing statistics.
