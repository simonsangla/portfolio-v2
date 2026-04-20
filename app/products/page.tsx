import type { Metadata } from "next";
import { ArtifactCard } from "@/components/ArtifactCard";
import { ArtifactCardTracker } from "@/components/ArtifactCardTracker";
import { Container } from "@/components/Container";
import { ProofsCarousel } from "@/components/ProofsCarousel";
import { SectionReveal } from "@/components/SectionReveal";
import { loadArtifacts } from "@/lib/artifacts";
import { site } from "@/lib/site";

const title = "Products — Simon Sangla";
const description =
  "Shipped products: MetricPilot (Revenue Root Cause Engine), Dual Pronto, Pro Optimizer. Each one live, documented, buyable.";
const pageUrl = `${site.url}/products`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: pageUrl, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: pageUrl },
};

export default async function ProductsPage() {
  const artifacts = await loadArtifacts();

  return (
    <section className="pt-10 pb-20 sm:pt-24 sm:pb-32">
      <Container>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)] sm:text-xs">
          Products
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-5xl">
          Shipped, not pitched.
        </h1>
        <p className="mt-5 max-w-[56ch] text-lg text-[color:var(--color-ink)]/85 sm:text-xl">
          {artifacts.length} products live. Each one documented, each one buyable, each one an answer to a question operators keep asking.
        </p>

        <SectionReveal>
          <div className="mt-12">
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
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
