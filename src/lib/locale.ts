import { COUNTRY_CODE_TO_SLUG } from "@/lib/geo";

// Reverse of COUNTRY_CODE_TO_SLUG: country slug -> ISO 3166-1 alpha-2 code.
const SLUG_TO_COUNTRY_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_CODE_TO_SLUG).map(([code, slug]) => [slug, code])
);

/** e.g. "united-kingdom" -> "en-gb" */
export function localeForCountrySlug(slug: string): string | undefined {
  const code = SLUG_TO_COUNTRY_CODE[slug];
  return code ? `en-${code.toLowerCase()}` : undefined;
}

/** e.g. "en-gb" -> "united-kingdom" */
export function countrySlugForLocale(locale: string): string | undefined {
  const match = /^en-([a-z]{2})$/i.exec(locale);
  if (!match) return undefined;
  return COUNTRY_CODE_TO_SLUG[match[1].toUpperCase()];
}

export function allLocales(): string[] {
  return Object.keys(COUNTRY_CODE_TO_SLUG).map((code) => `en-${code.toLowerCase()}`);
}
