import { siteConfig } from "@/lib/site-config";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/case-studies";
import { blogPosts } from "@/data/blog-posts";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { localeForCountrySlug } from "@/lib/locale";

export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static routes
  const staticRoutes = [
    { url: `${baseUrl}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/industries`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/case-studies`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${baseUrl}/careers`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/locations`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${baseUrl}/terms-of-service`, priority: 0.3, changeFrequency: "yearly" },
  ];

  // Industry routes
  const industryRoutes = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  // Case study routes
  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  // Blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  // Country routes
  const countryRoutes = countries.map((country) => ({
    url: `${baseUrl}/${localeForCountrySlug(country.slug)}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  // City routes
  const cityRoutes = cities.map((city) => ({
    url: `${baseUrl}/${localeForCountrySlug(city.countrySlug)}/${city.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const allRoutes = [
    ...staticRoutes,
    ...industryRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
    ...countryRoutes,
    ...cityRoutes,
  ];

  for (const route of allRoutes) {
    xml += `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${now}</lastmod>
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
