import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { PainPointGrid, SolutionGrid, TechStackGrid } from "@/components/ContentGrids";
import { LiveDemos } from "@/components/LiveDemos";
import { buildMetadata } from "@/lib/seo";
import { faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { services, getServiceBySlug } from "@/data/services";
import { countries, getCountryBySlug } from "@/data/countries";
import { cities, getCityBySlug } from "@/data/cities";
import { cities as curatedCities } from "@/data/cities-curated";
import { FaqItem } from "@/lib/types";
import { localeForCountrySlug } from "@/lib/locale";

// Enable Incremental Static Regeneration for unbuilt cities
export const dynamicParams = true;

export function generateStaticParams() {
  // Only build combinations for the curated hub cities to keep build times fast
  return services.flatMap((service) =>
    curatedCities.map((city) => ({
      slug: service.slug,
      country: city.countrySlug,
      city: city.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; country: string; city: string }>;
}): Promise<Metadata> {
  const { slug, country: countrySlug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const country = getCountryBySlug(countrySlug);
  const city = getCityBySlug(citySlug);
  
  if (!service || !country || !city || city.countrySlug !== countrySlug) return {};

  return buildMetadata({
    title: `${service.name} in ${city.cityName}, ${country.countryName}`,
    description: `${service.name} for businesses in ${city.cityName}. ${city.intro} Talk to Hurain Technologies about your ${city.cityName} engagement.`,
    path: `/services/${service.slug}/${country.slug}/${city.slug}`,
    keywords: [...service.keywords, `${service.name.toLowerCase()} in ${city.cityName.toLowerCase()}`, `${city.cityName.toLowerCase()} tech hub`],
  });
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string; country: string; city: string }>;
}) {
  const { slug, country: countrySlug, city: citySlug } = await params;
  const service = getServiceBySlug(slug);
  const country = getCountryBySlug(countrySlug);
  const city = getCityBySlug(citySlug);

  if (!service || !country || !city || city.countrySlug !== countrySlug) notFound();

  const combinedFaqs: FaqItem[] = [
    ...(city.faqs || []),
    ...(country.faqs || []),
    ...service.faqs.slice(0, 4)
  ];

  return (
    <>
      <JsonLd
        data={[
          {
            ...serviceJsonLd(service),
            "@id": `${service.slug}-${city.slug}#service`,
            name: `${service.name} in ${city.cityName}`,
            areaServed: { "@type": "City", name: city.cityName },
          },
          faqJsonLd(combinedFaqs),
        ]}
      />

      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.navLabel, href: `/services/${service.slug}` },
              { name: country.countryName, href: `/services/${service.slug}/${country.slug}` },
              { name: city.cityName, href: `/services/${service.slug}/${country.slug}/${city.slug}` },
            ]}
          />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
            <Icon name={service.icon as never} className="w-3.5 h-3.5" />
            {service.category} · {city.cityName}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {service.name} in {city.cityName}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {service.intro} In {city.cityName}, that means building to the technical expectations of the local market.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
            >
              Get a {city.cityName} Estimate
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
            <Link
              href={`/${localeForCountrySlug(country.slug)}/${city.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              View {city.cityName} Overview
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow={`${city.cityName} Market Landscape`}
            title={`Why ${service.navLabel.toLowerCase()} is critical in ${city.cityName}`}
          />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {city.hubFacts.map((fact) => (
              <li key={fact} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
                <Icon name="check" className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-foreground/85">{fact}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {city.detailedAnalysis && city.detailedAnalysis.length > 0 && (
        <section className="py-16 border-t border-border bg-surface">
          <Container className="max-w-4xl">
            <SectionHeading eyebrow="Market Analysis" title={`Deep dive into the ${city.cityName} market`} />
            <div className="mt-8 space-y-12">
              {city.detailedAnalysis.map((analysis, i) => (
                <div key={i} className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-semibold text-foreground">{analysis.heading}</h3>
                  <div className="mt-4 space-y-4">
                    {analysis.paragraphs.map((para, j) => (
                      <p key={j} className="text-sm leading-relaxed text-muted sm:text-base">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {city.marketDrivers && city.marketDrivers.length > 0 && (
        <section className="py-16 border-t border-border">
          <Container>
            <SectionHeading eyebrow="Market Drivers" title={`Key catalysts accelerating growth in ${city.cityName}`} />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {city.marketDrivers.map((driver, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-6">
                  <Icon name="check" className="w-5 h-5 text-primary mb-4" />
                  <p className="text-sm leading-relaxed text-foreground/90">{driver}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="The Challenge" title="Problems we see teams struggling with" />
          <div className="mt-8">
            <PainPointGrid items={service.painPoints} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Our Approach" title={`How we deliver ${service.navLabel.toLowerCase()} in ${city.cityName}`} />
          <div className="mt-8">
            <SolutionGrid items={service.solutions} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Technology" title="Tech stack we work with" />
          <div className="mt-8">
            <TechStackGrid groups={service.techStack} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${service.navLabel} in ${city.cityName} — FAQ`} />
          <div className="mt-8">
            <FaqAccordion faqs={combinedFaqs} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <CtaSection
            title={`Ready to bring ${service.name.toLowerCase()} to ${city.cityName}?`}
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}
