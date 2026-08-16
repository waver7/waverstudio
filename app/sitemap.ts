import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content";
import { posts } from "@/lib/insights";
import { locations } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    ...services.map((s) => s.slug),
    "miamisburg-oh",
    ...locations.map((l) => l.slug),
    "insights",
    "privacy",
    "terms",
  ].map((path) => ({
    url: path ? `${site.url}/${path}` : site.url,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${site.url}/insights/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
