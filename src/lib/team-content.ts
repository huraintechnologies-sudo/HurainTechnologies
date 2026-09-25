// Post-launch team content: what a dedicated developer works on, which
// developers and support members can be added, and the extra annual-support
// services — tailored first by engineering track, then deepened by the
// page's specific topic (e.g. food delivery, Oracle DBA, DeFi).

import type { SupportItem, Track } from "@/lib/delivery-plan";

export interface Role {
  role: string;
  does: string;
}

export interface TeamContent {
  enhancements: string[];
  devRoles: Role[];
  supportRoles: Role[];
  supportExtra: SupportItem[];
}

const r = (role: string, does: string): Role => ({ role, does });

// ---------- Track level ----------

const TRACK_ENHANCEMENTS: Record<Track, string[]> = {
  app: ["New features and modules as your users ask for them", "UI and user-experience improvements based on feedback", "New integrations, reports and workflow automation"],
  blockchain: ["New contracts, tokens or chains", "dApp and admin-panel improvements", "New wallet, bridge and exchange integrations"],
  payments: ["New PSPs, payment methods and currencies", "Smarter routing and fraud rules", "New reports, payouts and reconciliation automation"],
  api: ["New endpoints, SDKs and partner integrations", "Developer-portal and documentation improvements", "Webhooks, reporting and workflow automation"],
  cloud: ["New environments, regions and services", "Deployment-pipeline and cost improvements", "Observability, scaling and resilience work"],
  database: ["Query and schema optimisation as data grows", "New replicas, reporting databases and automation", "Upgrades and migrations to newer versions"],
  ai: ["New models and use cases", "Better accuracy through new data and features", "Dashboards, review tools and automation"],
  security: ["New controls as you enter new markets", "Automated evidence collection and case handling", "New KYC / AML and security-tool integrations"],
};

const FRONTEND = r("Frontend developer", "Builds and refines the web screens and dashboards your users see.");
const MOBILE = r("Mobile developer", "Ships new iOS and Android features, fixes and store releases.");
const BACKEND = r("Backend developer", "Adds the APIs, business logic and data models behind new features.");
const DESIGNER = r("UI/UX designer", "Designs new flows and screens and tests them with real users.");
const QA = r("QA engineer", "Writes and runs manual and automated tests before every release.");
const DEVOPS = r("DevOps engineer", "Keeps pipelines, environments and deployments fast and reliable.");

const TRACK_DEV_ROLES: Record<Track, Role[]> = {
  app: [FRONTEND, MOBILE, BACKEND, DESIGNER, QA, DEVOPS],
  blockchain: [
    r("Smart-contract developer", "Writes, tests and upgrades contracts in Solidity or Rust."),
    r("dApp developer", "Builds the wallet-connected web interfaces for your contracts."),
    BACKEND, QA, DEVOPS,
  ],
  payments: [
    r("Payments backend developer", "Adds payment methods, routing rules and ledger features."),
    r("Integration engineer", "Connects new PSPs, banks, acquirers and third-party APIs."),
    FRONTEND, QA, DEVOPS,
  ],
  api: [
    r("Backend / API developer", "Designs and builds new endpoints and API versions."),
    r("Integration engineer", "Connects partners and third-party systems to your platform."),
    r("SDK developer", "Maintains client SDKs so partners integrate faster."),
    QA, DEVOPS,
  ],
  cloud: [
    DEVOPS,
    r("Cloud architect", "Plans new regions, services and cost-efficient architecture."),
    r("Site-reliability engineer", "Improves uptime, alerting and incident response."),
    BACKEND,
  ],
  database: [
    r("Database administrator", "Tunes, patches and safeguards your databases."),
    r("Data engineer", "Builds pipelines, reporting stores and data-quality checks."),
    BACKEND, DEVOPS,
  ],
  ai: [
    r("ML engineer", "Trains, deploys and improves models in production."),
    r("Data engineer", "Builds the feature pipelines and data-quality checks models rely on."),
    BACKEND, FRONTEND, QA,
  ],
  security: [
    r("Security engineer", "Hardens systems, reviews code and runs security tests."),
    r("Compliance integration developer", "Connects KYC, AML, screening and case-management providers."),
    BACKEND, QA,
  ],
};

