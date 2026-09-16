import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { countries } from "@/data/countries";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ service: string }> }
) {
  const { service: serviceSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
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

  // Service × Country pages
  for (const country of countries) {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${country.slug}</loc>
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

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }));
}
