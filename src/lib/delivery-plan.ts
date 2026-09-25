// Delivery process + milestone payment plan, tailored by engineering track.
// The track is inferred from the page topic (service, solution or industry
// name), so every service / solution / industry / country / city page gets a
// plan that matches what is actually being built there.

export type Track = "app" | "blockchain" | "payments" | "api" | "cloud" | "database" | "ai" | "security";

export interface Stage {
  title: string;
  tasks: string[];
}

export interface Milestone {
  label: string; // "Advance", "Milestone 1"…
  name: string;
  deliverables: string;
  percent: number;
}

export interface SupportItem {
  service: string;
  detail: string;
}

export interface DeliveryPlan {
  track: Track;
  stages: Stage[];
  milestones: Milestone[];
  // Annual support & maintenance: what the fixed yearly fee covers.
  support: SupportItem[];
  // Everything handed over with full source-code & IP ownership.
  ownership: string[];
  // Examples of what a dedicated developer can take on after launch.
  enhancements: string[];
  // Extra specialists that can be added as requirements grow.
  extraRoles: string[];
}

export function trackFor(topic: string): Track {
  const t = topic.toLowerCase();
  if (/\b(dba|database|oracle|sql|postgres|mysql|mongo)/.test(t)) return "database";
  if (/(blockchain|crypto|defi|token|smart contract|wallet|web3|nft|exchange|custody|mpc)/.test(t)) return "blockchain";
  if (/(payment|psp|fintech|remittance|stablecoin|banking|neobank|money transfer)/.test(t)) return "payments";
  if (/(\bapi\b|open banking|integration)/.test(t)) return "api";
  if (/(cloud|devops|moderni[sz]ation|migration|infrastructure)/.test(t)) return "cloud";
  if (/(\bai\b|machine learning|fraud|automation|\bml\b)/.test(t)) return "ai";
  if (/(security|compliance|aml|kyc|cyber)/.test(t)) return "security";
  return "app";
}

const STAGE_TITLES = ["Discover", "Design", "Build", "Secure & Test", "Deploy", "Handover", "Support"] as const;

const BASE: string[][] = [
  ["Requirement workshops", "Stakeholder & user interviews", "Risk & constraint review", "Signed scope"],
  ["UX prototypes", "Architecture & data model", "Roles & permissions", "Security design"],
  ["2-week sprints", "Code reviews", "Automated tests", "Demo every sprint"],
  ["Encryption & access control", "Penetration checks", "Performance tests", "UAT with your users"],
  ["Staging → production", "Custom domain & SSL", "Backups configured", "Go-live checklist"],
  ["Role-based sessions", "Recorded walkthroughs", "Admin & ops runbooks", "Documentation handover"],
  ["Dedicated engineer", "SLA helpdesk", "Patches & upgrades", "Quarterly reviews"],
];

