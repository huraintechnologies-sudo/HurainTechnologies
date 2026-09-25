import { CONTENT_UPDATED } from "@/lib/location-seo";
import { siteConfig } from "@/lib/site-config";
import { industries } from "@/data/industries";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";

// One sitemap per industry: the industry hub page + every industry x country
// page. Industries do not have city-level pages (no such route exists), so
// this stops at the country level — matches /industries/[slug] and
// /industries/[slug]/[country].
// Built once per deploy and cached for a day: crawlers hit these often, and
// rebuilding thousands of URLs on every request wastes function time.
export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((x) => ({ industry: x.slug }));
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ industry: string }> }
) {
  const { industry: industrySlug } = await params;
  const industry = industries.find((i) => i.slug === industrySlug);
  if (!industry) {
    return new Response("Not Found", { status: 404 });
  }

  const baseUrl = siteConfig.url;
  const now = new Date(CONTENT_UPDATED).toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/industries/${industry.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

  for (const country of countries) {
    xml += `
  <url>
    <loc>${baseUrl}/industries/${industry.slug}/${country.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  for (const city of cities) {
    xml += `
  <url>
    <loc>${baseUrl}/industries/${industry.slug}/${city.countrySlug}/${city.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
