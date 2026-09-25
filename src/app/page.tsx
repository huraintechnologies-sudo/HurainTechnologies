import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Container } from "@/components/Container";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { TrustStatsBar } from "@/components/TrustStatsBar";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { HeroMotion } from "@/components/HeroMotion";
import { LiveDemos } from "@/components/LiveDemos";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { ultraStrongOrganizationJsonLd } from "@/lib/jsonld-ultra-strong";
import { breadcrumbJsonLd } from "@/lib/jsonld-enhanced";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/case-studies";
import { blogPosts } from "@/data/blog-posts";
import { getCaseStudyImages, getBlogImages } from "@/lib/image-allocations";
import { TrustSections } from "@/components/TrustSections";
import { SolutionsDirectory } from "@/components/SolutionsDirectory";

export const metadata: Metadata = buildMetadata({
  title: "Blockchain, Crypto, Fintech & Software Development Company | Hurain Technologies",
  description:
    "Hurain Technologies is a leading software development company specializing in blockchain and Web3, cryptocurrency solutions, fintech platforms, payment gateway integration, enterprise APIs, cloud modernization, AI fraud detection, and cybersecurity. 16+ years experience, 2000+ projects delivered globally. Expert development for regulated digital businesses.",
  path: "/",
  keywords: [
    "blockchain development company",
    "cryptocurrency development company",
    "fintech development company",
    "smart contract development company",
    "payment gateway integration services",
    "api integration services",
    "cloud application modernization services",
  ],
});

const homeFaqs = [
  {
    question: "What industries does Hurain Technologies specialize in?",
    answer:
      "We specialize in blockchain and Web3, banking and fintech, payments and PSPs, and enterprise SaaS platforms — industries where security, compliance, and uptime are non-negotiable.",
  },
  {
    question: "Do you build both blockchain products and traditional software?",
    answer:
      "Yes. Many of our clients need both — a compliant payment or API backend alongside blockchain-based settlement, tokenization, or custody infrastructure. We engineer them as one integrated system rather than two disconnected vendors.",
  },
  {
    question: "How fast can we get started?",
    answer:
      "A discovery call typically happens within 2 business days of first contact, and we deliver a technical scoping document and estimate within 5 business days of that call.",
  },
  {
    question: "Do you work with startups or only enterprise clients?",
    answer:
      "Both. We run fixed-scope engagements for startups launching a first product (token launch, MVP platform, payment integration) and long-term retainers for enterprises modernizing existing systems.",
  },
  {
    question: "Which countries and regulatory environments do you build for?",
    answer:
      "We deliver for operators and platforms across the UK, EU, Middle East, Africa, Asia-Pacific, and the Americas, engineering the technical controls each jurisdiction's regulators typically expect. See our locations page for market-specific detail.",
  },
];

