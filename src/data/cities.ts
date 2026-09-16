import { CityContent } from "@/lib/types";
import { cities as curatedCities } from "./cities-curated";
import generatedCitiesRaw from "./cities.json";

const generatedCities = generatedCitiesRaw as CityContent[];

// Deduplicate: curated cities take precedence over generated ones
const cityMap = new Map<string, CityContent>();

for (const city of generatedCities) {
  cityMap.set(city.slug, city);
}

for (const city of curatedCities) {
  cityMap.set(city.slug, city);
}

export const cities: CityContent[] = Array.from(cityMap.values());

export function getCityBySlug(slug: string): CityContent | undefined {
  return cities.find((city) => city.slug === slug);
}
