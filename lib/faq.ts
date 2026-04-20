// FAQ loader. Reads MDX frontmatter + body from content/faq/*.mdx.
// Mirrors the shape of lib/artifacts.ts.

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type FaqEntry = {
  slug: string;
  question: string;
  tags: string[];
  order: number;
  updated: string;
  body: string;
  // Lowercased plain-text copy of the body for client-side search.
  bodyPlain: string;
};

const FAQ_DIR = path.join(process.cwd(), "content", "faq");

async function listMdxFiles(): Promise<string[]> {
  const entries = await fs.readdir(FAQ_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => path.join(FAQ_DIR, e.name));
}

function toPlain(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_~\-]+/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

async function parseFaq(filepath: string): Promise<FaqEntry> {
  const raw = await fs.readFile(filepath, "utf8");
  const { data, content } = matter(raw);

  const slug = data.slug;
  const question = data.question;
  const tags = data.tags;
  const order = data.order;
  const rawUpdated: unknown = data.updated;

  if (typeof slug !== "string" || !slug)
    throw new Error(`faq: missing/invalid 'slug' in ${filepath}`);
  if (typeof question !== "string" || !question)
    throw new Error(`faq: missing/invalid 'question' in ${filepath}`);
  if (!Array.isArray(tags) || tags.length === 0)
    throw new Error(`faq: missing/invalid 'tags' in ${filepath}`);

  let updated = "";
  if (rawUpdated instanceof Date) updated = rawUpdated.toISOString().slice(0, 10);
  else if (typeof rawUpdated === "string") updated = rawUpdated;
  else throw new Error(`faq: missing/invalid 'updated' in ${filepath}`);

  const body = content.trim();

  return {
    slug,
    question,
    tags: tags.map(String),
    order: typeof order === "number" ? order : 100,
    updated,
    body,
    bodyPlain: toPlain(body),
  };
}

let _cache: Promise<FaqEntry[]> | null = null;

export async function loadFaqs(): Promise<FaqEntry[]> {
  if (!_cache) {
    _cache = (async () => {
      const files = await listMdxFiles();
      const parsed = await Promise.all(files.map(parseFaq));
      parsed.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.question.localeCompare(b.question);
      });
      return parsed;
    })();
  }
  return _cache;
}

export function collectTags(entries: FaqEntry[]): string[] {
  const set = new Set<string>();
  for (const e of entries) for (const t of e.tags) set.add(t);
  return [...set].sort();
}

export function countWords(body: string): number {
  return body.trim().split(/\s+/).filter(Boolean).length;
}
