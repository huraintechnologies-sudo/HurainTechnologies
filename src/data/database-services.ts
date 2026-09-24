// The database services family: Remote DBA plus seven specialist pages
// (consulting, migration, audit and one per platform). Shared by the
// DatabaseServicesSection block and the playbooks so every database page
// cross-links to the others at the same country / city level.

export const DATABASE_SERVICE_SLUGS = [
  "remote-dba-services",
  "database-consulting-services",
  "database-migration-services",
  "database-audit-services",
  "oracle-dba-support-services",
  "sql-server-dba-support-services",
  "postgresql-dba-support-services",
  "mysql-dba-support-services",
] as const;

export function isDatabaseService(slug: string): boolean {
  return (DATABASE_SERVICE_SLUGS as readonly string[]).includes(slug);
}

export interface DbServiceCard {
  title: string;
  description: string;
  bullets: string[];
  // Solution slug of the dedicated page, when there is one.
  slug?: string;
}

export const dbServiceCatalog: DbServiceCard[] = [
  {
    title: "Remote DBA Services",
    slug: "remote-dba-services",
    description: "Expert database administration without hiring a full in-house DBA team — we manage, monitor, maintain and optimise your databases remotely, 24/7.",
    bullets: ["Monitoring and health checks", "User and access management", "Query and index optimisation", "Backup monitoring and validation", "Capacity and storage planning", "Patching and maintenance", "Performance troubleshooting", "Incident diagnosis and resolution", "Preventive maintenance"],
  },
  {
    title: "Database Management Services",
    description: "The complete operational lifecycle of your database estate — structured administration that keeps production databases secure, stable and scalable.",
    bullets: ["Installation and configuration", "Schema and storage management", "Security settings and access controls", "Job monitoring and failure resolution", "Patching and version upgrades", "Resource and capacity planning", "Production operations support"],
  },
  {
    title: "Database Performance Tuning",
    description: "Find the real cause of slow applications — queries, indexes, configuration, resources or design — and fix it with measurable before/after results.",
    bullets: ["Slow-query optimisation", "Index analysis and tuning", "Execution-plan review", "Workload analysis", "Configuration tuning", "Disk, CPU and memory bottlenecks", "Response-time and throughput gains"],
  },
  {
    title: "Database Monitoring & Maintenance",
    description: "Catch problems before users do: health, performance, storage growth, failed jobs, replication lag and error trends watched around the clock.",
    bullets: ["24/7 health monitoring", "Alert review and response", "Disk and growth monitoring", "Job and scheduler monitoring", "Replication and sync checks", "Routine maintenance", "Consistency and integrity checks"],
  },
  {
    title: "Backup & Recovery Services",
    description: "Protect critical data and recover fast from failure, corruption or human error — with backups that are actually tested, not just scheduled.",
    bullets: ["Backup strategy and retention", "Backup monitoring and validation", "Regular restore testing", "Point-in-time recovery", "Disaster-recovery planning", "Recovery runbooks", "Business-continuity support"],
  },
  {
    title: "Database Audit & Security Review",
    slug: "database-audit-services",
    description: "An independent review of performance, access, backups, configuration and architecture, with a prioritised list of risks and fixes.",
    bullets: ["Health assessment", "Configuration review", "Access and privilege review", "Backup and recovery review", "Performance and resource review", "Security posture assessment", "Actionable recommendations"],
  },
  {
    title: "Database Migration Services",
    slug: "database-migration-services",
    description: "Upgrades, platform changes and cloud moves planned and executed with minimal downtime and full data validation.",
    bullets: ["Version upgrades", "Legacy to modern platform migration", "On-premise to cloud migration", "Cross-platform migration", "Schema and data movement planning", "Data validation and cutover", "Rollback planning"],
  },
  {
    title: "Database Consulting Services",
    slug: "database-consulting-services",
    description: "Architecture, platform selection, high availability and scaling strategy aligned with where your application and business are going.",
    bullets: ["Architecture planning", "Platform selection", "High-availability design", "Scalability roadmap", "Modernisation strategy", "Cost optimisation", "Operational improvement planning"],
  },
];

