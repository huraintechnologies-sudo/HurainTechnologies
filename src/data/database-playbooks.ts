// Playbooks for the specialist database services (the Remote DBA playbook
// lives in solution-playbooks.ts). Merged into solutionPlaybooks there.

import type { SolutionPlaybook } from "@/data/solution-playbooks";
import { dbFaqs } from "@/data/database-services";

const IMG = (src: string, alt: string) => ({ src: `/images/${src}`, alt });

const ongoingFaq = dbFaqs.find((f) => f.question.startsWith("Do you offer ongoing"))!;

const dbCompliance = ["GDPR and local data-protection rules", "PCI DSS database controls", "ISO 27001 / SOC 2 audit evidence", "HIPAA safeguards for health data"];

const platformPhases = (platform: string): SolutionPlaybook["phases"] => [
  { title: "Environment review", weeks: "Week 1", description: `Inventory of ${platform} instances, versions, HA/DR set-up, backups, security and the top performance issues.` },
  { title: "Secure onboarding", weeks: "Week 1–2", description: "VPN/bastion access with named, least-privilege accounts, monitoring agents, alert routing and runbooks." },
  { title: "Stabilise & fix risks", weeks: "Weeks 2–4", description: `Critical ${platform} risks first: failing backups, missing patches, HA gaps and the worst-performing queries.` },
  { title: "24/7 run & optimise", weeks: "Ongoing", description: "Monitoring, maintenance, tuning, capacity planning and monthly health reports." },
  { title: "Quarterly review", weeks: "Quarterly", description: "Upgrade roadmap, cost and security review, and architecture improvements." },
];

