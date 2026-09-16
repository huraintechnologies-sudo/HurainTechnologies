import fs from "fs/promises";
import path from "path";
import https from "https";

// We'll map ISO2 country codes to our existing country slugs
const countrySlugMap = {
  GB: "united-kingdom",
  MT: "malta",
  DE: "germany",
  NL: "netherlands",
  CA: "canada",
  US: "united-states",
  AU: "australia",
  SG: "singapore",
  IN: "india",
  AE: "uae",
  SA: "saudi-arabia",
  ZA: "south-africa",
  NG: "nigeria",
  KE: "kenya",
  GH: "ghana",
  PH: "philippines",
  ID: "indonesia",
  CW: "curacao",
  CY: "cyprus",
  EE: "estonia",
  IM: "isle-of-man",
  GI: "gibraltar",
  MU: "mauritius",
  FR: "france",
  CH: "switzerland",
  BR: "brazil",
  EG: "egypt",
  KR: "south-korea",
  // Add more mappings if needed
};

// Fetch cities from a public repo
function fetchCities() {
  return new Promise((resolve, reject) => {
    https.get("https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json", (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

function generateSeoText(cityName, countryName) {
  return {
    metaTitle: `Blockchain, Payments & AI Software Development Company in ${cityName}`,
    metaDescription: `High-demand enterprise blockchain, payments, API, and AI software development for ${cityName}-based fintechs and startups.`,
    h1: `Blockchain, Payments & Fintech Development Company in ${cityName}`,
    intro: `${cityName} is a rapidly growing hub for digital innovation. Hurain Technologies builds payment, blockchain, and AI infrastructure for ${cityName}-based fintechs, enterprises, and startups operating locally and globally.`,
    hubFacts: [
      `${cityName} represents a major demand center for secure, scalable financial technology infrastructure.`,
      `Local fintechs and enterprises in ${cityName} require high-throughput payment gateways and advanced AI fraud detection.`,
      `We support ${cityName}-based teams with dedicated engineering aligned to global compliance and architecture standards.`,
    ],
    focusServiceSlugs: ["payment-gateway-integration", "api-integration-services", "blockchain-cryptocurrency-development"],
    faqs: [
      {
        question: `Do you work with fintech startups in ${cityName}?`,
        answer: `Yes, we provide dedicated engineering teams and end-to-end platform builds for fintechs in ${cityName} and surrounding regions.`
      },
      {
        question: `Can you integrate local payment rails for ${cityName} users?`,
        answer: `We specialize in integrating local and cross-border payment rails alongside unified payment orchestration for markets including ${cityName}.`
      }
    ]
  };
}

async function run() {
  console.log("Fetching global cities dataset...");
  const allCities = await fetchCities();
  console.log(`Fetched ${allCities.length} cities.`);

  const supportedCodes = Object.keys(countrySlugMap);
  const filteredCities = allCities.filter(c => supportedCodes.includes(c.country));
  
  console.log(`Found ${filteredCities.length} cities in our supported countries.`);
  
  // Sort by population or just take first 1000 (the dataset might not have population, 
  // so we'll just take a sample of the largest ones or limit to 1000)
  // Let's just limit to 1000 to keep the bundle size reasonable
  const selectedCities = filteredCities.slice(0, 1000);

  const generatedCities = selectedCities.map(city => {
    const countrySlug = countrySlugMap[city.country];
    const slug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    // Some basic SEO template generation
    const seo = generateSeoText(city.name, city.country);

    return {
      slug,
      cityName: city.name,
      countrySlug,
      ...seo
    };
  });

  // Deduplicate by slug
  const uniqueCitiesMap = new Map();
  for (const c of generatedCities) {
    if (!uniqueCitiesMap.has(c.slug)) {
      uniqueCitiesMap.set(c.slug, c);
    }
  }
  
  const finalCities = Array.from(uniqueCitiesMap.values());

  const outputPath = path.join(process.cwd(), "src", "data", "cities.json");
  await fs.writeFile(outputPath, JSON.stringify(finalCities, null, 2));
  
  console.log(`Successfully generated ${finalCities.length} unique cities in src/data/cities.json`);
}

run().catch(console.error);
