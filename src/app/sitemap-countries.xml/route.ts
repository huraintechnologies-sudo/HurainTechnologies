import { CONTENT_UPDATED } from "@/lib/location-seo";
import { siteConfig } from "@/lib/site-config";
import { countries } from "@/data/countries";
import { localeForCountrySlug } from "@/lib/locale";

// All country hub pages in a single flat sitemap.
export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date(CONTENT_UPDATED).toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const country of countries) {
    const locale = localeForCountrySlug(country.slug);
    if (!locale) continue;
    xml += `
  <url>
    <loc>${baseUrl}/${locale}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
