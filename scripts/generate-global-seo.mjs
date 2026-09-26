import fs from "fs/promises";
import path from "path";

// Transliterate accents ("München" -> "munchen") instead of dropping them ("m-nchen").
const slugify = (s) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const EXCLUDED_COUNTRIES = ["Pakistan", "Israel", "China", "Japan"];

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'NodeJS/18' } });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json();
}

function generateCountrySeo(countryName) {
  const h1 = `Blockchain, Payments & Fintech Software Development in ${countryName}`;
  return {
    metaTitle: `${h1} | Hurain Technologies`,
    metaDescription: `Enterprise-grade blockchain, payments, and API software development for businesses operating in ${countryName}. Aligning technical infrastructure with compliance frameworks.`,
    h1,
    intro: `${countryName} represents a rapidly evolving ecosystem for digital finance and technological infrastructure. Local and international enterprises operating in ${countryName} require sophisticated, compliant engineering. Hurain Technologies provides specialized development for payment gateways, blockchain networks, and AI-driven platforms, ensuring your infrastructure is built to scale within ${countryName}'s market.`,
    regulatoryNotes: [
      `Firms operating in ${countryName} must align their digital infrastructure with national data protection and financial security standards.`,
      `Payment processors and fintech applications require robust Anti-Money Laundering (AML) and Know Your Customer (KYC) technical integrations tailored for the market.`,
      `Blockchain and crypto-asset platforms should be engineered with flexibility to adapt to evolving digital asset regulations in ${countryName}.`
    ],
    marketDrivers: [
      `Accelerated consumer adoption of digital and mobile-first payment methods across ${countryName}.`,
      `Increasing institutional demand for tokenization and enterprise blockchain solutions.`,
      `Stricter compliance and cybersecurity mandates driving the modernization of legacy financial systems.`
    ],
    detailedAnalysis: [
      {
        heading: `The Digital Evolution of ${countryName}`,
        paragraphs: [
          `The digital economy in ${countryName} is undergoing a massive transformation, driven by both private sector innovation and public sector initiatives. As businesses move away from legacy infrastructure, the demand for high-throughput, secure, and scalable software architecture has never been higher.`,
          `Hurain Technologies partners with enterprises in ${countryName} to architect these next-generation systems. Whether it's building a unified API gateway that aggregates fragmented local payment methods or deploying a proprietary blockchain consortium, our engineering teams bring deep technical expertise to the local market.`
        ]
      },
      {
        heading: `Technical Infrastructure for the Market`,
        paragraphs: [
          `Building for ${countryName} requires more than just writing code; it requires a deep understanding of the structural challenges. This includes handling localized latency, ensuring redundancy across regional cloud providers, and implementing data localization techniques to satisfy national regulators.`,
          `Our approach focuses on cloud-native modernization, utilizing microservices architecture to ensure that your financial applications remain highly available and fault-tolerant, even under extreme load conditions typical of high-growth markets like ${countryName}.`
        ]
      }
    ],
    faqs: [
      { question: `Do you build custom payment gateways for ${countryName}?`, answer: `Yes, we engineer custom payment orchestration layers and gateways designed to integrate seamlessly with the banking infrastructure and alternative payment methods prevalent in ${countryName}.` },
      { question: `Can you assist with blockchain architecture in ${countryName}?`, answer: `Absolutely. We specialize in both public and permissioned blockchain networks, smart contract auditing, and institutional custody solutions tailored for enterprises in ${countryName}.` },
      { question: `How do you handle data compliance for ${countryName}?`, answer: `We implement strict data localization, end-to-end encryption, and role-based access controls to ensure your application meets the specific cybersecurity and data privacy regulations of ${countryName}.` }
    ],
    focusServiceSlugs: ["payment-gateway-integration", "api-integration-services", "blockchain-cryptocurrency-development", "cybersecurity-compliance"]
  };
}

