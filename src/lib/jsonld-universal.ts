// Universal JSON-LD Schemas for ALL pages
// Every page should use these + their specific schemas

import { siteConfig } from "@/lib/site-config";
import { strongestOrganizationJsonLd, strongestWebsiteJsonLd } from "@/lib/jsonld-enhanced";

/**
 * Base schemas that should appear on EVERY page
 * Returns: [Organization, WebSite]
 */
export function getBaseSchemas() {
  return [
    strongestOrganizationJsonLd(),
    strongestWebsiteJsonLd(),
  ];
}

/**
 * Complete schema set for any page
 * Usage: <JsonLd data={getCompletePageSchemas(specificSchemas, breadcrumbs)} />
 */
export function getCompletePageSchemas(
  pageSpecificSchemas: any[] = [],
  breadcrumbSchema: any = null
) {
  const schemas: any[] = [
    ...getBaseSchemas(),
    ...pageSpecificSchemas,
  ];

  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }

  return schemas;
}

/**
 * Quick schemas for simple pages (blog, case studies, etc)
 * Just add Organization + Website + specific schema
 */
export function getPageSchemas(specificSchema: any) {
  return getBaseSchemas().concat(specificSchema);
}

/**
 * Service Page Schemas
 */
export function getServicePageSchemas(serviceSchema: any, faqSchema: any = null) {
  const schemas = getBaseSchemas().concat([serviceSchema]);
  if (faqSchema) schemas.push(faqSchema);
  return schemas;
}

/**
 * Solution Page Schemas
 */
export function getSolutionPageSchemas(
  solutionSchema: any,
  breadcrumbSchema: any,
  faqSchema: any = null
) {
  const schemas = getBaseSchemas().concat([
    solutionSchema,
    breadcrumbSchema,
  ]);
  if (faqSchema) schemas.push(faqSchema);
  return schemas;
}

/**
 * Industry Page Schemas
 */
export function getIndustryPageSchemas(
  industrySchema: any,
  breadcrumbSchema: any,
  faqSchema: any = null
) {
  const schemas = getBaseSchemas().concat([
    industrySchema,
    breadcrumbSchema,
  ]);
  if (faqSchema) schemas.push(faqSchema);
  return schemas;
}

/**
 * Blog Post Schemas
 */
export function getBlogPostSchemas(
  blogPostSchema: any,
  breadcrumbSchema: any = null
) {
  const schemas = getBaseSchemas().concat([blogPostSchema]);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);
  return schemas;
}

/**
 * Case Study Schemas
 */
export function getCaseStudySchemas(
  caseStudySchema: any,
  breadcrumbSchema: any = null
) {
  const schemas = getBaseSchemas().concat([caseStudySchema]);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);
  return schemas;
}

/**
 * Country/City Page Schemas
 */
export function getCountryPageSchemas(
  countryServiceSchema: any,
  breadcrumbSchema: any
) {
  return getBaseSchemas().concat([
    countryServiceSchema,
    breadcrumbSchema,
  ]);
}

export function getCityPageSchemas(
  cityServiceSchema: any,
  breadcrumbSchema: any
) {
  return getBaseSchemas().concat([
    cityServiceSchema,
    breadcrumbSchema,
  ]);
}