export default async function HomePage() {
  // Get unique images for case studies and blog posts (no API calls needed)
  const caseStudyImages = getCaseStudyImages();
  const blogImages = getBlogImages();

  const breadcrumbItems = [
    { name: "Home", url: `${siteConfig.url}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          ultraStrongOrganizationJsonLd(),
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`,
            name: siteConfig.name,
            url: siteConfig.url,
          },
          faqJsonLd(homeFaqs),
          breadcrumbJsonLd(breadcrumbItems),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <HeroMotion />
        <Container className="relative pt-12 pb-12 sm:pt-24 sm:pb-20">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Blockchain · Payments · API · Cloud engineering
          </p>
          <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="text-[2.5rem] text-foreground sm:text-6xl lg:text-[4.6rem]">
                Blockchain, Payments &amp; Cloud Platforms{" "}
                <span className="gradient-text">Engineered for Scale</span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-3">
              <p className="text-[15px] leading-relaxed text-muted sm:text-lg">
                {siteConfig.name} helps fintechs, banks, payment providers, and Web3 businesses
                build secure, scalable, compliance-ready platforms — from smart contracts and crypto exchanges to
                payment gateways, cloud-native architecture, and AI fraud detection.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
                >
                  Book a Consultation
                  <Icon name="arrow" className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:border-foreground/30 transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-border sm:mt-14">
            <Image
              src="/images/hero-dashboard.jpg"
              alt="Fintech SaaS platform dashboard on a curved monitor showing live blockchain transactions, payment analytics, and API uptime metrics — built by Hurain Technologies"
              width={1440}
              height={810}
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="h-[260px] w-full object-cover object-[35%_center] sm:h-[340px] lg:h-[420px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <dl className="absolute bottom-0 left-0 right-0 grid grid-cols-3 divide-x divide-border/70 border-t border-border/70 bg-background/70 backdrop-blur-md">
              {[
                { label: "Platform uptime", value: "99.99%" },
                { label: "Markets served", value: "60+" },
                { label: "Clients", value: "2,000+" },
              ].map((item) => (
                <div key={item.label} className="px-3 py-3 sm:px-7 sm:py-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted sm:text-[10.5px] sm:tracking-[0.1em]">{item.label}</dt>
                  <dd className="mt-1 font-display text-xl text-foreground sm:text-3xl">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Stack we ship on */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <p className="eyebrow shrink-0">Production stack</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[15px] font-semibold tracking-[-0.02em] text-foreground/45">
              {["Ethereum", "Solana", "Polygon", "Hyperledger", "AWS", "Azure", "Google Cloud", "Kubernetes", "PostgreSQL", "Oracle"].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Trust stats */}
      <section className="py-14 border-b border-border">
        <Container>
          <TrustStatsBar />
        </Container>
      </section>

      {/* Services */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="What We Build"
            title="Engineering practices built for regulated, high-stakes platforms"
            description="From blockchain and crypto infrastructure to payments, API, cloud, AI, and security — each practice is led by engineers who specialize in that domain, not generalists spread thin."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense">
            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                className={i < 2 ? "lg:col-span-2" : ""}
              />
            ))}
          </div>
        </Container>
      </section>

      <SolutionsDirectory />

      {/* Blockchain & Crypto highlight */}
      <section className="py-20 border-y border-border bg-surface">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-6 bg-accent" aria-hidden="true" />
                Blockchain &amp; Cryptocurrency
              </p>
              <h2 className="mt-4 text-3xl text-foreground sm:text-[2.6rem]">
                Production-grade <span className="gradient-text-gold">blockchain engineering</span>, not prototype code
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                From token issuance and smart contract audits to multi-chain exchanges, custody infrastructure, and
                DeFi protocols — we build blockchain systems designed to survive independent security audits and
                real transaction volume, with fiat and crypto payment rails integrated cleanly into one platform.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Token, coin & smart contract development (ERC-20, ERC-721, BEP-20, SPL)",
                  "Crypto exchange, wallet & custody infrastructure",
                  "DeFi protocols: staking, lending, DEX, yield",
                  "Security audit coordination & gas optimization",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Icon name="check" className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/services/blockchain-cryptocurrency-development"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2.5 transition-all"
              >
                Explore Blockchain &amp; Crypto Services
                <Icon name="arrow" className="w-4 h-4" />
              </Link>
            </div>
            {/* Blockchain network image */}
            <div className="flex flex-col gap-4">
              <div className="theme-dark relative overflow-hidden rounded-2xl border border-border">
                <Image
                  src="/images/blockchain-network.jpg"
                  alt="3D visualization of a decentralized blockchain network with glowing teal and gold nodes connected by cryptographic transaction lines"
                  width={640}
                  height={480}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-medium text-muted">Multi-chain infrastructure</p>
                  <p className="text-sm font-semibold text-foreground">ETH · BNB · Solana · Polygon · Arbitrum</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "contract" as const, label: "Smart Contract Development", href: "/services/smart-contract-development" },
                  { icon: "exchange" as const, label: "Exchange & Wallet Development", href: "/services/crypto-exchange-wallet-development" },
                  { icon: "security" as const, label: "Security & Compliance", href: "/services/cybersecurity-compliance" },
                  { icon: "ai" as const, label: "AI Fraud Detection", href: "/services/ai-fraud-detection-automation" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5 hover:border-accent/50 transition-colors"
                  >
                    <Icon name={item.icon} className="w-6 h-6 text-accent" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why choose us */}
      <section className="py-20">
        <Container>
          <WhyChooseUs />
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Industries" title="Regulated industries we build for" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-background p-6 transition-colors hover:border-foreground/25"
              >
                <Icon name={industry.icon as never} className="w-5 h-5 text-foreground/70 transition-colors group-hover:text-primary" />
                <h3 className="mt-4 text-[15px] font-semibold text-foreground">{industry.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{industry.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary">
                  Learn more
                  <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
              View all industries
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Live Demos */}
      <section className="py-20">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      {/* Case study highlight */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Proof" title="Results our engineering has delivered" />
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {caseStudies.map((cs, i) => {
              const csImage = caseStudyImages[i % caseStudyImages.length];
              const imgSrc = csImage.src;
              const imgAlt = csImage.alt;
              return (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-surface overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image src={imgSrc} alt={imgAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground">{cs.industry}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-foreground">{cs.title}</h3>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {cs.results.slice(0, 2).map((r) => (
                        <div key={r.label}>
                          <p className="font-display text-2xl text-foreground">{r.metric}</p>
                          <p className="text-xs text-muted">{r.label}</p>
                        </div>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                      Read case study
                      <Icon name="arrow" className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Blog preview */}
      <section className="py-20 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Insights" title="Latest from the engineering team" />
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {blogPosts.map((post, i) => {
              const blogImage = blogImages[i % blogImages.length];
              const imgSrc = blogImage.src;
              const imgAlt = blogImage.alt;
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl border border-border bg-background overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image src={imgSrc} alt={imgAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground">{post.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold leading-snug text-foreground">{post.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{post.excerpt}</p>
                    <span className="mt-4 text-xs text-muted">{post.readingTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="center" />
          <div className="mt-10">
            <FaqAccordion faqs={homeFaqs} />
          </div>
        </Container>
      </section>

      <TrustSections topic={"Custom Software"} />

      <section className="pb-20">
        <Container>
          <CtaSection />
        </Container>
      </section>
    </>
  );
}

