import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { SectionReveal } from "@/components/SectionReveal";
import { site } from "@/lib/site";

const title = "Fractional Head of Analytics — Simon Sangla";
const description =
  "Fractional Head of Analytics for Snowflake scale-ups. 2–3 days/week, €8–12K/month, async-first. Build the metric tree, train the analyst, leave a self-serve tool behind.";
const pageUrl = `${site.url}/fractional`;
const intakeHref = `mailto:${site.email}?subject=Fractional%20Head%20of%20Analytics%20intake`;

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

const whatIDo = [
  "Diagnose revenue misses in minutes, not meetings (via MetricPilot).",
  "Build the metric tree your team actually uses — from KPI to driver to lever.",
  "Train your in-house analyst on the diagnostic framework.",
  "Ship production tools (Streamlit on Snowflake) your team owns at wrap.",
];

const phases = [
  {
    label: "01",
    title: "Discovery",
    meta: "Week 1",
    body: "Snowflake read-only access, KPI tree mapping, first diagnostic pass.",
  },
  {
    label: "02",
    title: "Build",
    meta: "Weeks 2–6",
    body: "Ship the metric tree and initial MetricPilot instance on your data.",
  },
  {
    label: "03",
    title: "Embed",
    meta: "Months 2–6",
    body: "2–3 days/week: async briefs, weekly Loom walkthroughs, analyst pairing.",
  },
  {
    label: "04",
    title: "Wrap",
    meta: "Handoff",
    body: "Your analyst owns the framework. Tools are yours. No retainer lock-in.",
  },
];

const engagement = [
  "2–3 days/week.",
  "3–6 months typical.",
  "€8–12K/month retainer (depending on cadence).",
  "Kickoff call to align priorities · async updates via Slack / shared docs · one 1-hour weekly status check.",
  "Fixed in writing before kickoff.",
];

const goodFit = [
  "B2C scale-ups, Series A–C.",
  "Snowflake warehouse in place.",
  "A clear KPI that moved.",
  "Comfortable with async, written work.",
  "Want to build in-house capability.",
];

const badFit = [
  "Pre-Snowflake data stack.",
  "Want me to own the dashboard long-term.",
  "Need daily standups.",
  "Looking for a full-time hire.",
];

export default function FractionalPage() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="pt-10 pb-12 sm:pt-24 sm:pb-24">
        <Container narrow>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)] sm:text-xs">
            Lisbon · Remote · 2–3 days/week
          </p>
          <h1 className="mt-6 text-[clamp(2.25rem,7.5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
            Fractional Head of Analytics for{" "}
            <span className="text-[color:var(--color-muted)]">
              Snowflake scale-ups.
            </span>
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg text-[color:var(--color-ink)]/85 sm:text-xl">
            I embed part-time with Series A–C B2C scale-ups (50–250 people) on
            Snowflake. I diagnose revenue misses in minutes, build the metric
            tree, train your analyst, and leave a self-serve tool behind — not
            a dependency.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTA href={intakeHref} external>
              Start the intake
            </CTA>
            <CTA href="/#proofs" variant="ghost">
              See the work
            </CTA>
          </div>
        </Container>
      </section>

      {/* What I do */}
      <section
        id="what-i-do"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container narrow>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
              What I do
            </p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl">
              Revenue diagnostics, embedded.
            </h2>
            <ul className="who-list mt-8 text-base sm:text-lg">
              {whatIDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Container>
        </SectionReveal>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container narrow>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
              How it works
            </p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl">
              Four phases. No surprises.
            </h2>
            <div className="mt-8 divide-y divide-[color:var(--color-hairline)] border-y border-[color:var(--color-hairline)]">
              {phases.map((p) => (
                <div
                  key={p.label}
                  className="grid grid-cols-[auto_1fr] gap-4 py-5 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-6"
                >
                  <div className="text-sm font-medium tabular-nums text-[color:var(--color-muted)]">
                    {p.label}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                        {p.title}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                        {p.meta}
                      </span>
                    </div>
                    <p className="mt-2 text-[color:var(--color-muted)]">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </SectionReveal>
      </section>

      {/* Engagement */}
      <section
        id="engagement"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container narrow>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
              Engagement
            </p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl">
              The shape of the work.
            </h2>
            <div className="mt-10 rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-6 shadow-card sm:p-10">
              <div className="grid grid-cols-1 gap-8 border-b border-[color:var(--color-hairline)] pb-6 sm:grid-cols-2 sm:gap-12 sm:pb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                    Retainer
                  </p>
                  <p className="mt-3 text-[2.5rem] font-medium leading-[1.02] tracking-[-0.025em] tabular-nums text-[color:var(--color-ink-soft)] sm:text-[3rem]">
                    €8–12K
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                    Per month. Depends on cadence.
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                    Cadence
                  </p>
                  <p className="mt-3 text-[2.5rem] font-medium leading-[1.02] tracking-[-0.025em] tabular-nums text-[color:var(--color-ink-soft)] sm:text-[3rem]">
                    2–3 d/wk
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                    3–6 months typical.
                  </p>
                </div>
              </div>
              <ul className="who-list mt-6 text-base sm:mt-8">
                {engagement.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Container>
        </SectionReveal>
      </section>

      {/* Works well for / Not a fit */}
      <section
        id="fit"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container narrow>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
              Fit
            </p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl">
              Who it&rsquo;s for.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-[color:var(--color-accent)] sm:text-2xl">
                  Works well for
                </h3>
                <ul className="mt-4 space-y-2.5 text-base">
                  {goodFit.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1.25rem_1fr] gap-2 text-[color:var(--color-ink-soft)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.4em] text-[color:var(--color-accent)]"
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-[color:var(--color-muted)] sm:text-2xl">
                  Not a fit
                </h3>
                <ul className="mt-4 space-y-2.5 text-base">
                  {badFit.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1.25rem_1fr] gap-2 text-[color:var(--color-muted)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.4em] text-[color:var(--color-muted)]"
                      >
                        ×
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </SectionReveal>
      </section>

      {/* Background */}
      <section
        id="background"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container narrow>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
              Background
            </p>
            <h2 className="mt-4 text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl">
              Ten years of this, specifically.
            </h2>
            <div className="prose-simon mt-6">
              <p>
                Ex-Lead Analyst at TripAdvisor Media Group. Built the Business
                Metric Wizard system that cut KPI investigation time 80% across
                five product teams.
              </p>
              <p>
                Now running MetricPilot (Snowflake-native revenue root cause
                engine) and embedding fractionally with scale-ups who want that
                same diagnostic discipline without hiring a senior analyst.
              </p>
            </div>
          </Container>
        </SectionReveal>
      </section>

      {/* Final CTA */}
      <section
        id="intake"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container narrow>
            <div className="rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-6 shadow-card sm:p-10">
              <h2 className="text-4xl font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl">
                Ready to stop guessing why the number moved?
              </h2>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CTA href={intakeHref} external>
                  Start the intake
                </CTA>
                <p className="text-sm text-[color:var(--color-muted)]">
                  Reply within 48h with scoped proposal. No call needed.
                </p>
              </div>
            </div>
          </Container>
        </SectionReveal>
      </section>
    </>
  );
}
