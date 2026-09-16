import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { countries, getCountryBySlug } from "@/data/countries";
import { cities } from "@/data/cities";
import { localeForCountrySlug } from "@/lib/locale";

export async function GET(
  _: Request,
  { params }: { params: { country: string } }
) {
  const country = getCountryBySlug(params.country);
  if (!country) {
    return new Response("Not Found", { status: 404 });
  }

  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();
  const locale = localeForCountrySlug(country.slug);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Country main page
  xml += `
  <url>
    <loc>${baseUrl}/${locale}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Services in this country
  for (const service of services) {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${country.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  // Industries in this country
  for (const industry of industries) {
    xml += `
  <url>
    <loc>${baseUrl}/industries/${industry.slug}/${country.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  // Cities in this country
  const countryCities = cities.filter((c) => c.countrySlug === country.slug);
  for (const city of countryCities) {
    xml += `
  <url>
    <loc>${baseUrl}/${locale}/${city.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.65</priority>
  </url>`;
  }

  // Service × City combinations for this country (limit to 5K per country)
  let count = 0;
  for (const service of services) {
    for (const city of countryCities) {
      if (count >= 5000) break;
      xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${country.slug}/${city.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
      count++;
    }
    if (count >= 5000) break;
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}

export async function generateStaticParams() {
  return countries.map((country) => ({
    country: country.slug,
  }));
}