export const dbPlatforms: DbServiceCard[] = [
  {
    title: "Oracle DBA Support",
    slug: "oracle-dba-support-services",
    description: "Mission-critical Oracle environments managed with confidence — from RAC and Data Guard to patching and performance.",
    bullets: ["Oracle administration", "RAC and Data Guard", "Performance tuning (AWR/ASH)", "RMAN backup and recovery", "Patching and upgrades", "User, schema and storage management", "Troubleshooting and optimisation"],
  },
  {
    title: "SQL Server DBA Support",
    slug: "sql-server-dba-support-services",
    description: "Faster, more reliable Microsoft SQL Server for business-critical workloads, on-premise or in Azure.",
    bullets: ["SQL Server administration", "Always On availability groups", "Performance and index tuning", "Backup and recovery", "Maintenance-plan review", "Agent job monitoring", "Upgrades and Azure SQL migration"],
  },
  {
    title: "PostgreSQL DBA Support",
    slug: "postgresql-dba-support-services",
    description: "Optimised, monitored and highly available PostgreSQL — self-hosted or on RDS, Aurora, Cloud SQL and Azure.",
    bullets: ["PostgreSQL administration", "Query tuning and indexing", "Replication and Patroni HA", "pgBackRest backup and restore", "Vacuum and bloat management", "Security and role management", "Upgrades and migrations"],
  },
  {
    title: "MySQL DBA Support",
    slug: "mysql-dba-support-services",
    description: "Stable, fast and secure MySQL and MariaDB for web applications, SaaS platforms and business systems.",
    bullets: ["MySQL / MariaDB administration", "Slow-query optimisation", "Index and schema tuning", "Replication and Group Replication", "Backup and recovery (XtraBackup)", "Security and user access", "Health checks and production support"],
  },
];

// Industries the database practice serves; `industrySlug` links to the
// industry page where one exists.
export const dbIndustries: { name: string; industrySlug?: string }[] = [
  { name: "Healthcare", industrySlug: "healthtech-insurtech" },
  { name: "Fintech & banking", industrySlug: "banking-fintech" },
  { name: "Payments", industrySlug: "payments-psps" },
  { name: "Retail & e-commerce" },
  { name: "Logistics" },
  { name: "Manufacturing" },
  { name: "Oil & gas" },
  { name: "Real estate", industrySlug: "real-estate-proptech" },
  { name: "Travel & hospitality" },
  { name: "Education" },
  { name: "Government & public sector" },
  { name: "SaaS & technology", industrySlug: "enterprise-saas" },
];

export const dbTechnologies = [
  "Oracle Database", "Microsoft SQL Server", "PostgreSQL", "MySQL / MariaDB", "MongoDB", "Redis",
  "AWS RDS / Aurora", "Azure SQL", "Google Cloud SQL", "Database architecture", "Monitoring & observability",
  "Backup & recovery", "Performance tuning", "Data visualisation", "AI & machine learning", "Blockchain data",
];

export const dbBenefits = [
  { title: "Better performance", description: "Faster queries and pages, and lower CPU and cloud spend." },
  { title: "Higher uptime", description: "Proactive monitoring and HA designs that prevent outages." },
  { title: "Faster issue resolution", description: "24/7 on-call DBAs who know your environment." },
  { title: "Stronger security & governance", description: "Least-privilege access, encryption and audit trails." },
  { title: "Recovery you can trust", description: "Tested backups and documented disaster-recovery runbooks." },
  { title: "Lower operational risk", description: "Patched, documented, consistent environments." },
  { title: "Expertise without the headcount", description: "A full DBA team for less than one senior hire." },
  { title: "Scales with your business", description: "Coverage that grows with your data and workload." },
];

export const dbProcess = [
  { title: "Requirement understanding", weeks: "Step 1", description: "We learn your environment, current issues, workloads, business priorities and the support level you need." },
  { title: "Database assessment", weeks: "Step 2", description: "Performance, security, storage, backups, configuration and usage patterns reviewed and documented." },
  { title: "Planning & recommendations", weeks: "Step 3", description: "A prioritised action plan for administration, tuning, monitoring, migration, audit or support coverage." },
  { title: "Implementation & support", weeks: "Step 4", description: "We carry out the DBA work — tuning, maintenance, set-up, migration or troubleshooting — with change control." },
  { title: "Ongoing improvement", weeks: "Step 5", description: "Proactive monitoring, maintenance and optimisation for long-term reliability, with monthly reports." },
];

export const dbFaqs = [
  { question: "Do you provide database performance tuning?", answer: "Yes. We analyse slow queries, execution plans, indexes, configuration and server resources, fix the root causes and report before/after response times — as a one-off engagement or as part of ongoing DBA support." },
  { question: "Do you provide database audit services?", answer: "Yes. A database audit reviews health, configuration, access and privileges, backups and recovery, performance and security posture, and ends with a prioritised list of risks and recommended fixes." },
  { question: "Can you help with database migration?", answer: "Yes — version upgrades, cross-platform moves (for example Oracle or SQL Server to PostgreSQL) and on-premise to AWS, Azure or Google Cloud migrations, with data validation, rehearsed cutovers and rollback plans." },
  { question: "Do you offer ongoing database support?", answer: "Yes. Most clients use a monthly retainer with 24/7 monitoring and on-call response, routine maintenance, patching, tuning and monthly health reports. Coverage scales from a single instance to large multi-platform estates." },
];
