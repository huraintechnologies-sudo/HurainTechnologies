import { countries } from "@/data/countries";
import { CityContent, CountryPage } from "@/lib/types";
import { CityFacts, getCountryFacts } from "@/lib/geo-facts";
import { regionFor } from "@/data/market-profiles";

// Internal-linking helpers for location pages: sibling countries in the same
// region and clean city display names. Relevant, crawlable links between
// related pages are what gets deep programmatic pages discovered and indexed.

// Kept consistent with CountryLinksGrid's business exclusions.
const EXCLUDED = new Set(["pakistan", "israel", "china", "japan"]);

let regionIndex: Map<string, CountryPage[]> | null = null;

function regionOf(slug: string) {
  const f = getCountryFacts(slug);
  return regionFor(f?.code, f?.timezone);
}

export function sameRegionCountries(slug: string, limit = 12): CountryPage[] {
  if (!regionIndex) {
    regionIndex = new Map();
    for (const c of countries) {
      if (EXCLUDED.has(c.slug)) continue;
      const r = regionOf(c.slug);
      if (!regionIndex.has(r)) regionIndex.set(r, []);
      regionIndex.get(r)!.push(c);
    }
    for (const list of regionIndex.values()) {
      list.sort((a, b) => (getCountryFacts(b.slug)?.population || 0) - (getCountryFacts(a.slug)?.population || 0));
    }
  }
  return (regionIndex.get(regionOf(slug)) || []).filter((c) => c.slug !== slug).slice(0, limit);
}

// Generated city names sometimes carry artefacts like "Qacentina (constantine)";
// prefer the name Wikipedia resolved to.
export function cityDisplayName(city: Pick<CityContent, "cityName">, facts?: CityFacts): string {
  return facts?.name || city.cityName.replace(/\s*\(([^)]+)\)\s*$/, "");
}

// Same-region countries for world-coverage solutions: no exclusions, and
// includes countries that exist only in the world geography.
export function sameRegionWorldCountries(slug: string, all: { slug: string; countryName: string }[], limit = 12) {
  const r = regionOf(slug);
  return all
    .filter((c) => c.slug !== slug && regionOf(c.slug) === r)
    .sort((a, b) => (getCountryFacts(b.slug)?.population || 0) - (getCountryFacts(a.slug)?.population || 0))
    .slice(0, limit);
}
