import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { cities, getCityBySlug } from "@/data/cities";
import { industries } from "@/data/industries";
import { localeForCountrySlug } from "@/lib/locale";

export async function GET(
  _: Request,
  { params }: { params: { city: string } }
) {
  const city = getCityBySlug(params.city);
  if (!city) {
    return new Response("Not Found", { status: 404 });
  }

  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();
  const locale = localeForCountrySlug(city.countrySlug);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // City main page
  xml += `
  <url>
    <loc>${baseUrl}/${locale}/${city.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`;

  // Services in this city
  for (const service of services) {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${city.countrySlug}/${city.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  // Industries in this city (via country)
  for (const industry of industries) {
    xml += `
  <url>
    <loc>${baseUrl}/industries/${industry.slug}/${city.countrySlug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}
