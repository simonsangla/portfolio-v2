import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CTA } from "@/components/CTA";
import { SectionReveal } from "@/components/SectionReveal";
import { site } from "@/lib/site";

const title = "Services — Simon Sangla";
const description =
  "Fractional Head of Analytics, fixed-scope diagnostic engagements, and custom data builds for B2C scale-ups on Snowflake.";
const pageUrl = `${site.url}/services`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: pageUrl, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: pageUrl },
};

type ServiceCard = {
  title: string;
  tagline: string;
  bullets: string[];
  primary: { label: string; href: string; intakeSource?: string };
  secondary?: { label: string; href: string };
};

const services: ServiceCard[] = [
  {
    title: "Fractional Head of Analytics",
    tagline: "Kick-off + async + 1hr/week. Ship the analytics function a growing team is missing.",
    bullets: [
      "Async-first engagement — written briefs, Loom walkthroughs, shared Notion log",
      "Kick-off workshop, then weekly 1hr sync; everything else async",
      "Handed off at day 90 — your team owns the work",
    ],
    primary: { label: "Learn more", href: "/fractional" },
  },
  {
    title: "Revenue Root Cause audit",
    tagline: "Four-week fixed-scope diagnostic. You end up knowing why your KPI moved and owning the Streamlit tool.",
    bullets: [
      "€15–25K fixed · four weeks · zero meetings",
      "KPI decomposition + change-point detection + root-cause narrative",
      "Self-serve Streamlit workbook your team keeps",
    ],
    primary: { label: "Start the intake", href: site.intakeUrl, intakeSource: "services-audit" },
    secondary: { label: "See the product", href: "/proofs/metricpilot" },
  },
  {
    title: "Custom data + AI builds",
    tagline: "One-off builds for operators who need the thing shipped, not pitched.",
    bullets: [
      "Scoped before kick-off · fixed price",
      "Examples: agentic workflows, bespoke dashboards, local-LLM pipelines",
      "You walk out with the repo and the runbook",
    ],
    primary: { label: "Start the intake", href: site.intakeUrl, intakeSource: "services-custom" },
  },
];

export default function ServicesPage() {
  return (
    <section className="pt-10 pb-20 sm:pt-24 sm:pb-32">
      <Container narrow>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)] sm:text-xs">
          Services
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-5xl">
          Fixed-scope engagements. Async-first.
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg text-[color:var(--color-ink)]/85 sm:text-xl">
          Three ways to work with me. Pick the one that matches the shape of the problem.
        </p>

        <SectionReveal>
          <ul className="mt-12 divide-y divide-[color:var(--color-hairline)] border-y border-[color:var(--color-hairline)]">
            {services.map((s) => (
              <li key={s.title} className="py-8 sm:py-10">
                <h2 className="text-2xl font-medium leading-[1.12] tracking-[-0.02em] text-[color:var(--color-ink)] sm:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-[62ch] text-[color:var(--color-muted)]">
                  {s.tagline}
                </p>
                <ul className="mt-4 max-w-[62ch] space-y-1.5 text-sm text-[color:var(--color-ink-soft)]">
                  {s.bullets.map((b) => (
                    <li key={b} className="before:mr-2 before:text-[color:var(--color-muted)] before:content-['—']">
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CTA
                    href={s.primary.href}
                    external={s.primary.href.startsWith("http")}
                    intakeSource={s.primary.intakeSource}
                  >
                    {s.primary.label}
                  </CTA>
                  {s.secondary ? (
                    <Link
                      href={s.secondary.href}
                      className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-bg)] px-5 py-2.5 text-sm text-[color:var(--color-ink)] shadow-secondary transition-colors hover:text-[color:var(--color-accent)]"
                    >
                      <span>{s.secondary.label}</span>
                      <span aria-hidden>→</span>
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </Container>
    </section>
  );
}
