import { siteConfig } from "@/lib/site-config";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";

// One sitemap per solution/vertical: the solution hub page + every
// solution x country page + every solution x country x city page.
// Matches the real routes at /solutions/[solution], /solutions/[solution]/[country],
// /solutions/[solution]/[country]/[city].
export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ solution: string }> }
) {
  const { solution: solutionSlug } = await params;
  const solution = serviceVerticals.find((v) => v.slug === solutionSlug);
  if (!solution) {
    return new Response("Not Found", { status: 404 });
  }

  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/solutions/${solution.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

  for (const country of countries) {
    xml += `
  <url>
    <loc>${baseUrl}/solutions/${solution.slug}/${country.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  for (const city of cities) {
    xml += `
  <url>
    <loc>${baseUrl}/solutions/${solution.slug}/${city.countrySlug}/${city.slug}</loc>
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

export function generateStaticParams() {
  return serviceVerticals.map((solution) => ({ solution: solution.slug }));
}
