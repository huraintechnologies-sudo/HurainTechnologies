import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { deliveryPlanFor, Milestone } from "@/lib/delivery-plan";

// "How we deliver" (7 quality-gated stages) and a milestone payment plan,
// tailored to the page's service / solution / industry and place. No
// durations are shown: timelines are agreed per project.
export function DeliveryPlanSections({ topic: rawTopic, place }: { topic: string; place?: string }) {
  // Some templates pass a lower-cased topic; headings read better title-cased.
  const topic = rawTopic === rawTopic.toLowerCase() ? rawTopic.replace(/\b\w/g, (c) => c.toUpperCase()) : rawTopic;
  const plan = deliveryPlanFor(topic);
  const where = place ? ` in ${place}` : "";

  return (
    <>
      <section id="how-we-deliver" className="border-t border-border py-20">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title={`How we deliver ${topic}${where}`}
            description="Every engagement follows the same staged process. Each stage ends in a quality gate, and every milestone ends with your written sign-off before any payment is due."
          />

          {/* Large screens: seven connected columns. */}
          <ol className="mt-12 hidden grid-cols-7 gap-3 lg:grid">
            {plan.stages.map((stage, i) => (
              <li key={stage.title} className="relative flex flex-col rounded-xl border border-border bg-surface">
                <StageHeader index={i} title={stage.title} />
                <ul className="flex-1 divide-y divide-border/70 px-4">
                  {stage.tasks.map((task) => (
                    <li key={task} className="py-2.5 text-[13px] leading-snug text-foreground/80">
                      {task}
                    </li>
                  ))}
                </ul>
                <QualityGate />
                {i < plan.stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-[9px] top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 rotate-45 border-r border-t border-border bg-surface"
                  />
                )}
              </li>
            ))}
          </ol>

          {/* Phones & tablets: a compact vertical timeline. */}
          <ol className="relative mt-10 space-y-3 lg:hidden">
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-border" />
            {plan.stages.map((stage, i) => (
              <li key={stage.title} className="relative flex gap-4">
                <span
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold"
                  style={stageColors(i)}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[15px] font-semibold text-foreground">{stage.title}</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                      <Icon name="check" className="w-3.5 h-3.5" />
                      Quality gate
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {stage.tasks.map((task) => (
                      <li key={task} className="rounded-md border border-border bg-background px-2 py-1 text-[12.5px] text-foreground/80">
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/[0.06] px-4 py-3.5 text-center text-sm font-medium text-foreground">
            <Icon name="check" className="w-4 h-4 shrink-0 text-primary" />
            Client sign-off at every milestone — you approve the working result before you pay.
          </p>
        </Container>
      </section>

      <section id="payment-plan" className="border-t border-border py-20">
        <Container>
          <SectionHeading
            eyebrow="Payment plan"
            title="Pay only for work you have accepted"
            description="Milestones are customised to your requirements — six or more is typical, and delivery time is agreed around your scope. Every payment after the advance is released only after you have seen the working result and given written sign-off. Here is an example plan:"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface lg:col-span-7">
              <table className="w-full text-left text-sm">
                <thead style={{ background: "var(--foreground)", color: "var(--background)" }}>
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Payment</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Milestone &amp; acceptance</th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {plan.milestones.map((m) => (
                    <tr key={m.label} className="align-top">
                      <td className="px-4 py-3.5 font-mono text-[11px] uppercase tracking-wide text-muted whitespace-nowrap">
                        {m.label}
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="font-semibold text-foreground">{m.name}</p>
                        <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{m.deliverables}</p>
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold text-foreground">{m.percent}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-primary/[0.07]">
                  <tr>
                    <td className="px-4 py-3.5 font-semibold text-foreground" colSpan={2}>Total</td>
                    <td className="px-4 py-3.5 text-right font-semibold text-foreground">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <figure className="flex flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:col-span-5">
              <figcaption className="text-sm font-semibold text-foreground">
                90% of your payment is released only after you accept working modules
              </figcaption>
              <PaymentChart milestones={plan.milestones} />
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-0.5 w-5" style={{ background: "var(--primary)" }} /> Cumulative payment
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-0.5 w-5" style={{ background: "var(--foreground)" }} /> Work delivered &amp; accepted
                </span>
              </div>
              <ul className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm text-foreground/85">
                {[
                  "Number of milestones and splits set around your scope",
                  "Every milestone is a working, demonstrated result",
                  "No payment is due until you sign off",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 w-4 h-4 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </figure>
          </div>
        </Container>
      </section>
    </>
  );
}

// Inline colours so the stage headers never depend on a freshly generated
// utility class being present.
function stageColors(index: number) {
  return index === 3
    ? { background: "var(--primary)", color: "#ffffff" }
    : { background: "var(--foreground)", color: "var(--background)" };
}

function StageHeader({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex min-h-[48px] items-center gap-2 rounded-t-xl px-4 py-3" style={stageColors(index)}>
      <span className="font-mono text-xs opacity-70">{String(index + 1).padStart(2, "0")}</span>
      <span className="text-sm font-semibold leading-tight">{title}</span>
    </div>
  );
}

function QualityGate() {
  return (
    <div className="m-3 mt-1 flex items-center justify-center gap-1.5 rounded-md border border-primary/30 bg-primary/[0.07] px-2 py-1.5 text-[12px] font-semibold text-primary">
      <Icon name="check" className="w-3.5 h-3.5" />
      Quality gate
    </div>
  );
}

function PaymentChart({ milestones }: { milestones: Milestone[] }) {
  const W = 480;
  const H = 260;
  const pad = { l: 36, r: 16, t: 16, b: 30 };
  const steps = milestones.length - 1; // milestones after the advance
  const x = (i: number) => pad.l + (i / steps) * (W - pad.l - pad.r);
  const y = (pct: number) => H - pad.b - (pct / 100) * (H - pad.t - pad.b);

  // Payment: advance at signing, then a step up after each accepted milestone.
  let paid = milestones[0].percent;
  let payPath = `M ${x(0)} ${y(paid)}`;
  milestones.slice(1).forEach((m, i) => {
    payPath += ` H ${x(i + 1)}`;
    paid += m.percent;
    payPath += ` V ${y(paid)}`;
  });

  // Accepted work reaches the paid share at each sign-off.
  let acc = milestones[0].percent;
  const delivered = [{ i: 0, pct: 0 }, ...milestones.slice(1).map((m, i) => ({ i: i + 1, pct: (acc += m.percent) }))];
  const deliveredPath = delivered.map((p, k) => `${k ? "L" : "M"} ${x(p.i)} ${y(p.pct)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Cumulative payment versus accepted work at each milestone">
      {[0, 20, 40, 60, 80, 100].map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeWidth="1" />
          <text x={pad.l - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">
            {v}%
          </text>
        </g>
      ))}
      {milestones.map((m, i) => (
        <text key={m.label} x={x(i)} y={H - 10} textAnchor={i === 0 ? "start" : i === steps ? "end" : "middle"} fontSize="11" fill="var(--muted)">
          {i === 0 ? "Start" : `M${i}`}
        </text>
      ))}
      <path d={payPath} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d={deliveredPath} fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinejoin="round" />
      {delivered.map((p) => (
        <circle key={p.i} cx={x(p.i)} cy={y(p.pct)} r="3.5" fill="var(--foreground)" />
      ))}
    </svg>
  );
}