// Per-track replacements for individual stages (index → tasks).
const OVERRIDES: Record<Track, Partial<Record<number, string[]>>> = {
  app: {
    1: ["Clickable UX prototypes", "Design system & UI kit", "Architecture & data model", "Roles & permissions"],
    3: ["Device & browser matrix", "Security & penetration checks", "Load tests", "UAT with your users"],
    4: ["App Store / Play Store release", "Custom domain & SSL", "Analytics & crash reporting", "Go-live checklist"],
  },
  blockchain: {
    0: ["Token & protocol workshops", "Chain & custody selection", "Regulatory scoping", "Signed scope"],
    1: ["Contract architecture", "Tokenomics & access roles", "Key management design", "Threat model"],
    2: ["Solidity / Rust sprints", "Testnet deployments", "Gas optimisation", "Demo every sprint"],
    3: ["Unit, fuzz & invariant tests", "Independent audit coordination", "Audit fixes verified", "UAT on testnet"],
    4: ["Mainnet deploy via multisig", "Contract verification", "Monitoring & alerts", "Go-live checklist"],
  },
  payments: {
    0: ["Payment-flow workshops", "PSP & rail selection", "Compliance scoping (PCI DSS)", "Signed scope"],
    1: ["Orchestration architecture", "Ledger & reconciliation model", "Tokenisation design", "Fraud-rule design"],
    2: ["PSP adapter sprints", "Idempotent payment APIs", "Settlement & refunds", "Demo every sprint"],
    3: ["PCI DSS scope review", "Reconciliation tests", "Failover & retry tests", "UAT with real flows"],
    4: ["Staged traffic routing", "Live PSP credentials", "Monitoring & alerts", "Go-live checklist"],
  },
  api: {
    0: ["Integration workshops", "Partner & system inventory", "Security & consent scoping", "Signed scope"],
    1: ["OpenAPI contracts", "Auth design (OAuth2 / mTLS)", "Rate limits & versioning", "Error model"],
    2: ["API & SDK sprints", "Partner sandbox", "Contract tests", "Demo every sprint"],
    3: ["OWASP API checks", "Contract & load tests", "Consent-flow tests", "Partner UAT"],
    4: ["API gateway rollout", "Developer portal live", "Keys & monitoring", "Go-live checklist"],
  },
  cloud: {
    0: ["Workload & cost assessment", "Dependency mapping", "Migration strategy", "Signed scope"],
    1: ["Target architecture", "Landing zone & IAM", "CI/CD design", "Rollback plan"],
    2: ["Infrastructure as code", "Containerisation sprints", "Pipeline automation", "Demo every sprint"],
    3: ["Security baseline checks", "Load & chaos tests", "DR drill", "UAT on staging"],
    4: ["Phased cutover", "DNS & SSL switch", "Cost & uptime dashboards", "Go-live checklist"],
  },
  database: {
    0: ["Health check & inventory", "Performance baseline", "Backup & HA review", "Signed scope"],
    1: ["Target design & sizing", "HA / DR architecture", "Access & audit model", "Maintenance plan"],
    2: ["Fixes & tuning", "Migration rehearsals", "Automation scripts", "Weekly reports"],
    3: ["Restore tests", "Failover drills", "Security hardening", "Data validation"],
    4: ["Cutover window", "Monitoring & alerting", "Runbooks agreed", "Go-live checklist"],
    6: ["24/7 monitoring", "SLA incident response", "Patching & upgrades", "Monthly service reports"],
  },
  ai: {
    0: ["Use-case workshops", "Data availability audit", "Success metrics agreed", "Signed scope"],
    1: ["Feature & model design", "Data pipeline design", "Human-review workflow", "Explainability plan"],
    2: ["Model training sprints", "Feature pipelines", "Evaluation reports", "Demo every sprint"],
    3: ["Accuracy & drift tests", "Bias checks", "Adversarial tests", "UAT with analysts"],
    4: ["Shadow-mode launch", "Gradual rollout", "Model monitoring", "Go-live checklist"],
  },
  security: {
    0: ["Gap assessment", "Framework mapping (AML / KYC / SOC 2)", "Risk register", "Signed scope"],
    1: ["Control design", "Identity & access model", "Logging & evidence plan", "Vendor selection"],
    2: ["Control implementation", "KYC / AML integrations", "Automated evidence", "Demo every sprint"],
    3: ["Penetration test", "Control testing", "Remediation verified", "UAT with compliance team"],
    4: ["Controls live", "Audit evidence pack", "Alerting & case queues", "Go-live checklist"],
  },
};

