# Loop Log — caveman format

Wave 1 · 2026-04-20

S0 gitignore+DESIGN chore. PR#17 ac16eff. lint+type+build ✅.
S1 T-1 content. dual-pronto rename+301, differentiator, fractional copy, MDX rewrites. PR#18 c351ce7. gates ✅. TripAdvisor count: 3→1 in metricpilot.
S2 T-3 analytics. 12-event typed taxonomy, CTA onTrack, DifferentiatorObserver, ArtifactCardTracker. Build fail: ArtifactCard "use client" + node:fs = webpack error. Fix: thin client wrapper ArtifactCardTracker, ArtifactCard stays server. PR#19 1ecd8bc. gates ✅. prod bundle: 0 [analytics] matches.
S3 T-2 carousel. scroll-padding-left:1.5rem, last:mr-6. No soft-hairline borders found in ProofsCarousel. Video deferred: no demo asset. PR#20 54c734f. gates ✅.

Waves 2+3 · 2026-04-20

SA T-4 intake. NEXT_PUBLIC_TALLY_URL → site.intakeUrl, mailto removed from intake CTAs, intake_open event fires w/ source per location. Prod-gate env assertion in lib/site.ts on VERCEL_ENV==production. PR#22 90d083f. gates ✅. Async-track race on same-tab nav deferred (sendBeacon covers common case).
SB T-5 faq. 8 MDX entries ≥80w, plain-string search, tag filter via useSearchParams+router.replace (URL state), faq_search+faq_tag_filter+faq_ask_cta_click events. Nav "About" clipping at 375px flagged pre-existing — resolved in SD via Nav refactor. PR#23 3d235d7. gates ✅.
SC T-6 case-studies. /case-studies index + /case-studies/[slug] detail. MDX loader mirrors artifacts.ts+faq.ts pattern, throws at build on missing frontmatter. Seed tripadvisor-precursor.mdx 889 body words, 8 sections per executor brief (Problem/Approach/Stack/Metrics before/Metrics after/What I built/What I'd do differently/Lessons). CaseStudyViewTracker client one-shot mount. case_study_view + case_study_cta_click{slug,target:"fractional"} wired. Landing proof callout under carousel. metricpilot.mdx inline+structured cross-link, TripAdvisor count stays at 1. Build req NODE_OPTIONS=--max-old-space-size=4096 (prior OOM exit 137). PR#24 e76139f. gates ✅.
SD T-7 ia-split. 4 new routes: /services (3 cards: Fractional /fractional; Audit+Custom Tally via intakeSource), /training (ChatGPT €249 + Coming-soon), /products (ProofsCarousel reuse), /cv (bio+work history+toolbelt+contacts, OG type=profile). Nav.tsx → client, 6 links Services·Training·Products·Fractional·FAQ·CV, name→/cv, nav_click on 7 sites (1 static + 6 mapped). Landing slim: 550L/1903W → 207L/625W (−62.4%/−67.2%). Redirects = none (zero #services/#about/#training external-share evidence in git log + SYNC_LOG + AGENT_HANDOFF). Lighthouse desktop: /services 98, /training 100, /products 100, /cv 100. All per-route meta distinct. 375px sweep on 9 routes — no overflow. PR#25 c3a296d. gates ✅.
SE tracking log (this PR). SYNC_LOG + AGENT_HANDOFF + impl-overview + loop-log updates for Waves 2+3 + PR#21 backfill.
