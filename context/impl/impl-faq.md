# impl-faq

Wave 2 · T-5 · PR `feat/T-5-faq`

## Scope

Dedicated `/faq` route: 8 MDX-authored entries, client-side search + tag filter with URL state, bottom Tally intake CTA. No new runtime deps.

## Decisions (locked)

- MDX authored in `content/faq/*.mdx`, loaded by `lib/faq.ts` (mirrors `lib/artifacts.ts`).
- Client filter: lowercase substring match against question + tags + plain-text body. No fuzzy lib.
- Tags + search are AND-combined. URL reflects state via `?q=` and `?tag=` (debounced 250ms).
- Ask-anything CTA reuses `site.intakeUrl` + `intakeSource="faq-bottom"` from the Wave 1/Stage A wiring, co-fires `faq_ask_cta_click`.
- Frontmatter validation throws at build time on missing required fields (slug, question, tags, updated).

## Files

- `lib/faq.ts` — loader, frontmatter validator, tag collector, word-count helper.
- `components/FaqCard.tsx` — server-renderable card with per-slug anchor + clickable tag pills.
- `components/FaqSearch.tsx` — `"use client"` shell: search input, tag chips, results, ask CTA. Owns URL sync + event firing.
- `app/faq/page.tsx` — server page: loads entries, collects tags, renders `<FaqSearch>` inside `<Suspense>` (required by `useSearchParams` in Next 15).
- `app/sitemap.ts` — `/faq` at priority 0.8, monthly.
- `components/Nav.tsx` — FAQ link added between Training and About. Will be restructured in T-7 route split.
- `content/faq/*.mdx` — 8 seed entries.

## Seed entries

| slug | tags | words |
|---|---|---|
| what-do-you-do | engagement · pricing · products | 122 |
| fractional-engagement | engagement · process | 129 |
| product-difference | products | 138 |
| training-offering | training | 137 |
| data-security | security | 149 |
| chatgpt-training-format | training · process | 146 |
| after-intake | process · engagement | 148 |
| pricing-budget | pricing | 158 |

All answers ≥80 words.

## Analytics events

- `faq_search` — debounced 250ms after typing stops, skipped on empty query and initial mount. `query` truncated to 64 chars; `results` = current filtered count.
- `faq_tag_filter` — fires when a tag chip activates (re-click on the active tag clears and skips the event).
- `faq_ask_cta_click` + `intake_open { source: "faq-bottom" }` — both fire on the bottom Ask-anything CTA.

## Known deferred

- **Async-track race on same-tab navigation.** Gemini flagged this on #22; brain accepted as deferred hardening. `intake_open` et al go through `track()` → dynamic `import("@vercel/analytics")` → `track(...)`. On same-tab navigation the import may not resolve in time; Vercel's client script uses `sendBeacon` on `pagehide` to flush queued events, which covers the common case. Revisit if real-world metrics show drop-off.

## Depends on

- Wave 1: analytics taxonomy, `CTA.tsx`.
- Stage A: `intakeSource` prop on CTA, `site.intakeUrl` env-driven.

## References

- Kit: `context/kits/faq.md` R1–R7.
- Plan: `context/plans/build-site-portfolio-rewrite.md` → T-5.
