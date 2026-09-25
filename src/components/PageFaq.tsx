import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/jsonld";
import { FaqItem } from "@/lib/types";

// Visible FAQ + matching FAQPage structured data, so answer engines and
// Google read exactly what the visitor sees.
export function PageFaq({ title, faqs }: { title: string; faqs: FaqItem[] }) {
  return (
    <section className="border-t border-border py-16">
      <JsonLd data={faqJsonLd(faqs)} />
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={title} />
        <div className="mt-8">
          <FaqAccordion faqs={faqs} />
        </div>
      </Container>
    </section>
  );
}
