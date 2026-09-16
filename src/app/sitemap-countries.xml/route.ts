import { siteConfig } from "@/lib/site-config";
import { countries } from "@/data/countries";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const country of countries) {
    xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-country/${country.slug}.xml</loc>
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
