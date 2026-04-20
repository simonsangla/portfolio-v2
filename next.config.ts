import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  // Keep SW disabled in dev to avoid cache-churn pain during iteration.
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin workspace root to this repo — stops Next from inferring it from
  // an ambient parent lockfile (e.g. ~/pnpm-lock.yaml).
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/proofs/prompto",
        destination: "/proofs/dual-pronto",
        permanent: true,
      },
    ];
  },
};

export default withSerwist(nextConfig);
