# simonsangla-portfolio — Deploy

Built from `Simon_Sangla___Design_System.zip`. Next.js 15 App Router + Tailwind v4 + Serwist PWA + MDX registry of 5 proofs. Build tested green: 15 static pages, SW bundled to `public/sw.js`, OG image + manifest + sitemap + robots live.

## Reconstructed files (not in original zip)

- `lib/site.ts` — site metadata. Fields: `name`, `tagline`, `description`, `url`, `location`, `email`, `github`, `linkedin`, `intakeUrl`.
- `lib/artifacts.ts` — MDX loader. Full `Artifact` type, `loadArtifacts`, `loadArtifact`, `loadArtifactBody`, `getAdjacentArtifacts`, `primaryLink`, `statusLabel`, `yearFromDate`.
- `package.json`, `next.config.ts` (Serwist wrapper), `tsconfig.json`, `postcss.config.mjs`, `.gitignore`.
- `components/ServiceWorkerRegister.tsx` — client SW registration.

Confirm `lib/site.ts` matches your true values before first prod deploy — these are best-guess placeholders.

## Deploy — 4 steps

1. Extract + install

```bash
tar -xzf simonsangla-portfolio.tar.gz
cd portfolio
npm install
```

2. Sanity-check local build

```bash
npm run build
npm run start   # http://localhost:3000
```

3. Deploy to Vercel

```bash
npx vercel login        # once, if not already
npx vercel              # preview deploy — pick new project
npx vercel --prod       # production
```

4. Set env var in Vercel dashboard (Project → Settings → Environment Variables):

```
NEXT_PUBLIC_SITE_URL=https://<your-prod-domain>
```

Redeploy after setting it. Without this, `site.url` falls back to `https://simonsangla.com` — breaks sitemap, OG tags, SEO on preview domains.

## PWA verification

After prod deploy, open DevTools → Application → Manifest. Expected:
- Manifest fetches `/manifest.webmanifest` → 200.
- Service worker at `/sw.js` registers under scope `/`.
- Installable as PWA on mobile + desktop.

Run Lighthouse PWA audit — should be green except for the maskable-icon warning (only `any` purpose exported; add a maskable variant later if needed).

## Known follow-ups

1. **`lib/site.ts` values are inferred.** Verify and edit before committing.
2. **`intakeUrl`** defaults to a mailto. Replace with a Tally/Typeform when live.
3. **No maskable PWA icon** — current `icon.svg` is `purpose: any`. Add a maskable PNG (512×512 with safe-zone padding) if you want perfect Lighthouse PWA.
4. **Tailwind v4 is required** — do not downgrade. `app/globals.css` uses v4 `@theme {}` syntax.
5. **gray-matter auto-parses YAML dates to `Date` objects** — `lib/artifacts.ts` coerces to ISO string. If you add new MDX with different date formats, keep them as `YYYY-MM-DD`.
6. **`@vercel/analytics`** is wired in `app/layout.tsx`. Enable Analytics in the Vercel dashboard or remove the import to drop the dependency.
