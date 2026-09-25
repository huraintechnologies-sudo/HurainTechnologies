import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SolutionsDirectory } from "@/components/SolutionsDirectory";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { LiveDemos } from "@/components/LiveDemos";
import { PainPointGrid, SolutionGrid } from "@/components/ContentGrids";
import { buildMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/jsonld";
import { locationContext } from "@/lib/geo-facts";
import { buildMarketBrief } from "@/lib/solution-location-content";
import { placeJsonLd } from "@/lib/location-seo";
import { siteConfig } from "@/lib/site-config";
import { LocalMarketSection } from "@/components/location/LocalMarketSection";
import { TrustSections } from "@/components/TrustSections";
import { getCityBySlug } from "@/data/cities";
import { cities as curatedCities } from "@/data/cities-curated";
import { getCountryBySlug } from "@/data/countries";
import { getServiceBySlug } from "@/data/services";
import { countrySlugForLocale, localeForCountrySlug } from "@/lib/locale";
import {
  buildCityOverview,
  buildCityProblems,
  buildCityServiceHighlights,
  buildCityIndustries,
  buildCityEngineeringChecklist,
  buildCityExtendedFaqs,
} from "@/lib/city-content-builder";

interface Props {
  params: Promise<{ locale: string; city: string }>;
}

// dynamicParams stays true (default) so every city still resolves via
// on-demand ISR; this just pre-renders the curated set and revalidates
// rarely, since content is near-static, to keep ISR writes low.
export const revalidate = 2592000; // 30 days

export function generateStaticParams() {
  return curatedCities.map((city) => ({
    locale: localeForCountrySlug(city.countrySlug) ?? city.countrySlug,
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city: citySlug } = await params;
  const countrySlug = countrySlugForLocale(locale);
  const city = countrySlug ? getCityBySlug(citySlug) : undefined;
  if (!city || city.countrySlug !== countrySlug) return {};

  const meta = buildMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/${locale}/${city.slug}`,
  });
  const ctx = locationContext(city.countrySlug, city.slug);
  const img = ctx.city?.image || ctx.country?.image;
  return img ? { ...meta, openGraph: { ...meta.openGraph, images: [{ url: img, alt: city.cityName }] } } : meta;
}

export default async function CityPage({ params }: Props) {
  const { locale, city: citySlug } = await params;
  const countrySlug = countrySlugForLocale(locale);
  if (!countrySlug) notFound();

  const city = getCityBySlug(citySlug);
  if (!city || city.countrySlug !== countrySlug) notFound();

  const country = getCountryBySlug(countrySlug);

  const overviewParagraphs = buildCityOverview(city, country);
  const cityProblems = buildCityProblems(city, country);
  const serviceHighlights = buildCityServiceHighlights(city);
  const industryHighlights = buildCityIndustries(city);
  const engineeringChecklist = buildCityEngineeringChecklist(city);
  const extendedFaqs = buildCityExtendedFaqs(city, country);
  const ctx = locationContext(countrySlug, city.slug);
  const countryName = country?.countryName ?? city.countrySlug;
  const allFaqs = [...city.faqs, ...extendedFaqs, ...buildMarketBrief(ctx, city.cityName, countryName, "Software Development", true).faqs];
  // ServiceArea signal for the city: our Organization serving this City
  // (no fake local address — see locationPageJsonLd for why).
  const serviceArea = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Software development in ${city.cityName}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: placeJsonLd(countryName, ctx.country, city.cityName, ctx.city),
    url: `${siteConfig.url}/${locale}/${city.slug}`,
  };

  return (
    <>
      <JsonLd data={[faqJsonLd(allFaqs), serviceArea]} />

      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Locations", href: "/locations" },
              ...(country ? [{ name: country.countryName, href: `/${locale}` }] : []),
              { name: city.cityName, href: `/${locale}/${city.slug}` },
            ]}
          />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
            <Icon name="map" className="w-3.5 h-3.5" />
            {country?.countryName ?? city.countrySlug}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {city.h1}
          </h1>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
            >
              Talk to Our Team
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </section>

      <section className="py-16 border-b border-border">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Overview" title={`Building technology for ${city.cityName} businesses`} />
          <div className="mt-8 space-y-5">
            {overviewParagraphs.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {cityProblems.length > 0 && (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow="The Challenge" title={`What businesses run into in ${city.cityName}`} />
            <div className="mt-8">
              <PainPointGrid items={cityProblems} />
            </div>
          </Container>
        </section>
      )}

      {serviceHighlights.length > 0 && (
        <section className="py-16 border-t border-border bg-surface">
          <Container>
            <SectionHeading eyebrow="How We Solve It" title={`Engineering focus for ${city.cityName} businesses`} />
            <div className="mt-8">
              <SolutionGrid items={serviceHighlights} />
            </div>
          </Container>
        </section>
      )}

      {city.detailedAnalysis && city.detailedAnalysis.length > 0 && (
        <section className="py-16 border-t border-border">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="Market Analysis" title={`A closer look at ${city.cityName}`} />
            <div className="mt-8 space-y-10">
              {city.detailedAnalysis.map((analysis, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-foreground">{analysis.heading}</h3>
                  <div className="mt-3 space-y-4">
                    {analysis.paragraphs.map((paragraph, j) => (
                      <p key={j} className="text-sm leading-relaxed text-muted sm:text-base">
                        {paragraph}
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
        <section className="py-16 border-t border-border bg-surface">
          <Container>
            <SectionHeading eyebrow="Market Drivers" title={`What's accelerating growth in ${city.cityName}`} />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {city.marketDrivers.map((driver, i) => (
                <div key={i} className="rounded-xl border border-border bg-background p-5">
                  <Icon name="check" className="w-5 h-5 text-primary mb-4" />
                  <p className="text-sm leading-relaxed text-foreground/90">{driver}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {industryHighlights.length > 0 && (
        <section className="py-16 border-t border-border">
          <Container>
            <SectionHeading eyebrow="Industries" title={`Sectors we support in ${city.cityName}`} />
            <div className="mt-8">
              <PainPointGrid items={industryHighlights} />
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Our Standard" title={`What every ${city.cityName} engagement includes`} />
          <div className="mt-8">
            <SolutionGrid items={engineeringChecklist} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Where We Help" title={`Services we lead with in ${city.cityName}`} />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {city.focusServiceSlugs.map((slug) => {
              const service = getServiceBySlug(slug);
              if (!service) return null;
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}/${city.countrySlug}/${city.slug}`}
                  className="group rounded-xl border border-border bg-background p-5 hover:border-primary/50 transition-colors"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-primary">{service.category}</p>
                  <h3 className="mt-1.5 text-sm font-semibold text-foreground">
                    {service.name} in {city.cityName}
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

      <SolutionsDirectory countrySlug={city.countrySlug} citySlug={city.slug} placeName={city.cityName} />

      <LocalMarketSection ctx={ctx} placeName={city.cityName} countryName={countryName} topic="Software Development" isCity />

      <TrustSections topic="Software Development" place={`${city.cityName}, ${countryName}`} />

      <section className="py-16 border-t border-border">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${city.cityName} — frequently asked questions`} />
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
            title={`Building for the ${city.cityName} market?`}
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}
