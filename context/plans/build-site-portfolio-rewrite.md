---
created: "2026-04-20"
last_edited: "2026-04-20"
build_site: portfolio-rewrite
status: draft
---

# Build Site — Portfolio v2 Rewrite

Implements the reviewer-driven backlog from meeting `zyp-zqmq-zif (2026-04-19)`. 9 PRs across 4 waves. Each PR = one task tier. All tasks reference cavekit requirements where applicable.

## Locked decisions
- Intake provider: **Tally**
- Email transactional (when needed): **Resend**
- Auth (deferred): **Auth.js v5 (NextAuth) + Google provider**
- Cert generator: **backlog**
- Newsletter: **out of scope (separate repo)**

## Universal gates (every PR)
- `npm run lint` — 0 errors / 0 warnings
- `npm run typecheck` — pass
- `npm run build` — pass
- `npm audit` — 0 high/critical
- Branch → PR → CI green → merge (no direct push to main)
- Stage specific files (no `git add -A`)
- Update `SYNC_LOG.md` + `AGENT_HANDOFF.md` after merge
- Update `context/impl/impl-overview.md` per affected domain

## Universal executor contract
Every task below is given to a builder agent (e.g. `bp:builder` or `bp:task-builder`) with this contract envelope:

```
INPUTS:
  - task_id (T-x)
  - kit_refs (R-IDs from referenced kit files)
  - files_to_touch (whitelist; agent MUST NOT modify others)
  - decisions (locked choices to honor)
PROCESS:
  - Read referenced kit + DESIGN.md before writing code
  - Implement only what R-IDs require
  - Run universal gates locally before reporting done
OUTPUTS:
  - Diff confined to files_to_touch
  - PR description listing R-IDs satisfied
  - Updated impl tracking (context/impl/impl-{domain}.md)
DEFINITION OF DONE:
  - All R-IDs in scope have visibly satisfied acceptance criteria
  - Universal gates green
  - No new runtime deps unless R-ID explicitly authorizes
  - No edits outside files_to_touch
```

---

## Wave 1 — Positioning sprint

### T-1 — PR A: Content rewrite (hero + products + fractional)
**Type**: direct (no kit — pure content edits)
**Depends on**: none
**Estimated effort**: 2–3 hrs
**Impact**: HIGH — addresses 6 reviewer complaints
**Blast radius**: low (content only)

**Files to touch**:
- `lib/site.ts` (tagline + new differentiator field)
- `app/page.tsx` (hero strip, slimmed copy)
- `app/fractional/page.tsx` (engagement model)
- `content/proofs/prompto.mdx` → rename to `dual-pronto.mdx` (+ slug redirect)
- `content/proofs/metricpilot.mdx` (audience line, ≤1 TripAdvisor mention)
- `content/proofs/prompt-optimizer.mdx` (punchy hook, tech moves to detail)
- `content/proofs/chatgpt-training.mdx` (offline/local promoted, plain-English topics)
- `app/sitemap.ts` (slug redirect entry if needed)
- `next.config.ts` (301 from old `/proofs/prompto` → `/proofs/dual-pronto`)

**Executor contract additions**:
- INPUTS extra: meeting transcript excerpt (specific reviewer quotes per product)
- DECISIONS:
  - "loop" / "looping" → "interactive"
  - TripAdvisor mention cap: ≤1 per card body
  - `/fractional` engagement = kickoff + async + 1hr/wk status check (NOT "zero meetings")
  - Hero differentiator strip copy: `100% offline · local-only · no data leak`
- DOD additions:
  - Manual diff review: confirm no card has TripAdvisor >1×
  - 301 redirect verified via `curl -I` after preview deploy

**Acceptance**: reviewer's 6 content complaints resolved (verifiable line-by-line vs meeting notes).

---

### T-2 — PR B: Hero demo + carousel polish
**Type**: direct
**Depends on**: T-1 (so copy is final before visual polish)
**Estimated effort**: 3–4 hrs (depends on whether demo video exists)
**Impact**: HIGH (reviewer ask)
**Blast radius**: low–medium (visual)

