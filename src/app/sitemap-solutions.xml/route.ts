import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- MAIN SITEMAP - Static pages only (no country/city) -->
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>

  <!-- SOLUTION-WISE COUNTRY PAGES (14 services × country) -->`;

  // Each service gets country-wise sitemap
  for (const service of services) {
    xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${service.slug}-country-pages.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`;
  }

  xml += `

  <!-- SOLUTION-WISE CITY PAGES (14 services × city) -->`;

  // Each service gets city-wise sitemap
  for (const service of services) {
    xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${service.slug}-city-pages.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`;
  }

  xml += `
</sitemapindex>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
