import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { LiveDemos } from "@/components/LiveDemos";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { itemListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { localeForCountrySlug } from "@/lib/locale";
import { services } from "@/data/services";
import { countries } from "@/data/countries";
import { TrustSections } from "@/components/TrustSections";

export const metadata: Metadata = buildMetadata({
  title: "Professional Software Development Services | Blockchain, Crypto, Payments, Cloud, AI & More",
  description:
    "Expert software development services from Hurain Technologies: blockchain & Web3 development, cryptocurrency solutions, payment gateway integration, fintech, cloud modernization, AI fraud detection, cybersecurity, and compliance. 16+ years experience, 2000+ projects delivered globally.",
  path: "/services",
  keywords: services.flatMap((s) => s.keywords).slice(0, 25),
});

const categories = Array.from(new Set(services.map((s) => s.category)));

// Exclude Pakistan, Israel, China, Japan
const excludedCountries = ["pakistan", "israel", "china", "japan"];
const filteredCountries = countries.filter(
  (c) => !excludedCountries.includes(c.slug.toLowerCase())
);

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Hurain Technologies Services",
          services.map((s) => ({ name: s.name, url: `${siteConfig.url}/services/${s.slug}` }))
        )}
      />
      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Software Development Services
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {services.length} specialized engineering services covering blockchain and cryptocurrency, payments, API
            and open banking, cloud modernization, AI fraud detection, and cybersecurity/compliance — each led by
            engineers who work exclusively in that domain.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="divide-y divide-border">
          {categories.map((category, i) => {
            const items = services.filter((s) => s.category === category);
            return (
              <div key={category} className="grid grid-cols-1 gap-6 py-12 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                    <p className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="mt-2 text-2xl text-foreground sm:text-3xl">{category}</h2>
                    <p className="mt-2 text-sm text-muted">
                      {items.length} {items.length === 1 ? "service" : "services"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
                  {items.map((service) => (
                    <ServiceCard
                      key={service.slug}
                      service={service}
                      className={items.length === 1 ? "sm:col-span-2" : ""}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Geographic Availability Section */}
      <section className="py-16 border-t border-border bg-surface-2">
        <Container>
          <SectionHeading
            eyebrow="Global Reach"
            title="Markets We Serve"
          />
          <p className="mt-4 max-w-2xl text-base text-muted mb-8">
            Our software development services are available across {filteredCountries.length}+ countries worldwide. Select a country below to explore local expertise, regulatory insights, and city-specific availability.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/${localeForCountrySlug(country.slug)}`}
                className="rounded-lg border border-border bg-surface p-3 text-center text-sm font-medium text-foreground transition-colors hover:border-foreground/25 hover:text-primary"
              >
                {country.countryName}
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/markets-we-cover"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              View All Markets →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <TrustSections topic={"Software Engineering"} />

      <section className="py-16">
        <Container>
          <CtaSection />
        </Container>
      </section>
    </>
  );
}
