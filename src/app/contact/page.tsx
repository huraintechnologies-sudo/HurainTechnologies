import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Book a Technical Consultation",
  description:
    "Contact Hurain Technologies for blockchain, payments, API, cloud, AI, and cybersecurity engineering. Book a discovery call or send us your project details.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
    <JsonLd data={localBusinessJsonLd()} />
    {/* Contact hero image */}
    <div className="relative h-52 sm:h-64 overflow-hidden border-b border-border">
      <Image
        src="/images/contact-office.jpg"
        alt="Two professionals in a consultation meeting at a modern tech office with city skyline view, representing Hurain Technologies technical discovery calls"
        fill
        className="object-cover object-top"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      <div className="absolute inset-0 flex items-end">
        <Container className="pb-8">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
            2-day response · Engineer-led discovery
          </span>
        </Container>
      </div>
    </div>
    <section className="py-14">
      <Container>
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
        <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Let's Talk</h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Tell us about your platform and we'll set up a technical discovery call within 2 business days. No
              sales script — you'll talk to an engineer who understands your domain.
            </p>
            <p className="mt-3 text-sm text-muted">
              Founder &amp; point of contact: <span className="text-foreground/85">{siteConfig.founderName}</span>
            </p>

            <div className="mt-10 space-y-5">
              <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="mail" className="w-4.5 h-4.5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Email</span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {siteConfig.email}
                  </span>
                </span>
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="phone" className="w-4.5 h-4.5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Phone</span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {siteConfig.phoneDisplay}
                  </span>
                </span>
              </a>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="whatsapp" className="w-4.5 h-4.5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">WhatsApp</span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Chat with us
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="map" className="w-4.5 h-4.5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Headquarters</span>
                  <span className="block text-sm font-medium text-foreground">
                    {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}, {siteConfig.address.country}
                  </span>
                </span>
              </div>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="instagram" className="w-4.5 h-4.5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Instagram</span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Follow us
                  </span>
                </span>
              </a>
              <a href={siteConfig.social.googleBusiness} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="google" className="w-4.5 h-4.5" />
                </span>
                <span>
                  <span className="block text-xs text-muted">Google Business Profile</span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    View listing &amp; reviews
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <iframe
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${siteConfig.name} location on Google Maps`}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
