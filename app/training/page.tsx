import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { SectionReveal } from "@/components/SectionReveal";
import { site } from "@/lib/site";

const title = "Training — Simon Sangla";
const description =
  "One-on-one and small-team training on ChatGPT, agentic workflows, and analytics tooling. On-site or remote.";
const pageUrl = `${site.url}/training`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: pageUrl, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: pageUrl },
};

export default function TrainingPage() {
  return (
    <section className="pt-10 pb-20 sm:pt-24 sm:pb-32">
      <Container narrow>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)] sm:text-xs">
          Training
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-5xl">
          One session. Fluent operators.
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg text-[color:var(--color-ink)]/85 sm:text-xl">
          Short, scoped training sessions for teams that want to stop wrestling with tools and start shipping. One course live, more coming.
        </p>

        <SectionReveal>
          <div className="mt-12 rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-6 shadow-card sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
                One session · Fixed price
              </p>
              <span className="inline-flex items-center rounded-full border border-[color:var(--color-accent)]/25 bg-[color:var(--color-accent)]/8 px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-accent)]">
                €249
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-4xl">
              Make ChatGPT Your Slave
            </h2>
            <p className="mt-3 max-w-[56ch] text-[color:var(--color-muted)]">
              A 90-minute working session plus two weeks of async follow-up. For operators who are done wrestling with ChatGPT and want it producing real output before the week ends.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTA
                href={`mailto:${site.email}?subject=Book%20ChatGPT%20Training%20Session`}
                external
              >
                Book a session
              </CTA>
              <CTA href="/proofs/chatgpt-training" variant="ghost">
                Read the write-up
              </CTA>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-12 border-t border-[color:var(--color-hairline)] pt-8 sm:mt-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
              Coming soon
            </p>
            <p className="mt-3 max-w-[56ch] text-[color:var(--color-muted)]">
              Agentic build workflow for product teams · async-first analytics for fast-moving startups. Want one? Email me.
            </p>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
