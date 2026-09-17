import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LiveDemos } from "@/components/LiveDemos";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { PainPointGrid, SolutionGrid, RelatedServices } from "@/components/ContentGrids";
import { buildMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/jsonld";
import { industries, getIndustryBySlug } from "@/data/industries";
import { countries, getCountryBySlug } from "@/data/countries";
import { FaqItem } from "@/lib/types";
import { localeForCountrySlug } from "@/lib/locale";

export const revalidate = 3600; // ISR: revalidate every hour

export function generateStaticParams() {
  // Limit pre-rendering to top 2 industries × 10 top countries (~20 pages)
  // Rest use on-demand ISR (Vercel will cache on first visit)
  const topIndustries = industries.slice(0, 2);
  const topCountries = countries.slice(0, 10);
  return topIndustries.flatMap((industry) =>
    topCountries.map((country) => ({ slug: industry.slug, country: country.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; country: string }>;
}): Promise<Metadata> {
  const { slug, country: countrySlug } = await params;
  const industry = getIndustryBySlug(slug);
  const country = getCountryBySlug(countrySlug);
  if (!industry || !country) return {};

  return buildMetadata({
    title: `${industry.name} Software Development in ${country.countryName}`,
    description: `${industry.summary} ${country.regulatoryNotes[0]}`,
    path: `/industries/${industry.slug}/${country.slug}`,
  });
}

export default async function IndustryCountryPage({
  params,
}: {
  params: Promise<{ slug: string; country: string }>;
}) {
  const { slug, country: countrySlug } = await params;
  const industry = getIndustryBySlug(slug);
  const country = getCountryBySlug(countrySlug);
  if (!industry || !country) notFound();

  const combinedFaqs: FaqItem[] = [...country.faqs, ...(industry.faqs ?? []).slice(0, 4)];

  return (
    <>
      <JsonLd data={faqJsonLd(combinedFaqs)} />

      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Industries", href: "/industries" },
              { name: industry.name, href: `/industries/${industry.slug}` },
              { name: country.countryName, href: `/industries/${industry.slug}/${country.slug}` },
            ]}
          />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
            <Icon name={industry.icon as never} className="w-3.5 h-3.5" />
            {industry.name} · {country.countryName}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {industry.name} Software Development in {country.countryName}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {industry.summary} In {country.countryName}, that means building to the expectations of{" "}
            {country.region.replace(/Tier \d+ — /, "")}: {country.regulatoryNotes[0]}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
            >
              Get a {country.countryName} Estimate
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
            <Link
              href={`/${localeForCountrySlug(country.slug)}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              View {country.countryName} Overview
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow={`${country.countryName} Regulatory Landscape`}
            title={`What ${industry.name.toLowerCase()} businesses in ${country.countryName} need to know`}
          />
          <ul className="mt-8 grid grid-cols-1 gap-4">
            {country.regulatoryNotes.map((note) => (
              <li key={note} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
                <Icon name="check" className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-foreground/85">{note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-xs text-muted">
            This information is provided for general orientation only and is not legal or licensing advice. Always
            confirm current requirements with qualified local counsel.
          </p>
        </Container>
      </section>

      {industry.painPoints && (
        <section className="py-16 border-t border-border bg-surface">
          <Container>
            <SectionHeading eyebrow="The Challenge" title={`What ${industry.name.toLowerCase()} operators struggle with`} />
            <div className="mt-8">
              <PainPointGrid items={industry.painPoints} />
            </div>
          </Container>
        </section>
      )}

      {industry.approach && (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Our Approach" title={`How we support ${industry.name.toLowerCase()} in ${country.countryName}`} />
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

      {combinedFaqs.length > 0 && (
        <section className="py-16">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="FAQ" title={`${industry.name} in ${country.countryName} — FAQ`} />
            <div className="mt-8">
              <FaqAccordion faqs={combinedFaqs} />
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-t border-border">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <CtaSection
            title={`Building for ${industry.name.toLowerCase()} in ${country.countryName}?`}
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}