const L1 = r("L1 helpdesk support executive", "First contact for your users and staff — logs, triages and resolves common issues.");
const L2 = r("L2 technical support engineer", "Investigates bugs, data issues and integrations, and escalates to developers with full context.");

const TRACK_SUPPORT_ROLES: Record<Track, Role[]> = {
  app: [
    r("App user-support executive", "Answers in-app messages, emails and app store reviews."),
    r("Release & app store support", "Manages builds, store listings and review submissions."),
  ],
  blockchain: [
    r("On-chain operations support", "Watches contracts, gas balances and admin transactions."),
    r("Wallet & transaction support", "Helps users trace stuck, failed or mis-sent transactions."),
  ],
  payments: [
    r("Payment operations support", "Resolves failed payments, refunds and payout issues."),
    r("Reconciliation & disputes support", "Handles settlement breaks, chargebacks and disputes."),
  ],
  api: [
    r("Integration & partner support engineer", "Helps partners onboard and debug their integrations."),
    r("API monitoring support", "Watches error rates and latency and acts on alerts."),
  ],
  cloud: [
    r("24/7 NOC support engineer", "Round-the-clock infrastructure monitoring and first response."),
    r("Site-reliability support", "Handles incidents, post-mortems and capacity planning."),
  ],
  database: [
    r("24/7 DBA support engineer", "Around-the-clock response to database alerts and incidents."),
    r("Backup & recovery support", "Verifies backups and runs scheduled restore tests."),
  ],
  ai: [
    r("Model operations support", "Watches model health and works through human-review queues."),
    r("Data-quality support analyst", "Checks incoming data and fixes pipeline issues."),
  ],
  security: [
    r("SOC analyst", "Monitors security alerts and escalates real incidents."),
    r("Compliance operations support", "Supports your compliance team with alerts, cases and reports."),
  ],
};

// ---------- Topic level (deeper, page-specific) ----------

interface Focus {
  match: RegExp;
  enhancements: string[];
  devRoles: Role[];
  supportRoles: Role[];
  supportExtra: SupportItem[];
}

