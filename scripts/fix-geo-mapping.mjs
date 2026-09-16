import fs from "fs/promises";
import path from "path";

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'NodeJS/18' } });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

async function run() {
  const dataDir = path.join(process.cwd(), "src", "data");
  
  // 1. Remove '13' from countries and cities
  const countriesData = JSON.parse(await fs.readFile(path.join(dataDir, "countries.json"), "utf8"));
  const citiesData = JSON.parse(await fs.readFile(path.join(dataDir, "cities.json"), "utf8"));
  
  const filteredCountries = countriesData.filter(c => c.countryName !== "13");
  const filteredCities = citiesData.filter(c => c.countrySlug !== "13");
  
  await fs.writeFile(path.join(dataDir, "countries.json"), JSON.stringify(filteredCountries, null, 2));
  await fs.writeFile(path.join(dataDir, "cities.json"), JSON.stringify(filteredCities, null, 2));
  
  console.log(`Cleaned up '13'. Countries: ${filteredCountries.length}, Cities: ${filteredCities.length}`);
  
  // 2. Fetch ISO codes
  console.log("Fetching ISO codes...");
  const isoRes = await fetchJson("https://countriesnow.space/api/v0.1/countries/iso");
  const isoData = isoRes.data;
  
  const nameToIso = {};
  for (const item of isoData) {
    nameToIso[item.name.toLowerCase()] = item.Iso2;
  }
  
  // Also manually map some common variations
  nameToIso["åland islands"] = "AX";
  nameToIso["united kingdom"] = "GB";
  nameToIso["united kingdom of great britain and northern ireland"] = "GB";
  nameToIso["united states"] = "US";
  nameToIso["united states of america"] = "US";
  nameToIso["american samoa"] = "AS";
  nameToIso["bolivia (plurinational state of)"] = "BO";
  nameToIso["british virgin islands"] = "VG";
  nameToIso["brunei darussalam"] = "BN";
  nameToIso["cabo verde"] = "CV";
  nameToIso["china, hong kong sar"] = "HK";
  nameToIso["china, macao sar"] = "MO";
  nameToIso["côte d'ivoire"] = "CI";
  nameToIso["democratic people's republic of korea"] = "KP";
  nameToIso["faeroe islands"] = "FO";
  nameToIso["falkland islands (malvinas)"] = "FK";
  nameToIso["french guiana"] = "GF";
  nameToIso["holy see"] = "VA";
  nameToIso["iran (islamic republic of)"] = "IR";
  nameToIso["lao people's democratic republic"] = "LA";
  nameToIso["micronesia (federated states of)"] = "FM";
  nameToIso["republic of korea"] = "KR";
  nameToIso["republic of moldova"] = "MD";
  nameToIso["republic of south sudan"] = "SS";
  nameToIso["russian federation"] = "RU";
  nameToIso["saint helena ex. dep."] = "SH";
  nameToIso["state of palestine"] = "PS";
  nameToIso["tfyr of macedonia"] = "MK";
  nameToIso["united republic of tanzania"] = "TZ";
  nameToIso["united states virgin islands"] = "VI";
  nameToIso["venezuela (bolivarian republic of)"] = "VE";
  nameToIso["wallis and futuna islands"] = "WF";
  
  // 3. Rebuild COUNTRY_CODE_TO_SLUG for geo.ts
  const newMapping = {};
  
  for (const country of filteredCountries) {
    let iso = nameToIso[country.countryName.toLowerCase()];
    if (iso) {
      newMapping[iso.toUpperCase()] = country.slug;
    } else {
      console.warn("Could not find ISO for:", country.countryName);
    }
  }
  
  // Read existing geo.ts and replace the mapping
  const geoPath = path.join(process.cwd(), "src", "lib", "geo.ts");
  let geoContent = await fs.readFile(geoPath, "utf8");
  
  const mappingStr = "export const COUNTRY_CODE_TO_SLUG: Record<string, string> = {\n" +
    Object.entries(newMapping)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([code, slug]) => `  ${code}: "${slug}",`)
      .join("\n") +
    "\n};";
    
  geoContent = geoContent.replace(/export const COUNTRY_CODE_TO_SLUG: Record<string, string> = {[\s\S]*?};/, mappingStr);
  
  await fs.writeFile(geoPath, geoContent);
  console.log("Successfully updated geo.ts with massive ISO mapping!");
}

run().catch(console.error);
