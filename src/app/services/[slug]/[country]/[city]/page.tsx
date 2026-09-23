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
import { locationContext, getCityFacts } from "@/lib/geo-facts";
import { buildMarketBrief } from "@/lib/solution-location-content";
import { placeJsonLd } from "@/lib/location-seo";
import { cityDisplayName } from "@/lib/location-links";
import { LocalMarketSection } from "@/components/location/LocalMarketSection";
import { QuickAnswer, LinkPills } from "@/components/location/LocationBlocks";
import { TrustSections } from "@/components/TrustSections";

// Revalidate rarely — content is near-static — to keep ISR writes low.
// Every other city still resolves via on-demand ISR (dynamicParams
// defaults to true, nothing 404s); this just pre-renders the curated set.
export const revalidate = 2592000; // 30 days

export function generateStaticParams() {
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

  const ctx = locationContext(country.slug, city.slug);
  const cityName = cityDisplayName(city, ctx.city);
  const meta = buildMetadata({
    title: `${service.name} in ${cityName}, ${country.countryName}`,
    description: `${service.name} for businesses in ${cityName}, ${country.countryName} — 24/7 support${ctx.market.payments ? `, ${ctx.market.payments[0]} integration` : ""} and a fixed-scope estimate in 5 business days.`,
    path: `/services/${service.slug}/${country.slug}/${city.slug}`,
    keywords: [...service.keywords, `${service.name.toLowerCase()} in ${cityName.toLowerCase()}`, `${cityName.toLowerCase()} software company`],
  });
  const img = ctx.city?.image || ctx.country?.image;
  return img ? { ...meta, openGraph: { ...meta.openGraph, images: [{ url: img, alt: cityName }] } } : meta;
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

  const ctx = locationContext(country.slug, city.slug);
  const cityName = cityDisplayName(city, ctx.city);
  const brief = buildMarketBrief(ctx, cityName, country.countryName, service.navLabel, true);
  const siblings = cities
    .filter((c) => c.countrySlug === country.slug && c.slug !== city.slug)
    .map((c) => ({ name: cityDisplayName(c, getCityFacts(country.slug, c.slug)), href: `/services/${service.slug}/${country.slug}/${c.slug}`, pop: getCityFacts(country.slug, c.slug)?.population || 0 }))
    .sort((a, b) => b.pop - a.pop)
    .slice(0, 16);
  const combinedFaqs: FaqItem[] = [
    ...brief.faqs,
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
            name: `${service.name} in ${cityName}`,
            areaServed: placeJsonLd(country.countryName, ctx.country, cityName, ctx.city),
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
            {service.category} · {cityName}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {service.name} in {cityName}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {service.intro} In {cityName}, that means building to the technical expectations of the local market.
          </p>
          <div className="max-w-3xl">
            <QuickAnswer
              question={`Who provides ${service.navLabel.toLowerCase()} in ${cityName}?`}
              answer={`Hurain Technologies delivers ${service.name.toLowerCase()} for companies in ${cityName}, ${country.countryName}, available 24/7, with builds that support ${ctx.market.payments ? ctx.market.payments.slice(0, 2).join(" and ") : "local payment methods"}${ctx.market.tax ? `, ${ctx.market.tax}` : ""} and ${ctx.market.privacyLaw || "local data-protection rules"}.`}
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
            >
              Get a {cityName} Estimate
              <Icon name="arrow" className="w-4 h-4" />
            </Link>
            <Link
              href={`/${localeForCountrySlug(country.slug)}/${city.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              View {cityName} Overview
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow={`${cityName} Market Landscape`}
            title={`Why ${service.navLabel.toLowerCase()} is critical in ${cityName}`}
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
            <SectionHeading eyebrow="Market Analysis" title={`Deep dive into the ${cityName} market`} />
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
            <SectionHeading eyebrow="Market Drivers" title={`Key catalysts accelerating growth in ${cityName}`} />
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

      <LocalMarketSection ctx={ctx} placeName={cityName} countryName={country.countryName} topic={service.navLabel} isCity />

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
          <SectionHeading eyebrow="Our Approach" title={`How we deliver ${service.navLabel.toLowerCase()} in ${cityName}`} />
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

      <TrustSections topic={service.navLabel} place={`${cityName}, ${country.countryName}`} />

      <section className="py-16 border-t border-border">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${service.navLabel} in ${cityName} — FAQ`} />
          <div className="mt-8">
            <FaqAccordion faqs={combinedFaqs} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <h2 className="text-lg font-semibold text-foreground">{service.navLabel} in other {country.countryName} cities</h2>
          <div className="mt-4">
            <LinkPills links={[{ name: `All of ${country.countryName}`, href: `/services/${service.slug}/${country.slug}` }, ...siblings]} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <CtaSection
            title={`Ready to bring ${service.name.toLowerCase()} to ${cityName}?`}
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}
