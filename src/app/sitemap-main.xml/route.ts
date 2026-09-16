import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
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

  // Static pages
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

  for (const route of staticRoutes) {
    xml += `
  <url>
    <loc>${route.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }

  // Service main pages
  for (const service of services) {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }

  // Industry main pages
  for (const industry of industries) {
    xml += `
  <url>
    <loc>${baseUrl}/industries/${industry.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  // Blog posts
  for (const post of blogPosts) {
    xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  // Case studies
  for (const cs of caseStudies) {
    xml += `
  <url>
    <loc>${baseUrl}/case-studies/${cs.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  // Note: Country and city pages are in separate solution-specific sitemaps

  xml += `
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}
