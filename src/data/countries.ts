import { CountryPage } from "@/lib/types";
import { countries as curatedCountries } from "./countries-curated";
import generatedCountriesRaw from "./countries.json";

const generatedCountries = generatedCountriesRaw as CountryPage[];

// Curated entries that duplicate a generated country under a different slug.
// The generated slug is canonical (it owns the city pages and the /en-xx
// locale); curated content is merged into it and the alias slug 301-redirects
// (see next.config.ts) so Google never sees two copies of the same country.
export const COUNTRY_SLUG_ALIASES: Record<string, string> = {
  tanzania: "united-republic-of-tanzania",
  "hong-kong": "china-hong-kong-sar",
};

// Generator artefacts that are not countries.
const JUNK_SLUGS = new Set(["footnoteseqid"]);

// Deduplicate: curated countries take precedence over generated ones
const countryMap = new Map<string, CountryPage>();

for (const country of generatedCountries) {
  if (JUNK_SLUGS.has(country.slug)) continue;
  countryMap.set(country.slug, country);
}

for (const country of curatedCountries) {
  const slug = COUNTRY_SLUG_ALIASES[country.slug] ?? country.slug;
  countryMap.set(slug, { ...country, slug });
}

export const countries: CountryPage[] = Array.from(countryMap.values());

export function getCountryBySlug(slug: string): CountryPage | undefined {
  return countries.find((c) => c.slug === slug);
}

// Curated (priority) markets, resolved to canonical slugs — use this instead
// of importing countries-curated directly so links never hit an alias redirect.
export const priorityCountries: CountryPage[] = curatedCountries.map(
  (c) => countryMap.get(COUNTRY_SLUG_ALIASES[c.slug] ?? c.slug)!
);
