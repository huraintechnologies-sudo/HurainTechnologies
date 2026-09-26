import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { CtaSection } from "@/components/CtaSection";
import { LiveDemos } from "@/components/LiveDemos";
import { Icon } from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import fs from "node:fs";
import path from "node:path";
import { JsonLd } from "@/components/JsonLd";
import { founderJsonLd } from "@/lib/jsonld";
import { TrustSections } from "@/components/TrustSections";
import { TeamSection } from "@/components/TeamSection";
import { PageFaq } from "@/components/PageFaq";
import { pageFaqs } from "@/data/page-faqs";

const hasFounderPhoto = fs.existsSync(path.join(process.cwd(), "public", siteConfig.founder.photo));

const founderHighlights = [
  { value: siteConfig.founder.yearsExperience, label: "Years building software" },
  { value: siteConfig.founder.productsBuilt, label: "Products built and launched" },
  { value: siteConfig.founder.customProjects, label: "Custom client projects delivered" },
];

const founderWork = [
  "Founded Hurain Engitech & Trade and built Hurain Technologies as its software and blockchain division, from a one-person engineering practice into a multi-practice delivery team.",
  "Built and launched 15+ in-house products — SaaS platforms, marketplaces, fintech and payment tools, and property-technology products — and still actively builds new platforms today.",
  "Led 100+ custom projects for clients: mobile apps, web platforms, payment-gateway and API integrations, blockchain and smart-contract systems, cloud migrations and AI automation.",
  "Works hands-on across architecture, product scoping and delivery, so every engagement has a technical founder accountable for the outcome.",
];

export const metadata: Metadata = buildMetadata({
  title: "About Us | Blockchain, Payments & Cloud Engineering",
  description:
    "Hurain Technologies is the technology and blockchain division of Hurain Engitech & Trade, building secure, compliant platforms for fintech, payments, and Web3 businesses worldwide.",
  path: "/about",
});

const values = [
  {
    title: "Security is a default, not a phase",
    description: "Threat modeling and access control are part of day-one architecture decisions, not a pre-launch checklist.",
  },
  {
    title: "Compliance-aware engineering",
    description: "We build the technical controls regulators and banking partners expect, and defer legal judgment calls to qualified counsel.",
  },
  {
    title: "Ship in weeks, not quarters",
    description: "Modular architecture and reusable platform components mean faster time-to-market without cutting corners.",
  },
  {
    title: "Accountable after launch",
    description: "SLA-backed support and monitoring — we measure ourselves on your platform's uptime, not just delivery dates.",
  },
];

