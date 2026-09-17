import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { Icon } from "@/components/Icon";
import { PainPointGrid, SolutionGrid, RelatedServices } from "@/components/ContentGrids";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CountryLinksGrid } from "@/components/CountryLinksGrid";
import { LiveDemos } from "@/components/LiveDemos";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { industries, getIndustryBySlug } from "@/data/industries";
import { getIndustryImage } from "@/lib/unsplash-service";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return buildMetadata({
    title: `${industry.name} Software Development`,
    description: industry.metaDescription ?? industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  // Fetch unique image for this industry
  const industryImage = await getIndustryImage(industry.name);

  return (
    <>
      {industry.faqs && <JsonLd data={faqJsonLd(industry.faqs)} />}

      {industryImage && (
        <section className="border-b border-border">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <Image
              src={industryImage.url}
              alt={industryImage.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
          </div>
        </section>
      )}

      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Industries", href: "/industries" },
              { name: industry.name, href: `/industries/${industry.slug}` },
            ]}
          />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
            <Icon name={industry.icon as never} className="w-3.5 h-3.5" />
            Industry
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Software Development for {industry.name}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{industry.summary}</p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="What This Industry Needs" title="Common requirements we build for" />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {industry.needs.map((need) => (
              <li key={need} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
                <Icon name="check" className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span className="text-sm text-foreground/85">{need}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {industry.painPoints && (
        <section className="py-16 border-t border-border bg-surface">
          <Container>
            <SectionHeading eyebrow="The Challenge" title="Problems we see this industry struggling with" />
            <div className="mt-8">
              <PainPointGrid items={industry.painPoints} />
            </div>
          </Container>
        </section>
      )}

      {industry.approach && (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Our Approach" title="How Hurain Technologies solves it" />
            <div className="mt-8">
              <SolutionGrid items={industry.approach} />
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Relevant Services" title="Engineering practices for this industry" />
          <div className="mt-8">
            <RelatedServices slugs={industry.relatedServiceSlugs} />
          </div>
        </Container>
      </section>

      {industry.faqs && (
        <section className="py-16">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="FAQ" title={`${industry.name} — frequently asked questions`} />
            <div className="mt-8">
              <FaqAccordion faqs={industry.faqs} />
            </div>
          </Container>
        </section>
      )}

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Markets We Cover"
            title={`${industry.name} by country`}
            description={`Local regulatory context for ${industry.name.toLowerCase()} businesses in each market we serve.`}
          />
          <div className="mt-8">
            <CountryLinksGrid basePath={`/industries/${industry.slug}`} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <CtaSection
            title={`Building for ${industry.name.toLowerCase()}?`}
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}
