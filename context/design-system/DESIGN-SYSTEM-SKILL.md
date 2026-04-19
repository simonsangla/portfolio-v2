# SKILL.md — Working on simonsangla.com

You are designing or extending **simonsangla.com** — a practitioner's landing page for a data-and-AI builder. This skill tells you how to stay in the system.

## Before you touch UI

1. Open **`DESIGN.md`** — the source-of-truth spec. Everything below references sections there.
2. Open **`README.md`** for the file index + fundamentals.
3. Open **`colors_and_type.css`** — every token lives there as a CSS custom property. Never inline a hex or a shadow recipe; reach for the variable.
4. Open the preview closest to your task:
   - Palette → `preview_palette.html`
   - Type → `preview_type.html`
   - Spacing, radii, shadows → `preview_spacing.html`
   - Buttons, cards, chips, input, nav pill → `preview_components.html`
   - Mark + voice + numerals → `preview_brand.html`
   - Full hero composition → `preview_hero_practitioner.html`
5. Open the UI kit you're extending — `ui_kit_home.html` for homepage work, `ui_kit_proof_detail.html` for artifact pages.

## Rules that do not bend

- **Black is `#051A24`**, never `#000`. Soft lights are `--color-hairline` or `--color-on-invert-soft`.
- **Accent (`#B8341A`) is for `:focus-visible` rings and MDX inline links only.** Do not paint surfaces.
- **Inter across the whole scale.** Body, section headings, hero h1 — one family. No serif. No Fraunces. No axis overrides. Weight drives hierarchy: 400 body, 500 sections, 600 only on the hero h1.
- **Never `font-bold` (700) anywhere.** Weight ceiling is 600 and that weight is reserved for the hero h1 alone. Emphasis in body comes from `--color-ink` vs `--color-muted`, or from mono.
- **Italics are never used.** Emphasis is weight, color, or mono — not slant.
- **Mono is for eyebrows, meta rows, numeric labels, and MDX code blocks.** Never a body fallback, never a tagline.
- **Only four shadows exist:** `shadow-primary`, `shadow-secondary`, `shadow-card`, `shadow-float`. Inlining a new `box-shadow` is a review-blocking change.
- **Only five radii:** 12, 16, 32, 40, and pill. No sharp corners on interactive chrome.
- **Hero column is `max-w-[640px] lg:max-w-[960px]`.** Never narrower (that's the old editorial column), never wider. Prose caps at 42rem.
- **Icons:** curated Lucide set only — `Quote`, `Star`, `ArrowUpRight`, `ChevronLeft`, `ChevronRight`. No emoji. The directional arrow is a plain `→` that nudges 4px on hover.
- **Motion respects `prefers-reduced-motion: reduce`.** The global CSS already disables durations — don't override.

## Composition patterns

- Every section opens with a mono eyebrow, then an Inter 500 heading, then body copy, then CTA(s). Never stack two display-size headings in the same viewport.
- Buttons are always `rounded-full` with `→` suffix that nudges on hover (`group-hover:translate-x-1`).
- Cards: light uses `shadow-card`, dark (pricing) uses `shadow-primary` for the luminous inset highlight — do not flatten.
- Secondary surfaces (price panel, intake box) use `rounded-xl` + hairline border + no shadow.

## Voice

Verb-first CTAs (2–4 words). Numbers beat adjectives. No exclamation marks. No emoji. Write like one person shipping — not a team marketing. A first-time reader should feel the page was built by someone who ships, using the same taste they apply to a production codebase.

## When extending

- New component? Compose from existing tokens first. If that fails, propose an addition to `preview_components.html` + document it in DESIGN.md §4 before shipping.
- New token? Edit `colors_and_type.css`, then mirror into `lib/theme.json` and `app/globals.css` in the source repo. Update DESIGN.md §2/§3/§5/§6 accordingly.
- New section on the homepage? Slot it into `ui_kit_home.html` as a `<section>` with the eyebrow → heading → body → CTA pattern, then verify rhythm against `preview_spacing.html`.
- Never duplicate DESIGN.md content into kits or plans — reference by section number (`§4.10 Pricing card`) instead.

## Self-check before handoff

- All colors via CSS variables? (`grep` for `#` in new files — hexes should appear only in `colors_and_type.css`.)
- All shadows via tokens?
- Inter only — no Fraunces import, no serif font-family anywhere, no `font-bold`, no emoji?
- Hero in `max-w-[640px] lg:max-w-[960px]`, prose ≤ 42rem?
- Reduced-motion path still works?

If yes, ship. If no, fix and re-check.