export const databasePlaybooks: Record<string, SolutionPlaybook> = {
  "database-consulting-services": {
    slug: "database-consulting-services",
    heroImage: IMG("api-developer.jpg", "Database architecture consulting session"),
    headline: "Database Consulting Services — Architecture, Scalability & Modernisation",
    answer:
      "Hurain Technologies provides database consulting: architecture design, platform selection (Oracle, SQL Server, PostgreSQL, MySQL, MongoDB, cloud), high-availability and disaster-recovery design, scalability and sharding strategy, cost optimisation and modernisation roadmaps — delivered by senior DBAs and data architects.",
    overview: [
      "Most database problems are decided long before they appear: a schema that can't scale, a single server with no failover, a licence model that becomes unaffordable, or a cloud set-up that costs twice what it should. Database consulting fixes those decisions early — or untangles them when they are already hurting.",
      "We start from your application's workload and growth plans, then recommend the architecture, platform and operating model that fits: which database, which HA pattern, how to partition data, what to run managed in the cloud and what to keep self-hosted.",
      "You get a written architecture and roadmap, not just advice — and if you want, the same team implements it and supports it 24/7 afterwards.",
    ],
    features: [
      { title: "Architecture design", description: "Schema, partitioning, read/write scaling and data-flow design for your workload." },
      { title: "Platform selection", description: "Oracle, SQL Server, PostgreSQL, MySQL, MongoDB or managed cloud — chosen on workload, skills and total cost." },
      { title: "High availability & DR", description: "Failover clusters, replication topologies, RPO/RTO targets and tested recovery plans." },
      { title: "Scalability roadmap", description: "Caching, read replicas, sharding and archiving strategies before growth becomes an outage." },
      { title: "Cost optimisation", description: "Licence reviews, right-sizing and cloud FinOps for database spend." },
      { title: "Modernisation strategy", description: "Moving from legacy or commercial databases to modern, open or managed platforms." },
    ],
    useCases: [
      { title: "New product architecture", description: "Choose and design the right database before you build." },
      { title: "Scaling a growing app", description: "Plan for 10× traffic without a rewrite." },
      { title: "Licence and cost reduction", description: "Cut Oracle/SQL Server licence and cloud costs." },
      { title: "Resilience planning", description: "Design HA and DR to meet business and regulator expectations." },
    ],
    phases: [
      { title: "Discovery", weeks: "Week 1", description: "Workload, growth plans, current architecture, pain points and constraints." },
      { title: "Assessment", weeks: "Weeks 1–2", description: "Performance, availability, security and cost analysis of the current estate." },
      { title: "Architecture & roadmap", weeks: "Weeks 2–3", description: "Target architecture, options with trade-offs, and a phased roadmap." },
      { title: "Implementation (optional)", weeks: "Per plan", description: "Our DBAs implement the changes with change control and rollback." },
      { title: "Ongoing support", weeks: "Ongoing", description: "24/7 DBA support to keep the new architecture healthy." },
    ],
    mvpWeeks: "2–3 weeks (assessment and roadmap)",
    fullWeeks: "ongoing advisory or implementation",
    costDrivers: ["Number of databases and applications in scope", "Platforms and versions", "Depth of performance and security analysis", "Whether we also implement the roadmap", "HA/DR and compliance requirements", "Cloud vs on-premise estate"],
    techStack: [
      { group: "Relational", items: ["Oracle", "SQL Server", "PostgreSQL", "MySQL"] },
      { group: "NoSQL & analytics", items: ["MongoDB", "Redis", "ClickHouse", "Snowflake"] },
      { group: "Cloud", items: ["AWS RDS / Aurora", "Azure SQL", "Cloud SQL / AlloyDB"] },
      { group: "HA & scaling", items: ["Patroni", "Always On", "Data Guard", "Vitess / Citus"] },
    ],
    compliance: dbCompliance,
    faqs: [
      { question: "What does a database consultant do?", answer: "A database consultant reviews how your data is stored, served and protected, then designs the architecture, platform, high-availability and scaling approach that fits your workload, budget and growth plans — usually delivered as a written assessment and roadmap." },
      { question: "Should we use PostgreSQL, MySQL, SQL Server or Oracle?", answer: "It depends on your workload, existing skills, licensing budget and ecosystem. PostgreSQL is the default for most new systems; SQL Server and Oracle suit organisations invested in those ecosystems. We compare options on performance, cost and risk for your case." },
      { question: "How long does a database consulting engagement take?", answer: "An assessment and roadmap typically takes 2–3 weeks. Implementation depends on the roadmap and can be done by our team." },
      ongoingFaq,
    ],
    relatedServices: ["cloud-application-modernization", "cybersecurity-compliance", "api-integration-services"],
    relatedSolutions: ["remote-dba-services", "database-migration-services", "database-audit-services"],
    keywords: ["database consulting services", "database architecture consulting", "database design consultant", "high availability database design", "database scalability consulting", "database modernization"],
  },

  "database-migration-services": {
    slug: "database-migration-services",
    heroImage: IMG("cloud-datacenter.jpg", "Database migration to the cloud"),
    headline: "Database Migration Services — Upgrades, Cross-Platform & Cloud Migrations",
    answer:
      "Hurain Technologies migrates databases with minimal downtime: version upgrades, cross-platform moves (Oracle or SQL Server to PostgreSQL, MySQL to Aurora), on-premise to AWS, Azure or Google Cloud, and consolidations — with schema conversion, replication-based cutover, full data validation and a tested rollback plan.",
    overview: [
      "A database migration is the riskiest change most companies make to their systems: data can be lost or silently corrupted, applications can break on subtle SQL differences, and a cutover that overruns becomes an outage. We treat migration as an engineering project with rehearsals, not a weekend task.",
      "We assess compatibility first, convert schemas and code, then use continuous replication (native replication, AWS DMS, GoldenGate-style CDC or logical replication) so the new database stays in sync until cutover. That keeps the final switch to minutes rather than hours.",
      "Every migration ends with row counts, checksums and application testing against the new platform — and a rollback path you've actually rehearsed.",
    ],
    features: [
      { title: "Compatibility assessment", description: "Schema, stored procedures, data types and application SQL reviewed for the target platform." },
      { title: "Schema & code conversion", description: "Tables, indexes, procedures, triggers and functions converted and tested." },
      { title: "Continuous replication", description: "CDC-based sync so source and target stay aligned until cutover." },
      { title: "Data validation", description: "Row counts, checksums and business-rule checks to prove nothing was lost." },
      { title: "Rehearsed cutover", description: "Dry runs, timed runbooks and a tested rollback plan." },
      { title: "Post-migration tuning", description: "Performance tuning on the new platform and 24/7 hypercare." },
    ],
    useCases: [
      { title: "Version upgrades", description: "End-of-life Oracle, SQL Server, PostgreSQL or MySQL versions upgraded safely." },
      { title: "Commercial to open source", description: "Oracle or SQL Server to PostgreSQL to cut licence costs." },
      { title: "On-premise to cloud", description: "Move to RDS, Aurora, Azure SQL or Cloud SQL." },
      { title: "Consolidation", description: "Merge many small databases or servers into fewer, managed ones." },
    ],
    phases: [
      { title: "Assessment", weeks: "1–2 weeks", description: "Inventory, compatibility report, target design and migration strategy." },
      { title: "Conversion", weeks: "2–6 weeks", description: "Schema and code conversion, test environment build and application testing." },
      { title: "Replication & validation", weeks: "1–3 weeks", description: "Continuous sync, data validation and performance testing on the target." },
      { title: "Cutover", weeks: "Hours", description: "Rehearsed cutover in a planned window with rollback ready." },
      { title: "Hypercare", weeks: "2–4 weeks", description: "24/7 monitoring and tuning on the new platform." },
    ],
    mvpWeeks: "4–12 weeks depending on size",
    fullWeeks: "with 2–4 weeks hypercare",
    costDrivers: ["Database size and number of schemas", "Source and target platforms", "Amount of stored procedures and application SQL", "Downtime tolerance", "Data-validation depth", "Number of environments"],
    techStack: [
      { group: "Sources & targets", items: ["Oracle", "SQL Server", "PostgreSQL", "MySQL / MariaDB"] },
      { group: "Migration tooling", items: ["AWS DMS & SCT", "Azure DMS", "ora2pg", "pgloader"] },
      { group: "Replication", items: ["Logical replication", "Debezium CDC", "GoldenGate-style CDC"] },
      { group: "Cloud", items: ["RDS / Aurora", "Azure SQL", "Cloud SQL / AlloyDB"] },
    ],
    compliance: dbCompliance,
    faqs: [
      { question: "How much downtime does a database migration need?", answer: "With replication-based migration, usually minutes: the target is kept in sync while you keep working, and only the final switch-over needs a short window." },
      { question: "Can you migrate Oracle to PostgreSQL?", answer: "Yes. We convert schemas, PL/SQL and data types, test the application against PostgreSQL, and use replication for a short, rehearsed cutover." },
      { question: "How do you make sure no data is lost?", answer: "We validate with row counts, checksums and business-rule checks on every table, and keep a tested rollback path until you sign off." },
      ongoingFaq,
    ],
    relatedServices: ["cloud-application-modernization", "cybersecurity-compliance", "api-integration-services"],
    relatedSolutions: ["remote-dba-services", "database-consulting-services", "postgresql-dba-support-services"],
    keywords: ["database migration services", "Oracle to PostgreSQL migration", "SQL Server to PostgreSQL", "cloud database migration", "database upgrade services", "AWS RDS migration"],
  },

  "database-audit-services": {
    slug: "database-audit-services",
    heroImage: IMG("team-engineering.jpg", "Database audit and security review"),
    headline: "Database Audit Services — Security, Performance & Health Reviews",
    answer:
      "Hurain Technologies performs independent database audits covering health, configuration, access and privileges, backup and recovery readiness, performance and security posture — for Oracle, SQL Server, PostgreSQL, MySQL and cloud databases — and delivers a prioritised risk report with clear fixes.",
    overview: [
      "Databases drift. Accounts accumulate privileges, backups quietly stop being tested, patches fall behind and configuration changes pile up. A database audit gives you an honest, independent picture of where you stand before an outage, a breach or an auditor finds it.",
      "Our audit combines automated checks with hands-on DBA review of configuration, users and roles, encryption, backups and restores, replication and HA, performance hot spots and operational processes.",
      "You receive a clear report ranking every finding by risk and effort, plus the evidence many compliance frameworks ask for. We can fix the findings for you or hand them to your team.",
    ],
    features: [
      { title: "Health assessment", description: "Versions, patch levels, storage, errors and stability across every instance." },
      { title: "Access & privilege review", description: "Users, roles, shared accounts and excessive privileges identified." },
      { title: "Security posture", description: "Encryption, network exposure, auditing and hardening against benchmarks." },
      { title: "Backup & recovery review", description: "Backup coverage, retention and a real restore test." },
      { title: "Performance review", description: "Top queries, waits and resource bottlenecks with quick wins." },
      { title: "Prioritised report", description: "Findings ranked by risk and effort with clear remediation steps." },
    ],
    useCases: [
      { title: "Before a compliance audit", description: "Evidence and fixes ahead of ISO 27001, SOC 2, PCI DSS or regulator reviews." },
      { title: "After an incident", description: "Understand what failed and what else is at risk." },
      { title: "New DBA or vendor", description: "A baseline before taking over an unfamiliar estate." },
      { title: "Annual health check", description: "A yearly independent review of critical databases." },
    ],
    phases: [
      { title: "Scoping", weeks: "Days 1–2", description: "Instances, access method, compliance context and priorities agreed." },
      { title: "Data collection", weeks: "Week 1", description: "Automated checks and configuration, user and log collection (read-only)." },
      { title: "Expert review", weeks: "Week 1–2", description: "DBA analysis of security, backups, HA and performance." },
      { title: "Report & walkthrough", weeks: "Week 2", description: "Prioritised findings presented to your team." },
      { title: "Remediation (optional)", weeks: "Per plan", description: "We implement the fixes and re-test." },
    ],
    mvpWeeks: "1–2 weeks",
    fullWeeks: "with optional remediation",
    costDrivers: ["Number of instances and platforms", "Compliance framework in scope", "Depth of security testing", "Restore testing requirements", "Remediation included or not", "On-premise vs cloud"],
    techStack: [
      { group: "Platforms", items: ["Oracle", "SQL Server", "PostgreSQL", "MySQL"] },
      { group: "Benchmarks", items: ["CIS Benchmarks", "Vendor hardening guides"] },
      { group: "Tooling", items: ["Native audit logs", "pgAudit", "SQL Server Audit", "Percona Toolkit"] },
      { group: "Cloud", items: ["AWS RDS", "Azure SQL", "Cloud SQL"] },
    ],
    compliance: ["ISO 27001 / SOC 2 evidence", "PCI DSS requirements for databases", "GDPR and local data-protection rules", "CIS database benchmarks"],
    faqs: [
      { question: "What is a database audit?", answer: "An independent review of a database's health, configuration, users and privileges, backups, performance and security, ending with a prioritised list of risks and fixes." },
      { question: "Will the audit affect our production database?", answer: "No. Data collection is read-only and lightweight, scheduled at quiet times, and we never copy production data off your systems." },
      { question: "How long does a database audit take?", answer: "Usually 1–2 weeks for a typical estate, including the report and a walkthrough with your team." },
      ongoingFaq,
    ],
    relatedServices: ["cybersecurity-compliance", "cloud-application-modernization", "api-integration-services"],
    relatedSolutions: ["remote-dba-services", "database-consulting-services", "database-migration-services"],
    keywords: ["database audit services", "database security audit", "database health check", "database performance review", "database compliance audit", "SQL Server audit"],
  },

  "oracle-dba-support-services": {
    slug: "oracle-dba-support-services",
    heroImage: IMG("cloud-datacenter.jpg", "Oracle database servers"),
    headline: "Oracle DBA Support Services — 24/7 Oracle Administration & Tuning",
    answer:
      "Hurain Technologies provides 24/7 Oracle DBA support: administration, RAC and Data Guard, AWR/ASH-based performance tuning, RMAN backup and recovery, patching and upgrades, and Oracle to cloud or PostgreSQL migrations — for Oracle 12c, 19c, 21c and 23ai on-premise, on Exadata and on OCI/AWS.",
    overview: [
      "Oracle usually runs the systems a business cannot live without — ERP, core banking, billing — so every hour of downtime or slow response is expensive. Oracle DBA skills are also scarce and costly to hire.",
      "Our Oracle DBAs take over day-to-day administration and on-call cover: health monitoring, RMAN backups and restore tests, quarterly patching, RAC and Data Guard management, and performance tuning using AWR, ASH and SQL plan management.",
      "We also help reduce Oracle cost — licence reviews, consolidation, and where it makes sense, migration of suitable workloads to PostgreSQL.",
    ],
    features: [
      { title: "Oracle administration", description: "Instances, tablespaces, users, schemas and storage managed day to day." },
      { title: "RAC & Data Guard", description: "Clusters and standby databases configured, monitored and switch-over tested." },
      { title: "Performance tuning", description: "AWR/ASH analysis, SQL tuning, plan stability and memory configuration." },
      { title: "RMAN backup & recovery", description: "Backup strategy, validation and regular restore drills." },
      { title: "Patching & upgrades", description: "Release updates applied with testing; upgrades to 19c and 23ai." },
      { title: "Cost & licence optimisation", description: "Licence reviews, consolidation and selective PostgreSQL migration." },
    ],
    useCases: [
      { title: "ERP & E-Business Suite", description: "Stable, fast Oracle for business-critical applications." },
      { title: "Core banking & billing", description: "High-availability Oracle with strict RPO/RTO." },
      { title: "Upgrade to 19c / 23ai", description: "Move off unsupported versions safely." },
      { title: "Oracle to cloud", description: "Move to OCI, AWS RDS for Oracle or PostgreSQL." },
    ],
    phases: platformPhases("Oracle"),
    mvpWeeks: "1–2 weeks (onboarding and health check)",
    fullWeeks: "ongoing monthly support",
    costDrivers: ["Number of Oracle instances and environments", "RAC / Data Guard complexity", "Coverage level (business hours vs 24/7)", "Database size and transaction volume", "Upgrade or migration projects", "Compliance requirements"],
    techStack: [
      { group: "Oracle", items: ["Oracle 19c / 21c / 23ai", "RAC", "Data Guard", "ASM"] },
      { group: "Tools", items: ["RMAN", "AWR / ASH", "OEM", "Data Pump"] },
      { group: "Platforms", items: ["Linux / UNIX", "Exadata", "OCI", "AWS RDS for Oracle"] },
      { group: "Migration", items: ["ora2pg", "AWS SCT", "GoldenGate-style CDC"] },
    ],
    compliance: dbCompliance,
    faqs: [
      { question: "Which Oracle versions do you support?", answer: "Oracle 11g through 23ai, including RAC, Data Guard and ASM, on Linux, UNIX, Windows, Exadata, OCI and AWS RDS for Oracle." },
      { question: "Can you help us reduce Oracle licence costs?", answer: "Yes — through licence and usage reviews, consolidation, right-sizing, and migrating suitable workloads to PostgreSQL." },
      { question: "Do you provide 24/7 Oracle support?", answer: "Yes. Our Oracle DBAs monitor your databases around the clock and respond to critical incidents at any hour." },
      ongoingFaq,
    ],
    relatedServices: ["cloud-application-modernization", "cybersecurity-compliance", "api-integration-services"],
    relatedSolutions: ["remote-dba-services", "database-migration-services", "postgresql-dba-support-services"],
    keywords: ["Oracle DBA support services", "remote Oracle DBA", "Oracle database administration", "Oracle performance tuning", "Oracle RAC support", "Oracle Data Guard support"],
  },

  "sql-server-dba-support-services": {
    slug: "sql-server-dba-support-services",
    heroImage: IMG("hero-platform.jpg", "Microsoft SQL Server database platform"),
    headline: "SQL Server DBA Support Services — 24/7 Microsoft SQL Server Administration",
    answer:
      "Hurain Technologies provides 24/7 SQL Server DBA support: administration, Always On availability groups, index and query tuning, backup and recovery, maintenance plans, Agent job monitoring, security, and upgrades or migration to Azure SQL — for SQL Server 2014 to 2022 on-premise and in Azure/AWS.",
    overview: [
      "SQL Server runs a huge share of business applications — ERP, CRM, finance and line-of-business systems. It is easy to install and just as easy to let drift: missing index maintenance, un-tested backups, failed Agent jobs nobody notices, and old versions out of support.",
      "Our SQL Server DBAs manage the platform end to end: monitoring and alerting, Always On and log-shipping HA, index and statistics maintenance, Query Store-based tuning, backup and restore tests, and security hardening.",
      "We also plan and run upgrades to SQL Server 2022 and migrations to Azure SQL Managed Instance or AWS RDS for SQL Server — or to PostgreSQL where licence savings justify it.",
    ],
    features: [
      { title: "SQL Server administration", description: "Instances, databases, logins, storage and configuration managed." },
      { title: "Always On & HA", description: "Availability groups, failover clusters and log shipping designed and monitored." },
      { title: "Performance tuning", description: "Query Store, execution plans, indexes, statistics and tempdb tuning." },
      { title: "Backup & recovery", description: "Backup strategy, verification and regular restore tests." },
      { title: "Maintenance & jobs", description: "Maintenance plans reviewed and Agent jobs monitored for failures." },
      { title: "Upgrades & Azure", description: "Upgrades to SQL Server 2022 and migration to Azure SQL or AWS RDS." },
    ],
    useCases: [
      { title: "ERP & CRM databases", description: "Dynamics, SAP B1 and custom apps kept fast and available." },
      { title: "Always On deployments", description: "HA designed and failover tested regularly." },
      { title: "End-of-support upgrades", description: "Move off SQL Server 2012/2014/2016 safely." },
      { title: "Move to Azure", description: "Azure SQL Database or Managed Instance migrations." },
    ],
    phases: platformPhases("SQL Server"),
    mvpWeeks: "1–2 weeks (onboarding and health check)",
    fullWeeks: "ongoing monthly support",
    costDrivers: ["Number of SQL Server instances", "Always On / cluster complexity", "Coverage level (business hours vs 24/7)", "Database size and workload", "Upgrade or Azure migration projects", "Compliance requirements"],
    techStack: [
      { group: "SQL Server", items: ["SQL Server 2016–2022", "Always On AGs", "Failover clustering", "SSIS / SSRS"] },
      { group: "Tools", items: ["Query Store", "SSMS", "Ola Hallengren maintenance", "PowerShell / dbatools"] },
      { group: "Cloud", items: ["Azure SQL Database", "Azure SQL MI", "AWS RDS for SQL Server"] },
      { group: "Monitoring", items: ["Extended Events", "Grafana", "Azure Monitor"] },
    ],
    compliance: dbCompliance,
    faqs: [
      { question: "Which SQL Server versions do you support?", answer: "SQL Server 2012 through 2022 on Windows and Linux, plus Azure SQL Database, Azure SQL Managed Instance and AWS RDS for SQL Server." },
      { question: "Can you set up Always On availability groups?", answer: "Yes. We design, configure and monitor Always On, run regular failover tests and document the recovery procedures." },
      { question: "Can you migrate SQL Server to Azure?", answer: "Yes — to Azure SQL Database or Managed Instance, with compatibility assessment, data sync and a short cutover." },
      ongoingFaq,
    ],
    relatedServices: ["cloud-application-modernization", "cybersecurity-compliance", "api-integration-services"],
    relatedSolutions: ["remote-dba-services", "database-migration-services", "database-audit-services"],
    keywords: ["SQL Server DBA support services", "remote SQL Server DBA", "SQL Server performance tuning", "SQL Server Always On support", "MSSQL DBA", "Azure SQL migration"],
  },

  "postgresql-dba-support-services": {
    slug: "postgresql-dba-support-services",
    heroImage: IMG("blockchain-network.jpg", "PostgreSQL database cluster"),
    headline: "PostgreSQL DBA Support Services — 24/7 Postgres Administration & Tuning",
    answer:
      "Hurain Technologies provides 24/7 PostgreSQL DBA support: administration, query and index tuning, vacuum and bloat management, streaming replication and Patroni high availability, pgBackRest backup and point-in-time recovery, upgrades, and support for Amazon RDS/Aurora, Google Cloud SQL/AlloyDB and Azure Database for PostgreSQL.",
    overview: [
      "PostgreSQL is now the default database for new applications — powerful, open source and free of licence costs. But it rewards expertise: autovacuum settings, connection pooling, replication and query plans all need tuning as data grows.",
      "Our PostgreSQL DBAs keep your clusters fast and safe: monitoring and alerting, query and index optimisation, vacuum and bloat control, Patroni or managed-service HA, pgBackRest backups with point-in-time recovery, and major-version upgrades with minimal downtime.",
      "We support self-hosted Postgres on Linux and Kubernetes as well as every major managed service, and help teams moving from Oracle or SQL Server to PostgreSQL.",
    ],
    features: [
      { title: "PostgreSQL administration", description: "Roles, schemas, extensions, configuration and connection pooling managed." },
      { title: "Query & index tuning", description: "pg_stat_statements, EXPLAIN analysis and index strategy for fast queries." },
      { title: "Vacuum & bloat control", description: "Autovacuum tuning and bloat removal to keep performance stable." },
      { title: "Replication & HA", description: "Streaming replication, Patroni clusters and automatic failover." },
      { title: "Backup & PITR", description: "pgBackRest or managed backups with point-in-time recovery and restore tests." },
      { title: "Upgrades & migration", description: "Major-version upgrades and migrations from Oracle or SQL Server." },
    ],
    useCases: [
      { title: "SaaS platforms", description: "Multi-tenant Postgres kept fast as tenants grow." },
      { title: "Managed cloud Postgres", description: "RDS, Aurora, Cloud SQL and Azure tuned for performance and cost." },
      { title: "High availability", description: "Patroni clusters with automatic failover." },
      { title: "Moving to Postgres", description: "Migrations from Oracle, SQL Server or MySQL." },
    ],
    phases: platformPhases("PostgreSQL"),
    mvpWeeks: "1–2 weeks (onboarding and health check)",
    fullWeeks: "ongoing monthly support",
    costDrivers: ["Number of clusters and replicas", "Self-hosted vs managed service", "Coverage level (business hours vs 24/7)", "Data size and write volume", "Upgrade or migration projects", "Compliance requirements"],
    techStack: [
      { group: "PostgreSQL", items: ["PostgreSQL 12–17", "Patroni", "PgBouncer", "PostGIS / TimescaleDB"] },
      { group: "Backup", items: ["pgBackRest", "Barman", "WAL-G"] },
      { group: "Cloud", items: ["RDS / Aurora", "Cloud SQL / AlloyDB", "Azure Database for PostgreSQL"] },
      { group: "Monitoring", items: ["pg_stat_statements", "Prometheus / Grafana", "pgBadger"] },
    ],
    compliance: dbCompliance,
    faqs: [
      { question: "Do you support managed PostgreSQL like RDS and Aurora?", answer: "Yes — Amazon RDS and Aurora, Google Cloud SQL and AlloyDB, and Azure Database for PostgreSQL, as well as self-hosted Postgres on Linux and Kubernetes." },
      { question: "Can you set up PostgreSQL high availability?", answer: "Yes. We build Patroni-based clusters with automatic failover, or configure Multi-AZ/HA on managed services, and test failover regularly." },
      { question: "Can you migrate us from Oracle to PostgreSQL?", answer: "Yes. We convert schemas and PL/SQL, validate data and run a replication-based cutover with minimal downtime." },
      ongoingFaq,
    ],
    relatedServices: ["cloud-application-modernization", "cybersecurity-compliance", "api-integration-services"],
    relatedSolutions: ["remote-dba-services", "database-migration-services", "mysql-dba-support-services"],
    keywords: ["PostgreSQL DBA support services", "remote PostgreSQL DBA", "PostgreSQL performance tuning", "Postgres consulting", "Patroni high availability", "Aurora PostgreSQL support"],
  },

  "mysql-dba-support-services": {
    slug: "mysql-dba-support-services",
    heroImage: IMG("api-developer.jpg", "MySQL database administration"),
    headline: "MySQL DBA Support Services — 24/7 MySQL & MariaDB Administration",
    answer:
      "Hurain Technologies provides 24/7 MySQL DBA support: administration of MySQL 5.7/8.x and MariaDB, slow-query and index optimisation, replication and Group Replication/InnoDB Cluster, XtraBackup backup and recovery, security, upgrades, and support for Amazon RDS/Aurora MySQL, Cloud SQL and Azure Database for MySQL.",
    overview: [
      "MySQL powers a large share of the web — e-commerce stores, SaaS products, CMSs and business systems. It is easy to start with, but as traffic grows slow queries, replication lag and poorly tuned InnoDB settings start costing sales.",
      "Our MySQL DBAs keep production fast and available: monitoring, slow-query analysis, index and schema optimisation, InnoDB tuning, replication and failover, XtraBackup or managed backups with restore tests, and security hardening.",
      "We also run MySQL 5.7 to 8.x upgrades, migrations to Aurora or Cloud SQL, and MariaDB support.",
    ],
    features: [
      { title: "MySQL / MariaDB administration", description: "Users, schemas, configuration and storage managed day to day." },
      { title: "Slow-query optimisation", description: "Slow-log and Performance Schema analysis with query rewrites and indexes." },
      { title: "InnoDB tuning", description: "Buffer pool, redo log and I/O settings tuned for your workload." },
      { title: "Replication & HA", description: "Replication, Group Replication/InnoDB Cluster and failover with Orchestrator or ProxySQL." },
      { title: "Backup & recovery", description: "XtraBackup or managed backups, binlog PITR and restore tests." },
      { title: "Upgrades & cloud", description: "5.7 to 8.x upgrades and migrations to Aurora, RDS or Cloud SQL." },
    ],
    useCases: [
      { title: "E-commerce stores", description: "Magento, WooCommerce and custom stores kept fast at peak." },
      { title: "SaaS applications", description: "Scaling MySQL with replicas and proxies." },
      { title: "MySQL 8 upgrades", description: "Moving off end-of-life 5.7 safely." },
      { title: "Cloud MySQL", description: "RDS, Aurora and Cloud SQL tuned for performance and cost." },
    ],
    phases: platformPhases("MySQL"),
    mvpWeeks: "1–2 weeks (onboarding and health check)",
    fullWeeks: "ongoing monthly support",
    costDrivers: ["Number of MySQL servers and replicas", "Self-hosted vs managed service", "Coverage level (business hours vs 24/7)", "Data size and query volume", "Upgrade or migration projects", "Compliance requirements"],
    techStack: [
      { group: "MySQL", items: ["MySQL 5.7 / 8.x", "MariaDB", "InnoDB Cluster", "Group Replication"] },
      { group: "Tools", items: ["Percona Toolkit", "XtraBackup", "ProxySQL", "Orchestrator"] },
      { group: "Cloud", items: ["RDS / Aurora MySQL", "Cloud SQL", "Azure Database for MySQL"] },
      { group: "Monitoring", items: ["Performance Schema", "PMM", "Prometheus / Grafana"] },
    ],
    compliance: dbCompliance,
    faqs: [
      { question: "Do you support MariaDB as well as MySQL?", answer: "Yes — MySQL 5.7 and 8.x, MariaDB, Percona Server, and managed MySQL on AWS, Google Cloud and Azure." },
      { question: "How do you fix slow MySQL queries?", answer: "We analyse the slow query log and Performance Schema, review execution plans, add or change indexes, rewrite problem queries and tune InnoDB settings — then measure the improvement." },
      { question: "Can you upgrade MySQL 5.7 to 8.0?", answer: "Yes. We test compatibility, upgrade replicas first and switch over with minimal downtime." },
      ongoingFaq,
    ],
    relatedServices: ["cloud-application-modernization", "cybersecurity-compliance", "api-integration-services"],
    relatedSolutions: ["remote-dba-services", "postgresql-dba-support-services", "database-migration-services"],
    keywords: ["MySQL DBA support services", "remote MySQL DBA", "MySQL performance tuning", "MySQL consulting", "MariaDB support", "Aurora MySQL support"],
  },
};
