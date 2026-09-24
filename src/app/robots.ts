import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { serviceVerticals } from "@/data/service-verticals";
import { industries } from "@/data/industries";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/", "/admin/"],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      // Block bad bots
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
    ],
    // Every sitemap is listed explicitly (not just the index) so crawlers
    // that don't follow sitemap indexes still discover all of them.
    sitemap: [
      `${siteConfig.url}/sitemap_index.xml`,
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/sitemap-main.xml`,
      `${siteConfig.url}/sitemap-pages.xml`,
      `${siteConfig.url}/sitemap-countries.xml`,
      `${siteConfig.url}/sitemap-cities.xml`,
      ...services.map((s) => `${siteConfig.url}/sitemap-service/${s.slug}`),
      ...serviceVerticals.map((v) => `${siteConfig.url}/sitemap-solution/${v.slug}`),
      ...industries.map((i) => `${siteConfig.url}/sitemap-industry/${i.slug}`),
    ],
    host: siteConfig.url,
  };
}
