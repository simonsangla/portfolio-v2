import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { ArtifactHero } from "@/components/ArtifactHero";
import { ArtifactCapture } from "@/components/ArtifactCapture";
import { ArtifactDemo } from "@/components/ArtifactDemo";
import { ArtifactMetrics } from "@/components/ArtifactMetrics";
import { ArtifactRelated } from "@/components/ArtifactRelated";
import { SectionReveal } from "@/components/SectionReveal";
import {
  getAdjacentArtifacts,
  loadArtifact,
  loadArtifactBody,
  loadArtifacts,
} from "@/lib/artifacts";
import { site } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await loadArtifacts();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artifact = await loadArtifact(slug);
  if (!artifact) return {};
  const firstCapture = artifact.capture?.[0];
  return {
    title: artifact.name,
    description: artifact.tagline,
    openGraph: {
      title: `${artifact.name} — ${site.name}`,
      description: artifact.tagline,
      url: `${site.url}/proofs/${artifact.slug}`,
      type: "article",
      ...(firstCapture
        ? {
            images: [
              firstCapture.startsWith("http")
                ? firstCapture
                : `${site.url}${firstCapture}`,
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${artifact.name} — ${site.name}`,
      description: artifact.tagline,
    },
  };
}

export default async function ArtifactDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const artifact = await loadArtifact(slug);
  if (!artifact) notFound();

  const body = await loadArtifactBody(artifact);
  const { prev, next } = await getAdjacentArtifacts(slug);
  const all = await loadArtifacts();

  return (
    <section className="pb-16 sm:pb-24">
      <Container narrow>
        <p className="pt-4 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:pt-6 sm:text-xs">
          <Link
            href="/#proofs"
            className="hover:text-[color:var(--color-ink)]"
          >
            ← All work
          </Link>
        </p>

        <SectionReveal>
          <ArtifactHero artifact={artifact} />
        </SectionReveal>
        <SectionReveal>
          {artifact.demo ? (
            <ArtifactDemo artifact={artifact} />
          ) : (
            <ArtifactCapture artifact={artifact} />
          )}
        </SectionReveal>

        {body && (
          <SectionReveal>
            <article className="prose-simon mt-6 sm:mt-10">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </article>
          </SectionReveal>
        )}

        <SectionReveal>
          <ArtifactMetrics artifact={artifact} />
        </SectionReveal>

        <SectionReveal>
          <ArtifactRelated artifact={artifact} all={all} />
        </SectionReveal>

        <nav
          aria-label="Artifact navigation"
          className="mt-12 grid grid-cols-1 gap-3 border-t border-[color:var(--color-hairline)] pt-6 text-sm sm:mt-20 sm:grid-cols-2 sm:gap-6"
        >
          {prev ? (
            <Link
              href={`/proofs/${prev.slug}`}
              className="group flex items-start gap-3 rounded-md p-3 text-[color:var(--color-muted)] transition-colors hover:bg-[color:var(--color-hairline)]/30 hover:text-[color:var(--color-ink)] sm:p-4"
            >
              <span
                aria-hidden
                className="mt-1 font-serif text-xl text-[color:var(--color-muted)] transition-transform group-hover:-translate-x-1 group-hover:text-[color:var(--color-accent)]"
              >
                ←
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.16em]">
                  Previous
                </span>
                <span className="mt-1.5 block font-serif text-xl tracking-tight text-[color:var(--color-ink-soft)] transition-colors group-hover:text-[color:var(--color-accent)]">
                  {prev.name}
                </span>
              </span>
            </Link>
          ) : (
            <span aria-hidden />
          )}
          {next ? (
            <Link
              href={`/proofs/${next.slug}`}
              className="group flex items-start justify-end gap-3 rounded-md p-3 text-right text-[color:var(--color-muted)] transition-colors hover:bg-[color:var(--color-hairline)]/30 hover:text-[color:var(--color-ink)] sm:p-4"
            >
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.16em]">
                  Next
                </span>
                <span className="mt-1.5 block font-serif text-xl tracking-tight text-[color:var(--color-ink-soft)] transition-colors group-hover:text-[color:var(--color-accent)]">
                  {next.name}
                </span>
              </span>
              <span
                aria-hidden
                className="mt-1 font-serif text-xl text-[color:var(--color-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--color-accent)]"
              >
                →
              </span>
            </Link>
          ) : (
            <span aria-hidden />
          )}
        </nav>
      </Container>
    </section>
  );
}
