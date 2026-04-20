// Site metadata. All strings consumed by layout.tsx, Nav.tsx, Footer.tsx,
// page.tsx, opengraph-image.tsx, sitemap.ts, robots.ts.
//
// Override NEXT_PUBLIC_SITE_URL + NEXT_PUBLIC_TALLY_URL in Vercel env before
// production deploy. Build asserts NEXT_PUBLIC_TALLY_URL is set in prod.

const tallyUrl = process.env.NEXT_PUBLIC_TALLY_URL;

// Gate on Vercel's production environment flag, not NODE_ENV, so CI builds
// and Vercel preview builds don't trip when the env only needs to live in the
// production environment.
if (process.env.VERCEL_ENV === "production" && !tallyUrl) {
  throw new Error(
    "NEXT_PUBLIC_TALLY_URL must be set in the Vercel production environment.",
  );
}

export const site = {
  name: "Simon Sangla",
  tagline: "Revenue root causes, shipped in four weeks.",
  heroTitleLine1: "Data + AI products,",
  heroTitleLine2: "shipped in weeks.",
  heroStatus: "Lisbon · Remote · Booking May 2026",
  description:
    "Practitioner landing page for Simon Sangla — data & AI builder. Fixed-scope engagements: revenue root cause diagnostics for B2C scale-ups on Snowflake. Registry of shipped proofs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://simonsangla.com",
  location: "Lisbon",
  email: "simonsangla@gmail.com",
  github: "https://github.com/simonsangla",
  linkedin: "https://www.linkedin.com/in/simonsangla/",
  intakeUrl: tallyUrl ?? "https://tally.so",
  differentiator: "100% offline · local-only · no data leak",
} as const;

export type Site = typeof site;
