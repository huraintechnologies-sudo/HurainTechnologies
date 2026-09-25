import { FaqItem } from "@/lib/types";

// FAQs for the hub pages (about, services, industries, case studies, blog,
// locations, markets). Answers restate the commercial terms shown in the
// delivery sections: milestone payments after sign-off, 90-day warranty,
// fixed-cost annual support at 30% of project cost, full code & IP ownership,
// and a team priced to requirements. Never promise delivery durations.

const OWNERSHIP: FaqItem = {
  question: "Who owns the source code and IP?",
  answer: "You do — 100%. Code lives in your own repository from the first commit, and on full and final payment the complete source code, database schemas, deployment scripts, documentation and intellectual property are transferred to you. No lock-in, no forced upgrades, no subscription trap.",
};

const PAYMENT: FaqItem = {
  question: "How do payments work?",
  answer: "Payments are milestone-based and shaped around your requirements. A typical plan is a 10% advance and six milestones of 15%, and every payment after the advance is released only after you have seen the working result and given written sign-off.",
};

const SUPPORT: FaqItem = {
  question: "What happens after launch?",
  answer: "Every project includes a free 90-day defect warranty from go-live. After that, Annual Support & Maintenance is a fixed yearly fee of 30% of the project cost — a dedicated developer, bug fixes and security patches, upgrades, helpdesk, backup monitoring and periodic security reviews.",
};

const TEAM: FaqItem = {
  question: "Can we add more developers or support staff later?",
  answer: "Yes. Start with one dedicated developer and add frontend, backend, mobile, QA, DevOps or support members (L1 helpdesk, L2 technical support and domain-specific support) as your requirements grow. Pricing is based on the team members you need.",
};

const UPDATES: FaqItem = {
  question: "How will we know what the team is doing?",
  answer: "You get a written daily update (done today, planned tomorrow, blockers), a weekly work overview every Friday with a live call in your business hours, and a demo at the end of every sprint and milestone.",
};

const TIMELINE: FaqItem = {
  question: "How long will my project take?",
  answer: "Delivery time is agreed around your scope. After a short discovery we share a milestone plan tailored to your requirements, integrations and how quickly decisions are made on your side.",
};

export const pageFaqs: Record<string, FaqItem[]> = {
  about: [
    { question: "Who is Hurain Technologies?", answer: "Hurain Technologies is the software and blockchain division of Hurain Engitech & Trade, headquartered in Palanpur, Gujarat, India. Our in-house engineers build web, mobile, payments, API, cloud, AI and blockchain platforms for clients worldwide." },
    { question: "Do you subcontract work?", answer: "No. Your project is designed and built by our own in-house team — the same people you meet on calls write and review your code." },
    UPDATES,
    PAYMENT,
    OWNERSHIP,
    SUPPORT,
  ],
  services: [
    { question: "Which services does Hurain Technologies offer?", answer: "Blockchain and smart contracts, crypto exchanges and wallets, payment gateway and PSP integration, API and open-banking integration, cloud modernization, AI fraud detection and automation, and cybersecurity and compliance engineering." },
    { question: "Can one team handle several services together?", answer: "Yes. Most platforms combine several services — for example payments, APIs and compliance — and one team delivers them together under a single milestone plan." },
    TIMELINE,
    PAYMENT,
    OWNERSHIP,
    SUPPORT,
  ],
  industries: [
    { question: "Which industries do you build for?", answer: "Banking and fintech, crypto and Web3, payments and PSPs, enterprise SaaS, healthtech and insurtech, real estate and proptech, cross-border remittance, digital banking and neobanks, and Web3 gaming and NFT platforms." },
    { question: "Do you understand regulated industries?", answer: "Yes. Security, audit trails, data protection and the relevant regulator's expectations are designed in from the Discover stage, and built alongside your licensed local counsel." },
    TIMELINE,
    PAYMENT,
    OWNERSHIP,
    TEAM,
  ],
  caseStudies: [
    { question: "Can we speak to the team behind these projects?", answer: "Yes. Book a consultation and the engineers who work in your domain join the discovery call." },
    { question: "Can you build something similar for us?", answer: "Yes. Every engagement starts with discovery, then a milestone plan shaped around your requirements — you approve each working milestone before paying." },
    OWNERSHIP,
    SUPPORT,
  ],
  blog: [
    { question: "Who writes these articles?", answer: "Our engineering team — the same people who design, build and support client platforms in payments, APIs, cloud, AI and blockchain." },
    { question: "Can you help us apply this to our platform?", answer: "Yes. Share your requirements and we will review your architecture on a discovery call and propose a milestone plan." },
    UPDATES,
    OWNERSHIP,
  ],
  locations: [
    { question: "Do you work with clients outside India?", answer: "Yes — most of our clients are overseas. Every country and city page explains the local payments, tax, data-protection and time-zone details we build in." },
    { question: "How do you handle time-zone differences?", answer: "Calls, demos and sign-offs are scheduled in your business hours, and a written daily update is waiting for you at the end of our day in India." },
    PAYMENT,
    OWNERSHIP,
    SUPPORT,
  ],
  markets: [
    { question: "What changes from one market to another?", answer: "Local payment methods, tax, data-protection law, regulators, language, currency and the dominant mobile platform. Each market page lists what we build in for that country or city." },
    { question: "Is my market covered if it isn't listed?", answer: "Almost certainly. Tell us where you operate and we confirm the local payment, tax and compliance requirements on the discovery call." },
    UPDATES,
    PAYMENT,
    OWNERSHIP,
  ],
};
