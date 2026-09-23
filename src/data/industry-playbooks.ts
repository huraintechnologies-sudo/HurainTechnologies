// Industry pages use the same template as solution pages
// (SolutionLocationPage). This file supplies what industries.ts doesn't have —
// use cases, delivery phases, timelines, cost drivers, tech stack, compliance
// and keywords — and merges it with the existing industry copy (summary,
// needs, approach, FAQs) into a SolutionPlaybook.

import { industries } from "@/data/industries";
import { SolutionPlaybook } from "@/data/solution-playbooks";
import { ContentBlock } from "@/lib/types";
import { ServiceVertical } from "@/data/service-verticals";

interface IndustryExtras {
  heroImage: { src: string; alt: string };
  headline: string;
  // Closest solution whose local-market angle applies (payments, regulator, data law…).
  localAngleAs: string;
  useCases: ContentBlock[];
  phases: SolutionPlaybook["phases"];
  mvpWeeks: string;
  fullWeeks: string;
  costDrivers: string[];
  techStack: SolutionPlaybook["techStack"];
  compliance: string[];
  relatedSolutions: string[];
  keywords: string[];
}

const IMG = (src: string, alt: string) => ({ src: `/images/${src}`, alt });

const regulatedPhases = (core: string): SolutionPlaybook["phases"] => [
  { title: "Regulatory & product discovery", weeks: "2–3 weeks", description: "Licence model, partners, compliance obligations and the core user journeys mapped with your team and counsel." },
  { title: "Architecture & threat model", weeks: "2 weeks", description: "Data model, security controls, integrations and hosting/residency decisions agreed before build." },
  { title: "Core build", weeks: "8–12 weeks", description: core },
  { title: "Security & compliance testing", weeks: "2–3 weeks", description: "Penetration testing, reconciliation and audit-trail checks, and evidence packs for auditors or partners." },
  { title: "Controlled launch & 24/7 support", weeks: "Ongoing", description: "Staged rollout, monitoring, incident response and regulator-ready reporting." },
];

