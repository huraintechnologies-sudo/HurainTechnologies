import { siteConfig } from "@/lib/site-config";
import { cities } from "@/data/cities";
import { localeForCountrySlug } from "@/lib/locale";

// All city hub pages in a single flat sitemap.
export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const city of cities) {
    const locale = localeForCountrySlug(city.countrySlug);
    if (!locale) continue;
    xml += `
  <url>
    <loc>${baseUrl}/${locale}/${city.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
