import { CONTENT_UPDATED } from "@/lib/location-seo";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";

// One sitemap per service: the service hub page + every service x country
// page + every service x country x city page. Matches the real routes at
// /services/[slug], /services/[slug]/[country], /services/[slug]/[country]/[city].
// Built once per deploy and cached for a day: crawlers hit these often, and
// rebuilding thousands of URLs on every request wastes function time.
export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((x) => ({ service: x.slug }));
}

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
  const now = new Date(CONTENT_UPDATED).toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

  for (const country of countries) {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${country.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  for (const city of cities) {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}/${city.countrySlug}/${city.slug}</loc>
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
