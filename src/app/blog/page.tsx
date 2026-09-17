import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { LiveDemos } from "@/components/LiveDemos";
import { JsonLd } from "@/components/JsonLd";
import { itemListJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { blogPosts } from "@/data/blog-posts";
import { ultraStrongOrganizationJsonLd } from "@/lib/jsonld-ultra-strong";
import { collectionPageJsonLd, webPageJsonLd, breadcrumbJsonLdComplete } from "@/lib/jsonld-seo-complete";

export const metadata: Metadata = buildMetadata({
  title: "Blog | Blockchain, Payments & Security Insights",
  description:
    "Engineering insights from Hurain Technologies on blockchain development, cloud architecture, API security, and payments infrastructure.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const blogKeywords = [
    "blockchain development blog",
    "fintech engineering insights",
    "cloud architecture articles",
    "API security best practices",
    "smart contract development guide",
    "cryptocurrency engineering",
    "payment systems architecture",
    "software development insights",
  ];

  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
  ];

  return (
    <>
      <JsonLd
        data={[
          ultraStrongOrganizationJsonLd(),
          {
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`,
            name: siteConfig.name,
            url: siteConfig.url,
          },
          collectionPageJsonLd(
            "Hurain Technologies Blog",
            "Engineering insights on blockchain, fintech, cloud architecture, API security, and payments",
            blogPosts.length,
            blogPosts.map((p) => ({
              name: p.title,
              url: `${siteConfig.url}/blog/${p.slug}`,
              description: p.excerpt,
            }))
          ),
          itemListJsonLd(
            "Blog Posts",
            blogPosts.map((p) => ({ name: p.title, url: `${siteConfig.url}/blog/${p.slug}` }))
          ),
          webPageJsonLd(
            "Engineering Blog - Hurain Technologies",
            "Practical insights on blockchain, payments, cloud architecture, and security from experienced engineers",
            blogKeywords
          ),
          breadcrumbJsonLdComplete(breadcrumbs),
        ]}
      />
      <section className="border-b border-border py-14">
        <Container>
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Engineering Insights
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Practical, engineering-led perspectives on blockchain, cloud architecture, payments, and security —
            written by the team that builds these systems.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-surface p-7 hover:border-primary/50 transition-colors"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-primary">{post.category}</p>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-foreground">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{post.excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-xs text-muted">
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 border-t border-border bg-surface">
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
