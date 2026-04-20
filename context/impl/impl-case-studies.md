# impl-case-studies

Wave 2 · T-6 · PR `feat/T-6-tripadvisor-case-study`

## Scope

Long-form case study route with a seeded TripAdvisor precursor entry. Replaces the cardboard "at TripAdvisor, 80%…" line that was getting repeated across product cards.

## Decisions (locked)

- MDX authored; loader mirrors `lib/artifacts.ts` + `lib/faq.ts`.
- Index at `/case-studies`, detail at `/case-studies/[slug]`.
- `case_study_view` fires on mount via a small client tracker component (`CaseStudyViewTracker.tsx`).
- `case_study_cta_click` fires on the bottom "Work with me on this" CTA with `{ slug, target: "fractional" }`.
- Landing card for MetricPilot keeps TripAdvisor mentions at 1 by promoting the link to a structured "Read the full case study" line.
- Landing proof callout added under the proofs carousel linking to the TripAdvisor case study.
- Sections in body (per executor brief): Problem, Approach, Stack, Metrics before, Metrics after, What I built, What I'd do differently, Lessons.

## Files

- `lib/case-studies.ts` — loader + validator (throws on missing slug/title/client/role/period/headline_metric/summary/tags).
- `content/case-studies/tripadvisor-precursor.mdx` — 889 words, all 8 sections present.
- `components/CaseStudyViewTracker.tsx` — `"use client"` effect, fires `case_study_view` once per mount.
- `app/case-studies/page.tsx` — index catalog.
- `app/case-studies/[slug]/page.tsx` — detail with header, MDX body, related products block, CTA.
- `app/sitemap.ts` — `/case-studies` at 0.8 + each detail at 0.7.
- `app/page.tsx` — proof callout under the proofs carousel; `Link` import added.
- `content/proofs/metricpilot.mdx` — cross-link added (still ≤1 TripAdvisor mention).
- `context/impl/impl-case-studies.md` — this file.

## Seed entry

| slug | client | period | words |
|---|---|---|---|
| tripadvisor-precursor | TripAdvisor Media Group | 2018–2023 | 889 |

All 8 sections populated with substantive content. Headline metric: 80% reduction in KPI investigation time across 5 product teams.

## Analytics events

- `case_study_view` — one-shot on mount of `/case-studies/[slug]`, payload `{ slug }`.
- `case_study_cta_click` — on bottom CTA click, payload `{ slug, target: "fractional" }`.

## Depends on

- Wave 1: `lib/analytics.ts` (both events pre-typed), `CTA.tsx` `onTrack`.
- Stage A: `intakeSource` pattern (not used here — fractional page is the CTA target, not Tally directly).

## References

- Kit: `context/kits/case-studies.md` R1–R7.
- Plan: `context/plans/build-site-portfolio-rewrite.md` → T-6.
