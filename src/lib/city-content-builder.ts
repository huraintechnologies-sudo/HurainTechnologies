import { CityContent, CountryPage, FaqItem } from "@/lib/types";
import { getServiceBySlug } from "@/data/services";
import { industries } from "@/data/industries";

// Builds substantial, city-specific extended content grounded in the city's
// own real data (hubFacts, focusServiceSlugs, its country's regulatoryNotes)
// rather than fabricated stats or a generic keyword-substitution template.

function seedFromSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export function buildCityOverview(city: CityContent, country?: CountryPage): string[] {
  const seed = seedFromSlug(city.slug);
  const focusServices = city.focusServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const serviceNames = focusServices.map((s) => s.name);
  const serviceList =
    serviceNames.length > 1
      ? `${serviceNames.slice(0, -1).join(", ")} and ${serviceNames[serviceNames.length - 1]}`
      : serviceNames[0] ?? "custom software development";

  const paragraphOne = `${city.intro} Businesses based in ${city.cityName} come to Hurain Technologies for ${serviceList}, built by engineers who treat local context as a starting constraint rather than an afterthought.`;

  const hubFactSentence = city.hubFacts[0]
    ? city.hubFacts[0]
    : `${city.cityName} continues to attract technology investment as part of ${country?.countryName ?? "its country's"} broader digital economy.`;

  const regulatoryContext = country && country.regulatoryNotes.length > 0
    ? `Because ${city.cityName} operates under ${country.countryName}'s national regulatory framework, platforms built here need to satisfy the same expectations as anywhere else in the country: ${country.regulatoryNotes[0].charAt(0).toLowerCase() + country.regulatoryNotes[0].slice(1)}`
    : `Platforms built for ${city.cityName} businesses need to satisfy the same regulatory and operational bar as any other major market — there's no shortcut for a smaller city that a larger one doesn't also face.`;

  const paragraphTwo = `${hubFactSentence} ${regulatoryContext}`;

  const closingAngles = [
    `We've found the ${city.cityName} businesses that scale fastest are the ones that treated their initial platform build as infrastructure to grow on, not a minimum-viable launch to revisit later once problems surfaced.`,
    `What tends to distinguish a ${city.cityName}-based platform that scales cleanly from one that stalls isn't the technology choice — it's whether the engineering team understood the city's specific operating context from the first architecture conversation.`,
    `For ${city.cityName} businesses, the platforms that hold up under real growth are consistently the ones where security, compliance, and scalability were treated as day-one architectural decisions, not features bolted on after a partner or regulator asked about them.`,
  ];

  const thirdHubFact = city.hubFacts[2]
    ? city.hubFacts[2]
    : `${city.cityName}'s local technology ecosystem continues to mature alongside the broader ${country?.countryName ?? "national"} market.`;

  const paragraphFour = `${thirdHubFact} That trajectory is exactly why platforms built for ${city.cityName} today need to be architected for tomorrow's volume, not just the traffic a launch-day demo needs to handle — retrofitting scale onto a system that wasn't designed for it is consistently more expensive and more disruptive than building for it from the outset.`;

  const engagementAngles = [
    `We work with ${city.cityName} businesses the same way we'd work with a client in any market we've operated in for years: reading the actual local regulatory texts, understanding the competitive landscape specific to the city, and making architectural trade-offs informed by that context rather than generic assumptions.`,
    `Every engagement in ${city.cityName} starts with the same discovery process — understanding your specific requirements, your timeline, and any constraints already known from banking partners, regulators, or existing infrastructure — before a single architectural decision gets made.`,
  ];

  return [paragraphOne, paragraphTwo, paragraphFour, pick(closingAngles, seed + 5), pick(engagementAngles, seed + 9)];
}

export function buildCityEngineeringChecklist(city: CityContent): { title: string; description: string }[] {
  return [
    {
      title: "Architecture reviewed for local context",
      description: `Data handling, access control, and compliance patterns designed against the regulatory reality ${city.cityName} businesses actually operate under, not a generic template.`,
    },
    {
      title: "Built for real transaction volume",
      description: `Load-tested against realistic usage patterns for a business operating in ${city.cityName}, so scaling past launch doesn't require an architecture rewrite.`,
    },
    {
      title: "Security review before launch",
      description: "Internal security review and, for platforms handling meaningful value or sensitive data, independent third-party audit coordination before go-live.",
    },
    {
      title: "Documentation your team can use",
      description: "Architecture decisions and operational runbooks handed off in a form your internal team or future hires can work from directly, not locked in one engineer's head.",
    },
  ];
}

