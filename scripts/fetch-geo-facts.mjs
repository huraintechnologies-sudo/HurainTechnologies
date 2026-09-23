// One-off data build: pulls verifiable facts and a real photo for every
// country and city page, so location pages stop being "same template, name
// swapped" and each one carries information that is actually about that place.
//
//   node scripts/fetch-geo-facts.mjs
//
// Sources (all free, no key):
//   - query.wikidata.org      capital, population, currency, languages (SPARQL)
//   - IANA tz zone.tab         nearest time zone to each capital / city
//   - en.wikipedia.org REST   short description, coordinates, lead photo
//   - wikidata.org            city population
// Photos are Wikimedia Commons files; pages credit them via `imageFile`.
// Output: src/data/geo-facts.json (committed; re-run only to refresh).

import fs from "node:fs";
import path from "node:path";
import { applyOverrides } from "./geo-overrides.mjs";
import { WORLD_EXTRA_COUNTRIES } from "./world-extra-countries.mjs";

// --incremental: keep everything already in geo-facts.json and only fetch
// places that are missing (e.g. after adding world cities).
const INCREMENTAL = process.argv.includes("--incremental");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const UA = "HurainTechnologiesSiteBuild/1.0 (https://www.huraintechnologies.com; huraintechnologies@gmail.com)";
const OUT = path.join(ROOT, "src/data/geo-facts.json");

const countries = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/countries.json"), "utf8"));
const cities = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/cities.json"), "utf8"));

// Curated TS files: pull slug/name pairs with a regex rather than a TS toolchain.
function scrapeTs(file, nameKey) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const out = [];
  const re = new RegExp(`slug:\\s*"([^"]+)",\\s*${nameKey}:\\s*"([^"]+)",(?:\\s*countrySlug:\\s*"([^"]+)")?`, "g");
  let m;
  while ((m = re.exec(src))) out.push({ slug: m[1], name: m[2], countrySlug: m[3] });
  return out;
}
const curatedCountries = [
  ...scrapeTs("src/data/countries-curated.ts", "countryName"),
  ...scrapeTs("src/data/countries-europe-americas.ts", "countryName"),
  ...scrapeTs("src/data/countries-mea-apac.ts", "countryName"),
];
const curatedCities = scrapeTs("src/data/cities-curated.ts", "cityName");

const geoSrc = fs.readFileSync(path.join(ROOT, "src/lib/geo.ts"), "utf8");
const slugToCode = {};
for (const m of geoSrc.matchAll(/^\s+([A-Z]{2}):\s*"([^"]+)"/gm)) slugToCode[m[2]] = m[1];
for (const [code, { slug }] of Object.entries(WORLD_EXTRA_COUNTRIES)) slugToCode[slug] = code;

const allCountries = new Map();
for (const c of countries) allCountries.set(c.slug, c.countryName);
for (const c of curatedCountries) allCountries.set(c.slug, c.name);
for (const { slug, name } of Object.values(WORLD_EXTRA_COUNTRIES)) allCountries.set(slug, name);
const allCities = new Map();
for (const c of cities) allCities.set(`${c.countrySlug}/${c.slug}`, { slug: c.slug, name: c.cityName, countrySlug: c.countrySlug });
for (const c of curatedCities) if (c.countrySlug) allCities.set(`${c.countrySlug}/${c.slug}`, { slug: c.slug, name: c.name, countrySlug: c.countrySlug });
// World cities (GeoNames) carry their own population / time zone / coordinates.
const worldCitiesPath = path.join(ROOT, "src/data/world-cities.json");
const worldCities = fs.existsSync(worldCitiesPath) ? JSON.parse(fs.readFileSync(worldCitiesPath, "utf8")) : [];
for (const c of worldCities) {
  const key = `${c.countrySlug}/${c.slug}`;
  if (!allCities.has(key)) allCities.set(key, { slug: c.slug, name: c.name, countrySlug: c.countrySlug, geonames: c });
}
const previous = INCREMENTAL && fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { countries: {}, cities: {} };

