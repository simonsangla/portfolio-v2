---
created: "2026-04-20"
last_edited: "2026-04-20"
domain: case-studies
status: draft
---

# Case Studies Kit

## Purpose
Long-form proof pages that B2B prospects need to trust the work. Removes pressure on product cards to repeat brand names + percentages 5×. First entry: TripAdvisor precursor system (80% investigation time reduction).

## Scope
- New route: `/case-studies/[slug]`
- New index: `/case-studies` (catalog page)
- MDX-authored content (same loader pattern as `lib/artifacts.ts`)
- Linked from product cards (e.g. MetricPilot card → TripAdvisor case study)
- Linked from landing proof callout

## Out of scope
- Video case studies (write-only first; video later)
- Client logos / testimonials (separate, requires consent)
- PDF export (FAQ-style, push to backlog)

## Requirements

### R1 — Case study schema
Each case study MUST be authored as MDX in `content/case-studies/*.mdx` with frontmatter:
- `slug` (string, kebab-case, required)
- `title` (string, required, e.g. "TripAdvisor: Precursor System")
- `client` (string, required — actual or anonymized e.g. "B2C marketplace, 50M MAU")
- `role` (string, required — Simon's role at the time)
- `period` (string, required, e.g. "2018–2023")
- `headline_metric` (string, required, e.g. "80% reduction in KPI investigation time")
- `tags` (string array, required)
- `summary` (string, ≤200 chars, required — used on cards)
- `featured` (boolean, optional — surfaces on landing)
- `related_products` (string array of product slugs, optional)

**Acceptance**: `loadCaseStudies()` typed function. Build fails on missing required fields.

### R2 — Case study page structure
Each `/case-studies/[slug]` page MUST follow this section order:

1. Title + headline metric (prominent)
2. Context (client + role + period)
3. **Problem** — what was broken, who hurt
4. **Approach** — methodology, tools, what was built
5. **Outcome** — measurable result + how it was measured
6. **What's portable** — what of this approach Simon now sells
7. Related products / services (links)
8. CTA → `/fractional` or relevant product

**Acceptance**: TripAdvisor case study renders all 8 sections with substantive content.

### R3 — Index page
`/case-studies` MUST list all case studies sorted by frontmatter `featured` then by `period` desc. Each card shows: title, client (anonymized if needed), headline_metric, summary, tags.

**Acceptance**: page renders ≥1 case study. Empty state if 0.

### R4 — TripAdvisor seed content
At least ONE case study MUST exist at launch: `content/case-studies/tripadvisor-precursor.mdx`. Content MUST cover (paraphrased from meeting notes + AGENT_HANDOFF context):
- Problem: weekly business reviews took analyst-week to assemble; root causes often missed; clustering signals ignored
- Approach: precursor system — automated KPI decomposition + statistical change-point detection + NL summarization (local LLM, no data leaves)
- Outcome: 80% reduction in investigation time across 5 product surfaces, lived for 10 years at scale
- Portable: the methodology + stack are now sold as MetricPilot + fractional engagements

**Acceptance**: file exists, MDX renders, all 8 sections populated, ≥600 words, ≤1500 words.

### R5 — Cross-linking
- Landing page proof callout MUST link to `/case-studies/tripadvisor-precursor`
- Product card for MetricPilot MUST link to relevant case study via `related_products` reverse lookup
- `/fractional` page MAY link to relevant case study

**Acceptance**: clicking proof callout on `/` lands on case study. Clicking related product on case study lands on product detail.

### R6 — Sitemap
`app/sitemap.ts` MUST include `/case-studies` (priority 0.8) + each `/case-studies/[slug]` (priority 0.7).

**Acceptance**: `npm run build` emits all entries.

### R7 — Token-only design
Reuse existing components and tokens. No new design primitives.

**Acceptance**: zero new theme tokens. Zero inline styles beyond existing patterns.

## Cross-references
- `information-architecture.md` — landing must include proof callout linking here
- `analytics.md` — track `case_study_view`, `case_study_cta_click`
- `lib/artifacts.ts` — pattern to copy for `loadCaseStudies()`

## Notes
Reviewer feedback (zyp-zqmq-zif, 2026-04-19): "TripAdvisor" repeated 7× across MetricPilot card. Reviewer's correct read: turn the proof into a *page*, not a card line. This kit is the home for it.
