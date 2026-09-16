import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
    sitemap: [
      // Master index
      `${siteConfig.url}/sitemap_index.xml`,
      // Service Verticals (Mobile App, E-Commerce, Food Delivery, Retail, etc.)
      `${siteConfig.url}/sitemap-verticals.xml`,
      `${siteConfig.url}/sitemap-verticals-main.xml`,
      // Solution-wise sitemaps (main + indexes)
      `${siteConfig.url}/sitemap-main.xml`,
      `${siteConfig.url}/sitemap-solutions.xml`,
      `${siteConfig.url}/sitemap-services-countries.xml`,
      // Country, City, Service indexes
      `${siteConfig.url}/sitemap-countries.xml`,
      `${siteConfig.url}/sitemap-cities.xml`,
      `${siteConfig.url}/sitemap-services.xml`,
      // Partitioned main sitemaps
      `${siteConfig.url}/sitemap-1.xml`,
      `${siteConfig.url}/sitemap-2.xml`,
      `${siteConfig.url}/sitemap-3.xml`,
      `${siteConfig.url}/sitemap-4.xml`,
      `${siteConfig.url}/sitemap-5.xml`,
      // Legacy sitemaps
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/sitemap-service-city.xml`,
      `${siteConfig.url}/sitemap-industry-country.xml`,
    ],
    host: siteConfig.url,
  };
}
