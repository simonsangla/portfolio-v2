import type { MetadataRoute } from "next";
import { loadArtifacts } from "@/lib/artifacts";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const artifacts = await loadArtifacts();
  const artifactEntries: MetadataRoute.Sitemap = artifacts.map((a) => ({
    url: `${site.url}/proofs/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/fractional`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...artifactEntries,
  ];
}
