// Comprehensive Keyword Builder for JSON-LD Schemas
// Builds maximum keyword coverage for SEO

import { serviceVerticals } from "@/data/service-verticals";
import { industries } from "@/data/industries";
import { services } from "@/data/services";

// Base keywords that apply to all pages
const BASE_KEYWORDS = [
  "software development",
  "development company",
  "professional services",
  "technology solutions",
  "digital transformation",
  "enterprise solutions",
  "custom development",
  "consulting",
  "technical expertise",
  "agile development",
  "project delivery",
  "software engineering",
];

// Industry keywords
const INDUSTRY_KEYWORDS = {
  fintech: [
    "fintech",
    "financial technology",
    "payment processing",
    "digital banking",
    "financial services",
    "compliance",
    "security",
  ],
  blockchain: [
    "blockchain",
    "cryptocurrency",
    "smart contracts",
    "web3",
    "defi",
    "crypto",
  ],
  ecommerce: [
    "e-commerce",
    "online store",
    "shopping platform",
    "marketplace",
    "retail",
    "payments",
  ],
  saas: [
    "saas",
    "cloud software",
    "subscription",
    "platform as a service",
    "cloud solutions",
  ],
  healthcare: [
    "healthcare",
    "medical",
    "patient management",
    "telemedicine",
    "clinical",
  ],
  logistics: [
    "logistics",
    "supply chain",
    "transportation",
    "fleet management",
    "tracking",
  ],
};

// Service keywords from service data
export function getServiceKeywords(serviceName: string): string[] {
  const service = services.find(
    (s) => s.name.toLowerCase() === serviceName.toLowerCase()
  );
  if (service && service.keywords) {
    return service.keywords;
  }
  return [serviceName.toLowerCase()];
}

// Solution keywords from solution data
export function getSolutionKeywords(solutionName: string): string[] {
  const solution = serviceVerticals.find(
    (v) => v.name.toLowerCase() === solutionName.toLowerCase()
  );
  if (solution && solution.keywords) {
    return solution.keywords;
  }
  return [solutionName.toLowerCase()];
}

// Industry keywords
export function getIndustryKeywords(industryName: string): string[] {
  const industry = industries.find(
    (i) => i.name.toLowerCase() === industryName.toLowerCase()
  );
  if (industry && industry.keywords) {
    return industry.keywords;
  }

  // Map to known industry keywords
  const lowerName = industryName.toLowerCase();
  for (const [key, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (lowerName.includes(key)) {
      return keywords;
    }
  }

  return [industryName.toLowerCase()];
}

// Country-specific keywords
export function getCountryKeywords(countryName: string): string[] {
  return [
    countryName.toLowerCase(),
    `${countryName} software development`,
    `${countryName} developers`,
    `${countryName} technology`,
    `${countryName} services`,
    `${countryName} business`,
  ];
}

// City-specific keywords
export function getCityKeywords(cityName: string, countryName: string): string[] {
  return [
    cityName.toLowerCase(),
    `${cityName} development`,
    `${cityName} developers`,
    `${cityName} technology`,
    `${cityName}, ${countryName}`,
    `${cityName} services`,
  ];
}

// Build complete keyword set for Service page
export function buildServicePageKeywords(serviceName: string): string {
  const serviceKeywords = getServiceKeywords(serviceName);
  const allKeywords = [
    ...BASE_KEYWORDS,
    ...serviceKeywords,
    serviceName,
    `${serviceName} development`,
    `${serviceName} services`,
    `professional ${serviceName.toLowerCase()}`,
  ];
  return Array.from(new Set(allKeywords)).join(", ");
}

// Build complete keyword set for Solution page
export function buildSolutionPageKeywords(
  solutionName: string,
  countryName: string
): string {
  const solutionKeywords = getSolutionKeywords(solutionName);
  const countryKeywords = getCountryKeywords(countryName);
  const allKeywords = [
    ...BASE_KEYWORDS,
    ...solutionKeywords,
    ...countryKeywords,
    `${solutionName} ${countryName}`,
    `${solutionName} in ${countryName}`,
    `${solutionName} for ${countryName} businesses`,
  ];
  return Array.from(new Set(allKeywords)).join(", ");
}

// Build complete keyword set for Solution City page
export function buildSolutionCityPageKeywords(
  solutionName: string,
  cityName: string,
  countryName: string
): string {
  const solutionKeywords = getSolutionKeywords(solutionName);
  const cityKeywords = getCityKeywords(cityName, countryName);
  const allKeywords = [
    ...BASE_KEYWORDS,
    ...solutionKeywords,
    ...cityKeywords,
    `${solutionName} ${cityName}`,
    `${solutionName} in ${cityName}`,
    `local ${solutionName.toLowerCase()} ${cityName}`,
  ];
  return Array.from(new Set(allKeywords)).join(", ");
}

// Build complete keyword set for Industry page
export function buildIndustryPageKeywords(industryName: string): string {
  const industryKeywords = getIndustryKeywords(industryName);
  const allKeywords = [
    ...BASE_KEYWORDS,
    ...industryKeywords,
    industryName,
    `${industryName} development`,
    `${industryName} solutions`,
    `${industryName} technology`,
  ];
  return Array.from(new Set(allKeywords)).join(", ");
}

// Build complete keyword set for Blog post
export function buildBlogPostKeywords(
  title: string,
  postKeywords?: string[]
): string {
  const allKeywords = [
    ...BASE_KEYWORDS,
    ...(postKeywords || []),
    title.toLowerCase(),
    "blog",
    "article",
    "guide",
  ];
  return Array.from(new Set(allKeywords)).join(", ");
}

// Build complete keyword set for Case Study
export function buildCaseStudyKeywords(
  title: string,
  industry?: string,
  technology?: string
): string {
  const industryKeywords = industry ? getIndustryKeywords(industry) : [];
  const allKeywords = [
    ...BASE_KEYWORDS,
    ...industryKeywords,
    title.toLowerCase(),
    "case study",
    "success story",
    "project",
    ...(technology ? [technology.toLowerCase()] : []),
  ];
  return Array.from(new Set(allKeywords)).join(", ");
}
