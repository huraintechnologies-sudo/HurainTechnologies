import { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-chain-exchange-custody-infrastructure",
    title: "Multi-Chain Custody Infrastructure for a Licensed Crypto Exchange",
    industry: "Crypto & Web3",
    serviceSlugs: ["crypto-exchange-wallet-development", "blockchain-cryptocurrency-development"],
    summary:
      "A licensed exchange needed multi-chain wallet infrastructure supporting 40+ assets with automated cold/hot wallet rebalancing and zero security incidents at launch.",
    challenge:
      "The client's existing custody process was largely manual, requiring staff to move funds between hot and cold storage by hand — slow, error-prone, and impossible to scale past a handful of supported assets. As the exchange prepared to list 40+ assets and pursue a new operating license, they needed automated, auditable custody infrastructure that satisfied both security and regulatory reviewers.",
    solution:
      "Hurain Technologies designed a multi-layer custody architecture combining HSM-backed key management, multi-signature approval workflows, and automated hot/warm/cold rebalancing triggered by real-time liquidity thresholds. We integrated the settlement layer with the exchange's matching engine and built full audit logging for every custody event to support the client's licensing submission.",
    results: [
      { metric: "$120M+", label: "monthly transaction volume processed post-launch" },
      { metric: "0", label: "security incidents since go-live" },
      { metric: "14 weeks", label: "from kickoff to production launch" },
      { metric: "40+", label: "digital assets supported at launch" },
    ],
    metaDescription:
      "How Hurain Technologies built multi-chain custody infrastructure for a licensed crypto exchange, processing $120M+ in monthly volume with zero security incidents.",
  },
  {
    slug: "open-banking-api-rollout-regional-bank",
    title: "Launching an Open Banking API Program in Under 8 Weeks",
    industry: "Banking & Fintech",
    serviceSlugs: ["api-integration-services", "cloud-application-modernization"],
    summary:
      "A regional bank facing a regulatory deadline needed account information and payment initiation APIs live for fintech partners within eight weeks.",
    challenge:
      "The bank's core banking system had no modern API layer, and every prior partner integration had been built as a one-off custom connection taking six to eight weeks each. With an open banking compliance deadline approaching, the bank needed a scalable, standards-based API program, not another one-off integration.",
    solution:
      "Hurain Technologies wrapped the legacy core with a modern API gateway, built account information and payment initiation APIs to open banking standards with OAuth2/OIDC consent flows, and launched a self-service developer portal with a sandbox environment so fintech partners could test integrations independently.",
    results: [
      { metric: "8 weeks", label: "from kickoff to production API launch" },
      { metric: "4 days", label: "average fintech partner onboarding time, down from 6 weeks" },
      { metric: "99.95%", label: "API uptime in the first six months" },
      { metric: "12+", label: "fintech partners onboarded in the first quarter" },
    ],
    metaDescription:
      "How Hurain Technologies launched a regional bank's open banking API program in 8 weeks, cutting fintech partner onboarding time from 6 weeks to 4 days.",
  },
  {
    slug: "fintech-ai-fraud-detection-deployment",
    title: "Cutting Fraud Losses 62% with a Hybrid AI Risk Engine",
    industry: "Payments & PSPs",
    serviceSlugs: ["ai-fraud-detection-automation", "payment-gateway-integration"],
    summary:
      "A payments platform losing 1.8% of transaction volume to fraud deployed a hybrid machine learning and rules-based risk engine, cutting losses by 62% while reducing false positives.",
    challenge:
      "The client's legacy rules-only fraud engine was both under-catching sophisticated fraud rings and over-flagging legitimate customers, generating an 11% false-positive rate that overwhelmed the manual review team and frustrated genuine users with unnecessary friction.",
    solution:
      "Hurain Technologies built a hybrid risk engine combining the client's proven rule set with supervised machine learning models trained on historical transaction and fraud-label data, deployed behind a real-time stream-processing layer. Models ran in shadow mode for four weeks before enforcement to validate precision and recall against live traffic.",
    results: [
      { metric: "62%", label: "reduction in fraud losses" },
      { metric: "3.4%", label: "false-positive rate, down from 11%" },
      { metric: "<200ms", label: "real-time transaction scoring latency" },
      { metric: "4 weeks", label: "shadow-mode validation before enforcement" },
    ],
    metaDescription:
      "How Hurain Technologies deployed a hybrid AI/rules fraud detection engine that cut a payments platform's fraud losses by 62% while reducing false positives.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
