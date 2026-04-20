// Case study loader. Mirrors lib/artifacts.ts + lib/faq.ts.

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  role: string;
  period: string;
  headline_metric: string;
  tags: string[];
  summary: string;
  featured: boolean;
  related_products: string[];
  body: string;
};

const DIR = path.join(process.cwd(), "content", "case-studies");

async function listMdxFiles(): Promise<string[]> {
  const entries = await fs.readdir(DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => path.join(DIR, e.name));
}

function required<T>(v: T | undefined, name: string, filepath: string): T {
  if (v === undefined || v === null || v === "") {
    throw new Error(`case-studies: missing/invalid '${name}' in ${filepath}`);
  }
  return v;
}

async function parseCaseStudy(filepath: string): Promise<CaseStudy> {
  const raw = await fs.readFile(filepath, "utf8");
  const { data, content } = matter(raw);

  const slug = required<string>(data.slug as string, "slug", filepath);
  const title = required<string>(data.title as string, "title", filepath);
  const client = required<string>(data.client as string, "client", filepath);
  const role = required<string>(data.role as string, "role", filepath);
  const period = required<string>(data.period as string, "period", filepath);
  const headline_metric = required<string>(
    data.headline_metric as string,
    "headline_metric",
    filepath,
  );
  const summary = required<string>(
    data.summary as string,
    "summary",
    filepath,
  );
  if (summary.length > 200) {
    throw new Error(
      `case-studies: 'summary' exceeds 200 chars in ${filepath} (${summary.length})`,
    );
  }

  const tags = data.tags;
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new Error(`case-studies: missing/invalid 'tags' in ${filepath}`);
  }

  const related_products = Array.isArray(data.related_products)
    ? data.related_products.map(String)
    : [];

  return {
    slug,
    title,
    client,
    role,
    period,
    headline_metric,
    tags: tags.map(String),
    summary,
    featured: Boolean(data.featured),
    related_products,
    body: content.trim(),
  };
}

let _cache: Promise<CaseStudy[]> | null = null;

export async function loadCaseStudies(): Promise<CaseStudy[]> {
  if (!_cache) {
    _cache = (async () => {
      const files = await listMdxFiles();
      const parsed = await Promise.all(files.map(parseCaseStudy));
      parsed.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.period.localeCompare(a.period);
      });
      return parsed;
    })();
  }
  return _cache;
}

export async function loadCaseStudy(slug: string): Promise<CaseStudy | null> {
  const all = await loadCaseStudies();
  return all.find((c) => c.slug === slug) ?? null;
}
