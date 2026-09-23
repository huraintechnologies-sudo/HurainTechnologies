import { CONTENT_UPDATED } from "@/lib/location-seo";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { serviceVerticals } from "@/data/service-verticals";
import { industries } from "@/data/industries";

// Master sitemap index. Structure:
//   sitemap-main.xml            -> static/core pages (non-country)
//   sitemap-pages.xml           -> blog + case studies
//   sitemap-countries.xml       -> every country hub page
//   sitemap-cities.xml          -> every city hub page
//   sitemap-service/{slug}      (one per service, x13)  -> that service's country + city pages
//   sitemap-solution/{slug}     (one per solution, x16) -> that solution's country + city pages
//   sitemap-industry/{slug}     (one per industry, x9)  -> that industry's country pages
//
// The per-service/solution/industry sitemaps deliberately live at
// /sitemap-service/{slug} (no .xml suffix, plain dynamic segment) rather than
// /sitemap-service-{slug}.xml — Next.js's route matcher cannot generate a
// correct regex for a dynamic segment mixed with literal text in the same
// path segment (verified via .next/routes-manifest.json: it collapses to
// matching any single segment), so the literal prefix/suffix must live in
// its own path segment. Content-Type is still application/xml either way.
export async function GET() {
  const baseUrl = siteConfig.url;
  const lastModified = new Date(CONTENT_UPDATED).toISOString();

  const sitemapEntries = [
    `${baseUrl}/sitemap-main.xml`,
    `${baseUrl}/sitemap-pages.xml`,
    `${baseUrl}/sitemap-countries.xml`,
    `${baseUrl}/sitemap-cities.xml`,
    ...services.map((s) => `${baseUrl}/sitemap-service/${s.slug}`),
    ...serviceVerticals.map((v) => `${baseUrl}/sitemap-solution/${v.slug}`),
    ...industries.map((i) => `${baseUrl}/sitemap-industry/${i.slug}`),
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const loc of sitemapEntries) {
    xml += `
  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>`;
  }

  xml += `
</sitemapindex>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