// Example plan: 10% at signing, then six milestones of 15%, each released
// only after written sign-off. Real plans are shaped around the client's
// requirements (more milestones, different splits), and delivery time is
// agreed per project — so no durations are shown.
// [name, acceptance] for Advance + Milestones 1–6.
const MILESTONES: Record<Track, [string, string][]> = {
  app: [
    ["Contract signing", "Signed contract or PO; kick-off and requirement workshops."],
    ["Scope & UX approved", "Signed scope and clickable prototypes approved."],
    ["Core modules in staging", "First working modules demonstrated in staging."],
    ["Feature complete", "All agreed modules, integrations and admin panel working."],
    ["Testing passed", "Security, performance and device tests passed."],
    ["UAT sign-off", "Your users accept the product in UAT."],
    ["Go-live & handover", "Production launch, training and documentation handed over."],
  ],
  blockchain: [
    ["Contract signing", "Signed contract; protocol workshops and chain selection."],
    ["Architecture approved", "Contract architecture, tokenomics and threat model signed off."],
    ["Testnet v1", "First contracts deployed and demonstrated on testnet."],
    ["Feature-complete testnet", "All contracts, dApp and admin flows running end to end."],
    ["Audit passed", "Independent audit done; every finding fixed and re-verified."],
    ["Mainnet launch", "Multisig mainnet deployment and contract verification."],
    ["Handover", "Monitoring, runbooks, training and documentation handed over."],
  ],
  payments: [
    ["Contract signing", "Signed contract; payment-flow workshops and PCI DSS scoping."],
    ["Architecture approved", "Orchestration, ledger and reconciliation design signed off."],
    ["First rail live in sandbox", "Payment APIs, ledger and first PSP connector working."],
    ["All rails connected", "Remaining PSPs, refunds and settlement working in staging."],
    ["Certification & tests", "PCI DSS scope review, failover and reconciliation tests passed."],
    ["UAT sign-off", "Real payment flows accepted by your team."],
    ["Live traffic & handover", "Staged production routing, monitoring and ops handover."],
  ],
  api: [
    ["Contract signing", "Signed contract; integration workshops and partner inventory."],
    ["API contracts approved", "OpenAPI contracts, auth and versioning signed off."],
    ["Sandbox live", "Partner sandbox and first endpoints demonstrated."],
    ["APIs & SDKs complete", "All endpoints, SDKs and consent flows working."],
    ["Security & load tests", "OWASP API checks and load tests passed."],
    ["Partner UAT", "Integration partners accept the APIs."],
    ["Gateway & portal live", "Production gateway, developer portal and handover."],
  ],
  cloud: [
    ["Contract signing", "Signed contract; workload, cost and dependency assessment."],
    ["Target architecture approved", "Architecture, landing zone and rollback plan signed off."],
    ["Platform provisioned", "Accounts, IAM and pipelines built as code."],
    ["Workloads in staging", "Applications containerised and running on the new platform."],
    ["Resilience verified", "Security baseline, load tests and DR drill passed."],
    ["Cutover", "Production cutover completed with rollback ready."],
    ["Handover", "Dashboards, runbooks and team training delivered."],
  ],
  database: [
    ["Contract signing", "Signed contract; access set-up and health check."],
    ["Findings approved", "Health-check report and remediation plan signed off."],
    ["Stabilised", "Backups, HA gaps and worst queries fixed."],
    ["Migration rehearsed", "Target built; migration rehearsed with validated data."],
    ["Resilience verified", "Restore tests, failover drills and hardening passed."],
    ["Cutover", "Production cutover and monitoring live."],
    ["Managed service live", "Runbooks agreed and SLA support started."],
  ],
  ai: [
    ["Contract signing", "Signed contract; use-case workshops and data audit."],
    ["Success metrics approved", "Data plan, metrics and review workflow signed off."],
    ["Baseline model", "Pipelines built; baseline model evaluated."],
    ["Production model", "Tuned model, review workflow and dashboards in staging."],
    ["Validation passed", "Accuracy, drift and bias tests passed."],
    ["Shadow-mode sign-off", "Analysts accept results in shadow mode."],
    ["Live & handed over", "Gradual rollout, model monitoring and handover."],
  ],
  security: [
    ["Contract signing", "Signed contract; gap assessment started."],
    ["Control design approved", "Risk register and control design signed off."],
    ["Priority controls live", "Highest-risk controls and integrations implemented."],
    ["All controls implemented", "Remaining controls and evidence automation in place."],
    ["Tested & remediated", "Penetration test and control testing passed."],
    ["Compliance sign-off", "Your compliance team accepts the controls."],
    ["Audit-ready", "Evidence pack delivered and team trained."],
  ],
};

// Annual support rows shared by every track; per-track rows extend them.
const SUPPORT_BASE: SupportItem[] = [
  { service: "Dedicated developer", detail: "One named developer assigned to your product for fixes, enhancements and optimisation." },
  { service: "Bug fixes & security patches", detail: "Critical issues resolved within 24 hours; standard issues within 5 business days." },
  { service: "Upgrades & new releases", detail: "Framework, library and platform updates plus new versions of what we built, at no additional cost." },
  { service: "Helpdesk", detail: "Email and phone support for your team and administrators; 4-hour response for critical issues." },
  { service: "Backup monitoring", detail: "Daily backup checks and a quarterly restore test." },
  { service: "Security review", detail: "Periodic audit-trail review and security configuration check." },
];

const SUPPORT_EXTRA: Record<Track, SupportItem[]> = {
  app: [
    { service: "App store compliance", detail: "New iOS / Android versions, store-policy changes and SDK updates handled before they break the app." },
    { service: "Performance & crash monitoring", detail: "Crash reports and slow screens reviewed every month and fixed." },
  ],
  blockchain: [
    { service: "On-chain monitoring", detail: "Contract events, admin actions and unusual transactions watched with alerts." },
    { service: "Network & node upgrades", detail: "Hard forks, RPC and library changes tracked; contract upgrades run through the multisig." },
  ],
  payments: [
    { service: "PSP & scheme changes", detail: "Provider API versions, card-scheme and 3-D Secure changes applied before their deadlines." },
    { service: "Reconciliation checks", detail: "Settlement and reconciliation exceptions reviewed and resolved every day." },
  ],
  api: [
    { service: "Partner API changes", detail: "Third-party API deprecations tracked and integrations updated before cut-off dates." },
    { service: "Uptime & error monitoring", detail: "Error rates, latency and rate limits watched with alerts." },
  ],
  cloud: [
    { service: "Cost optimisation", detail: "Monthly cloud-bill review with rightsizing and reserved-capacity advice." },
    { service: "Uptime monitoring", detail: "Infrastructure health, scaling and certificate expiry watched with alerts." },
  ],
  database: [
    { service: "24/7 monitoring", detail: "Replication, storage, locks and slow queries watched around the clock." },
    { service: "Patching & upgrades", detail: "Database patches and version upgrades planned, tested and applied." },
  ],
  ai: [
    { service: "Model monitoring", detail: "Accuracy and drift tracked; models retrained when performance drops." },
    { service: "Data pipeline checks", detail: "Feature pipelines and data quality checked so predictions stay reliable." },
  ],
  security: [
    { service: "Control monitoring", detail: "Alerts, case queues and control evidence reviewed so you stay audit-ready." },
    { service: "Regulatory updates", detail: "Rules and thresholds updated as regulations and guidance change." },
  ],
};

