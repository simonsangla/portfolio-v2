import Link from "next/link";
import { ArtifactCard } from "@/components/ArtifactCard";
import { ArtifactCardTracker } from "@/components/ArtifactCardTracker";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { DifferentiatorObserver } from "@/components/DifferentiatorObserver";
import { HeroSignals } from "@/components/HeroSignals";
import { HeroStatus } from "@/components/HeroStatus";
import { ProofsCarousel } from "@/components/ProofsCarousel";
import { SectionReveal } from "@/components/SectionReveal";
import { loadArtifacts } from "@/lib/artifacts";
import { site } from "@/lib/site";

type SectionCard = {
  href: string;
  kicker: string;
  title: string;
  body: string;
};

const sections: SectionCard[] = [
  {
    href: "/services",
    kicker: "Services",
    title: "Fixed-scope engagements",
    body: "Fractional Head of Analytics, four-week audits, and custom builds. Async-first, scoped before kick-off.",
  },
  {
    href: "/training",
    kicker: "Training",
    title: "Fluent operators",
    body: "One session, real output before the week ends. ChatGPT training live; more courses shipping.",
  },
  {
    href: "/products",
    kicker: "Products",
    title: "Shipped, not pitched",
    body: "MetricPilot, Dual Pronto, Pro Optimizer. Each one live, documented, buyable.",
  },
];

export default async function HomePage() {
  const artifacts = await loadArtifacts();

  return (
    <>
      {/* Hero */}
      <section id="top" className="pt-10 pb-12 sm:pt-24 sm:pb-24">
        <Container>
          <HeroStatus />
          <h1 className="mt-6 text-[clamp(2.75rem,10.5vw,6rem)] font-semibold leading-[0.96] tracking-[-0.025em]">
            {site.heroTitleLine1}
            <br />
            <span className="text-[color:var(--color-muted)]">
              {site.heroTitleLine2}
            </span>
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg text-[color:var(--color-ink)]/85 sm:text-xl">
            Ten years turning behavioural, product and marketing data into self-service decisions. Now I ship AI products in weeks using an agentic build workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTA href="/products" onTrack={["hero_cta_click", { variant: "products" }]}>
              See the work
            </CTA>
            <CTA href="/services" variant="ghost" onTrack={["hero_cta_click", { variant: "products" }]}>
              Work with me
            </CTA>
          </div>
          <HeroSignals />
          <DifferentiatorObserver>
            <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-[color:var(--color-muted)]">
              {site.differentiator}
            </p>
          </DifferentiatorObserver>
          {/* TODO(T-2-video): embed hero demo when asset lands — see AGENT_HANDOFF */}
        </Container>
      </section>

      {/* Three-card section nav — /services /training /products */}
      <section
        id="sections"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              {sections.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group block rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-5 shadow-secondary transition-transform hover:-translate-y-[1px] sm:p-6"
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                    {s.kicker}
                  </p>
                  <h2 className="mt-3 text-xl font-medium tracking-[-0.02em] text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-accent)] sm:text-2xl">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                    {s.body}
                  </p>
                  <p className="mt-4 text-sm font-medium text-[color:var(--color-ink-soft)]">
                    <span>Open</span>
                    <span aria-hidden className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </SectionReveal>
      </section>

      {/* Proofs carousel */}
      <section
        id="proofs"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container>
            <div className="mb-6 sm:mb-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink)] sm:text-xs">
                Shipped, not pitched
              </p>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl">
                  Work
                </h2>
                <p className="text-sm text-[color:var(--color-muted)]">
                  {artifacts.length} artifacts · each one shipped
                </p>
              </div>
            </div>

            <ProofsCarousel
              items={artifacts.map((a) => ({
                key: a.slug,
                node: (
                  <ArtifactCardTracker slug={a.slug}>
                    <ArtifactCard artifact={a} variant="card" />
                  </ArtifactCardTracker>
                ),
              }))}
            />

            <div className="hidden border-b border-[color:var(--color-hairline)] md:block">
              {artifacts.map((a) => (
                <ArtifactCardTracker key={a.slug} slug={a.slug}>
                  <ArtifactCard artifact={a} />
                </ArtifactCardTracker>
              ))}
            </div>

            {/* Case-study proof callout */}
            <div className="mt-8 rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-5 shadow-secondary sm:mt-10 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                    Case study
                  </p>
                  <p className="mt-2 text-base text-[color:var(--color-ink)] sm:text-lg">
                    <span className="font-medium">
                      80% reduction in KPI investigation time
                    </span>{" "}
                    <span className="text-[color:var(--color-muted)]">
                      · 10 years in production · 5 product teams
                    </span>
                  </p>
                </div>
                <Link
                  href="/case-studies/tripadvisor-precursor"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-accent)]"
                >
                  <span>Read the case study</span>
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </Container>
        </SectionReveal>
      </section>

      {/* Final CTA → /fractional */}
      <section
        id="engage"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container narrow>
            <div className="rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-6 shadow-card sm:p-10">
              <h2 className="text-3xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-4xl">
                Need an analytics function for the next 90 days?
              </h2>
              <p className="mt-3 max-w-[56ch] text-[color:var(--color-muted)]">
                Fractional Head of Analytics — kick-off + async + 1hr/week. Scoped before kick-off. Handed off to your team at day 90.
              </p>
              <div className="mt-6">
                <CTA href="/fractional">Learn more</CTA>
              </div>
            </div>
          </Container>
        </SectionReveal>
      </section>
    </>
  );
}
