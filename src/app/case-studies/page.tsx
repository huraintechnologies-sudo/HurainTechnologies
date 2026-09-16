import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { Icon } from "@/components/Icon";
import { CoverBanner } from "@/components/CoverBanner";
import { LiveDemos } from "@/components/LiveDemos";
import { JsonLd } from "@/components/JsonLd";
import { itemListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies | Blockchain, Payments & API Engineering Results",
  description:
    "Real engineering results from Hurain Technologies — multi-chain custody infrastructure, open banking API rollout, and AI fraud detection deployments.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Hurain Technologies Case Studies",
          caseStudies.map((cs) => ({ name: cs.title, url: `${siteConfig.url}/case-studies/${cs.slug}` }))
        )}
      />
      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs items={[{ name: "Case Studies", href: "/case-studies" }]} />
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Case Studies
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Anonymized results from platforms we've built and modernized across blockchain, banking, and payments.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/50 transition-colors"
              >
                <CoverBanner category={cs.industry} />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-semibold text-foreground">{cs.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{cs.summary}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {cs.results.slice(0, 2).map((r) => (
                      <div key={r.label}>
                        <p className="text-lg font-bold gradient-text">{r.metric}</p>
                        <p className="text-xs text-muted">{r.label}</p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-90 group-hover:gap-2.5 transition-all">
                    Read case study
                    <Icon name="arrow" className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <CtaSection />
        </Container>
      </section>
    </>
  );
}
