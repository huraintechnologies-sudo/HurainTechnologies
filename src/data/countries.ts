import { CountryPage } from "@/lib/types";
import { countries as curatedCountries } from "./countries-curated";
import generatedCountriesRaw from "./countries.json";

const generatedCountries = generatedCountriesRaw as CountryPage[];

// Deduplicate: curated countries take precedence over generated ones
const countryMap = new Map<string, CountryPage>();

for (const country of generatedCountries) {
  countryMap.set(country.slug, country);
}

for (const country of curatedCountries) {
  countryMap.set(country.slug, country);
}

export const countries: CountryPage[] = Array.from(countryMap.values());

export function getCountryBySlug(slug: string): CountryPage | undefined {
  return countries.find((c) => c.slug === slug);
}
