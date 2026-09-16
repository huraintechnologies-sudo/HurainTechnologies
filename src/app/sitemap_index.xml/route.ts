import { siteConfig } from "@/lib/site-config";

export async function GET() {
  const baseUrl = siteConfig.url;
  const lastModified = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- SERVICE VERTICALS (Mobile App, E-Commerce, Food Delivery, etc.) -->
  <sitemap>
    <loc>${baseUrl}/sitemap-verticals.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-verticals-main.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>

  <!-- SOLUTION-WISE SITEMAPS (Like N&T Software) -->
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-solutions.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-services-countries.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>

  <!-- MAIN INDEXES - Country, City, Service Wise -->
  <sitemap>
    <loc>${baseUrl}/sitemap-countries.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-cities.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-services.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>

  <!-- PARTITIONED MAIN SITEMAPS (under 10K each) -->
  <sitemap>
    <loc>${baseUrl}/sitemap-1.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-2.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-3.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-4.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-5.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>

  <!-- LEGACY SITEMAPS -->
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-service-city.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-industry-country.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
