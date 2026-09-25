import Link from "next/link";
import { ReactNode } from "react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { TrustSections } from "@/components/TrustSections";
import {
  PlacePhoto,
  QuickAnswer,
  KeyFactsPanel,
  ConsiderationGrid,
  FeatureGrid,
  PhaseTimeline,
  TechStackRow,
  LinkPills,
  PageToc,
  PhotoProps,
} from "@/components/location/LocationBlocks";
import { LocationContent, lc } from "@/lib/solution-location-content";
import { SolutionPlaybook } from "@/data/solution-playbooks";
import { GEO_FACTS_DATE } from "@/lib/geo-facts";

// One layout for every /solutions/[solution]/[country] and .../[city] page.
export function SolutionLocationPage({
  solutionName,
  placeLabel,
  content,
  playbook,
  photo,
  breadcrumbs,
  jsonLd,
  nearbyTitle,
  nearby,
  otherSolutions,
  relatedServices,
  regionLinks,
  regulatoryNotes,
  otherTitle,
  basePathLabel = "solutions",
  extraSections,
}: {
  solutionName: string;
  placeLabel: string; // "Kenya" or "Nairobi, Kenya"
  content: LocationContent;
  playbook: SolutionPlaybook;
  photo: PhotoProps;
  breadcrumbs: { name: string; href: string }[];
  jsonLd: Record<string, unknown>;
  nearbyTitle: string;
  nearby: { name: string; href: string }[];
  otherSolutions: { name: string; href: string }[];
  relatedServices: { name: string; href: string }[];
  regionLinks?: { name: string; href: string }[];
  // Curated country regulatory notes (countries data), shown when present.
  regulatoryNotes?: string[];
  // Heading for the cross-links block, e.g. "Other industries we serve in Kenya".
  otherTitle?: string;
  basePathLabel?: "solutions" | "industries";
  // Solution-family sections (e.g. the database services catalog).
  extraSections?: ReactNode;
}) {
  const place = placeLabel.split(",")[0];
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Container className="relative grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <Breadcrumbs items={breadcrumbs} withSchema={false} />
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
              <Icon name="map" className="h-3.5 w-3.5" />
              {solutionName} · {placeLabel}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{content.h1}</h1>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{content.intro[0]}</p>
            <QuickAnswer question={`Who provides ${/services$/i.test(solutionName) ? solutionName : `${solutionName} services`} in ${place}?`} answer={content.answer} />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-primary/90">
                Get a {place} estimate
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a href="#cost-timeline" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary">
                Cost & timeline
              </a>
            </div>
          </div>
          <PlacePhoto {...photo} priority />
        </Container>
      </section>

      <div className="border-b border-border py-4">
        <Container>
          <PageToc
            items={[
              { id: "overview", label: "Overview" },
              { id: "what-we-build", label: "What we build" },
              { id: "local-requirements", label: `${place} requirements` },
              { id: "cost-timeline", label: "Cost & timeline" },
              { id: "working-together", label: "Working together" },
              { id: "engagement-models", label: "Engagement models" },
              { id: "faq", label: "FAQ" },
            ]}
          />
        </Container>
      </div>

      {/* Overview + facts */}
      <section id="overview" className="py-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Overview" title={`${solutionName} for ${place} businesses`} />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
              {content.intro.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
              {playbook.overview.slice(1).map((p) => (
                <p key={p} className="text-muted">{p}</p>
              ))}
            </div>
            <h3 className="mt-10 text-lg font-semibold text-foreground">Why {lc(solutionName)} matters in {place}</h3>
            <ul className="mt-4 space-y-3">
              {content.whyHere.map((w) => (
                <li key={w} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <KeyFactsPanel
            title={`${place} at a glance`}
            facts={content.keyFacts}
            source={`Population and currency from Wikidata; time zones from the IANA tz database (checked ${GEO_FACTS_DATE}). Tax rates are standard headline rates — confirm with a local advisor.`}
          />
        </Container>
      </section>

      {/* Features */}
      <section id="what-we-build" className="border-t border-border bg-surface py-16">
        <Container>
          <SectionHeading eyebrow="What we build" title={`${solutionName} features we deliver in ${place}`} description={playbook.overview[0]} />
          <div className="mt-10">
            <FeatureGrid items={playbook.features} />
          </div>
          <h3 className="mt-14 text-lg font-semibold text-foreground">Common {lc(solutionName)} projects in {place}</h3>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {playbook.useCases.map((u) => (
              <div key={u.title} className="rounded-xl border border-border bg-background p-5">
                <h4 className="text-sm font-semibold text-foreground">{u.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {extraSections}

      {regulatoryNotes && regulatoryNotes.length > 0 && (
        <section id="regulation" className="border-t border-border bg-surface py-16">
          <Container>
            <SectionHeading eyebrow="Regulatory landscape" title={`What ${lc(solutionName)} buyers in ${place} need to know`} />
            <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {regulatoryNotes.map((note) => (
                <li key={note} className="flex items-start gap-3 rounded-xl border border-border bg-background p-5">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-foreground/85">{note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-xs text-muted">General orientation only, not legal or licensing advice — confirm current requirements with qualified local counsel.</p>
          </Container>
        </section>
      )}

      {/* Local requirements */}
      <section id="local-requirements" className="border-t border-border py-16">
        <Container>
          <SectionHeading
            eyebrow="Localised for your market"
            title={`What ${/^[aeiou]/i.test(solutionName) ? "an" : "a"} ${lc(solutionName)} project in ${place} must get right`}
            description="Currency, tax, payments, data protection and language — built into the product from the first sprint."
          />
          <div className="mt-10">
            <ConsiderationGrid items={content.considerations} />
          </div>
        </Container>
      </section>

      {/* Cost & timeline (answer-first) */}
      <section id="cost-timeline" className="border-t border-border bg-surface py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Cost & timeline" title={`How much does ${lc(solutionName)} cost in ${place}?`} />
            <p className="mt-5 text-base leading-relaxed text-foreground/85">{content.costAnswer}</p>
            <h3 className="mt-8 text-lg font-semibold text-foreground">What drives the price</h3>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {playbook.costDrivers.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-muted">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {d}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-lg font-semibold text-foreground">How long does it take?</h3>
            <p className="mt-3 text-base leading-relaxed text-foreground/85">{content.timelineAnswer}</p>
          </div>
          <div>
            <h3 className="mb-6 text-lg font-semibold text-foreground">Our delivery process</h3>
            <PhaseTimeline phases={playbook.phases} />
          </div>
        </Container>
      </section>

      {/* Working together */}
      <section id="working-together" className="border-t border-border py-16">
        <Container>
          <SectionHeading eyebrow="Delivery" title={`Working with Hurain Technologies from ${place}`} />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {content.delivery.map((d) => (
              <div key={d.title} className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-base font-semibold text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-14 text-lg font-semibold text-foreground">Technology we use</h3>
          <div className="mt-5">
            <TechStackRow groups={playbook.techStack} />
          </div>
          <h3 className="mt-10 text-lg font-semibold text-foreground">Standards we build to</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {playbook.compliance.map((c) => (
              <li key={c} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-foreground/80">{c}</li>
            ))}
          </ul>
        </Container>
      </section>

      <TrustSections topic={solutionName} place={placeLabel} />

      {/* FAQ */}
      <section id="faq" className="border-t border-border py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`${solutionName} in ${place}: frequently asked questions`} />
          <div className="mt-8">
            <FaqAccordion faqs={content.faqs} />
          </div>
        </Container>
      </section>

      {/* Internal links */}
      <section className="border-t border-border bg-surface py-16">
        <Container className="space-y-10">
          {nearby.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">{nearbyTitle}</h2>
              <div className="mt-4">
                <LinkPills links={nearby} />
              </div>
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-foreground">{otherTitle ?? `Other ${basePathLabel} we deliver in ${place}`}</h2>
            <div className="mt-4">
              <LinkPills links={otherSolutions} />
            </div>
          </div>
          {relatedServices.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">Related engineering services</h2>
              <div className="mt-4">
                <LinkPills links={relatedServices} />
              </div>
            </div>
          )}
          {regionLinks && regionLinks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">{solutionName} in nearby countries</h2>
              <div className="mt-4">
                <LinkPills links={regionLinks} />
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <CtaSection
            title={`Planning ${/^[aeiou]/i.test(solutionName) ? "an" : "a"} ${lc(solutionName)} project in ${place}?`}
            description={`Tell us what you're building. You'll get a scoped plan, timeline and fixed estimate within 5 business days.`}
            primaryLabel="Get a free estimate"
            secondaryLabel="See case studies"
            secondaryHref="/case-studies"
          />
        </Container>
      </section>
    </>
  );
}