const extras: Record<string, IndustryExtras> = {
  "banking-fintech": {
    heroImage: IMG("case-study-fintech.jpg", "Banking and fintech software platform"),
    headline: "Banking & Fintech Software Development — Core, Payments, Lending & Open Banking",
    localAngleAs: "fintech-app",
    useCases: [
      { title: "Digital lending", description: "Loan origination, credit decisioning, disbursement and collections." },
      { title: "Open banking & APIs", description: "Account information, payment initiation and partner API platforms." },
      { title: "Core banking modernisation", description: "Wrap legacy cores with APIs and move channels to modern stacks." },
      { title: "Wealth & investment apps", description: "Portfolio, trading and advisory platforms with compliance controls." },
    ],
    phases: regulatedPhases("Ledger, onboarding (KYC/KYB), payments, back-office controls and reporting built in sprints."),
    mvpWeeks: "12–16 weeks",
    fullWeeks: "6–9 months",
    costDrivers: ["Licence model and partner-bank integrations", "Ledger and product complexity", "KYC/AML vendor integrations", "Core-banking or legacy integrations", "Security certifications (PCI DSS, ISO 27001, SOC 2)", "Data-residency requirements"],
    techStack: [
      { group: "Core", items: ["Java / Kotlin", "Go", "Node.js", "PostgreSQL"] },
      { group: "Integration", items: ["Open Banking APIs", "ISO 20022", "Kafka", "API gateways"] },
      { group: "Security", items: ["HSM / KMS", "Vault", "mTLS", "WAF"] },
      { group: "Channels", items: ["Flutter", "React Native", "Next.js"] },
    ],
    compliance: ["AML/CFT and sanctions screening", "PCI DSS", "Open Banking / PSD2-style API standards", "Data-protection and residency rules"],
    relatedSolutions: ["fintech-app", "ai-ml-development", "cloud-application-modernization"],
    keywords: ["banking software development", "fintech software development company", "core banking modernization", "open banking API development", "digital lending platform"],
  },
  "crypto-web3": {
    heroImage: IMG("blockchain-network.jpg", "Crypto and Web3 blockchain network"),
    headline: "Crypto & Web3 Development — Exchanges, Wallets, Tokens & dApps",
    localAngleAs: "blockchain-web3-development",
    useCases: [
      { title: "Exchanges & brokerages", description: "Spot and OTC trading, custody integration and compliance tooling." },
      { title: "Wallets & custody", description: "Non-custodial, custodial and MPC wallets with policy engines." },
      { title: "Tokenisation", description: "Stablecoins, security tokens and real-world-asset platforms." },
      { title: "Crypto payments", description: "Merchant checkout, payouts and on/off-ramps." },
    ],
    phases: regulatedPhases("Smart contracts, custody integration, trading or payment flows, and admin/compliance back office."),
    mvpWeeks: "12–16 weeks",
    fullWeeks: "5–9 months",
    costDrivers: ["Custody model (MPC, HSM, non-custodial)", "Chains and bridges supported", "Smart-contract audit scope", "Liquidity and exchange integrations", "Travel-rule and AML tooling", "Licensing jurisdiction"],
    techStack: [
      { group: "Chains", items: ["Ethereum & L2s", "Solana", "Bitcoin", "Tron"] },
      { group: "Contracts", items: ["Solidity", "Rust", "Foundry", "OpenZeppelin"] },
      { group: "Custody", items: ["MPC providers", "HSM", "Fireblocks-style policy engines"] },
      { group: "Backend", items: ["Go", "Node.js", "PostgreSQL", "Kafka"] },
    ],
    compliance: ["Virtual-asset licensing (e.g. MiCA, VARA)", "FATF travel rule", "AML/CFT and sanctions screening", "Smart-contract security audits"],
    relatedSolutions: ["blockchain-web3-development", "fintech-app", "saas-development"],
    keywords: ["crypto exchange development", "web3 development company", "crypto wallet development", "tokenization platform development", "blockchain development company"],
  },
  "payments-psps": {
    heroImage: IMG("payment-terminal.jpg", "Payment terminal and PSP infrastructure"),
    headline: "Payments & PSP Software Development — Gateways, Orchestration & Acquiring",
    localAngleAs: "fintech-app",
    useCases: [
      { title: "Payment gateways", description: "Card, wallet and local-rail acceptance with hosted checkout and tokenisation." },
      { title: "Payment orchestration", description: "Smart routing across acquirers to raise approval rates and cut fees." },
      { title: "Merchant platforms", description: "Onboarding, KYB, settlement, payouts and merchant dashboards." },
      { title: "Fraud & risk", description: "Real-time risk scoring, rules and chargeback management." },
    ],
    phases: regulatedPhases("Gateway and routing engine, merchant onboarding, settlement and reconciliation, and dashboards."),
    mvpWeeks: "10–14 weeks",
    fullWeeks: "5–8 months",
    costDrivers: ["Number of acquirers and payment methods", "PCI DSS scope and level", "Settlement and payout complexity", "Merchant onboarding and KYB", "Fraud tooling", "Multi-currency and FX"],
    techStack: [
      { group: "Core", items: ["Java", "Go", "Node.js", "PostgreSQL"] },
      { group: "Payments", items: ["ISO 8583", "3-D Secure", "Network tokenisation", "Local instant rails"] },
      { group: "Security", items: ["HSM", "Tokenisation vaults", "WAF", "SIEM"] },
      { group: "Data", items: ["Kafka", "ClickHouse", "Metabase"] },
    ],
    compliance: ["PCI DSS", "PSD2 / SCA where applicable", "AML/CFT for payment institutions", "Scheme rules (Visa, Mastercard)"],
    relatedSolutions: ["fintech-app", "ecommerce-app", "ai-ml-development"],
    keywords: ["payment gateway development", "PSP software development", "payment orchestration platform", "merchant acquiring software", "payment processing software"],
  },
  "enterprise-saas": {
    heroImage: IMG("cloud-datacenter.jpg", "Enterprise SaaS cloud platform"),
    headline: "Enterprise SaaS & Platform Development — Multi-Tenant, Secure, Scalable",
    localAngleAs: "saas-development",
    useCases: [
      { title: "B2B SaaS products", description: "Multi-tenant platforms with billing, SSO and admin." },
      { title: "Internal platforms", description: "Shared services, portals and workflow engines for large organisations." },
      { title: "Data & analytics platforms", description: "Reporting, dashboards and data products for customers." },
      { title: "Legacy to SaaS", description: "Turning on-premise software into a cloud subscription product." },
    ],
    phases: [
      { title: "Product discovery", weeks: "2 weeks", description: "Buyers, core workflow, pricing model and MVP scope." },
      { title: "Architecture", weeks: "1–2 weeks", description: "Tenancy model, auth/SSO, billing and infrastructure-as-code." },
      { title: "MVP build", weeks: "6–10 weeks", description: "Core workflow, billing, onboarding and admin." },
      { title: "Enterprise readiness", weeks: "4–6 weeks", description: "SSO/SCIM, audit logs, data export, SOC 2 controls." },
      { title: "Scale & support", weeks: "Ongoing", description: "Performance, integrations and 24/7 operations." },
    ],
    mvpWeeks: "10–14 weeks",
    fullWeeks: "5–8 months",
    costDrivers: ["Tenancy and data-isolation model", "Enterprise features (SSO, SCIM, audit)", "Integrations with customer systems", "Compliance targets (SOC 2, ISO 27001)", "Multi-region hosting", "Analytics depth"],
    techStack: [
      { group: "App", items: ["Next.js", "TypeScript", "Node.js / NestJS"] },
      { group: "Data", items: ["PostgreSQL", "Redis", "ClickHouse"] },
      { group: "Identity & billing", items: ["WorkOS / Auth0", "Stripe Billing"] },
      { group: "Infra", items: ["AWS / GCP", "Kubernetes", "Terraform"] },
    ],
    compliance: ["SOC 2 / ISO 27001 controls", "GDPR data-processing agreements", "Tax on digital services"],
    relatedSolutions: ["saas-development", "web-application-development", "cloud-application-modernization"],
    keywords: ["enterprise SaaS development", "SaaS platform development company", "multi-tenant SaaS", "B2B software development", "platform engineering"],
  },
  "healthtech-insurtech": {
    heroImage: IMG("team-engineering.jpg", "HealthTech and InsurTech software team"),
    headline: "HealthTech & InsurTech Software Development — Compliant Patient & Policy Platforms",
    localAngleAs: "healthcare-software",
    useCases: [
      { title: "Telehealth & patient apps", description: "Consultations, records, prescriptions and payments." },
      { title: "Clinic & hospital systems", description: "Scheduling, EHR integration, billing and reporting." },
      { title: "Claims & policy platforms", description: "Quote-to-bind, claims intake and automated adjudication." },
      { title: "Health data integration", description: "HL7/FHIR hubs connecting labs, pharmacies and insurers." },
    ],
    phases: regulatedPhases("Patient or policy workflows, integrations (FHIR, insurers), consent and audit logging."),
    mvpWeeks: "12–16 weeks",
    fullWeeks: "6–10 months",
    costDrivers: ["Modules in scope (telehealth, EHR, claims)", "Integrations with HIS/EHR and insurers", "Compliance scope and data residency", "Video and messaging volume", "Certification requirements", "AI claims automation"],
    techStack: [
      { group: "Standards", items: ["HL7 FHIR", "HL7 v2", "ICD-10", "ACORD"] },
      { group: "Apps", items: ["React", "Flutter", "WebRTC"] },
      { group: "Backend", items: ["Node.js", "Python", "PostgreSQL"] },
      { group: "Security", items: ["Encryption", "RBAC/ABAC", "Audit logging"] },
    ],
    compliance: ["HIPAA / GDPR special-category data", "Insurance regulator rules", "Consent management", "Audit trails and access reviews"],
    relatedSolutions: ["healthcare-software", "ai-ml-development", "mobile-app-development"],
    keywords: ["healthtech software development", "insurtech software development", "telemedicine platform development", "claims management software", "HIPAA compliant software development"],
  },
  "real-estate-proptech": {
    heroImage: IMG("global-map.jpg", "Real estate and PropTech platform"),
    headline: "Real Estate & PropTech Software Development — Portals, CRM & Tokenisation",
    localAngleAs: "real-estate-software",
    useCases: [
      { title: "Property portals", description: "Listings, map search, lead capture and paid listings." },
      { title: "Brokerage CRM", description: "Lead routing, pipelines and agent performance." },
      { title: "Property management", description: "Leases, rent collection, maintenance and owner reporting." },
      { title: "Tokenised real estate", description: "Fractional ownership where local law allows." },
    ],
    phases: [
      { title: "Discovery", weeks: "1–2 weeks", description: "Business model, listing sources, lead flow and integrations." },
      { title: "Design", weeks: "2 weeks", description: "Search, listing, CRM and tenant experiences." },
      { title: "Build", weeks: "6–10 weeks", description: "Portal, CRM, payments and admin." },
      { title: "Data & launch", weeks: "1–2 weeks", description: "Listings imported, SEO set-up and go-live." },
      { title: "Grow & support", weeks: "Ongoing", description: "Analytics, valuations and 24/7 support." },
    ],
    mvpWeeks: "8–12 weeks",
    fullWeeks: "4–7 months",
    costDrivers: ["Portal vs CRM vs property-management scope", "Listing feed integrations", "Map and search sophistication", "Payments and e-signature", "Mobile apps", "Tokenisation compliance"],
    techStack: [
      { group: "Frontend", items: ["Next.js", "Mapbox", "React Native"] },
      { group: "Backend", items: ["Node.js", "PostgreSQL + PostGIS", "Elasticsearch"] },
      { group: "Integrations", items: ["E-signature", "Payment gateways", "WhatsApp"] },
      { group: "Web3", items: ["ERC-3643", "Polygon / Base"] },
    ],
    compliance: ["Real-estate advertising rules", "Tenant data privacy", "Securities rules for tokenised property"],
    relatedSolutions: ["real-estate-software", "blockchain-web3-development", "mobile-app-development"],
    keywords: ["proptech software development", "real estate software development", "property portal development", "real estate tokenization platform", "property management software"],
  },
  "cross-border-remittance": {
    heroImage: IMG("global-map.jpg", "Cross-border remittance network"),
    headline: "Cross-Border Remittance Software Development — Money Transfer Platforms",
    localAngleAs: "fintech-app",
    useCases: [
      { title: "Remittance apps", description: "Send-money apps with FX quotes, KYC and payout tracking." },
      { title: "Payout networks", description: "Bank, mobile-money and cash-pickup payout integrations." },
      { title: "B2B cross-border payments", description: "Supplier and payroll payments across corridors." },
      { title: "Stablecoin rails", description: "Blockchain settlement for faster, cheaper corridors." },
    ],
    phases: regulatedPhases("Sender onboarding, FX quoting, corridor compliance, payout partner integrations and reconciliation."),
    mvpWeeks: "12–16 weeks",
    fullWeeks: "6–9 months",
    costDrivers: ["Number of corridors and payout partners", "Licensing model (own licence vs partner)", "KYC/AML and sanctions tooling", "FX and liquidity management", "Mobile apps", "Stablecoin settlement"],
    techStack: [
      { group: "Core", items: ["Java / Kotlin", "Go", "PostgreSQL"] },
      { group: "Payments", items: ["SWIFT / ISO 20022", "Local instant rails", "Mobile-money APIs"] },
      { group: "Compliance", items: ["KYC vendors", "Sanctions screening", "Transaction monitoring"] },
      { group: "Apps", items: ["Flutter", "React Native"] },
    ],
    compliance: ["Money-transmitter / payment-institution licensing", "AML/CFT and sanctions", "FATF travel rule", "Consumer disclosure rules"],
    relatedSolutions: ["fintech-app", "blockchain-web3-development", "mobile-app-development"],
    keywords: ["remittance software development", "money transfer app development", "cross-border payment platform", "remittance platform", "payout network integration"],
  },
  "digital-banking-neobanks": {
    heroImage: IMG("hero-dashboard.jpg", "Digital banking and neobank app"),
    headline: "Digital Banking & Neobank Development — Accounts, Cards & Mobile Banking",
    localAngleAs: "fintech-app",
    useCases: [
      { title: "Neobank launch", description: "Accounts, cards and payments on a banking-as-a-service partner." },
      { title: "Mobile banking apps", description: "Modern apps for existing banks and credit unions." },
      { title: "SME banking", description: "Business accounts, invoicing, expense and payroll features." },
      { title: "Card programmes", description: "Virtual and physical cards with spending controls." },
    ],
    phases: regulatedPhases("Onboarding, accounts, ledger, cards, payments and customer support tooling."),
    mvpWeeks: "12–16 weeks",
    fullWeeks: "6–9 months",
    costDrivers: ["BaaS partner and licence model", "Card issuing and processor", "Ledger and product complexity", "KYC/AML tooling", "Security certifications", "Customer-support tooling"],
    techStack: [
      { group: "Core", items: ["Kotlin", "Go", "PostgreSQL"] },
      { group: "Banking", items: ["BaaS APIs", "Card issuing", "Open Banking"] },
      { group: "Apps", items: ["Swift", "Kotlin", "Flutter"] },
      { group: "Security", items: ["HSM / KMS", "Device binding", "Fraud engines"] },
    ],
    compliance: ["Banking and e-money regulation", "PCI DSS", "AML/CFT", "Consumer-duty and disclosure rules"],
    relatedSolutions: ["fintech-app", "mobile-app-development", "ai-ml-development"],
    keywords: ["neobank app development", "digital banking software", "mobile banking app development", "banking as a service integration", "card issuing platform"],
  },
  "web3-gaming-nft-platforms": {
    heroImage: IMG("blockchain-hardware.jpg", "Web3 gaming and NFT platform"),
    headline: "Web3 Gaming & NFT Platform Development — Marketplaces, Wallets & On-Chain Assets",
    localAngleAs: "blockchain-web3-development",
    useCases: [
      { title: "NFT marketplaces", description: "Minting, listings, auctions and royalties." },
      { title: "In-game asset economies", description: "Tradable items, crafting and on-chain inventories." },
      { title: "Embedded wallets", description: "Frictionless wallets and fiat on-ramps for players." },
      { title: "Loyalty & collectibles", description: "Branded digital collectibles and rewards." },
    ],
    phases: [
      { title: "Economy & token design", weeks: "2 weeks", description: "Asset model, chain choice and compliance review (no gambling mechanics)." },
      { title: "Contracts", weeks: "3–5 weeks", description: "NFT and marketplace contracts with tests and internal review." },
      { title: "Platform build", weeks: "6–10 weeks", description: "Marketplace, wallets, indexers and admin." },
      { title: "Audit & testnet", weeks: "3 weeks", description: "Independent audit and public testnet." },
      { title: "Launch & operate", weeks: "Ongoing", description: "Mainnet launch, monitoring and 24/7 support." },
    ],
    mvpWeeks: "10–14 weeks",
    fullWeeks: "4–8 months",
    costDrivers: ["Contract complexity and audit scope", "Chains supported", "Wallet and on-ramp integrations", "Marketplace features", "Game-engine integration", "Scale of on-chain activity"],
    techStack: [
      { group: "Chains", items: ["Polygon", "Immutable", "Base", "Solana"] },
      { group: "Contracts", items: ["Solidity", "ERC-721 / 1155", "Foundry"] },
      { group: "Game", items: ["Unity SDKs", "Unreal SDKs"] },
      { group: "Platform", items: ["Next.js", "Node.js", "The Graph"] },
    ],
    compliance: ["Consumer-protection rules for digital assets", "AML screening on marketplaces", "No gambling or wagering mechanics"],
    relatedSolutions: ["blockchain-web3-development", "mobile-app-development", "saas-development"],
    keywords: ["NFT marketplace development", "web3 game development", "blockchain game development", "NFT platform development", "in-game asset tokenization"],
  },
};

