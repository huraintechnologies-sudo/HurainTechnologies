import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { serviceVerticals } from "@/data/service-verticals";
import { getServiceBySlug } from "@/data/services";
import { getPlaybook } from "@/data/solution-playbooks";
import { cities as curatedCities } from "@/data/cities-curated";
import { priorityCountries as curatedCountries } from "@/data/countries";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { CountryLinksGrid } from "@/components/CountryLinksGrid";
import { TrustSections } from "@/components/TrustSections";
import { PlacePhoto, QuickAnswer, FeatureGrid, PhaseTimeline, TechStackRow, LinkPills } from "@/components/location/LocationBlocks";
import { buildMetadata } from "@/lib/seo";
import { lc } from "@/lib/solution-location-content";
import { locationPageJsonLd } from "@/lib/location-seo";
import { isWorldSolution, worldCountries, worldCities } from "@/data/world-geo";
import { DatabaseServicesSection } from "@/components/location/DatabaseServicesSection";
import { isDatabaseService } from "@/data/database-services";

interface Props {
  params: Promise<{ solution: string }>;
}

export async function generateStaticParams() {
  return serviceVerticals.map((v) => ({ solution: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const pb = getPlaybook(solution);
  if (!vertical || !pb) return {};
  return buildMetadata({
    title: `${vertical.name} Company | Cost, Timeline & Process`,
    description: pb.answer.slice(0, 158),
    path: `/solutions/${solution}`,
    keywords: pb.keywords,
  });
}

export default async function SolutionVerticalPage({ params }: Props) {
  const { solution } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const pb = getPlaybook(solution);
  if (!vertical || !pb) notFound();

  const name = vertical.name;
  const path = `/solutions/${vertical.slug}`;
  const breadcrumbs = [
    { name: "Solutions", href: "/solutions" },
    { name, href: path },
  ];

  const faqs = [
    { question: `What is ${lc(name)}?`, answer: pb.answer },
    { question: `How long does ${lc(name)} take?`, answer: `A first production release typically takes ${pb.mvpWeeks}; a full-featured platform ${pb.fullWeeks}, depending on scope and integrations.` },
    { question: `How much does ${lc(name)} cost?`, answer: `Cost depends mainly on ${pb.costDrivers.slice(0, 3).map((d) => d.charAt(0).toLowerCase() + d.slice(1)).join(", ")}. Share your requirements and we return a fixed-scope estimate within 5 business days.` },
    ...pb.faqs,
  ];

  const jsonLd = locationPageJsonLd({
    path,
    name: `${name} Company`,
    description: pb.answer,
    serviceName: name,
    serviceType: name,
    image: pb.heroImage.src,
    area: { "@type": "Place", name: "Worldwide" },
    faqs,
    breadcrumbs,
  });

  const world = isWorldSolution(vertical.slug);
  const topCities = world
    ? worldCities.slice(0, 60).map((c) => ({ name: c.cityName, href: `${path}/${c.countrySlug}/${c.slug}` }))
    : curatedCities.slice(0, 20).map((c) => ({ name: c.cityName, href: `${path}/${c.countrySlug}/${c.slug}` }));

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Container className="relative grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <Breadcrumbs items={breadcrumbs} withSchema={false} />
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
              <Icon name="check" className="h-3.5 w-3.5" />
              {vertical.category}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{pb.headline}</h1>
            <QuickAnswer question={`What does Hurain Technologies build for ${lc(name)}?`} answer={pb.answer} />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background hover:bg-primary/90">
                Get a free estimate
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a href="#countries" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary">
                Find your country
              </a>
            </div>
          </div>
          <PlacePhoto src={pb.heroImage.src} alt={pb.heroImage.alt} width={1200} height={800} priority />
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Overview" title={`What ${lc(name)} with Hurain Technologies looks like`} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
            {pb.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <Container>
          <SectionHeading eyebrow="Capabilities" title={`${name} features we deliver`} />
          <div className="mt-10">
            <FeatureGrid items={pb.features} />
          </div>
          <h3 className="mt-14 text-lg font-semibold text-foreground">Use cases</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pb.useCases.map((u) => (
              <div key={u.title} className="rounded-xl border border-border bg-background p-5">
                <h4 className="text-sm font-semibold text-foreground">{u.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Cost & timeline" title={`How much does ${lc(name)} cost and how long does it take?`} />
            <p className="mt-5 text-base leading-relaxed text-foreground/85">
              A first production release typically takes <strong className="text-foreground">{pb.mvpWeeks}</strong>, and a full-featured platform <strong className="text-foreground">{pb.fullWeeks}</strong>. Price is driven by scope rather than a fixed rate card — these are the factors that move it most:
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {pb.costDrivers.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-muted">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {d}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-lg font-semibold text-foreground">Technology</h3>
            <div className="mt-4">
              <TechStackRow groups={pb.techStack.slice(0, 2)} />
            </div>
          </div>
          <div>
            <h3 className="mb-6 text-lg font-semibold text-foreground">Our delivery process</h3>
            <PhaseTimeline phases={pb.phases} />
            <h3 className="mt-10 text-lg font-semibold text-foreground">Standards we build to</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {pb.compliance.map((c) => (
                <li key={c} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-foreground/80">{c}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {isDatabaseService(vertical.slug) && <DatabaseServicesSection currentSlug={vertical.slug} />}

      <TrustSections topic={name} />

      <section id="faq" className="border-t border-border py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${name}: frequently asked questions`} />
          <div className="mt-8">
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </section>

      <section id="countries" className="border-t border-border bg-surface py-16">
        <Container>
          <SectionHeading
            eyebrow="By location"
            title={`${name} by country`}
            description="Each country page covers local payment methods, tax, data-protection law, 24/7 support and delivery timelines."
          />
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/60">Priority markets</h3>
            <div className="mt-4">
              <LinkPills links={curatedCountries.slice(0, 18).map((c) => ({ name: c.countryName, href: `${path}/${c.slug}` }))} />
            </div>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-foreground/60">{world ? `Top ${topCities.length} of ${worldCities.length} high-demand cities` : "Major cities"}</h3>
            <div className="mt-4">
              <LinkPills links={topCities} />
            </div>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-foreground/60">All countries</h3>
            <div className="mt-4">
              {world ? (
                <LinkPills links={worldCountries.map((c) => ({ name: c.countryName, href: `${path}/${c.slug}` }))} />
              ) : (
                <CountryLinksGrid basePath={path} />
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Related solutions</h2>
            <div className="mt-4">
              <LinkPills links={pb.relatedSolutions.map((s) => serviceVerticals.find((v) => v.slug === s)).filter(Boolean).map((v) => ({ name: v!.name, href: `/solutions/${v!.slug}` }))} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Related engineering services</h2>
            <div className="mt-4">
              <LinkPills links={pb.relatedServices.map((s) => getServiceBySlug(s)).filter(Boolean).map((s) => ({ name: s!.navLabel, href: `/services/${s!.slug}` }))} />
            </div>
          </div>
          <CtaSection title={`Ready to start your ${lc(name)} project?`} description="Share your idea and get a scoped plan, timeline and fixed estimate within 5 business days." primaryLabel="Get a free estimate" />
        </Container>
      </section>
    </>
  );
}
