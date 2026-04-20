import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { SectionReveal } from "@/components/SectionReveal";
import { site } from "@/lib/site";

const title = "CV — Simon Sangla";
const description =
  "Simon Sangla — analyst, product engineer, fractional Head of Analytics. Ten years at TripAdvisor Media Group. Based in Lisbon, working async with teams anywhere.";
const pageUrl = `${site.url}/cv`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: pageUrl, type: "profile", siteName: site.name },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: pageUrl },
};

export default function CvPage() {
  return (
    <section className="pt-10 pb-20 sm:pt-24 sm:pb-32">
      <Container narrow>
        <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
          CV
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-5xl">
          Simon Sangla
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg text-[color:var(--color-ink)]/85 sm:text-xl">
          I turn data signals into products. Based in {site.location}, working remote and async with teams anywhere.
        </p>

        <SectionReveal>
          <div className="prose-simon mt-10">
            <p>
              For ten years I&rsquo;ve been the person teams call when a number moves and nobody can say why.
            </p>
            <p>
              I built the analytics and experimentation backbone at TripAdvisor Media Group — Mixpanel and Eppo on a Snowflake event layer. Now I ship AI products in weeks using an agentic build loop. Master&rsquo;s in Statistics &amp; Econometrics, Paris I Panthéon-Sorbonne.
            </p>

            <h2>Work history</h2>
            <ul>
              <li>
                <strong>2024–present</strong> — Independent. Fractional Head of Analytics engagements, fixed-scope diagnostic work, and productized AI engagements (MetricPilot, Dual Pronto, Pro Optimizer).
              </li>
              <li>
                <strong>2018–2023</strong> — TripAdvisor Media Group. Lead Analyst, Experimentation &amp; Metrics. Built the precursor system that cut KPI investigation time by 80% across five product teams.
              </li>
              <li>
                <strong>2014–2018</strong> — Data roles across B2C digital product teams in Europe. Warehouse modelling, experimentation design, product analytics.
              </li>
            </ul>

            <h2>How I work</h2>
            <ul>
              <li>Async-first. Written briefs, Loom walkthroughs, shared Notion logs. No standing calls.</li>
              <li>Iteration beats perfection. Narrow loops, weekly ship.</li>
              <li>Documentation-led. Everything your team needs to own the work at handoff is in the repo.</li>
              <li>English, French, Spanish, Portuguese — write to me in any of them.</li>
            </ul>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-[color:var(--color-hairline)] pt-8 sm:grid-cols-3">
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)] sm:text-xs">
                Warehouse
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-[color:var(--color-ink-soft)]">
                <li>Snowflake</li>
                <li>dbt</li>
                <li>BigQuery</li>
                <li>Redshift</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)] sm:text-xs">
                Product
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-[color:var(--color-ink-soft)]">
                <li>Mixpanel</li>
                <li>Amplitude</li>
                <li>Eppo</li>
                <li>Statsig</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)] sm:text-xs">
                Stack
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-[color:var(--color-ink-soft)]">
                <li>Python · SQL</li>
                <li>Streamlit</li>
                <li>Next.js · TS</li>
                <li>Claude · OpenAI</li>
              </ul>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTA href="/services">Start the intake</CTA>
            <CTA href={`mailto:${site.email}`} variant="ghost">
              Email
            </CTA>
            <CTA href={site.linkedin} variant="ghost" external>
              LinkedIn
            </CTA>
            <CTA href={site.github} variant="ghost" external>
              GitHub
            </CTA>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
