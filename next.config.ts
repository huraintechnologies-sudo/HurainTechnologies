import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // Performance: Compression and minification
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,

  // Image optimization for <3s load
  images: {
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
      // API routes - minimal caching
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=60, s-maxage=600" },
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

  // Enable SWR (stale-while-revalidate)
  experimental: {
    isrMemoryCacheSize: 52 * 1024 * 1024, // 52MB cache for ISR
  },
};

export default nextConfig;
