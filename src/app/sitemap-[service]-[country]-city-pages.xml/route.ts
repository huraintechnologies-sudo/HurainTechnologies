import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { countries, getCountryBySlug } from "@/data/countries";
import { cities } from "@/data/cities";

export async function GET(
  _: Request,
  { params }: { params: { service: string; country: string } }
) {
  const service = services.find((s) => s.slug === params.service);
  const country = getCountryBySlug(params.country);

  if (!service || !country) {
    return new Response("Not Found", { status: 404 });
  }

  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Service × Country page
  xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${country.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Service × Country × City pages for this country
  const countryCities = cities.filter((c) => c.countrySlug === country.slug);
  for (const city of countryCities) {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${country.slug}/${city.slug}</loc>
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

export async function generateStaticParams() {
  const params: Array<{ service: string; country: string }> = [];

  for (const service of services) {
    for (const country of countries) {
      params.push({
        service: service.slug,
        country: country.slug,
      });
    }
  }

  return params;
}
