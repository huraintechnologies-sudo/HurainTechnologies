import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ContentBlock, ProcessStep } from "@/lib/types";
import { getServiceBySlug } from "@/data/services";

export function PainPointGrid({ items }: { items: ContentBlock[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-border bg-surface p-5">
          <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function SolutionGrid({ items }: { items: ContentBlock[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-border bg-surface-2 p-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary">
            <Icon name="check" className="w-4 h-4" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function TechStackGrid({ groups }: { groups: { group: string; items: string[] }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.group} className="rounded-xl border border-border bg-surface p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-primary">{g.group}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {g.items.map((item) => (
              <span key={item} className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs text-foreground/85">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="rounded-xl border border-border bg-surface p-5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
            {index + 1}
          </span>
          <h3 className="mt-3 text-sm font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function ProofBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Client Result</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}

export function RelatedServices({ slugs }: { slugs: string[] }) {
  const items = slugs.map((slug) => getServiceBySlug(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group rounded-xl border border-border bg-surface p-5 hover:border-primary/50 transition-colors"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-primary">{service.category}</p>
          <h3 className="mt-1.5 text-sm font-semibold text-foreground">{service.name}</h3>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            View service
            <Icon name="arrow" className="w-3.5 h-3.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
