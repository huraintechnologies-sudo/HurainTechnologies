import { CONTENT_UPDATED } from "@/lib/location-seo";
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Next.js's built-in sitemap convention. Kept intentionally small and static —
// the full site (countries, cities, services, solutions, industries) is
// covered by /sitemap_index.xml and its child sitemaps, which is what
// robots.ts advertises to crawlers. A single MetadataRoute.Sitemap export
// can't paginate itself, so it must never carry the full route set here.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(CONTENT_UPDATED);

  return [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/industries`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/locations`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/markets-we-cover`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
