import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { LiveDemos } from "@/components/LiveDemos";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { itemListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { countries, getCountryBySlug } from "@/data/countries";
import { cities } from "@/data/cities";
import { localeForCountrySlug } from "@/lib/locale";
import { TrustSections } from "@/components/TrustSections";
import { PageFaq } from "@/components/PageFaq";
import { pageFaqs } from "@/data/page-faqs";

export const metadata: Metadata = buildMetadata({
  title: "Locations We Serve | Blockchain & Payments Software Development Worldwide",
  description:
    "Hurain Technologies delivers blockchain, payments, and fintech software development across 60+ regulated markets including the UK, UAE, Malta, Singapore, the US, and more.",
  path: "/locations",
});

const regions = Array.from(new Set(countries.map((c) => c.region)));

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={[
          itemListJsonLd(
            "Markets Hurain Technologies Serves",
            countries.map((c) => ({ name: c.countryName, url: `${siteConfig.url}/${localeForCountrySlug(c.slug)}` }))
          ),
          itemListJsonLd(
            "Cities Hurain Technologies Serves",
            cities.map((c) => ({ name: c.cityName, url: `${siteConfig.url}/${localeForCountrySlug(c.countrySlug)}/${c.slug}` }))
          ),
        ]}
      />
      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs items={[{ name: "Locations", href: "/locations" }]} />
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Locations We Serve
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            We deliver blockchain, payments, and fintech software development across {countries.length}+
            regulated markets and {cities.length}+ demand hub cities, with architecture and compliance-aware
            engineering tailored to each jurisdiction's regulatory environment.
          </p>
        </Container>
      </section>

      {regions.map((region) => (
        <section key={region} className="py-14 border-b border-border last:border-b-0">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">{region}</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {countries
                .filter((c) => c.region === region)
                .map((country) => (
                  <Link
                    key={country.slug}
                    href={`/${localeForCountrySlug(country.slug)}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-surface p-5 hover:border-primary/50 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">{country.countryName}</span>
                    <Icon name="arrow" className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                  </Link>
                ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="py-14 border-t border-border bg-surface">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Top Demand Hub Cities</p>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {cities.length} cities with genuine, concentrated demand for blockchain, payments, and fintech
            engineering — each with local market context alongside its national regulatory framework.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => {
              const country = getCountryBySlug(city.countrySlug);
              return (
                <Link
                  key={city.slug}
                  href={`/${localeForCountrySlug(city.countrySlug)}/${city.slug}`}
                  className="group flex min-w-0 items-center justify-between gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm hover:border-primary/50 transition-colors"
                >
                  <span className="min-w-0 flex-1" style={{ overflowWrap: "anywhere" }}>
                    <span className="block text-foreground/85">{city.cityName}</span>
                    {country && <span className="block text-xs text-muted">{country.countryName}</span>}
                  </span>
                  <Icon name="arrow" className="w-3.5 h-3.5 shrink-0 text-muted group-hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <TrustSections topic="Software Development" />
      <PageFaq title="Locations — frequently asked questions" faqs={pageFaqs.locations} />

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <CtaSection
            title="Don't see your market listed?"
            description="We regularly expand into new regulated markets — reach out and we'll scope the technical and compliance landscape together."
          />
        </Container>
      </section>
    </>
  );
}
