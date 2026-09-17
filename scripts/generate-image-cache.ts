/**
 * Pre-generate Unsplash image URLs at build time
 * Eliminates 5+ second API calls during page rendering
 * Runs once during build and caches results
 */

import { getBlogPostImage, getCaseStudyImage, getIndustryImage, getServiceImage } from '@/lib/unsplash-service';
import { blogPosts } from '@/data/blog-posts';
import { caseStudies } from '@/data/case-studies';
import { industries } from '@/data/industries';
import { services } from '@/data/services';
import { serviceVerticals } from '@/data/service-verticals';
import fs from 'fs';
import path from 'path';

interface ImageCache {
  blogPosts: Record<string, { url: string; alt: string } | null>;
  caseStudies: Record<string, { url: string; alt: string } | null>;
  industries: Record<string, { url: string; alt: string } | null>;
  services: Record<string, { url: string; alt: string } | null>;
  solutions: Record<string, { url: string; alt: string } | null>;
  generatedAt: string;
}

async function generateImageCache() {
  console.log('🖼️  Generating Unsplash image cache...');

  const cache: ImageCache = {
    blogPosts: {},
    caseStudies: {},
    industries: {},
    services: {},
    solutions: {},
    generatedAt: new Date().toISOString(),
  };

  try {
    // Generate blog post images (in parallel, max 3 concurrent to avoid rate limiting)
    console.log(`📝 Generating ${blogPosts.length} blog post images...`);
    for (let i = 0; i < blogPosts.length; i++) {
      const post = blogPosts[i];
      const img = await getBlogPostImage(post.title, i).catch(() => null);
      cache.blogPosts[post.slug] = img;
      if ((i + 1) % 3 === 0) {
        console.log(`  ${i + 1}/${blogPosts.length}`);
      }
    }

    // Generate case study images
    console.log(`📊 Generating ${caseStudies.length} case study images...`);
    for (let i = 0; i < caseStudies.length; i++) {
      const cs = caseStudies[i];
      const img = await getCaseStudyImage(cs.industry, i).catch(() => null);
      cache.caseStudies[cs.slug] = img;
      if ((i + 1) % 3 === 0) {
        console.log(`  ${i + 1}/${caseStudies.length}`);
      }
    }

    // Generate industry images
    console.log(`🏢 Generating ${industries.length} industry images...`);
    for (let i = 0; i < industries.length; i++) {
      const ind = industries[i];
      const img = await getIndustryImage(ind.name, i).catch(() => null);
      cache.industries[ind.slug] = img;
    }

    // Generate service images
    console.log(`⚙️  Generating ${services.length} service images...`);
    for (let i = 0; i < services.length; i++) {
      const svc = services[i];
      const img = await getServiceImage(svc.name).catch(() => null);
      cache.services[svc.slug] = img;
    }

    // Generate solution images
    console.log(`💡 Generating ${serviceVerticals.length} solution images...`);
    for (let i = 0; i < serviceVerticals.length; i++) {
      const sol = serviceVerticals[i];
      const img = await getServiceImage(sol.name).catch(() => null);
      cache.solutions[sol.slug] = img;
    }

    // Save cache to file
    const cacheDir = path.join(process.cwd(), 'public');
    const cacheFile = path.join(cacheDir, 'image-cache.json');

    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
    console.log(`✅ Image cache saved to public/image-cache.json`);
    console.log(`📊 Total images cached: ${
      Object.keys(cache.blogPosts).length +
      Object.keys(cache.caseStudies).length +
      Object.keys(cache.industries).length +
      Object.keys(cache.services).length +
      Object.keys(cache.solutions).length
    }`);

  } catch (error) {
    console.error('❌ Error generating image cache:', error);
    process.exit(1);
  }
}

generateImageCache();
