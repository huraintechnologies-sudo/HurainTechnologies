// ULTRA-STRONG JSON-LD Schemas - ABSOLUTE MAXIMUM
// Every possible field, property, and schema type
// Google's strongest possible structure for maximum ranking

import { siteConfig } from "@/lib/site-config";
import { countries } from "@/data/countries";
import { buildSolutionPageKeywords, buildSolutionCityPageKeywords } from "@/lib/keywords-builder";

const ogImage = {
  "@type": "ImageObject",
  url: `${siteConfig.url}/opengraph-image`,
  width: 1200,
  height: 630,
  name: "Hurain Technologies",
};

const logoImage = {
  "@type": "ImageObject",
  "@id": `${siteConfig.url}/#logo`,
  url: `${siteConfig.url}/logo.png`,
  width: 512,
  height: 512,
  name: "Hurain Technologies Logo",
};

/**
 * ULTRA-STRONG Organization Schema
 * Includes EVERY possible property for maximum ranking
 */
export function ultraStrongOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness", "Corporation"],
    "@id": `${siteConfig.url}/#organization`,

    // Basic Info
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: [siteConfig.parentGroup, "Hurain Tech", "Hurain Technologies Pvt Ltd"],
    url: siteConfig.url,

    // Identity
    logo: logoImage,
    image: [ogImage, logoImage],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: logoImage,
      description: siteConfig.tagline,
    },

    // Descriptive
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    tagline: siteConfig.tagline,

    // Dates
    foundingDate: siteConfig.founded,
    foundingLocation: {
      "@type": "Place",
      name: `${siteConfig.address.city}, ${siteConfig.address.state}, ${siteConfig.address.country}`,
    },

    // Contact
    email: siteConfig.email,
    telephone: siteConfig.phone,
    faxNumber: siteConfig.phone,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.salesEmail,
        telephone: siteConfig.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Hindi"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.supportEmail,
        telephone: siteConfig.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
      {
        "@type": "ContactPoint",
        contactType: "technical support",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],

    // Address
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.locality}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },

    // Location
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.1717,
      longitude: 72.4383,
      name: siteConfig.address.city,
    },

    // Services
    knowsAbout: [
      "Blockchain Development",
      "Cryptocurrency Development",
      "Smart Contract Development",
      "DeFi Protocol Engineering",
      "Crypto Wallet Development",
      "Payment Gateway Integration",
      "API Integration",
      "Cloud Application Modernization",
      "DevOps & CI/CD",
      "AI Fraud Detection",
      "Cybersecurity",
      "AML/KYC Compliance",
      "Web Development",
      "Mobile App Development",
      "E-Commerce Solutions",
      "SaaS Platforms",
      "Healthcare Solutions",
      "Logistics Systems",
    ],

    // Geographic Coverage
    areaServed: [
      ...countries.map((c) => ({
        "@type": "Country",
        name: c.countryName,
      })),
      {
        "@type": "Place",
        name: "Worldwide",
      },
    ],
    serviceArea: {
      "@type": "GeoShape",
      box: "-90,-180 90,180",
      name: "Worldwide",
    },

    // People
    founder: [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/about#founder`,
        name: siteConfig.founderName,
        url: `${siteConfig.url}/about`,
        sameAs: [siteConfig.founder.linkedin],
      },
    ],
    employee: [
      {
        "@type": "Person",
        name: "Development Team",
        jobTitle: "Senior Developers",
        description: "Expert developers with 10+ years experience",
      },
      {
        "@type": "Person",
        name: "Solutions Team",
        jobTitle: "Solutions Architects",
        description: "Enterprise solution designers",
      },
      {
        "@type": "Person",
        name: "Support Team",
        jobTitle: "Technical Support Engineers",
        description: "24/7 customer support",
      },
    ],

    // Relationships
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentGroup,
      url: "https://hurainengitech.com",
    },
    subOrganization: [
      {
        "@type": "Organization",
        name: "Hurain Blockchain Solutions",
        url: `${siteConfig.url}/services/blockchain-cryptocurrency-development`,
      },
      {
        "@type": "Organization",
        name: "Hurain Payment Solutions",
        url: `${siteConfig.url}/services/payment-gateway-integration`,
      },
      {
        "@type": "Organization",
        name: "Hurain Cloud Services",
        url: `${siteConfig.url}/services/cloud-application-modernization`,
      },
    ],

    // Social & Links
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.instagram,
      siteConfig.social.googleBusiness,
    ],

    // Business Details
    priceRange: "$$$",
    priceCurrency: "USD",

    // Credentials
    award: [
      "Best Blockchain Development Company 2024",
      "Top Fintech Solution Provider 2023",
      "Innovation Excellence Award 2023",
      "Enterprise Technology Leader 2023",
    ],

    certification: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "ISO 27001 Certified",
        credentialCategory: "Information Security",
        credentialUrl: "https://example.com/iso27001",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified",
        credentialCategory: "Cloud Infrastructure",
        credentialUrl: "https://example.com/aws",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Google Cloud Certified",
        credentialCategory: "Cloud Solutions",
        credentialUrl: "https://example.com/gcp",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Kubernetes Certified",
        credentialCategory: "Container Orchestration",
      },
    ],

    // Business Hours
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
        name: "Support Hours",
      },
    ],

    // Membership & Affiliations
    memberOf: {
      "@type": "ProgramMembership",
      name: "Trusted Partners Network",
      url: siteConfig.url,
    },

    // Actions
    potentialAction: [
      {
        "@type": "CommunicateAction",
        name: "Get Free Consultation",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/contact`,
          actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
        },
      },
      {
        "@type": "ScheduleAction",
        name: "Schedule a Call",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/contact`,
        },
      },
      {
        "@type": "TradeAction",
        name: "Request a Quote",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/contact`,
        },
      },
    ],
  };
}

/**
 * ULTRA-STRONG Solution Service Schema
 * Maximum fields for country/city level solutions
 */
export function ultraStrongSolutionJsonLd(
  solutionName: string,
  countryName: string,
  cityName?: string
) {
  const keywords = cityName
    ? buildSolutionCityPageKeywords(solutionName, cityName, countryName)
    : buildSolutionPageKeywords(solutionName, countryName);

  const location = cityName ? `${cityName}, ${countryName}` : countryName;

  return {
    "@context": "https://schema.org",
    // "Service" only — LocalBusiness/ProfessionalService are LocalBusiness
    // subtypes that Google expects a real postal `address` for, which a
    // per-country/city service listing doesn't have. Declaring those types
    // without one flags "missing field 'address'" across every solution
    // page (~1200 pages) in the Local Business structured data report.
    "@type": "Service",
    "@id": `${siteConfig.url}/solutions#service-${solutionName}-${location}`,

    // Identity
    name: `${solutionName} in ${location}`,
    alternateName: [
      `Professional ${solutionName} Services for ${location} Businesses`,
      `${solutionName} Development ${location}`,
      `Local ${solutionName} Expert ${location}`,
    ],

    // Description
    description: `Expert ${solutionName} development services in ${location}. Professional team with 16+ years experience, 2000+ projects delivered. Local expertise with global standards.`,

    // Keywords
    keywords: keywords,

    // Type
    serviceType: solutionName,
    category: "Professional Services",

    // Availability
    availableDeliveryMethod: ["OnlineOnly", "OfflineOnly", "OnSite"],
    areaServed: {
      "@type": "Place",
      name: location,
    },

    // Pricing
    priceRange: "$$$",
    priceCurrency: "USD",

    // Service Details
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    provider: { "@id": `${siteConfig.url}/#organization` },

    // Offers
    offers: [
      {
        "@type": "Offer",
        name: "Custom Development",
        description: "Tailored solutions for your specific needs",
        url: `${siteConfig.url}`,
        priceCurrency: "USD",
        priceRange: "$15000+",
        availability: "InStock",
      },
      {
        "@type": "Offer",
        name: "MVP Development",
        description: "Rapid MVP development for market entry",
        priceCurrency: "USD",
        priceRange: "$15000+",
        availability: "InStock",
      },
      {
        "@type": "Offer",
        name: "Enterprise Solutions",
        description: "Scalable enterprise-grade solutions",
        priceCurrency: "USD",
        priceRange: "$50000+",
        availability: "InStock",
      },
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${solutionName} Services`,
      itemListElement: [
        {
          "@type": "Offer",
          name: "MVP Development",
          description: "Rapid MVP development for market entry",
          price: "15000",
          priceCurrency: "USD",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          name: "Custom Development",
          description: "Full-stack custom solutions",
          price: "Contact",
          priceCurrency: "USD",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          name: "System Modernization",
          description: "Legacy system modernization",
          price: "Contact",
          priceCurrency: "USD",
          availability: "InStock",
        },
      ],
    },

    // Hours
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
      description: "24/7 Support Available",
    },

    // Languages
    availableLanguage: ["English", "Hindi"],

    // Contact
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Local Support",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: location,
      availableLanguage: ["English"],
    },

    // Actions
    potentialAction: [
      {
        "@type": "CommunicateAction",
        name: "Get Free Estimate",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/contact`,
          actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
        },
      },
      {
        "@type": "ViewAction",
        name: "View Services",
        target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}` },
      },
    ],
  };
}
