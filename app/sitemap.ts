import type { MetadataRoute } from "next";
import { listAllDocs } from "@/lib/docs";

const SITE_URL = "https://www.dendrux.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const docSlugs = await listAllDocs();

  const docsEntries: MetadataRoute.Sitemap = docSlugs.map((slug) => ({
    url: `${SITE_URL}/docs/${slug.join("/")}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docsEntries,
  ];
}