const FOCUS: Focus[] = [
  {
    match: /food|restaurant|delivery app/,
    enhancements: ["Loyalty points, subscriptions and promo campaigns", "Smarter dispatch, batching and live rider tracking", "New restaurant, POS and aggregator integrations"],
    devRoles: [r("Maps & logistics developer", "Improves dispatch, routing, ETAs and live order tracking.")],
    supportRoles: [
      r("Order & customer support executive", "Handles late orders, refunds and customer queries."),
      r("Restaurant & rider onboarding support", "Onboards and supports restaurants, kitchens and riders."),
    ],
    supportExtra: [{ service: "Peak-hour readiness", detail: "Load checks before festivals, promotions and peak meal times so ordering never slows down." }],
  },
  {
    match: /e-?commerce|retail|shop/,
    enhancements: ["Loyalty, gift cards and personalised offers", "Better search, filters and product recommendations", "New marketplaces, ERP, POS and shipping integrations"],
    devRoles: [
      r("E-commerce developer", "Extends catalogue, cart, checkout and promotions."),
      r("Search & recommendation engineer", "Improves product search, filters and recommendations."),
    ],
    supportRoles: [
      r("Order & customer support executive", "Handles order issues, returns, refunds and customer queries."),
      r("Catalogue & merchandising support", "Keeps products, prices, stock and promotions accurate."),
    ],
    supportExtra: [{ service: "Sale-season readiness", detail: "Load tests and checkout checks before big sales and holiday peaks." }],
  },
  {
    match: /health|medical|clinic|insur/,
    enhancements: ["Telemedicine, e-prescriptions and patient-portal features", "New EHR / EMR, lab and insurer integrations", "Clinical reports and care-workflow automation"],
    devRoles: [r("Healthcare integration engineer", "Connects EHR / EMR, labs and insurers using HL7 and FHIR.")],
    supportRoles: [r("Clinical application support", "Helps clinicians and staff with patient-safe issue handling.")],
    supportExtra: [{ service: "Patient-data protection", detail: "Access-log reviews and privacy checks aligned with HIPAA / GDPR-style obligations." }],
  },
  {
    match: /e-?learning|edtech|learning platform|lms/,
    enhancements: ["New course formats, quizzes and certificates", "Live classes, video and engagement features", "Learning analytics and progress reports"],
    devRoles: [
      r("LMS & content developer", "Builds courses, assessments and learning-analytics features."),
      r("Video streaming engineer", "Delivers live classes and on-demand video at scale."),
    ],
    supportRoles: [r("Learner & instructor support", "Helps learners and instructors with access, courses and exams.")],
    supportExtra: [{ service: "Exam & enrolment readiness", detail: "Capacity checks before exams, admissions and course launches." }],
  },
  {
    match: /real estate|proptech|property/,
    enhancements: ["Virtual tours, maps and smarter property search", "Rent collection, lease and maintenance workflows", "New listing-portal, CRM and payment integrations"],
    devRoles: [r("Property-data integration developer", "Connects listing portals, MLS feeds and CRMs.")],
    supportRoles: [r("Agent & listing support", "Helps agents, landlords and tenants with listings and enquiries.")],
    supportExtra: [{ service: "Listing-feed monitoring", detail: "Portal and MLS feeds checked daily so listings stay accurate." }],
  },
  {
    match: /saas|enterprise/,
    enhancements: ["New plans, billing and usage-based pricing", "SSO, roles and enterprise admin features", "Public API, webhooks and marketplace integrations"],
    devRoles: [r("Multi-tenant SaaS architect", "Scales tenancy, billing and permissions as customers grow.")],
    supportRoles: [r("Customer success support", "Helps tenants onboard, adopt features and resolve issues.")],
    supportExtra: [{ service: "Tenant health monitoring", detail: "Per-tenant usage, errors and performance reviewed every month." }],
  },
  {
    match: /iot|embedded/,
    enhancements: ["New device types, sensors and protocols", "Over-the-air firmware update improvements", "Dashboards, alerts and predictive maintenance"],
    devRoles: [
      r("Firmware engineer", "Updates device firmware and over-the-air update flows."),
      r("IoT platform developer", "Scales device ingestion, dashboards and alerts."),
    ],
    supportRoles: [r("Device support engineer", "Diagnoses offline devices, firmware and connectivity issues.")],
    supportExtra: [{ service: "Fleet health monitoring", detail: "Offline devices, battery and firmware versions tracked across your fleet." }],
  },
  {
    match: /mobile app/,
    enhancements: ["Push campaigns, deep links and in-app messaging", "Offline mode, performance and battery improvements", "Wearable, widget and tablet experiences"],
    devRoles: [r("Flutter / React Native developer", "Builds features once for both iOS and Android.")],
    supportRoles: [],
    supportExtra: [{ service: "OS release readiness", detail: "App tested against every new iOS and Android beta before public release." }],
  },
  {
    match: /web application|web app/,
    enhancements: ["Progressive web app and offline features", "Accessibility and Core Web Vitals improvements", "Role-based dashboards and admin tools"],
    devRoles: [r("Full-stack developer", "Delivers complete features end to end, from database to UI.")],
    supportRoles: [],
    supportExtra: [{ service: "Browser & performance checks", detail: "Core Web Vitals and new browser versions checked every month." }],
  },
  {
    match: /hire developers|dedicated team/,
    enhancements: ["Roadmap features delivered sprint by sprint", "Code-quality, testing and architecture improvements", "Extra capacity for launches and deadlines"],
    devRoles: [
      r("Full-stack developer", "Delivers complete features end to end, from database to UI."),
      r("Tech lead", "Guides architecture, code reviews and sprint planning for the team."),
    ],
    supportRoles: [],
    supportExtra: [],
  },
  {
    match: /neobank|digital banking|banking/,
    enhancements: ["New account, card and savings products", "Open-banking and core-banking integrations", "Onboarding, KYC and customer-app improvements"],
    devRoles: [r("Core-banking integration engineer", "Connects core banking, card processors and open-banking APIs.")],
    supportRoles: [r("Customer onboarding & KYC support", "Resolves onboarding, verification and account queries.")],
    supportExtra: [{ service: "Regulatory reporting checks", detail: "Scheduled regulatory and management reports checked for completeness." }],
  },
  {
    match: /remittance|cross-border|money transfer/,
    enhancements: ["New corridors, currencies and payout methods", "Better FX pricing and rate management", "Faster compliance screening and transfer tracking"],
    devRoles: [r("FX & payout integration engineer", "Adds corridors, FX providers and payout partners.")],
    supportRoles: [r("Transfer support executive", "Tracks and resolves delayed, held or returned transfers.")],
    supportExtra: [{ service: "Corridor & partner monitoring", detail: "Payout-partner availability and FX feeds watched with alerts." }],
  },
  {
    match: /gaming|nft/,
    enhancements: ["New in-game assets, drops and marketplaces", "Player wallets, rewards and tournaments", "New chains, launchpads and marketplace integrations"],
    devRoles: [r("Game & NFT developer", "Builds in-game assets, marketplaces and minting flows.")],
    supportRoles: [r("Player & community support", "Handles player issues, asset disputes and community channels.")],
    supportExtra: [{ service: "Drop & launch readiness", detail: "Load and contract checks before every mint, drop or tournament." }],
  },
  {
    match: /exchange/,
    enhancements: ["New trading pairs, order types and markets", "Liquidity, market-maker and payment-rail integrations", "Trader dashboards, APIs and mobile trading features"],
    devRoles: [r("Matching-engine developer", "Improves order matching, latency and trading features.")],
    supportRoles: [r("Exchange operations support", "Handles deposits, withdrawals and trading queries.")],
    supportExtra: [{ service: "Hot-wallet & liquidity monitoring", detail: "Hot-wallet balances, withdrawals and liquidity levels watched with alerts." }],
  },
  {
    match: /wallet|custody|mpc/,
    enhancements: ["New chains, tokens and staking features", "Approval policies and whitelists for treasury teams", "Swap, bridge and on-ramp integrations"],
    devRoles: [r("Wallet & custody engineer", "Extends MPC, multisig and key-management flows.")],
    supportRoles: [],
    supportExtra: [{ service: "Key & signing health", detail: "Signing nodes, key shares and policy engines checked every month." }],
  },
  {
    match: /defi/,
    enhancements: ["New pools, vaults and yield strategies", "Oracle, bridge and protocol integrations", "Governance, rewards and analytics features"],
    devRoles: [r("DeFi protocol engineer", "Builds new pools, vaults and protocol integrations.")],
    supportRoles: [],
    supportExtra: [{ service: "Protocol risk monitoring", detail: "TVL, oracle prices and unusual flows watched with alerts." }],
  },
  {
    match: /smart contract|blockchain/,
    enhancements: ["Upgradeable contract releases through your multisig", "Gas optimisation of high-traffic functions", "Layer-2 and cross-chain deployments"],
    devRoles: [r("Smart-contract auditor", "Reviews every contract change before it is deployed.")],
    supportRoles: [],
    supportExtra: [],
  },
  {
    match: /stablecoin|crypto payment/,
    enhancements: ["New stablecoins, chains and settlement currencies", "Merchant plugins and checkout improvements", "Automated conversion and treasury reports"],
    devRoles: [r("Crypto-payments integration engineer", "Adds chains, stablecoins and merchant plugins.")],
    supportRoles: [r("Merchant support executive", "Helps merchants with payments, settlements and refunds.")],
    supportExtra: [{ service: "Settlement monitoring", detail: "Confirmations, conversions and merchant settlements checked every day." }],
  },
  {
    match: /kyc|aml/,
    enhancements: ["New screening lists and risk rules", "Faster onboarding with better document checks", "Case-management and regulator reporting automation"],
    devRoles: [r("Risk-rules engineer", "Tunes screening and monitoring rules as risks change.")],
    supportRoles: [r("Compliance case support", "Helps analysts work alerts and cases efficiently.")],
    supportExtra: [{ service: "Sanctions-list updates", detail: "Screening lists refreshed and matching rules re-tested after each update." }],
  },
  {
    match: /fraud/,
    enhancements: ["New fraud signals and device fingerprints", "Model retraining on the latest fraud patterns", "Analyst tools and case automation"],
    devRoles: [r("Fraud rules engineer", "Tunes rules and models against new fraud patterns.")],
    supportRoles: [r("Fraud review analyst", "Works through flagged transactions and feeds decisions back to models.")],
    supportExtra: [],
  },
  {
    match: /fintech|payment gateway|payments|psp/,
    enhancements: ["New wallets, BNPL and local payment methods", "Checkout conversion improvements", "Merchant dashboards and settlement reports"],
    devRoles: [],
    supportRoles: [r("Merchant support executive", "Helps merchants with onboarding, payments and settlements.")],
    supportExtra: [],
  },
  {
    match: /migration/,
    enhancements: ["Further workloads moved on a planned schedule", "Post-migration tuning and cost clean-up", "Retirement of legacy systems"],
    devRoles: [r("Migration specialist", "Plans and runs low-downtime migrations with full data validation.")],
    supportRoles: [],
    supportExtra: [],
  },
  {
    match: /audit|consulting/,
    enhancements: ["Follow-up audits after each major change", "Implementation of audit recommendations", "Capacity planning for the next year"],
    devRoles: [r("Performance-tuning specialist", "Finds and fixes the slowest queries and bottlenecks.")],
    supportRoles: [],
    supportExtra: [],
  },
];

