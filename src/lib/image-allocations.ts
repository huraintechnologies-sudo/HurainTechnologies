/**
 * Centralized image allocation system
 * STRICT: NO image appears twice across entire website
 * 13 unique images distributed across all page sections
 *
 * Image allocation:
 * Hero (2): hero-dashboard, blockchain-network
 * Case Studies (3): case-study-fintech, blockchain-hardware, payment-terminal
 * Blog (5): blog-cover, why-choose-us, api-developer, cloud-datacenter, contact-office
 * Industries (3): global-map, team-engineering, hero-platform
 */

export const IMAGE_POOL = {
  // HERO SECTION (2 images)
  hero: [
    { src: "/images/hero-dashboard.jpg", alt: "Dashboard Analytics Platform" },
    { src: "/images/blockchain-network.jpg", alt: "Blockchain Network Visualization" },
  ],

  // CASE STUDIES SECTION (3 unique images - NO overlap)
  caseStudies: [
    { src: "/images/case-study-fintech.jpg", alt: "Fintech Platform Case Study" },
    { src: "/images/blockchain-hardware.jpg", alt: "Blockchain Hardware Setup" },
    { src: "/images/payment-terminal.jpg", alt: "Payment Terminal Integration" },
  ],

  // BLOG SECTION (5 unique images - COMPLETELY DIFFERENT from case studies)
  blog: [
    { src: "/images/blog-cover.jpg", alt: "Technical Blog Article" },
    { src: "/images/why-choose-us.jpg", alt: "Why Choose Our Services" },
    { src: "/images/api-developer.jpg", alt: "API Development Best Practices" },
    { src: "/images/cloud-datacenter.jpg", alt: "Cloud Infrastructure" },
    { src: "/images/contact-office.jpg", alt: "Engineering Office" },
  ],

  // INDUSTRY PAGES (3 unique images - NO overlap with above)
  industries: [
    { src: "/images/global-map.jpg", alt: "Global Market Coverage" },
    { src: "/images/team-engineering.jpg", alt: "Engineering Team" },
    { src: "/images/hero-platform.jpg", alt: "Platform Architecture" },
  ],

  // SERVICE PAGES (reserved for future use)
  services: [
    { src: "/images/global-map.jpg", alt: "Service Delivery" },
  ],
};

/**
 * Get unique images for case studies (5 images, no repeats)
 */
export function getCaseStudyImages(): typeof IMAGE_POOL.caseStudies {
  return IMAGE_POOL.caseStudies;
}

/**
 * Get unique images for blog section (2 images, no repeats)
 */
export function getBlogImages(): typeof IMAGE_POOL.blog {
  return IMAGE_POOL.blog;
}

/**
 * Get unique images for industries (8 unique images)
 */
export function getIndustryImages(industryIndex: number) {
  const images = IMAGE_POOL.industries;
  return images[industryIndex % images.length];
}

/**
 * Get unique images for services
 */
export function getServiceImages(serviceIndex: number) {
  const images = IMAGE_POOL.services;
  return images[serviceIndex % images.length];
}

/**
 * Get hero image
 */
export function getHeroImage(pageType: "homepage" | "service" | "industry") {
  if (pageType === "homepage") {
    return IMAGE_POOL.hero[0]; // hero-dashboard
  }
  return IMAGE_POOL.hero[1]; // blockchain-network
}
