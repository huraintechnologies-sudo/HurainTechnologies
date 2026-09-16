import { liveDemos } from "@/data/live-demos";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";

const categoryColor: Record<string, string> = {
  Fintech: "text-primary border-primary/30 bg-primary/10",
  Compliance: "text-accent border-accent/30 bg-accent/10",
  Payments: "text-primary border-primary/30 bg-primary/10",
  Healthcare: "text-success border-success/30 bg-success/10",
  Operations: "text-muted border-border bg-surface-2",
  "E-Commerce": "text-accent border-accent/30 bg-accent/10",
  Legal: "text-muted border-border bg-surface-2",
};

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
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <span className="ml-2 truncate rounded bg-background/60 px-2 py-0.5 text-[11px] text-muted">
                {shortUrl(demo.url)}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span
                className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${categoryColor[demo.category] ?? "text-muted border-border bg-surface-2"}`}
              >
                {demo.category}
              </span>
              <h3 className="mt-3 text-base font-semibold text-foreground">{demo.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{demo.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-90 group-hover:gap-2.5 transition-all">
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
