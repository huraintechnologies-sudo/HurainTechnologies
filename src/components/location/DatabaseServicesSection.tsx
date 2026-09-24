import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { PhaseTimeline } from "@/components/location/LocationBlocks";
import { DbServiceCard, dbServiceCatalog, dbPlatforms, dbIndustries, dbTechnologies, dbBenefits, dbProcess } from "@/data/database-services";

// Shared sections for every database-services page (Remote DBA, consulting,
// migration, audit and the four platform pages) at hub, country and city
// level. "Explore" buttons keep the visitor at the same place: on a Tokyo
// page they link to the Tokyo page of the other service.
export function DatabaseServicesSection({
  currentSlug,
  countrySlug,
  citySlug,
  place,
}: {
  currentSlug: string;
  countrySlug?: string;
  citySlug?: string;
  place?: string; // "Tokyo, Japan"
}) {
  const where = place ? ` in ${place.split(",")[0]}` : "";
  const hrefFor = (slug: string) => `/solutions/${slug}${countrySlug ? `/${countrySlug}` : ""}${countrySlug && citySlug ? `/${citySlug}` : ""}`;

  const card = (c: DbServiceCard, tone: "surface" | "background") => (
    <div key={c.title} className={`flex flex-col rounded-xl border border-border p-6 ${tone === "surface" ? "bg-surface" : "bg-background"} ${c.slug === currentSlug ? "border-primary/50" : ""}`}>
      <h3 className="text-base font-semibold text-foreground">{c.title}{where}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>
      <ul className="mt-4 flex-1 space-y-1.5">
        {c.bullets.map((b) => (
          <li key={b} className="flex gap-2 text-sm text-foreground/80">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {b}
          </li>
        ))}
      </ul>
      {c.slug && c.slug !== currentSlug && (
        <Link href={hrefFor(c.slug)} prefetch={false} className="mt-5 inline-flex items-center gap-1.5 self-start rounded-lg border border-primary/40 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10">
          Explore {c.title}{where}
          <Icon name="arrow" className="h-3.5 w-3.5" />
        </Link>
      )}
      {c.slug === currentSlug && <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary">You are here</span>}
    </div>
  );

  return (
    <>
      <section id="database-services" className="border-t border-border py-16">
        <Container>
          <SectionHeading
            eyebrow="Our database services"
            title={`Database services we deliver${where}`}
            description="From day-to-day administration to audits, migrations and architecture — one team, every major database platform, 24/7."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dbServiceCatalog.map((c) => card(c, "surface"))}
          </div>
        </Container>
      </section>

      <section id="database-platforms" className="border-t border-border bg-surface py-16">
        <Container>
          <SectionHeading
            eyebrow="Platforms we support"
            title={`Database platforms we support${where}`}
            description="Dedicated DBA support for the four most widely used relational databases — self-hosted or managed in the cloud."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dbPlatforms.map((c) => card(c, "background"))}
          </div>
        </Container>
      </section>

      <section id="database-industries" className="border-t border-border py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Industries we serve" title="Where performance, uptime and data reliability are critical" />
            <ul className="mt-8 flex flex-wrap gap-2">
              {dbIndustries.map((i) =>
                i.industrySlug ? (
                  <li key={i.name}>
                    <Link href={`/industries/${i.industrySlug}`} prefetch={false} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground/85 hover:border-primary/50 hover:text-primary">
                      {i.name}
                      <Icon name="arrow" className="h-3 w-3" />
                    </Link>
                  </li>
                ) : (
                  <li key={i.name} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground/85">{i.name}</li>
                ),
              )}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Technology expertise" title="Database technologies & related expertise" />
            <ul className="mt-8 flex flex-wrap gap-2">
              {dbTechnologies.map((t) => (
                <li key={t} className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-foreground/80">{t}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="database-benefits" className="border-t border-border bg-surface py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Benefits" title={`Benefits of our DBA services${where}`} />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {dbBenefits.map((b) => (
                <div key={b.title} className="rounded-xl border border-border bg-background p-5">
                  <h3 className="text-sm font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Our process" title="How a DBA engagement works" />
            <div className="mt-8">
              <PhaseTimeline phases={dbProcess} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
