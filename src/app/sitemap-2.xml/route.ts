import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { countries } from "@/data/countries";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Service routes
  for (const service of services) {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }

  // Service + Country routes (limit to 10K total)
  let count = services.length;
  const limit = 10000;
  for (const service of services) {
    for (const country of countries) {
      if (count >= limit) break;
      xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${country.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.55</priority>
  </url>`;
      count++;
    }
    if (count >= limit) break;
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
