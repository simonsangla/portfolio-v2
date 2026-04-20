# impl-ia

Wave 3 · T-7 · PR `feat/T-7-ia-split`

## Scope

Route split per kit `information-architecture.md` R1–R8. Landing slimmed; bio + offering detail moved to owned routes; nav restructured; name link → /cv.

## Decisions (locked)

- Four new routes: `/services`, `/training`, `/products`, `/cv`.
- Landing contents (per R2): hero + differentiator + 3-card section → /services /training /products + proofs carousel + case-study callout + final CTA → /fractional.
- Removed from landing: full bio (→ /cv), full service detail (→ /services), full training detail (→ /training).
- Nav link set: Services · Training · Products · Fractional · FAQ · CV. Name link → /cv. `Nav.tsx` became a client component to fire `nav_click` on every link.
- `/products` reuses `ProofsCarousel` + `loadArtifacts()` — no duplicate catalog.
- `/services` lists three cards (fractional, audit, custom builds). Fractional links to `/fractional`; audit + custom link to Tally via `intakeSource="services-audit"` / `"services-custom"`.
- `/training` shows one card (ChatGPT training, €249), with a "Coming soon" footer.
- `/cv` carries bio + work history + toolbelt + contact surfaces. Reuses landing tokens only.
- Redirects: NO. See "Redirect decision" below.

## Files

- `app/services/page.tsx` (new)
- `app/training/page.tsx` (new)
- `app/products/page.tsx` (new)
- `app/cv/page.tsx` (new)
- `app/page.tsx` (slimmed, 550 → 207 lines)
- `components/Nav.tsx` (new link set, name → /cv, nav_click wired)
- `app/sitemap.ts` (added /services /training /products /cv)
- `next.config.ts` (NOT edited — no redirects)
- `context/impl/impl-ia.md` (this file)

## Redirect decision

Default (per kit R6): NO redirects added. `next.config.ts` unchanged.

Evidence gathered (Step 5.2):
```
git log --all --oneline | grep -iE "anchor|redirect|#services|#about" | head
# → zero matches
grep -rn "#services\|#about\|#training" SYNC_LOG.md AGENT_HANDOFF.md
# → zero matches
```

Conclusion: site is one month old; no external embeds of `/#services`, `/#training`, or `/#about` anchors documented or logged. Adding redirects for hypothetical inbound anchors has negative EV (Next.js fragment redirects don't work reliably at HTTP level — fragments are client-side). Skipping.

## Analytics events

- `nav_click` — fires on every header Link onClick with `{ target: "<path>" }`. Applies to both name logo (→ /cv) and the 6 nav links.
- Hero CTAs on landing keep `hero_cta_click` with `{ variant: "products" }`.
- `/services` audit + custom cards fire `intake_open` with `source` = `services-audit` / `services-custom`.

## Landing delta

- Lines: 550 → 207 (62.4% reduction).
- Words: 1903 → 625 (67.2% reduction).

## Lighthouse (desktop, `next start` + headless Chrome)

- `/services`: 98
- `/training`: 100
- `/products`: 100
- `/cv`: 100

All ≥ 90 per kit R8 target.

## Depends on

- Stage A (intake): `CTA` `intakeSource` plumbing.
- Stage C (case-studies): landing callout links here; /case-studies visible via callout.

## References

- Kit: `context/kits/information-architecture.md` R1–R8.
- Plan: `docs/superpowers/plans/2026-04-20-waves-2-3-finish.md` (this plan).
