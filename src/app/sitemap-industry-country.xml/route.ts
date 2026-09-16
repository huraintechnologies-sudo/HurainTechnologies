import { siteConfig } from "@/lib/site-config";
import { industries } from "@/data/industries";
import { countries } from "@/data/countries";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const industryCountryRoutes = industries.flatMap((industry) =>
    countries.map((country) => ({
      url: `${baseUrl}/industries/${industry.slug}/${country.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }))
  );

  for (const route of industryCountryRoutes.slice(0, 50000)) {
    xml += `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