async function getJson(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (res.status === 404) return null;
      if (res.status === 429) { await new Promise((r) => setTimeout(r, 2000 * (i + 1))); continue; }
      if (!res.ok) throw new Error(`${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === tries - 1) { console.warn("fail", url, e.message); return null; }
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  return null;
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); }
  }));
  return out;
}

const BAD_IMAGE = /flag|map|locator|location|coat_of_arms|emblem|seal|logo|orthographic|svg|montage_of|collage|icon|blank/i;

function sizedImage(summary, width = 960) {
  const t = summary?.thumbnail?.source?.split("?")[0];
  const o = summary?.originalimage;
  if (!t || !o) return null;
  // Thumb URLs look like .../commons/thumb/b/be/File.jpg/330px-File.jpg
  const m = /\/commons\/thumb\/\w\/\w\w\/([^/]+)\/\d+px-[^/]+$/.exec(t);
  if (!m) return null;
  const file = decodeURIComponent(m[1]);
  if (BAD_IMAGE.test(file)) return null;
  if (!/\.(jpe?g|png|webp)$/i.test(file)) return null;
  // Wikimedia only serves fixed thumbnail steps; anything else returns 400.
  const w = [960, 500].find((s) => s <= Math.min(width, o.width));
  if (!w) return null;
  const src = t.replace("thumb.wikimedia.org", "upload.wikimedia.org").replace(/\/\d+px-/, `/${w}px-`);
  return { image: src, imageWidth: w, imageHeight: Math.round((o.height / o.width) * w), imageFile: file };
}

const wiki = (title) => getJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}?redirect=true`);

function looksLikePlace(s, countryName) {
  if (!s || s.type !== "standard") return false;
  const text = `${s.description || ""} ${s.extract || ""}`.toLowerCase();
  return text.includes(countryName.toLowerCase().split(",")[0]) || /city|town|capital|municipality|commune|metropol|port|district|province|county|village|region/.test(text);
}

// Cleans generator artefacts like "Qacentina (constantine)" -> tries both.
function nameCandidates(name) {
  const m = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(name);
  const title = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
  return m ? [title(m[2]), m[1]] : [name];
}

async function main() {
  console.log("countries:", allCountries.size, "cities:", allCities.size);

  // Country facts in one SPARQL round trip, keyed by ISO alpha-2.
  const sparql = `SELECT ?code ?capitalLabel ?capCoord ?pop ?curCode ?curLabel (GROUP_CONCAT(DISTINCT ?langLabel; separator="|") AS ?langs) ?calling ?tld WHERE {
    ?c wdt:P297 ?code .
    OPTIONAL { ?c wdt:P36 ?capital . ?capital rdfs:label ?capitalLabel FILTER(lang(?capitalLabel)="en") OPTIONAL { ?capital wdt:P625 ?capCoord } }
    OPTIONAL { ?c p:P1082 ?ps . ?ps ps:P1082 ?pop . ?ps wikibase:rank wikibase:PreferredRank }
    OPTIONAL { ?c wdt:P38 ?cur . ?cur wdt:P498 ?curCode . ?cur rdfs:label ?curLabel FILTER(lang(?curLabel)="en") }
    OPTIONAL { ?c wdt:P37 ?lang . ?lang rdfs:label ?langLabel FILTER(lang(?langLabel)="en") }
    OPTIONAL { ?c wdt:P474 ?calling }
    OPTIONAL { ?c wdt:P78 ?t . ?t rdfs:label ?tld FILTER(lang(?tld)="en") }
  } GROUP BY ?code ?capitalLabel ?capCoord ?pop ?curCode ?curLabel ?calling ?tld`;
  const wd = await getJson(`https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(sparql)}`);
  const byCode = new Map();
  for (const b of wd?.results?.bindings || []) {
    const v = Object.fromEntries(Object.entries(b).map(([k, x]) => [k, x.value]));
    if (!byCode.has(v.code)) byCode.set(v.code, v); // first row wins; later rows are extra currencies/capitals
  }
  console.log("wikidata countries:", byCode.size);

  // IANA zone.tab: country -> [{zone, lat, lon}], so each place gets the zone nearest to it.
  const zoneTab = await (await fetch("https://raw.githubusercontent.com/eggert/tz/main/zone.tab")).text();
  const zones = {};
  const dms = (s, degLen) => { const sign = s[0] === "-" ? -1 : 1; const d = s.slice(1); return sign * (Number(d.slice(0, degLen)) + Number(d.slice(degLen, degLen + 2)) / 60); };
  for (const line of zoneTab.split("\n")) {
    if (!line || line.startsWith("#")) continue;
    const [cc, coord, zone] = line.split("\t");
    const m = /^([+-]\d+)([+-]\d+)$/.exec(coord);
    (zones[cc] ||= []).push({ zone, lat: dms(m[1], 2), lon: dms(m[2], 3) });
  }
  const nearestZone = (cc, lat, lon) => {
    const list = zones[cc];
    if (!list) return null;
    if (lat == null || list.length === 1) return list[0].zone;
    return list.reduce((a, b) => ((a.lat - lat) ** 2 + (a.lon - lon) ** 2 <= (b.lat - lat) ** 2 + (b.lon - lon) ** 2 ? a : b)).zone;
  };

  const countryOut = {};
  await pool([...allCountries.entries()], 8, async ([slug, name]) => {
    if (previous.countries[slug]) { countryOut[slug] = previous.countries[slug]; return; }
    const code = slugToCode[slug] || null;
    const r = code ? byCode.get(code) : null;
    const capital = r?.capitalLabel;
    const capCoord = /Point\(([-\d.]+) ([-\d.]+)\)/.exec(r?.capCoord || "");
    const [countrySum, capitalSum] = await Promise.all([wiki(name), capital ? wiki(`${capital}, ${name}`).then((s) => (s?.type === "standard" ? s : wiki(capital))) : null]);
    const img = sizedImage(capitalSum) || sizedImage(countrySum);
    countryOut[slug] = {
      code,
      name,
      capital: capital || null,
      population: r?.pop ? Math.round(Number(r.pop)) : null,
      currency: r?.curCode ? { code: r.curCode, name: r.curLabel } : null,
      languages: r?.langs ? r.langs.split("|").filter((l) => !/sign language/i.test(l)).slice(0, 4) : [],
      timezone: code ? nearestZone(code, capCoord ? Number(capCoord[2]) : null, capCoord ? Number(capCoord[1]) : null) : null,
      callingCode: r?.calling ? `+${r.calling.replace(/^\+/, "")}` : null,
      tld: r?.tld || null,
      description: countrySum?.description || null,
      wiki: countrySum?.content_urls?.desktop?.page || null,
      imageCaption: img ? (capitalSum && sizedImage(capitalSum) ? capital : name) : null,
      ...(img || {}),
    };
  });
  for (const c of Object.values(countryOut)) applyOverrides(c);
  console.log("countries done");

  const cityList = [...allCities.values()];
  const cityOut = {};
  await pool(cityList, 10, async (c) => {
    const key = `${c.countrySlug}/${c.slug}`;
    if (previous.cities[key]) { cityOut[key] = previous.cities[key]; return; }
    const countryName = allCountries.get(c.countrySlug) || "";
    let sum = null;
    let displayName = c.name;
    for (const cand of nameCandidates(c.name)) {
      for (const t of [`${cand}, ${countryName}`, cand]) {
        const s = await wiki(t);
        if (looksLikePlace(s, countryName)) { sum = s; displayName = cand; break; }
      }
      if (sum) break;
    }
    cityOut[`${c.countrySlug}/${c.slug}`] = {
      name: displayName,
      description: sum?.description || null,
      lat: sum?.coordinates?.lat ?? null,
      lon: sum?.coordinates?.lon ?? null,
      wikidata: sum?.wikibase_item || null,
      wiki: sum?.content_urls?.desktop?.page || null,
      population: null,
      timezone: nearestZone(countryOut[c.countrySlug]?.code, sum?.coordinates?.lat, sum?.coordinates?.lon) || countryOut[c.countrySlug]?.timezone || null,
      ...(sizedImage(sum) || {}),
    };
    if (c.geonames) {
      // GeoNames is authoritative for world cities; Wikipedia only adds the description and photo.
      Object.assign(cityOut[key], { name: c.geonames.name, lat: c.geonames.lat, lon: c.geonames.lon, timezone: c.geonames.timezone, population: c.geonames.population, source: "geonames" });
    }
  });
  console.log("cities summaries done");

  // Wikidata populations, 50 ids per request.
  const ids = Object.values(cityOut).filter((c) => !c.population).map((c) => c.wikidata).filter(Boolean);
  const pop = {};
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const data = await getJson(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${batch.join("|")}&props=claims&format=json`);
    for (const [id, ent] of Object.entries(data?.entities || {})) {
      const claims = ent.claims?.P1082 || [];
      const best = claims.find((x) => x.rank === "preferred") || claims[claims.length - 1];
      const amount = best?.mainsnak?.datavalue?.value?.amount;
      if (amount) pop[id] = Math.round(Number(amount));
    }
  }
  for (const c of Object.values(cityOut)) if (c.wikidata && pop[c.wikidata]) c.population = pop[c.wikidata];

  fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), countries: countryOut, cities: cityOut }));
  const withImg = Object.values(cityOut).filter((c) => c.image).length;
  const cImg = Object.values(countryOut).filter((c) => c.image).length;
  console.log(`wrote ${OUT}: countries ${Object.keys(countryOut).length} (${cImg} photos), cities ${cityList.length} (${withImg} photos, ${Object.keys(pop).length} populations)`);
}

main();
