import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const serviceCountryCityRoutes = services.flatMap((service) =>
    cities.slice(0, 50).map((city) => ({
      url: `${baseUrl}/services/${service.slug}/${city.countrySlug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }))
  );

  for (const route of serviceCountryCityRoutes) {
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
