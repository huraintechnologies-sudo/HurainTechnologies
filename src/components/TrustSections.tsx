import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/Icon";
import { DeliveryPlanSections } from "@/components/DeliveryPlanSections";
import { lc } from "@/lib/solution-location-content";

// Four company-level sections shown on every service, solution, industry and
// location page: methodologies, what makes us different, engagement models,
// and why clients choose us. Copy adapts to the page's topic and place so the
// sections read as written for that page, not pasted onto it.

type IconName = "check" | "security" | "api" | "cloud" | "ai" | "banking" | "payments" | "blockchain" | "map";

export function TrustSections({
  topic,
  place,
  compliance = "regulatory",
}: {
  // e.g. "Mobile App Development", "Payment Gateway Integration", "Fintech"
  topic: string;
  // e.g. "Kenya", "Nairobi, Kenya" — omit for global pages
  place?: string;
  compliance?: string;
}) {
  const t = lc(topic);
  const where = place ? ` in ${place}` : " worldwide";
  const market = place ? place.split(",").pop()!.trim() : "your target market";

  const methodologies: { title: string; icon: IconName; when: string; body: string }[] = [
    { title: "Agile Scrum", icon: "check", when: "Evolving products", body: `Two-week sprints with a working demo at the end of each, so ${t} priorities can change as you learn from users.` },
    { title: "Kanban", icon: "api", when: "Continuous delivery & support", body: "A visual flow of small tasks with work-in-progress limits — ideal for maintenance, integrations and post-launch improvements." },
    { title: "Fixed-scope (Waterfall-style)", icon: "banking", when: "Well-specified builds", body: "Requirements signed off up front with a fixed timeline and price — best when scope is clear and change is unlikely." },
    { title: "Lean MVP", icon: "ai", when: "New ventures", body: `Build the smallest ${t} release that proves demand, measure it with real users, then invest where the data points.` },
    { title: "DevOps & CI/CD", icon: "cloud", when: "Every project", body: "Automated tests, infrastructure-as-code and push-button deployments so releases are frequent, reversible and boring." },
    { title: "Security-by-design (DevSecOps)", icon: "security", when: "Regulated & high-value systems", body: "Threat modelling, dependency scanning and code review built into each sprint rather than a pen test at the end." },
  ];

  const different = [
    { title: "Engineering depth, not a reseller", body: `Your ${t} project is designed and built by our own in-house engineers — no hidden subcontracting chain between you and the people writing code.` },
    { title: place ? `Built for ${market}, not copied from elsewhere` : "Built for your market, not a template", body: `Payments, tax, language and data-protection requirements for ${market} are part of the design from day one instead of retrofitted after launch.` },
    { title: "Transparent, senior-led delivery", body: "A named project lead, a shared backlog, fortnightly demos and direct Slack access to the engineers — you always know what is being built and why." },
    { title: "Cost advantage without cutting corners", body: `Delivering from India gives clients${where} senior engineering at a fraction of typical onshore agency rates, with the same code-review, testing and security standards.` },
    { title: "You own everything", body: "Source code lives in your repository from the first commit; IP, infrastructure accounts and documentation transfer to you in full." },
    { title: "We stay after launch", body: "Monitoring, updates and a support SLA mean the team that built your product is the team that keeps it running." },
  ];

  const models = [
    { n: "01", title: "Dedicated Development Team", body: `An extended team of ${t} engineers, QA and architects working exclusively on your product, managed day-to-day by you with our engineering leadership behind them.`, best: "Long-term products and evolving roadmaps" },
    { n: "02", title: "Fixed-Cost Delivery", body: `A clearly scoped ${t} build with a defined timeline and price — ideal for a well-specified MVP, integration or launch product.`, best: "MVPs and clearly defined projects" },
    { n: "03", title: "Hybrid Engagement", body: `Keep product and ${compliance} decisions close to your${place ? ` ${market}` : ""} team while our specialists handle deep engineering remotely, with workshops or on-site visits at key milestones.`, best: "Enterprises and regulated businesses" },
  ];

  const reasons = [
    { title: "16+ years of engineering depth", body: "Custom software engineering with in-house teams across web, mobile, cloud, AI, payments and blockchain." },
    { title: "Security-first by default", body: "Encryption, least-privilege access, audit logs — and MPC/HSM custody and audited smart contracts where money is on-chain — designed in, not retrofitted." },
    { title: "Regulatory-aware architecture", body: `Designed with ${market}'s regulatory direction in mind and built alongside your licensed local legal counsel.` },
    { title: "Direct access, no layers", body: "Direct Slack or Teams access to your development team during the build, and the same people for post-launch support." },
  ];

  const benefits = [
    { title: "Faster time to market", body: `An experienced ${t} team with proven components means your first release ships in weeks, not quarters.` },
    { title: "Security-first architecture", body: "Secure from day one, rather than patched after an audit or incident." },
    { title: "Aligned compliance groundwork", body: `Controls, logs and data handling built around ${market}'s requirements so reviews go faster.` },
    { title: "Lower total cost of ownership", body: "Clean, documented, tested code that your own team can maintain — plus post-launch monitoring and support." },
  ];

  return (
    <>
      <DeliveryPlanSections topic={topic} place={place} />

      <section id="methodologies" className="border-t border-border py-16">
        <Container>
          <SectionHeading
            eyebrow="Our Approach"
            title="Our approach to development methodologies"
            description={`Our approach to custom software engineering draws on a range of methodologies, each selected to match the needs of your ${t} project${place ? ` and your team in ${place}` : ""}.`}
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {methodologies.map((m) => (
              <div key={m.title} className="rounded-xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                    <Icon name={m.icon} className="h-4 w-4 text-primary" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{m.title}</h3>
                    <p className="text-xs text-primary">Best for: {m.when}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="what-makes-us-different" className="border-t border-border bg-surface py-16">
        <Container>
          <SectionHeading
            eyebrow="Why we're different"
            title={place ? `What sets Hurain Technologies apart for ${market} businesses` : "What sets Hurain Technologies apart"}
            description={`Plenty of agencies can build ${t}. Here is what sets us apart for clients${where}.`}
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {different.map((d, i) => (
              <div key={d.title} className="rounded-xl border border-border bg-background p-6">
                <span className="text-xs font-semibold text-primary">0{i + 1}</span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="engagement-models" className="border-t border-border py-16">
        <Container>
          <SectionHeading
            eyebrow="Flexible engagement models"
            title={place ? `How we work with businesses in ${place}` : `How we work with ${t} clients worldwide`}
            description="Ways to work together, depending on how your team and roadmap are set up."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {models.map((m) => (
              <div key={m.n} className="card-glow flex flex-col rounded-2xl bg-surface p-7">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Model {m.n}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{m.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{m.body}</p>
                <p className="mt-5 border-t border-border pt-4 text-xs text-foreground/70">
                  <span className="font-semibold text-foreground">Best for:</span> {m.best}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="why-choose-us" className="border-t border-border bg-surface py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Why businesses choose us" title="Why businesses choose Hurain Technologies" />
              <ul className="mt-8 space-y-5">
                {reasons.map((r) => (
                  <li key={r.title} className="flex gap-3">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{r.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Business benefits" title={`What you gain${place ? ` in ${market}` : ""}`} />
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {benefits.map((b) => (
                  <div key={b.title} className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-sm font-semibold text-foreground">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
