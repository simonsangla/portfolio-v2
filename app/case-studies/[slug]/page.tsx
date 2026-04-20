import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { CaseStudyViewTracker } from "@/components/CaseStudyViewTracker";
import { SectionReveal } from "@/components/SectionReveal";
import { loadCaseStudies, loadCaseStudy } from "@/lib/case-studies";
import { loadArtifact } from "@/lib/artifacts";
import { site } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await loadCaseStudies();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await loadCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    openGraph: {
      title: `${cs.title} — ${site.name}`,
      description: cs.summary,
      url: `${site.url}/case-studies/${cs.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} — ${site.name}`,
      description: cs.summary,
    },
    alternates: {
      canonical: `${site.url}/case-studies/${cs.slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = await loadCaseStudy(slug);
  if (!cs) notFound();

  const related = await Promise.all(
    cs.related_products.map((s) => loadArtifact(s)),
  );
  const relatedArtifacts = related.filter(
    (a): a is NonNullable<typeof a> => a !== null,
  );

  return (
    <section className="pb-16 sm:pb-24">
      <Container narrow>
        <CaseStudyViewTracker slug={cs.slug} />

        <p className="pt-4 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:pt-6 sm:text-xs">
          <Link
            href="/case-studies"
            className="hover:text-[color:var(--color-ink)]"
          >
            ← All case studies
          </Link>
        </p>

        <SectionReveal>
          <header className="mt-8 sm:mt-12">
            <div className="flex flex-wrap items-center gap-2">
              {cs.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[color:var(--color-hairline)] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)]"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-5xl">
              {cs.title}
            </h1>
            <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              {cs.client} · {cs.role} · {cs.period}
            </p>
            <div className="mt-8 rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-6 shadow-card sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                Headline metric
              </p>
              <p className="mt-3 text-2xl font-medium leading-[1.15] tracking-[-0.02em] text-[color:var(--color-ink-soft)] sm:text-3xl">
                {cs.headline_metric}
              </p>
            </div>
          </header>
        </SectionReveal>

        <SectionReveal>
          <article className="prose-simon mt-10 sm:mt-14">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{cs.body}</ReactMarkdown>
          </article>
        </SectionReveal>

        {relatedArtifacts.length > 0 && (
          <SectionReveal>
            <div className="mt-12 border-t border-[color:var(--color-hairline)] pt-8 sm:mt-16">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
                Related products
              </p>
              <ul className="mt-4 space-y-2">
                {relatedArtifacts.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/proofs/${a.slug}`}
                      className="group inline-flex items-center gap-2 text-lg font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)]"
                    >
                      <span>{a.name}</span>
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                    <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                      {a.tagline}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        )}

        <SectionReveal>
          <div className="mt-12 rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-6 shadow-card sm:mt-16 sm:p-10">
            <h2 className="text-3xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-4xl">
              Want this engine running on your data?
            </h2>
            <p className="mt-3 text-[color:var(--color-muted)]">
              The same methodology is what I ship as a fractional engagement
              for B2C scale-ups on Snowflake.
            </p>
            <div className="mt-6">
              <CTA
                href="/fractional"
                onTrack={[
                  "case_study_cta_click",
                  { slug: cs.slug, target: "fractional" },
                ]}
              >
                Work with me on this
              </CTA>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
