// Site metadata. All strings consumed by layout.tsx, Nav.tsx, Footer.tsx,
// page.tsx, opengraph-image.tsx, sitemap.ts, robots.ts.
//
// RECONSTRUCTED from README.md + component references (Simon's best-guess fill).
// Override NEXT_PUBLIC_SITE_URL at build time in Vercel env to avoid hardcoding.

export const site = {
  name: "Simon Sangla",
  tagline: "Revenue root causes, shipped in four weeks.",
  description:
    "Practitioner landing page for Simon Sangla — data & AI builder. Fixed-scope engagements: revenue root cause diagnostics for B2C scale-ups on Snowflake. Registry of shipped proofs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://simonsangla.com",
  location: "Lisbon",
  email: "simonsangla@gmail.com",
  github: "https://github.com/simonsangla",
  linkedin: "https://www.linkedin.com/in/simonsangla/",
  // Services #services anchor on the homepage is the default intake target.
  // Swap to a Tally/Typeform URL when live.
  intakeUrl: "mailto:simonsangla@gmail.com?subject=Intake%20—%20Revenue%20Root%20Cause%20Engine",
} as const;

export type Site = typeof site;