const DB_ENGINES: [RegExp, string][] = [
  [/oracle/, "Oracle"],
  [/sql server|mssql/, "SQL Server"],
  [/postgres/, "PostgreSQL"],
  [/mysql|mariadb/, "MySQL"],
];

function uniqueBy<T>(items: T[], key: (t: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((i) => {
    const k = key(i);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function teamContentFor(topic: string, track: Track): TeamContent {
  const t = topic.toLowerCase();
  // First matching topic profile deepens the track content.
  const focus = FOCUS.find((f) => f.match.test(t));
  const engine = DB_ENGINES.find(([re]) => re.test(t))?.[1];

  const engineDev = engine ? [r(`${engine} DBA`, `Certified ${engine} specialist for tuning, patching, upgrades and HA.`)] : [];
  const engineSupport = engine
    ? [{ service: `${engine} patching`, detail: `${engine} patches and version upgrades tested on staging, then applied in agreed maintenance windows.` }]
    : [];

  return {
    enhancements: uniqueBy([...(focus?.enhancements ?? []), ...TRACK_ENHANCEMENTS[track]], (x) => x),
    devRoles: uniqueBy([...engineDev, ...(focus?.devRoles ?? []), ...TRACK_DEV_ROLES[track]], (x) => x.role),
    supportRoles: uniqueBy([L1, L2, ...(focus?.supportRoles ?? []), ...TRACK_SUPPORT_ROLES[track]], (x) => x.role),
    supportExtra: [...engineSupport, ...(focus?.supportExtra ?? [])],
  };
}
