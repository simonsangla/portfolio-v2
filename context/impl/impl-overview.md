---
created: "2026-04-19"
last_edited: "2026-04-20"
---

# Implementation Overview

## Domain Status
| Domain | Tasks Done | Tasks Total | Status |
|--------|-----------|-------------|--------|
| content | 2 (T-1, T-2) | — | ✅ Wave 1 complete; T-2 video deferred |
| analytics | 1 (T-3) | — | ✅ Wave 1 complete |
| ui | 1 (T-2 carousel polish) | — | ✅ Wave 1 complete; hero video deferred |
| intake | 1 (T-4) | — | ✅ Wave 2 Stage A complete — see `impl-intake.md` |
| faq | 1 (T-5) | — | ✅ Wave 2 Stage B complete — see `impl-faq.md` |
| case-studies | 1 (T-6) | — | ✅ Wave 2 Stage C complete — see `impl-case-studies.md` |
| information-architecture | 1 (T-7) | — | ✅ Wave 3 Stage D complete — see `impl-ia.md` |

## Wave 1 Summary (2026-04-20)
- Stage 0 (chore/gitignore + DESIGN.md): PR [#17](https://github.com/simonsangla/portfolio-v2/pull/17) · `ac16eff`
- Stage 1 (T-1 content rewrite): PR [#18](https://github.com/simonsangla/portfolio-v2/pull/18) · `c351ce7`
- Stage 2 (T-3 analytics events): PR [#19](https://github.com/simonsangla/portfolio-v2/pull/19) · `1ecd8bc`
- Stage 3 (T-2 carousel polish): PR [#20](https://github.com/simonsangla/portfolio-v2/pull/20) · `54c734f`
- Tracking log: PR [#21](https://github.com/simonsangla/portfolio-v2/pull/21) · `48e6813`

## Waves 2+3 Summary (2026-04-20)
- Stage A (T-4 Tally intake): PR [#22](https://github.com/simonsangla/portfolio-v2/pull/22) · `90d083f`
- Stage B (T-5 FAQ page): PR [#23](https://github.com/simonsangla/portfolio-v2/pull/23) · `3d235d7`
- Stage C (T-6 TripAdvisor case study): PR [#24](https://github.com/simonsangla/portfolio-v2/pull/24) · `e76139f`
- Stage D (T-7 IA route split): PR [#25](https://github.com/simonsangla/portfolio-v2/pull/25) · `c3a296d`
- Tracking log: this PR.

## Deferred
- **T-2 hero video**: no product demo asset in repo. Add when a recorded demo lands. See `TODO(T-2-video)` stub in `app/page.tsx`.
- **Analytics async-track race on same-tab nav**: accepted as deferred (Vercel `sendBeacon` flush on `pagehide` covers the common case). Carried from PR #22.
- **Maskable PWA icon**: `DEPLOY.md` follow-up #3 — add a maskable 512×512 PNG for full Lighthouse PWA green.
- **Kit R5 two-level horizontal pattern on /services and /training**: executor brief omitted R5 from Stage D checklist; /services + /training ship vertical card patterns. Follow-up: kit author to decide whether to relax R5 or refactor.
- **Hero CTA #2 onTrack variant**: second hero CTA on landing keeps `variant: "products"` even though it targets `/services`. Pre-existing from Wave 1. Micro-PR candidate.

## Next wave
Wave 4 candidates (demand-driven, unchanged): T-8 Auth + Stripe, T-9 Locked demos.