**Files to touch**:
- `components/ProofsCarousel.tsx` (contrast, borders, peek-next-card, mobile padding)
- `app/page.tsx` (embed video block — Loom OR self-hosted MP4 from `public/`)
- `app/globals.css` OR `app/theme.generated.css` (only if a token genuinely missing)

**Executor contract additions**:
- INPUTS extra: video file path or Loom URL (BLOCKER: ask Simon if missing)
- DECISIONS:
  - If no video: ship carousel polish only, leave commented stub `{/* TODO video — see SYNC_LOG */}` in hero
  - Video must respect `prefers-reduced-motion` (no autoplay if reduced)
  - Carousel border + contrast values pulled from `context/designs/DESIGN.md` tokens — do not invent
- DOD additions:
  - Mobile (375px) screenshot attached to PR
  - Lighthouse desktop score ≥ pre-PR baseline

**Acceptance**: carousel reads as a carousel on first scroll (verified by 3rd-party glance test). Video plays on click.

---

## Wave 2 — Lead capture

### T-3 — PR E: Analytics events
**Type**: cavekit (`analytics.md`)
**Depends on**: none (can ship in parallel with Wave 1)
**Kit refs**: R1, R2, R3, R4, R5, R6
**Estimated effort**: 2 hrs
**Impact**: HIGH (enables measurement of all other waves)
**Blast radius**: low (additive wrapper + CTA prop extension)

**Files to touch**:
- `lib/analytics.ts` (new)
- `lib/analytics.README.md` (new)
- `components/CTA.tsx` (extend props with `onTrack`)
- `app/page.tsx` (wire hero CTA tracking)
- `app/fractional/page.tsx` (wire fractional CTA tracking)
- Wherever existing product cards live (wire `product_card_click`)

**Executor contract additions**:
- INPUTS extra: full taxonomy from `context/kits/analytics.md` R2
- DECISIONS:
  - Free-text props banned except `faq_search.query` (truncate to 64)
  - No new analytics provider — Vercel only
- DOD additions:
  - `npm run dev` + click each wired CTA + capture console.debug output in PR description
  - Verify `track()` is no-op in SSR (smoke test in `next build` output)

**Acceptance**: every event in R2 fires from the location specified.

---

