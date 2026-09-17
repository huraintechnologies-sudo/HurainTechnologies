import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add compression headers (Next.js handles gzip automatically)
  // Add performance headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // Enable DNS prefetch for external resources
  response.headers.set('Link', '</api/contact>; rel=preconnect');
  response.headers.set('Link', '<https://images.unsplash.com>; rel=preconnect');

  // Add cache control for different routes
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.startsWith('/images/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=600');
  } else {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