const OWNERSHIP_BASE = [
  "Complete Git repository with full commit history",
  "Database schemas, migrations and seed data",
  "Configuration, CI/CD and deployment scripts",
  "API documentation and a deployment guide",
];

const OWNERSHIP_EXTRA: Record<Track, string[]> = {
  app: ["Frontend, backend and admin-panel source code", "iOS / Android projects and store accounts in your name", "Design files and UI kit"],
  blockchain: ["Smart-contract source, tests and deployment scripts", "Contract ownership and multisig admin keys transferred to you", "Audit reports and dApp / admin source code"],
  payments: ["Payment orchestration, ledger and admin source code", "PSP merchant accounts and credentials in your name", "Reconciliation rules and ops runbooks"],
  api: ["API, gateway and SDK source code", "OpenAPI specifications and developer-portal content", "Partner credentials and keys in your name"],
  cloud: ["Infrastructure-as-code for every environment", "Cloud accounts and billing in your name", "Runbooks and disaster-recovery plan"],
  database: ["All scripts, automation and tuning changes", "Runbooks, HA / DR design and health-check reports", "Database access and credentials in your name"],
  ai: ["Model code, training pipelines and notebooks", "Trained model files and evaluation reports", "Feature definitions and data-pipeline code"],
  security: ["Control configurations, rules and integration code", "Policies, risk register and audit evidence pack", "Vendor accounts and keys in your name"],
};

const ENHANCEMENTS: Record<Track, string[]> = {
  app: ["New features and modules as your users ask for them", "UI and user-experience improvements based on feedback", "New integrations, reports and workflow automation"],
  blockchain: ["New contracts, tokens or chains", "dApp and admin-panel improvements", "New wallet, bridge and exchange integrations"],
  payments: ["New PSPs, payment methods and currencies", "Smarter routing and fraud rules", "New reports, payouts and reconciliation automation"],
  api: ["New endpoints, SDKs and partner integrations", "Developer-portal and documentation improvements", "Webhooks, reporting and workflow automation"],
  cloud: ["New environments, regions and services", "Deployment-pipeline and cost improvements", "Observability, scaling and resilience work"],
  database: ["Query and schema optimisation as data grows", "New replicas, reporting databases and automation", "Upgrades and migrations to newer versions"],
  ai: ["New models and use cases", "Better accuracy through new data and features", "Dashboards, review tools and automation"],
  security: ["New controls as you enter new markets", "Automated evidence collection and case handling", "New KYC / AML and security-tool integrations"],
};

const EXTRA_ROLES: Record<Track, string[]> = {
  app: ["Frontend developer", "Mobile developer", "Backend developer", "UI/UX designer", "QA engineer", "DevOps engineer"],
  blockchain: ["Smart-contract developer", "dApp developer", "Backend developer", "QA engineer", "DevOps engineer"],
  payments: ["Payments backend developer", "Integration engineer", "Frontend developer", "QA engineer", "DevOps engineer"],
  api: ["Backend / API developer", "Integration engineer", "SDK developer", "QA engineer", "DevOps engineer"],
  cloud: ["DevOps engineer", "Cloud architect", "Site-reliability engineer", "Backend developer"],
  database: ["Database administrator", "Data engineer", "Backend developer", "DevOps engineer"],
  ai: ["ML engineer", "Data engineer", "Backend developer", "Frontend developer", "QA engineer"],
  security: ["Security engineer", "Compliance integration developer", "Backend developer", "QA engineer"],
};

export function deliveryPlanFor(topic: string): DeliveryPlan {
  const track = trackFor(topic);
  const stages = STAGE_TITLES.map((title, i) => ({ title, tasks: OVERRIDES[track][i] ?? BASE[i] }));
  const milestones = MILESTONES[track].map(([name, deliverables], i) => ({
    label: i === 0 ? "Advance" : `Milestone ${i}`,
    name,
    deliverables,
    percent: i === 0 ? 10 : 15,
  }));
  return {
    track,
    stages,
    milestones,
    support: [...SUPPORT_BASE, ...SUPPORT_EXTRA[track]],
    ownership: [...OWNERSHIP_EXTRA[track], ...OWNERSHIP_BASE],
    enhancements: ENHANCEMENTS[track],
    extraRoles: EXTRA_ROLES[track],
  };
}
