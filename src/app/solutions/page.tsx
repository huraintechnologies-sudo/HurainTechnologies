import { Metadata } from "next";
import Link from "next/link";
import { serviceVerticals } from "@/data/service-verticals";
import { solutionPlaybooks } from "@/data/solution-playbooks";
import { priorityCountries as curatedCountries } from "@/data/countries";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";
import { TrustSections } from "@/components/TrustSections";
import { QuickAnswer, LinkPills } from "@/components/location/LocationBlocks";
import { buildMetadata } from "@/lib/seo";
import { faqJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Software Development Solutions — Mobile, E-Commerce, Fintech, AI & More",
  description:
    "15 software solutions from Hurain Technologies: mobile apps, e-commerce, food delivery, fintech, healthcare, AI, SaaS, IoT, blockchain, e-learning and real estate — with cost, timeline and local delivery for 200+ countries.",
  path: "/solutions",
  keywords: ["software development solutions", "custom software development company", "mobile app development", "fintech app development", "SaaS development", "AI development company"],
});

const faqs = [
  { question: "What kind of software does Hurain Technologies build?", answer: `We build ${serviceVerticals.length} kinds of solutions — from mobile apps, e-commerce and food delivery platforms to fintech, healthcare, AI, SaaS, IoT and blockchain products — plus dedicated developer teams. Each solution page lists features, timelines, cost drivers and tech stack.` },
  { question: "Do you work with clients outside India?", answer: "Yes. Most of our clients are overseas. We deliver remotely with a team that works 24/7 across every time zone, and every country page explains local payment, tax and data-protection requirements." },
  { question: "How quickly can a project start?", answer: "Discovery can usually begin within 5 business days of a signed proposal, and dedicated developers can start within 1–2 weeks." },
  { question: "Who owns the code?", answer: "You do. Code lives in your repository from the first commit and full IP transfers to you." },
];

export default function SolutionsPage() {
  const byCategory = serviceVerticals.reduce<Record<string, typeof serviceVerticals>>((acc, v) => {
    (acc[v.category] ||= []).push(v);
    return acc;
  }, {});

  return (
    <>
      <JsonLd
        data={[
          itemListJsonLd("Software development solutions", serviceVerticals.map((v) => ({ name: v.name, url: `${siteConfig.url}/solutions/${v.slug}` }))),
          faqJsonLd(faqs),
        ]}
      />

      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <Container className="relative py-14">
          <Breadcrumbs items={[{ name: "Solutions", href: "/solutions" }]} />
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Software development solutions for every stage of growth</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Pick the product you need to build. Each solution page explains features, delivery process, timelines, cost drivers and technology — and has dedicated pages for your country and city.
          </p>
          <div className="max-w-2xl">
            <QuickAnswer question="What solutions does Hurain Technologies offer?" answer={faqs[0].answer} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="space-y-14">
          {Object.entries(byCategory).map(([category, list]) => (
            <div key={category}>
              <SectionHeading eyebrow={category} title={category} />
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((v) => {
                  const pb = solutionPlaybooks[v.slug];
                  return (
                    <Link key={v.slug} href={`/solutions/${v.slug}`} className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/50">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">{v.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{v.description}</p>
                      {pb && (
                        <p className="mt-4 text-xs text-foreground/70">
                          <span className="font-semibold text-primary">Milestone-based delivery</span> · pay after sign-off
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Explore
                        <Icon name="arrow" className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <TrustSections topic="Custom Software" />

      <section className="border-t border-border py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Solutions: frequently asked questions" />
          <div className="mt-8">
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-16">
        <Container>
          <SectionHeading eyebrow="Markets" title="Solutions by country" description="Local payment, tax and data-protection requirements for each market." />
          <div className="mt-8">
            <LinkPills links={curatedCountries.map((c) => ({ name: c.countryName, href: `/solutions/mobile-app-development/${c.slug}` }))} />
          </div>
          <Link href="/markets-we-cover" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            All markets we cover
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </Link>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <CtaSection title="Not sure which solution fits?" description="Tell us the problem you're solving — we'll recommend an approach, timeline and fixed estimate within 5 business days." />
        </Container>
      </section>
    </>
  );
}
