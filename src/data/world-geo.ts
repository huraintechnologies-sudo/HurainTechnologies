import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import worldCitiesRaw from "@/data/world-cities.json";
import { getCountryFacts } from "@/lib/geo-facts";

// Geography for "world coverage" solutions (currently Remote DBA Services):
// every country — including markets excluded elsewhere on the site — and a
// curated list of 500 high-demand business cities built from GeoNames by
// scripts/build-world-cities.mjs. Other solutions keep using the regular
// countries/cities datasets.

export const WORLD_SOLUTIONS = new Set(["remote-dba-services"]);

export function isWorldSolution(slug: string): boolean {
  return WORLD_SOLUTIONS.has(slug);
}

// Mirrors scripts/world-extra-countries.mjs (countries not in src/lib/geo.ts).
const EXTRA_COUNTRIES: Record<string, string> = {
  china: "China",
  japan: "Japan",
  pakistan: "Pakistan",
  israel: "Israel",
  taiwan: "Taiwan",
  "democratic-republic-of-the-congo": "DR Congo",
  angola: "Angola",
  ethiopia: "Ethiopia",
  sudan: "Sudan",
  syria: "Syria",
  afghanistan: "Afghanistan",
  mali: "Mali",
  tunisia: "Tunisia",
  somalia: "Somalia",
  libya: "Libya",
  haiti: "Haiti",
  cambodia: "Cambodia",
  benin: "Benin",
  togo: "Togo",
  kosovo: "Kosovo",
  djibouti: "Djibouti",
  belize: "Belize",
};

export interface WorldCountry {
  slug: string;
  countryName: string;
}

export interface WorldCity {
  slug: string;
  cityName: string;
  countrySlug: string;
  population: number;
}

const siteCountrySlugs = new Set(countries.map((c) => c.slug));

export const worldCountries: WorldCountry[] = [
  ...countries.map((c) => ({ slug: c.slug, countryName: c.countryName })),
  ...Object.entries(EXTRA_COUNTRIES)
    .filter(([slug]) => !siteCountrySlugs.has(slug))
    .map(([slug, countryName]) => ({ slug, countryName })),
].sort((a, b) => a.countryName.localeCompare(b.countryName));

export const worldCities: WorldCity[] = (worldCitiesRaw as { slug: string; name: string; countrySlug: string; population: number }[]).map((c) => ({
  slug: c.slug,
  cityName: c.name,
  countrySlug: c.countrySlug,
  population: c.population,
}));

export function getWorldCountry(slug: string): WorldCountry | undefined {
  return worldCountries.find((c) => c.slug === slug);
}

export function getWorldCity(countrySlug: string, citySlug: string): WorldCity | undefined {
  return worldCities.find((c) => c.countrySlug === countrySlug && c.slug === citySlug);
}

// Country / city lookups that respect the solution's geography.
export function countryForSolution(solution: string, slug: string): WorldCountry | undefined {
  if (isWorldSolution(solution)) return getWorldCountry(slug);
  const c = countries.find((x) => x.slug === slug);
  return c ? { slug: c.slug, countryName: c.countryName } : undefined;
}

export function cityForSolution(solution: string, countrySlug: string, citySlug: string): { slug: string; cityName: string; countrySlug: string } | undefined {
  if (isWorldSolution(solution)) return getWorldCity(countrySlug, citySlug);
  return cities.find((c) => c.slug === citySlug && c.countrySlug === countrySlug);
}

export function citiesForSolution(solution: string, countrySlug: string): { slug: string; cityName: string; countrySlug: string }[] {
  return isWorldSolution(solution) ? worldCities.filter((c) => c.countrySlug === countrySlug) : cities.filter((c) => c.countrySlug === countrySlug);
}

// Countries in the same region, for world solutions (no exclusions).
export function worldCountriesByPopulation(): WorldCountry[] {
  return [...worldCountries].sort((a, b) => (getCountryFacts(b.slug)?.population || 0) - (getCountryFacts(a.slug)?.population || 0));
}
