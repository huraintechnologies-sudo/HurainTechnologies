import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { industries, getIndustryBySlug } from "@/data/industries";
import { getServiceBySlug } from "@/data/services";
import { serviceVerticals } from "@/data/service-verticals";
import { priorityCountries } from "@/data/countries";
import { cities as curatedCities } from "@/data/cities-curated";
import { getIndustryPlaybook } from "@/data/industry-playbooks";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { CountryLinksGrid } from "@/components/CountryLinksGrid";
import { TrustSections } from "@/components/TrustSections";
import { PainPointGrid } from "@/components/ContentGrids";
import { PlacePhoto, QuickAnswer, FeatureGrid, PhaseTimeline, TechStackRow, LinkPills } from "@/components/location/LocationBlocks";
import { buildMetadata } from "@/lib/seo";
import { lc } from "@/lib/solution-location-content";
import { locationPageJsonLd } from "@/lib/location-seo";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  const pb = getIndustryPlaybook(slug);
  if (!industry || !pb) return {};
  return buildMetadata({
    title: `${industry.name} Software Development Company | Cost, Timeline & Compliance`,
    description: (industry.metaDescription || pb.answer).slice(0, 158),
    path: `/industries/${slug}`,
    keywords: pb.keywords,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  const pb = getIndustryPlaybook(slug);
  if (!industry || !pb) notFound();

  const name = industry.name;
  const path = `/industries/${industry.slug}`;
  const breadcrumbs = [
    { name: "Industries", href: "/industries" },
    { name, href: path },
  ];

  const faqs = [
    { question: `What does Hurain Technologies build for ${lc(name)}?`, answer: pb.answer },
    { question: `How long does ${lc(name)} software development take?`, answer: `Delivery time is agreed around your scope — after discovery you get a milestone plan tailored to your requirements, integrations and how quickly decisions are made on your side.` },
    { question: `How much does ${lc(name)} software development cost?`, answer: `Cost depends mainly on ${pb.costDrivers.slice(0, 3).map((d) => d.charAt(0).toLowerCase() + d.slice(1)).join(", ")}. Share your requirements and we return a fixed-scope estimate within 5 business days.` },
    ...pb.faqs,
  ];

  const jsonLd = locationPageJsonLd({
    path,
    name: `${name} Software Development`,
    description: pb.answer,
    serviceName: `${name} software development`,
    serviceType: `${name} software development`,
    image: pb.heroImage.src,
    area: { "@type": "Place", name: "Worldwide" },
    faqs,
    breadcrumbs,
  });

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
              Industry
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
          <SectionHeading eyebrow="Overview" title={`${name} software, built for how the industry really works`} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
            {pb.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {industry.painPoints && industry.painPoints.length > 0 && (
        <section className="border-t border-border bg-surface py-16">
          <Container>
            <SectionHeading eyebrow="The challenge" title={`What ${lc(name)} teams struggle with`} />
            <div className="mt-8">
              <PainPointGrid items={industry.painPoints} />
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border py-16">
        <Container>
          <SectionHeading eyebrow="Our approach" title={`How we build for ${lc(name)}`} />
          <div className="mt-10">
            <FeatureGrid items={pb.features} />
          </div>
          <h3 className="mt-14 text-lg font-semibold text-foreground">Typical projects</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pb.useCases.map((u) => (
              <div key={u.title} className="rounded-xl border border-border bg-surface p-5">
                <h4 className="text-sm font-semibold text-foreground">{u.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Cost & timeline" title={`How much does ${lc(name)} software cost and how long does it take?`} />
            <p className="mt-5 text-base leading-relaxed text-foreground/85">
              Delivery time is agreed around your scope and split into milestones you sign off before paying. These are the factors that move the price most:
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
                <li key={c} className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs text-foreground/80">{c}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <TrustSections topic={`${name} Software`} />

      <section id="faq" className="border-t border-border py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${name} software: frequently asked questions`} />
          <div className="mt-8">
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </section>

      <section id="countries" className="border-t border-border bg-surface py-16">
        <Container>
          <SectionHeading
            eyebrow="By location"
            title={`${name} software by country and city`}
            description="Each location page covers local regulation, payment methods, tax, data-protection law and 24/7 support."
          />
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-foreground/60">Priority markets</h3>
          <div className="mt-4">
            <LinkPills links={priorityCountries.slice(0, 18).map((c) => ({ name: c.countryName, href: `${path}/${c.slug}` }))} />
          </div>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-foreground/60">Major cities</h3>
          <div className="mt-4">
            <LinkPills links={curatedCities.slice(0, 20).map((c) => ({ name: c.cityName, href: `${path}/${c.countrySlug}/${c.slug}` }))} />
          </div>
          <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-foreground/60">All countries</h3>
          <div className="mt-4">
            <CountryLinksGrid basePath={path} />
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
          <div>
            <h2 className="text-lg font-semibold text-foreground">Other industries</h2>
            <div className="mt-4">
              <LinkPills links={industries.filter((i) => i.slug !== industry.slug).map((i) => ({ name: i.name, href: `/industries/${i.slug}` }))} />
            </div>
          </div>
          <CtaSection title={`Building for ${lc(name)}?`} description="Share your idea and get a scoped plan, timeline and fixed estimate within 5 business days." primaryLabel="Get a free estimate" />
        </Container>
      </section>
    </>
  );
}
