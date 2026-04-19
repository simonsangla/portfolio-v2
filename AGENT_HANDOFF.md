# AGENT_HANDOFF — portfolio-v2

Last updated: 2026-04-19

## Recent batches

- **2026-04-19 — `/fractional` page ([#13](https://github.com/simonsangla/portfolio-v2/pull/13), merged `db9eb0d`).** Added `app/fractional/page.tsx` (hero + what I do + 4-phase how-it-works + engagement card + fit/not-fit columns + background + final CTA). Reused `Container`/`CTA`/`SectionReveal` + existing tokens only — no new colors/fonts/inline CSS. Added `/fractional` to `app/sitemap.ts` (priority 0.9, monthly). Gates green (lint + typecheck + build). Live at `simonsangla-portfolio-v2.vercel.app/fractional` (HTTP 200). Custom domain `simonsangla.com` was unreachable from this session env — DNS or domain not yet bound; verify after next DNS edit.

## What was built (bootstrap)

Bootstrap executed via `~/.claude/skills/repo-bootstrap/SKILL.md` (draft, Vite-oriented — adapted to Next.js). Three batches: root commit + security/CI PR + this handoff PR.

### B1 — root commit (`68482a9`, direct push to main, one-time exception)

- `LICENSE` (MIT; public repo requires explicit license)
- `.gitignore` (Next.js + Serwist SW output + `.DS_Store` + `.claude/settings.local.json`)
- `README.md` (stack, scripts, structure, deploy pointer)
- Scaffold from `Simon_Sangla___Design_System.zip`: `app/`, `components/`, `content/`, `lib/`, `public/`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `package.json`, `package-lock.json`, `DEPLOY.md`
- Patched `next` from `15.1.6` → `^15.5.15` to close 14 CVEs in the 15.1.6 version range (GHSA-3h52-269p-cp9r, GHSA-9qr9-h5gf-34mp, GHSA-f82v-jwr5-mffw, GHSA-xv57-4mr9-wg8v, GHSA-4342-x723-ch2f, GHSA-67rr-84xm-4c7r, GHSA-g5qg-72qw-gw5v, GHSA-w37m-7fhw-fmv9, GHSA-mwv6-3258-q52c, GHSA-9g9p-9gw9-jx7f, GHSA-h25m-26qc-wcjf, GHSA-ggv3-7p47-pfv8, GHSA-3x4c-7xq6-9pq8, GHSA-q4gf-8mx6-v5v3)

Branch protection set immediately after push: linear history required, no force push, no deletion, conversation resolution required, admin bypass on (solo repo).

### B2 — security + CI baseline (PR #1, squash-merged `7a0198b`)

- `.github/dependabot.yml` — weekly `npm` + `github-actions`; minor/patch version updates grouped
- `.github/workflows/ci.yml` — least-privilege (`permissions: contents: read`), actions pinned to full commit SHA, concurrency cancellation, Node 22, gates: lint + typecheck + build
- `eslint.config.mjs` — flat config (`next/core-web-vitals` + `next/typescript` via `FlatCompat`)
- `package.json` — `lint` → `eslint .` (migrated off deprecated `next lint`), added `typecheck` → `tsc --noEmit`. devDeps: `eslint@^9`, `eslint-config-next@^15.5.15`, `@eslint/eslintrc@^3`
- `next.config.ts` — `outputFileTracingRoot: __dirname` (stops Next inferring workspace root from `~/pnpm-lock.yaml`)
- Lint hygiene: named default exports in `postcss.config.mjs` + `eslint.config.mjs`; removed stale `eslint-disable no-console` in `components/ServiceWorkerRegister.tsx`

After merge, branch protection updated to require `lint + typecheck + build` status check with `strict: true`.

### B3 — this handoff (PR #2)

## Gate status (as of merge of B2 into `main`, commit `7a0198b`)

| Gate | Status | Notes |
|---|---|---|
| lint | ✅ | `eslint .` flat config, 0 errors / 0 warnings |
| typecheck | ✅ | `tsc --noEmit` |
| test | ⏭ SKIPPED | No framework installed. Static portfolio, low ROI. Revisit if scope grows. |
| build | ✅ | `next build` — 15 static pages, Serwist SW bundled to `public/sw.js` |
| audit | ✅ | `npm audit` — 0 vulnerabilities |
| CI required in branch protection | ✅ | Readback confirmed post-merge |

## Stack (locked)

- Next.js `^15.5.15` (App Router)
- React `^19.0.0`
- TypeScript `^5.7.3` (strict, `noEmit`, `moduleResolution: bundler`)
- Tailwind CSS `^4.0.0` (v4 `@theme {}` syntax in `app/globals.css` — do not downgrade)
- Serwist `^9.0.14` (`public/sw.js` generated at build; disabled in dev)
- MDX: `gray-matter` + `react-markdown` + `remark-gfm`
- Analytics: `@vercel/analytics`
- Deploy target: Vercel

## Outstanding follow-ups

From `DEPLOY.md`:
1. **`lib/site.ts`** values are best-guess placeholders from the source zip. Verify and edit before first prod deploy. Fields: `name`, `tagline`, `description`, `url`, `location`, `email`, `github`, `linkedin`, `intakeUrl`.
2. **`intakeUrl`** defaults to a mailto. Replace with Tally/Typeform when live.
3. **No maskable PWA icon.** `public/icon.svg` is `purpose: any` only. Add a maskable 512×512 PNG with safe-zone padding for full Lighthouse PWA green.
4. **`@vercel/analytics`** is wired in `app/layout.tsx`. Enable Analytics in Vercel dashboard or remove the import to drop the dep.
5. **Env var `NEXT_PUBLIC_SITE_URL`** must be set in Vercel before first prod deploy. Otherwise `site.url` falls back to `https://simonsangla.com`, breaking sitemap/OG/SEO on preview domains.

New follow-ups discovered during bootstrap:
6. **Test framework.** Skipped at bootstrap. If adding client-side interactivity or lib utilities beyond static MDX rendering, add Vitest + `@testing-library/react` + update CI gate.
7. **Next 16 migration.** When Next 15 approaches EOL, migrate: `eslint-config-next` peer dep will force `eslint@10+`; `next lint` already removed; new breaking changes per Next 16 release notes.
8. **`~/pnpm-lock.yaml` pollution.** Unrelated lockfile in home dir polluted workspace-root inference. Masked with `outputFileTracingRoot`. Not load-bearing, but worth resolving at the source eventually.

## Next action

Bootstrap is complete. No further bootstrap work required. Any next work should follow:

- **Branch → PR → CI → merge** (never push directly to `main`).
- **Stage specific files** (never `git add -A` or `git add .`).
- **Update this file** after every meaningful batch: what was built, files changed, gate status, next action.
- **Check open Dependabot PRs** before starting a new batch: `gh pr list --author app/dependabot --state open`.
- **Review PR comments + bot feedback** before merge: `gh pr view N --comments`, `gh pr view N --json reviews`, `gh pr checks N`.

Likely next product work (in rough priority order):
1. Verify + edit `lib/site.ts` with real metadata → Vercel preview deploy → set `NEXT_PUBLIC_SITE_URL` → prod deploy.
2. Replace placeholder `intakeUrl` with real intake form.
3. Optional: add maskable PWA icon variant.

## References

- Bootstrap skill: `~/.claude/skills/repo-bootstrap/SKILL.md` (draft, as of 2026-04-16)
- Deploy playbook: `DEPLOY.md`
- README: `README.md`
- CI workflow: `.github/workflows/ci.yml`
- Dependabot config: `.github/dependabot.yml`
- ESLint config: `eslint.config.mjs`
