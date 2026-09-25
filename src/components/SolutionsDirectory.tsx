import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { serviceVerticals } from "@/data/service-verticals";
import { cityForSolution, countryForSolution } from "@/data/world-geo";

// Every solution, grouped by category. On country / city pages each link goes
// to that solution's page for the same place, falling back one level when a
// solution isn't offered there — so no link ever 404s.
export function SolutionsDirectory({
  countrySlug,
  citySlug,
  placeName,
}: {
  countrySlug?: string;
  citySlug?: string;
  placeName?: string;
}) {
  const hrefFor = (slug: string) => {
    if (countrySlug && citySlug && cityForSolution(slug, countrySlug, citySlug)) {
      return `/solutions/${slug}/${countrySlug}/${citySlug}`;
    }
    if (countrySlug && countryForSolution(slug, countrySlug)) return `/solutions/${slug}/${countrySlug}`;
    return `/solutions/${slug}`;
  };

  const groups = new Map<string, typeof serviceVerticals>();
  for (const v of serviceVerticals) {
    groups.set(v.category, [...(groups.get(v.category) ?? []), v]);
  }
  // Biggest categories first so the masonry columns balance.
  const ordered = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);

  return (
    <section className="theme-dark relative overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(236,235,230,0.10) 1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 10%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 10%, transparent 75%)",
        }}
      />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Solutions"
            title={placeName ? `Solutions we build in ${placeName}` : "Solutions we build"}
            description={`${serviceVerticals.length} ready-to-scope solutions — from mobile apps and e-commerce to exchanges, wallets and managed databases${placeName ? `, delivered for teams in ${placeName}` : ""}.`}
          />
          <Link
            href="/solutions"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary/60 hover:text-primary transition-colors"
          >
            Explore all solutions
            <Icon name="arrow" className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {ordered.map(([category, items]) => (
            <div
              key={category}
              className="mb-4 break-inside-avoid rounded-2xl border border-border bg-surface p-2 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-center justify-between px-4 pb-3 pt-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <Icon name={categoryIcon[category] ?? "api"} className="w-[18px] h-[18px]" />
                  </span>
                  <h3 className="text-[15px] font-semibold text-foreground">{category}</h3>
                </div>
                <span className="font-mono text-xs text-muted">{String(items.length).padStart(2, "0")}</span>
              </div>
              <ul className="rounded-xl bg-background/60">
                {items.map((v, i) => (
                  <li key={v.slug} className={i > 0 ? "border-t border-border/70" : ""}>
                    <Link
                      href={hrefFor(v.slug)}
                      className="group flex items-center justify-between gap-4 px-4 py-3 text-[14.5px] text-foreground/80 hover:text-foreground transition-colors"
                    >
                      <span>
                        {v.name}
                        {placeName && <span className="sr-only"> in {placeName}</span>}
                      </span>
                      <Icon
                        name="arrow"
                        className="w-4 h-4 shrink-0 -translate-x-1 text-muted opacity-60 transition-all group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

type IconName = React.ComponentProps<typeof Icon>["name"];

const categoryIcon: Record<string, IconName> = {
  "Application Development": "api",
  "Database Services": "cloud",
  "Industry Solutions": "banking",
  "Blockchain & Crypto": "blockchain",
  "AI & Automation": "ai",
  "Enterprise Solutions": "security",
  "Emerging Technologies": "exchange",
  Staffing: "check",
};
