import type { NextConfig } from "next";
import { COUNTRY_CODE_TO_SLUG } from "./src/lib/geo";
import slugRedirects from "./src/data/slug-redirects.json";

// Mirrors localeForCountrySlug in src/lib/locale.ts ("germany" -> "en-de");
// next.config can't resolve the "@/" path alias that module imports with.
function localeForCountrySlug(slug: string): string | undefined {
  const code = Object.keys(COUNTRY_CODE_TO_SLUG).find((c) => COUNTRY_CODE_TO_SLUG[c] === slug);
  return code ? `en-${code.toLowerCase()}` : undefined;
}

const nextConfig: NextConfig = {
  // Performance: Compression and minification
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateEtags: true,

  // Image optimization for <3s load
  images: {
    // Team photos carry a ?v=<content hash> cache-buster (see TeamSection);
    // every other local image must be requested without a query string.
    localPatterns: [
      { pathname: "/images/team/**" },
      { pathname: "/**", search: "" },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year for immutable assets
    dangerouslyAllowSVG: false,
  },

  // Aggressive caching for <3s pages
  headers: async () => {
    return [
      // Static HTML/JS - cache aggressively
      {
        source: "/(_next/static|_next/image)/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Images - cache forever
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // Page cache - shorter for updates
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      // API routes - never cache (the contact endpoint is per-request)
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      // llms.txt
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },

  // Duplicate country slugs (see COUNTRY_SLUG_ALIASES in src/data/countries.ts)
  // and slugs that were generated with accented letters stripped (e.g.
  // "m-nchen" -> "munchen", see src/data/slug-redirects.json) 301 to their
  // canonical slug so link equity consolidates.
  redirects: async () => {
    const countryRedirects = [
      { from: "tanzania", to: "united-republic-of-tanzania" },
      { from: "hong-kong", to: "china-hong-kong-sar" },
      ...slugRedirects.countries,
    ].flatMap(({ from, to }) => [
      { source: `/:section(services|solutions|industries)/:item/${from}`, destination: `/:section/:item/${to}`, statusCode: 301 as const },
      { source: `/:section(services|solutions|industries)/:item/${from}/:city`, destination: `/:section/:item/${to}/:city`, statusCode: 301 as const },
    ]);

    const cityRedirects = slugRedirects.cities.flatMap(({ country, from, to }) => {
      const rules = [
        { source: `/:section(services|solutions|industries)/:item/${country}/${from}`, destination: `/:section/:item/${country}/${to}`, statusCode: 301 as const },
      ];
      const locale = localeForCountrySlug(country);
      if (locale) rules.push({ source: `/${locale}/${from}`, destination: `/${locale}/${to}`, statusCode: 301 as const });
      return rules;
    });

    return [...countryRedirects, ...cityRedirects];
  },

  // Browsers and crawlers request /favicon.ico regardless of <link rel="icon">;
  // serve the generated app icon there instead of a 404.
  rewrites: async () => [{ source: "/favicon.ico", destination: "/icon" }],

  // No experimental features needed for this version
};

export default nextConfig;
