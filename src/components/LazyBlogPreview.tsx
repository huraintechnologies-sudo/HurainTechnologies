import { lazy, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { blogPosts } from '@/data/blog-posts';

const BlogCard = ({ post, imgSrc, imgAlt }: any) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group flex flex-col rounded-xl border border-border bg-background overflow-hidden hover:border-primary/50 transition-colors"
  >
    <div className="relative h-40 overflow-hidden bg-surface animate-pulse">
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
        {post.category}
      </span>
    </div>
    <div className="p-5">
      <h3 className="text-base font-semibold leading-snug text-foreground">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{post.excerpt}</p>
      <span className="mt-4 text-xs text-muted">{post.readingTime}</span>
    </div>
  </Link>
);

export function LazyBlogPreview({ blogPostImages }: { blogPostImages: any[] }) {
  const fallbackImages = [
    "/images/blog-cover.jpg",
    "/images/blockchain-network.jpg",
    "/images/api-developer.jpg",
    "/images/why-choose-us.jpg",
    "/images/hero-dashboard.jpg",
  ];

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
      {blogPosts.map((post, i) => {
        const blogImage = blogPostImages[i];
        const imgSrc = blogImage?.url || fallbackImages[i % fallbackImages.length];
        const imgAlt = blogImage?.alt || `${post.title} - ${post.category}`;
        return (
          <Suspense
            key={post.slug}
            fallback={<div className="h-60 rounded-xl border border-border bg-surface animate-pulse" />}
          >
            <BlogCard post={post} imgSrc={imgSrc} imgAlt={imgAlt} />
          </Suspense>
        );
      })}
    </div>
  );
}
