import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { countries } from "@/data/countries";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Each service × country combination
  for (const service of services) {
    for (const country of countries) {
      xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${service.slug}-${country.slug}-city-pages.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`;
    }
  }

  xml += `
</sitemapindex>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
