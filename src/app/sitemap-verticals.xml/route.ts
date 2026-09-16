import { siteConfig } from "@/lib/site-config";
import { serviceVerticals } from "@/data/service-verticals";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Main vertical pages sitemap
  xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-verticals-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`;

  // Each vertical gets its own category + country sitemap
  for (const vertical of serviceVerticals) {
    xml += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${vertical.slug}-pages.xml</loc>
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
