# impl-intake

Wave 2 · T-4 · PR `feat/T-4-tally-intake`

## Scope

Replace the placeholder `mailto:` intake with a single env-driven Tally URL used by every intake CTA on the site. Wire the `intake_open` analytics event from the Wave 1 taxonomy so we can attribute fill-rate back to entry point.

## Decisions (locked, not revisited)

- Provider: Tally. URL held in `NEXT_PUBLIC_TALLY_URL`, not hard-coded.
- Open in same tab (no `target="_blank"`). Preserves referrer for Tally attribution.
- Build-time assertion: `lib/site.ts` throws at module load in production if the env is missing.
- Every intake CTA fires `intake_open` with a location-specific `source` string.

## Changes

- `lib/site.ts`
  - `intakeUrl` now reads from `process.env.NEXT_PUBLIC_TALLY_URL`.
  - Production guard throws if unset.
- `.env.example`
  - Added `NEXT_PUBLIC_TALLY_URL` placeholder alongside existing `NEXT_PUBLIC_SITE_URL`.
- `.env.local` (gitignored)
  - Local dev reads the actual Tally URL from here.
- `components/CTA.tsx`
  - New `intakeSource?: string` prop. When set: fires `intake_open` with `{ source }` on click AND forces same-tab (no `target="_blank"`, no `rel="noreferrer"`).
  - Existing `onTrack` behavior unchanged; both events can fire from a single click.
- `app/page.tsx`
  - Services-panel intake CTA: `intakeSource="home-services"`.
- `app/fractional/page.tsx`
  - `intakeHref` now references `site.intakeUrl` instead of a mailto.
  - Hero intake CTA: `intakeSource="fractional-hero"` (co-fires `fractional_cta_click { position: "hero" }`).
  - Final/engagement intake CTA: `intakeSource="fractional-engagement"` (co-fires `fractional_cta_click { position: "footer" }`).

## CTAs wired

| location | source | co-fires |
|---|---|---|
| `/#services` price panel | `home-services` | — |
| `/fractional` hero | `fractional-hero` | `fractional_cta_click { position: "hero" }` |
| `/fractional` engagement block | `fractional-engagement` | `fractional_cta_click { position: "footer" }` |

## Not in scope

- `app/page.tsx` training section "Book a session" CTA remains a mailto (training, not intake).
- `app/page.tsx` About-block generic "Email" CTA stays as `mailto:${site.email}` — contact surface, not intake.
- `components/Footer.tsx` email link stays — contact surface, not intake.
- `content/proofs/chatgpt-training.mdx` `mailto:` stays — training, not intake.

## Verification

- `grep -r "mailto:simonsangla" app components lib` → 0 results in shipped code.
- `grep -r "site\.intakeUrl" app components` → 3 call sites, all `intakeSource` wired.
- Local dev: clicking any wired CTA navigates to the Tally URL in the same tab and logs `[analytics] intake_open { source: ... }` to the console.

## Production checklist

- [ ] Set `NEXT_PUBLIC_TALLY_URL` in Vercel project env (Production + Preview).
- [ ] Confirm build fails loudly if the env is unset (current guard).

## Depends on

- Wave 1 (`lib/analytics.ts` `intake_open` event + `CTA` `onTrack` prop).

## References

- Plan: `context/plans/build-site-portfolio-rewrite.md` → T-4.
- Kit: `context/kits/analytics.md` (`intake_open` event shape).
