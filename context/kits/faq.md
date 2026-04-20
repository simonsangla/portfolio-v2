---
created: "2026-04-20"
last_edited: "2026-04-20"
domain: faq
status: draft
---

# FAQ Domain Kit

## Purpose
Dedicated FAQ surface that handles common pre-sales objections async, reduces inbound mailto noise, and adds SEO surface area.

## Scope
- Standalone route: `/faq`
- Tag-based filterable client-side search
- Per-question deep-link anchors
- Fallback "ask anything" CTA → Tally intake (see `analytics.md` for event)
- Reuses MDX loader pattern from `lib/artifacts.ts`

## Out of scope
- AI-powered semantic search (use plain string match against tags + title + body)
- Threaded comments / user-generated content
- Per-FAQ analytics drilldown (page-level event only)

## Requirements

### R1 — FAQ content schema
Each FAQ entry MUST be authored as MDX in `content/faq/*.mdx` with frontmatter:
- `slug` (string, kebab-case, required)
- `question` (string, required)
- `tags` (string array, required, e.g. `["pricing", "security", "engagement"]`)
- `order` (number, optional, default 100)
- `updated` (ISO date, required)

**Acceptance**: `loadFaqs()` returns typed entries. Missing required fields throw at build time.

### R2 — FAQ list page
`/faq` MUST render:
- Page title + 1-line intro
- Search input (text)
- Tag filter chips (derived from union of all entry tags)
- Result list of question cards (question + tag pills + body excerpt)
- Empty state when no match
- "Didn't find your answer?" CTA → Tally intake at the bottom

**Acceptance**: page renders with 0 entries (empty state visible), 1 entry, and 12 entries. All gates pass.

### R3 — Search behavior
Client-side filter MUST:
- Match against `question` + `tags` + plain-text body (case-insensitive substring)
- Combine search + selected tags as AND (filter narrows; not OR)
- Update URL query (`?q=foo&tag=pricing`) so links are shareable
- Debounce input (150ms) to avoid jank

**Acceptance**: typing "price" filters to entries tagged `pricing` or containing word "price". URL updates. Reload restores state.

### R4 — Per-question anchors
Each rendered question MUST have `id={slug}` so `/faq#engagement-model` deep-links.

**Acceptance**: clicking a question's title copies the anchor link to clipboard (or opens it directly). Anchor scroll works on mobile.

### R5 — Initial content seed
At least 8 FAQ entries MUST exist at launch covering:
- Engagement model (no calls / async / what to expect)
- Pricing (€15–25K range, what determines)
- Security (offline / local / no data leak)
- IP ownership (you keep code + data)
- Timeline (4 weeks)
- Stack (Snowflake, Python, Streamlit)
- Booking (lead time, calendar)
- Methodology (safe vibe coding)

**Acceptance**: 8+ MDX files in `content/faq/` with valid frontmatter.

### R6 — Sitemap + robots
`/faq` MUST be added to `app/sitemap.ts` with `priority: 0.8`, `changeFrequency: "monthly"`. No noindex.

**Acceptance**: `npm run build` emits `/faq` in `sitemap.xml`.

### R7 — No new runtime deps
Implement search + filter using built-in React state. Do NOT add fuse.js, lunr, algolia, or similar.

**Acceptance**: `package.json` diff shows zero new dependencies.

## Cross-references
- `analytics.md` — track `faq_search`, `faq_tag_filter`, `faq_ask_cta_click` events
- `information-architecture.md` — FAQ link must appear in primary nav after IA split

## Notes
Reviewer feedback (zyp-zqmq-zif, 2026-04-19): FAQ should not be buried inside `/services`. Search button explicit ask. Contact fallback = name + email + question only, no phone.
