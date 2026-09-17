// Unsplash API Service for fetching unique images for each page
// Free, high-quality real photographs
// Perfect for SEO and unique content

const UNSPLASH_API_KEY = "wNKgK2yW_5PgIGWm96pxkv1vIEGX5FfHxNqKj5QSqJY";
const UNSPLASH_API_URL = "https://api.unsplash.com";

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

interface ImageOptions {
  query: string;
  width?: number;
  height?: number;
  orientation?: "landscape" | "portrait" | "squarish";
}

// Cache to avoid duplicate API calls
const imageCache = new Map<string, UnsplashImage>();

export async function getUnsplashImage(options: ImageOptions): Promise<UnsplashImage | null> {
  try {
    const cacheKey = `${options.query}-${options.width}-${options.height}`;

    // Check cache first
    if (imageCache.has(cacheKey)) {
      return imageCache.get(cacheKey) || null;
    }

    const params = new URLSearchParams({
      query: options.query,
      per_page: "1",
      client_id: UNSPLASH_API_KEY,
    });

    if (options.width) params.append("w", options.width.toString());
    if (options.height) params.append("h", options.height.toString());
    if (options.orientation) params.append("orientation", options.orientation);

    const response = await fetch(`${UNSPLASH_API_URL}/search/photos?${params}`);
    const data = await response.json() as { results: UnsplashImage[] };

    if (data.results && data.results.length > 0) {
      const image = data.results[0];
      imageCache.set(cacheKey, image);
      return image;
    }

    return null;
  } catch (error) {
    console.error("Error fetching from Unsplash:", error);
    return null;
  }
}

// Keyword mapping for different page types
export const imageKeywords = {
  // Blog keywords
  "blog-blockchain": "blockchain technology",
  "blog-cryptocurrency": "cryptocurrency digital",
  "blog-fintech": "fintech financial technology",
  "blog-payments": "payment processing",
  "blog-security": "cybersecurity protection",
  "blog-cloud": "cloud computing infrastructure",
  "blog-ai": "artificial intelligence machine learning",

  // Industry keywords
  "industry-banking": "banking finance",
  "industry-crypto": "cryptocurrency blockchain",
  "industry-payments": "payment terminal",
  "industry-saas": "software development",
  "industry-healthcare": "healthcare medical",
  "industry-realestate": "real estate property",
  "industry-gaming": "gaming esports",
  "industry-ecommerce": "ecommerce shopping",

  // Service keywords
  "service-blockchain": "blockchain development",
  "service-smartcontract": "smart contract code",
  "service-defi": "decentralized finance",
  "service-payment": "payment gateway",
  "service-wallet": "crypto wallet",
  "service-compliance": "compliance audit",

  // Solution keywords
  "solution-mobile": "mobile app development",
  "solution-web": "web application development",
  "solution-ecommerce": "ecommerce platform",
  "solution-fintech": "fintech application",
  "solution-healthcare": "healthcare software",
  "solution-blockchain": "blockchain platform",

  // Country keywords
  "country-uk": "London England",
  "country-us": "United States America",
  "country-uae": "Dubai UAE",
  "country-india": "India technology",
  "country-singapore": "Singapore tech",
  "country-australia": "Australia business",
};

export async function getImageForPageType(
  pageType: string,
  title?: string
): Promise<{ url: string; alt: string } | null> {
  // Use specific keyword or fallback to generic
  const query = imageKeywords[pageType as keyof typeof imageKeywords] || title || pageType;

  const image = await getUnsplashImage({
    query,
    width: 1200,
    height: 630,
    orientation: "landscape",
  });

  if (image) {
    return {
      url: image.urls.regular,
      alt: image.alt_description || query,
    };
  }

  return null;
}

// Specific functions for different page types
export async function getBlogPostImage(title: string): Promise<{ url: string; alt: string } | null> {
  return getUnsplashImage({
    query: `${title} technology business`,
    width: 1200,
    height: 630,
    orientation: "landscape",
  }).then(img => img ? { url: img.urls.regular, alt: img.alt_description || title } : null);
}

export async function getCaseStudyImage(industry: string): Promise<{ url: string; alt: string } | null> {
  return getUnsplashImage({
    query: `${industry} success case study`,
    width: 1200,
    height: 800,
    orientation: "landscape",
  }).then(img => img ? { url: img.urls.regular, alt: img.alt_description || industry } : null);
}

export async function getIndustryImage(industry: string): Promise<{ url: string; alt: string } | null> {
  return getUnsplashImage({
    query: industry,
    width: 1200,
    height: 630,
    orientation: "landscape",
  }).then(img => img ? { url: img.urls.regular, alt: img.alt_description || industry } : null);
}

export async function getServiceImage(service: string): Promise<{ url: string; alt: string } | null> {
  return getUnsplashImage({
    query: `${service} development technology`,
    width: 1200,
    height: 630,
    orientation: "landscape",
  }).then(img => img ? { url: img.urls.regular, alt: img.alt_description || service } : null);
}
