import { liveDemos } from "@/data/live-demos";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";

function shortUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function LiveDemos() {
  return (
    <div>
      <SectionHeading
        eyebrow="Live Demos"
        title="A selection of platforms we've designed and built"
        description="For reference — real, working builds across fintech, compliance, healthcare, and commerce."
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {liveDemos.map((demo) => (
          <a
            key={demo.name}
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-foreground/25"
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-3 py-2.5">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="ml-2 truncate rounded bg-background/60 px-2 py-0.5 text-[11px] text-muted">
                {shortUrl(demo.url)}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span
                className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted"
              >
                {demo.category}
              </span>
              <h3 className="mt-3 text-base font-semibold text-foreground">{demo.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{demo.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                Open live demo
                <Icon name="arrow" className="w-4 h-4" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