### T-4 — PR C: Tally intake
**Type**: direct
**Depends on**: Tally form built (Simon, out-of-band) + T-3 for `intake_open` event
**Estimated effort**: 1 hr (build form on Tally) + 1 hr code swap
**Impact**: HIGH (closes outstanding bootstrap follow-up #2)
**Blast radius**: low

**Files to touch**:
- `lib/site.ts` (`intakeUrl` → Tally URL; remove mailto)
- All CTA usages of `intakeUrl` (grep first)
- `.env.example` (add `NEXT_PUBLIC_TALLY_URL` if Simon prefers env-driven)

**Tally form spec** (build before T-4 starts):
- Step 1 — When are you looking to partner? (3 weeks / 3 months / Just exploring)
- Step 2 — Why? (free text, optional)
- Step 3 — Primary goal? (multi-select: lead gen / brand / traffic / product launch / other)
- Step 4 — Channel interest? (multi-select: fractional / training / products / not sure)
- Step 5 — Budget? (single-select: <5K / 5–20K / 20–50K / 50K+ / TBD)
- Step 6 — Anything else? (free text, optional)
- Step 7 — Name + email (required)

**Executor contract additions**:
- INPUTS extra: confirmed Tally URL
- DECISIONS:
  - Open in same tab (not new tab) — keeps analytics referrer
  - Wire `intake_open` event from T-3 on every CTA that opens Tally
- DOD additions:
  - `grep -r "mailto:simonsangla" .` returns 0 results in app code (not in lib/site.ts comment, OK)
  - End-to-end: click hero CTA → land on Tally form

**Acceptance**: no mailto in shipped code. Tally form captures all 7 steps. Event fires.

---

### T-5 — PR D: FAQ page
**Type**: cavekit (`faq.md`)
**Depends on**: T-3 (analytics events) + T-4 (intake URL)
**Kit refs**: R1, R2, R3, R4, R5, R6, R7
**Estimated effort**: 4 hrs (mostly content writing)
**Impact**: MEDIUM
**Blast radius**: low (new route)

**Files to touch**:
- `lib/faq.ts` (new — loader, mirrors `lib/artifacts.ts`)
- `app/faq/page.tsx` (new)
- `components/FaqSearch.tsx` (new client component)
- `components/FaqCard.tsx` (new)
- `content/faq/*.mdx` (new — 8 files seed)
- `app/sitemap.ts` (add `/faq`)
- Header nav (add FAQ link — coordinate with T-7 nav split if landing first)

**Executor contract additions**:
- INPUTS extra: 8 FAQ topic seeds from `faq.md` R5
- DECISIONS:
  - Plain string match only — no fuzzy search lib
  - URL state via `useSearchParams` (Next 15 App Router pattern)
- DOD additions:
  - All 8 FAQ entries have substantive ≥80-word answers
  - Search "price" returns Pricing FAQ
  - Tag click filters in URL
  - `intake_open` event fires from "ask anything" CTA

**Acceptance**: all 7 R-IDs in `faq.md` satisfied with visible UI.

---

## Wave 3 — IA + proof

### T-6 — PR G: TripAdvisor case study
**Type**: cavekit (`case-studies.md`)
**Depends on**: T-1 (so MetricPilot card already cleaned of repetition)
**Kit refs**: R1, R2, R3, R4, R5, R6, R7
**Estimated effort**: 4 hrs writing + 1 hr template
**Impact**: HIGH (B2B trust)
**Blast radius**: low (new route + 1 cross-link)

**Files to touch**:
- `lib/case-studies.ts` (new — loader)
- `app/case-studies/page.tsx` (new — index)
- `app/case-studies/[slug]/page.tsx` (new — detail)
- `content/case-studies/tripadvisor-precursor.mdx` (new — seed)
- `content/proofs/metricpilot.mdx` (add link to case study)
- `app/page.tsx` (proof callout linking to case study)
- `app/sitemap.ts` (add entries)

**Executor contract additions**:
- INPUTS extra: source material — meeting transcript excerpts about TripAdvisor work
- DECISIONS:
  - Client name "TripAdvisor" usable here (it's the case study's whole point — not landing card)
  - 600 ≤ word count ≤ 1500
- DOD additions:
  - All 8 sections from R2 visibly present
  - Reading test: a stranger can summarize what was built in 30 seconds after reading

**Acceptance**: TripAdvisor case study reads as proof, not as branding noise.

---

### T-7 — PR F: Route split + name → CV
**Type**: cavekit (`information-architecture.md`)
**Depends on**: T-1 (final copy), T-3 (events for nav), T-6 (case study to link from landing)
**Kit refs**: R1, R2, R3, R4, R5, R6, R7, R8
**Estimated effort**: 1–2 days
**Impact**: MEDIUM (validates only with T-3 measurement)
**Blast radius**: HIGH — touches nav, sitemap, landing, redirects

**Files to touch**:
- `app/services/page.tsx` (new)
- `app/training/page.tsx` (new)
- `app/products/page.tsx` (new)
- `app/cv/page.tsx` (new)
- `app/page.tsx` (slim down)
- `components/Nav.tsx` (new nav structure + CV link on name)
- `app/sitemap.ts` (add new routes)
- `next.config.ts` (301s for any anchor that shipped externally)

**Executor contract additions**:
- INPUTS extra: route → content map from `information-architecture.md` R1 table
- DECISIONS:
  - 301 only the anchors known to be shared externally (LinkedIn posts, SYNC_LOG mentions); don't 301 everything blindly
  - Each new route gets unique meta but shares OG image for now
- DOD additions:
  - Lighthouse desktop ≥90 on all new routes
  - `view-source` on each route shows distinct meta
  - `nav_click` event fires for each header link
  - Click "Simon Sangla" in header → `/cv` (manual verify)

**Acceptance**: all 8 R-IDs satisfied. Reviewer's "I'm confused which page does what" feeling resolved.

---

## Wave 4 — Convert when there's demand (DEFERRED)

### T-8 — PR H: Auth.js v5 + Stripe
**Type**: cavekit (TODO — write `auth-and-payments.md` when triggered)
**Depends on**: real buyer demand
**Trigger**: prospect asks "how do I pay?"
**Estimated effort**: 1–2 days
**Impact**: 0 until demand exists. Don't pre-build.

**Sketch executor contract** (write full when triggered):
- INPUTS: NextAuth provider list (Google), Stripe products schema, paywall component spec
- DECISIONS:
  - Auth.js v5 (App Router native)
  - Stripe Checkout + webhook (no embedded form first pass)
  - Webhooks at `app/api/stripe/webhook/route.ts`
  - Sessions: NextAuth default JWT
  - Env vars: `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- DOD: end-to-end purchase test in Stripe test mode

---

### T-9 — PR I: Locked demo apps
**Type**: per-product (each demo = its own micro-task)
**Depends on**: prospect ask
**Trigger**: "can I see it?"
**Approach**: deploy each product to subdomain, seeded data, watermarked, read-only

**Sketch executor contract**:
- INPUTS: product slug + production code repo + seed data set
- DECISIONS:
  - Subdomain pattern: `{product-slug}-demo.simonsangla.com`
  - Watermark: persistent banner "DEMO — read-only — built by Simon Sangla"
  - Auth: none (public read-only) OR password-gate via Vercel preview password
- DOD: link from product card → demo loads in <3s, no write actions possible

---

## Backlog (not sequenced — write kit when triggered)

| Item | Trigger to start | Notes |
|---|---|---|
| Cert generator | Training has 3+ paying students | Resend + `@react-pdf/renderer`. Per Simon's call. |
| Newsletter pipeline | Standalone repo decision | Multi-agent (scan / analyze / optimize / render / send). Out of portfolio scope. |
| Maskable PWA icon | PWA score becomes a marketing asset | From bootstrap follow-up #3. |
| Test framework | Client-side complexity grows | Vitest + RTL. Add CI gate. |
| Per-route OG images | Social sharing becomes a channel | Currently shared OG via `app/opengraph-image.tsx`. |

---

## Dependency graph

```
T-1 (content) ──┬──> T-2 (carousel + video)
                ├──> T-6 (case study)
                └──> T-7 (IA split — also needs T-3, T-6)
T-3 (analytics) ─────> T-4 (intake) ──> T-5 (FAQ — also needs T-3)
                       │
                       └────> T-7 (IA — for nav events)
T-8, T-9 (deferred — wait for demand signal)
```

## Ship cadence (target)

| Week | Tasks | Artefact |
|---|---|---|
| 1 | T-1 → T-2 → T-3 (parallel) | Positioning + carousel + measurement live |
| 2 | T-4 → T-5 | Lead capture + FAQ live |
| 3 | T-6 → T-7 | Proof + IA split live |
| On demand | T-8 / T-9 | When buyers appear |

---

## How to dispatch a task to an executor

For each T-x, dispatch via:

```
Agent({
  description: "Implement T-x: <title>",
  subagent_type: "bp:task-builder" | "bp:builder",
  prompt: """
    Build site: context/plans/build-site-portfolio-rewrite.md
    Task: T-x
    Read first: context/kits/<kit>.md (if cavekit) AND context/designs/DESIGN.md
    Touch only files listed in T-x files_to_touch.
    Honor universal executor contract + task-specific additions.
    Run universal gates before reporting done.
    Update context/impl/impl-<domain>.md with what was built.
  """
})
```

Parallelizable in one dispatch: T-1 ‖ T-3 (independent) ; T-2 ‖ T-6 (after T-1).
