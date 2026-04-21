# AGENTS — portfolio-v2

Public portfolio site for Simon Sangla (simonsangla.com). Next.js 15 App Router,
Tailwind CSS v4, deployed on Vercel.

## Quick context
- Repo: `simonsangla/portfolio-v2` (GitHub, public)
- Live: `simonsangla.com` + Vercel preview per PR
- CI: lint + typecheck + build (all required, enforced via branch protection)
- No test suite (static site)

## Stack at a glance
Next.js 15 App Router · React 19 · TypeScript strict · Tailwind v4 · Serwist PWA · Vercel Analytics

## Key conventions
- Design tokens live in `app/globals.css` (`@theme {}`) — no new colors/fonts without instruction
- Analytics events typed in `lib/analytics.ts` — use only those 12 events
- Intake CTA → `lib/site.ts → site.intakeUrl` (env-driven Tally URL)
- Every new route needs: sitemap entry + unique title/meta description

## Full history
See `AGENT_HANDOFF.md` for complete batch history, PR links, and gate status.

## Resume a session
```bash
cd ~/projects/portfolio-v2
git status
git log --oneline -5
cat AGENT_HANDOFF.md | head -60
```
