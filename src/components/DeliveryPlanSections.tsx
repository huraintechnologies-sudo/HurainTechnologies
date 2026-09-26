import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { deliveryPlanFor, Milestone } from "@/lib/delivery-plan";
import { placeDeliveryFor } from "@/lib/delivery-place";

// "How we deliver" (7 quality-gated stages) and a milestone payment plan,
// tailored to the page's service / solution / industry and place. No
// durations are shown: timelines are agreed per project.
export function DeliveryPlanSections({ topic: rawTopic, place }: { topic: string; place?: string }) {
  // Some templates pass a lower-cased topic; headings read better title-cased.
  const topic = rawTopic === rawTopic.toLowerCase() ? rawTopic.replace(/\b\w/g, (c) => c.toUpperCase()) : rawTopic;
  const plan = deliveryPlanFor(topic);
  const where = place ? ` in ${place}` : "";
  const local = placeDeliveryFor(place, plan.track);
  const t = topic.toLowerCase();
  const localSupport = local
    ? [
        {
          service: `${local.short} business-hours coverage`,
          detail: `Helpdesk, calls and planned maintenance scheduled around ${local.short} business hours${local.offsetLabel ? ` (${local.offsetLabel})` : ""}; critical issues escalated immediately.`,
        },
        ...(local.privacyLaw
          ? [{ service: "Local compliance updates", detail: `Changes to ${local.privacyLaw}${local.regulator && plan.track !== "app" ? ` and ${local.regulator} guidance` : ""} tracked and reflected in the product.` }]
          : []),
      ]
    : [];

  const updates = [
    {
      title: "Daily update",
      when: local?.dailyUpdateAt ? `Every working day, around ${local.dailyUpdateAt} ${local.short} time` : "Every working day",
      points: ["What was completed today", "What is planned for tomorrow", "Blockers and decisions needed from you", "Links to builds you can try"],
    },
    {
      title: "Weekly work overview",
      when: "Every Friday, with a live call in your business hours",
      points: ["Features completed and demo recordings", "Progress against the current milestone", "Risks, open questions and change requests", "Plan and priorities for next week"],
    },
    {
      title: "Sprint demo & milestone review",
      when: "End of every sprint and milestone",
      points: ["Working software demonstrated live", "Your feedback captured in the backlog", "Quality-gate checklist shared", "Written sign-off before any payment"],
    },
  ];

  return (
    <>
      <section id="how-we-deliver" className="border-t border-border py-20">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title={`How we deliver ${topic}${where}`}
            description={`Every ${t} engagement${where} follows the same staged, quality-gated process — shaped around your requirements${local ? ` and ${local.short}'s market` : ""}. You see progress every day, review it every week, and give written sign-off at every milestone before any payment is due.`}
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

          {/* Communication cadence */}
          <div className="mt-14">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              You always know what was done today — and what happens next
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              {local?.overlapHours
                ? `With about ${local.overlapHours} shared working hours a day between ${local.short} and our team in India, questions are answered the same day and your update is waiting for you${local.dailyUpdateAt ? ` at around ${local.dailyUpdateAt}` : ""}.`
                : local
                  ? `Our day in India ends as ${local.short}'s begins or winds down, so each morning you find a written update waiting — and calls are booked in your business hours.`
                  : "A written daily update, a weekly work overview and a live demo every sprint — so there are no surprises at milestone time."}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {updates.map((u, i) => (
                <div key={u.title} className="flex flex-col rounded-xl border border-border bg-surface">
                  <div className="flex items-center gap-2 rounded-t-xl px-5 py-3" style={stageColors(i === 0 ? 3 : 0)}>
                    <span className="font-mono text-xs opacity-70">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-semibold">{u.title}</span>
                  </div>
                  <div className="flex-1 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-primary">{u.when}</p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                      {u.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <Icon name="check" className="mt-0.5 w-4 h-4 shrink-0 text-primary" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What changes for this country / city */}
          {local && local.notes.length > 0 && (
            <div className="mt-14">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                What we build in for {local.short}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                Local requirements are part of the scope from the Discover stage — not retrofitted before launch.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {local.notes.map((n) => (
                  <div key={n.title} className="rounded-xl border border-border bg-surface p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-primary">{n.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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

      <section id="support-maintenance" className="border-t border-border py-20">
        <Container>
          <SectionHeading
            eyebrow="Warranty & annual support"
            title={`Protected after launch — warranty and annual support for your ${topic} project${where}`}
            description={`Go-live is where your ${t} product starts earning — so we stay accountable for it. Every project includes a free 90-day defect warranty. After that, the same team that built it keeps it secure, updated and running${local ? ` in ${local.short} business hours` : ""} on a fixed annual fee agreed up front — no open-ended hourly billing, no surprise invoices.`}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-4">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Included free</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">90-day warranty</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Any defect found in the first 90 days after go-live is fixed free of charge.
                </p>
                <ul className="mt-4 space-y-2 border-t border-border pt-4 text-[13px] text-foreground/85">
                  {["Every delivered feature covered", "Fixes tested and deployed to production", "Same engineers who built it"].map((w) => (
                    <li key={w} className="flex items-start gap-2">
                      <Icon name="check" className="mt-0.5 w-3.5 h-3.5 shrink-0 text-primary" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-6">
                <p className="font-mono text-[11px] uppercase tracking-wide text-primary">Fixed-cost annual package</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">30% of project cost</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  per year for Annual Support &amp; Maintenance, with a dedicated developer assigned to your {topic.toLowerCase()} platform.
                  A fixed price, known in advance.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-surface lg:col-span-8">
              <table className="w-full text-left text-sm">
                <thead style={{ background: "var(--foreground)", color: "var(--background)" }}>
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Service</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Included in the annual package</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[...plan.support, ...localSupport].map((s) => (
                    <tr key={s.service} className="align-top">
                      <td className="px-4 py-3.5 font-semibold text-foreground sm:whitespace-nowrap">{s.service}</td>
                      <td className="px-4 py-3.5 text-[13px] leading-relaxed text-muted">{s.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <section id="source-code-ownership" className="border-t border-border py-20">
        <Container>
          <SectionHeading
            eyebrow="Source code & IP ownership"
            title="100% of the source code and IP is owned by you"
            description={`For every ${t.startsWith("custom") ? t : `custom ${t}`} project${where}, upon full and final payment the complete source code and intellectual property are transferred to you — so you can host, maintain and enhance the system with any developer.`}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
              {plan.ownership.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-foreground/85">
                  <Icon name="check" className="mt-0.5 w-4 h-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-center gap-3 rounded-2xl p-6 lg:col-span-4" style={{ background: "var(--foreground)", color: "var(--background)" }}>
              {["No lock-in", "No forced upgrades", "No subscription trap"].map((t) => (
                <p key={t} className="flex items-center gap-2.5 text-lg font-semibold">
                  <Icon name="check" className="w-5 h-5 shrink-0 text-primary" />
                  {t}
                </p>
              ))}
              <p className="mt-2 text-sm opacity-75">Your code lives in your own repository from the first commit.</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="dedicated-developer" className="border-t border-border py-20">
        <Container>
          <SectionHeading
            eyebrow="Continuous enhancement"
            title="Launch is just the beginning — keep shipping with your own dedicated team"
            description={`Your ${topic.toLowerCase()} platform should get better every month, not stand still after go-live. Start with one dedicated developer working on your priorities across apps, dashboards and backend — and grow to a full team of developers and support members whenever your roadmap demands it.`}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-6 lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-primary">Dedicated team, your way</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">From one developer to a full team</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Pricing is based on the team members you need — tell us your requirements and we will quote your team.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-foreground/85">
                {["Start any time after launch", "Hire developers as you need them", "Scale up, scale down or pause"].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 w-4 h-4 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-8">
              <h3 className="text-base font-semibold text-foreground">What your team can take on after launch</h3>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm text-foreground/85 sm:grid-cols-2">
                {plan.enhancements.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 w-4 h-4 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-base font-semibold text-foreground">
              Need more hands? Add developers and support members as your requirements grow
            </h3>
            <p className="mt-1 text-sm text-muted">
              Start with one person and add only the roles your {topic.toLowerCase()} roadmap needs — each is quoted to your requirements.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {[
                { label: "Development team", roles: plan.devRoles },
                { label: "Support team", roles: plan.supportRoles },
              ].map((group) => (
                <div key={group.label}>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-primary">{group.label}</p>
                  <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-background">
                    {group.roles.map((role) => (
                      <li key={role.role} className="px-4 py-3">
                        <p className="text-sm font-semibold text-foreground">{role.role}</p>
                        <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{role.does}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
  const delivered = [{ i: 0, pct: 0 }];
  let acc = milestones[0].percent;
  milestones.slice(1).forEach((m, i) => {
    acc += m.percent;
    delivered.push({ i: i + 1, pct: acc });
  });
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
