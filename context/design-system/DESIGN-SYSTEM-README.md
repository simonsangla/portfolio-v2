# simonsangla.com — Design System

The practitioner landing page for **Simon Sangla** — a data-and-AI builder's personal portfolio. This document is the single source of truth for every visual decision on the site. Tokens below are canonical; ad-hoc hexes, one-off shadows, and novel radii do not ship.

---

## COMPANY FUNDAMENTALS

- **Who:** Simon Sangla — ten years of analytics at TripAdvisor scale, now shipping AI products in weeks.
- **What the site sells:** one async engagement (**Revenue Root Cause Engine** — €15–25K, 4 weeks, zero meetings) and a registry of shipped proofs (Theme Forge, Prompto, Prompt Optimizer, MetricPilot).
- **Audience:** B2C scale-up founders, CTOs, CPOs in the €5M–€100M ARR range — async, written, data-literate buyers.
- **Voice:** direct, utilitarian, evidence-first. A builder's landing page, not an agency's. Reference spirit: Linear / Vercel / Stripe docs home.
- **Tone cues:** medium density, wider hero, scannable grids, fewer words per line. Nothing bounces. Nothing pulses. Every element earns its pixel with a fact.

---

## CONTENT FUNDAMENTALS

| Dimension | Rule |
|---|---|
| **Reading level** | Write for a CTO who skims. Short lines. Active verbs. No jargon that isn't load-bearing. |
| **Capitalization** | Sentence case everywhere — headings, buttons, eyebrows translate to `UPPERCASE` via CSS, never in the source string. |
| **Numerals** | Tabular nums for proof metrics. Price written as `€15–25K` with an en-dash, never `$15k-25k`. Mono-flavoured tone via Inter weight 500 + `tabular-nums` — no second family. |
| **Punctuation** | Em-dashes set off asides. No Oxford commas unless ambiguous. Never exclamation marks. |
| **CTAs** | Verb-first, 2–4 words: *Start a chat*, *See the work*, *Book intake*. Never *Learn more* or *Click here*. |
| **Metrics** | Phrase-safe — values ≤10 chars render as Display-S (Inter 500); longer values stay Inter 500 and drop one size step. |
| **Links** | Inline links get `--color-accent` underline only in MDX; CTAs are pills. Never blue. |
| **Lists** | Em-dash bullets in plain lists (`— point`), Lucide `Star` in the pricing card, accent dots in hero eyebrow only. |
| **Quotes** | Curly quotes in prose (`’` / `“`), straight quotes only in code. |
| **Body copy** | Default measure is `max-w-[42rem]` (~65ch at 17px). Hero column is `max-w-[640px] lg:max-w-[960px]` — never narrower, never wider. |

---

## VISUAL FOUNDATIONS

A builder's landing page. Direct, utilitarian, evidence-first. A wider hero with a one-to-two-line h1. A scannable work grid. A single price block. A short about. Everything reads like a well-designed technical README.

- **Movement:** functional only. Elements fade up as the reader meets them; the bottom nav floats. No marquee personality, no serif accents, no dog-eared corners.
- **Typeface:** **Inter across the whole scale** — from 15px captions through the 56px hero h1. Weight drives hierarchy: 400 body, 500 section headings, 600 reserved for the hero h1.
- **Mono:** residue of a terminal — eyebrows, meta rows, numeric labels, MDX code blocks. Never body.
- **Inter alternates:** `ss01, cv11` enabled globally — open `a`/`g`, upright `R`/`J`, disambiguated `1`/`l`/`I`/`0`. Closest Inter gets to a practitioner voice without a second family.
- **Dark mode:** not in scope. `themeColor` respects `prefers-color-scheme` but the page stays light.

See:

