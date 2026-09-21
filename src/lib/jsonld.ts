import { siteConfig } from "@/lib/site-config";
import { countries } from "@/data/countries";
import { FaqItem, ServiceContent, BlogPost, CaseStudy } from "@/lib/types";

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

const knowsAbout = [
  "Blockchain Development",
  "Cryptocurrency Exchange Development",
  "Smart Contract Development",
  "DeFi Protocol Engineering",
  "Crypto Wallet & Custody Infrastructure",
  "Payment Gateway Integration",
  "PSP Integration",
  "API Integration",
  "Open Banking",
  "Cloud Application Modernization",
  "DevOps & CI/CD",
  "AI Fraud Detection",
  "Transaction Monitoring",
  "Cybersecurity Engineering",
  "AML/KYC Compliance Software",
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.parentGroup,
    url: siteConfig.url,
    logo: logoImage,
    image: ogImage,
    slogan: siteConfig.tagline,
    foundingDate: siteConfig.founded,
    description: siteConfig.description,
    keywords: "blockchain development, cryptocurrency development, fintech, Web3, smart contracts, payment gateway, API development, cloud modernization, AI fraud detection, cybersecurity",
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.locality}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    founder: {
      "@type": "Person",
      name: siteConfig.founderName,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.salesEmail,
        telephone: siteConfig.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.supportEmail,
        telephone: siteConfig.phone,
        areaServed: "Worldwide",
        availableLanguage: ["English"],
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
      siteConfig.social.instagram,
      siteConfig.social.googleBusiness,
    ],
    areaServed: countries.map((c) => ({ "@type": "Country", name: c.countryName })),
    knowsAbout,
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentGroup,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: ogImage,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$$",
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
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

export function itemListJsonLd(name: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function serviceJsonLd(service: ServiceContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.slug}#service`,
    name: service.name,
    description: service.metaDescription,
    url: `${siteConfig.url}/services/${service.slug}`,
    image: ogImage,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: countries.map((c) => ({ "@type": "Country", name: c.countryName })),
    serviceType: service.category,
    category: service.category,
    keywords: service.keywords.join(", "),
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/services/${service.slug}`,
      priceCurrency: "USD",
      priceRange: "$$$",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Fintechs, banks, payment providers, and Web3 businesses",
    },
  };
}

// Enhanced location-specific service schema with keywords
export function serviceLocationJsonLd(service: ServiceContent, country: { countryName: string; slug: string; regulatoryNotes: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/services/${service.slug}/${country.slug}#localbusiness`,
    name: `${service.name} in ${country.countryName}`,
    description: `${service.metaDescription} ${country.regulatoryNotes[0]}`,
    url: `${siteConfig.url}/services/${service.slug}/${country.slug}`,
    image: ogImage,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: country.countryName },
    serviceType: service.category,
    keywords: [...service.keywords, `${service.name.toLowerCase()} in ${country.countryName.toLowerCase()}`, country.countryName].join(", "),
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/services/${service.slug}/${country.slug}`,
      priceCurrency: "USD",
      priceRange: "$$$",
      availability: "InStock",
    },
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${siteConfig.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.metaDescription,
    image: ogImage,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: post.author,
      url: siteConfig.url,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };
}

export function caseStudyJsonLd(caseStudy: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteConfig.url}/case-studies/${caseStudy.slug}#article`,
    headline: caseStudy.title,
    description: caseStudy.metaDescription,
    image: ogImage,
    articleSection: caseStudy.industry,
    about: { "@type": "Thing", name: caseStudy.industry },
    keywords: caseStudy.keywords?.join(", "),
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/case-studies/${caseStudy.slug}`,
    },
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };
}

// Enhanced solution schema with keywords
export function solutionJsonLd(solution: { name: string; slug: string; keywords: string[]; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/solutions/${solution.slug}#service`,
    name: solution.name,
    description: solution.description,
    url: `${siteConfig.url}/solutions/${solution.slug}`,
    image: ogImage,
    provider: { "@id": `${siteConfig.url}/#organization` },
    keywords: solution.keywords.join(", "),
    areaServed: countries.map((c) => ({ "@type": "Country", name: c.countryName })),
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/solutions/${solution.slug}`,
      priceCurrency: "USD",
      priceRange: "$$$",
    },
  };
}

// Location-specific solution schema for country pages
export function solutionLocationJsonLd(solution: { name: string; slug: string; keywords: string[] }, country: { countryName: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/solutions/${solution.slug}/${country.slug}#localbusiness`,
    name: `${solution.name} in ${country.countryName}`,
    url: `${siteConfig.url}/solutions/${solution.slug}/${country.slug}`,
    image: ogImage,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: country.countryName },
    keywords: [...solution.keywords, `${solution.name.toLowerCase()} in ${country.countryName.toLowerCase()}`, country.countryName].join(", "),
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/solutions/${solution.slug}/${country.slug}`,
      priceCurrency: "USD",
      priceRange: "$$$",
    },
  };
}

// Enhanced industry schema with keywords
export function industryJsonLd(industry: { name: string; slug: string; keywords?: string[]; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/industries/${industry.slug}#service`,
    name: `${industry.name} Software Development`,
    description: industry.description,
    url: `${siteConfig.url}/industries/${industry.slug}`,
    image: ogImage,
    provider: { "@id": `${siteConfig.url}/#organization` },
    keywords: (industry.keywords || [industry.name]).join(", "),
    areaServed: countries.map((c) => ({ "@type": "Country", name: c.countryName })),
  };
}
