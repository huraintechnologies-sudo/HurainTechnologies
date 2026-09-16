import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ServiceContent } from "@/lib/types";

export function ServiceCard({ service }: { service: ServiceContent }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/50 hover:bg-surface-2"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon name={service.icon as never} className="w-5 h-5" />
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-primary">{service.category}</p>
      <h3 className="mt-1.5 text-lg font-semibold text-foreground">{service.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{service.intro}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-90 group-hover:gap-2.5 transition-all">
        Learn more
        <Icon name="arrow" className="w-4 h-4" />
      </span>
    </Link>
  );
}
