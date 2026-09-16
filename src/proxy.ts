import { NextRequest, NextResponse } from "next/server";
import { COUNTRY_CODE_TO_SLUG, GEO_PREF_COOKIE } from "@/lib/geo";

// Crawlers/bots must always see the canonical global homepage, never a
// geo-redirected variant — redirecting Googlebot by perceived location is a
// well-documented way to tank indexing and risks being read as cloaking.
const BOT_UA_PATTERN =
  /bot|crawl|spider|slurp|googlebot|bingbot|duckduckbot|baiduspider|yandex|facebookexternalhit|linkedinbot|twitterbot|ahrefsbot|semrushbot|mj12bot|lighthouse|pagespeed|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-web|anthropic-ai|perplexitybot|ccbot|bytespider/i;

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname !== "/") {
    return NextResponse.next();
  }

  // Explicit opt-out: /?nogeo=1 permanently disables geo redirection for this visitor.
  if (searchParams.get("nogeo") === "1") {
    const response = NextResponse.next();
    response.cookies.set(GEO_PREF_COOKIE, "none", { maxAge: 60 * 60 * 24 * 365, path: "/" });
    return response;
  }

  if (request.cookies.get(GEO_PREF_COOKIE)) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") || "";
  if (BOT_UA_PATTERN.test(userAgent)) {
    return NextResponse.next();
  }

  // x-vercel-ip-country is set automatically on Vercel. On other hosts this
  // header will be absent unless your CDN/reverse proxy is configured to set
  // an equivalent geo header — the redirect simply no-ops if it's missing.
  const countryCode =
    request.headers.get("x-vercel-ip-country") || request.headers.get("x-geo-country");

  if (!countryCode) {
    return NextResponse.next();
  }

  const slug = COUNTRY_CODE_TO_SLUG[countryCode.toUpperCase()];
  if (!slug) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en-${countryCode.toLowerCase()}`;
  url.search = "";
  const response = NextResponse.redirect(url);
  response.cookies.set(GEO_PREF_COOKIE, slug, { maxAge: 60 * 60 * 24 * 30, path: "/" });
  return response;
}

export const config = {
  matcher: "/",
};
