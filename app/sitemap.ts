import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    ...services.map((s) => s.slug),
    "miamisburg-oh",
    "privacy",
    "terms",
  ];

  return routes.map((path) => ({
    url: path ? `${site.url}/${path}` : site.url,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
