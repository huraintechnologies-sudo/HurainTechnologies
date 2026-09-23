import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import {
  PainPointGrid,
  SolutionGrid,
  TechStackGrid,
  ProcessSteps,
  ProofBox,
  RelatedServices,
} from "@/components/ContentGrids";
import { CountryLinksGrid } from "@/components/CountryLinksGrid";
import { LiveDemos } from "@/components/LiveDemos";
import { buildMetadata } from "@/lib/seo";
import { faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { getServicePageSchemas } from "@/lib/jsonld-universal";
import { buildServicePageKeywords } from "@/lib/keywords-builder";
import { services, getServiceBySlug } from "@/data/services";
import { getServiceImage } from "@/lib/unsplash-service";
import { TrustSections } from "@/components/TrustSections";

// Unique photorealistic image per service
const serviceImages: Record<string, { src: string; alt: string }> = {
  "blockchain-cryptocurrency-development": {
    src: "/images/blockchain-hardware.jpg",
    alt: "Ledger hardware wallet connected to Ethereum blockchain interface, representing professional blockchain and cryptocurrency development services",
  },
  "smart-contract-development": {
    src: "/images/blockchain-network.jpg",
    alt: "Decentralized blockchain smart contract network nodes and cryptographic transaction visualization",
  },
  "crypto-exchange-wallet-development": {
    src: "/images/blockchain-hardware.jpg",
    alt: "Cryptocurrency hardware wallet and Ethereum exchange interface for secure crypto custody and exchange development",
  },
  "payment-gateway-integration": {
    src: "/images/payment-terminal.jpg",
    alt: "Contactless payment card tap on a modern POS terminal representing payment gateway integration services",
  },
  "api-integration-services": {
    src: "/images/api-developer.jpg",
    alt: "Software developer writing API integration code in VS Code and testing with Postman",
  },
  "cloud-application-modernization": {
    src: "/images/cloud-datacenter.jpg",
    alt: "Hyperscale cloud data center server room with rows of rack servers representing cloud application modernization and DevOps services",
  },
  "ai-fraud-detection-automation": {
    src: "/images/case-study-fintech.jpg",
    alt: "Fintech AI fraud detection analytics dashboard showing real-time transaction monitoring and risk scoring metrics",
  },
  "cybersecurity-compliance": {
    src: "/images/why-choose-us.jpg",
    alt: "Secure enterprise server room with holographic digital security shield representing cybersecurity and compliance engineering",
  },
};
const defaultServiceImage = { src: "/images/hero-dashboard.jpg", alt: "Enterprise fintech platform dashboard built by Hurain Technologies" };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Try to fetch unique image from Unsplash, fallback to static image
  let serviceImg: { src: string; alt: string };
  const unsplashImage = await getServiceImage(service.name);
  if (unsplashImage) {
    serviceImg = { src: unsplashImage.url, alt: unsplashImage.alt };
  } else {
    serviceImg = serviceImages[slug] ?? defaultServiceImage;
  }

  return (
    <>
      <JsonLd data={getServicePageSchemas(serviceJsonLd(service), faqJsonLd(service.faqs))} />

      <section className="border-b border-border">
        {/* Service hero image */}
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <Image
            src={serviceImg.src}
            alt={serviceImg.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </div>
        <Container className="pb-14 pt-8">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.navLabel, href: `/services/${service.slug}` },
            ]}
          />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
            <Icon name={service.icon as never} className="w-3.5 h-3.5" />
            {service.category}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {service.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{service.intro}</p>
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

      {service.extendedOverview && service.extendedOverview.length > 0 && (
        <section className="py-16">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="Overview" title={`What ${service.name.toLowerCase()} actually involves`} />
            <div className="mt-8 space-y-5">
              {service.extendedOverview.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-t border-border">
        <Container>
          <SectionHeading eyebrow="The Challenge" title="Problems we see teams struggling with" />
          <div className="mt-8">
            <PainPointGrid items={service.painPoints} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Our Approach" title="How Hurain Technologies solves it" />
          <div className="mt-8">
            <SolutionGrid items={service.solutions} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Technology" title="Tech stack we work with" />
          <div className="mt-8">
            <TechStackGrid groups={service.techStack} />
          </div>
          {service.techDeepDive && service.techDeepDive.length > 0 && (
            <div className="mt-8 max-w-3xl space-y-5">
              {service.techDeepDive.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </Container>
      </section>

      {service.useCases && service.useCases.length > 0 && (
        <section className="py-16 border-t border-border bg-surface">
          <Container>
            <SectionHeading eyebrow="Use Cases" title={`Where ${service.name.toLowerCase()} gets used`} />
            <div className="mt-8">
              <SolutionGrid items={service.useCases} />
            </div>
          </Container>
        </section>
      )}

      {service.securityChecklist && service.securityChecklist.length > 0 && (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Security" title="Our engineering security checklist" />
            <div className="mt-8">
              <SolutionGrid items={service.securityChecklist} />
            </div>
          </Container>
        </section>
      )}

      {service.comparisonPoints && service.comparisonPoints.length > 0 && (
        <section className="py-16 border-t border-border bg-surface">
          <Container>
            <SectionHeading eyebrow="Comparison" title="How this compares to other ways to build" />
            <div className="mt-8">
              <PainPointGrid items={service.comparisonPoints} />
            </div>
          </Container>
        </section>
      )}

      {service.deliverables && service.deliverables.length > 0 && (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Deliverables" title="What you actually receive" />
            <div className="mt-8">
              <SolutionGrid items={service.deliverables} />
            </div>
          </Container>
        </section>
      )}

      {service.timelinePhases && service.timelinePhases.length > 0 && (
        <section className="py-16 border-t border-border bg-surface">
          <Container>
            <SectionHeading eyebrow="Timeline" title="A typical project week by week" />
            <div className="mt-8">
              <ProcessSteps steps={service.timelinePhases} />
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Proof" title="Results we've delivered" />
          <div className="mt-8 max-w-3xl">
            <ProofBox>{service.proof}</ProofBox>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Process" title="How an engagement runs" />
          <div className="mt-8">
            <ProcessSteps steps={service.process} />
          </div>
        </Container>
      </section>

      {service.engagementModels && service.engagementModels.length > 0 && (
        <section className="py-16 border-t border-border bg-surface">
          <Container>
            <SectionHeading eyebrow="Engagement Models" title="How we structure the work" />
            <div className="mt-8">
              <PainPointGrid items={service.engagementModels} />
            </div>
          </Container>
        </section>
      )}

      {service.commonMistakes && service.commonMistakes.length > 0 && (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Pitfalls" title="Mistakes we see teams make" />
            <div className="mt-8">
              <PainPointGrid items={service.commonMistakes} />
            </div>
          </Container>
        </section>
      )}

      {service.glossary && service.glossary.length > 0 && (
        <section className="py-16 border-t border-border bg-surface">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="Glossary" title="Key terms explained" />
            <dl className="mt-8 space-y-5">
              {service.glossary.map((entry) => (
                <div key={entry.term} className="rounded-xl border border-border bg-background p-5">
                  <dt className="text-sm font-semibold text-foreground">{entry.term}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">{entry.definition}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      <section className="py-16 border-t border-border bg-surface">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${service.navLabel} — frequently asked questions`} />
          <div className="mt-8">
            <FaqAccordion faqs={service.faqs} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Related Services" title="Often paired with" />
          <div className="mt-8">
            <RelatedServices slugs={service.relatedSlugs} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Markets We Cover"
            title={`${service.navLabel} by country`}
            description={`Local regulatory context and delivery details for ${service.navLabel.toLowerCase()} in each market we serve.`}
          />
          <div className="mt-8">
            <CountryLinksGrid basePath={`/services/${service.slug}`} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <TrustSections topic={service.navLabel} />

      <section className="pb-20">
        <Container>
          <CtaSection
            title={`Ready to start your ${service.name.toLowerCase()} project?`}
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}
