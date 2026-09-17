/**
 * Load pre-generated image URLs from cache
 * Falls back to Unsplash API if cache misses
 * Dramatically speeds up page load times
 */

let imageCache: any = null;

async function loadImageCache() {
  if (imageCache) return imageCache;

  try {
    // Try to load from public/image-cache.json
    const response = await fetch('/image-cache.json');
    if (response.ok) {
      imageCache = await response.json();
      return imageCache;
    }
  } catch (error) {
    console.warn('⚠️ Image cache not found, will use Unsplash API');
  }

  return null;
}

export async function getCachedBlogImage(slug: string): Promise<{ url: string; alt: string } | null> {
  const cache = await loadImageCache();
  if (cache?.blogPosts?.[slug]) {
    return cache.blogPosts[slug];
  }
  return null;
}

export async function getCachedCaseStudyImage(slug: string): Promise<{ url: string; alt: string } | null> {
  const cache = await loadImageCache();
  if (cache?.caseStudies?.[slug]) {
    return cache.caseStudies[slug];
  }
  return null;
}

export async function getCachedIndustryImage(slug: string): Promise<{ url: string; alt: string } | null> {
  const cache = await loadImageCache();
  if (cache?.industries?.[slug]) {
    return cache.industries[slug];
  }
  return null;
}

export async function getCachedServiceImage(slug: string): Promise<{ url: string; alt: string } | null> {
  const cache = await loadImageCache();
  if (cache?.services?.[slug]) {
    return cache.services[slug];
  }
  return null;
}

export async function getCachedSolutionImage(slug: string): Promise<{ url: string; alt: string } | null> {
  const cache = await loadImageCache();
  if (cache?.solutions?.[slug]) {
    return cache.solutions[slug];
  }
  return null;
}
