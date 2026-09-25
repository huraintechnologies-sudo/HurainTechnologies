import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ServiceContent } from "@/lib/types";

export function ServiceCard({ service, className = "" }: { service: ServiceContent; className?: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group flex flex-col rounded-xl border border-border bg-surface p-5 sm:p-6 transition-colors hover:border-foreground/25 ${className}`}
    >
      <div className="flex items-center justify-between">
        <Icon name={service.icon as never} className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">{service.category}</span>
      </div>
      <h3 className="mt-4 text-base font-medium text-foreground sm:mt-8 sm:text-lg">{service.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2 sm:line-clamp-3">{service.intro}</p>
      <span className="mt-auto pt-4 sm:pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
        Learn more
        <Icon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
