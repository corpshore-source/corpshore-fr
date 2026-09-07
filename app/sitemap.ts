import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { locales } from "@/i18n/routing";
import { blogPosts } from "@/lib/data/blog";
import { pressReleases } from "@/lib/data/press";
import { industrySectors } from "@/lib/data/industries-data";
import { servicesDeep } from "@/lib/data/services-deep";

const NOW = new Date();

const staticPages = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/industries", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/villes", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/a-propos", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/carrieres", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/etudes-de-cas", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/devis", priority: 0.95, changeFrequency: "monthly" as const },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
];

function alts(path: string) {
  return {
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${SITE.url}/${l}${path}`])),
      "x-default": `${SITE.url}/fr${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const { path, priority, changeFrequency } of staticPages) {
    for (const locale of locales) {
      const p = path === "/" ? "" : path;
      entries.push({
        url: `${SITE.url}/${locale}${p}`,
        lastModified: NOW,
        changeFrequency,
        priority,
        alternates: alts(p),
      });
    }
  }

  // Industry sub-pages
  for (const sector of industrySectors) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE.url}/${locale}/industries/${sector.slug}`,
        lastModified: NOW,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: alts(`/industries/${sector.slug}`),
      });
    }
  }

  // Service deep-dive pages
  for (const svc of servicesDeep) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE.url}/${locale}/services/${svc.slug}`,
        lastModified: NOW,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: alts(`/services/${svc.slug}`),
      });
    }
  }

  // Blog posts
  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.7,
        alternates: alts(`/blog/${post.slug}`),
      });
    }
  }

  // Press releases
  for (const pr of pressReleases) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/press/${pr.id.toLowerCase()}`,
        lastModified: new Date(pr.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: alts(`/blog/press/${pr.id.toLowerCase()}`),
      });
    }
  }

  return entries;
}
