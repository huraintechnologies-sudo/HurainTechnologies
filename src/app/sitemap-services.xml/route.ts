import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const service of services) {
    xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-service/${service.slug}.xml</loc>
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
