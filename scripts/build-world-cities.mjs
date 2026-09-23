// Builds src/data/world-cities.json: 500 high-demand business cities
// worldwide, used by solutions that serve every market (e.g. Remote DBA
// Services). Unlike src/data/cities.json it covers every country, including
// ones excluded from the rest of the site.
//
//   1. Download https://download.geonames.org/export/dump/cities15000.zip
//   2. node scripts/build-world-cities.mjs path/to/cities15000.txt
//   3. node scripts/fetch-geo-facts.mjs   (adds photos + facts for them)
//
// Selection: every national capital with 100k+ people, then the largest
// remaining cities by population, capped per country so the list spreads
// across markets instead of being dominated by a few very large countries.

import fs from "node:fs";
import path from "node:path";
import { WORLD_EXTRA_COUNTRIES } from "./world-extra-countries.mjs";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const src = process.argv[2];
if (!src) throw new Error("usage: node scripts/build-world-cities.mjs cities15000.txt");

const TARGET = 500;
const PER_COUNTRY_CAP = 12;

// Business and tech hubs that must be present regardless of population rank
// (buyers of outsourced engineering concentrate here). name|ISO code.
const HUBS = `San Francisco|US,Seattle|US,Boston|US,Austin|US,Miami|US,Atlanta|US,Denver|US,San Jose|US,New York City|US,Toronto|CA,Vancouver|CA,Montréal|CA,London|GB,Manchester|GB,Edinburgh|GB,Dublin|IE,Paris|FR,Berlin|DE,Munich|DE,Frankfurt am Main|DE,Hamburg|DE,Amsterdam|NL,Rotterdam|NL,Brussels|BE,Zürich|CH,Geneva|CH,Vienna|AT,Stockholm|SE,Copenhagen|DK,Oslo|NO,Helsinki|FI,Tallinn|EE,Vilnius|LT,Warsaw|PL,Kraków|PL,Prague|CZ,Budapest|HU,Bucharest|RO,Madrid|ES,Barcelona|ES,Lisbon|PT,Milan|IT,Rome|IT,Athens|GR,Valletta|MT,Nicosia|CY,Luxembourg|LU,Tel Aviv|IL,Dubai|AE,Abu Dhabi|AE,Doha|QA,Riyadh|SA,Jeddah|SA,Kuwait City|KW,Manama|BH,Muscat|OM,Cairo|EG,Casablanca|MA,Nairobi|KE,Lagos|NG,Accra|GH,Kigali|RW,Johannesburg|ZA,Cape Town|ZA,Dar es Salaam|TZ,Kampala|UG,Addis Ababa|ET,Singapore|SG,Hong Kong|HK,Tokyo|JP,Osaka|JP,Seoul|KR,Taipei|TW,Shanghai|CN,Beijing|CN,Shenzhen|CN,Hangzhou|CN,Bengaluru|IN,Mumbai|IN,Hyderabad|IN,Pune|IN,Chennai|IN,Delhi|IN,Gurugram|IN,Noida|IN,Ahmedabad|IN,Karachi|PK,Lahore|PK,Islamabad|PK,Dhaka|BD,Colombo|LK,Kathmandu|NP,Kuala Lumpur|MY,Bangkok|TH,Jakarta|ID,Manila|PH,Ho Chi Minh City|VN,Hanoi|VN,Sydney|AU,Melbourne|AU,Brisbane|AU,Auckland|NZ,Mexico City|MX,Guadalajara|MX,São Paulo|BR,Rio de Janeiro|BR,Buenos Aires|AR,Bogotá|CO,Medellín|CO,Santiago|CL,Lima|PE,Montevideo|UY,Panama City|PA,San José|CR,Istanbul|TR,Ankara|TR,Kyiv|UA,Tbilisi|GE,Almaty|KZ,Baku|AZ`.split(",").map((x) => x.split("|"));

// NYC boroughs and similar city subdivisions that GeoNames lists separately.
const SUBDIVISIONS = new Set(["Brooklyn", "Queens", "Manhattan", "The Bronx", "Staten Island", "New Delhi"]);

const geoSrc = fs.readFileSync(path.join(ROOT, "src/lib/geo.ts"), "utf8");
const codeToSlug = {};
for (const m of geoSrc.matchAll(/^\s+([A-Z]{2}):\s*"([^"]+)"/gm)) codeToSlug[m[1]] = m[2];
// Countries that exist only for world-coverage solutions (see src/data/world-geo.ts).
for (const [code, { slug }] of Object.entries(WORLD_EXTRA_COUNTRIES)) codeToSlug[code] = slug;

const slugify = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const rows = fs
  .readFileSync(src, "utf8")
  .split("\n")
  .filter(Boolean)
  .map((l) => l.split("\t"))
  .map((f) => ({
    name: f[1],
    ascii: f[2],
    lat: Number(f[4]),
    lon: Number(f[5]),
    featureCode: f[7],
    code: f[8],
    population: Number(f[14]),
    timezone: f[17],
  }))
  .filter((r) => codeToSlug[r.code] && r.population > 0)
  // Skip city districts / sections that GeoNames lists alongside the city.
  .filter((r) => !["PPLX", "PPLH", "PPLQ", "PPLW"].includes(r.featureCode))
  .filter((r) => !SUBDIVISIONS.has(r.name))
  .sort((a, b) => b.population - a.population);

const picked = [];
const perCountry = {};
const seen = new Set();
const take = (r) => {
  const countrySlug = codeToSlug[r.code];
  let slug = slugify(r.ascii || r.name);
  if (!slug) return;
  const key = `${countrySlug}/${slug}`;
  if (seen.has(key)) return;
  seen.add(key);
  perCountry[r.code] = (perCountry[r.code] || 0) + 1;
  picked.push({ slug, name: r.name, countrySlug, countryCode: r.code, population: r.population, lat: r.lat, lon: r.lon, timezone: r.timezone });
};

for (const [name, code] of HUBS) {
  const r = rows.find((x) => x.code === code && (x.name === name || x.ascii === name));
  if (r) take(r);
  else console.warn("hub not found:", name, code);
}
for (const r of rows) if (r.featureCode === "PPLC" && r.population >= 100000) take(r);
for (const r of rows) {
  if (picked.length >= TARGET) break;
  if ((perCountry[r.code] || 0) >= PER_COUNTRY_CAP) continue;
  take(r);
}

picked.sort((a, b) => b.population - a.population);
fs.writeFileSync(path.join(ROOT, "src/data/world-cities.json"), JSON.stringify(picked));
console.log(`wrote ${picked.length} cities across ${Object.keys(perCountry).length} countries`);
console.log(picked.slice(0, 15).map((c) => `${c.name} (${c.countryCode})`).join(", "));
