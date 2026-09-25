import { Metadata } from "next";
import Link from "next/link";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { localeForCountrySlug } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { getCountryFacts, getCityFacts } from "@/lib/geo-facts";
import { regionFor, regionLabels } from "@/data/market-profiles";
import { cityDisplayName } from "@/lib/location-links";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { QuickAnswer } from "@/components/location/LocationBlocks";
import { itemListJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";
import { TrustSections } from "@/components/TrustSections";
import { PageFaq } from "@/components/PageFaq";
import { pageFaqs } from "@/data/page-faqs";

// Kept consistent with CountryLinksGrid's business exclusions.
const EXCLUDED = new Set(["pakistan", "israel", "china", "japan"]);
const marketCountries = countries.filter((c) => !EXCLUDED.has(c.slug) && localeForCountrySlug(c.slug));
const marketCities = cities.filter((c) => marketCountries.some((m) => m.slug === c.countrySlug));

export const metadata: Metadata = buildMetadata({
  title: `Markets We Cover — ${marketCountries.length} Countries, ${marketCities.length.toLocaleString("en-US")} Cities`,
  description: `Hurain Technologies delivers software, fintech, payments and blockchain engineering to ${marketCountries.length} countries and ${marketCities.length.toLocaleString("en-US")} cities, with local currency, tax, payment and data-protection expertise for each market.`,
  path: "/markets-we-cover",
  keywords: ["software development company worldwide", "offshore software development", "international fintech development", "global blockchain development", "remote development team"],
});

const ORDER = ["north-america", "europe", "middle-east", "africa", "asia", "oceania", "latam", "caribbean"] as const;

export default function MarketsPage() {
  const byRegion = new Map<string, { slug: string; name: string; locale: string; currency?: string; cities: { name: string; href: string; pop: number }[] }[]>();
  for (const c of marketCountries) {
    const f = getCountryFacts(c.slug);
    const region = regionFor(f?.code, f?.timezone);
    const locale = localeForCountrySlug(c.slug)!;
    const list = byRegion.get(region) ?? [];
    list.push({
      slug: c.slug,
      name: c.countryName,
      locale,
      currency: f?.currency?.code,
      cities: cities
        .filter((ci) => ci.countrySlug === c.slug)
        .map((ci) => ({ name: cityDisplayName(ci, getCityFacts(c.slug, ci.slug)), href: `/${locale}/${ci.slug}`, pop: getCityFacts(c.slug, ci.slug)?.population || 0 }))
        .sort((a, b) => b.pop - a.pop),
    });
    byRegion.set(region, list);
  }
  for (const list of byRegion.values()) list.sort((a, b) => b.cities.length - a.cities.length || a.name.localeCompare(b.name));

  return (
    <>
      <JsonLd data={itemListJsonLd("Markets served by Hurain Technologies", marketCountries.map((c) => ({ name: c.countryName, url: `${siteConfig.url}/${localeForCountrySlug(c.slug)}` })))} />

      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Container className="relative py-14">
          <Breadcrumbs items={[{ name: "Markets We Cover", href: "/markets-we-cover" }]} />
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Markets we cover</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Software, payments, fintech and blockchain engineering for <strong className="text-foreground">{marketCountries.length} countries</strong> and{" "}
            <strong className="text-foreground">{marketCities.length.toLocaleString("en-US")} cities</strong>. Each market page covers local currency, tax, payment rails, data-protection law and our 24/7 availability.
          </p>
          <div className="max-w-2xl">
            <QuickAnswer
              question="Which countries does Hurain Technologies work with?"
              answer={`We work with clients in ${marketCountries.length} countries across ${ORDER.filter((r) => byRegion.has(r)).map((r) => regionLabels[r]).join(", ")}, delivering remotely from India with a team available 24/7 in every time zone.`}
            />
          </div>
          <nav aria-label="Regions" className="mt-8 flex flex-wrap gap-2">
            {ORDER.filter((r) => byRegion.has(r)).map((r) => (
              <a key={r} href={`#${r}`} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground/85 hover:border-primary/50 hover:text-primary">
                {regionLabels[r]} <span className="text-muted">({byRegion.get(r)!.length})</span>
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {ORDER.filter((r) => byRegion.has(r)).map((r, i) => (
        <section key={r} id={r} className={`border-t border-border py-14 ${i % 2 ? "bg-surface" : ""}`}>
          <Container>
            <SectionHeading eyebrow={`${byRegion.get(r)!.length} markets`} title={regionLabels[r]} />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {byRegion.get(r)!.map((c) => (
                <div key={c.slug} className={`rounded-xl border border-border p-5 ${i % 2 ? "bg-background" : "bg-surface"}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <Link href={`/${c.locale}`} className="text-base font-semibold text-foreground hover:text-primary">
                      {c.name}
                    </Link>
                    {c.currency && <span className="text-xs text-muted">{c.currency}</span>}
                  </div>
                  {c.cities.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                      {c.cities.slice(0, 8).map((ci) => (
                        <li key={ci.href}>
                          <Link href={ci.href} className="text-sm text-muted hover:text-primary">{ci.name}</Link>
                        </li>
                      ))}
                      {c.cities.length > 8 && (
                        <li>
                          <Link href={`/${c.locale}#cities`} className="text-sm text-primary">+{c.cities.length - 8} more</Link>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-muted">Country-wide remote delivery</p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <TrustSections topic="Software Development" />
      <PageFaq title="Markets we cover — frequently asked questions" faqs={pageFaqs.markets} />

      <section className="border-t border-border py-16">
        <Container>
          <CtaSection title="Don't see your market?" description="We work with clients almost everywhere. Tell us where you operate and we'll confirm local payment, tax and compliance requirements on the discovery call." />
        </Container>
      </section>
    </>
  );
}
