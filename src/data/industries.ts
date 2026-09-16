import { IndustryContent } from "@/lib/types";

export const industries: IndustryContent[] = [
  {
    slug: "banking-fintech",
    name: "Banking & Fintech",
    icon: "banking",
    summary:
      "Banks and fintechs are under pressure to open their platforms via APIs, modernize legacy cores, and meet open-banking and AML obligations without disrupting existing operations or customer trust.",
    needs: [
      "Open banking and partner API programs",
      "Legacy core modernization without downtime",
      "AML/KYC and transaction monitoring workflows",
      "Payment hub and cross-border rail integration",
      "Audit-ready security and compliance controls",
    ],
    relatedServiceSlugs: ["api-integration-services", "cloud-application-modernization", "cybersecurity-compliance"],
    metaDescription:
      "Core modernization, open banking APIs, AML/KYC automation, and payment rail integration for banks and fintechs that can't afford downtime or compliance gaps.",
    painPoints: [
      {
        title: "Core systems that block product velocity",
        description:
          "Vendor-locked core banking platforms turn a simple product change into a multi-quarter release cycle, while fintech challengers ship weekly.",
      },
      {
        title: "Open banking deadlines without a clean path",
        description:
          "Regulatory mandates require standards-compliant account and payment APIs on a fixed timeline, with no room for a risky core rewrite.",
      },
      {
        title: "Manual AML/KYC review queues",
        description:
          "Identity verification and sanctions screening still route through manual case queues, slowing onboarding and creating audit exposure.",
      },
      {
        title: "Fragmented cross-border rails",
        description:
          "Correspondent banking, card networks, and instant payment schemes are stitched together ad hoc, causing reconciliation gaps and settlement delays.",
      },
    ],
    approach: [
      {
        title: "Open banking & partner API programs",
        description:
          "We design and build account information and payment initiation APIs with OAuth2/OIDC consent flows and self-service developer portals that cut partner onboarding from weeks to days.",
      },
      {
        title: "Core modernization without a big-bang rewrite",
        description:
          "Strangler-fig migration wraps legacy cores in modern middleware, letting you ship new products without a risky, multi-year core replacement.",
      },
      {
        title: "AML/KYC and transaction monitoring automation",
        description:
          "Automated identity verification, sanctions/PEP screening, and ML-driven transaction monitoring replace manual review queues and shrink false positives.",
      },
      {
        title: "Cross-border payment hub integration",
        description:
          "A central orchestration layer connects card networks, correspondent banks, and instant payment rails behind one reconciled ledger.",
      },
      {
        title: "Audit-ready security & compliance controls",
        description:
          "Secure architecture review, immutable audit logging, and regulator-ready reporting are built into the platform ahead of your next licensing or partner audit.",
      },
    ],
    faqs: [
      {
        question: "Can you build open banking APIs without a full core system rewrite?",
        answer:
          "Yes. We wrap your existing core in a modern API middleware layer, exposing compliant account and payment APIs without touching core transaction logic.",
      },
      {
        question: "How do you handle AML/KYC compliance during integration?",
        answer:
          "We build identity verification, sanctions/PEP screening, and transaction monitoring workflows directly into the platform, with audit logging that traces every decision for regulator review.",
      },
      {
        question: "Can you integrate with our existing card and payment rail providers?",
        answer:
          "Yes, we connect correspondent banking, card networks, and instant payment schemes into a single orchestration and reconciliation layer.",
      },
      {
        question: "What does an open banking API project timeline look like?",
        answer:
          "A typical account information and payment initiation API program, including a developer portal and sandbox, ships in 8-14 weeks depending on the number of endpoints and your existing infrastructure.",
      },
      {
        question: "Do you help us prepare for a banking regulator or partner security audit?",
        answer:
          "Yes, our secure architecture review and audit-ready logging work is built specifically to help clients pass banking partner and regulator security reviews on first submission.",
      },
    ],
  },
  {
    slug: "crypto-web3",
    name: "Crypto & Web3",
    icon: "blockchain",
    summary:
      "Exchanges, token issuers, and Web3 platforms need production-grade blockchain engineering — not prototype code — to survive audits, scale to real transaction volume, and integrate cleanly with fiat rails.",
    needs: [
      "Token, coin, and smart contract development",
      "Exchange, wallet, and custody infrastructure",
      "DeFi protocol engineering",
      "Security audits and gas optimization",
      "Fiat-to-crypto payment rail integration",
    ],
    relatedServiceSlugs: ["blockchain-cryptocurrency-development", "smart-contract-development", "crypto-exchange-wallet-development"],
    metaDescription:
      "Audited smart contracts, exchange and wallet infrastructure, and fiat rail integration for token issuers, exchanges, and Web3 platforms handling real volume.",
    painPoints: [
      {
        title: "Contracts that won't survive an audit",
        description:
          "Prototype-stage smart contracts with no formal testing routinely fail third-party security review, blocking funding, listings, or mainnet launch.",
      },
      {
        title: "No bridge to fiat rails",
        description:
          "Token and exchange platforms that can't cleanly connect to banking and card rails lose users at the on/off-ramp step.",
      },
      {
        title: "Custody risk at scale",
        description:
          "Manual or under-engineered key management is the single largest cause of exchange and wallet fund losses.",
      },
      {
        title: "Gas costs and throughput ceilings",
        description:
          "Poorly optimized contracts and undersized infrastructure make transactions expensive and slow as adoption grows.",
      },
    ],
    approach: [
      {
        title: "Production-grade token & smart contract development",
        description:
          "ERC-20/721/1155, BEP-20, and SPL contracts built with checks-effects-interactions patterns, reentrancy guards, and formal test coverage before any audit.",
      },
      {
        title: "Independent audit coordination",
        description:
          "We prepare documentation and test coverage and remediate findings alongside leading third-party audit firms before mainnet deployment.",
      },
      {
        title: "Exchange, wallet & custody infrastructure",
        description:
          "Low-latency matching engines and hot/warm/cold custody architecture with multi-sig and HSM-backed key management.",
      },
      {
        title: "Fiat-to-crypto rail integration",
        description:
          "Crypto on/off-ramp providers wired into existing checkout and wallet flows alongside traditional payment rails.",
      },
      {
        title: "Gas optimization & Layer-2 architecture",
        description:
          "Storage packing, batch operations, and rollup/sidechain selection engineered around your actual throughput and cost targets.",
      },
    ],
    faqs: [
      {
        question: "Will our contracts be ready for a third-party security audit?",
        answer:
          "We build with an audit-first mindset — static analysis, fuzz testing, and manual review happen before code goes to an independent auditor, and we remediate every finding before mainnet.",
      },
      {
        question: "Can you connect our token or exchange platform to banking rails?",
        answer:
          "Yes, we integrate crypto on/off-ramp providers and traditional payment rails behind a single checkout or wallet experience.",
      },
      {
        question: "How do you secure custody funds?",
        answer:
          "Multi-layer hot/warm/cold wallet architecture, multi-sig approval, and HSM-backed key management, the same approach we use for licensed exchange clients processing nine-figure monthly volume.",
      },
      {
        question: "Which chains and standards do you build on?",
        answer:
          "Ethereum, Polygon, BNB Chain, Solana, Tron, Avalanche, and permissioned frameworks, using ERC-20/721/1155, BEP-20, and SPL standards depending on your target market.",
      },
      {
        question: "Can you take over an existing blockchain codebase from another vendor?",
        answer:
          "Yes, we run a security and architecture audit on the existing codebase and deliver a remediation and modernization roadmap before continuing development.",
      },
    ],
  },
  {
    slug: "payments-psps",
    name: "Payments & PSPs",
    icon: "payments",
    summary:
      "Payment service providers and platforms handling multi-rail, multi-currency transactions need orchestration, reconciliation, and fraud controls that scale across markets without manual overhead.",
    needs: [
      "Payment orchestration and smart routing",
      "Cross-border and multi-currency settlement",
      "Automated reconciliation against PSP settlement files",
      "Crypto on/off-ramp integration",
      "PCI DSS-aligned architecture",
    ],
    relatedServiceSlugs: ["payment-gateway-integration", "ai-fraud-detection-automation", "api-integration-services"],
    metaDescription:
      "Payment orchestration, automated reconciliation, fraud detection, and PCI DSS-aligned architecture for PSPs and platforms running multi-rail transactions.",
    painPoints: [
      {
        title: "Silent revenue loss from declines",
        description:
          "Poor PSP routing and retry logic quietly loses revenue on every failed or declined transaction, often invisibly to finance teams.",
      },
      {
        title: "Manual reconciliation overhead",
        description:
          "Finance teams spend days each month manually matching PSP settlement files against internal ledgers instead of managing exceptions.",
      },
      {
        title: "Fraud losses outpacing static rules",
        description:
          "Rule-based fraud engines can't adapt fast enough to evolving attack patterns, driving up both chargebacks and false positives.",
      },
      {
        title: "No single view across PSPs",
        description:
          "Running multiple PSPs without a central orchestration layer makes routing decisions, reporting, and risk management inconsistent market to market.",
      },
    ],
    approach: [
      {
        title: "Payment orchestration & smart routing",
        description:
          "Multi-PSP routing based on cost, success rate, and geography with automated failover, cutting decline rates measurably.",
      },
      {
        title: "Automated reconciliation",
        description:
          "Ledger-matching engines ingest PSP settlement files and reconcile automatically, surfacing only genuine exceptions.",
      },
      {
        title: "AI-driven fraud detection",
        description:
          "Hybrid ML and rules risk scoring layered on existing controls, reducing losses while cutting false positives that slow down good customers.",
      },
      {
        title: "Crypto on/off-ramp integration",
        description:
          "Fiat-to-crypto rails integrated alongside card and bank transfer rails behind a single API.",
      },
      {
        title: "PCI DSS-aligned architecture",
        description:
          "Tokenization and secure architecture review keep sensitive card data out of systems that don't need to touch it.",
      },
    ],
    faqs: [
      {
        question: "Can you reduce our transaction decline rate?",
        answer:
          "Yes, through smart PSP routing, retry logic, and performance analytics — clients typically see decline rates fall by more than half within the first few months.",
      },
      {
        question: "How does automated reconciliation work with our existing PSPs?",
        answer:
          "We ingest settlement files from each PSP and match them automatically against your internal ledger, so your finance team only reviews genuine exceptions.",
      },
      {
        question: "Do you integrate crypto payment rails alongside our existing card and bank rails?",
        answer:
          "Yes, crypto on/off-ramp providers are integrated behind the same orchestration and checkout layer as your traditional rails.",
      },
      {
        question: "Is your architecture PCI DSS aligned?",
        answer:
          "Yes, we architect around tokenization and PCI DSS-aligned data handling so sensitive card data is minimized across your systems.",
      },
      {
        question: "Can you help lower our fraud losses without adding checkout friction?",
        answer:
          "Yes, our hybrid ML/rules risk engines are built to catch more fraud while reducing false positives, so legitimate customers see less friction, not more.",
      },
    ],
  },
  {
    slug: "enterprise-saas",
    name: "Enterprise SaaS & Platforms",
    icon: "cloud",
    summary:
      "Fast-growing SaaS platforms need to modernize architecture, expose secure partner APIs, and automate operations to keep shipping quickly as customer and data volume scales.",
    needs: [
      "Monolith-to-microservices migration",
      "Partner and public API programs",
      "DevOps automation and CI/CD pipelines",
      "Cloud cost and performance optimization",
      "Workflow and operations automation",
    ],
    relatedServiceSlugs: ["cloud-application-modernization", "api-integration-services", "ai-fraud-detection-automation"],
    metaDescription:
      "Monolith-to-microservices migration, partner API programs, DevOps automation, and operations workflow automation for fast-growing enterprise SaaS platforms.",
    painPoints: [
      {
        title: "Releases that get riskier as you grow",
        description:
          "Monolithic architecture means every deployment requires full regression testing, slowing releases exactly when customers expect more velocity.",
      },
      {
        title: "Partner integrations built one-off",
        description:
          "Without a proper API gateway and developer portal, every new enterprise or partner integration becomes weeks of custom engineering.",
      },
      {
        title: "Cloud costs rising faster than usage",
        description:
          "Lift-and-shift migrations and unoptimized architecture drive up cloud spend without a matching gain in performance.",
      },
      {
        title: "Manual operations eating engineering time",
        description:
          "Reconciliation, reporting, and account provisioning workflows that should be automated still consume hours of manual work every week.",
      },
    ],
    approach: [
      {
        title: "Monolith-to-microservices migration",
        description:
          "Incremental strangler-fig decomposition modernizes the platform without a risky big-bang rewrite.",
      },
      {
        title: "Partner & public API programs",
        description:
          "API gateway implementation, governance standards, and self-service developer portals that cut partner onboarding time from weeks to days.",
      },
      {
        title: "DevOps & CI/CD automation",
        description:
          "Automated build, test, and deployment pipelines that move release cycles from weeks to multiple deployments per day.",
      },
      {
        title: "Cloud cost & performance optimization",
        description:
          "Right-sizing, reserved capacity planning, and architecture tuning that typically cuts cloud spend 20-35% without sacrificing performance.",
      },
      {
        title: "Workflow & operations automation",
        description:
          "RPA and orchestration for reconciliation, reporting, and other repetitive back-office processes that free engineering time for product work.",
      },
    ],
    faqs: [
      {
        question: "Do we need to rewrite our platform to modernize it?",
        answer:
          "No. We use incremental strangler-fig migration patterns that decompose the monolith piece by piece, so you keep shipping features throughout the migration.",
      },
      {
        question: "Can you help us launch a partner or public API program?",
        answer:
          "Yes, including API gateway selection, governance standards, and a self-service developer portal with sandbox environments.",
      },
      {
        question: "How much can you reduce our cloud costs?",
        answer:
          "Typically 20-35% through right-sizing, reserved capacity planning, and architecture optimization, without sacrificing performance.",
      },
      {
        question: "What does a typical modernization engagement look like?",
        answer:
          "A 2-4 week assessment produces a risk-ranked roadmap, followed by a 3-9 month incremental migration depending on system complexity.",
      },
      {
        question: "Can you automate manual operational workflows like reconciliation and reporting?",
        answer:
          "Yes, we build workflow automation and orchestration for repetitive back-office processes so your team can focus on product work.",
      },
    ],
  },
  {
    slug: "healthtech-insurtech",
    name: "HealthTech & InsurTech",
    icon: "security",
    summary:
      "Health and insurance platforms manage highly sensitive data under strict regulatory frameworks, requiring secure architecture, automated workflows, and integration with legacy systems of record.",
    needs: [
      "Secure architecture and data protection engineering",
      "Legacy system integration via modern APIs",
      "Workflow automation for claims and case processing",
      "Compliance-ready audit logging and reporting",
      "Cloud modernization of on-premise systems",
    ],
    relatedServiceSlugs: ["cybersecurity-compliance", "api-integration-services", "cloud-application-modernization"],
    metaDescription:
      "Secure architecture, compliance-ready audit logging, and legacy system integration for health and insurance platforms handling sensitive regulated data.",
    painPoints: [
      {
        title: "Legacy systems of record everywhere",
        description:
          "Claims, underwriting, and case data often live in decades-old systems that don't expose modern APIs, forcing manual data handling.",
      },
      {
        title: "Compliance requirements that touch every layer",
        description:
          "Data protection and regulatory frameworks demand controls across infrastructure, application, and data layers, not just a policy document.",
      },
      {
        title: "Manual claims and case workflows",
        description:
          "Claims adjudication and case processing still route through manual steps that slow turnaround time and increase error rates.",
      },
      {
        title: "Audit and reporting gaps",
        description:
          "Missing audit trails or inconsistent logging can block a compliance certification or a payer or partner integration.",
      },
    ],
    approach: [
      {
        title: "Secure architecture & data protection engineering",
        description:
          "Threat modeling and architecture review across infrastructure, application, and data layers before you scale sensitive data volume.",
      },
      {
        title: "Legacy system integration via modern APIs",
        description:
          "Middleware wraps legacy claims and policy systems with modern REST/GraphQL APIs without a disruptive core replacement.",
      },
      {
        title: "Workflow automation for claims and case processing",
        description:
          "RPA and orchestration reduce manual steps in claims adjudication and case management, cutting turnaround time.",
      },
      {
        title: "Compliance-ready audit logging & reporting",
        description:
          "Immutable audit trails and regulator-ready reporting exports are built into the platform from day one.",
      },
      {
        title: "Cloud modernization of on-premise systems",
        description:
          "On-premise health and insurance systems are migrated to cloud-native architecture with zero-downtime migration patterns.",
      },
    ],
    faqs: [
      {
        question: "Can you integrate with our legacy claims or policy administration system?",
        answer:
          "Yes, we wrap legacy systems of record in modern middleware APIs, avoiding a risky rewrite of core claims or policy logic.",
      },
      {
        question: "How do you handle sensitive health and insurance data security?",
        answer:
          "We run a secure architecture review across infrastructure, application, and data layers, and build audit logging and access controls in from the start.",
      },
      {
        question: "Can you automate our claims adjudication workflow?",
        answer:
          "Yes, we build workflow automation that reduces manual steps in claims and case processing while keeping full audit traceability.",
      },
      {
        question: "Do you help with compliance certification or payer integration readiness?",
        answer:
          "We build the audit-ready logging, access controls, and reporting exports that certification bodies and payer partners expect; jurisdiction-specific certification work should run alongside your compliance counsel.",
      },
      {
        question: "Can you migrate our on-premise systems to the cloud without downtime?",
        answer:
          "Yes, we use zero-downtime migration patterns to move on-premise health and insurance systems to cloud-native architecture.",
      },
    ],
  },
  {
    slug: "real-estate-proptech",
    name: "Real Estate & PropTech",
    icon: "map",
    summary:
      "Real estate platforms and PropTech operators are digitizing property transactions — from tokenized ownership and fractional investment to automated escrow and payment flows — and need engineering that can handle real money movement and regulatory scrutiny, not just listings software.",
    needs: [
      "Tokenized property and fractional ownership platforms",
      "Automated escrow and payment orchestration",
      "Smart contract-based title and transaction workflows",
      "KYC/AML for property investors and buyers",
      "Integration with legacy property management and CRM systems",
    ],
    relatedServiceSlugs: ["blockchain-cryptocurrency-development", "smart-contract-development", "payment-gateway-integration"],
    metaDescription:
      "Tokenized real estate, automated escrow, smart contract workflows, and payment orchestration engineering for PropTech and fractional investment platforms.",
    painPoints: [
      {
        title: "Escrow and settlement still run manually",
        description:
          "Property transactions rely on manual coordination between buyers, agents, and escrow agents, slowing closings and creating error risk on large sums.",
      },
      {
        title: "Fractional ownership without production-grade tokenization",
        description:
          "Tokenized property models frequently start as unaudited prototype contracts that can't scale to real investor volume or survive due diligence.",
      },
      {
        title: "Disconnected payment and investor onboarding",
        description:
          "Property platforms bolt together separate tools for KYC, payments, and cap table tracking, creating reconciliation gaps.",
      },
      {
        title: "Legacy property management systems that don't talk to new platforms",
        description:
          "Existing PMS and CRM systems of record rarely expose APIs, forcing manual data re-entry between systems.",
      },
    ],
    approach: [
      {
        title: "Tokenized ownership & fractional investment infrastructure",
        description:
          "Security-token contracts built with formal testing for fractional property ownership and cap table management, hardened the same way we build exchange-grade token infrastructure.",
      },
      {
        title: "Automated escrow & payment orchestration",
        description:
          "Payment orchestration and reconciliation layers automate deposit handling, milestone releases, and settlement across multiple payment rails.",
      },
      {
        title: "Smart contract-based transaction workflows",
        description:
          "Title transfer, milestone payment, and investor distribution logic encoded in audited smart contracts, reducing manual coordination and settlement risk.",
      },
      {
        title: "KYC/AML for investors and buyers",
        description:
          "Identity verification and sanctions/PEP screening integrated into investor onboarding, consistent with the AML/KYC workflows we build for banks and exchanges.",
      },
      {
        title: "Legacy PMS/CRM integration",
        description:
          "Middleware APIs connect property management and CRM systems of record to new tokenization and payment platforms without a disruptive replacement.",
      },
    ],
    faqs: [
      {
        question: "Can you build a fractional property ownership platform on blockchain?",
        answer:
          "Yes, we build security-token infrastructure for fractional ownership with the same audit-first approach we use for exchange and DeFi token contracts.",
      },
      {
        question: "Can you automate escrow and milestone payments for property transactions?",
        answer:
          "Yes, we build payment orchestration and smart contract-based escrow workflows that automate deposit handling and milestone releases.",
      },
      {
        question: "Do you handle investor KYC/AML for tokenized real estate offerings?",
        answer:
          "Yes, we integrate identity verification and sanctions/PEP screening into investor onboarding flows.",
      },
      {
        question: "Can you integrate with our existing property management software?",
        answer:
          "Yes, we build middleware APIs that connect legacy PMS and CRM systems to new platforms without replacing your system of record.",
      },
      {
        question: "Is tokenized real estate legally recognized in every market?",
        answer:
          "Regulatory treatment of tokenized property varies by jurisdiction. We build the technical infrastructure and recommend pairing it with qualified real estate and securities counsel in your target markets.",
      },
    ],
  },
  {
    slug: "cross-border-remittance",
    name: "Cross-Border Remittance & Money Transfer",
    icon: "exchange",
    summary:
      "Remittance operators and money transfer platforms compete on speed, cost, and reliability across dozens of corridors simultaneously, and need payment orchestration, compliance automation, and fraud controls engineered for high transaction volume and thin margins.",
    needs: [
      "Multi-corridor payout and payment rail integration",
      "Real-time FX and settlement orchestration",
      "Sanctions screening and transaction monitoring at scale",
      "Crypto and stablecoin settlement rails",
      "Fraud detection tuned for high-volume, low-value transfers",
    ],
    relatedServiceSlugs: ["payment-gateway-integration", "ai-fraud-detection-automation", "blockchain-cryptocurrency-development"],
    metaDescription:
      "Payment orchestration, sanctions screening, fraud detection, and stablecoin settlement engineering for cross-border remittance and money transfer operators.",
    painPoints: [
      {
        title: "Every corridor is a different integration",
        description:
          "Payout partners, banks, and mobile money providers each require separate integration work, slowing expansion into new corridors.",
      },
      {
        title: "FX and settlement risk on thin margins",
        description:
          "Manual FX and settlement processes erode already-thin remittance margins and create exposure on volatile currency pairs.",
      },
      {
        title: "Sanctions and compliance screening at volume",
        description:
          "High transaction volume across many jurisdictions makes manual sanctions and PEP screening operationally unsustainable.",
      },
      {
        title: "Fraud patterns specific to small, frequent transfers",
        description:
          "Generic fraud rules built for card payments miss the account takeover and mule-network patterns specific to remittance flows.",
      },
    ],
    approach: [
      {
        title: "Multi-corridor payment orchestration",
        description:
          "A single orchestration layer routes across banks, mobile money, and payout partners per corridor, with automated failover and cost-based routing.",
      },
      {
        title: "Real-time FX & settlement automation",
        description:
          "Automated FX rate sourcing and settlement reconciliation reduce manual currency risk and close settlement faster.",
      },
      {
        title: "Sanctions screening & transaction monitoring at scale",
        description:
          "Automated sanctions/PEP screening and transaction monitoring workflows built to handle high transaction volume across multiple jurisdictions.",
      },
      {
        title: "Stablecoin & crypto settlement rails",
        description:
          "Stablecoin settlement integrated as a faster, lower-cost alternative rail alongside traditional correspondent banking for supported corridors.",
      },
      {
        title: "Fraud detection tuned for remittance patterns",
        description:
          "ML risk scoring trained on account takeover, mule-network, and velocity patterns specific to high-frequency, low-value transfers.",
      },
    ],
    faqs: [
      {
        question: "Can you help us launch new payout corridors faster?",
        answer:
          "Yes, our payment orchestration layer is built to onboard new bank, mobile money, and payout partner integrations without re-architecting the platform each time.",
      },
      {
        question: "Do you support stablecoin or crypto settlement between corridors?",
        answer:
          "Yes, we integrate stablecoin settlement rails alongside traditional correspondent banking where it reduces cost or settlement time.",
      },
      {
        question: "How do you handle sanctions screening at high transaction volume?",
        answer:
          "We build automated sanctions and PEP screening into the transaction flow so screening scales with volume instead of adding manual review headcount.",
      },
      {
        question: "Is your fraud detection built for remittance-specific fraud, or generic card fraud?",
        answer:
          "We tune risk models specifically for remittance patterns — account takeover, mule networks, and structuring — rather than reusing generic card-fraud rules.",
      },
      {
        question: "Can you automate FX and settlement reconciliation across corridors?",
        answer:
          "Yes, we automate FX rate sourcing and settlement reconciliation so finance teams manage exceptions instead of manual matching.",
      },
    ],
  },
  {
    slug: "digital-banking-neobanks",
    name: "Digital Banking & Neobanks",
    icon: "api",
    summary:
      "Neobanks and digital-first banking platforms have to ship product at software speed while meeting the same regulatory bar as incumbent banks, which means API-first core architecture, automated compliance, and fraud controls built in from day one rather than retrofitted.",
    needs: [
      "API-first core banking and ledger architecture",
      "Card issuing and account management integration",
      "Automated onboarding, KYC, and transaction monitoring",
      "Real-time fraud and risk scoring",
      "Scalable, audit-ready cloud infrastructure",
    ],
    relatedServiceSlugs: ["api-integration-services", "cloud-application-modernization", "ai-fraud-detection-automation"],
    metaDescription:
      "API-first core architecture, automated KYC/fraud controls, and cloud-native infrastructure engineering for neobanks and digital-first banking platforms.",
    painPoints: [
      {
        title: "Core banking vendors that slow product velocity",
        description:
          "Many banking-as-a-service and core providers still require vendor-managed release cycles that conflict with a neobank's need to ship weekly.",
      },
      {
        title: "Onboarding drop-off from manual KYC steps",
        description:
          "Manual identity verification steps in account opening drive real drop-off at exactly the moment a neobank is trying to win a customer.",
      },
      {
        title: "Fraud exposure during rapid growth",
        description:
          "Fast user growth without real-time risk scoring creates fraud and account takeover exposure that scales faster than manual review can handle.",
      },
      {
        title: "Infrastructure that wasn't built for audit",
        description:
          "Cloud infrastructure stood up for speed at launch often lacks the audit logging and access controls a banking regulator will expect at scale.",
      },
    ],
    approach: [
      {
        title: "API-first core & ledger architecture",
        description:
          "Modern, well-documented APIs around account, ledger, and card issuing systems, built or integrated so product teams can ship without waiting on a core vendor release cycle.",
      },
      {
        title: "Automated onboarding & KYC",
        description:
          "Identity verification, sanctions/PEP screening, and document checks automated into account opening flows to cut drop-off while staying audit-ready.",
      },
      {
        title: "Real-time fraud & risk scoring",
        description:
          "Stream-processing risk engines score transactions and account activity in milliseconds, with continuous retraining as fraud patterns evolve.",
      },
      {
        title: "Cloud-native, audit-ready infrastructure",
        description:
          "Kubernetes-based, horizontally scalable infrastructure with the audit logging, access controls, and monitoring regulators and banking partners expect.",
      },
      {
        title: "Card issuing & payment rail integration",
        description:
          "Card issuing platforms and payment rails integrated behind a single API layer for consistent account and transaction experiences.",
      },
    ],
    faqs: [
      {
        question: "Can you help us launch faster than our current core banking vendor allows?",
        answer:
          "We build API middleware around core and BaaS providers so your product team can ship independently of the vendor's release cycle, similar to how we modernize legacy bank cores.",
      },
      {
        question: "How do you reduce onboarding drop-off while staying compliant?",
        answer:
          "We automate identity verification and sanctions screening directly into the account opening flow, so compliance checks run in seconds instead of creating a manual bottleneck.",
      },
      {
        question: "Can your fraud detection keep up with our growth rate?",
        answer:
          "Yes, our risk engines score transactions in real time and retrain continuously, so detection scales with transaction volume rather than degrading as you grow.",
      },
      {
        question: "Is your infrastructure ready for a banking partner or regulator security review?",
        answer:
          "We build audit logging, access controls, and monitoring in from the start, and our cybersecurity practice runs the same gap assessments we use to prepare fintechs for banking partner audits.",
      },
      {
        question: "Do you integrate with card issuing platforms?",
        answer:
          "Yes, we integrate card issuing and payment rails behind a single API layer alongside your core and ledger systems.",
      },
    ],
  },
  {
    slug: "web3-gaming-nft-platforms",
    name: "Web3 Gaming Studios & NFT Platforms",
    icon: "contract",
    summary:
      "Game studios building Web3 titles and NFT platforms need production-grade blockchain engineering for in-game assets, marketplaces, and player wallets — infrastructure that can handle real transaction volume and survive a security audit, not prototype contracts bolted onto a game client.",
    needs: [
      "In-game asset tokenization (NFT and semi-fungible items)",
      "Player wallet and marketplace infrastructure",
      "Smart contract audits for asset and marketplace contracts",
      "Cross-chain asset interoperability",
      "Fiat and crypto payment rails for in-game purchases",
    ],
    relatedServiceSlugs: ["smart-contract-development", "blockchain-cryptocurrency-development", "crypto-exchange-wallet-development"],
    metaDescription:
      "Audited NFT smart contracts, player wallet infrastructure, and in-game marketplace engineering for Web3 game studios and blockchain-based NFT platforms.",
    painPoints: [
      {
        title: "Asset contracts that weren't built for scale",
        description:
          "In-game NFT contracts prototyped for a demo often can't handle mainnet transaction volume or survive a marketplace's due diligence before listing.",
      },
      {
        title: "Marketplace and wallet infrastructure bolted onto a game client",
        description:
          "Player wallets and secondary marketplaces built as an afterthought create custody risk and a poor player experience.",
      },
      {
        title: "Cross-chain fragmentation",
        description:
          "Players and assets spread across multiple chains without an interoperability layer fragment liquidity and community.",
      },
      {
        title: "Payment friction for non-crypto-native players",
        description:
          "Requiring players to already hold crypto to make in-game purchases caps the addressable player base.",
      },
    ],
    approach: [
      {
        title: "Production-grade asset tokenization",
        description:
          "ERC-721 and ERC-1155 contracts for in-game items and collectibles, built with the same formal testing and audit-first process we use for exchange-grade token infrastructure.",
      },
      {
        title: "Player wallet & marketplace infrastructure",
        description:
          "Embedded player wallets and secondary marketplace infrastructure with custody architecture engineered for consumer-scale transaction volume.",
      },
      {
        title: "Independent smart contract audits",
        description:
          "Asset and marketplace contracts hardened and prepared for independent audit before any mainnet or marketplace listing.",
      },
      {
        title: "Cross-chain interoperability",
        description:
          "Bridging and multi-chain deployment so in-game assets and players aren't locked to a single network.",
      },
      {
        title: "Fiat and crypto payment rails for in-game purchases",
        description:
          "Fiat on-ramp and crypto payment integration so non-crypto-native players can purchase in-game assets without friction.",
      },
    ],
    faqs: [
      {
        question: "Can you build NFT infrastructure for in-game items that scales beyond a demo?",
        answer:
          "Yes, we build ERC-721/1155 asset contracts with formal test coverage and prepare them for independent audit, the same process we use for exchange-grade token contracts.",
      },
      {
        question: "Do you build player wallets and in-game marketplaces?",
        answer:
          "Yes, including embedded player wallet infrastructure and secondary marketplace contracts with custody architecture built for consumer transaction volume.",
      },
      {
        question: "Can our game's assets work across multiple blockchains?",
        answer:
          "Yes, we design cross-chain interoperability so assets and players aren't locked to a single network.",
      },
      {
        question: "Can non-crypto-native players buy in-game assets with a credit card?",
        answer:
          "Yes, we integrate fiat on-ramp and crypto payment rails so players without existing crypto holdings can still purchase in-game assets.",
      },
      {
        question: "Will our smart contracts be ready for an NFT marketplace's listing review?",
        answer:
          "We build contracts with an audit-first approach and coordinate independent third-party audits, which is typically what major marketplaces require before listing.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): IndustryContent | undefined {
  return industries.find((industry) => industry.slug === slug);
}
