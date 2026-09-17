// NEW DESIGN: Proper React Components with Website Theme Consistency
// Replace dangerouslySetInnerHTML with proper styled components

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { siteConfig } from "@/lib/site-config";
import { CountryLinksGrid } from "@/components/CountryLinksGrid";
import { CityLinksGrid } from "@/components/CityLinksGrid";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { strongestSolutionCountryJsonLd, breadcrumbJsonLd } from "@/lib/jsonld-enhanced";
import Link from "next/link";

interface Props {
  params: Promise<{
    solution: string;
    country: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution, country } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countries.find((c) => c.slug === country);

  if (!vertical || !countryData) return notFound();

  const titleSuffix = vertical.name.toLowerCase().includes("development") ? "" : " Development";
  const title = `${vertical.name}${titleSuffix} in ${countryData.countryName} | Expert Services by Hurain Technologies`;
  const description = `Professional ${vertical.name.toLowerCase()} development services in ${countryData.countryName}. Local expertise, global standards. 16+ years experience serving ${countryData.countryName} businesses. Custom solutions from MVP to enterprise.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/solutions/${solution}/${country}`,
    },
  };
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const topVerticals = serviceVerticals.slice(0, 5);
  const topCountries = countries.slice(0, 20);
  return topVerticals.flatMap((vertical) =>
    topCountries.map((country) => ({
      solution: vertical.slug,
      country: country.slug,
    }))
  );
}

// Hero Component - Using theme colors
function HeroSection({ vertical, country }: any) {
  return (
    <section className="border-b border-border py-16 px-4 md:px-8">
      <Container>
        <div className="flex items-center gap-2 mb-6">
          <Link href={`/solutions/${vertical.slug}`} className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
            ← {vertical.name}
          </Link>
          <span className="text-muted">/</span>
          <span className="text-primary text-sm font-medium">{country.countryName}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          {vertical.name} in {country.countryName}
        </h1>
        <p className="text-lg text-muted max-w-2xl leading-relaxed">
          Professional {vertical.name.toLowerCase()} development services for businesses in {country.countryName}.
          Specialized expertise meeting local requirements and regulatory standards.
        </p>
      </Container>
    </section>
  );
}

// Content Card Component - Using theme colors
function ContentCard({ children, accent = "blue", className = "" }: any) {
  const accentStyles: any = {
    blue: "border-l-4 border-primary bg-surface hover:bg-surface-2 transition-colors",
    indigo: "border-l-4 border-primary-2 bg-surface hover:bg-surface-2 transition-colors",
    green: "border-l-4 border-success bg-surface hover:bg-surface-2 transition-colors",
    orange: "border-l-4 border-accent-2 bg-surface hover:bg-surface-2 transition-colors",
  };

  return <div className={`p-8 rounded-lg ${accentStyles[accent]} ${className}`}>{children}</div>;
}

// Section Header Component - Using theme colors
function SectionHeader({ title, subtitle }: any) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
      {subtitle && <p className="text-lg text-muted">{subtitle}</p>}
    </div>
  );
}

