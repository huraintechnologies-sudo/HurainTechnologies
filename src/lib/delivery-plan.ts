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

export interface DeliveryPlan {
  track: Track;
  stages: Stage[];
  milestones: Milestone[];
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

export function deliveryPlanFor(topic: string): DeliveryPlan {
  const track = trackFor(topic);
  const stages = STAGE_TITLES.map((title, i) => ({ title, tasks: OVERRIDES[track][i] ?? BASE[i] }));
  const milestones = MILESTONES[track].map(([name, deliverables], i) => ({
    label: i === 0 ? "Advance" : `Milestone ${i}`,
    name,
    deliverables,
    percent: i === 0 ? 10 : 15,
  }));
  return { track, stages, milestones };
}
