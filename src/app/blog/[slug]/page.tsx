import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { RelatedServices } from "@/components/ContentGrids";
import { LiveDemos } from "@/components/LiveDemos";
import { buildMetadata } from "@/lib/seo";
import { blogPostingJsonLd } from "@/lib/jsonld";
import { blogPosts, getBlogPostBySlug } from "@/data/blog-posts";
import { getBlogPostImage } from "@/lib/unsplash-service";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const blogImage = await getBlogPostImage(post.title);

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />

      <article>
        <section className="border-b border-border py-14">
          <Container className="max-w-3xl">
            <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title, href: `/blog/${post.slug}` }]} />
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-primary">{post.category}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{post.title}</h1>
            <div className="mt-5 flex items-center gap-3 text-xs text-muted">
              <span>{post.author}</span>
              <span>·</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </Container>
        </section>

        {blogImage && (
          <section className="border-b border-border">
            <Container className="max-w-3xl">
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image src={blogImage.url} alt={blogImage.alt} fill className="object-cover" priority />
              </div>
            </Container>
          </section>
        )}

        <section className="py-14">
          <Container className="max-w-3xl space-y-10">
            {post.body.map((block) => (
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
          </Container>
        </section>
      </article>

      <section className="py-16 border-t border-border bg-surface">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Related Services" title="Relevant engineering practices" />
          <div className="mt-8">
            <RelatedServices slugs={post.relatedServiceSlugs} />
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
          <CtaSection />
        </Container>
      </section>
    </>
  );
}
