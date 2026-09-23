import geoFacts from "@/data/geo-facts.json";
import { marketProfileFor, regionLabels, MarketProfile } from "@/data/market-profiles";

// Typed access to src/data/geo-facts.json (built by scripts/fetch-geo-facts.mjs)
// plus derived signals — UTC offsets and time difference with our team in
// India — computed with Intl so daylight-saving time is always correct.

export interface PlacePhoto {
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageFile: string;
}

export interface CountryFacts extends Partial<PlacePhoto> {
  code: string | null;
  name: string;
  capital: string | null;
  population: number | null;
  currency: { code: string; name: string } | null;
  languages: string[];
  timezone: string | null;
  callingCode: string | null;
  tld: string | null;
  description: string | null;
  wiki: string | null;
  imageCaption?: string | null;
}

export interface CityFacts extends Partial<PlacePhoto> {
  name: string;
  description: string | null;
  lat: number | null;
  lon: number | null;
  wikidata: string | null;
  wiki: string | null;
  population: number | null;
  timezone: string | null;
}

const data = geoFacts as unknown as {
  generatedAt: string;
  countries: Record<string, CountryFacts>;
  cities: Record<string, CityFacts>;
};

export const GEO_FACTS_DATE = data.generatedAt;
const TEAM_TZ = "Asia/Kolkata";

export function getCountryFacts(slug: string): CountryFacts | undefined {
  return data.countries[slug];
}

export function getCityFacts(countrySlug: string, citySlug: string): CityFacts | undefined {
  return data.cities[`${countrySlug}/${citySlug}`];
}

/** Minutes east of UTC for an IANA zone, right now. */
export function utcOffsetMinutes(timeZone: string, at = new Date()): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(at);
    const name = parts.find((p) => p.type === "timeZoneName")?.value || "GMT";
    const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(name);
    if (!m) return 0;
    return (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] || 0));
  } catch {
    return 0;
  }
}

export function formatUtcOffset(minutes: number): string {
  const sign = minutes < 0 ? "−" : "+";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""}`;
}

// Time-zone facts for a place, relative to our team in India. Support is
// 24/7, so there is no "overlap window" — every local business hour is covered.
export interface Overlap {
  zone: string;
  offsetLabel: string; // "UTC+3"
  diffLabel: string; // "India (IST) is 2h 30m ahead"
}

export function overlapWithTeam(timeZone: string | null | undefined): Overlap | null {
  if (!timeZone) return null;
  const client = utcOffsetMinutes(timeZone);
  const diff = utcOffsetMinutes(TEAM_TZ) - client; // minutes India is ahead of client
  const abs = Math.abs(diff);
  const span = `${Math.floor(abs / 60)}h${abs % 60 ? ` ${abs % 60}m` : ""}`;
  const diffLabel = diff === 0 ? "same time as India (IST)" : diff > 0 ? `India (IST) is ${span} ahead` : `India (IST) is ${span} behind`;
  return { zone: timeZone, offsetLabel: formatUtcOffset(client), diffLabel };
}

export function formatPopulation(n: number | null | undefined): string | null {
  if (!n) return null;
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} billion`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)} million`;
  if (n >= 1e3) return `${Math.round(n / 1e3).toLocaleString("en-US")},000`;
  return n.toLocaleString("en-US");
}

export function commonsFileUrl(file: string): string {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;
}

export interface LocationContext {
  country: CountryFacts | undefined;
  city?: CityFacts;
  market: MarketProfile & { region: keyof typeof regionLabels };
  regionLabel: string;
  overlap: Overlap | null;
}

export function locationContext(countrySlug: string, citySlug?: string): LocationContext {
  const country = getCountryFacts(countrySlug);
  const city = citySlug ? getCityFacts(countrySlug, citySlug) : undefined;
  const tz = city?.timezone || country?.timezone || null;
  const market = marketProfileFor(country?.code, country?.timezone || tz);
  return { country, city, market, regionLabel: regionLabels[market.region], overlap: overlapWithTeam(tz) };
}
