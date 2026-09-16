import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { serviceVerticals } from "@/data/service-verticals";
import { caseStudies } from "@/data/case-studies";
import { blogPosts } from "@/data/blog-posts";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { localeForCountrySlug } from "@/lib/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteConfig.url}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${siteConfig.url}/industries/${industry.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteConfig.url}/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const countryRoutes: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${siteConfig.url}/${localeForCountrySlug(country.slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${siteConfig.url}/${localeForCountrySlug(city.countrySlug)}/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const serviceCountryRoutes: MetadataRoute.Sitemap = services.flatMap((service) =>
    countries.map((country) => ({
      url: `${siteConfig.url}/services/${service.slug}/${country.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    }))
  );

  const serviceCountryCityRoutes: MetadataRoute.Sitemap = services.flatMap((service) =>
    cities.map((city) => ({
      url: `${siteConfig.url}/services/${service.slug}/${city.countrySlug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  const industryCountryRoutes: MetadataRoute.Sitemap = industries.flatMap((industry) =>
    countries.map((country) => ({
      url: `${siteConfig.url}/industries/${industry.slug}/${country.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  // Solution Vertical Routes
  const solutionVerticalRoutes: MetadataRoute.Sitemap = serviceVerticals.map((vertical) => ({
    url: `${siteConfig.url}/solutions/${vertical.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Solution + Country Routes (NEW)
  const solutionCountryRoutes: MetadataRoute.Sitemap = serviceVerticals.flatMap((vertical) =>
    countries.map((country) => ({
      url: `${siteConfig.url}/solutions/${vertical.slug}/${country.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Solution + Country + City Routes (NEW)
  const solutionCountryCityRoutes: MetadataRoute.Sitemap = serviceVerticals.flatMap((vertical) =>
    cities.map((city) => ({
      url: `${siteConfig.url}/solutions/${vertical.slug}/${city.countrySlug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  // Combine all routes - no limit, will be split across multiple sitemaps
  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...solutionVerticalRoutes,
    ...solutionCountryRoutes,
    ...solutionCountryCityRoutes,
    ...industryRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
    ...countryRoutes,
    ...cityRoutes,
    ...serviceCountryRoutes,
    ...serviceCountryCityRoutes,
    ...industryCountryRoutes,
  ];

  // Return all routes (Google recommends 50K per sitemap, but we handle via sitemap index)
  // Total coverage: ~770,000+ pages across all routes
  return allRoutes;
}
