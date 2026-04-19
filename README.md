# portfolio-v2

Personal portfolio site. Next.js 15 App Router + Tailwind v4 + Serwist PWA. Registry of shipped proofs.

## Stack

- Next.js 15 (App Router, React 19)
- TypeScript 5.7 (strict)
- Tailwind v4
- Serwist 9 (service worker)
- MDX proofs via `gray-matter` + `react-markdown`
- Deploy target: Vercel

## Scripts

```bash
npm run dev      # next dev
npm run build    # next build (includes SW bundle to public/sw.js)
npm run start    # next start (prod)
npm run lint     # next lint
```

## Structure

```
app/            # App Router pages, layout, OG image, manifest, sitemap, robots, sw.ts
components/     # UI components (Nav, Footer, Artifact* cards, CTA, Container)
content/
  proofs/       # MDX proofs
  artifacts.registry.json
lib/
  site.ts       # site metadata (edit before prod deploy)
  artifacts.ts  # MDX loader + helpers
public/         # static assets + theme + design previews
```

## Deploy

See `DEPLOY.md` for Vercel deploy steps + env vars. Required: `NEXT_PUBLIC_SITE_URL`.

## License

MIT — see `LICENSE`.
