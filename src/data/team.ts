// Team shown on /about. Photos are picked up automatically from
// public/images/team/<slug>.jpg (square works best); without one, initials
// are shown. Keep roles and bios in line with what each person confirms.

export interface TeamMember {
  slug: string;
  name: string;
  role?: string;
  intro?: string;
  focus?: string[];
  linkedin?: string;
}

export const team: TeamMember[] = [
  {
    slug: "dinesh-prajapati",
    name: "Dinesh Prajapati",
    role: "Lead Developer",
    intro:
      "Dinesh leads the Hurain Technologies development team and brings 10+ years of hands-on software development experience. He owns architecture and code-quality decisions across client builds — from payment platforms and APIs to web and mobile products — and makes sure every release passes our quality gates before it reaches a client.",
    focus: ["Solution architecture", "Code reviews & quality gates", "Payments & API platforms"],
    linkedin: "https://www.linkedin.com/in/dinesh-prajapati/",
  },
  {
    slug: "pratik-panchal",
    name: "Pratik Panchal",
    role: "Business Development Manager",
    intro:
      "Pratik is the first point of contact for new clients and partners. He runs discovery calls, turns business goals into a clear scope and milestone-based proposal, and stays involved so every engagement starts — and continues — with a shared plan.",
    focus: ["Client discovery", "Proposals & milestone plans", "Partnerships"],
    linkedin: "https://www.linkedin.com/in/pratik-panchal-71a953113/",
  },
  {
    slug: "abid-hussain-saiyed",
    name: "Abid Hussain Saiyed",
    role: "Project Manager",
    intro:
      "Abid keeps delivery on track: he runs sprint planning and demos, manages the shared backlog, and coordinates milestone sign-offs so clients always know what is being built, what is next, and what they are approving.",
    focus: ["Sprint planning & demos", "Milestone sign-offs", "Client communication"],
    linkedin: "https://www.linkedin.com/in/abid-hussain-saiyed-b52757202/",
  },
  {
    slug: "mahmood-saiyed",
    name: "Mahmood Saiyed",
    role: "Full-Stack Developer",
    intro:
      "Mahmood works across the stack on web applications, SaaS platforms and admin panels — building the APIs, databases and interfaces that fintech and enterprise clients rely on every day.",
    focus: ["Web & SaaS applications", "Backend APIs", "Admin dashboards"],
    linkedin: "https://www.linkedin.com/in/mahmoodsaiyed/",
  },
  {
    slug: "jaimin-sharma",
    name: "Jaimin Sharma",
    role: "QA & Support Manager",
    intro:
      "Jaimin owns quality and after-launch care. He runs functional, regression, device and UAT testing before every milestone sign-off, then leads our support desk — handling SLA tickets, patches and upgrades so live platforms stay stable.",
    focus: ["Testing & quality gates", "UAT coordination", "SLA support & releases"],
    linkedin: "https://www.linkedin.com/in/jaimin-sharma-055b9b11a/",
  },
  {
    slug: "roshan-sachdev",
    name: "Roshan Sachdev",
    role: "Mobile App & Blockchain Developer",
    intro:
      "Roshan builds iOS, Android and cross-platform apps and the blockchain features behind them — wallets, token integrations and smart-contract connections — taking each release through device testing and App Store / Play Store launch.",
    focus: ["iOS & Android apps", "Wallet & Web3 integrations", "Smart contracts"],
    linkedin: "https://www.linkedin.com/in/roshan-sachdev-46b5b325b/",
  },
  {
    slug: "pravin-patel",
    name: "Pravin Patel",
    role: "Cloud & DevOps Engineer",
    intro:
      "Pravin looks after the infrastructure our clients' platforms run on — cloud environments, CI/CD pipelines, monitoring, backups and databases — so releases are frequent, reversible and safe.",
    focus: ["Cloud infrastructure", "CI/CD & monitoring", "Database operations"],
    linkedin: "https://www.linkedin.com/in/pravin-patel-771609262/",
  },
  {
    slug: "syed-zainab",
    name: "Syed Zainab",
    role: "Business Development Manager",
    intro:
      "Zainab works with new clients from the first conversation onward — understanding their business goals, shaping requirements into a clear scope, and keeping communication open so every engagement starts with shared expectations.",
    focus: ["Client relationships", "Requirement discovery", "Proposals & onboarding"],
    linkedin: "https://www.linkedin.com/in/syed-zainab-bab374305/",
  },
  {
    slug: "divyesh-bhambhana",
    name: "Divyesh Bhambhana",
    role: "Full Stack Product Engineer – MERN, DevOps & Product Operations",
    intro:
      "Divyesh builds products end to end on the MERN stack — MongoDB, Express, React and Node.js — and looks after the DevOps and day-to-day product operations that keep them running smoothly after launch.",
    focus: ["MERN stack development", "DevOps & deployments", "Product operations"],
    linkedin: "https://www.linkedin.com/in/divyeshbhambhana/",
  },
  {
    slug: "afroz-mansuri",
    name: "Afroz Mansuri",
    role: "Java Developer",
    intro:
      "Afroz builds the Java backends behind client platforms — services, APIs and integrations designed to be reliable, secure and ready to scale with the business.",
    focus: ["Java backend development", "APIs & integrations", "Scalable services"],
    linkedin: "https://www.linkedin.com/in/afrozmann/",
  },
  {
    slug: "lucky-maddhesiya",
    name: "Lucky Maddhesiya",
    role: "Front-End Developer",
    intro:
      "Lucky turns designs into fast, responsive interfaces — building the screens clients and their users interact with every day, and making sure they work smoothly across browsers and devices.",
    focus: ["Responsive UI development", "Design-to-code", "Cross-browser quality"],
    linkedin: "https://www.linkedin.com/in/lucky-maddhesiya-33b701235/",
  },
  {
    slug: "adnan-saiyed",
    name: "Adnan Saiyed",
    role: "Support & Sales Head",
    intro:
      "Adnan makes sure clients get the right solutions. He leads sales conversations and client support — matching each business with the right services, then staying on hand after launch so questions and issues are resolved quickly.",
    focus: ["Sales & solution matching", "Client support", "Account management"],
  },
  {
    slug: "sadiya-syed",
    name: "Sadiya Syed",
    role: "Junior Software Developer",
    intro:
      "Sadiya is continuously learning, building and growing through every project — working alongside our senior engineers on features, fixes and testing across client builds.",
    focus: ["Feature development", "Bug fixes & testing", "Code reviews"],
  },
];
