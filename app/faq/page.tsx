import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { FaqSearch } from "@/components/FaqSearch";
import { SectionReveal } from "@/components/SectionReveal";
import { collectTags, loadFaqs } from "@/lib/faq";
import { site } from "@/lib/site";

const title = "FAQ — Simon Sangla";
const description =
  "Answers to pre-sales questions about the Revenue Root Cause Engine, fractional engagements, ChatGPT training, pricing, and data security.";
const pageUrl = `${site.url}/faq`;

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

export default async function FaqPage() {
  const entries = await loadFaqs();
  const allTags = collectTags(entries);

  return (
    <section className="pt-10 pb-20 sm:pt-24 sm:pb-32">
      <Container narrow>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)] sm:text-xs">
          FAQ
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-5xl">
          Pre-sales, answered in writing.
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg text-[color:var(--color-ink)]/85 sm:text-xl">
          The questions I get most before engagements start — pricing, scope,
          security, timelines. Search below, filter by tag, or send the one
          that&rsquo;s missing.
        </p>

        <SectionReveal>
          <FaqSearch
            entries={entries}
            allTags={allTags}
            intakeUrl={site.intakeUrl}
          />
        </SectionReveal>
      </Container>
    </section>
  );
}