const milestones = [
  { year: siteConfig.founded, label: "Engineering practice established under Hurain Engitech & Trade" },
  { year: "2014", label: "Payments and PSP integration practice established for early fintech clients" },
  { year: "2017", label: "Payments and API integration practice scales to serve fintech and banking clients" },
  { year: "2020", label: "Cloud modernization and DevOps practice launched for enterprise clients" },
  { year: "2022", label: "Dedicated Blockchain & Cryptocurrency division launched" },
  { year: "2025", label: "AI Fraud Detection & Automation practice added; delivery spans 60+ markets and 2,000+ clients group-wide" },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Engineering the infrastructure behind{" "}
            <span className="gradient-text">regulated digital businesses</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.name} is the technology and blockchain division of {siteConfig.parentGroup}. We build
            payments, API, cloud, AI, and blockchain platforms for regulated enterprises who cannot afford
            downtime, a security gap, or a compliance miss.
          </p>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Our Story" title="From a regional engineering team to a global compliance-first partner" />
              <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
                {siteConfig.name} began as the software engineering arm of {siteConfig.parentGroup}, initially
                focused on payment and platform integration work for regional fintechs. As clients pushed into
                regulated payments markets and, later, blockchain-based products, we built dedicated practices around
                each domain rather than stretching a single generalist team across every specialty.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Today we operate as a multi-practice engineering partner — blockchain and cryptocurrency, payments
                and API integration, cloud modernization, AI fraud detection, and cybersecurity
                and compliance — serving clients across 60+ markets from our Gujarat, India headquarters.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                {siteConfig.name} is part of <span className="font-medium text-foreground">N&amp;T Software Pvt Ltd</span>.
              </p>
            </div>
            <div>
              {/* Team photo */}
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/images/team-engineering.jpg"
                  alt="Diverse Hurain Technologies engineering team collaborating on blockchain and fintech platform architecture in a modern tech office"
                  width={640}
                  height={420}
                  className="w-full object-cover"
                />
                <div className="theme-dark absolute bottom-0 left-0 right-0 !bg-transparent bg-gradient-to-t from-background/85 to-transparent px-5 py-4">
                  <p className="text-xs text-muted">Gujarat, India · Delivering across 60+ markets</p>
                </div>
              </div>
            </div>
          </div>
          {/* Mission & Vision */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="text-sm font-semibold text-foreground">Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                To give regulated digital businesses — fintechs, payment providers, and Web3
                platforms — engineering they can trust with real money and real regulatory scrutiny.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="text-sm font-semibold text-foreground">Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                To be the engineering partner regulated digital businesses call first when entering a new market
                or a new technology — from open banking APIs to blockchain settlement.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="founder" className="py-16 border-t border-border">
        <JsonLd data={founderJsonLd()} />
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-start">
            <div className="lg:col-span-2">
              <div className="card-glow mx-auto max-w-sm overflow-hidden rounded-2xl bg-surface lg:max-w-none">
                {hasFounderPhoto ? (
                  <Image src={siteConfig.founder.photo} alt={`${siteConfig.founderName}, founder of Hurain Technologies`} width={400} height={400} sizes="(min-width: 1024px) 400px, 100vw" className="aspect-square w-full object-cover" />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center bg-surface-2">
                    <span className="font-display text-8xl text-foreground/80">{siteConfig.founderName.split(" ").map((w) => w[0]).join("")}</span>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-lg font-semibold text-foreground">{siteConfig.founderName}</p>
                  <p className="mt-1 text-sm text-muted">{siteConfig.founder.title}</p>
                  <a href={siteConfig.founder.linkedin} target="_blank" rel="noopener me" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary">
                    <Icon name="linkedin" className="h-4 w-4" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <SectionHeading eyebrow="Meet the founder" title={`${siteConfig.founderName} — founder of Hurain Engitech & Trade`} />
              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                {siteConfig.founderName} is a software entrepreneur and product engineer with {siteConfig.founder.yearsExperience} years of experience turning ideas into working products. As founder of Hurain Engitech &amp; Trade and Hurain Technologies, {siteConfig.founderName.split(" ")[0]} has built {siteConfig.founder.productsBuilt} in-house products and delivered {siteConfig.founder.customProjects} custom software projects for businesses across fintech, payments, blockchain, e-commerce, real estate and SaaS.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {founderHighlights.map((h) => (
                  <div key={h.label} className="rounded-xl border border-border bg-surface p-4 text-center">
                    <p className="text-2xl font-bold gradient-text sm:text-3xl">{h.value}</p>
                    <p className="mt-1 text-xs leading-snug text-muted">{h.label}</p>
                  </div>
                ))}
              </div>
              <h3 className="mt-10 text-lg font-semibold text-foreground">Track record</h3>
              <ul className="mt-4 space-y-3">
                {founderWork.map((w) => (
                  <li key={w} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    {w}
                  </li>
                ))}
              </ul>
              <h3 className="mt-10 text-lg font-semibold text-foreground">Areas of expertise</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["Product strategy & MVPs", "SaaS architecture", "Fintech & payments", "Blockchain & smart contracts", "Mobile & web apps", "Cloud & DevOps", "AI automation", "Team building"].map((t) => (
                  <li key={t} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-foreground/80">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <TeamSection />

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <WhyChooseUs />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="How We Work" title="The values behind every engagement" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl border border-border bg-surface p-5">
                <Icon name="check" className="w-5 h-5 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Milestones" title="How the practice has grown" />
          <div className="mt-10 space-y-0">
            {milestones.map((m, index) => (
              <div key={m.year} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold text-primary">
                    {m.year}
                  </span>
                  {index < milestones.length - 1 && <span className="w-px flex-1 bg-border" />}
                </div>
                <p className="pb-8 text-sm leading-relaxed text-muted sm:text-base">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading eyebrow="Global Presence" title="Headquartered in Gujarat, India, delivering across 60+ markets" />
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                Our engineering teams deliver for clients across the UK, EU, Americas, Middle East, Africa, and
                Asia-Pacific, with architecture and compliance practices tailored to each region’s regulatory
                environment. See our{" "}
                <Link href="/locations" className="text-primary hover:underline">location-specific pages</Link> for market
                detail.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <Image
                src="/images/global-map.jpg"
                alt="Global digital network connectivity map showing Hurain Technologies client connections across UK, Europe, Middle East, India, Africa, Asia-Pacific, and the Americas"
                width={720}
                height={405}
                className="w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <TrustSections topic="Custom Software" />
      <PageFaq title="About Hurain Technologies — frequently asked questions" faqs={pageFaqs.about} />

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <CtaSection
            title="Want to work with our engineering team?"
            description="Tell us about your platform and we'll set up a technical discovery call within 2 business days."
          />
        </Container>
      </section>
    </>
  );
}