- [DESIGN.md](DESIGN.md) — the full source-of-truth spec (sections §1–§9)
- [colors_and_type.css](colors_and_type.css) — live tokens + type scale, drop-in for any preview
- [preview_all.html](preview_all.html) — full system rendered in one page
- [ui_kit_home.html](ui_kit_home.html) — homepage UI kit
- [ui_kit_proof_detail.html](ui_kit_proof_detail.html) — proof detail page UI kit
- [SKILL.md](SKILL.md) — how agents should work in this system

---

## ICONOGRAPHY

A curated Lucide set. **Only these icons may appear on-page:** `Quote`, `Star`, `ArrowUpRight`, `ChevronLeft`, `ChevronRight`. Stroke `1.5`. Size `w-4 h-4` inline, `w-6 h-6` as headline accent. Colour inherits from parent.

**No emoji. No decorative icons. No social-media logomarks outside the footer.** If you want to express a list bullet, use an em-dash (`—`) or a 4px accent dot — never a check, never a sparkle.

Primary navigational affordance on CTAs is a plain unicode arrow (`↗` for external / `→` for internal) that nudges 4px on hover via `group-hover:translate-x-1`. This is the site's only recurring directional metaphor.

---

## FILES

| File | Purpose |
|---|---|
| `DESIGN.md` | Source-of-truth visual spec (§1–§9) — read first |
| `README.md` | This document — fundamentals + file index |
| `SKILL.md` | Agent guide: how to extend this system |
| `colors_and_type.css` | Canonical CSS variables — drop-in for any preview page |
| `preview_all.html` | Every token + component on one page |
| `preview_palette.html` | Color swatches card (Design System tab) |
| `preview_type.html` | Typography scale card — Inter across the scale |
| `preview_spacing.html` | Spacing, radius, and shadow tokens |
| `preview_components.html` | Buttons, cards, chips, icons, input, nav pill |
| `preview_brand.html` | Wordmark, monogram, voice samples, proof numerals |
| `preview_hero_practitioner.html` | Practitioner hero composition (DESIGN.md §1 + §4.3) |
| `preview_before_after.html` | Migration demo — editorial/Fraunces → practitioner/Inter |
| `ui_kit_home.html` | Homepage: nav, hero, proofs list, services panel, pricing, about |
| `ui_kit_proof_detail.html` | Proof detail page: hero, media block, metrics, prev/next |
| `assets/favicon.svg` | The "S" favicon mark (Inter 600, ink surface) |
| `assets/icon.svg` | Full-res app icon |

---

## AT A GLANCE

| Token family | Value |
|---|---|
| Page | `#FFFFFF` · `--color-bg` |
| Ink | `#051A24` · `--color-ink` |
| Ink soft | `#0D212C` · `--color-ink-soft` |
| Muted | `#273C46` · `--color-muted` |
| Hairline | `#E0EBF0` · `--color-hairline` |
| Accent (focus + MDX link) | `#B8341A` · `--color-accent` |
| Surface invert | `#051A24` · `--color-surface-invert` |
| On invert | `#F6FCFF` · `--color-on-invert` |
| Body font | Inter (weights 400 / 500 / 600) |
| Display font | **Inter** — weight 500 for section headings, 600 only on hero h1. Tracking `-0.02em` / `-0.025em`. |
| Mono | JetBrains Mono — eyebrows, meta, numeric labels, code only |
| Inter features | `ss01, cv11` globally |
| Shadows | `shadow-primary`, `shadow-secondary`, `shadow-card`, `shadow-float` |
| Radii | `rounded-full`, `rounded-2xl` (16), `rounded-xl` (12), `rounded-[32px]`, `rounded-[40px]` |
| Spacing stops (×4px) | 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 48 |
| Containers | `640px → 960px` hero (base/lg) · `42rem` prose · `1200px` content · `max-w-4xl` pricing row |
| Section rhythm | `py-12 md:py-20` default · `py-16 md:py-24` hero · `py-48` partner |
| Breakpoints | `sm` 640 · `md` 768 · `lg` 1024 |
