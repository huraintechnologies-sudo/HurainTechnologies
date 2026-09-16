export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ContentBlock {
  title: string;
  description: string;
}

export interface ServiceContent {
  slug: string;
  name: string;
  navLabel: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  painPoints: ContentBlock[];
  solutions: ContentBlock[];
  techStack: { group: string; items: string[] }[];
  complianceNote: string;
  proof: string;
  process: ProcessStep[];
  faqs: FaqItem[];
  relatedSlugs: string[];
  icon: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  serviceSlugs: string[];
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  metaDescription: string;
  // Optional deep-dive content rendered as additional sub-sections on the case study page.
  background?: string;
  challengeDetail?: { heading: string; paragraphs: string[] }[];
  solutionDetail?: { heading: string; paragraphs: string[] }[];
  outcomeDetail?: { heading: string; paragraphs: string[] }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingTime: string;
  metaDescription: string;
  keywords: string[];
  body: { heading: string; paragraphs: string[] }[];
  relatedServiceSlugs: string[];
}

export interface CountryPage {
  slug: string;
  countryName: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  regulatoryNotes: string[];
  focusServiceSlugs: string[];
  faqs: FaqItem[];
  // SEO Expansion Fields
  detailedAnalysis?: { heading: string; paragraphs: string[] }[];
  marketDrivers?: string[];
}

export interface IndustryContent {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  needs: string[];
  relatedServiceSlugs: string[];
  painPoints?: ContentBlock[];
  approach?: ContentBlock[];
  faqs?: FaqItem[];
  metaDescription?: string;
}

export interface CityContent {
  slug: string;
  cityName: string;
  countrySlug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  hubFacts: string[];
  focusServiceSlugs: string[];
  faqs: FaqItem[];
  // SEO Expansion Fields
  detailedAnalysis?: { heading: string; paragraphs: string[] }[];
  marketDrivers?: string[];
}
