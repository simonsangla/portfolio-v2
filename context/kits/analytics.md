---
created: "2026-04-20"
last_edited: "2026-04-20"
domain: analytics
status: draft
---

# Analytics Events Kit

## Purpose
Wire `@vercel/analytics` custom events on key conversion surfaces so positioning + content + IA work can be measured. Without this, every other PR ships blind.

## Scope
- Thin wrapper: `lib/analytics.ts`
- Typed event taxonomy (no string-typing event names at call sites)
- Events fire on: hero CTAs, fractional CTAs, intake form open, FAQ search, FAQ tag filter, product card clicks, demo video play, case study CTA, route navigation milestones
- Server-safe (no-op in SSR; client-only effect)

## Out of scope
- A/B testing framework
- Heatmaps / session recording
- Server-side conversion tracking (Vercel Analytics + client events only)
- GA4 / Mixpanel / PostHog (Vercel only — already wired)

## Requirements

### R1 — Wrapper module
Create `lib/analytics.ts` exporting:
- A union type `AnalyticsEvent` enumerating all valid event names
- A typed map `AnalyticsEventProps` of event name → allowed property shape
- A function `track<E extends AnalyticsEvent>(event: E, props: AnalyticsEventProps[E]): void`
- The function MUST internally call `import('@vercel/analytics').track(...)` and no-op if not in browser

**Acceptance**: `track("hero_cta_click", { variant: "fractional" })` compiles. `track("hero_cta_click", { foo: 1 })` fails typecheck.

### R2 — Event taxonomy
The following events MUST be defined (snake_case, ≤32 chars):

| Event | Required props | Fired from |
|---|---|---|
| `hero_cta_click` | `{ variant: "fractional" \| "products" \| "training" }` | `app/page.tsx` hero |
| `differentiator_view` | `{}` | landing differentiator strip (IntersectionObserver) |
| `fractional_cta_click` | `{ position: "hero" \| "engagement" \| "footer" }` | `/fractional` |
| `intake_open` | `{ source: string }` | any Tally CTA |
| `product_card_click` | `{ slug: string }` | product cards |
| `case_study_view` | `{ slug: string }` | `/case-studies/[slug]` mount |
| `case_study_cta_click` | `{ slug: string, target: "fractional" \| "product" }` | case study CTA |
| `faq_search` | `{ query: string, results: number }` | FAQ search input (debounced) |
| `faq_tag_filter` | `{ tag: string }` | FAQ tag chip click |
| `faq_ask_cta_click` | `{}` | FAQ "didn't find your answer" CTA |
| `demo_video_play` | `{ source: "hero" \| "product", slug?: string }` | video play event |
| `nav_click` | `{ target: string }` | header nav links |

**Acceptance**: each event listed appears in the union type. Each fires from the listed location (verifiable in code search).

### R3 — Wiring rule
Every CTA component (`CTA.tsx`) MUST accept an optional `onTrack` prop with a typed event payload, and call `track(...)` on click before navigation. Existing `CTA.tsx` API extended; not replaced.

**Acceptance**: existing CTA usages still compile. New usages can opt into tracking with `<CTA onTrack={["hero_cta_click", { variant: "fractional" }]} />` (or equivalent typed shape).

### R4 — No PII
Events MUST NOT carry email, name, IP, or free-text user input. `faq_search.query` is the only free-text exception — truncate to 64 chars.

**Acceptance**: type system disallows `email` / `name` keys (lint rule or convention enforced via review).

### R5 — Dev-mode logging
In `process.env.NODE_ENV === "development"`, `track(...)` MUST also `console.debug("[analytics]", event, props)` so you can verify firings without a Vercel deploy.

**Acceptance**: local `npm run dev`, click a tracked CTA, see console output. Production build has no console output.

### R6 — Documentation
Create `lib/analytics.README.md` (single short file) listing the event taxonomy and how to add a new event. One paragraph + the table.

**Acceptance**: file exists. Adding a new event takes <10 min using the doc.

## Cross-references
- `faq.md` — FAQ events fire from FAQ page
- `information-architecture.md` — nav events fire from new header
- `case-studies.md` — case study events fire from new pages
- All other PRs in `build-site-portfolio-rewrite.md` rely on this for measurement

## Notes
Vercel Analytics is already wired in `app/layout.tsx`. This kit adds the *custom events* layer on top. Without it, the dashboard only shows pageviews — useless for evaluating which positioning lift converts.

Ship this in parallel with Wave 1 PRs so positioning changes can be measured from day 1.
