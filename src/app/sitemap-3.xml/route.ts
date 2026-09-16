import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Service × Country × City routes (PART 1: first 10K)
  let count = 0;
  const limit = 10000;
  for (const service of services) {
    for (const city of cities) {
      if (count >= limit) break;
      xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${city.countrySlug}/${city.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
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
