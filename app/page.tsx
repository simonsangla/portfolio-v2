import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { ArtifactCard } from "@/components/ArtifactCard";
import { SectionReveal } from "@/components/SectionReveal";
import { loadArtifacts } from "@/lib/artifacts";
import { site } from "@/lib/site";

const deliverables = [
  {
    title: "KPI decomposition",
    body: "Break the target metric into its additive drivers. Quantify each driver's contribution to the regression.",
  },
  {
    title: "Change-point report",
    body: "Statistical detection of when and where the break happened — by cohort, channel, platform, geography.",
  },
  {
    title: "Streamlit dashboard",
    body: "Self-serve explorer you keep. Re-run the diagnostic monthly without me.",
  },
  {
    title: "Root-cause narrative",
    body: "A short, executive-ready document. What changed, why, what to do next — ranked by leverage.",
  },
  {
    title: "Handoff + runbook",
    body: "Everything versioned in your repo. Your team owns it at day 28.",
  },
];

const faqs = [
  {
    q: "Why no calls?",
    a: "Calls compress low-bandwidth information into high-cost blocks. Async written briefs force clarity, create a searchable record, and respect both our calendars.",
  },
  {
    q: "What does async look like?",
    a: "You submit the intake. I reply within 48h with a scoped proposal. We agree in writing. From there: weekly Loom walkthroughs and a shared Notion log. No Zoom.",
  },
  {
    q: "What do you need from us?",
    a: "Read-only Snowflake access (or willingness to land there), the KPI you want explained, and a single async decision-maker. That's it.",
  },
  {
    q: "What determines the price inside €15–25K?",
    a: "Data complexity: number of product surfaces, cohort depth, event schema cleanliness. Scoped in the proposal, fixed before kick-off.",
  },
];

