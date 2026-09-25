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
    <section className="theme-dark relative overflow-hidden rounded-2xl border border-border px-7 py-10 sm:px-12 sm:py-14">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
      <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-foreground sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">{description}</p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
          >
            {primaryLabel}
            <Icon name="arrow" className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-foreground/30 transition-colors"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
