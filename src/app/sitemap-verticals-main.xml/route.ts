import { siteConfig } from "@/lib/site-config";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { localeForCountrySlug } from "@/lib/locale";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // All vertical main pages
  for (const vertical of serviceVerticals) {
    xml += `
  <url>
    <loc>${baseUrl}/${vertical.category.toLowerCase().replace(/\s+/g, "-")}/${vertical.slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }

  // All country + vertical pages (8 verticals × 205 countries = 1,640 URLs)
  for (const vertical of serviceVerticals) {
    for (const country of countries) {
      const locale = localeForCountrySlug(country.slug);
      xml += `
  <url>
    <loc>${baseUrl}/${locale}/${vertical.slug}-company/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