export function getIndustryPlaybook(slug: string): (SolutionPlaybook & { localAngleAs: string }) | undefined {
  const ind = industries.find((i) => i.slug === slug);
  const x = extras[slug];
  if (!ind || !x) return undefined;
  const needs = ind.needs ?? [];
  return {
    slug,
    heroImage: x.heroImage,
    headline: x.headline,
    answer: ind.summary,
    overview: [
      ind.summary,
      needs.length ? `${ind.name} teams typically need: ${needs.map((n) => n.charAt(0).toLowerCase() + n.slice(1).replace(/\.$/, "")).join("; ")}.` : "",
      `We work as an engineering partner for ${ind.name.toLowerCase()} businesses — from discovery and architecture to build, compliance evidence and 24/7 support after launch — so your team can focus on customers, partners and regulators.`,
    ].filter(Boolean),
    features: ind.approach && ind.approach.length ? ind.approach : (ind.painPoints ?? []),
    useCases: x.useCases,
    phases: x.phases,
    mvpWeeks: x.mvpWeeks,
    fullWeeks: x.fullWeeks,
    costDrivers: x.costDrivers,
    techStack: x.techStack,
    compliance: x.compliance,
    faqs: ind.faqs ?? [],
    relatedServices: ind.relatedServiceSlugs,
    relatedSolutions: x.relatedSolutions,
    keywords: x.keywords,
    localAngleAs: x.localAngleAs,
  };
}

// Industries reuse the solution content engine. `slug` is the closest
// solution's slug so the local-market angle (payments, regulator, data law)
// matches the industry; `name` is the industry name shown on the page.
export function industryAsVertical(industry: { slug: string; name: string }, localAngleAs: string): ServiceVertical {
  return { id: industry.slug, slug: localAngleAs, name: industry.name, category: "Industry", description: "", keywords: [], serviceSlug: "" };
}
