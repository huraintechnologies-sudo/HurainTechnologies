export interface LiveDemo {
  name: string;
  url: string;
  category: string;
  description: string;
}

export const liveDemos: LiveDemo[] = [
  {
    name: "Nexa",
    url: "https://nexa-demo-jade.vercel.app/",
    category: "Fintech",
    description: "SaaS-style product dashboard and workflow UI for a fintech platform.",
  },
  {
    name: "AML Compliance Suite",
    url: "https://aml-compliance-suite.vercel.app/",
    category: "Compliance",
    description: "Anti-money-laundering compliance and case-monitoring suite.",
  },
  {
    name: "Debt Management",
    url: "https://debtmanagement-two.vercel.app/",
    category: "Fintech",
    description: "Debt management and collections tracking platform.",
  },
  {
    name: "UMARSOB Data",
    url: "https://umarsob.vercel.app/",
    category: "Payments",
    description: "Android VTU/data-reseller platform with wallet, agent/referral system, and admin panel.",
  },
  {
    name: "Hospital Management",
    url: "https://hospitalmangement-bay.vercel.app/",
    category: "Healthcare",
    description: "Hospital/clinic management system covering patient records, appointments, staff, and billing.",
  },
  {
    name: "DMI CHW App",
    url: "https://dmi-chw-app.vercel.app/",
    category: "Healthcare",
    description: "Offline-first Community Health Worker counseling app with a central management platform, built for an NGO client.",
  },
  {
    name: "Homemakers Pro",
    url: "https://homemakers-seven.vercel.app/",
    category: "Operations",
    description: "Enterprise operations system for a domestic staffing agency covering bookings, staff, and client management.",
  },
  {
    name: "E-Commerce (Multi-Locale)",
    url: "https://e-commerce-mu-one-39.vercel.app/nl-NL",
    category: "E-Commerce",
    description: "E-commerce storefront demo with multi-language, locale-based support.",
  },
  {
    name: "Mars",
    url: "https://mars-js.vercel.app/",
    category: "Legal",
    description: "Legal web application prototype.",
  },
];
