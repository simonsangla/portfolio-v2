import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionReveal } from "@/components/SectionReveal";
import { loadCaseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

const title = "Case studies — Simon Sangla";
const description =
  "Long-form write-ups of shipped analytics and AI work. Problem, approach, stack, before/after metrics, lessons.";
const pageUrl = `${site.url}/case-studies`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: pageUrl,
  },
};

export default async function CaseStudiesIndexPage() {
  const entries = await loadCaseStudies();

  return (
    <section className="pt-10 pb-20 sm:pt-24 sm:pb-32">
      <Container narrow>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)] sm:text-xs">
          Case studies
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-5xl">
          What the work actually looks like.
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg text-[color:var(--color-ink)]/85 sm:text-xl">
          Write-ups of shipped analytics + AI systems. Problem, approach,
          stack, before/after metrics, what I&rsquo;d do differently.
        </p>

        <SectionReveal>
          {entries.length === 0 ? (
            <p className="mt-16 text-[color:var(--color-muted)]">
              No case studies published yet.
            </p>
          ) : (
            <ul className="mt-12 divide-y divide-[color:var(--color-hairline)] border-y border-[color:var(--color-hairline)]">
              {entries.map((entry) => (
                <li key={entry.slug}>
                  <Link
                    href={`/case-studies/${entry.slug}`}
                    className="group grid grid-cols-1 gap-2 py-8 transition-colors sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-10"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {entry.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-[color:var(--color-hairline)] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <h2 className="mt-4 text-2xl font-medium leading-[1.12] tracking-[-0.02em] text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-accent)] sm:text-3xl">
                        {entry.title}
                      </h2>
                      <p className="mt-3 max-w-[62ch] text-[color:var(--color-muted)]">
                        {entry.summary}
                      </p>
                      <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                        {entry.client} · {entry.period}
                      </p>
                    </div>
                    <div className="flex sm:items-start sm:justify-end">
                      <p className="rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] px-4 py-3 text-right text-sm font-medium text-[color:var(--color-ink-soft)] shadow-secondary transition-colors group-hover:text-[color:var(--color-accent)]">
                        {entry.headline_metric}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </SectionReveal>
      </Container>
    </section>
  );
}
