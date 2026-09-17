import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { HeroMotion } from "@/components/HeroMotion";
import { LiveDemos } from "@/components/LiveDemos";
import { PainPointGrid, SolutionGrid } from "@/components/ContentGrids";
import { buildMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/jsonld";
import { countries, getCountryBySlug } from "@/data/countries";
import { getServiceBySlug } from "@/data/services";
import { cities } from "@/data/cities";
import { allLocales, countrySlugForLocale } from "@/lib/locale";
import {
  buildCountryOverview,
  buildCountryServiceHighlights,
  buildCountryIndustries,
  buildCountryEngineeringChecklist,
  buildCountryExtendedFaqs,
} from "@/lib/country-content-builder";

export function generateStaticParams() {
  return allLocales().map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const countrySlug = countrySlugForLocale(locale);
  const country = countrySlug ? getCountryBySlug(countrySlug) : undefined;
  if (!country) return {};

  return buildMetadata({
    title: country.metaTitle,
    description: country.metaDescription,
    path: `/${locale}`,
  });
}

export default async function LocaleCountryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const countrySlug = countrySlugForLocale(locale);
  const country = countrySlug ? getCountryBySlug(countrySlug) : undefined;
  if (!country) notFound();

  const overviewParagraphs = buildCountryOverview(country);
  const serviceHighlights = buildCountryServiceHighlights(country);
  const industryHighlights = buildCountryIndustries(country);
  const engineeringChecklist = buildCountryEngineeringChecklist(country);
  const extendedFaqs = buildCountryExtendedFaqs(country);
  const allFaqs = [...country.faqs, ...extendedFaqs];

  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />

      <section className="relative overflow-hidden border-b border-border py-14">
        <HeroMotion />
        <Container className="relative">
          <Breadcrumbs
            items={[
              { name: "Locations", href: "/locations" },
              { name: country.countryName, href: `/${locale}` },
            ]}
          />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
            <Icon name="map" className="w-3.5 h-3.5" />
            {country.region}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {country.h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{country.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
            >
              Talk to Our Team
              <Icon name="arrow" className="w-4 h-4" />
            </a>
            <a href="/?nogeo=1" className="text-xs text-muted hover:text-primary transition-colors">
              Not in {country.countryName}? View our global site
            </a>
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-border">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Overview" title={`Building technology for the ${country.countryName} market`} />
          <div className="mt-8 space-y-5">
            {overviewParagraphs.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading eyebrow="Regulatory Landscape" title={`What operators in ${country.countryName} need to know`} />
              <ul className="mt-8 grid grid-cols-1 gap-4">
                {country.regulatoryNotes.map((note) => (
                  <li key={note} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
                    <Icon name="check" className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed text-foreground/85">{note}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted max-w-2xl">
                This information is provided for general orientation only and is not legal or licensing advice. Always
                confirm current requirements with qualified local counsel.
              </p>
            </div>
            <div className="relative aspect-square md:aspect-video lg:aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
              <Image 
                src={`https://picsum.photos/seed/${country.slug}-reg/800/1000`} 
                alt={`${country.countryName} regulatory environment`}
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {country.detailedAnalysis && country.detailedAnalysis.length > 0 && (
        <section className="py-16 border-t border-border bg-surface">
          <Container className="max-w-6xl">
            <SectionHeading eyebrow="Market Analysis" title={`Deep dive into the ${country.countryName} market`} />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-12">
                {country.detailedAnalysis.map((analysis, i) => (
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
              <div className="relative sticky top-24 aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-2xl hidden lg:block">
                <Image 
                  src={`https://picsum.photos/seed/${country.slug}-market/800/600`} 
                  alt={`${country.countryName} market analysis`}
                  fill 
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {country.marketDrivers && country.marketDrivers.length > 0 && (
        <section className="py-16 border-t border-border">
          <Container>
            <SectionHeading eyebrow="Market Drivers" title={`Key catalysts accelerating growth in ${country.countryName}`} />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {country.marketDrivers.map((driver, i) => (
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
          <SectionHeading eyebrow="Where We Help" title={`Services we lead with in ${country.countryName}`} />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {country.focusServiceSlugs.map((slug) => {
              const service = getServiceBySlug(slug);
              if (!service) return null;
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}/${country.slug}`}
                  className="group rounded-xl border border-border bg-background p-5 hover:border-primary/50 transition-colors"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">{service.category}</p>
                  <h3 className="mt-1.5 text-sm font-semibold text-foreground">
                    {service.name} in {country.countryName}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                    View details
                    <Icon name="arrow" className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {serviceHighlights.length > 0 && (
        <section className="py-16 border-t border-border">
          <Container>
            <SectionHeading eyebrow="What We Build" title={`Engineering focus for ${country.countryName} businesses`} />
            <div className="mt-8">
              <SolutionGrid items={serviceHighlights} />
            </div>
          </Container>
        </section>
      )}

      {industryHighlights.length > 0 && (
        <section className="py-16 border-t border-border bg-surface">
          <Container>
            <SectionHeading eyebrow="Industries" title={`Sectors we support in ${country.countryName}`} />
            <div className="mt-8">
              <PainPointGrid items={industryHighlights} />
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-t border-border">
        <Container>
          <SectionHeading eyebrow="Our Standard" title={`What every ${country.countryName} engagement includes`} />
          <div className="mt-8">
            <SolutionGrid items={engineeringChecklist} />
          </div>
        </Container>
      </section>

      {cities.filter((c) => c.countrySlug === country.slug).length > 0 && (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="Cities" title={`Demand hub cities in ${country.countryName}`} />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {cities
                .filter((c) => c.countrySlug === country.slug)
                .map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${locale}/${city.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-surface p-5 hover:border-primary/50 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">{city.cityName}</span>
                    <Icon name="arrow" className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                  </Link>
                ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-t border-border">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${country.countryName} — frequently asked questions`} />
          <div className="mt-8">
            <FaqAccordion faqs={allFaqs} />
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
            title={`Building for the ${country.countryName} market?`}
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}

