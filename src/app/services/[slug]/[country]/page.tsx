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
import { getCountryBySlug } from "@/data/countries";
import { priorityCountries as curatedCountries } from "@/data/countries";
import { FaqItem } from "@/lib/types";
import { localeForCountrySlug } from "@/lib/locale";
import { cities } from "@/data/cities";
import { locationContext, getCityFacts } from "@/lib/geo-facts";
import { buildMarketBrief } from "@/lib/solution-location-content";
import { countryHreflang, placeJsonLd } from "@/lib/location-seo";
import { sameRegionCountries, cityDisplayName } from "@/lib/location-links";
import { LocalMarketSection } from "@/components/location/LocalMarketSection";
import { QuickAnswer, LinkPills } from "@/components/location/LocationBlocks";
import { TrustSections } from "@/components/TrustSections";

// Pre-render the curated set at build time; every other country still
// resolves via on-demand ISR (dynamicParams defaults to true, nothing 404s).
export function generateStaticParams() {
  return services.flatMap((service) =>
    curatedCountries.map((country) => ({ slug: service.slug, country: country.slug }))
  );
}

// Revalidate rarely — content is near-static — to keep ISR writes low.
export const revalidate = 2592000; // 30 days

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; country: string }>;
}): Promise<Metadata> {
  const { slug, country: countrySlug } = await params;
  const service = getServiceBySlug(slug);
  const country = getCountryBySlug(countrySlug);
  if (!service || !country) return {};

  const ctx = locationContext(country.slug);
  const meta = buildMetadata({
    title: `${service.name} in ${country.countryName}${ctx.country?.currency ? ` | ${ctx.country.currency.code} Pricing` : ""}`,
    description: `${service.name} for businesses in ${country.countryName}. ${country.regulatoryNotes[0]} Talk to Hurain Technologies about your ${country.countryName} engagement.`,
    path: `/services/${service.slug}/${country.slug}`,
    keywords: [...service.keywords, `${service.name.toLowerCase()} in ${country.countryName.toLowerCase()}`],
  });
  return {
    ...meta,
    alternates: { canonical: meta.alternates?.canonical, languages: countryHreflang(`/services/${service.slug}`, `/services/${service.slug}`) },
    ...(ctx.country?.image ? { openGraph: { ...meta.openGraph, images: [{ url: ctx.country.image, alt: country.countryName }] } } : {}),
  };
}

export default async function ServiceCountryPage({
  params,
}: {
  params: Promise<{ slug: string; country: string }>;
}) {
  const { slug, country: countrySlug } = await params;
  const service = getServiceBySlug(slug);
  const country = getCountryBySlug(countrySlug);
  if (!service || !country) notFound();

  const ctx = locationContext(country.slug);
  const brief = buildMarketBrief(ctx, country.countryName, country.countryName, service.navLabel);
  const combinedFaqs: FaqItem[] = [...country.faqs, ...brief.faqs, ...service.faqs.slice(0, 4)];
  const countryCities = cities
    .filter((c) => c.countrySlug === country.slug)
    .map((c) => ({ name: cityDisplayName(c, getCityFacts(country.slug, c.slug)), href: `/services/${service.slug}/${country.slug}/${c.slug}`, pop: getCityFacts(country.slug, c.slug)?.population || 0 }))
    .sort((a, b) => b.pop - a.pop)
    .slice(0, 24);

  return (
    <>
      <JsonLd
        data={[
          {
            ...serviceJsonLd(service),
            "@id": `${service.slug}-${country.slug}#service`,
            name: `${service.name} in ${country.countryName}`,
            areaServed: placeJsonLd(country.countryName, ctx.country),
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
            ]}
          />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
            <Icon name={service.icon as never} className="w-3.5 h-3.5" />
            {service.category} · {country.countryName}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {service.name} in {country.countryName}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {service.intro} In {country.countryName}, that means building to the technical expectations of{" "}
            {country.region.replace(/Tier \d+ — /, "")}: {country.regulatoryNotes[0]}
          </p>
          <div className="max-w-3xl">
            <QuickAnswer
              question={`Who provides ${service.navLabel.toLowerCase()} in ${country.countryName}?`}
              answer={`Hurain Technologies delivers ${service.name.toLowerCase()} for businesses in ${country.countryName}, with a team available 24/7. Builds account for ${ctx.market.tax ? `${ctx.market.tax}, ` : ""}${ctx.market.payments ? `local payment rails such as ${ctx.market.payments.slice(0, 2).join(" and ")}, ` : ""}and ${ctx.market.privacyLaw || "local data-protection rules"}. Discovery starts within 5 business days.`}
            />
          </div>
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
            title={`What ${service.navLabel.toLowerCase()} buyers in ${country.countryName} need to know`}
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

      <LocalMarketSection ctx={ctx} placeName={country.countryName} countryName={country.countryName} topic={service.navLabel} />

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
          <SectionHeading eyebrow="Our Approach" title={`How we deliver ${service.navLabel.toLowerCase()} in ${country.countryName}`} />
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

      <TrustSections topic={service.navLabel} place={country.countryName} />

      <section className="py-16 border-t border-border">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${service.navLabel} in ${country.countryName} — FAQ`} />
          <div className="mt-8">
            <FaqAccordion faqs={combinedFaqs} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container className="space-y-10">
          {countryCities.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">{service.navLabel} by city in {country.countryName}</h2>
              <div className="mt-4"><LinkPills links={countryCities} /></div>
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-foreground">{service.navLabel} in nearby countries</h2>
            <div className="mt-4"><LinkPills links={sameRegionCountries(country.slug, 12).map((c) => ({ name: c.countryName, href: `/services/${service.slug}/${c.slug}` }))} /></div>
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
            title={`Ready to bring ${service.name.toLowerCase()} to ${country.countryName}?`}
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}
