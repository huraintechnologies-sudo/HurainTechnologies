import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { LiveDemos } from "@/components/LiveDemos";
import { JsonLd } from "@/components/JsonLd";
import { itemListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { localeForCountrySlug } from "@/lib/locale";
import { industries } from "@/data/industries";
import { countries } from "@/data/countries";
import { getIndustryImage } from "@/lib/unsplash-service";
import { TrustSections } from "@/components/TrustSections";
import { PageFaq } from "@/components/PageFaq";
import { pageFaqs } from "@/data/page-faqs";

// Exclude Pakistan, Israel, China, Japan
const excludedCountries = ["pakistan", "israel", "china", "japan"];
const filteredCountries = countries.filter(
  (c) => !excludedCountries.includes(c.slug.toLowerCase())
);

// Generate unique Unsplash images for each industry based on keywords
async function getIndustryImageUrl(name: string, index: number): Promise<{ src: string; alt: string }> {
  const image = await getIndustryImage(name);
  if (image) {
    return { src: image.url, alt: image.alt };
  }
  // Fallback to rotating static images if API fails
  const fallbackImages = [
    "/images/blockchain-hardware.jpg",
    "/images/case-study-fintech.jpg",
    "/images/payment-terminal.jpg",
    "/images/api-developer.jpg",
    "/images/why-choose-us.jpg",
    "/images/global-map.jpg",
    "/images/blog-cover.jpg",
    "/images/blockchain-network.jpg",
    "/images/hero-dashboard.jpg",
  ];
  const imageSrc = fallbackImages[index % fallbackImages.length];
  return { src: imageSrc, alt: `${name} software development platform` };
}

export const metadata: Metadata = buildMetadata({
  title: "Industry Solutions | Fintech, Crypto, Banking, Payments, SaaS, Healthtech & More",
  description:
    "Hurain Technologies builds enterprise software for regulated industries: banking and fintech, cryptocurrency and Web3, payments and PSPs, SaaS platforms, healthtech and insurtech, real estate, remittance, digital banking, and gaming. 16+ years experience, 2000+ projects across industries.",
  path: "/industries",
});

export default async function IndustriesPage() {
  // Fetch unique images for each industry with error handling
  let industryImagesMap: { slug: string; image: { src: string; alt: string } }[] = [];

  try {
    industryImagesMap = await Promise.all(
      industries.map(async (industry, i) => ({
        slug: industry.slug,
        image: await getIndustryImageUrl(industry.name, i).catch(() => ({
          src: "/images/blog-cover.jpg",
          alt: `${industry.name} software development`
        })),
      }))
    );
  } catch (error) {
    console.warn('Failed to fetch industry images:', error);
    // Fallback: create map with fallback images
    industryImagesMap = industries.map((industry, i) => {
      const fallbackImages = [
        "/images/blockchain-hardware.jpg",
        "/images/case-study-fintech.jpg",
        "/images/payment-terminal.jpg",
        "/images/api-developer.jpg",
        "/images/why-choose-us.jpg",
        "/images/global-map.jpg",
        "/images/blog-cover.jpg",
        "/images/blockchain-network.jpg",
        "/images/hero-dashboard.jpg",
      ];
      return {
        slug: industry.slug,
        image: { src: fallbackImages[i % fallbackImages.length], alt: `${industry.name}` }
      };
    });
  }

  const imagesBySlug = Object.fromEntries(
    industryImagesMap.map((item) => [item.slug, item.image])
  );

  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          "Industries Hurain Technologies Serves",
          industries.map((i) => ({ name: i.name, url: `${siteConfig.url}/industries/${i.slug}` }))
        )}
      />
      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs items={[{ name: "Industries", href: "/industries" }]} />
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Industries We Serve
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            We work exclusively with regulated, high-stakes digital businesses — sectors where downtime, a security
            gap, or a compliance miss has real financial and reputational cost.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const img = imagesBySlug[industry.slug] || { src: "/images/blog-cover.jpg", alt: industry.name };
              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 backdrop-blur-sm text-primary border border-primary/30">
                      <Icon name={industry.icon as never} className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-foreground">{industry.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{industry.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-90 group-hover:gap-2.5 transition-all">
                      Explore industry
                      <Icon name="arrow" className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Why Industry Depth Matters" title="Domain-specific engineering, not generic software" />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
            <p>
              Generic software teams build features. Hurain Technologies builds for the specific regulatory,
              operational, and transaction-volume realities of {industries.length} regulated industries — banking
              and fintech software development, crypto and Web3 engineering, payments and PSP infrastructure,
              enterprise SaaS platform architecture, healthtech and insurtech compliance systems, real estate and
              PropTech tokenization, cross-border remittance and money transfer platforms, digital banking and
              neobank core systems, and Web3 gaming studio and NFT platform infrastructure.
            </p>
            <p>
              Each industry page below breaks down the operational pain points that vertical actually faces, the
              specific engineering approach we take to solve them, the services most commonly paired with that
              industry, and country-specific regulatory context for the markets you’re building in — not a
              generic “we build software for any industry” pitch.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <LiveDemos />
        </Container>
      </section>

      {/* Geographic Availability Section */}
      <section className="py-16 border-t border-border bg-surface">
        <Container>
          <SectionHeading
            eyebrow="Global Reach"
            title={`Industries in ${filteredCountries.length}+ Markets`}
          />
          <p className="mt-4 max-w-2xl text-base text-muted mb-8">
            Industry-specific engineering solutions available across our served markets. Select a country to explore local compliance context and city-specific expertise.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
            {filteredCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/${localeForCountrySlug(country.slug)}`}
                className="p-3 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center text-sm font-medium text-foreground hover:text-primary"
              >
                {country.countryName}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/markets-we-cover"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              View All Markets →
            </Link>
          </div>
        </Container>
      </section>

      <TrustSections topic={"Industry Software"} />
      <PageFaq title="Industries — frequently asked questions" faqs={pageFaqs.industries} />

      <section className="pb-20">
        <Container>
          <CtaSection />
        </Container>
      </section>
    </>
  );
}

