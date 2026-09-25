// Deep, solution-specific content for /solutions/[solution] and its country
// and city pages. Everything location-specific is layered on top of this in
// src/lib/solution-location-content.ts — this file is what makes a Food
// Delivery page actually read differently from a Healthcare page.

import { ContentBlock, FaqItem } from "@/lib/types";
import { databasePlaybooks } from "@/data/database-playbooks";
import { dbFaqs } from "@/data/database-services";

export interface SolutionPlaybook {
  slug: string;
  heroImage: { src: string; alt: string };
  headline: string; // H1 on the hub page
  answer: string; // 40–60 word direct answer: what it is and what we build
  overview: string[];
  features: ContentBlock[];
  useCases: ContentBlock[];
  phases: { title: string; weeks: string; description: string }[];
  mvpWeeks: string;
  fullWeeks: string;
  costDrivers: string[];
  techStack: { group: string; items: string[] }[];
  compliance: string[];
  faqs: FaqItem[];
  relatedServices: string[];
  relatedSolutions: string[];
  keywords: string[];
}

const IMG = (src: string, alt: string) => ({ src: `/images/${src}`, alt });

export const solutionPlaybooks: Record<string, SolutionPlaybook> = {
  "remote-dba-services": {
    slug: "remote-dba-services",
    heroImage: IMG("cloud-datacenter.jpg", "Database servers managed by Hurain Technologies remote DBAs"),
    headline: "Remote DBA Services — 24/7 Database Administration, Tuning & Support",
    answer:
      "Hurain Technologies provides remote DBA services: 24/7 monitoring, administration, performance tuning, backup and recovery, high availability, security audits and migrations for Oracle, Microsoft SQL Server, MySQL/MariaDB, PostgreSQL, MongoDB and managed cloud databases (AWS RDS/Aurora, Azure SQL, Google Cloud SQL) — without the cost of a full in-house DBA team.",
    overview: [
      "Every business application — ERP, e-commerce, banking, healthcare, logistics, analytics — is only as reliable as the database underneath it. Slow queries, a failed backup nobody noticed, or a storage volume filling up at 3 a.m. are the incidents that turn into outages. A remote DBA team exists to catch those problems before your customers do.",
      "Our DBAs work as an extension of your IT team. We onboard with a full health check, put proactive monitoring and alerting in place, and then take ownership of the day-to-day: patching, index and query tuning, capacity planning, backup validation and restore drills, user and access management, and incident response — around the clock.",
      "We support databases wherever they run: on-premise Linux, UNIX and Windows servers, private cloud, and fully managed services on AWS, Azure and Google Cloud. Engagements range from a monthly retainer for a single production instance to 24/7 coverage for large, multi-platform estates, and one-off projects such as upgrades, migrations and performance audits.",
    ],
    features: [
      { title: "24/7 monitoring & alerting", description: "Health, performance, replication, storage and backup jobs monitored around the clock, with on-call DBAs responding to alerts." },
      { title: "Performance tuning", description: "Slow-query analysis, execution-plan and index optimisation, configuration tuning and wait-event analysis to cut response times and CPU cost." },
      { title: "Backup, recovery & DR", description: "Backup strategy, automated verification, point-in-time recovery, regular restore drills and documented disaster-recovery runbooks." },
      { title: "High availability & replication", description: "Always On, Data Guard, Galera, Patroni and native replication designed, configured and monitored for failover you can trust." },
      { title: "Security & audit", description: "Access reviews, least-privilege roles, encryption at rest and in transit, patching and audit logging aligned with your compliance needs." },
      { title: "Migration & upgrades", description: "Version upgrades, cross-platform moves (e.g. Oracle or SQL Server to PostgreSQL) and on-premise to cloud migrations with minimal downtime." },
      { title: "Capacity planning", description: "Storage and workload trend analysis so you scale before you run out — and stop paying for capacity you don't use." },
      { title: "Cloud database management", description: "AWS RDS/Aurora, Azure SQL/Managed Instance and Google Cloud SQL tuned for performance and cost, with FinOps reporting." },
    ],
    useCases: [
      { title: "No in-house DBA", description: "Growing companies that need expert database care without hiring a full-time DBA team." },
      { title: "24/7 production support", description: "Businesses whose applications must stay up nights, weekends and holidays." },
      { title: "Performance problems", description: "Slow applications, timeouts or rising cloud bills traced to database design and queries." },
      { title: "Migration & modernisation", description: "Upgrading end-of-life versions, consolidating servers or moving databases to the cloud." },
    ],
    phases: [
      { title: "Discovery & health check", weeks: "Week 1", description: "Inventory of instances, versions, backups, HA setup, security and top performance issues, with a prioritised findings report." },
      { title: "Onboarding & access", weeks: "Week 1–2", description: "Secure access (VPN/bastion, named accounts), monitoring agents, alert routing and runbooks agreed with your team." },
      { title: "Stabilise", weeks: "Weeks 2–4", description: "Fix critical risks first: failing backups, missing HA, unpatched versions, and the worst-performing queries." },
      { title: "Run & optimise", weeks: "Ongoing", description: "24/7 monitoring, routine maintenance, tuning, capacity planning and monthly service reports." },
      { title: "Review & improve", weeks: "Quarterly", description: "Architecture, cost and security reviews with a roadmap for upgrades and improvements." },
    ],
    mvpWeeks: "1–2 weeks (onboarding and health check)",
    fullWeeks: "ongoing monthly support",
    costDrivers: ["Number of database instances and environments", "Database platforms and versions", "Coverage level (business hours vs 24/7 on-call)", "Size and transaction volume of the databases", "High-availability and DR complexity", "Compliance and audit requirements"],
    techStack: [
      { group: "Relational", items: ["Oracle", "Microsoft SQL Server", "PostgreSQL", "MySQL / MariaDB"] },
      { group: "NoSQL & cache", items: ["MongoDB", "Redis", "Cassandra", "Elasticsearch"] },
      { group: "Cloud", items: ["AWS RDS / Aurora", "Azure SQL", "Google Cloud SQL", "Oracle Cloud"] },
      { group: "Tooling", items: ["Prometheus / Grafana", "pgBackRest / RMAN", "Percona Toolkit", "Ansible"] },
    ],
    compliance: ["GDPR and local data-protection rules", "PCI DSS database controls", "ISO 27001 / SOC 2 audit evidence", "HIPAA safeguards for health data"],
    faqs: [
      { question: "What is a remote DBA service?", answer: "A remote DBA service is a team of database administrators who manage, monitor, tune and support your databases over a secure connection instead of on-site — usually on a monthly retainer, with 24/7 on-call cover for production issues." },
      { question: "Which databases do you support?", answer: "Oracle, Microsoft SQL Server, PostgreSQL, MySQL and MariaDB, MongoDB and Redis, plus managed cloud databases on AWS (RDS, Aurora), Azure (SQL Database, Managed Instance) and Google Cloud SQL, on Linux, UNIX and Windows." },
      { question: "Is remote DBA support secure?", answer: "Yes. We connect through your VPN or bastion host with named, least-privilege accounts and MFA, log every session, and never copy production data off your systems. NDAs and data-processing agreements are signed before access." },
      { question: "Remote DBA vs hiring an in-house DBA — which is cheaper?", answer: "For most companies a remote DBA service costs a fraction of one senior full-time DBA and gives you 24/7 coverage and multiple specialists (Oracle, SQL Server, PostgreSQL) instead of one person who needs holidays and sleep." },
      { question: "Can you migrate our database to the cloud or to PostgreSQL?", answer: "Yes. We plan and run version upgrades, platform migrations such as Oracle or SQL Server to PostgreSQL, and on-premise to AWS, Azure or Google Cloud moves, with replication-based cutovers to keep downtime to minutes." },
      ...dbFaqs.filter((f) => !f.question.startsWith("Can you help with database migration")),
    ],
    relatedServices: ["cloud-application-modernization", "cybersecurity-compliance", "api-integration-services"],
    relatedSolutions: ["database-consulting-services", "database-migration-services", "database-audit-services"],
    keywords: ["remote DBA services", "database administration services", "database management services", "database support services", "database performance tuning", "database migration services", "Oracle DBA support", "SQL Server DBA", "PostgreSQL DBA", "MySQL DBA"],
  },

  "mobile-app-development": {
    slug: "mobile-app-development",
    heroImage: IMG("hero-dashboard.jpg", "Mobile app dashboard designed by Hurain Technologies"),
    headline: "Mobile App Development Company for iOS, Android & Cross-Platform Apps",
    answer:
      "Hurain Technologies designs and builds native iOS, native Android and cross-platform (Flutter, React Native) apps — from a validated MVP in 8–12 weeks to production apps with payments, offline sync, push notifications and analytics — and supports them after launch on the App Store and Google Play.",
    overview: [
      "A mobile app is rarely just screens: it is an API, an admin panel, a payment flow, a notification system and a release pipeline that has to survive app-store review. We scope all of it together so launch day is not the first time those pieces meet.",
      "Most clients start cross-platform with Flutter or React Native to ship both stores from one codebase, and move performance-critical modules (camera, Bluetooth, background location) to native Swift or Kotlin only where it measurably helps.",
      "Every build includes crash reporting, analytics events agreed during discovery, and a staged rollout plan, so you can see real-user behaviour in the first week and iterate from data rather than guesses.",
    ],
    features: [
      { title: "Cross-platform & native", description: "Flutter or React Native for one shared codebase; Swift/Kotlin modules where hardware access or performance demands it." },
      { title: "Payments & wallets", description: "Card, wallet and local payment-rail checkout with 3-D Secure, refunds, receipts and webhook reconciliation." },
      { title: "Offline-first sync", description: "Local database with conflict-safe sync so field staff and customers on weak networks never lose work." },
      { title: "Push & in-app messaging", description: "Segmented FCM/APNs notifications, deep links and in-app inbox tied to real user events." },
      { title: "Secure authentication", description: "OTP, social login, biometrics and device binding, with token rotation and jailbreak/root checks for sensitive apps." },
      { title: "Admin panel & analytics", description: "Web dashboard to manage users, content and orders, plus product analytics and crash monitoring from day one." },
    ],
    useCases: [
      { title: "Consumer marketplaces", description: "Two-sided apps connecting buyers and sellers with listings, chat, payments and ratings." },
      { title: "Field-force & operations", description: "Offline-capable apps for inspections, deliveries, sales visits and asset tracking." },
      { title: "Fintech & wallets", description: "KYC onboarding, balances, transfers and card controls with bank-grade security." },
      { title: "Loyalty & customer apps", description: "Ordering, rewards and personalised offers for retail, F&B and service brands." },
    ],
    phases: [
      { title: "Discovery & UX", weeks: "1–2 weeks", description: "User journeys, feature priority, wireframes and a clickable prototype you can test with real users." },
      { title: "Architecture & design system", weeks: "1 week", description: "API contract, data model, UI kit and release pipeline agreed before sprint one." },
      { title: "MVP sprints", weeks: "6–8 weeks", description: "Two-week sprints with a TestFlight / Play internal build at the end of each one." },
      { title: "Store launch", weeks: "1 week", description: "Store listings, privacy labels, review submission and staged rollout." },
      { title: "Scale & support", weeks: "Ongoing", description: "Monitoring, OS-update compatibility, new features and performance tuning." },
    ],
    mvpWeeks: "8–12 weeks",
    fullWeeks: "4–6 months",
    costDrivers: ["Number of user roles (customer, driver, admin, vendor)", "Native vs cross-platform", "Payments, maps and real-time features", "Third-party integrations (ERP, CRM, KYC)", "Offline requirements and data volume", "Design complexity and custom animation"],
    techStack: [
      { group: "Mobile", items: ["Flutter", "React Native", "Swift / SwiftUI", "Kotlin / Jetpack Compose"] },
      { group: "Backend", items: ["Node.js", "NestJS", "Python / FastAPI", "PostgreSQL", "Redis"] },
      { group: "Cloud & DevOps", items: ["AWS / GCP", "Firebase", "Fastlane", "GitHub Actions"] },
      { group: "Quality", items: ["Crashlytics / Sentry", "Detox / Integration tests", "Mixpanel / Amplitude"] },
    ],
    compliance: ["App Store Review Guidelines and Google Play policies", "Privacy nutrition labels and data-safety forms", "OWASP MASVS for security-sensitive apps"],
    faqs: [
      { question: "Should I build native or cross-platform?", answer: "For most business apps, cross-platform (Flutter or React Native) is faster and cheaper because one team ships iOS and Android together. Choose native when the app depends heavily on device hardware, complex animation or platform-specific features." },
      { question: "Do you publish the app to the App Store and Google Play?", answer: "Yes. We prepare store listings, privacy disclosures and review notes, submit under your developer accounts, and handle any reviewer questions until the app is live." },
      { question: "Who owns the source code?", answer: "You do. Code lives in your repository from the first sprint and full IP transfers to you under the contract." },
    ],
    relatedServices: ["api-integration-services", "payment-gateway-integration", "cloud-application-modernization"],
    relatedSolutions: ["ecommerce-app", "food-delivery", "fintech-app"],
    keywords: ["mobile app development company", "iOS app development", "Android app development", "Flutter app development", "React Native developers", "app developers"],
  },

  "ecommerce-app": {
    slug: "ecommerce-app",
    heroImage: IMG("payment-terminal.jpg", "E-commerce checkout and payment terminal"),
    headline: "E-Commerce App & Online Store Development Company",
    answer:
      "Hurain Technologies builds e-commerce apps and online stores — custom, headless or on Shopify/WooCommerce — with local payment methods, tax-correct invoicing, inventory sync, delivery integrations and mobile apps, typically launching a first version in 8–14 weeks.",
    overview: [
      "E-commerce success depends less on the storefront and more on what sits behind it: payment success rates, stock accuracy, delivery promises and returns. We design the catalogue, checkout and operations flow as one system.",
      "We work three ways: extend a platform such as Shopify or WooCommerce when speed matters, build headless (Next.js front end on a commerce API) when brand experience and performance matter, or build fully custom for marketplaces and B2B pricing logic.",
      "Stores we build are SEO-ready from launch — structured product data, fast Core Web Vitals and clean URLs — because organic search is usually the cheapest customer channel an online store has.",
    ],
    features: [
      { title: "Local payment methods", description: "Cards, wallets, bank transfer, BNPL and cash-on-delivery with automatic reconciliation." },
      { title: "Tax-correct invoicing", description: "VAT/GST calculation, compliant invoice numbering and exports for your accountant." },
      { title: "Inventory & order management", description: "Multi-warehouse stock, backorders, POS sync and order routing to the nearest fulfilment point." },
      { title: "Delivery integrations", description: "Courier APIs for rates, labels and live tracking, plus delivery-slot booking." },
      { title: "Marketplace & multi-vendor", description: "Vendor onboarding, commission rules, payouts and seller dashboards." },
      { title: "Growth tooling", description: "Coupons, loyalty points, abandoned-cart recovery, reviews and product feeds for Google and Meta." },
    ],
    useCases: [
      { title: "D2C brands", description: "Fast headless stores with subscriptions and rich product storytelling." },
      { title: "Multi-vendor marketplaces", description: "Platforms where many sellers list, sell and get paid automatically." },
      { title: "B2B ordering portals", description: "Customer-specific price lists, credit terms, quotes and bulk re-ordering." },
      { title: "Grocery & quick commerce", description: "Slot-based delivery, substitutions and dark-store inventory." },
    ],
    phases: [
      { title: "Discovery", weeks: "1–2 weeks", description: "Catalogue structure, payment and delivery partners, tax setup and platform choice." },
      { title: "Design", weeks: "2 weeks", description: "Conversion-focused UX for listing, product, cart and checkout pages." },
      { title: "Build & integrate", weeks: "5–8 weeks", description: "Storefront, admin, payments, courier and ERP/accounting integrations." },
      { title: "Data migration & QA", weeks: "1–2 weeks", description: "Products, customers and orders migrated; payment and tax scenarios tested end to end." },
      { title: "Launch & optimise", weeks: "Ongoing", description: "Speed, conversion-rate and SEO improvements based on real traffic." },
    ],
    mvpWeeks: "8–14 weeks",
    fullWeeks: "4–7 months",
    costDrivers: ["Platform vs headless vs custom", "Number of SKUs and variants", "Single store vs multi-vendor marketplace", "ERP, POS and accounting integrations", "Number of payment and courier partners", "Mobile apps in addition to the web store"],
    techStack: [
      { group: "Storefront", items: ["Next.js", "Shopify Hydrogen", "React Native"] },
      { group: "Commerce", items: ["Shopify", "WooCommerce", "Medusa", "Custom Node.js"] },
      { group: "Data", items: ["PostgreSQL", "Elasticsearch / Meilisearch", "Redis"] },
      { group: "Integrations", items: ["Stripe / Adyen / local PSPs", "Courier APIs", "ERP & accounting APIs"] },
    ],
    compliance: ["PCI DSS scope reduction via hosted fields / tokenisation", "Consumer-protection rules on returns and pricing display", "Cookie consent and marketing-consent records"],
    faqs: [
      { question: "Shopify or a custom e-commerce build?", answer: "Shopify is the fastest route for a standard single-brand store. Custom or headless makes sense for marketplaces, complex B2B pricing, unusual fulfilment, or when platform fees and limits start costing more than owning the stack." },
      { question: "Can you migrate my existing store without losing SEO?", answer: "Yes. We map every old URL to its new one with 301 redirects, keep product structured data, and monitor Search Console after launch." },
      { question: "Do you build the mobile shopping app too?", answer: "Yes — usually from the same commerce back end, so web and app share products, carts, prices and orders." },
    ],
    relatedServices: ["payment-gateway-integration", "api-integration-services", "cybersecurity-compliance"],
    relatedSolutions: ["retail-software-development", "mobile-app-development", "food-delivery"],
    keywords: ["ecommerce app development", "ecommerce website development company", "online store development", "multi-vendor marketplace development", "Shopify developers", "headless commerce"],
  },

  "food-delivery": {
    slug: "food-delivery",
    heroImage: IMG("case-study-fintech.jpg", "Food delivery ordering and dispatch platform"),
    headline: "Food Delivery App Development — Customer, Restaurant & Rider Apps",
    answer:
      "Hurain Technologies builds complete food delivery platforms: a customer ordering app, a restaurant/merchant app, a rider app with live GPS tracking, and an admin panel for dispatch, commissions and payouts.",
    overview: [
      "A delivery platform is four products that have to agree with each other in real time: the customer who orders, the kitchen that accepts, the rider who collects and the operations team that watches it all. We build them on one event-driven back end so an order's status is never out of sync.",
      "The hard parts are operational — dispatch logic that assigns the right rider, accurate delivery-time estimates, peak-hour surge handling, and settlement that pays restaurants and riders correctly. That is where we spend most of the engineering effort.",
      "Whether you are an aggregator, a restaurant chain running its own delivery, or a cloud kitchen, we tailor the commission model, menu management and payment mix to how orders are actually paid for in your market.",
    ],
    features: [
      { title: "Customer ordering app", description: "Menus, modifiers, scheduled orders, reorder, promo codes and live order tracking on a map." },
      { title: "Restaurant / merchant app", description: "Order accept/reject, prep-time settings, menu and stock toggles, and daily settlement reports." },
      { title: "Rider app", description: "Job offers, turn-by-turn navigation, proof of delivery, cash collection and earnings." },
      { title: "Smart dispatch", description: "Auto-assignment by distance, rider load and prep time, with batching for nearby orders." },
      { title: "Payments & payouts", description: "Online and cash-on-delivery payments, commission rules, rider cash reconciliation and automated payouts." },
      { title: "Operations dashboard", description: "Live map of orders and riders, zones, surge fees, refunds and customer-support tools." },
    ],
    useCases: [
      { title: "Multi-restaurant aggregators", description: "Marketplace model with commissions, merchant onboarding and zone management." },
      { title: "Restaurant chains", description: "Own-brand ordering and delivery to cut third-party commission." },
      { title: "Cloud kitchens", description: "Multiple virtual brands from one kitchen with shared inventory." },
      { title: "Grocery & pharmacy delivery", description: "Same dispatch engine with catalogue, substitutions and prescription upload." },
    ],
    phases: [
      { title: "Discovery & operations design", weeks: "2 weeks", description: "Business model, commission rules, delivery zones and dispatch logic." },
      { title: "UX for four apps", weeks: "2 weeks", description: "Customer, merchant, rider and admin journeys designed together." },
      { title: "Core build", weeks: "6–8 weeks", description: "Ordering, real-time tracking, dispatch, payments and notifications." },
      { title: "Pilot in one zone", weeks: "2 weeks", description: "Soft launch with a handful of restaurants and riders to tune ETAs and dispatch." },
      { title: "City rollout", weeks: "Ongoing", description: "New zones, marketing integrations, loyalty and analytics." },
    ],
    mvpWeeks: "10–14 weeks",
    fullWeeks: "5–7 months",
    costDrivers: ["Aggregator vs single-brand model", "Dispatch sophistication (manual, auto-assign, batching)", "Number of payment methods incl. cash handling", "POS and aggregator integrations", "Map/routing provider and usage volume", "Number of cities and zones at launch"],
    techStack: [
      { group: "Apps", items: ["Flutter", "React Native", "Next.js admin"] },
      { group: "Real-time", items: ["WebSockets", "Redis Pub/Sub", "Firebase"] },
      { group: "Maps", items: ["Google Maps Platform", "Mapbox", "OSRM routing"] },
      { group: "Backend", items: ["Node.js / NestJS", "PostgreSQL + PostGIS", "Kafka / BullMQ"] },
    ],
    compliance: ["Food-safety and allergen display rules", "Gig-worker and rider data privacy", "Payment-card data kept out of scope via PSP tokenisation"],
    faqs: [
      { question: "What apps does a food delivery platform need?", answer: "Usually four: a customer app, a restaurant/merchant app (or tablet web app), a rider app, and a web admin panel for operations, commissions and payouts." },
      { question: "Can riders collect cash on delivery?", answer: "Yes. The rider app records cash collected per order and the admin panel reconciles rider balances before payouts." },
      { question: "Can it integrate with our POS?", answer: "Yes — we integrate with POS systems that expose an API so orders flow straight into the kitchen without re-keying." },
    ],
    relatedServices: ["api-integration-services", "payment-gateway-integration", "cloud-application-modernization"],
    relatedSolutions: ["mobile-app-development", "ecommerce-app", "retail-software-development"],
    keywords: ["food delivery app development", "restaurant ordering app", "delivery app like Uber Eats", "rider app development", "cloud kitchen software", "on-demand delivery platform"],
  },

  "retail-software-development": {
    slug: "retail-software-development",
    heroImage: IMG("hero-platform.jpg", "Retail point-of-sale and inventory platform"),
    headline: "Retail Software Development — POS, Inventory & Omnichannel Systems",
    answer:
      "Hurain Technologies builds retail software — cloud POS, multi-store inventory, omnichannel order management, loyalty and retail analytics — and integrates it with your e-commerce, accounting and supplier systems so stock and sales data are accurate across every channel.",
    overview: [
      "Retailers lose margin in the gaps between systems: stock that shows available online but is gone in store, loyalty points that don't follow the customer, and end-of-day reports stitched together in spreadsheets. Our retail builds close those gaps with one source of truth for products, stock and customers.",
      "We build POS that keeps selling when the internet drops and syncs safely when it returns, inventory that understands transfers, returns and shrinkage, and reporting that store managers actually open.",
      "Where off-the-shelf tools already work, we integrate rather than replace — connecting existing POS, ERP and e-commerce platforms through a middleware layer you control.",
    ],
    features: [
      { title: "Cloud POS", description: "Fast checkout, split payments, returns and offline mode with safe sync." },
      { title: "Multi-store inventory", description: "Real-time stock by location, transfers, purchase orders and stock-take tools." },
      { title: "Omnichannel orders", description: "Click-and-collect, ship-from-store and endless aisle from a single order system." },
      { title: "Loyalty & CRM", description: "Points, tiers, digital receipts and customer history across store and online." },
      { title: "Tax & fiscal compliance", description: "Correct VAT/GST, fiscal receipts and e-invoicing where regulations require it." },
      { title: "Retail analytics", description: "Sales by store, category and staff, sell-through, margin and replenishment suggestions." },
    ],
    useCases: [
      { title: "Fashion & lifestyle chains", description: "Size/colour variants, seasonal collections and store transfers." },
      { title: "Supermarkets & convenience", description: "High-volume checkout, weighing scales, promotions and expiry tracking." },
      { title: "Electronics & specialty", description: "Serial numbers, warranties, financing and service tickets." },
      { title: "Franchise networks", description: "Central catalogue and pricing with franchisee-level reporting." },
    ],
    phases: [
      { title: "Process mapping", weeks: "2 weeks", description: "Store, warehouse and head-office workflows mapped with your team." },
      { title: "Solution design", weeks: "1–2 weeks", description: "Build vs integrate decisions, hardware list and data model." },
      { title: "Build & integrate", weeks: "6–10 weeks", description: "POS, inventory, loyalty and integrations delivered in sprints." },
      { title: "Pilot store", weeks: "2–3 weeks", description: "One store live, staff training and fixes before wider rollout." },
      { title: "Rollout", weeks: "Phased", description: "Store-by-store rollout with data migration and support." },
    ],
    mvpWeeks: "10–14 weeks",
    fullWeeks: "5–8 months",
    costDrivers: ["Number of stores and warehouses", "Offline POS requirements", "Hardware (scanners, printers, scales)", "ERP / accounting / e-commerce integrations", "Fiscal and e-invoicing requirements", "Loyalty and analytics depth"],
    techStack: [
      { group: "POS & apps", items: ["React / Electron", "Flutter", "Android POS terminals"] },
      { group: "Backend", items: ["Node.js", "Java / Spring", "PostgreSQL"] },
      { group: "Sync", items: ["SQLite offline store", "Event queues", "CDC pipelines"] },
      { group: "Analytics", items: ["BigQuery / Redshift", "Metabase / Power BI"] },
    ],
    compliance: ["Fiscal receipt and e-invoicing rules where applicable", "PCI DSS via certified payment terminals", "Consumer data consent for loyalty programmes"],
    faqs: [
      { question: "Can the POS work without internet?", answer: "Yes. Sales are stored locally and synced when the connection returns, with conflict rules for stock and loyalty balances." },
      { question: "Will it integrate with our accounting software?", answer: "Yes — we post daily sales, tax and payment summaries to your accounting or ERP system through their APIs." },
      { question: "Do we have to replace our current POS?", answer: "Not necessarily. We often keep existing POS hardware and software and build the inventory, loyalty or reporting layer around it." },
    ],
    relatedServices: ["cloud-application-modernization", "api-integration-services", "payment-gateway-integration"],
    relatedSolutions: ["ecommerce-app", "saas-development", "ai-ml-development"],
    keywords: ["retail software development", "POS software development", "inventory management system", "omnichannel retail software", "retail ERP", "custom POS system"],
  },

  "fintech-app": {
    slug: "fintech-app",
    heroImage: IMG("case-study-fintech.jpg", "Fintech banking and payments application"),
    headline: "Fintech App Development — Wallets, Lending, Payments & Digital Banking",
    answer:
      "Hurain Technologies builds fintech applications — digital wallets, payment apps, lending platforms, neobank front ends and trading dashboards — with KYC/AML onboarding, ledger-grade accounting, fraud controls and audit logging designed around the rules of the regulator you operate under.",
    overview: [
      "Fintech products fail on trust, not features. Balances must reconcile to the cent, every state change must be auditable, and onboarding has to satisfy compliance without losing half your applicants. We start with the ledger, the audit trail and the compliance workflow, then build the experience on top.",
      "We have built payment gateways, wallets, crypto rails and banking integrations for regulated businesses, and we engineer the technical controls licensing reviews expect — segregation of duties, maker-checker approvals, immutable logs and data-residency options.",
      "We are engineers, not lawyers: we build to the requirements your compliance counsel sets and help translate them into systems your auditors can verify.",
    ],
    features: [
      { title: "Double-entry ledger", description: "Immutable, reconcilable ledger for balances, fees, holds and reversals." },
      { title: "KYC / KYB / AML", description: "Document and liveness checks, sanctions/PEP screening and ongoing transaction monitoring." },
      { title: "Payments & transfers", description: "Card issuing, local instant-payment rails, payouts and cross-border transfers." },
      { title: "Lending engine", description: "Applications, credit scoring, disbursement, repayment schedules and collections." },
      { title: "Fraud & risk controls", description: "Velocity rules, device fingerprinting and ML risk scores with case management." },
      { title: "Regulatory reporting", description: "Audit logs, maker-checker approvals and exports for regulators and auditors." },
    ],
    useCases: [
      { title: "Digital wallets", description: "Top-up, P2P transfers, bill payments and merchant QR payments." },
      { title: "Digital lending", description: "BNPL, micro-loans and SME credit with automated decisioning." },
      { title: "Neobank & card programmes", description: "Accounts, cards and spending controls on top of a banking-as-a-service partner." },
      { title: "Remittance", description: "Cross-border transfers with FX quotes, corridor compliance and payout partners." },
    ],
    phases: [
      { title: "Regulatory & product discovery", weeks: "2–3 weeks", description: "Licence model, partner banks, compliance requirements and core flows." },
      { title: "Architecture & security design", weeks: "2 weeks", description: "Ledger design, threat model, data residency and integration plan." },
      { title: "Core build", weeks: "8–12 weeks", description: "Onboarding, ledger, payments and admin controls built and tested." },
      { title: "Security & compliance testing", weeks: "2–3 weeks", description: "Penetration test, reconciliation tests and audit-trail review." },
      { title: "Controlled launch", weeks: "Ongoing", description: "Limited user rollout, monitoring and regulator-ready reporting." },
    ],
    mvpWeeks: "12–16 weeks",
    fullWeeks: "6–9 months",
    costDrivers: ["Licence model (own licence vs partner bank)", "KYC/AML vendor choice and checks per user", "Number of payment rails and partners", "Ledger complexity (multi-currency, holds, fees)", "Security certifications (PCI DSS, ISO 27001, SOC 2)", "Data-residency requirements"],
    techStack: [
      { group: "Core", items: ["Java / Kotlin", "Go", "Node.js", "PostgreSQL"] },
      { group: "Security", items: ["HSM / KMS", "Vault", "mTLS", "WAF"] },
      { group: "Integrations", items: ["Open Banking APIs", "Card issuing (BaaS)", "KYC vendors", "Instant-payment rails"] },
      { group: "Apps", items: ["Flutter", "React Native", "Next.js back-office"] },
    ],
    compliance: ["AML/CFT and sanctions screening", "PCI DSS for card data", "Data-protection and data-residency rules", "Regulator audit and reporting expectations"],
    faqs: [
      { question: "Do we need a licence to launch a fintech app?", answer: "It depends on what you do with customer money. Many startups launch through a licensed partner bank or EMI; others need their own licence. Your legal counsel decides the model — we build the technical controls it requires." },
      { question: "How do you keep balances accurate?", answer: "We use a double-entry ledger where every movement is an immutable pair of entries, with automated daily reconciliation against bank and PSP statements." },
      { question: "Can you integrate KYC and AML providers?", answer: "Yes. We integrate identity verification, sanctions/PEP screening and transaction-monitoring vendors, and build the case-management screens your compliance team uses." },
    ],
    relatedServices: ["payment-gateway-integration", "crypto-compliance-kyc-aml", "ai-fraud-detection-automation", "cybersecurity-compliance"],
    relatedSolutions: ["blockchain-web3-development", "mobile-app-development", "ai-ml-development"],
    keywords: ["fintech app development", "fintech software development company", "digital wallet development", "lending platform development", "neobank app development", "payment app development"],
  },

  "healthcare-software": {
    slug: "healthcare-software",
    heroImage: IMG("team-engineering.jpg", "Healthcare software engineering team"),
    headline: "Healthcare Software Development — Telemedicine, EHR & Patient Apps",
    answer:
      "Hurain Technologies develops healthcare software — telemedicine platforms, patient apps, clinic and hospital management systems, EHR/EMR integrations and remote-monitoring tools — with privacy-by-design, role-based access, audit trails and interoperability standards such as HL7 FHIR.",
    overview: [
      "Healthcare software has to be both easy for patients and dependable for clinicians who have no time for extra clicks. We design with doctors, nurses and front-desk staff in the room, then build systems that fit their existing day rather than adding to it.",
      "Patient data is among the most sensitive information any system holds. Every build includes encryption at rest and in transit, least-privilege access by role, full audit logs of who viewed what, and hosting in the region your health-data rules require.",
      "Interoperability matters as much as features: we integrate with labs, pharmacies, insurers and existing EHRs using HL7 v2, FHIR and vendor APIs so data flows without re-typing.",
    ],
    features: [
      { title: "Telemedicine", description: "Video consultations, e-prescriptions, waiting rooms and consultation notes." },
      { title: "Appointments & scheduling", description: "Online booking, reminders by SMS/WhatsApp, queue management and no-show tracking." },
      { title: "EHR / EMR", description: "Patient records, clinical notes, orders and results with FHIR-based interoperability." },
      { title: "Patient app", description: "Records, reports, prescriptions, payments and secure messaging with the care team." },
      { title: "Billing & insurance", description: "Invoicing, packages, insurance pre-authorisation and claims workflows." },
      { title: "Remote monitoring", description: "Wearable and device data with alert thresholds for chronic-care programmes." },
    ],
    useCases: [
      { title: "Clinics & polyclinics", description: "Scheduling, records, billing and patient communication in one system." },
      { title: "Hospitals", description: "Integration hubs connecting HIS, lab, radiology and pharmacy systems." },
      { title: "Digital-health startups", description: "Telehealth, mental-health and chronic-care apps built compliance-first." },
      { title: "Diagnostics & labs", description: "Home-sample booking, report delivery and doctor portals." },
    ],
    phases: [
      { title: "Clinical discovery", weeks: "2–3 weeks", description: "Workflows, data flows, compliance scope and integration inventory." },
      { title: "Design & validation", weeks: "2 weeks", description: "Clinician-tested prototypes and security architecture." },
      { title: "Build", weeks: "8–12 weeks", description: "Core modules, integrations, audit logging and access controls." },
      { title: "Security & UAT", weeks: "2–3 weeks", description: "Penetration testing, privacy review and user acceptance with clinical staff." },
      { title: "Go-live & support", weeks: "Ongoing", description: "Phased go-live, training and SLA-backed support." },
    ],
    mvpWeeks: "12–16 weeks",
    fullWeeks: "6–10 months",
    costDrivers: ["Number of modules (telehealth, EHR, billing, pharmacy)", "Integrations with existing HIS/EHR, labs and insurers", "Compliance scope and data-residency hosting", "Video and messaging volumes", "Device/wearable integrations", "Certification or audit requirements"],
    techStack: [
      { group: "Standards", items: ["HL7 FHIR", "HL7 v2", "DICOM viewers", "SNOMED / ICD-10"] },
      { group: "Apps", items: ["React / Next.js", "Flutter", "WebRTC"] },
      { group: "Backend", items: ["Node.js", "Python", "PostgreSQL", "FHIR servers"] },
      { group: "Security", items: ["Encryption at rest/in transit", "RBAC / ABAC", "Audit logging", "Regional cloud hosting"] },
    ],
    compliance: ["Health-data protection laws (e.g. HIPAA in the US, GDPR special-category data in the EU)", "Consent management and data-subject rights", "Audit trails and access reviews"],
    faqs: [
      { question: "Is your healthcare software HIPAA / GDPR compliant?", answer: "We build the technical safeguards those laws require — encryption, access control, audit logs, consent and breach detection — and host in compliant regions. Formal compliance also depends on your policies, so we work alongside your compliance lead." },
      { question: "Can you integrate with our existing EHR?", answer: "Yes, if it exposes HL7, FHIR or a vendor API. We build an integration layer so new apps can read and write records without changing the core EHR." },
      { question: "Do you build telemedicine video?", answer: "Yes, using WebRTC or a HIPAA-eligible video provider, with waiting rooms, recording controls and consultation notes." },
    ],
    relatedServices: ["cybersecurity-compliance", "api-integration-services", "cloud-application-modernization"],
    relatedSolutions: ["mobile-app-development", "saas-development", "ai-ml-development"],
    keywords: ["healthcare software development", "telemedicine app development", "EHR software development", "hospital management system", "patient app development", "HIPAA compliant software"],
  },

  "hire-developers": {
    slug: "hire-developers",
    heroImage: IMG("team-engineering.jpg", "Dedicated software developers available to hire"),
    headline: "Hire Dedicated Developers — Remote Teams & Staff Augmentation",
    answer:
      "Hurain Technologies provides vetted full-time developers and complete remote teams — React, Node.js, Python, Flutter, blockchain, DevOps and QA — who join your stand-ups, work in your repositories and tools, and can start within 1–2 weeks on monthly contracts with no long lock-in.",
    overview: [
      "Hiring locally is slow and expensive, and freelancers are hard to hold accountable. Our dedicated developers are full-time Hurain engineers assigned only to your product, managed day-to-day by you, with our engineering leadership behind them for code quality and continuity.",
      "You interview every candidate before they join. If someone is not the right fit, we replace them — and because the team shares our internal standards, knowledge transfer is documented rather than lost.",
      "Engagements range from one senior engineer extending your team to a cross-functional squad (developers, QA, DevOps, designer and project manager) that owns a product end to end.",
    ],
    features: [
      { title: "You interview & choose", description: "Shortlisted profiles in days; you run technical interviews and approve every hire." },
      { title: "Full-time & dedicated", description: "Engineers work only on your product, in your Slack, Jira and GitHub." },
      { title: "24/7 coverage", description: "Our team works around the clock, so your core hours, stand-ups and urgent issues are always covered." },
      { title: "Flexible scaling", description: "Add or reduce team members month to month as your roadmap changes." },
      { title: "IP & security", description: "NDAs, IP assignment, secure devices and access controls by default." },
      { title: "Engineering oversight", description: "Code reviews, mentoring and replacement guarantees from our tech leads." },
    ],
    useCases: [
      { title: "Staff augmentation", description: "Add one or two specialists to hit a deadline or fill a skills gap." },
      { title: "Dedicated product team", description: "A full squad that builds and runs a product under your direction." },
      { title: "Offshore development centre", description: "A long-term extension of your engineering organisation." },
      { title: "Legacy maintenance", description: "Keep existing systems running while your core team builds what's next." },
    ],
    phases: [
      { title: "Requirements call", weeks: "Day 1–2", description: "Skills, seniority, time-zone and team structure agreed." },
      { title: "Shortlist", weeks: "3–5 days", description: "Pre-vetted profiles shared with code samples and experience." },
      { title: "Your interviews", weeks: "Week 1", description: "You interview and select; optional paid trial task." },
      { title: "Onboarding", weeks: "Week 2", description: "Access, tooling, codebase walkthrough and first tickets." },
      { title: "Ongoing delivery", weeks: "Monthly", description: "Sprint delivery, monthly reviews and scaling up or down." },
    ],
    mvpWeeks: "1–2 weeks to start",
    fullWeeks: "monthly rolling",
    costDrivers: ["Seniority (junior, mid, senior, lead)", "Technology stack and niche skills", "Team size and composition", "Shift and coverage requirements", "Engagement length", "Need for a dedicated PM or tech lead"],
    techStack: [
      { group: "Frontend", items: ["React", "Next.js", "Angular", "Vue"] },
      { group: "Backend", items: ["Node.js", "Python", "Java", "Go", "PHP / Laravel"] },
      { group: "Mobile", items: ["Flutter", "React Native", "Swift", "Kotlin"] },
      { group: "Specialist", items: ["Solidity / Rust", "DevOps / Kubernetes", "Data / ML", "QA automation"] },
    ],
    compliance: ["NDA and IP assignment before access", "Least-privilege access to your systems", "Background-checked engineers"],
    faqs: [
      { question: "How fast can a developer start?", answer: "Usually within 1–2 weeks: shortlist in 3–5 days, your interviews, then onboarding." },
      { question: "What if the developer isn't a good fit?", answer: "We replace them, and the outgoing engineer hands over with documented knowledge transfer." },
      { question: "Do they work in my time zone?", answer: "Yes. Our team works 24/7, so developers are available during your core hours for stand-ups, reviews and pairing, whatever your time zone." },
    ],
    relatedServices: ["cloud-application-modernization", "api-integration-services", "cybersecurity-compliance"],
    relatedSolutions: ["web-application-development", "mobile-app-development", "saas-development"],
    keywords: ["hire developers", "hire dedicated developers", "offshore development team", "staff augmentation", "hire remote developers", "hire React developers"],
  },

  "ai-ml-development": {
    slug: "ai-ml-development",
    heroImage: IMG("blockchain-network.jpg", "AI and machine learning data network"),
    headline: "AI & Machine Learning Development — LLM Apps, Automation & Predictive Models",
    answer:
      "Hurain Technologies builds production AI: LLM-powered assistants and document automation with retrieval (RAG), fraud and risk models, demand forecasting, computer vision and AI agents that act inside your systems — with evaluation, guardrails, cost control and data privacy designed in from the start.",
    overview: [
      "Most AI projects stall between a promising demo and a dependable product. The gap is evaluation, data quality, integration and cost — so that is where we focus. Every AI feature we ship has a test set, measurable accuracy targets and a fallback when the model is unsure.",
      "We choose the simplest approach that works: a well-prompted LLM with retrieval over your documents, a classical ML model trained on your data, or a fine-tuned model when neither is enough. We are model-agnostic and design for swapping providers as prices and capabilities change.",
      "Your data stays yours. We use enterprise API terms that exclude training on your data, redact sensitive fields, and can deploy open-weight models in your own cloud when data may not leave it.",
    ],
    features: [
      { title: "LLM assistants & RAG", description: "Chat and search over your documents, policies and product data, with citations." },
      { title: "Document automation", description: "Extract, classify and validate data from invoices, IDs, contracts and forms." },
      { title: "AI agents & workflows", description: "Agents that call your APIs to complete tasks, with human approval where it matters." },
      { title: "Fraud & risk models", description: "Real-time scoring for transactions, onboarding and claims." },
      { title: "Forecasting & recommendations", description: "Demand, churn and next-best-offer models trained on your history." },
      { title: "Evaluation & MLOps", description: "Test sets, monitoring, drift detection, cost dashboards and versioned deployments." },
    ],
    useCases: [
      { title: "Customer support automation", description: "Answer and route tickets, draft replies and summarise conversations." },
      { title: "Back-office automation", description: "Turn manual document processing into straight-through workflows." },
      { title: "Fraud prevention", description: "Detect suspicious payments, accounts and claims before losses occur." },
      { title: "Sales & retail intelligence", description: "Forecast demand, personalise offers and price dynamically." },
    ],
    phases: [
      { title: "Use-case & data assessment", weeks: "1–2 weeks", description: "Pick the highest-value use case and confirm the data exists to support it." },
      { title: "Proof of value", weeks: "3–4 weeks", description: "Working prototype measured against an agreed evaluation set." },
      { title: "Production build", weeks: "6–10 weeks", description: "Integration, guardrails, monitoring and user interface." },
      { title: "Rollout", weeks: "2 weeks", description: "Pilot group, feedback loop and cost tuning." },
      { title: "Continuous improvement", weeks: "Ongoing", description: "Retraining, prompt updates and model upgrades." },
    ],
    mvpWeeks: "4–6 weeks (proof of value)",
    fullWeeks: "3–5 months",
    costDrivers: ["Data readiness and labelling effort", "LLM API usage vs self-hosted models", "Accuracy targets and evaluation depth", "Number of systems the AI must act in", "Privacy and on-premise requirements", "Real-time vs batch inference"],
    techStack: [
      { group: "Models", items: ["Claude", "GPT", "Llama / Mistral (open-weight)", "scikit-learn / XGBoost"] },
      { group: "Frameworks", items: ["Python", "PyTorch", "LangGraph", "LlamaIndex"] },
      { group: "Data", items: ["pgvector", "Pinecone", "BigQuery", "Airflow"] },
      { group: "MLOps", items: ["MLflow", "Weights & Biases", "Langfuse", "Docker / Kubernetes"] },
    ],
    compliance: ["Data-protection rules on automated decision-making", "The EU AI Act where applicable", "Human review for high-impact decisions"],
    faqs: [
      { question: "Will my data be used to train public AI models?", answer: "No. We use enterprise API terms that exclude training on your data, and can run open-weight models inside your own cloud if data must not leave it." },
      { question: "How do you stop the AI from making things up?", answer: "We ground answers in your documents with retrieval, require citations, test against an evaluation set, and make the system say 'I don't know' or hand off to a human when confidence is low." },
      { question: "How long before we see results?", answer: "We start with a measurable proof of value on your own data before you commit to a full production build; its timeline is agreed around your scope." },
    ],
    relatedServices: ["ai-fraud-detection-automation", "cloud-application-modernization", "api-integration-services"],
    relatedSolutions: ["saas-development", "fintech-app", "healthcare-software"],
    keywords: ["AI development company", "machine learning development", "LLM app development", "AI chatbot development", "generative AI solutions", "AI automation services"],
  },

  "web-application-development": {
    slug: "web-application-development",
    heroImage: IMG("api-developer.jpg", "Web application developer writing code"),
    headline: "Web Application Development Company — Portals, Dashboards & PWAs",
    answer:
      "Hurain Technologies builds custom web applications — customer portals, internal tools, dashboards, marketplaces and progressive web apps — using React/Next.js front ends and secure, well-documented APIs, with fast load times, accessibility and SEO built in.",
    overview: [
      "Custom web apps replace the spreadsheets, email chains and disconnected tools that slow a business down. We start by mapping who uses the system and what decisions they make, then design the smallest application that removes the most manual work.",
      "Our default stack — Next.js, TypeScript, Node.js or Python, PostgreSQL — is chosen for long-term maintainability and hiring, not fashion. Code is typed, tested and documented so your own team can take it over.",
      "Public-facing apps are engineered for Core Web Vitals and search visibility; internal apps for speed of daily use, keyboard shortcuts and role-based access.",
    ],
    features: [
      { title: "Customer & partner portals", description: "Self-service accounts, documents, orders, tickets and payments." },
      { title: "Dashboards & reporting", description: "Real-time KPIs, drill-downs and scheduled exports from multiple data sources." },
      { title: "Workflow automation", description: "Approvals, notifications and integrations that replace manual hand-offs." },
      { title: "Progressive web apps", description: "Installable, offline-capable web apps without app-store friction." },
      { title: "Role-based access & SSO", description: "Granular permissions, SSO (Google, Microsoft, SAML) and audit logs." },
      { title: "Performance & SEO", description: "Server rendering, caching and structured data for fast, discoverable pages." },
    ],
    useCases: [
      { title: "Internal operations tools", description: "Replace spreadsheets with structured, auditable workflows." },
      { title: "B2B customer portals", description: "Give clients self-service access to orders, invoices and support." },
      { title: "Booking & scheduling platforms", description: "Availability, reservations, payments and reminders." },
      { title: "Marketplaces & directories", description: "Listings, search, messaging and transactions." },
    ],
    phases: [
      { title: "Discovery", weeks: "1–2 weeks", description: "Users, workflows, data sources and success metrics." },
      { title: "UX & architecture", weeks: "1–2 weeks", description: "Wireframes, API design and infrastructure plan." },
      { title: "Build sprints", weeks: "4–8 weeks", description: "Working software demoed every two weeks on a staging URL." },
      { title: "QA & launch", weeks: "1 week", description: "Automated tests, security checks, data migration and go-live." },
      { title: "Iterate", weeks: "Ongoing", description: "Feature releases based on usage analytics and feedback." },
    ],
    mvpWeeks: "6–10 weeks",
    fullWeeks: "3–6 months",
    costDrivers: ["Number of user roles and screens", "Integrations with existing systems", "Real-time features", "Data migration from legacy tools", "Security and compliance requirements", "Hosting and uptime targets"],
    techStack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js / NestJS", "Python / Django", "GraphQL / REST"] },
      { group: "Data", items: ["PostgreSQL", "Redis", "Elasticsearch"] },
      { group: "Cloud", items: ["AWS", "Vercel", "Docker", "Terraform"] },
    ],
    compliance: ["OWASP Top 10 secure development", "WCAG 2.2 accessibility", "Data-protection consent and retention rules"],
    faqs: [
      { question: "Web app or mobile app — which do I need?", answer: "If users mainly work at a desk or you need to launch fast across devices, start with a responsive web app or PWA. Add native apps later when you need device features or app-store presence." },
      { question: "Can you take over an existing web application?", answer: "Yes. We start with a code and security audit, stabilise what's there, then improve it incrementally rather than rewriting by default." },
      { question: "Will the application be SEO-friendly?", answer: "Public pages are server-rendered with clean URLs, metadata, structured data and fast Core Web Vitals." },
    ],
    relatedServices: ["api-integration-services", "cloud-application-modernization", "cybersecurity-compliance"],
    relatedSolutions: ["saas-development", "hire-developers", "ecommerce-app"],
    keywords: ["web application development", "custom web app development company", "Next.js development", "progressive web app development", "web portal development", "dashboard development"],
  },

  "saas-development": {
    slug: "saas-development",
    heroImage: IMG("cloud-datacenter.jpg", "Cloud infrastructure for SaaS platforms"),
    headline: "SaaS Development Company — Multi-Tenant Platforms from MVP to Scale",
    answer:
      "Hurain Technologies builds SaaS products end to end: multi-tenant architecture, subscription billing, onboarding, role-based access, usage analytics and admin tooling — launching an MVP in 10–14 weeks and scaling it with SOC 2-ready security practices.",
    overview: [
      "The decisions that make or break a SaaS business are made early: how tenants are isolated, how plans and usage are billed, and how the product is deployed without downtime. We get those foundations right so growth doesn't force a rewrite.",
      "We have built B2B SaaS for payments, compliance and operations teams, and we design for enterprise buyers from day one — SSO, audit logs, data export and granular permissions are what move deals through procurement.",
      "Founders get a partner who thinks about activation and retention, not just tickets: we instrument onboarding and feature usage so you can see where customers get value and where they drop.",
    ],
    features: [
      { title: "Multi-tenant architecture", description: "Shared, schema-per-tenant or database-per-tenant isolation chosen for your security and cost needs." },
      { title: "Subscription billing", description: "Plans, trials, seats, usage-based pricing, invoices and dunning via Stripe or Paddle." },
      { title: "Onboarding & activation", description: "Self-serve sign-up, guided setup, sample data and in-app checklists." },
      { title: "Enterprise readiness", description: "SAML/OIDC SSO, SCIM provisioning, audit logs and data residency options." },
      { title: "Public API & webhooks", description: "Documented APIs and webhooks so customers can integrate and build on you." },
      { title: "Admin & analytics", description: "Internal super-admin, feature flags, usage metrics and churn signals." },
    ],
    useCases: [
      { title: "Vertical SaaS", description: "Industry-specific platforms for clinics, logistics, education or real estate." },
      { title: "B2B workflow tools", description: "Compliance, finance and operations tools sold to teams." },
      { title: "Productising services", description: "Turn an agency or consulting process into a subscription product." },
      { title: "Legacy to SaaS", description: "Convert on-premise software into a cloud subscription offering." },
    ],
    phases: [
      { title: "Product discovery", weeks: "2 weeks", description: "ICP, core job-to-be-done, pricing model and MVP scope." },
      { title: "Architecture", weeks: "1–2 weeks", description: "Tenancy model, billing, auth and infrastructure-as-code." },
      { title: "MVP build", weeks: "6–10 weeks", description: "Core workflow, billing, onboarding and admin." },
      { title: "Beta", weeks: "2–4 weeks", description: "Design partners use it for real; we instrument and fix." },
      { title: "Scale", weeks: "Ongoing", description: "Enterprise features, integrations, performance and SOC 2 readiness." },
    ],
    mvpWeeks: "10–14 weeks",
    fullWeeks: "5–8 months",
    costDrivers: ["Tenancy and data-isolation model", "Billing complexity (seats, usage, add-ons)", "Enterprise features (SSO, SCIM, audit)", "Number of integrations", "Compliance targets (SOC 2, ISO 27001)", "Multi-region hosting"],
    techStack: [
      { group: "App", items: ["Next.js", "TypeScript", "Node.js / NestJS"] },
      { group: "Data", items: ["PostgreSQL (RLS)", "Redis", "ClickHouse for analytics"] },
      { group: "Billing & auth", items: ["Stripe Billing", "Paddle", "Auth0 / Clerk / WorkOS"] },
      { group: "Infra", items: ["AWS / GCP", "Terraform", "Kubernetes", "OpenTelemetry"] },
    ],
    compliance: ["SOC 2 / ISO 27001-ready controls", "GDPR data-processing agreements and data export", "Tax on digital services (VAT/GST) via billing provider"],
    faqs: [
      { question: "How long does it take to build a SaaS MVP?", answer: "Typically 10–14 weeks for a focused MVP with sign-up, billing, the core workflow and an admin panel." },
      { question: "Which multi-tenancy model should we use?", answer: "Most B2B SaaS starts with a shared database and row-level security; regulated or enterprise-heavy products may need schema- or database-per-tenant isolation. We decide based on your security and cost profile." },
      { question: "Do you handle subscription billing and tax?", answer: "Yes. We integrate Stripe Billing or Paddle for plans, trials, usage pricing, invoices and tax calculation on digital services." },
    ],
    relatedServices: ["cloud-application-modernization", "api-integration-services", "cybersecurity-compliance"],
    relatedSolutions: ["web-application-development", "ai-ml-development", "hire-developers"],
    keywords: ["SaaS development company", "SaaS application development", "multi-tenant SaaS architecture", "SaaS MVP development", "B2B SaaS development", "subscription platform development"],
  },

  "cloud-application-modernization": {
    slug: "cloud-application-modernization",
    heroImage: IMG("cloud-datacenter.jpg", "Cloud data centre for application modernization"),
    headline: "Cloud Application Modernization — Legacy Migration, Microservices & DevOps",
    answer:
      "Hurain Technologies modernises legacy applications by migrating them to AWS, Azure or GCP, breaking monoliths into services where it pays off, containerising workloads, and adding CI/CD, observability and cost controls — incrementally, without a risky big-bang rewrite.",
    overview: [
      "Legacy systems usually still work — they are just slow to change, expensive to run and risky to touch. We modernise in slices using the strangler-fig pattern: new capabilities are built around the old system and traffic moves over gradually, so the business never stops.",
      "Not everything needs microservices. We assess each component and choose rehost, replatform, refactor or replace based on business value, and we say so when a well-structured monolith is the better answer.",
      "Every modernisation includes infrastructure-as-code, automated deployments, monitoring and a cloud-cost baseline, so the result is cheaper and safer to operate — not just newer.",
    ],
    features: [
      { title: "Assessment & roadmap", description: "Application inventory, dependency mapping and a 6-R migration plan with cost estimates." },
      { title: "Cloud migration", description: "Rehost and replatform to AWS, Azure or GCP with minimal downtime." },
      { title: "Refactoring & microservices", description: "Extract high-change domains into services behind stable APIs." },
      { title: "Containers & Kubernetes", description: "Docker images, Kubernetes or serverless runtimes with autoscaling." },
      { title: "CI/CD & IaC", description: "Terraform, automated testing and zero-downtime deployments." },
      { title: "Observability & FinOps", description: "Logs, metrics, tracing, alerting and ongoing cloud-cost optimisation." },
    ],
    useCases: [
      { title: "Data-centre exit", description: "Move on-premise workloads to the cloud before hardware refresh." },
      { title: "Monolith decomposition", description: "Speed up releases by splitting a large codebase along business domains." },
      { title: "Core banking & payments modernisation", description: "Wrap legacy cores with APIs and move channels to modern stacks." },
      { title: "Cost optimisation", description: "Right-size, autoscale and re-architect over-provisioned cloud estates." },
    ],
    phases: [
      { title: "Assess", weeks: "2–3 weeks", description: "Inventory, dependencies, risks, target architecture and business case." },
      { title: "Foundation", weeks: "2–4 weeks", description: "Landing zone, networking, security baseline, CI/CD and IaC." },
      { title: "Migrate in waves", weeks: "Per wave: 3–6 weeks", description: "Workloads moved in prioritised waves with rollback plans." },
      { title: "Optimise", weeks: "Ongoing", description: "Refactor hot spots, tune cost and improve reliability." },
      { title: "Operate", weeks: "Ongoing", description: "Managed DevOps/SRE with SLAs if you need it." },
    ],
    mvpWeeks: "4–6 weeks (first workload live)",
    fullWeeks: "3–12 months depending on estate",
    costDrivers: ["Number and complexity of applications", "Database size and migration method", "Downtime tolerance", "Refactor vs rehost mix", "Compliance and data-residency", "Target operating model (managed vs in-house)"],
    techStack: [
      { group: "Cloud", items: ["AWS", "Microsoft Azure", "Google Cloud"] },
      { group: "Runtime", items: ["Docker", "Kubernetes (EKS/AKS/GKE)", "Serverless"] },
      { group: "Automation", items: ["Terraform", "GitHub Actions / GitLab CI", "Argo CD"] },
      { group: "Observability", items: ["Prometheus / Grafana", "OpenTelemetry", "Datadog"] },
    ],
    compliance: ["Cloud security benchmarks (CIS)", "Data-residency and sovereignty rules", "Regulated-outsourcing notifications for financial firms"],
    faqs: [
      { question: "Do we need to rewrite our application to move to the cloud?", answer: "Usually not. Many workloads can be rehosted or replatformed first, then refactored selectively where it improves speed or cost." },
      { question: "How do you avoid downtime during migration?", answer: "We replicate data continuously, run old and new in parallel, and switch traffic gradually with a tested rollback plan." },
      { question: "Will the cloud be cheaper?", answer: "It can be, but only with right-sizing, autoscaling and cost monitoring. We set a cost baseline before migration and track it after." },
    ],
    relatedServices: ["cloud-application-modernization", "api-integration-services", "cybersecurity-compliance"],
    relatedSolutions: ["saas-development", "web-application-development", "hire-developers"],
    keywords: ["cloud application modernization", "legacy application modernization", "cloud migration services", "microservices migration", "DevOps services", "AWS migration company"],
  },

  "iot-embedded-systems": {
    slug: "iot-embedded-systems",
    heroImage: IMG("blockchain-hardware.jpg", "IoT and embedded hardware devices"),
    headline: "IoT & Embedded Systems Development — Devices, Firmware & Cloud Platforms",
    answer:
      "Hurain Technologies builds IoT solutions end to end: embedded firmware, device connectivity (BLE, Wi-Fi, LoRaWAN, cellular/NB-IoT), a secure cloud platform for millions of messages, real-time dashboards and mobile apps — plus over-the-air updates and device security.",
    overview: [
      "IoT projects cross three disciplines — hardware, cloud and apps — and most failures happen at the boundaries: devices that can't be updated, data that arrives late or not at all, and fleets nobody can manage at scale. We own the whole chain so those boundaries are designed, not discovered.",
      "We start from the job the data must do — alert a technician, bill a customer, predict a failure — and work back to sensor choice, sampling rate, connectivity and battery life.",
      "Security is built in from provisioning: unique device identities, encrypted transport, signed firmware and remote revocation, because a single compromised device should never compromise the fleet.",
    ],
    features: [
      { title: "Embedded firmware", description: "C/C++ and RTOS firmware for ESP32, STM32, nRF and similar microcontrollers." },
      { title: "Connectivity", description: "BLE, Wi-Fi, LoRaWAN, NB-IoT/LTE-M and gateway design for your environment." },
      { title: "IoT cloud platform", description: "MQTT ingestion, time-series storage, rules engine and alerting at scale." },
      { title: "OTA updates", description: "Signed, staged over-the-air firmware updates with rollback." },
      { title: "Dashboards & apps", description: "Real-time monitoring, device control and reporting on web and mobile." },
      { title: "Predictive analytics", description: "Anomaly detection and predictive-maintenance models on sensor data." },
    ],
    useCases: [
      { title: "Asset & fleet tracking", description: "GPS and condition tracking for vehicles, containers and equipment." },
      { title: "Smart buildings & energy", description: "Metering, occupancy and HVAC optimisation." },
      { title: "Industrial monitoring", description: "Machine health, OEE and predictive maintenance." },
      { title: "Agritech & cold chain", description: "Soil, climate and temperature monitoring with alerts." },
    ],
    phases: [
      { title: "Feasibility", weeks: "2 weeks", description: "Use case, sensors, connectivity, power budget and BOM estimate." },
      { title: "Prototype", weeks: "4–6 weeks", description: "Working devices on dev boards connected to a basic cloud dashboard." },
      { title: "Pilot", weeks: "6–8 weeks", description: "Field pilot with production-intent hardware, OTA and alerting." },
      { title: "Production", weeks: "8+ weeks", description: "Manufacturing support, provisioning, fleet management and scale testing." },
      { title: "Operate", weeks: "Ongoing", description: "Fleet monitoring, firmware updates and analytics." },
    ],
    mvpWeeks: "8–12 weeks (field pilot)",
    fullWeeks: "6–12 months",
    costDrivers: ["Custom hardware vs off-the-shelf devices", "Connectivity type and data volume", "Fleet size and message rate", "Battery-life requirements", "Certifications (CE/FCC)", "Analytics and ML depth"],
    techStack: [
      { group: "Embedded", items: ["C / C++", "FreeRTOS / Zephyr", "ESP32", "STM32"] },
      { group: "Connectivity", items: ["MQTT", "BLE", "LoRaWAN", "NB-IoT / LTE-M"] },
      { group: "Cloud", items: ["AWS IoT Core", "Azure IoT Hub", "EMQX", "TimescaleDB"] },
      { group: "Apps", items: ["React", "Flutter", "Grafana"] },
    ],
    compliance: ["Radio certifications (CE, FCC, local type approval)", "IoT security baselines (ETSI EN 303 645)", "Data-protection rules for location and personal data"],
    faqs: [
      { question: "Do you design custom hardware?", answer: "We design firmware and work with hardware partners for custom PCBs. For many projects, certified off-the-shelf devices are faster and cheaper, and we integrate those." },
      { question: "Which connectivity should we use?", answer: "BLE for short range to a phone, Wi-Fi indoors with power, LoRaWAN for long-range low-power sensors, and NB-IoT/LTE-M where you need cellular coverage without gateways." },
      { question: "Can firmware be updated remotely?", answer: "Yes. We implement signed, staged OTA updates with automatic rollback if a device fails to boot." },
    ],
    relatedServices: ["cloud-application-modernization", "api-integration-services", "cybersecurity-compliance"],
    relatedSolutions: ["ai-ml-development", "mobile-app-development", "saas-development"],
    keywords: ["IoT development company", "embedded systems development", "IoT app development", "firmware development", "IoT platform development", "industrial IoT solutions"],
  },

  "blockchain-web3-development": {
    slug: "blockchain-web3-development",
    heroImage: IMG("blockchain-network.jpg", "Blockchain network nodes"),
    headline: "Blockchain & Web3 Development — Smart Contracts, Tokens, Wallets & dApps",
    answer:
      "Hurain Technologies builds blockchain and Web3 products — audited smart contracts, token and stablecoin systems, NFT and tokenisation platforms, custodial and MPC wallets, and dApps on Ethereum, EVM layer-2s and Solana — with security reviews and compliance-aware design for regulated markets.",
    overview: [
      "Blockchain is only worth using when shared, verifiable state or programmable assets solve a real problem — settlement, ownership, transparency or interoperability. We start by testing that fit honestly and recommend a conventional database when it's the better tool.",
      "When on-chain is right, security dominates: contracts are immutable and hold real value. Our contracts follow audited standards (OpenZeppelin), are covered by unit, fuzz and invariant tests, and are reviewed internally before an independent audit.",
      "For regulated businesses we pair on-chain logic with off-chain controls — KYC-gated access, travel-rule data, transaction monitoring and custody policies — so the product can pass licensing and banking-partner reviews.",
    ],
    features: [
      { title: "Smart contracts", description: "Solidity and Rust contracts with tests, gas optimisation and upgrade strategy." },
      { title: "Tokens & stablecoins", description: "ERC-20/SPL tokens, mint/burn controls, allow-lists and reserve reporting." },
      { title: "Wallets & custody", description: "Non-custodial, custodial and MPC wallets with policy engines." },
      { title: "Tokenisation & NFTs", description: "Real-world-asset tokenisation, NFT marketplaces and on-chain ownership records." },
      { title: "dApp front ends", description: "Wallet connection, transaction UX and indexers for fast on-chain data." },
      { title: "Compliance tooling", description: "KYC gating, travel rule, blockchain analytics and audit trails." },
    ],
    useCases: [
      { title: "Crypto exchanges & payments", description: "Deposit/withdrawal rails, order books and merchant crypto payments." },
      { title: "Real-world asset tokenisation", description: "Real estate, funds and commodities represented on-chain." },
      { title: "Loyalty & ticketing", description: "Tokenised rewards and verifiable tickets." },
      { title: "Supply-chain provenance", description: "Tamper-evident records shared between partners." },
    ],
    phases: [
      { title: "Fit & design", weeks: "2 weeks", description: "Use-case validation, chain selection, token model and threat model." },
      { title: "Contracts", weeks: "3–6 weeks", description: "Contracts, tests and internal security review." },
      { title: "Platform build", weeks: "6–10 weeks", description: "Back end, wallets, indexers, admin and front end." },
      { title: "Audit & testnet", weeks: "3–4 weeks", description: "Independent audit, fixes and public testnet." },
      { title: "Mainnet & operate", weeks: "Ongoing", description: "Launch, monitoring, incident response and upgrades." },
    ],
    mvpWeeks: "10–16 weeks",
    fullWeeks: "5–9 months",
    costDrivers: ["Contract complexity and audit scope", "Chain(s) and bridges", "Custody model (MPC, HSM, non-custodial)", "Compliance integrations", "Indexing and data needs", "Exchange or liquidity integrations"],
    techStack: [
      { group: "Chains", items: ["Ethereum", "Polygon / Base / Arbitrum", "Solana", "Hyperledger Fabric"] },
      { group: "Contracts", items: ["Solidity", "Foundry / Hardhat", "Rust / Anchor", "OpenZeppelin"] },
      { group: "Infra", items: ["The Graph / custom indexers", "MPC custody providers", "Node providers"] },
      { group: "Apps", items: ["Next.js", "wagmi / viem", "Node.js"] },
    ],
    compliance: ["Virtual-asset licensing regimes (e.g. MiCA, VARA)", "FATF travel rule", "AML/CFT and sanctions screening"],
    faqs: [
      { question: "Which blockchain should we build on?", answer: "Ethereum layer-2s (Base, Arbitrum, Polygon) suit most EVM products for low fees and tooling; Solana suits high-throughput consumer apps; permissioned chains suit consortium use cases. We choose based on users, liquidity and compliance needs." },
      { question: "Are your smart contracts audited?", answer: "We test extensively and review internally, then coordinate an independent third-party audit before mainnet for any contract holding meaningful value." },
      { question: "Can a blockchain product be compliant?", answer: "Yes. We build KYC gating, travel-rule data exchange, transaction monitoring and custody controls to the requirements your licence and legal counsel specify." },
    ],
    relatedServices: ["blockchain-cryptocurrency-development", "smart-contract-development", "mpc-wallet-custody-infrastructure", "crypto-compliance-kyc-aml"],
    relatedSolutions: ["fintech-app", "saas-development", "ai-ml-development"],
    keywords: ["blockchain development company", "web3 development", "smart contract development", "NFT marketplace development", "token development", "dApp development"],
  },

  "elearning-platform-development": {
    slug: "elearning-platform-development",
    heroImage: IMG("blog-cover.jpg", "Online learning platform on a laptop"),
    headline: "E-Learning Platform Development — LMS, Course Marketplaces & Virtual Classrooms",
    answer:
      "Hurain Technologies builds e-learning platforms — custom LMS, course marketplaces, live virtual classrooms and corporate training portals — with secure video streaming, quizzes and certificates, progress analytics, payments and mobile apps that work on low bandwidth.",
    overview: [
      "Learners drop out when platforms are slow, confusing or disconnected from outcomes. We design around completion: short lessons, clear progress, reminders and assessments that show learners — and whoever pays — that learning is happening.",
      "We build for the realities of your audience, including adaptive video that works on mobile data, offline downloads, and local-language content, while protecting paid content from casual piracy.",
      "For institutions and companies we integrate with existing student-information, HR and SSO systems, and support standards like SCORM and xAPI so existing content keeps working.",
    ],
    features: [
      { title: "Course management", description: "Courses, modules, drip scheduling, cohorts and instructor tools." },
      { title: "Secure video streaming", description: "Adaptive HLS streaming, DRM/watermarking and offline downloads." },
      { title: "Live classes", description: "Virtual classrooms with attendance, recordings, whiteboards and breakout rooms." },
      { title: "Assessments & certificates", description: "Quizzes, assignments, proctoring options and verifiable certificates." },
      { title: "Payments & subscriptions", description: "One-off purchases, subscriptions, coupons, instalments and instructor payouts." },
      { title: "Learning analytics", description: "Progress, completion and engagement dashboards for learners, teachers and admins." },
    ],
    useCases: [
      { title: "EdTech startups", description: "Course marketplaces and test-prep apps." },
      { title: "Schools & universities", description: "Blended learning, virtual classrooms and assessment portals." },
      { title: "Corporate training", description: "Onboarding, compliance training and skills tracking." },
      { title: "Coaches & creators", description: "Branded academies with memberships and community." },
    ],
    phases: [
      { title: "Discovery", weeks: "1–2 weeks", description: "Learners, content types, business model and integrations." },
      { title: "Design", weeks: "2 weeks", description: "Learner and instructor experiences, mobile-first." },
      { title: "Build", weeks: "6–10 weeks", description: "Courses, video, assessments, payments and admin." },
      { title: "Content migration & pilot", weeks: "2 weeks", description: "Existing courses imported and a pilot cohort run." },
      { title: "Grow", weeks: "Ongoing", description: "Gamification, community, AI tutoring and analytics." },
    ],
    mvpWeeks: "8–12 weeks",
    fullWeeks: "4–7 months",
    costDrivers: ["Live classes vs recorded content", "Video hosting and DRM requirements", "Marketplace (multi-instructor) vs single academy", "Integrations (SIS, HRIS, SSO, SCORM)", "Mobile apps and offline mode", "Number of languages"],
    techStack: [
      { group: "Apps", items: ["Next.js", "React Native / Flutter"] },
      { group: "Video", items: ["Mux / Cloudflare Stream", "AWS MediaConvert", "WebRTC"] },
      { group: "Backend", items: ["Node.js", "Python / Django", "PostgreSQL"] },
      { group: "Standards", items: ["SCORM", "xAPI", "LTI", "OpenBadges"] },
    ],
    compliance: ["Child-privacy rules for under-18 learners (e.g. COPPA)", "Accessibility (WCAG 2.2)", "Student-records privacy"],
    faqs: [
      { question: "Should we use Moodle or build a custom LMS?", answer: "Moodle or an off-the-shelf LMS suits standard internal training. A custom platform makes sense when learning experience, monetisation or integrations are central to your business." },
      { question: "Can you protect paid video content?", answer: "Yes — signed URLs, watermarking and DRM make casual sharing and downloading much harder." },
      { question: "Does it work on slow mobile connections?", answer: "Yes. Adaptive streaming adjusts quality to bandwidth, and offline downloads let learners study without a connection." },
    ],
    relatedServices: ["cloud-application-modernization", "payment-gateway-integration", "api-integration-services"],
    relatedSolutions: ["saas-development", "mobile-app-development", "ai-ml-development"],
    keywords: ["e-learning platform development", "LMS development company", "online course platform", "virtual classroom software", "edtech app development", "corporate training platform"],
  },

  "real-estate-software": {
    slug: "real-estate-software",
    heroImage: IMG("global-map.jpg", "Real estate property listing and management platform"),
    headline: "Real Estate Software Development — Property Portals, CRM & Management Systems",
    answer:
      "Hurain Technologies builds real estate software — property listing portals, agent and broker CRMs, property- and tenant-management systems, rent-collection apps and tokenised-property platforms — with map search, lead routing, e-signatures and payment integrations.",
    overview: [
      "Real estate runs on leads, listings and long transactions. Software that wins in this industry makes listings easy to find, gets every lead to the right agent in minutes, and keeps deals and tenancies moving without paper.",
      "We build portals with fast map-based search and rich listings, CRMs that track every enquiry through to closing, and property-management tools that automate rent collection, maintenance and owner reporting.",
      "For developers and investors exploring fractional ownership, we also build compliant tokenisation platforms — but only where local law allows it.",
    ],
    features: [
      { title: "Listing portals", description: "Map and filter search, virtual tours, saved searches and alerts." },
      { title: "Agent & broker CRM", description: "Lead capture from portals and ads, auto-routing, follow-ups and pipeline reports." },
      { title: "Property management", description: "Leases, rent invoicing, maintenance tickets and owner statements." },
      { title: "Tenant & owner apps", description: "Payments, requests, documents and notices in one app." },
      { title: "Digital transactions", description: "E-signatures, document vaults, KYC and escrow-style milestones." },
      { title: "Tokenisation (where permitted)", description: "Fractional ownership records, investor onboarding and distributions." },
    ],
    useCases: [
      { title: "Property portals", description: "Marketplaces for sale and rental listings." },
      { title: "Brokerages", description: "CRM, listing syndication and agent performance." },
      { title: "Property managers & landlords", description: "Rent, maintenance and reporting at portfolio scale." },
      { title: "Developers", description: "Inventory, bookings, payment plans and buyer portals for new projects." },
    ],
    phases: [
      { title: "Discovery", weeks: "1–2 weeks", description: "Business model, listing sources, lead flow and integrations." },
      { title: "Design", weeks: "2 weeks", description: "Search, listing and CRM experiences." },
      { title: "Build", weeks: "6–10 weeks", description: "Portal, CRM, payments and admin." },
      { title: "Data & launch", weeks: "1–2 weeks", description: "Listings imported, SEO setup and go-live." },
      { title: "Grow", weeks: "Ongoing", description: "Analytics, AI valuation and new modules." },
    ],
    mvpWeeks: "8–12 weeks",
    fullWeeks: "4–7 months",
    costDrivers: ["Portal vs CRM vs property management scope", "Listing feed and MLS/portal integrations", "Map and search sophistication", "Payments and e-signature providers", "Mobile apps", "Tokenisation and investor compliance"],
    techStack: [
      { group: "Frontend", items: ["Next.js", "Mapbox / Google Maps", "React Native"] },
      { group: "Backend", items: ["Node.js", "PostgreSQL + PostGIS", "Elasticsearch"] },
      { group: "Integrations", items: ["E-signature APIs", "Payment gateways", "WhatsApp / SMS"] },
      { group: "Web3 (optional)", items: ["ERC-3643 / ERC-1400", "Polygon / Base"] },
    ],
    compliance: ["Real-estate advertising and agent-licensing rules", "Tenant data privacy", "Securities rules for tokenised property"],
    faqs: [
      { question: "Can you build a property portal like Zillow or Bayut?", answer: "Yes — map search, listings, agent profiles, lead capture and paid listing packages, scoped to your market and budget." },
      { question: "Can the CRM capture leads from portals and ads?", answer: "Yes. We integrate portal feeds, website forms, Facebook/Google lead ads and WhatsApp so every enquiry lands in the CRM and is routed to an agent." },
      { question: "Is property tokenisation legal?", answer: "It depends on the jurisdiction and structure; many regimes treat property tokens as securities. We build tokenisation platforms only alongside your legal counsel's structure." },
    ],
    relatedServices: ["blockchain-cryptocurrency-development", "payment-gateway-integration", "api-integration-services"],
    relatedSolutions: ["web-application-development", "mobile-app-development", "blockchain-web3-development"],
    keywords: ["real estate software development", "property management software", "real estate portal development", "real estate CRM", "proptech development", "property listing website"],
  },
};

Object.assign(solutionPlaybooks, databasePlaybooks);

export function getPlaybook(slug: string): SolutionPlaybook | undefined {
  return solutionPlaybooks[slug];
}
