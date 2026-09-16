import { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { LiveDemos } from "@/components/LiveDemos";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { itemListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/data/services";

export const metadata: Metadata = buildMetadata({
  title: "Professional Software Development Services | Blockchain, Crypto, Payments, Cloud, AI & More",
  description:
    "Expert software development services from Hurain Technologies: blockchain & Web3 development, cryptocurrency solutions, payment gateway integration, fintech, cloud modernization, AI fraud detection, cybersecurity, and compliance. 16+ years experience, 2000+ projects delivered globally.",
  path: "/services",
  keywords: services.flatMap((s) => s.keywords).slice(0, 25),
});

const categories = Array.from(new Set(services.map((s) => s.category)));

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Hurain Technologies Services",
          services.map((s) => ({ name: s.name, url: `${siteConfig.url}/services/${s.slug}` }))
        )}
      />
      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Software Development Services
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Eight specialized engineering practices covering blockchain and cryptocurrency, payments, API
            and open banking, cloud modernization, AI fraud detection, and cybersecurity/compliance — each led by
            engineers who work exclusively in that domain.
          </p>
        </Container>
      </section>

      {categories.map((category) => (
        <section key={category} className="py-14 border-b border-border last:border-b-0">
          <Container>
            <SectionHeading eyebrow={category} title={`${category} services`} />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.category === category)
                .map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="py-16 border-t border-border">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <CtaSection />
        </Container>
      </section>
    </>
  );
}
