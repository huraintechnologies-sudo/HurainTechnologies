import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { serviceVerticals } from "@/data/service-verticals";
import { industries } from "@/data/industries";

const AI_BOTS = [
  // OpenAI / ChatGPT
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / AI Overviews
  "Google-Extended",
  // Apple Intelligence / Siri
  "Applebot",
  "Applebot-Extended",
  // Meta AI
  "meta-externalagent",
  "FacebookBot",
  // Amazon / Alexa
  "Amazonbot",
  // Microsoft Copilot (via Bing)
  "bingbot",
  // DuckDuckGo AI
  "DuckAssistBot",
  // Mistral, Cohere, You.com
  "MistralAI-User",
  "cohere-ai",
  "YouBot",
  // Common Crawl (training data for many models) and ByteDance
  "CCBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Other crawlers: everything except the contact-form endpoint, which
      // only accepts POST and has nothing to index.
      {
        userAgent: "*",
        allow: ["/", "/llms.txt"],
        disallow: ["/api/"],
      },
      // AI assistants and answer engines: unrestricted access. A crawler
      // matched by name ignores the "*" group, so nothing is disallowed for
      // them (the site has no /admin/, and /api/ holds no readable content).
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: ["/", "/llms.txt"] })),
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