function generateCitySeo(cityName, countryName) {
  // Fix Title case for city
  const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();

  const h1 = `Blockchain & Fintech Development Company in ${formattedCityName}, ${countryName}`;
  return {
    metaTitle: `${h1}`,
    metaDescription: `Top-tier blockchain, AI, and payments software development in ${formattedCityName}. We build secure, compliant infrastructure for fintechs and enterprises in ${formattedCityName}.`,
    h1,
    intro: `${formattedCityName} is a critical commercial and technological hub within ${countryName}. As the local ecosystem expands, businesses in ${formattedCityName} require high-performance software engineering to compete globally. Hurain Technologies delivers custom payment architectures, secure API integrations, and enterprise blockchain solutions specifically tailored for ${formattedCityName}'s most ambitious tech companies.`,
    hubFacts: [
      `${formattedCityName} is recognized as a major center for digital innovation and financial services within ${countryName}.`,
      `Local enterprises are rapidly adopting decentralized technologies and AI-driven fraud detection systems.`,
      `Our engineering teams provide the scalable, secure technical foundation required by ${formattedCityName}-based fintechs and startups.`
    ],
    marketDrivers: [
      `High concentration of financial institutions and tech talent in ${formattedCityName}.`,
      `Strong local demand for cross-border payment solutions and digital wallets.`,
      `Rapid growth in enterprise blockchain and smart contract deployments.`
    ],
    detailedAnalysis: [
      {
        heading: `Engineering Excellence in ${formattedCityName}`,
        paragraphs: [
          `As a leading tech hub, ${formattedCityName} attracts businesses that require uncompromising technical quality. From high-frequency trading platforms to high-volume e-commerce payment gateways, the systems operating out of ${formattedCityName} must handle immense scale and complexity.`,
          `Hurain Technologies provides the deep engineering talent necessary to build these systems. We utilize modern tech stacks, including Node.js, Next.js, Go, and Solidity, to construct resilient backend architectures capable of processing millions of transactions securely.`
        ]
      },
      {
        heading: `Future-Proofing ${formattedCityName} Enterprises`,
        paragraphs: [
          `The competitive landscape in ${formattedCityName} means that businesses cannot rely on outdated, monolithic architectures. Agility is key. By transitioning to microservices and deploying on robust cloud infrastructure, companies in ${formattedCityName} can innovate faster and reduce downtime.`,
          `Our dedicated teams integrate directly with your operations, offering continuous deployment pipelines, automated security auditing, and comprehensive DevOps support to keep your platforms ahead of the curve in ${formattedCityName}.`
        ]
      }
    ],
    faqs: [
      { question: `Do you provide dedicated development teams for companies in ${formattedCityName}?`, answer: `Yes, we can deploy dedicated, senior-level engineering pods to augment your existing teams or take full ownership of product development for your ${formattedCityName} operations.` },
      { question: `What industries in ${formattedCityName} do you serve?`, answer: `We primarily serve fintech, banking, e-commerce, and Web3 enterprises located in ${formattedCityName}, focusing on high-security and high-throughput applications.` }
    ],
    focusServiceSlugs: ["payment-gateway-integration", "api-integration-services", "blockchain-cryptocurrency-development", "cloud-application-modernization"]
  };
}

async function run() {
  console.log("Fetching cities with population from countriesnow API...");
  const res = await fetchJson("https://countriesnow.space/api/v0.1/countries/population/cities");
  const allCitiesData = res.data;

  // Group by country
  const groupedByCountry = {};
  for (const cityData of allCitiesData) {
    const cName = cityData.country;
    if (EXCLUDED_COUNTRIES.includes(cName)) continue;

    if (!groupedByCountry[cName]) {
      groupedByCountry[cName] = [];
    }
    
    // Find latest population
    let latestPop = 0;
    if (cityData.populationCounts && cityData.populationCounts.length > 0) {
      // Data is usually sorted, or we can just grab the first/last one
      latestPop = parseFloat(cityData.populationCounts[0].value) || 0;
    }
    
    groupedByCountry[cName].push({
      name: cityData.city,
      population: latestPop
    });
  }

  const generatedCountries = [];
  const generatedCities = [];

  for (const [countryName, cities] of Object.entries(groupedByCountry)) {
    const countrySlug = slugify(countryName);
    
    // 1. Generate Country Page
    generatedCountries.push({
      slug: countrySlug,
      countryName: countryName,
      region: "Global",
      ...generateCountrySeo(countryName)
    });

    // 2. Generate Top 15 Cities
    // Sort by population descending
    cities.sort((a, b) => b.population - a.population);
    
    const topCities = cities.slice(0, 15);
    
    for (const city of topCities) {
      // Capitalise every word ("san miguel de tucumán" -> "San Miguel De Tucumán"); only lowering the tail broke multi-word names.
      const formattedCityName = city.name.toLowerCase().replace(/(^|[\s(-])(\p{L})/gu, (m, sep, ch) => sep + ch.toUpperCase());
      const citySlug = slugify(formattedCityName);
      
      generatedCities.push({
        slug: citySlug,
        cityName: formattedCityName,
        countrySlug: countrySlug,
        ...generateCitySeo(city.name, countryName)
      });
    }
  }

  // Deduplicate
  const uCountries = Array.from(new Map(generatedCountries.map(c => [c.slug, c])).values());
  const uCities = Array.from(new Map(generatedCities.map(c => [c.slug, c])).values());

  const dataDir = path.join(process.cwd(), "src", "data");
  await fs.writeFile(path.join(dataDir, "countries.json"), JSON.stringify(uCountries, null, 2));
  await fs.writeFile(path.join(dataDir, "cities.json"), JSON.stringify(uCities, null, 2));

  console.log(`Successfully generated ${uCountries.length} countries and ${uCities.length} cities.`);
}

run().catch(console.error);
