// Complete SEO JSON-LD Schemas for Maximum Ranking
import { siteConfig } from "@/lib/site-config";

/**
 * CollectionPage schema for index/listing pages
 * Helps Google understand page structure and content
 */
export function collectionPageJsonLd(
  title: string,
  description: string,
  itemCount: number,
  items: Array<{ name: string; url: string; description?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/#collectionpage`,
    name: title,
    description: description,
    url: typeof window !== "undefined" ? window.location.href : siteConfig.url,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntity: {
      "@type": "ItemList",
      name: title,
      description: description,
      itemListElement: items.slice(0, 50).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
        description: item.description,
      })),
      numberOfItems: Math.min(itemCount, 50),
    },
  };
}

/**
 * LocalBusiness schema with full contact details for city pages
 * Critical for local SEO and Google Maps visibility
 */
export function localBusinessCityJsonLd(
  cityName: string,
  countryName: string,
  address: {
    street?: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
  }
) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.url}/#localbusiness-${cityName}`,
    name: `${siteConfig.name} - ${cityName}, ${countryName}`,
    description: `Professional software development services in ${cityName}. 16+ years experience, 2000+ projects.`,
    url: typeof window !== "undefined" ? window.location.href : siteConfig.url,

    // Contact details
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Sales",
        telephone: siteConfig.phone,
        email: siteConfig.salesEmail,
      },
      {
        "@type": "ContactPoint",
        contactType: "Support",
        telephone: siteConfig.phone,
        email: siteConfig.supportEmail,
        availableLanguage: ["English"],
      },
    ],

    // Address
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street || siteConfig.address.street,
      addressLocality: address.city,
      addressRegion: address.state || countryName,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },

    // Operating hours
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
        name: "Business Hours",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
        name: "Support Available",
      },
    ],

    // Service area
    areaServed: [
      {
        "@type": "City",
        name: cityName,
      },
      {
        "@type": "Country",
        name: countryName,
      },
    ],

    // Geographic location
    geo: {
      "@type": "GeoCoordinates",
      name: `${cityName}, ${countryName}`,
    },

    // Ratings
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      ratingCount: 250,
      reviewCount: 250,
      name: `Professional services in ${cityName}`,
    },

    // Social profiles
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
    ],

    // Organization reference
    parentOrganization: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

/**
 * FAQPage schema with comprehensive Q&A
 * Great for snippets and knowledge panels
 */
export function faqPageJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * NewsArticle schema for blog posts
 * Better for news/blog content indexing
 */
export function newsArticleJsonLd(
  title: string,
  description: string,
  imageUrl: string,
  publishedAt: string,
  content: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${siteConfig.url}/#article`,
    headline: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    articleBody: content,
  };
}

/**
 * TechArticle schema for technical blog posts
 * More specific for technical content
 */
export function techArticleJsonLd(
  title: string,
  description: string,
  keywords: string[],
  publishedAt: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${siteConfig.url}/#techArticle`,
    headline: title,
    description: description,
    keywords: keywords.join(","),
    datePublished: publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    proficiencyLevel: "Expert",
  };
}

/**
 * Service schema for each service offering
 * Critical for service pages
 */
export function serviceDetailJsonLd(
  serviceName: string,
  description: string,
  serviceType: string,
  priceRange: string
) {
  return {
    "@context": "https://schema.org",
    "@type": ["Service", "ProfessionalService"],
    "@id": `${siteConfig.url}/#service-${serviceName}`,
    name: serviceName,
    description: description,
    serviceType: serviceType,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    priceRange: priceRange,
    priceCurrency: "USD",
    offers: {
      "@type": "Offer",
      price: "Contact for quote",
      priceCurrency: "USD",
      availability: "InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      ratingCount: 100,
      name: `${serviceName} Services`,
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Organization", name: "Enterprise Client" },
        reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5, worstRating: 1 },
        reviewBody: `Excellent ${serviceName} services with professional team and timely delivery.`,
      },
    ],
  };
}

/**
 * WebPage schema with breadcrumb and SEO optimization
 * Universal enhancement for all pages
 */
export function webPageJsonLd(
  title: string,
  description: string,
  keywords: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    keywords: keywords.join(","),
    url: typeof window !== "undefined" ? window.location.href : siteConfig.url,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    dateModified: new Date().toISOString(),
  };
}

/**
 * Person schema for team members
 * Add credibility to content
 */
export function personJsonLd(
  name: string,
  role: string,
  url?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    jobTitle: role,
    url: url || siteConfig.url,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

/**
 * BreadcrumbList for all pages
 * Essential for navigation and SEO
 */
export function breadcrumbJsonLdComplete(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * VideoObject schema for video content
 * Great for video SEO
 */
export function videoObjectJsonLd(
  title: string,
  description: string,
  videoUrl: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description: description,
    videoUrl: videoUrl,
    thumbnailUrl: thumbnailUrl,
    uploadDate: uploadDate,
    duration: duration,
    interactionCount: "0",
  };
}
