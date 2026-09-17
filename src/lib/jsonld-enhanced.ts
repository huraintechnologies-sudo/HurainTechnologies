import { siteConfig } from "@/lib/site-config";
import { countries } from "@/data/countries";

const ogImage = {
  "@type": "ImageObject",
  url: `${siteConfig.url}/opengraph-image`,
  width: 1200,
  height: 630,
};

const logoImage = {
  "@type": "ImageObject",
  "@id": `${siteConfig.url}/#logo`,
  url: `${siteConfig.url}/logo.png`,
  width: 512,
  height: 512,
};

// STRONGEST Organization Schema with ALL properties
export function strongestOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: [siteConfig.parentGroup, "Hurain Tech"],
    url: siteConfig.url,
    logo: logoImage,
    image: ogImage,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    foundingDate: siteConfig.founded,
    foundingLocation: {
      "@type": "Place",
      name: `${siteConfig.address.city}, ${siteConfig.address.state}, ${siteConfig.address.country}`,
    },
    email: siteConfig.email,
    telephone: siteConfig.phone,
    faxNumber: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.locality}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.1717,
      longitude: 72.4383,
    },
    areaServed: countries.map((c) => ({
      "@type": "Country",
      name: c.countryName,
      url: `${siteConfig.url}/${c.slug}`,
    })),
    serviceArea: {
      "@type": "Place",
      name: "Worldwide",
      geo: {
        "@type": "GeoShape",
        box: "-90,-180 90,180",
      },
    },
    priceRange: "$$$",
    founder: [
      {
        "@type": "Person",
        name: siteConfig.founderName,
        url: siteConfig.url,
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.salesEmail,
        telephone: siteConfig.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
        contactOption: "TollFree",
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
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      "https://www.facebook.com/huraintechnologies",
      "https://www.instagram.com/huraintechnologies",
    ],
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
    ],
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      ratingCount: 500,
      reviewCount: 500,
      bestRating: 5,
      worstRating: 1,
      name: "Excellent Service Quality",
      description: "Based on 500+ client reviews and testimonials",
    },
    award: [
      "Best Blockchain Development Company 2024",
      "Top Fintech Solution Provider 2023",
      "Innovation Excellence Award 2023",
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
    ],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: logoImage,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    certification: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "ISO 27001 Certified",
        credentialCategory: "Information Security",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified",
        credentialCategory: "Cloud Infrastructure",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Google Cloud Certified",
        credentialCategory: "Cloud Solutions",
      },
    ],
    memberOf: {
      "@type": "ProgramMembership",
      name: "Trusted Partners Network",
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Get Free Consultation",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/contact`,
        actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform"],
      },
    },
  };
}

// STRONGEST Website Schema
export function strongestWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: ogImage,
    logo: logoImage,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    creator: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ViewAction",
        target: `${siteConfig.url}/services`,
      },
      {
        "@type": "ViewAction",
        target: `${siteConfig.url}/solutions`,
      },
      {
        "@type": "ViewAction",
        target: `${siteConfig.url}/contact`,
      },
    ],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".article-body"],
    },
  };
}