// Service Grid Component - Using theme colors
function ServiceGrid({ services }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services.map((service: any, idx: number) => (
        <div key={idx} className="bg-surface border border-border rounded-lg p-6 hover:bg-surface-2 transition-colors">
          <h3 className="text-xl font-bold text-foreground mb-4">{service.title}</h3>
          <ul className="space-y-2">
            {service.items.map((item: string, i: number) => (
              <li key={i} className="text-muted flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Tech Stack Grid Component - Using theme colors
function TechStackGrid() {
  const stacks = [
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { name: "Backend", items: ["Node.js", "Python", "Go", "PostgreSQL"] },
    { name: "Cloud", items: ["AWS", "Google Cloud", "Azure", "Kubernetes"] },
    { name: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {stacks.map((stack, idx) => (
        <div key={idx} className="bg-surface-2 text-foreground rounded-lg p-6 border border-border hover:border-primary/30 transition-colors">
          <h4 className="text-lg font-bold text-primary mb-4">{stack.name}</h4>
          <div className="flex flex-wrap gap-2">
            {stack.items.map((tech) => (
              <span key={tech} className="bg-surface px-3 py-1 rounded-full text-sm text-muted border border-border">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Process Timeline Component - Using theme colors
function ProcessTimeline() {
  const phases = [
    { num: "01", title: "Discovery & Analysis", desc: "Understanding your business goals and requirements" },
    { num: "02", title: "Design & Architecture", desc: "Creating technical design and system architecture" },
    { num: "03", title: "Development", desc: "Building your solution with agile methodology" },
    { num: "04", title: "Testing & QA", desc: "Comprehensive testing and quality assurance" },
    { num: "05", title: "Deployment", desc: "Production deployment with monitoring" },
    { num: "06", title: "Support", desc: "24/7 support and continuous optimization" },
  ];

  return (
    <div className="space-y-4">
      {phases.map((phase) => (
        <div key={phase.num} className="flex gap-6 items-start bg-surface p-6 rounded-lg border-l-4 border-primary hover:bg-surface-2 transition-colors">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-background font-bold">
              {phase.num}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-1">{phase.title}</h4>
            <p className="text-muted">{phase.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// FAQ Component - Using theme colors
function FAQSection() {
  const faqs = [
    { q: "How long does development take?", a: "Typically 3-12 months depending on complexity. We provide detailed timelines after requirements analysis." },
    { q: "What's the cost?", a: "Depends on scope, complexity, and timeline. We offer fixed-price, time & material, and dedicated team models." },
    { q: "Do you provide support?", a: "Yes, comprehensive 24/7 support, maintenance, and continuous optimization after launch." },
    { q: "Can you integrate with existing systems?", a: "Absolutely. We have extensive experience integrating with local payment systems, banking APIs, and enterprise software." },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="bg-surface border border-border rounded-lg p-6 hover:bg-surface-2 transition-colors">
          <h4 className="font-bold text-foreground mb-2">{faq.q}</h4>
          <p className="text-muted">{faq.a}</p>
        </div>
      ))}
    </div>
  );
}

// Main Page Component
export default async function SolutionCountryPageRedesign({ params }: Props) {
  const { solution, country } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countries.find((c) => c.slug === country);

  if (!vertical || !countryData) return notFound();

  // Breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Solutions", url: `${siteConfig.url}/solutions` },
    { name: vertical.name, url: `${siteConfig.url}/solutions/${vertical.slug}` },
    { name: countryData.countryName, url: `${siteConfig.url}/solutions/${vertical.slug}/${country}` },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data - STRONGEST schemas for Google ranking */}
      <JsonLd
        data={[
          strongestSolutionCountryJsonLd(
            {
              name: vertical.name,
              slug: vertical.slug,
              keywords: vertical.keywords || []
            },
            countryData
          ),
          breadcrumbJsonLd(breadcrumbItems),
        ]}
      />

      {/* Hero */}
      <HeroSection vertical={vertical} country={countryData} />

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-border">
        <Container>
          {/* Market Overview */}
          <ContentCard accent="blue" className="mb-16">
            <SectionHeader title={`${vertical.name} Market in ${countryData.countryName}`} />
            <p className="text-foreground/80 leading-relaxed mb-4">
              The {vertical.name.toLowerCase()} market in {countryData.countryName} represents significant growth opportunity.
              With increasing digital transformation, businesses are seeking professional {vertical.name.toLowerCase()} services.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Hurain Technologies brings 16+ years of expertise to {countryData.countryName}, with proven success across industries.
              We combine international best practices with deep understanding of local requirements and preferences.
            </p>
          </ContentCard>

          {/* Why This Country */}
          <div className="mb-16">
            <SectionHeader title={`Why ${countryData.countryName} Businesses Choose Professional ${vertical.name}`} />
            <ContentCard accent="indigo">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary-2 font-bold text-lg">→</span>
                  <div>
                    <h4 className="font-bold text-foreground">Market Growth</h4>
                    <p className="text-muted">Double-digit growth in {vertical.name.toLowerCase()} sector</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-2 font-bold text-lg">→</span>
                  <div>
                    <h4 className="font-bold text-foreground">Local Expertise</h4>
                    <p className="text-muted">Understanding {countryData.countryName}'s unique business environment</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-2 font-bold text-lg">→</span>
                  <div>
                    <h4 className="font-bold text-foreground">Quality Assurance</h4>
                    <p className="text-muted">Enterprise-grade development meeting international standards</p>
                  </div>
                </li>
              </ul>
            </ContentCard>
          </div>

          {/* Services */}
          <div className="mb-16">
            <SectionHeader title={`Comprehensive ${vertical.name} Services`} subtitle={`For ${countryData.countryName} Businesses`} />
            <ServiceGrid
              services={[
                {
                  title: "Custom Development",
                  items: ["Full-stack solutions", "Scalable architecture", "Custom features", "API integration"],
                },
                {
                  title: "MVP & Rapid Launch",
                  items: ["Fast prototyping", "Market entry", "Cost-effective", "Iterative development"],
                },
                {
                  title: "Enterprise Solutions",
                  items: ["Enterprise-grade", "High availability", "Multi-tenant", "Complex integration"],
                },
                {
                  title: "Modernization",
                  items: ["Legacy systems", "Code refactoring", "Database optimization", "Cloud migration"],
                },
              ]}
            />
          </div>

          {/* Technology Stack */}
          <div className="mb-16">
            <SectionHeader title="Advanced Technology Stack" subtitle="Cutting-edge technologies for robust solutions" />
            <TechStackGrid />
          </div>

          {/* Process */}
          <div className="mb-16">
            <SectionHeader title="Our Development Process" subtitle="Proven methodology ensuring project success" />
            <ProcessTimeline />
          </div>

          {/* Case Studies */}
          <ContentCard accent="orange" className="mb-16">
            <SectionHeader title="Success Stories in Development" />
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Enterprise Platform Migration</h4>
                <p className="text-gray-700">Migrated legacy systems to cloud with 40% performance improvement and 50% cost reduction.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Startup MVP Launch</h4>
                <p className="text-gray-700">Delivered production-ready platform in 4 months, securing Series A funding.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Market Expansion</h4>
                <p className="text-gray-700">Implemented multi-vendor functionality, increasing annual revenue by 3x.</p>
              </div>
            </div>
          </ContentCard>

          {/* FAQ */}
          <div className="mb-16">
            <SectionHeader title="Frequently Asked Questions" />
            <FAQSection />
          </div>

          {/* Why Choose Us */}
          <ContentCard accent="blue">
            <SectionHeader title={`Why Choose Hurain Technologies for ${vertical.name} in ${countryData.countryName}`} />
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">16+</div>
                <p className="text-foreground font-semibold">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2000+</div>
                <p className="text-foreground font-semibold">Projects Delivered</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-foreground font-semibold">Client Retention</p>
              </div>
            </div>
          </ContentCard>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-surface border-t border-border">
        <Container>
          <CtaSection
            title={`Ready to Start Your ${vertical.name} Project in ${countryData.countryName}?`}
            description={`Let's discuss how we can build a world-class ${vertical.name.toLowerCase()} solution for your ${countryData.countryName} business.`}
          />
        </Container>
      </section>

      {/* City Links - Make city pages easily discoverable */}
      <CityLinksGrid
        countrySlug={country}
        countryName={countryData.countryName}
        solutionSlug={vertical.slug}
        solutionName={vertical.name}
      />

      {/* Geographic Links - Other Countries */}
      <section className="py-16 px-4 md:px-8 border-t border-border">
        <Container>
          <h2 className="text-3xl font-bold text-foreground mb-8">Available in Other Countries</h2>
          <CountryLinksGrid basePath={`/solutions/${vertical.slug}`} />
        </Container>
      </section>
    </div>
  );
}
