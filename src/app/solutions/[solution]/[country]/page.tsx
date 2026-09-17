// Solutions Country Page - Professional Design Matching Services Pages
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { siteConfig } from "@/lib/site-config";
import { CountryLinksGrid } from "@/components/CountryLinksGrid";
import { CityLinksGrid } from "@/components/CityLinksGrid";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import {
  breadcrumbJsonLd
} from "@/lib/jsonld-enhanced";
import { ultraStrongOrganizationJsonLd, ultraStrongSolutionJsonLd } from "@/lib/jsonld-ultra-strong";
import { getSolutionPageSchemas } from "@/lib/jsonld-universal";
import { buildSolutionPageKeywords } from "@/lib/keywords-builder";

// Hero images
const solutionImages: Record<string, { src: string; alt: string }> = {
  "mobile-app-development": { src: "/images/hero-dashboard.jpg", alt: "Mobile app development" },
  "ecommerce-app": { src: "/images/payment-terminal.jpg", alt: "E-commerce solutions" },
  "food-delivery": { src: "/images/case-study-fintech.jpg", alt: "Food delivery platform" },
};
const defaultImage = { src: "/images/hero-dashboard.jpg", alt: "Professional solutions" };

interface Props {
  params: Promise<{ solution: string; country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution, country } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countries.find((c) => c.slug === country);

  if (!vertical || !countryData) return notFound();

  const title = `${vertical.name} in ${countryData.countryName} | Expert Services | Hurain Technologies`;
  const description = `Professional ${vertical.name.toLowerCase()} for ${countryData.countryName}. Local expertise, global standards. 16+ years, 2000+ projects.`;

  return {
    title,
    description,
    openGraph: { title, description, url: `${siteConfig.url}/solutions/${solution}/${country}` },
  };
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const topVerticals = serviceVerticals.slice(0, 5);
  const topCountries = countries.slice(0, 20);
  return topVerticals.flatMap((v) =>
    topCountries.map((c) => ({ solution: v.slug, country: c.slug }))
  );
}

export default async function SolutionCountryPage({ params }: Props) {
  const { solution, country } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countries.find((c) => c.slug === country);

  if (!vertical || !countryData) return notFound();

  const solutionImg = solutionImages[solution] ?? defaultImage;

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: vertical.name, href: `/solutions/${vertical.slug}` },
    { name: countryData.countryName, href: `/solutions/${vertical.slug}/${country}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          ultraStrongOrganizationJsonLd(),
          { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.name, url: siteConfig.url },
          ultraStrongSolutionJsonLd(vertical.name, countryData.countryName),
          breadcrumbJsonLd(breadcrumbItems),
        ]}
      />

      {/* Hero Section with Image */}
      <section className="border-b border-border">
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <Image src={solutionImg.src} alt={solutionImg.alt} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </div>

        <Container className="pb-14 pt-8">
          <Breadcrumbs items={breadcrumbItems} />

          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
            <Icon name="zap" className="w-3.5 h-3.5" />
            Solution
          </span>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {vertical.name} in {countryData.countryName}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Expert {vertical.name.toLowerCase()} solutions tailored for {countryData.countryName} businesses.
            We deliver scalable, compliance-aware systems with local expertise and global best practices.
            16+ years, 2000+ projects, 98% client retention.
          </p>

          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
            >
              Get a Technical Estimate
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </section>

      {/* Market Overview */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Market" title={`${vertical.name} Opportunity in ${countryData.countryName}`} />
          <div className="mt-8 max-w-3xl prose prose-invert">
            <p className="text-base leading-relaxed text-muted">
              {countryData.countryName}'s digital transformation is creating massive opportunities in {vertical.name.toLowerCase()}.
              Businesses across sectors—fintech, retail, healthcare, e-commerce, logistics—are investing heavily.
              The market is growing 25-40% annually with strong demand for experienced development partners.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Offered */}
      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Services" title={`Comprehensive ${vertical.name} Solutions`} />
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[
              { title: "Custom Development", desc: "Full-stack solutions, scalable architecture, API integration" },
              { title: "MVP & Rapid Launch", desc: "Fast prototyping, market entry in weeks, cost-effective" },
              { title: "Enterprise Systems", desc: "High-availability, multi-tenant, complex integrations" },
              { title: "Modernization", desc: "Legacy system migration, cloud-native architecture" },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Technology" title="Modern Tech Stack" />
          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {[
              { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
              { name: "Backend", items: ["Node.js", "Python", "Go", "PostgreSQL"] },
              { name: "Cloud", items: ["AWS", "GCP", "Azure", "Kubernetes"] },
              { name: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
            ].map((stack, i) => (
              <div key={i} className="bg-surface border border-border rounded-lg p-4">
                <h4 className="text-sm font-bold text-primary mb-3">{stack.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((tech) => (
                    <span key={tech} className="text-xs bg-background px-2 py-1 rounded text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cities Grid */}
      <CityLinksGrid
        countrySlug={country}
        countryName={countryData.countryName}
        solutionSlug={vertical.slug}
        solutionName={vertical.name}
      />

      {/* CTA Section */}
      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <CtaSection
            title={`Ready to Build Your ${vertical.name} Solution in ${countryData.countryName}?`}
            description={`Let's discuss how we can deliver world-class ${vertical.name.toLowerCase()} services tailored to your ${countryData.countryName} business.`}
          />
        </Container>
      </section>

      {/* Other Countries */}
      <section className="py-16 border-t border-border">
        <Container>
          <h2 className="text-3xl font-bold text-foreground mb-8">Available in Other Countries</h2>
          <CountryLinksGrid basePath={`/solutions/${vertical.slug}`} />
        </Container>
      </section>
    </>
  );
}
