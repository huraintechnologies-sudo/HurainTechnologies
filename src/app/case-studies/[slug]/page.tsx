import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { CoverBanner } from "@/components/CoverBanner";
import { RelatedServices } from "@/components/ContentGrids";
import { LiveDemos } from "@/components/LiveDemos";
import { buildMetadata } from "@/lib/seo";
import { caseStudyJsonLd } from "@/lib/jsonld";
import { getCaseStudySchemas } from "@/lib/jsonld-universal";
import { buildCaseStudyKeywords } from "@/lib/keywords-builder";
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { getCaseStudyImage } from "@/lib/unsplash-service";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  return buildMetadata({
    title: `${caseStudy.title} — Case Study`,
    description: caseStudy.metaDescription,
    path: `/case-studies/${caseStudy.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  // Fetch unique image for this case study
  const caseStudyImage = await getCaseStudyImage(caseStudy.industry);

  return (
    <>
      <JsonLd data={getCaseStudySchemas(caseStudyJsonLd(caseStudy))} />

      <section className="border-b border-border py-14">
        <Container className="max-w-4xl">
          <Breadcrumbs
            items={[
              { name: "Case Studies", href: "/case-studies" },
              { name: caseStudy.title, href: `/case-studies/${caseStudy.slug}` },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{caseStudy.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">{caseStudy.summary}</p>
        </Container>
      </section>

      <section className="pt-10">
        <Container className="max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border">
            {caseStudyImage ? (
              <div className="relative w-full h-96">
                <Image
                  src={caseStudyImage.url}
                  alt={caseStudyImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <CoverBanner category={caseStudy.industry} size="lg" />
            )}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-3xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {caseStudy.results.map((r) => (
              <div key={r.label} className="rounded-xl border border-border bg-surface px-4 py-6 text-center">
                <p className="text-2xl font-bold gradient-text">{r.metric}</p>
                <p className="mt-1.5 text-xs text-muted">{r.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container className="max-w-3xl space-y-10">
          {caseStudy.background && (
            <div>
              <SectionHeading eyebrow="Background" title="The client and the setting" />
              <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{caseStudy.background}</p>
            </div>
          )}
          <div>
            <SectionHeading eyebrow="The Challenge" title="What the client was facing" />
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{caseStudy.challenge}</p>
            {caseStudy.challengeDetail && caseStudy.challengeDetail.length > 0 && (
              <div className="mt-8 space-y-8">
                {caseStudy.challengeDetail.map((block) => (
                  <div key={block.heading}>
                    <h2 className="text-xl font-semibold text-foreground">{block.heading}</h2>
                    <div className="mt-3 space-y-4">
                      {block.paragraphs.map((p, i) => (
                        <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <SectionHeading eyebrow="The Solution" title="How Hurain Technologies solved it" />
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{caseStudy.solution}</p>
            {caseStudy.solutionDetail && caseStudy.solutionDetail.length > 0 && (
              <div className="mt-8 space-y-8">
                {caseStudy.solutionDetail.map((block) => (
                  <div key={block.heading}>
                    <h2 className="text-xl font-semibold text-foreground">{block.heading}</h2>
                    <div className="mt-3 space-y-4">
                      {block.paragraphs.map((p, i) => (
                        <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {caseStudy.outcomeDetail && caseStudy.outcomeDetail.length > 0 && (
            <div>
              <SectionHeading eyebrow="The Outcome" title="Results in detail" />
              <div className="mt-8 space-y-8">
                {caseStudy.outcomeDetail.map((block) => (
                  <div key={block.heading}>
                    <h2 className="text-xl font-semibold text-foreground">{block.heading}</h2>
                    <div className="mt-3 space-y-4">
                      {block.paragraphs.map((p, i) => (
                        <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Related Services" title="Services used in this engagement" />
          <div className="mt-8">
            <RelatedServices slugs={caseStudy.serviceSlugs} />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container className="max-w-3xl">
          <CtaSection
            title="Want results like this for your platform?"
            description="Book a discovery call and get a scoped technical estimate within 5 business days."
          />
        </Container>
      </section>
    </>
  );
}
