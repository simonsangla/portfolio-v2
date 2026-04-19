# Design System Reference

Imported from the original `Simon_Sangla___Design_System.zip`. These files are the source-of-truth for porting visual design into the React app.

## Hierarchy (by authority)

1. **DESIGN.md** — canonical visual spec, §1–§9. On any conflict between files, DESIGN.md wins.
2. **DESIGN-SYSTEM-SKILL.md** — rules that do not bend (black is #051A24 not #000, no font-bold, etc.).
3. **colors_and_type.css** — canonical CSS variables. Every hex + shadow lives here.
4. **home.html** — homepage reference mock (Inter-only system).
5. **proof.html** — proof detail reference mock.
6. **ui_kit_home.html / ui_kit_proof_detail.html** — UI kits for those pages.
7. **preview_*.html** — isolated reference pages per token family.

## What each preview_* covers

- `preview_all.html` — every token + component on one page
- `preview_palette.html` — color swatches
- `preview_type.html` — Inter type scale
- `preview_spacing.html` — spacing, radius, shadow tokens
- `preview_components.html` — buttons, cards, chips, icons, input, nav pill
- `preview_brand.html` — wordmark, monogram, voice, proof numerals
- `preview_hero_practitioner.html` — hero composition
- `preview_before_after.html` — editorial→practitioner migration demo

## Not in this bundle

- `source/` (already merged into the Next.js app as `app/`, `components/`, `content/`, `lib/`)
- `scraps/` (Sketch/napkin drafts, not source-of-truth)
- `migration/` (alternate structure, superseded by source/)
- `home.standalone.html`, `proof.standalone.html` (bundler-loader wrappers, NOT the truth — see home.html, proof.html)

## i18n.js

`home.html` references `i18n.js` for multilingual runtime. Currently the React app has NO i18n. Agent is instructed to `[DEFER]` this.

## Theme token source-of-truth

- **Authored tokens:** `colors_and_type.css` (this file)
- **Generated tokens:** `app/theme.generated.css` (consumed by Next.js)
- **Source JSON:** `lib/theme.json` (mentioned in DESIGN.md; NOT in this repo — the generated CSS is static)

If tokens drift between `colors_and_type.css` and `app/theme.generated.css`, the canonical source is `colors_and_type.css`. Update the generated CSS manually (there is no generate script in this repo; DESIGN.md references `scripts/generate-theme-css.mjs` from the original source, which was not ported).
