import { siteConfig } from "@/lib/site-config";

// Core site pages only — no country/city/service/solution/industry variants.
// Those each live in their own dedicated sitemap (see sitemap_index.xml).
export async function GET() {
  const baseUrl = siteConfig.url;
  const now = new Date().toISOString();

  const staticRoutes: { url: string; priority: number; changeFrequency: string }[] = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${baseUrl}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/solutions`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/industries`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/case-studies`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${baseUrl}/careers`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/locations`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/markets-we-cover`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${baseUrl}/terms-of-service`, priority: 0.3, changeFrequency: "yearly" },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const route of staticRoutes) {
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
