import { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { LiveDemos } from "@/components/LiveDemos";
import { Icon } from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/jsonld";

const hiringSteps = [
  { title: "Apply", body: "Send your CV, GitHub or portfolio and a few lines on the most interesting system you have built." },
  { title: "Intro call (30 min)", body: "A conversation with an engineering lead about your experience, interests and what you want to work on next." },
  { title: "Practical exercise", body: "A short, realistic task from our domain — reviewed with you, not just scored. No whiteboard puzzles." },
  { title: "Team interview", body: "Architecture discussion with future teammates, followed by an offer within a week." },
];

const careerFaqs = [
  { question: "Can I work remotely at Hurain Technologies?", answer: "Yes. Most roles are remote-friendly within India, with some fully remote. Teams meet in person in Gujarat each quarter." },
  { question: "What does the hiring process look like?", answer: "Application, a 30-minute intro call, a short practical exercise, and a team interview. Most candidates hear back within a week at each stage." },
  { question: "What technologies will I work with?", answer: "TypeScript/Node.js, Python, Go, Java, Solidity and Rust, React/Next.js and Flutter, on AWS/GCP with Kubernetes and Terraform — depending on the practice you join." },
  { question: "Do you hire freshers or interns?", answer: "Occasionally, for candidates with strong project work. Send your GitHub and we'll consider you for upcoming openings." },
  { question: "Don't see a role that fits?", answer: `Email ${siteConfig.email} with your profile — we keep strong engineers in mind for new projects.` },
];

export const metadata: Metadata = buildMetadata({
  title: "Careers | Join Our Engineering Team",
  description:
    "Join Hurain Technologies' engineering team working on blockchain, payments, cloud, and AI platforms for regulated digital businesses worldwide.",
  path: "/careers",
});

const openRoles = [
  { title: "Senior Blockchain Engineer (Solidity/Rust)", type: "Full-time · Remote / India", team: "Blockchain & Crypto" },
  { title: "Backend Engineer — Payments & API Integration", type: "Full-time · Remote / India", team: "Payments" },
  { title: "Smart Contract Engineer", type: "Full-time · Remote / India", team: "Blockchain & Crypto" },
  { title: "DevOps / Cloud Engineer (Kubernetes)", type: "Full-time · Remote", team: "Cloud & DevOps" },
  { title: "Machine Learning Engineer — Fraud & Risk", type: "Full-time · Remote", team: "AI & Automation" },
  { title: "Security Engineer — API & Application Security", type: "Full-time · Remote / India", team: "Security & Compliance" },
];

const perks = [
  { title: "Remote-friendly", description: "Work from anywhere with quarterly in-person team gatherings in Gujarat, India." },
  { title: "Domain depth", description: "Work exclusively on regulated, high-stakes platforms — not another CRUD app." },
  { title: "Ownership", description: "Small, senior-heavy teams where engineers own architecture decisions end to end." },
  { title: "Growth budget", description: "Annual learning budget for security certifications, conferences, and courses." },
];

export default function CareersPage() {
  return (
    <>
      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs items={[{ name: "Careers", href: "/careers" }]} />
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Build the infrastructure behind regulated digital businesses
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.name} is growing our blockchain, payments, cloud, and AI engineering practices.
            We're looking for senior engineers who want deep, high-stakes problems — not another dashboard.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Why Join Us" title="What it's like to work here" />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => (
              <div key={perk.title} className="rounded-xl border border-border bg-surface p-5">
                <Icon name="check" className="w-5 h-5 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{perk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{perk.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading eyebrow="Open Roles" title="Current openings" />
          <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-background">
            {openRoles.map((role) => (
              <div key={role.title} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{role.title}</h3>
                  <p className="mt-1 text-xs text-muted">{role.type} · {role.team}</p>
                </div>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Application: " + role.title)}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Apply Now
                  <Icon name="arrow" className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Don't see a fit? Send your CV to{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a> —
            we review every application.
          </p>
        </Container>
      </section>

      <section className="py-16 border-t border-border">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <JsonLd data={faqJsonLd(careerFaqs)} />
      <section className="border-t border-border bg-surface py-16">
        <Container>
          <SectionHeading eyebrow="Hiring process" title="How we hire" />
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((st, n) => (
              <li key={st.title} className="rounded-xl border border-border bg-background p-6">
                <span className="text-xs font-semibold text-primary">Step {n + 1}</span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{st.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Careers — frequently asked questions" />
          <div className="mt-8">
            <FaqAccordion faqs={careerFaqs} />
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <CtaSection
            title="Want to talk to the team first?"
            description="Reach out and we'll set up a conversation with the relevant engineering lead."
            primaryLabel="Contact Us"
            primaryHref="/contact"
            secondaryLabel="About Hurain Technologies"
            secondaryHref="/about"
          />
        </Container>
      </section>
    </>
  );
}
