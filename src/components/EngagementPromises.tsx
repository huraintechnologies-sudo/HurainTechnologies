import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";

// Compact summary of the commercial terms for pages that don't carry the full
// delivery sections (e.g. contact).
const PROMISES = [
  { title: "Milestone payments", body: "Pay only after you sign off each working milestone." },
  { title: "Daily & weekly updates", body: "A written daily update and a weekly work overview with a live call." },
  { title: "90-day warranty", body: "Defects found after go-live are fixed free for 90 days." },
  { title: "Fixed-cost annual support", body: "30% of project cost per year, with a dedicated developer." },
  { title: "100% code & IP ownership", body: "Complete source code and IP transferred to you." },
  { title: "Team that grows with you", body: "Add developers and support members as requirements grow." },
];

export function EngagementPromises() {
  return (
    <section className="border-t border-border py-16">
      <Container>
        <SectionHeading eyebrow="Every engagement includes" title="What you can count on from day one" />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROMISES.map((p) => (
            <div key={p.title} className="flex gap-3 rounded-xl border border-border bg-surface p-5">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