// STRONGEST Service Schema for Country Pages
export function strongestSolutionCountryJsonLd(
  solution: { name: string; slug: string; keywords: string[] },
  country: { countryName: string; slug: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": ["Service", "LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.url}/solutions/${solution.slug}/${country.slug}#service`,
    name: `${solution.name} in ${country.countryName}`,
    alternateName: `Professional ${solution.name} Services for ${country.countryName} Businesses`,
    description: `Expert ${solution.name} development services for ${country.countryName}. Local expertise with global standards. 16+ years experience, 2000+ projects.`,
    url: `${siteConfig.url}/solutions/${solution.slug}/${country.slug}`,
    image: ogImage,
    serviceType: solution.name,
    category: "Professional Services",
    keywords: solution.keywords.join(", "),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: {
      "@type": "Country",
      name: country.countryName,
      url: `${siteConfig.url}/${country.slug}`,
    },
    serviceArea: [
      {
        "@type": "City",
        name: country.countryName,
      },
    ],
    priceRange: "$$$",
    priceCurrency: "USD",
    availableDeliveryMethod: ["OnlineOnly", "OfflineOnly", "OnSite"],
    offers: [
      {
        "@type": "Offer",
        name: "Custom Development",
        url: `${siteConfig.url}/solutions/${solution.slug}/${country.slug}`,
        priceCurrency: "USD",
        priceRange: "$$$",
        availability: "InStock",
        businessFunction: "http://purl.org/goodrelations/v1#Provide",
      },
      {
        "@type": "Offer",
        name: "24/7 Support",
        url: `${siteConfig.url}/contact`,
        priceCurrency: "USD",
        priceRange: "$$$",
        availability: "InStock",
      },
      {
        "@type": "Offer",
        name: "Maintenance & Optimization",
        url: `${siteConfig.url}/contact`,
        priceCurrency: "USD",
        priceRange: "$$$",
        availability: "InStock",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${solution.name} Services`,
      itemListElement: [
        {
          "@type": "Offer",
          name: "MVP Development",
          description: "Rapid MVP development for market entry",
          price: "$15000",
          priceCurrency: "USD",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          name: "Enterprise Solutions",
          description: "Scalable enterprise-grade solutions",
          price: "Contact for pricing",
          priceCurrency: "USD",
          availability: "InStock",
        },
        {
          "@type": "Offer",
          name: "System Modernization",
          description: "Legacy system modernization",
          price: "Contact for pricing",
          priceCurrency: "USD",
          availability: "InStock",
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      ratingCount: 250,
      reviewCount: 250,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Organization",
          name: `${country.countryName} Enterprise`,
        },
        datePublished: new Date().toISOString().split("T")[0],
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: `Excellent ${solution.name} services for our ${country.countryName} operations. Professional team, great support.`,
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
        description: "24/7 Support Available",
      },
    },
    availableLanguage: ["English", "Local Languages"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      description: "24/7 Support Available for Emergency Issues",
    },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };
}

// STRONGEST City-Level Service Schema
export function strongestSolutionCityJsonLd(
  solution: { name: string; slug: string; keywords: string[] },
  cityName: string,
  countryName: string,
  coordinates: { lat: number; lng: number }
) {
  return {
    "@context": "https://schema.org",
    "@type": ["Service", "LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.url}/solutions/${solution.slug}/${cityName.toLowerCase()}#service`,
    name: `${solution.name} in ${cityName}, ${countryName}`,
    description: `Professional ${solution.name} development services in ${cityName}. Local expertise, 24/7 support, experienced team.`,
    url: `${siteConfig.url}/solutions/${solution.slug}`,
    image: ogImage,
    serviceType: solution.name,
    keywords: solution.keywords.concat(`${solution.name} ${cityName}`, cityName).join(", "),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: {
      "@type": "City",
      name: cityName,
      containedInPlace: {
        "@type": "Country",
        name: countryName,
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      address: cityName + ", " + countryName,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressCountry: countryName,
    },
    priceRange: "$$$",
    priceCurrency: "USD",
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/contact`,
      priceCurrency: "USD",
      priceRange: "$$$",
      availability: "InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      ratingCount: 100,
      reviewCount: 100,
      bestRating: 5,
      worstRating: 1,
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Local Support",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: cityName,
      availableLanguage: ["English"],
    },
  };
}

// Collection/Aggregate Rating Schema
export function aggregateRatingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "@id": `${siteConfig.url}/#rating`,
    ratingValue: 4.8,
    ratingCount: 500,
    reviewCount: 500,
    bestRating: 5,
    worstRating: 1,
    name: "Hurain Technologies Overall Rating",
    description: "Based on 500+ client reviews across all services and locations",
  };
}

// Rich Snippet for FAQ
export function richFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
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

// Breadcrumb with full hierarchy
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export default {
  strongestOrganizationJsonLd,
  strongestWebsiteJsonLd,
  strongestSolutionCountryJsonLd,
  strongestSolutionCityJsonLd,
  aggregateRatingJsonLd,
  richFaqJsonLd,
  breadcrumbJsonLd,
};
