# Validation — all-faction update

## Source coverage

The importer accounted for all 1,655 source cards across 23 factions. Source navigation comparison found no missing datasheet anchors. There were no model-profile or weapon-row count warnings after handling nested datasheets, chapter/allegiance logos and mixed-model characteristic wrappers. The result contains 1,745 model profiles and 8,767 weapon profiles.

Twelve cards lack appropriate current-edition evidence; numerical data is withheld. All 512 Legends cards have explicit source classifications and 11th-edition markers. Checks prove structural consistency with the supplied sources, not official rules correctness or current tournament legality.

## Automated logic checks

Eight core tests passed: source consistency and edition policy, weapon IDs, equipment links, paired firing profiles, quantities, equipment costs, copy-number price tiers, unsupported/illegal options, Legends classification, stale saved loadouts and global search links. Original three-unit IDs and revisions remain compatible with saved selections.

## Chromium browser checks

Passed on desktop and a 390-pixel mobile viewport:

- All 23 faction catalogues and a representative populated datasheet per faction.
- Correct displayed weapon/model counts, 48-entry pagination and catalogue search.
- Multi-model datasheet rendering, 23-row coverage screen and withheld-data state.
- Weapon hide/show, persistence after reload, show/hide all and search reveal.
- Existing loadout editor, saving and reopening a loadout.
- No document-wide horizontal overflow on the checked mobile tank page.
- No JavaScript page errors during these workflows.

Desktop and multi-model screenshots were inspected. Photo-upload behavior was preserved but not newly exercised.

## Remaining limitations

Independent official publication comparison, points publication dates, full rules prose, army rules/detachments/enhancements/stratagems, miniature images, multi-model equipment evaluators and army-wide legality remain outside this import. Numerical profiles for twelve entries require verification.

## Ability update checks — 8 October 2026

Fourteen automated tests passed, including existing loadout tests, core-rule matching, resolved references for all 198 eligible priority datasheets, safe generated HTML, exact Enginseer conditions, Anrakyr ability text, leader eligibility, edition blocking and retained revisions. All 198 eligible unit pages, the core index and a modal rendered without errors under DOM stubs. This is not a browser layout test. The previously recorded Chromium results above concern the earlier build; a fresh Chromium run for this update was unavailable because no browser binary was installed and the package download was blocked.

The uploaded PDF's rendered page 82 was inspected against the extracted Heavy, Infiltrators, Leader and related rules. Core sections preserve source text and PDF page links; related sections can be read in the included full PDF. Rich imported HTML is rebuilt from a restricted tag/attribute set; original scripts, styles, images and event handlers are excluded.

## Equipment update

All 198 eligible pages were rendered using DOM stubs and checked for the equipment section. Syntax and the existing 14 data/rule/loadout tests passed. Source comparisons confirmed the Kasrkin per-unit duplicate-weapon footnote and vox-caster restriction, Silent King model-specific equipment, and paired Leman Russ Commander sponson quantities. The update has not had a fresh visual browser test.