export default async function HomePage() {
  const artifacts = await loadArtifacts();

  return (
    <>
      {/* Hero */}
      <section id="top" className="pt-10 pb-12 sm:pt-24 sm:pb-24">
        <Container>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink)] sm:text-xs">
            {site.location} · Remote · Async
          </p>
          <h1 className="display-axis mt-6 font-serif text-[clamp(2.75rem,10.5vw,6rem)] leading-[0.96] tracking-tight">
            {site.name}.
            <br />
            {site.tagline}
          </h1>
          <p className="mt-7 max-w-[56ch] text-lg text-[color:var(--color-ink)]/85 sm:text-xl">
            Ten years turning behavioural, product and marketing data into
            self-service decisions. Now I ship AI products in weeks using an
            agentic build workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTA href="#proofs">See the work</CTA>
            <CTA href="#services" variant="ghost">
              Work with me
            </CTA>
          </div>
        </Container>
      </section>

      {/* Proofs — compact list */}
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
                <h2 className="font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl">
                  Work
                </h2>
                <p className="text-sm text-[color:var(--color-muted)]">
                  {artifacts.length} artifacts · each one shipped
                </p>
              </div>
            </div>

            {/* Mobile: horizontal snap rail */}
            <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
              {artifacts.map((a) => (
                <li
                  key={a.slug}
                  className="w-[82%] shrink-0 snap-start last:mr-2"
                >
                  <ArtifactCard artifact={a} variant="card" />
                </li>
              ))}
            </ul>

            {/* Desktop: vertical comparison list */}
            <div className="hidden border-b border-[color:var(--color-hairline)] md:block">
              {artifacts.map((a) => (
                <ArtifactCard key={a.slug} artifact={a} />
              ))}
            </div>
          </Container>
        </SectionReveal>
      </section>

      {/* Services — compacted */}
      <section
        id="services"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container narrow>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink)] sm:text-xs">
            One engagement. Fixed scope.
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl">
            Revenue Root Cause Engine.
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-muted)] sm:text-xl">
            Four weeks. €15,000–€25,000. Zero meetings. You end up knowing why
            your KPI moved and owning a Streamlit tool your team can re-run
            forever.
          </p>

          {/* Price panel */}
          <div className="mt-10 rounded-xl border border-[color:var(--color-hairline)] bg-[color:var(--color-bg)] p-6 shadow-card sm:p-10">
            <div className="grid grid-cols-1 gap-8 border-b border-[color:var(--color-hairline)] pb-6 sm:grid-cols-2 sm:gap-12 sm:pb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                  Price
                </p>
                <p className="mt-3 font-serif text-[2.5rem] leading-[1.02] tracking-tight text-[color:var(--color-ink-soft)] sm:text-[3rem]">
                  €15–25K
                </p>
                <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                  Fixed. Agreed before kick-off.
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                  Timeline
                </p>
                <p className="mt-3 font-serif text-[2.5rem] leading-[1.02] tracking-tight text-[color:var(--color-ink-soft)] sm:text-[3rem]">
                  4 wks
                </p>
                <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                  Kick-off to handoff.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
              <CTA href={site.intakeUrl} external>
                Start the intake
              </CTA>
              <p className="text-sm text-[color:var(--color-muted)]">
                Five questions · 10 minutes · scoped proposal within 48h.
              </p>
            </div>
          </div>

          {/* Who — stays visible */}
          <div className="mt-10">
            <h3 className="font-serif text-xl tracking-tight sm:text-2xl">
              Who it&rsquo;s for
            </h3>
            <ul className="mt-3 space-y-1.5 text-[color:var(--color-ink)]/85">
              <li>— B2C scale-ups, €5M–€100M ARR range</li>
              <li>— Data warehoused on Snowflake (or ready to land there)</li>
              <li>— A KPI that moved and nobody can cleanly explain why</li>
              <li>— Comfortable with async, written, decision-led work</li>
            </ul>
          </div>

          {/* Deliverables collapsed */}
          <details className="group mt-8 border-t border-[color:var(--color-hairline)] pt-6">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-xl tracking-tight sm:text-2xl">
              <span>What you get</span>
              <span className="text-[color:var(--color-muted)] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="mt-4 divide-y divide-[color:var(--color-hairline)] border-y border-[color:var(--color-hairline)]">
              {deliverables.map((d) => (
                <div key={d.title} className="py-4">
                  <h4 className="font-serif text-lg tracking-tight">
                    {d.title}
                  </h4>
                  <p className="mt-1.5 text-[color:var(--color-muted)]">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </details>

          {/* FAQ collapsed */}
          <details className="group mt-6 border-t border-[color:var(--color-hairline)] pt-6">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-xl tracking-tight sm:text-2xl">
              <span>Questions</span>
              <span className="text-[color:var(--color-muted)] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="mt-4 divide-y divide-[color:var(--color-hairline)] border-y border-[color:var(--color-hairline)]">
              {faqs.map((f) => (
                <details key={f.q} className="group/faq py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-base tracking-tight sm:text-lg">
                    <span>{f.q}</span>
                    <span className="text-[color:var(--color-muted)] transition-transform group-open/faq:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-[color:var(--color-muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </details>
          </Container>
        </SectionReveal>
      </section>

      {/* About — compacted */}
      <section
        id="about"
        className="scroll-mt-16 border-t border-[color:var(--color-hairline)] py-10 sm:py-20"
      >
        <SectionReveal>
          <Container narrow>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)] sm:text-xs">
            About
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-[1.02] tracking-tight sm:text-5xl">
            I turn data signals into products.
          </h2>

          <div className="prose-simon mt-6">
            <p>
              I&rsquo;m Simon. Based in Lisbon, working remote and async with
              teams anywhere. For ten years I&rsquo;ve been the person teams
              call when a number moves and nobody can say why.
            </p>
            <p>
              I built the analytics and experimentation backbone at TripAdvisor
              Media Group — Mixpanel and Eppo on a Snowflake event layer. Now
              I ship AI products in weeks using an agentic build loop.
              Master&rsquo;s in Statistics &amp; Econometrics, Paris I
              Panthéon-Sorbonne.
            </p>
          </div>

          {/* Contact surfaces directly */}
          <div className="mt-8 flex flex-wrap gap-3">
            <CTA href="#services">Start the intake</CTA>
            <CTA href={`mailto:${site.email}`} variant="ghost">
              Email
            </CTA>
            <CTA href={site.linkedin} variant="ghost" external>
              LinkedIn
            </CTA>
          </div>

          <details className="group mt-10 border-t border-[color:var(--color-hairline)] pt-6">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-xl tracking-tight sm:text-2xl">
              <span>More on how I work</span>
              <span className="text-[color:var(--color-muted)] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="prose-simon mt-4">
              <h3>Why products now</h3>
              <p>
                Over the last year I rebuilt how I ship. An agentic build loop
                (Claude Code + Codex + a strict spec layer I call ProofForge
                internally) lets a single operator do what used to take a team.
                Three products shipped in weeks: Refinr, MetricPilot, Prompto.
              </p>
              <p>
                The analyst discipline didn&rsquo;t go away — it compounds.
                Shipping fast is only useful if the thing you ship is measurably
                right.
              </p>
              <h3>How I work</h3>
              <ul>
                <li>
                  Async-first. Written briefs, Loom walkthroughs, shared Notion
                  logs. No standing calls.
                </li>
                <li>Iteration beats perfection. Narrow loops, weekly ship.</li>
                <li>
                  Documentation-led. Everything your team needs to own the work
                  at handoff is in the repo.
                </li>
                <li>
                  English, French, Spanish, Portuguese — write to me in any of
                  them.
                </li>
              </ul>
            </div>
          </details>
          </Container>
        </SectionReveal>
      </section>
    </>
  );
}
