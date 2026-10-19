import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { publishedProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/projects`, changeFrequency: "monthly", priority: 0.8 },
    ...publishedProjects.map((p) => ({
      url: `${SITE.url}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE.url}/resume`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
