export interface ServiceVertical {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  keywords: string[];
  serviceSlug: string; // Main service this belongs to
}

export const serviceVerticals: ServiceVertical[] = [
  // Mobile App Development Verticals
  {
    id: "mobile-app-dev",
    slug: "mobile-app-development",
    name: "Mobile App Development",
    category: "Application Development",
    description: "Custom mobile app development for iOS, Android, and cross-platform solutions.",
    keywords: ["mobile app development", "iOS development", "Android development", "app creation", "mobile solutions"],
    serviceSlug: "smart-contract-development",
  },
  // Database administration (world coverage — see src/data/world-geo.ts)
  {
    id: "remote-dba",
    slug: "remote-dba-services",
    name: "Remote DBA Services",
    category: "Database Services",
    description: "24/7 remote database administration, monitoring, performance tuning, backup and recovery, migration and security for Oracle, SQL Server, MySQL, PostgreSQL, MongoDB and cloud databases.",
    keywords: ["remote DBA services", "database administration services", "database management services", "database performance tuning", "database migration services", "managed database support"],
    serviceSlug: "cloud-application-modernization",
  },
  // E-Commerce Verticals
  {
    id: "ecommerce-app",
    slug: "ecommerce-app",
    name: "E-Commerce App",
    category: "Application Development",
    description: "Complete e-commerce application development with payment integration and inventory management.",
    keywords: ["ecommerce app", "online store", "shopping app", "payment integration", "inventory management"],
    serviceSlug: "payment-gateway-integration",
  },
  // Food Delivery Verticals
  {
    id: "food-delivery",
    slug: "food-delivery",
    name: "Food Delivery App",
    category: "Application Development",
    description: "Full-featured food delivery platform development with real-time tracking and payments.",
    keywords: ["food delivery app", "restaurant app", "delivery platform", "restaurant management", "order tracking"],
    serviceSlug: "api-integration-services",
  },
  // Retail Software Verticals
  {
    id: "retail-software",
    slug: "retail-software-development",
    name: "Retail Software",
    category: "Industry Solutions",
    description: "Point of sale systems, inventory management, and retail analytics solutions.",
    keywords: ["retail software", "POS system", "inventory management", "retail analytics", "stock management"],
    serviceSlug: "cloud-application-modernization",
  },
  // Fintech Verticals
  {
    id: "fintech-app",
    slug: "fintech-app",
    name: "Fintech Application",
    category: "Blockchain & Crypto",
    description: "Secure fintech applications with compliance, payment processing, and trading features.",
    keywords: ["fintech app", "financial software", "payment app", "trading platform", "digital banking"],
    serviceSlug: "payment-gateway-integration",
  },
  // Healthcare Software Verticals
  {
    id: "healthcare-software",
    slug: "healthcare-software",
    name: "Healthcare Software",
    category: "Industry Solutions",
    description: "HIPAA-compliant healthcare management systems, EHR, and telemedicine solutions.",
    keywords: ["healthcare software", "medical software", "telemedicine", "EHR system", "patient management"],
    serviceSlug: "cloud-application-modernization",
  },
  // Hire Developers Verticals
  {
    id: "hire-developers",
    slug: "hire-developers",
    name: "Hire Developers",
    category: "Staffing",
    description: "Dedicated development teams, staff augmentation, and talent augmentation services.",
    keywords: ["hire developers", "development team", "software engineers", "tech talent", "developer hiring"],
    serviceSlug: "api-integration-services",
  },
  // AI/ML Solutions Verticals
  {
    id: "ai-ml-development",
    slug: "ai-ml-development",
    name: "AI & Machine Learning",
    category: "AI & Automation",
    description: "Custom AI/ML solutions for fraud detection, prediction, and intelligent automation.",
    keywords: ["AI development", "machine learning", "AI solutions", "ML models", "artificial intelligence"],
    serviceSlug: "ai-fraud-detection-automation",
  },
  // Web Application Development
  {
    id: "web-app-dev",
    slug: "web-application-development",
    name: "Web Application Development",
    category: "Application Development",
    description: "Full-stack web application development, progressive web apps, and enterprise web solutions with modern technologies.",
    keywords: ["web application development", "web app development", "web development company", "progressive web app", "enterprise web solutions", "SaaS development", "web platform development"],
    serviceSlug: "custom-software-development",
  },
  // SaaS Development
  {
    id: "saas-dev",
    slug: "saas-development",
    name: "SaaS Development",
    category: "Application Development",
    description: "Cloud-based Software-as-a-Service platforms with multi-tenancy, scalability, and subscription management features.",
    keywords: ["SaaS development", "cloud application", "subscription software", "cloud-based app", "SaaS platform development", "multi-tenant application"],
    serviceSlug: "custom-software-development",
  },
  // Cloud Application Modernization
  {
    id: "cloud-modernization",
    slug: "cloud-application-modernization",
    name: "Cloud Application Modernization",
    category: "Enterprise Solutions",
    description: "Legacy system modernization, cloud migration, and microservices architecture implementation for enterprise applications.",
    keywords: ["cloud modernization", "legacy system migration", "microservices", "cloud infrastructure", "application modernization", "digital transformation"],
    serviceSlug: "cloud-application-modernization",
  },
  // IoT & Embedded Systems
  {
    id: "iot-development",
    slug: "iot-embedded-systems",
    name: "IoT & Embedded Systems",
    category: "Emerging Technologies",
    description: "Internet of Things solutions, embedded systems development, and smart device integration for connected ecosystems.",
    keywords: ["IoT development", "embedded systems", "smart devices", "IoT platform", "connected devices", "IoT solutions"],
    serviceSlug: "custom-software-development",
  },
  // Blockchain & Web3
  {
    id: "blockchain-web3",
    slug: "blockchain-web3-development",
    name: "Blockchain & Web3",
    category: "Blockchain & Crypto",
    description: "Blockchain platform development, NFT marketplaces, decentralized applications, and Web3 infrastructure solutions.",
    keywords: ["blockchain development", "Web3 development", "NFT development", "decentralized apps", "crypto development", "smart contracts"],
    serviceSlug: "blockchain-cryptocurrency-development",
  },
  // E-Learning Platform
  {
    id: "elearning-platform",
    slug: "elearning-platform-development",
    name: "E-Learning Platform Development",
    category: "Application Development",
    description: "Online learning platform development with course management, video streaming, analytics, and interactive features.",
    keywords: ["e-learning platform", "learning management system", "online education app", "virtual classroom", "course platform", "educational software"],
    serviceSlug: "custom-software-development",
  },
  // Real Estate Solutions
  {
    id: "real-estate-software",
    slug: "real-estate-software",
    name: "Real Estate Software",
    category: "Industry Solutions",
    description: "Property management systems, real estate marketplaces, CRM for agents, and property listing platforms.",
    keywords: ["real estate software", "property management system", "real estate app", "property listing platform", "real estate CRM"],
    serviceSlug: "custom-software-development",
  },
  // Database services family (world coverage; see src/data/database-services.ts)
  {
    id: "database-consulting",
    slug: "database-consulting-services",
    name: "Database Consulting Services",
    category: "Database Services",
    description: "Database architecture, platform selection, high availability, scalability and modernisation strategy from senior database consultants.",
    keywords: ["database consulting services","database architecture consulting","database design consulting","high availability database design","database modernization strategy"],
    serviceSlug: "cloud-application-modernization",
  },
  {
    id: "database-migration",
    slug: "database-migration-services",
    name: "Database Migration Services",
    category: "Database Services",
    description: "Low-risk database upgrades, cross-platform migrations and on-premise to cloud moves with data validation and minimal downtime.",
    keywords: ["database migration services","Oracle to PostgreSQL migration","SQL Server migration","cloud database migration","database upgrade services"],
    serviceSlug: "cloud-application-modernization",
  },
  {
    id: "database-audit",
    slug: "database-audit-services",
    name: "Database Audit Services",
    category: "Database Services",
    description: "Independent database health, security, access, backup and performance audits with a prioritised remediation plan.",
    keywords: ["database audit services","database security audit","database health check","database performance audit","database compliance review"],
    serviceSlug: "cloud-application-modernization",
  },
  {
    id: "oracle-dba",
    slug: "oracle-dba-support-services",
    name: "Oracle DBA Support Services",
    category: "Database Services",
    description: "24/7 Oracle database administration, RAC and Data Guard, performance tuning, RMAN backup, patching and upgrades.",
    keywords: ["Oracle DBA support","Oracle DBA services","remote Oracle DBA","Oracle performance tuning","Oracle database support"],
    serviceSlug: "cloud-application-modernization",
  },
  {
    id: "sqlserver-dba",
    slug: "sql-server-dba-support-services",
    name: "SQL Server DBA Support Services",
    category: "Database Services",
    description: "24/7 Microsoft SQL Server administration, Always On, performance tuning, backup and recovery, and Azure SQL migration.",
    keywords: ["SQL Server DBA support","SQL Server DBA services","remote SQL Server DBA","SQL Server performance tuning","MSSQL support"],
    serviceSlug: "cloud-application-modernization",
  },
  {
    id: "postgresql-dba",
    slug: "postgresql-dba-support-services",
    name: "PostgreSQL DBA Support Services",
    category: "Database Services",
    description: "24/7 PostgreSQL administration, query tuning, replication and HA, backup and restore, upgrades and cloud Postgres support.",
    keywords: ["PostgreSQL DBA support","PostgreSQL DBA services","remote PostgreSQL DBA","PostgreSQL performance tuning","Postgres support"],
    serviceSlug: "cloud-application-modernization",
  },
  {
    id: "mysql-dba",
    slug: "mysql-dba-support-services",
    name: "MySQL DBA Support Services",
    category: "Database Services",
    description: "24/7 MySQL and MariaDB administration, slow-query optimisation, replication, backup and recovery, and production support.",
    keywords: ["MySQL DBA support","MySQL DBA services","remote MySQL DBA","MySQL performance tuning","MariaDB support"],
    serviceSlug: "cloud-application-modernization",
  },
];
