// Artifact loader. Reads MDX frontmatter + body from content/proofs/*.mdx.
// Type schema reverse-engineered from ALL component prop usages:
//   ArtifactCard, ArtifactHero, ArtifactMetrics, ArtifactRelated,
//   ArtifactCapture, ArtifactDemo, app/proofs/[slug]/page.tsx, sitemap.ts.
//
// Dependencies: gray-matter (frontmatter parsing).
// All content is local. The `repo` field in content/artifacts.registry.json
// is informational only — no network fetch at build time.

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// ---------- Types ----------

export type ArtifactStatus = "live" | "in-progress" | "shipped" | "archived";
export type ArtifactProtection = "public" | "limited" | "private";

export type ArtifactLink = {
  label: string;
  url: string;
  primary?: boolean;
};

export type ArtifactMetric = {
  label: string;
  value: string;
};

export type ArtifactDemo =
  | { kind: "iframe"; url: string }
  | { kind: "video"; url: string; poster?: string }
  | { kind: "image"; url: string }
  | { kind: "gif"; url: string };

export type Artifact = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  promise: string;
  business_value: string;
  status: ArtifactStatus;
  protection_level: ArtifactProtection;
  date: string; // ISO (YYYY-MM-DD)
  tech_stack: string[];
  links: ArtifactLink[];
  role: string;
  highlights: string[];
  metrics?: ArtifactMetric[];
  capture?: string[];
  demo?: ArtifactDemo;
  related?: string[];
};

// ---------- Helpers (pure) ----------

export function statusLabel(s: ArtifactStatus): string {
  switch (s) {
    case "live":
      return "Live";
    case "in-progress":
      return "In progress";
    case "shipped":
      return "Shipped";
    case "archived":
      return "Archived";
    default:
      return String(s);
  }
}

export function yearFromDate(iso: string): string {
  // Accepts YYYY or YYYY-MM-DD. Falls back to input if unparseable.
  const m = /^(\d{4})/.exec(iso);
  return m ? m[1] : iso;
}

export function primaryLink(links: ArtifactLink[]): ArtifactLink | undefined {
  if (!links || links.length === 0) return undefined;
  return links.find((l) => l.primary) ?? links[0];
}

// ---------- Loader (filesystem) ----------

const PROOFS_DIR = path.join(process.cwd(), "content", "proofs");

async function listMdxFiles(): Promise<string[]> {
  const entries = await fs.readdir(PROOFS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => path.join(PROOFS_DIR, e.name));
}

async function parseMdx(filepath: string): Promise<{ artifact: Artifact; body: string }> {
  const raw = await fs.readFile(filepath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<Artifact> & { date?: unknown };

  // gray-matter (via js-yaml) auto-parses `date: 2026-04-17` as a JS Date.
  // Coerce to ISO YYYY-MM-DD string for comparison + display.
  const rawDate: unknown = fm.date;
  let dateStr = "";
  if (rawDate instanceof Date) {
    dateStr = rawDate.toISOString().slice(0, 10);
  } else if (typeof rawDate === "string") {
    dateStr = rawDate;
  }

  // Minimal defensive fill — every required field must exist in source MDX.
  const artifact: Artifact = {
    slug: fm.slug ?? path.basename(filepath, ".mdx"),
    name: fm.name ?? "",
    tagline: fm.tagline ?? "",
    category: fm.category ?? "",
    promise: fm.promise ?? "",
    business_value: fm.business_value ?? "",
    status: (fm.status ?? "shipped") as ArtifactStatus,
    protection_level: (fm.protection_level ?? "public") as ArtifactProtection,
    date: dateStr,
    tech_stack: fm.tech_stack ?? [],
    links: fm.links ?? [],
    role: fm.role ?? "solo",
    highlights: fm.highlights ?? [],
    metrics: fm.metrics,
    capture: fm.capture,
    demo: fm.demo,
    related: fm.related,
  };

  return { artifact, body: content.trim() };
}

// Module-level cache — MDX does not change between requests in a single build.
let _cache: Promise<{ artifact: Artifact; body: string }[]> | null = null;

async function loadAll(): Promise<{ artifact: Artifact; body: string }[]> {
  if (!_cache) {
    _cache = (async () => {
      const files = await listMdxFiles();
      const parsed = await Promise.all(files.map(parseMdx));
      // Sort by date descending (newest first). Stable tie-break on slug.
      parsed.sort((a, b) => {
        const cmp = (b.artifact.date || "").localeCompare(a.artifact.date || "");
        return cmp !== 0 ? cmp : a.artifact.slug.localeCompare(b.artifact.slug);
      });
      return parsed;
    })();
  }
  return _cache;
}

export async function loadArtifacts(): Promise<Artifact[]> {
  return (await loadAll()).map((p) => p.artifact);
}

export async function loadArtifact(slug: string): Promise<Artifact | null> {
  const all = await loadAll();
  return all.find((p) => p.artifact.slug === slug)?.artifact ?? null;
}

export async function loadArtifactBody(artifact: Artifact): Promise<string> {
  const all = await loadAll();
  return all.find((p) => p.artifact.slug === artifact.slug)?.body ?? "";
}

export async function getAdjacentArtifacts(
  slug: string,
): Promise<{ prev: Artifact | null; next: Artifact | null }> {
  const all = (await loadAll()).map((p) => p.artifact);
  const idx = all.findIndex((a) => a.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
