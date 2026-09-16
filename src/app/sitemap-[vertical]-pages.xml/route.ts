import { siteConfig } from "@/lib/site-config";
import { serviceVerticals } from "@/data/service-verticals";
import { countries, getCountryBySlug } from "@/data/countries";
import { cities } from "@/data/cities";
import { highDemandCities } from "@/data/high-demand-cities";
import { localeForCountrySlug } from "@/lib/locale";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ vertical: string }> }
) {
  const { vertical: verticalSlug } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === verticalSlug);
  if (!vertical) {
    return new Response("Not Found", { status: 404 });
  }

  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Main vertical page
  xml += `
  <url>
    <loc>${baseUrl}/${vertical.category.toLowerCase().replace(/\s+/g, "-")}/${vertical.slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

  // Vertical pages for each country
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

  // High-demand cities for each country
  for (const demandCityList of highDemandCities) {
    const country = getCountryBySlug(demandCityList.countrySlug);
    if (!country) continue;

    const locale = localeForCountrySlug(country.slug);
    const citySlugs = cities
      .filter((c) => c.countrySlug === country.slug)
      .map((c) => c.slug);

    // Get top 50 cities for this country
    const topCities = demandCityList.cities.slice(0, 50);

    for (const cityName of topCities) {
      const citySlug = cityName.toLowerCase().replace(/\s+/g, "-");
      const cityExists = citySlugs.includes(citySlug);

      if (cityExists) {
        xml += `
  <url>
    <loc>${baseUrl}/${locale}/${vertical.slug}-company-in-${citySlug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    }
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}

export async function generateStaticParams() {
  return serviceVerticals.map((vertical) => ({
    vertical: vertical.slug,
  }));
}
