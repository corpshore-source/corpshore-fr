import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { locales } from "@/i18n/routing";

const pages = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/industries", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/a-propos", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/carrieres", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/etudes-de-cas", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const { path, priority, changeFrequency } of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE.url}/${locale}${path === "/" ? "" : path}`,
        lastModified: new Date("2026-08-01"),
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE.url}/${l}${path === "/" ? "" : path}`])
          ),
        },
      });
    }
  }
  return entries;
}
