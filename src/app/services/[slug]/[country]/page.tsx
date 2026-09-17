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
import { FaqItem } from "@/lib/types";
import { localeForCountrySlug } from "@/lib/locale";

export function generateStaticParams() {
  // Limit pre-rendering to top 2 services x 10 top countries (~20 pages)
  // Rest use on-demand ISR (Vercel will cache on first visit)
  // This keeps local builds fast while Vercel generates others on-demand
  const topServices = services.slice(0, 2);
  const topCountries = countries.slice(0, 10);
  return topServices.flatMap((service) =>
    topCountries.map((country) => ({ slug: service.slug, country: country.slug }))
  );
}

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; country: string }>;
}): Promise<Metadata> {
  const { slug, country: countrySlug } = await params;
  const service = getServiceBySlug(slug);
  const country = getCountryBySlug(countrySlug);
  if (!service || !country) return {};

  return buildMetadata({
    title: `${service.name} in ${country.countryName}`,
    description: `${service.name} for businesses in ${country.countryName}. ${country.regulatoryNotes[0]} Talk to Hurain Technologies about your ${country.countryName} engagement.`,
    path: `/services/${service.slug}/${country.slug}`,
    keywords: [...service.keywords, `${service.name.toLowerCase()} in ${country.countryName.toLowerCase()}`],
  });
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

  const combinedFaqs: FaqItem[] = [...country.faqs, ...service.faqs.slice(0, 4)];

  return (
    <>
      <JsonLd
        data={[
          {
            ...serviceJsonLd(service),
            "@id": `${service.slug}-${country.slug}#service`,
            name: `${service.name} in ${country.countryName}`,
            areaServed: { "@type": "Country", name: country.countryName },
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

      <section className="py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${service.navLabel} in ${country.countryName} — FAQ`} />
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
            title={`Ready to bring ${service.name.toLowerCase()} to ${country.countryName}?`}
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}
