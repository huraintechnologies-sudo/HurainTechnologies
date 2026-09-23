export const siteConfig = {
  name: "Hurain Technologies",
  legalName: "Hurain Technologies, a division of Hurain Engitech & Trade",
  shortName: "Hurain Technologies",
  parentGroup: "Hurain Engitech & Trade",
  // NOTE: huraintechnologies.com is being purchased (in progress as of this
  // change) and must be connected to this Vercel project (Project Settings ->
  // Domains) before deploying, or every sitemap/canonical/JSON-LD URL will
  // point at a domain that doesn't resolve yet. If it's not connected yet,
  // temporarily use https://hurain-technologies.vercel.app instead.
  url: "https://www.huraintechnologies.com",
  description:
    "Hurain Technologies builds secure, scalable blockchain, payments, API, cloud, and AI platforms for regulated digital businesses worldwide.",
  tagline:
    "Blockchain, Payments, API & Cloud Engineering Partner for Global Digital Businesses",
  founded: "2010",
  founderName: "Shahnavaz Syed",
  founder: {
    // Shown on /about and emitted as the Person behind the organization.
    title: "Founder, Hurain Engitech & Trade and Hurain Technologies",
    linkedin: "https://www.linkedin.com/in/saiyed-shahnavaz-3b9a93a6/",
    // Drop a square photo at public/images/founder.jpg to show it on /about.
    photo: "/images/founder.jpg",
    yearsExperience: "11+",
    productsBuilt: "15+",
    customProjects: "100+",
  },
  email: "huraintechnologies@gmail.com",
  salesEmail: "huraintechnologies+sales@gmail.com",
  supportEmail: "huraintechnologies+support@gmail.com",
  phone: "+91 7600907288",
  phoneDisplay: "+91 76009 07288",
  whatsapp: "https://wa.me/917600907288",
  whatsappNumber: "7600907288",
  address: {
    street: "Mahmadipura Vorvas, Kamalpura Road",
    locality: "Bilipatra",
    city: "Palanpur",
    district: "Banaskantha",
    state: "Gujarat",
    country: "India",
    postalCode: "385001",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/hurain-technologies",
    twitter: "https://x.com/huraintech",
    instagram: "https://www.instagram.com/hurr.3613677/",
    googleBusiness: "https://share.google/nvKu1XrKSVthDGn4W",
  },
  // Embeddable Google Maps iframe src for the contact page — uses the
  // business address as a text query, no API key required.
  mapEmbedUrl:
    "https://www.google.com/maps?q=Hurain+Technologies,+Mahmadipura+Vorvas,+Kamalpura+Road,+Palanpur,+Gujarat+385001&output=embed",
  calendly: "https://calendly.com/hurain-technologies/discovery-call",
} as const;

export const TRUST_STATS = [
  { value: "16+", label: "Years of Engineering Experience" },
  { value: "2000+", label: "Global Clients Served" },
  { value: "50+", label: "In-House Specialists" },
  { value: "2000+", label: "Projects Delivered" },
  { value: "300+", label: "Startup Builds Supported" },
  { value: "98%", label: "Client Retention Rate" },
] as const;

export const WHY_CHOOSE_US = {
  eyebrow: "Why Choose Hurain Technologies",
  title: "A technology partnership that feels structured, fast, and dependable",
  description:
    "We help regulated digital businesses move from scattered tools and manual processes to stable, secure platforms that are easier to manage, scale, and improve over time. Our approach blends domain understanding, disciplined execution, and long-term support.",
  points: [
    "Custom engineering aligned to your workflows, approval cycles, and regulatory reporting needs.",
    "A clear delivery process with strong communication from discovery through launch.",
    "Architecture designed for future growth, integrations, automation, and security.",
  ],
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Blockchain & Crypto", href: "/services/blockchain-cryptocurrency-development" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
] as const;