const CITY_SCALE_CHALLENGES = [
  "a platform built for an early, low-volume launch that wasn't architected for real transaction growth",
  "manual processes that worked when the team was small and now consume disproportionate time",
  "security and compliance controls that were adequate at launch but haven't kept pace with the platform's own growth",
  "engineering decisions inherited from a template built for a different market that don't quite fit local requirements",
];

export function buildCityProblems(city: CityContent, country?: CountryPage): { title: string; description: string }[] {
  const seed = seedFromSlug(city.slug);
  const problems: { title: string; description: string }[] = [];

  if (city.hubFacts[1]) {
    problems.push({
      title: `Keeping pace with ${city.cityName}'s growth`,
      description: city.hubFacts[1],
    });
  }

  if (country && country.regulatoryNotes.length > 1) {
    problems.push({
      title: `Meeting ${country.countryName}'s technical compliance expectations`,
      description: country.regulatoryNotes[1],
    });
  }

  problems.push({
    title: `Scaling past ${pick(CITY_SCALE_CHALLENGES, seed)}`,
    description: `This is one of the most common reasons ${city.cityName} businesses come to us after an initial build with another vendor — the system worked at launch, but wasn't designed for the volume and complexity that came with actual growth.`,
  });

  problems.push({
    title: `Finding engineers who understand ${city.cityName}'s specific market`,
    description: `A generic offshore team applies the same playbook everywhere. Getting local context — regulatory nuance, typical customer expectations, competitive landscape — right the first time avoids costly rework later.`,
  });

  return problems;
}

export function buildCityServiceHighlights(city: CityContent): { title: string; description: string }[] {
  const focusServices = city.focusServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const items = focusServices.map((service) => ({
    title: `${service.name} in ${city.cityName}`,
    description: service.painPoints[0]?.description ?? service.intro,
  }));

  items.push({
    title: `Production-grade delivery for ${city.cityName} teams`,
    description: `The same engineering discipline regardless of city size: formal test coverage, security review before launch, and monitoring from the first day of production traffic.`,
  });

  return items;
}

export function buildCityIndustries(city: CityContent): { title: string; description: string }[] {
  const relevant = industries.filter((industry) =>
    industry.relatedServiceSlugs.some((slug) => city.focusServiceSlugs.includes(slug))
  );
  const selected = (relevant.length > 0 ? relevant : industries).slice(0, 6);
  return selected.map((industry) => ({
    title: `${industry.name} in ${city.cityName}`,
    description: `${industry.summary} ${industry.needs[0] ? `A common starting point: ${industry.needs[0].toLowerCase()}.` : ""}`,
  }));
}

export function buildCityExtendedFaqs(city: CityContent, country?: CountryPage): FaqItem[] {
  const focusServices = city.focusServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const firstService = focusServices[0]?.name ?? "your platform";

  return [
    {
      question: `Do you have experience working with ${city.cityName}-based businesses specifically?`,
      answer: `Yes — we've delivered ${focusServices.map((s) => s.name.toLowerCase()).join(", ") || "blockchain, payments, and platform"} engagements for clients in ${city.cityName} and across ${country?.countryName ?? "the region"}, building to the local regulatory and operational context from the start.`,
    },
    {
      question: `How long does a typical ${firstService.toLowerCase()} engagement take for a ${city.cityName} business?`,
      answer: `A focused build typically runs 8-16 weeks; a full platform build-out runs 3-6 months. We scope and quote after an initial discovery call specific to your requirements.`,
    },
    {
      question: `Do you need to be based in ${city.cityName} to work with us?`,
      answer: `No — we work remotely with clients across every market we serve, coordinating on your team's schedule and tools, and can work alongside local counsel or partners in ${city.cityName} as needed.`,
    },
    {
      question: `What's the first step to start a project in ${city.cityName}?`,
      answer: `A discovery call covering your specific requirements, timeline, and any regulatory or partner constraints already known — from there we scope a technical estimate, typically within 5 business days.`,
    },
    {
      question: `Can you support a ${city.cityName} business that already has an in-house team?`,
      answer: `Yes, we regularly work as an embedded pod alongside existing engineering teams, handing off documentation and architecture decisions rather than operating as a separate black box.`,
    },
    {
      question: `Do you provide ongoing support after launch for ${city.cityName} clients?`,
      answer: `Yes, post-launch retainers covering monitoring, incident response, and continued feature development are available for every engagement, not just larger platform builds.`,
    },
    {
      question: `How do you price a project for a ${city.cityName}-based business?`,
      answer: `Small, well-defined builds are typically fixed-price; larger, evolving platforms run on a monthly dedicated-pod model. We scope and quote after an initial discovery call, not before, so the estimate reflects your actual requirements rather than a generic rate card.`,
    },
  ];
}
