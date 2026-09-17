// NEW DESIGN: Proper React Components with Website Theme Consistency
// Replace dangerouslySetInnerHTML with proper styled components

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { siteConfig } from "@/lib/site-config";
import { CountryLinksGrid } from "@/components/CountryLinksGrid";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
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

// Hero Component
function HeroSection({ vertical, country }: any) {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 py-20 px-4 md:px-8">
      <Container>
        <div className="flex items-center gap-2 mb-6">
          <Link href={`/solutions/${vertical.slug}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
            ← {vertical.name}
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-blue-400 text-sm font-medium">{country.countryName}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {vertical.name} in {country.countryName}
        </h1>
        <p className="text-lg text-blue-100 max-w-2xl">
          Professional {vertical.name.toLowerCase()} development services for businesses in {country.countryName}.
          Specialized expertise meeting local requirements and regulatory standards.
        </p>
      </Container>
    </section>
  );
}

// Content Card Component
function ContentCard({ children, accent = "blue", className = "" }: any) {
  const accentStyles: any = {
    blue: "border-l-4 border-blue-500 bg-blue-50/50",
    indigo: "border-l-4 border-indigo-500 bg-indigo-50/50",
    green: "border-l-4 border-green-500 bg-green-50/50",
    orange: "border-l-4 border-orange-500 bg-orange-50/50",
  };

  return <div className={`p-8 rounded-lg ${accentStyles[accent]} ${className}`}>{children}</div>;
}

// Section Header Component
function SectionHeader({ title, subtitle }: any) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
      {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
    </div>
  );
}

// Service Grid Component
function ServiceGrid({ services }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services.map((service: any, idx: number) => (
        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
          <ul className="space-y-2">
            {service.items.map((item: string, i: number) => (
              <li key={i} className="text-gray-600 flex items-center gap-2">
                <span className="text-blue-500 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Tech Stack Grid Component
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
        <div key={idx} className="bg-gray-900 text-white rounded-lg p-6">
          <h4 className="text-lg font-bold text-blue-400 mb-4">{stack.name}</h4>
          <div className="flex flex-wrap gap-2">
            {stack.items.map((tech) => (
              <span key={tech} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Process Timeline Component
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
        <div key={phase.num} className="flex gap-6 items-start bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold">
              {phase.num}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">{phase.title}</h4>
            <p className="text-gray-600">{phase.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// FAQ Component
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
        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
          <p className="text-gray-600">{faq.a}</p>
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection vertical={vertical} country={countryData} />

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <Container>
          {/* Market Overview */}
          <ContentCard accent="blue" className="mb-16">
            <SectionHeader title={`${vertical.name} Market in ${countryData.countryName}`} />
            <p className="text-gray-700 leading-relaxed mb-4">
              The {vertical.name.toLowerCase()} market in {countryData.countryName} represents significant growth opportunity.
              With increasing digital transformation, businesses are seeking professional {vertical.name.toLowerCase()} services.
            </p>
            <p className="text-gray-700 leading-relaxed">
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
                  <span className="text-indigo-600 font-bold text-lg">→</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Market Growth</h4>
                    <p className="text-gray-600">Double-digit growth in {vertical.name.toLowerCase()} sector</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold text-lg">→</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Local Expertise</h4>
                    <p className="text-gray-600">Understanding {countryData.countryName}'s unique business environment</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-600 font-bold text-lg">→</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Quality Assurance</h4>
                    <p className="text-gray-600">Enterprise-grade development meeting international standards</p>
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
                <div className="text-4xl font-bold text-blue-600 mb-2">16+</div>
                <p className="text-gray-700 font-semibold">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">2000+</div>
                <p className="text-gray-700 font-semibold">Projects Delivered</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <p className="text-gray-700 font-semibold">Client Retention</p>
              </div>
            </div>
          </ContentCard>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50">
        <Container>
          <CtaSection
            title={`Ready to Start Your ${vertical.name} Project in ${countryData.countryName}?`}
            description={`Let's discuss how we can build a world-class ${vertical.name.toLowerCase()} solution for your ${countryData.countryName} business.`}
          />
        </Container>
      </section>

      {/* Geographic Links */}
      <section className="py-16 px-4 md:px-8 border-t border-gray-200">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Available in Other Countries</h2>
          <CountryLinksGrid basePath={`/solutions/${vertical.slug}`} />
        </Container>
      </section>
    </div>
  );
}
