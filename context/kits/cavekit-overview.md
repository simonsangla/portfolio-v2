---
created: "2026-04-19"
last_edited: "2026-04-20"
---

# Cavekit Overview

## Project
portfolio-v2 — personal portfolio site. Next.js 15 App Router + Tailwind v4 + Serwist PWA. Registry of shipped proofs.

## Domain Index
| Domain | File | Summary | Status |
|--------|------|---------|--------|
| faq | [faq.md](faq.md) | Dedicated `/faq` route with tag filter + search + Tally fallback CTA | draft |
| information-architecture | [information-architecture.md](information-architecture.md) | Split landing into `/services`, `/training`, `/products`, `/cv` + slim `/` | draft |
| case-studies | [case-studies.md](case-studies.md) | Long-form proof pages under `/case-studies/[slug]`; first entry: TripAdvisor precursor | draft |
| analytics | [analytics.md](analytics.md) | Typed event taxonomy on top of `@vercel/analytics` for measurement of all rewrite waves | draft |

## Cross-Reference Map
| Domain A | Interacts With | Interaction Type |
|----------|---------------|-----------------|
| faq | analytics | emits `faq_search`, `faq_tag_filter`, `faq_ask_cta_click` events |
| faq | information-architecture | FAQ link in primary nav after split |
| information-architecture | analytics | emits `nav_click` events |
| information-architecture | case-studies | landing proof callout links to case study |
| case-studies | analytics | emits `case_study_view`, `case_study_cta_click` |
| analytics | (all) | wrapper consumed by every CTA in every domain |

## Dependency Graph
```
analytics ──┬──> faq
            ├──> information-architecture
            └──> case-studies
information-architecture ──> faq (nav link)
information-architecture ──> case-studies (landing callout)
case-studies ──> information-architecture (uses Container, CTA, SectionReveal primitives)
```

## Build site
Active: [build-site-portfolio-rewrite.md](../plans/build-site-portfolio-rewrite.md) — sequences all 9 PRs across 4 waves.

## Backlog domains (not yet kitted)
- `auth-and-payments` — Auth.js v5 + Stripe (write when first buyer asks)
- `certificates` — Training cert generator (Resend + PDF — when training has students)
- `locked-demos` — Per-product read-only demo deployments (when prospects ask)
