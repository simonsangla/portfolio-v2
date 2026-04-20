---
created: "2026-04-20"
last_edited: "2026-04-20"
domain: information-architecture
status: draft
---

# Information Architecture Kit

## Purpose
Split the single-page landing into discrete project / services / training / products / cv routes. Eliminate redundancy between landing bio + about-section, and let each offering own its own surface.

## Scope
- New top-level routes: `/services`, `/training`, `/products`, `/cv`
- Slimmer landing (`/`) — project-focused, not bio-focused
- Header nav reflects the split
- Header name link → `/cv` (not `/`)
- 301 redirects from any old anchors that broke
- Sitemap updated, OG metadata per route

## Out of scope
- Visual redesign (handled by existing design system in `context/designs/`)
- New product cards (that's separate content work)
- Dynamic per-route OG images (start with shared OG, iterate later)

## Requirements

### R1 — Route inventory + responsibilities
The split MUST produce exactly these routes with these responsibilities:

| Route | Owns | Does NOT own |
|---|---|---|
| `/` | Project pitch (what the project is, hero tagline, primary CTAs to /services + /products + /fractional) | Bio, full service detail, training catalog, product catalog |
| `/cv` | Bio, photo, work history, contact links | Project pitch |
| `/services` | Service summary header + service cards (fractional, audits, custom builds) | Training, products |
| `/training` | Training summary + course catalog cards | Services, products |
| `/products` | Product summary + product catalog cards (Pro Optimizer, Dual Pronto, MetricPilot) | Services, training |
| `/fractional` | Existing — unchanged structurally | (handled by content PR, not IA PR) |
| `/proofs/[slug]` | Existing — unchanged | |
| `/faq` | See `faq.md` | |

**Acceptance**: each route exists, renders, has unique `<title>` + meta description.

### R2 — Landing page slim-down
`/` MUST contain:
- Hero (title + tagline + status + primary CTA)
- Differentiator strip (offline / local / secure — see content PR)
- 3-card section linking out to `/services`, `/training`, `/products`
- Carousel of 3–5 featured proofs (existing)
- Brief proof-callout (e.g. "TripAdvisor: 80% investigation time" → links `/case-studies/tripadvisor-precursor`)
- Final CTA → `/fractional`

`/` MUST NOT contain:
- Full bio (moved to `/cv`)
- Full service descriptions (link only)
- Full training catalog (link only)
- Full product catalog (link only)

**Acceptance**: landing word count drops by ≥40%. Lighthouse desktop score stays ≥90.

### R3 — Header nav
Header MUST show: `Services · Training · Products · Fractional · FAQ · CV`. Logo / "Simon Sangla" name MUST link to `/cv`. Site-name top-left (if separate from logo) MAY link to `/`.

**Acceptance**: clicking "Simon Sangla" anywhere in the header navigates to `/cv`.

### R4 — Per-section summary header
Each `/services`, `/training`, `/products` page MUST start with a 1–2 sentence summary that explains what the section sells before any cards render.

**Acceptance**: visual hierarchy: page title > summary > cards. Summary visible above the fold on mobile.

### R5 — Two-level horizontal pattern
Each catalog page (`/services`, `/training`, `/products`) MUST use the same horizontal-scroll card pattern as the existing landing carousel, with two screening levels (category at top, items in carousel below).

**Acceptance**: visual + interaction parity with current home carousel.

### R6 — Sitemap + redirects
`app/sitemap.ts` MUST include all new routes with sensible priorities:
- `/services` 0.9, `/training` 0.9, `/products` 0.9
- `/cv` 0.7
- `/faq` 0.8 (covered by `faq.md`)

If any prior in-page anchors (`/#services`, `/#about`) shipped externally, add 301s in `next.config.ts` redirects.

**Acceptance**: `next build` shows new sitemap entries. `curl -I` of removed anchors returns 301 to new home.

### R7 — Metadata per route
Each new route MUST export `metadata` with unique `title` (`{Page} · Simon Sangla`) and `description`. Reuse `site.description` for `/`. Distinct copy for the others.

**Acceptance**: `view-source` on each route shows distinct meta.

### R8 — Token-only design
ALL new routes MUST use existing tokens from `context/designs/DESIGN.md` and `app/theme.generated.css`. Zero new colors, fonts, or inline styles. Reuse `Container`, `CTA`, `SectionReveal`, `ArtifactCard`.

**Acceptance**: diff shows no `style={}` props except where existing pattern requires it. No new entries in `theme.generated.css`.

## Cross-references
- `faq.md` — FAQ link in header
- `analytics.md` — track route navigation events
- `case-studies.md` — proof callout on landing links here
- `context/designs/DESIGN.md` — visual constraint

## Notes
Reviewer feedback (zyp-zqmq-zif, 2026-04-19): one long page = confused. Bio repeated twice (landing hero "10 years" + about "10 years"). Wants click on name → CV. Wants distinct pages per offering with summary headers.
