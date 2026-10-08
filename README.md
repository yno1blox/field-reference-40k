# Detachments update — 8 October 2026

The new Detachments navigation page covers 328 source-listed detachments across all 23 faction pages, including 57 Space Marine entries with chapter detachments. Choose a faction, search by detachment, enhancement or stratagem name, and open a compact detail page. Standard 11th-edition entries appear by default; older Boarding Actions entries remain separately labelled and available through the edition filter. Source labels are not an independent official rules audit, and a Legends label is used only when the source explicitly provides one.

Each entry contains rule names, enhancement names and costs, stratagem names and CP, detachment points and force disposition where listed. Full wording and restrictions open on Wahapedia; they are not copied into this index. Data is a dated snapshot, not a live feed. The importer matches every detachment selector on the approved faction pages, with explicit handling of source naming discrepancies for Gladius, Inner Circle and Kauyon.

Extract the update ZIP into your existing GitHub repository folder and replace the matching files. Keep the new `detachments.json` beside `index.html`, `app.js` and `style.css`. Commit all changed and new files in GitHub Desktop, push to origin, wait for GitHub Pages deployment, then refresh the site. Existing saved folders and loadouts stay in browser storage.

Run `npm test` for database, rules and detachment coverage checks.

# Equipment rules update — 8 October 2026

Necron and Astra Militarum datasheets now show an open, collapsible Equipment & weapon options section directly below their weapon tables. It contains model-specific default equipment, optional swaps, quantities and source footnotes. All 198 eligible records are covered; 152 supplied source cards have explicit wargear-option sections. Where a source lists no equipment or no options section, the interface says so. Death Korps of Krieg remains withheld due to its source edition marker.

Replace all files in your existing website folder, then press Ctrl+F5. Weapon visibility controls and saved loadouts are preserved. This imports the equipment rules for reading; it does not expand automatic equipment-combination validation beyond the existing reviewed units.

# Ability text update — 8 October 2026

- 64 Necron and 135 Astra Militarum source cards matched.
- 379 named ability descriptions and 348 additional datasheet sections imported.
- 222 linked reference entries from the supplied HTML files.
- 36 core reference sections from your supplied PDF (35 named abilities plus the Scout Move subsection).
- Click weapon keywords or highlighted rule references for a pop-up. Core rules has its own navigation page.
- Unit-specific text takes precedence over generic definitions. A source link remains available for checking it.
- Death Korps of Krieg remains blocked because its source card has a 10th-edition marker; all 198 eligible entries have locally resolved ability descriptions.

Replace ALL files in your existing website folder and press Ctrl+F5. The update versions the core.js import as well as the main script to avoid the earlier cached-validation error. Do not change the localhost address if you want to retain saved browser data.

The HTML and PDF are user-supplied snapshots. Publication changes are not automatically synchronized. This update does not claim that every faction, detachment or army-building rule is complete.

# Field Reference — all factions

This update expands the original three-unit reference to every datasheet entry found on the 23 supplied faction pages: **1,655 faction entries, 1,745 model profiles and 8,767 weapon profiles**. The catalogue includes **512 explicitly marked Legends entries**. Units listed under multiple factions appear in each relevant catalogue; this is not a deduplicated unit count.

## Install over your current website

1. Extract all files from this ZIP into your existing website folder in XAMPP/Apache htdocs.
2. Choose Replace for the existing project files. Keep filenames exactly as supplied, without `(1)` suffixes. The files belong together at the same level; no extra nested folder is required.
3. Open your usual localhost website address and press Ctrl+F5.

For saved loadouts and photos to remain visible, use the same browser and localhost address/port. Export a backup from My loadouts before moving to another address. The original three units retain their IDs and revisions.

Alternatively, with Python installed, double-click START-WINDOWS.bat or run `python serve.py` and visit http://localhost:8080. Do not open index.html directly. No npm installation or build step is needed to run the site.

## Included

- All 23 faction catalogues, with faction totals, 48-entry pagination, name search, keyword filters and Legends filters.
- Compact datasheets, individually persistent weapon hide/show controls, and show/hide all.
- Multiple model profiles, invulnerable-save values, scoped keywords, composition counts and source-displayed points rows.
- Global unit, weapon and ability-name search.
- User photo uploads, local persistence and loadout backup import/export.
- Exact source links and a coverage screen showing all factions and records requiring verification.

## Data limitations

Twelve records have no clear current-edition marker in the supplied datasheet source (eleven show 10th edition; one has no marker). They remain searchable, but numerical profiles are withheld and they are explicitly flagged. Missing current-edition evidence does not imply Legends. All 512 explicit Legends entries in this import have 11th-edition source markers.

This is a structured extraction from the user-approved secondary sources, retrieved on 5 October 2026. Official publication comparison and points publication dates remain unverified. Retrieval date is not publication date. Every source card and source navigation entry was accounted for; this does not establish completeness beyond those supplied pages.

Necron and Astra Militarum unit/weapon/wargear ability text, army-rule references and additional datasheet sections are imported from the HTML files you supplied. Shared core abilities come from your uploaded PDF, which is included as core-rules.pdf. Other factions retain source links for their unique abilities. Army-building detachment selection and miniature photos remain outside this update.

**Legal equipment configuration and saved loadouts remain supported only for the three previously reviewed units:** Leman Russ Commander, Leman Russ Battle Tank and Armageddon-pattern Medusa. Other units support weapon hide/show; their equipment restrictions must be checked at the source. The application does not validate army legality.

## Project files

- database.json: imported facts and source metadata.
- coverage.json and SOURCE-AUDIT.md: per-faction counts and unresolved records.
- app.js and style.css: interface and compact responsive layout.
- core.js and core.test.js: loadout, points, search and validation logic.
- schema.d.ts and SCHEMA.md: data contract.
- serve.py and START-WINDOWS.bat: optional local server.

Run `node --test core.test.js` if Node.js is installed. The app itself requires only a web server and browser.

Photo uploads and saved loadouts stay in browser storage. There are no analytics or automatic remote image requests. The included server binds to your computer only; public hosting requires separate access controls. Source changes are not automatically synchronized.
