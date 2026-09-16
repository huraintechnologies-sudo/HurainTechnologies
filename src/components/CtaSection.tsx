import Link from "next/link";
import { Icon } from "@/components/Icon";

export function CtaSection({
  title = "Ready to build with Hurain Technologies?",
  description = "Book a free discovery call and get a technical roadmap for your platform within 5 business days.",
  primaryLabel = "Book a Consultation",
  primaryHref = "/contact",
  secondaryLabel = "Explore Services",
  secondaryHref = "/services",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">{description}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
          >
            {primaryLabel}
            <Icon name="arrow" className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
