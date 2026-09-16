import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

export async function GET(
  _: Request,
  { params }: { params: { service: string } }
) {
  const service = services.find((s) => s.slug === params.service);
  if (!service) {
    return new Response("Not Found", { status: 404 });
  }

  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Service main page
  xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

  // Service × Country × City combinations (all cities)
  for (const city of cities) {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${city.countrySlug}/${city.slug}</loc>
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
  return services.map((service) => ({
    service: service.slug,
  }));
}
