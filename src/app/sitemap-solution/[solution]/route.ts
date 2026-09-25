import { CONTENT_UPDATED } from "@/lib/location-seo";
import { siteConfig } from "@/lib/site-config";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { isWorldSolution, worldCountries, worldCities } from "@/data/world-geo";

// One sitemap per solution/vertical: the solution hub page + every
// solution x country page + every solution x country x city page.
// Matches the real routes at /solutions/[solution], /solutions/[solution]/[country],
// /solutions/[solution]/[country]/[city]. World-coverage solutions (Remote
// DBA) list every country and the 500 high-demand world cities instead.
// Built once per deploy and cached for a day: crawlers hit these often, and
// rebuilding thousands of URLs on every request wastes function time.
export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceVerticals.map((x) => ({ solution: x.slug }));
}

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
  const now = new Date(CONTENT_UPDATED).toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/solutions/${solution.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;

  const solutionCountries = isWorldSolution(solution.slug) ? worldCountries : countries;
  const solutionCities = isWorldSolution(solution.slug) ? worldCities : cities;

  for (const country of solutionCountries) {
    xml += `
  <url>
    <loc>${baseUrl}/solutions/${solution.slug}/${country.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  for (const city of solutionCities) {
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
