import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { commonsFileUrl } from "@/lib/geo-facts";
import type { KeyFact, LocalConsideration } from "@/lib/solution-location-content";

// Shared building blocks for every country and city page (solutions,
// services, industries, /en-xx hubs) so they all share one visual language.

export interface PhotoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  // Wikimedia Commons filename, when the photo came from there — rendered as a credit link.
  commonsFile?: string;
  priority?: boolean;
}

export function PlacePhoto({ src, alt, width = 960, height = 640, commonsFile, priority = false }: PhotoProps) {
  const remote = src.startsWith("http");
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border bg-surface">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        unoptimized={remote}
        // Credential-less CORS request: Wikimedia sets a tracking cookie on
        // image responses, which fails Lighthouse's third-party-cookie audit.
        // In "anonymous" mode the browser neither sends nor stores cookies.
        crossOrigin={remote ? "anonymous" : undefined}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4 text-xs text-foreground/80">
        <span className="font-medium">{alt}</span>
        {commonsFile && (
          <a href={commonsFileUrl(commonsFile)} target="_blank" rel="noopener nofollow" className="shrink-0 text-foreground/60 underline-offset-2 hover:underline">
            Photo: Wikimedia Commons
          </a>
        )}
      </figcaption>
    </figure>
  );
}

export function QuickAnswer({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="quick-answer mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Quick answer</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{question}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">{answer}</p>
    </div>
  );
}

export function KeyFactsPanel({ title, facts, source }: { title: string; facts: KeyFact[]; source?: string }) {
  if (!facts.length) return null;
  return (
    <aside className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">{title}</h2>
      <dl className="mt-4 divide-y divide-border">
        {facts.map((f) => (
          <div key={f.label} className="grid grid-cols-5 gap-3 py-2.5 text-sm">
            <dt className="col-span-2 text-muted">{f.label}</dt>
            <dd className="col-span-3 font-medium text-foreground">{f.value}</dd>
          </div>
        ))}
      </dl>
      {source && <p className="mt-4 text-xs leading-relaxed text-muted">{source}</p>}
    </aside>
  );
}

export function ConsiderationGrid({ items }: { items: LocalConsideration[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function FeatureGrid({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/40">
          <Icon name="check" className="h-5 w-5 text-primary" />
          <h3 className="mt-3 text-base font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function PhaseTimeline({ phases }: { phases: { title: string; weeks: string; description: string }[] }) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {phases.map((p, i) => (
        <li key={p.title} className="relative">
          <span className="absolute -left-[34px] flex h-6 w-6 items-center justify-center rounded-full border border-primary/50 bg-background text-[11px] font-semibold text-primary">
            {i + 1}
          </span>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
            <span className="text-xs font-medium text-primary">{p.weeks}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted">{p.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function TechStackRow({ groups }: { groups: { group: string; items: string[] }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((g) => (
        <div key={g.group} className="rounded-xl border border-border bg-surface p-5">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">{g.group}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {g.items.map((t) => (
              <li key={t} className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground/80">
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function LinkPills({ links }: { links: { name: string; href: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} prefetch={false} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary">
            {l.name}
            <Icon name="arrow" className="h-3 w-3" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PageToc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
      <span className="font-semibold uppercase tracking-widest text-foreground/60">On this page</span>
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`} className="hover:text-primary">
          {i.label}
        </a>
      ))}
    </nav>
  );
}
