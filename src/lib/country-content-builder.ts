import { CountryPage, FaqItem } from "@/lib/types";
import { getServiceBySlug } from "@/data/services";
import { industries } from "@/data/industries";

// Builds substantial, country-specific extended content for country hub pages,
// grounded in data that's actually unique per country (regulatoryNotes,
// focusServiceSlugs, region tier) rather than fabricated stats or generic
// filler repeated identically across every page.

const REGION_OPENERS: Record<string, string> = {
  "Tier 1 — High-Value Regulated Markets":
    "operates under some of the world's most demanding regulatory frameworks for financial technology, which raises the bar for what \"production-ready\" means but also rewards platforms that get the engineering right with genuine market trust",
  "Tier 2 — Fast-Growing Digital Markets":
    "is scaling its digital finance and payments infrastructure quickly, with regulation evolving alongside — often faster than off-the-shelf platforms and generic development shops can keep pace with",
  "Tier 3 — Partnership & White-Label Markets":
    "has built a reputation as an efficient, well-regulated base for fintech and digital-asset businesses that need to launch quickly without compromising on technical or compliance quality",
};
const DEFAULT_OPENER =
  "represents a growing market for digital finance and technology infrastructure, where local and international businesses alike need engineering that can adapt to an evolving regulatory and competitive landscape";

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

// Cheap deterministic hash so wording variety is stable per country (not random on every render).
function seedFromSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

export function buildCountryOverview(country: CountryPage): string[] {
  const seed = seedFromSlug(country.slug);
  const opener = REGION_OPENERS[country.region] ?? DEFAULT_OPENER;

  const focusServices = country.focusServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const serviceNames = focusServices.map((s) => s.name);
  const serviceList =
    serviceNames.length > 1
      ? `${serviceNames.slice(0, -1).join(", ")} and ${serviceNames[serviceNames.length - 1]}`
      : serviceNames[0] ?? "custom software development";

  const engineeringAngles = [
    "reliable delivery under real transaction volume, not just a working demo",
    "architecture that survives a banking partner's or regulator's technical due diligence on the first submission",
    "systems built to scale from an initial launch into the volume growth that follows",
    "engineering discipline that treats security and compliance as part of the build, not an afterthought",
  ];

  const paragraphOne = `${country.countryName} ${opener}. Hurain Technologies works with businesses in ${country.countryName} on ${serviceList}, engineering platforms built for ${pick(engineeringAngles, seed)}.`;

  const regulatorySentence =
    country.regulatoryNotes.length > 0
      ? `Specifically: ${country.regulatoryNotes[0].charAt(0).toLowerCase() + country.regulatoryNotes[0].slice(1)}`
      : `Regulatory expectations for platforms handling financial or transaction data continue to tighten across most markets, and ${country.countryName} is no exception.`;

  const paragraphTwo = `Getting this right in ${country.countryName} means building to the specific expectations of local regulators and banking partners from day one, rather than retrofitting compliance onto a platform designed for a different market. ${regulatorySentence} We build the technical controls this expects — audit logging, access management, and reporting — while jurisdiction-specific licensing and legal strategy should run through qualified local counsel.`;

  const closingAngles = [
    `For businesses building in or expanding into ${country.countryName}, the platforms that succeed are the ones engineered for the market's actual regulatory and operational reality, not adapted after the fact from a template built for somewhere else.`,
    `Teams that treat ${country.countryName}'s specific requirements as a starting constraint, rather than a checklist to satisfy after launch, consistently ship faster and with fewer costly rework cycles once real users and real transaction volume arrive.`,
    `We've found the platforms that hold up best in ${country.countryName} are the ones where security, compliance, and scalability were architectural decisions from the first design conversation, not features added under deadline pressure later.`,
  ];

  const paragraphThree = pick(closingAngles, seed + 7);

  const additionalRegulatoryContext =
    country.regulatoryNotes.length > 1
      ? `There's a second dimension worth flagging too: ${country.regulatoryNotes[1].charAt(0).toLowerCase() + country.regulatoryNotes[1].slice(1)} Platforms that ignore this until a partner or regulator asks about it tend to face a far more disruptive retrofit than if it had been designed in from the start.`
      : `Beyond the immediate regulatory checklist, businesses operating in ${country.countryName} increasingly need to demonstrate operational resilience — clear incident response processes, auditable data handling, and infrastructure that doesn't create a single point of failure — to satisfy both regulators and commercial banking partners.`;

  const teamAngles = [
    `Our team approaches every ${country.countryName} engagement the same way we'd approach a market we'd worked in a hundred times before: by reading the actual regulatory texts and talking to your compliance function directly, rather than relying on generic assumptions about what "fintech compliance" looks like.`,
    `What tends to separate a successful ${country.countryName} launch from a stalled one isn't the technology stack — it's whether the engineering team understood the local operating context well enough to make the right trade-offs before code was written, not after a partner's due diligence review flagged a gap.`,
    `Businesses that engage an engineering partner early — during architecture decisions, not just implementation — consistently avoid the costly rework that comes from discovering a ${country.countryName}-specific requirement after a platform is already built around assumptions that don't hold locally.`,
  ];

  const paragraphFour = pick(teamAngles, seed + 13);

  return [paragraphOne, paragraphTwo, additionalRegulatoryContext, paragraphThree, paragraphFour];
}

const SCALE_CHALLENGES = [
  "a platform that passed early review but wasn't architected for the transaction volume that comes with real growth",
  "engineering decisions made for a different market's regulatory assumptions that don't transfer cleanly",
  "a security posture that was adequate at launch but hasn't kept pace with the platform's own growth in value and attack surface",
  "manual processes — reconciliation, compliance review, reporting — that worked at low volume and now consume disproportionate team time",
];

export function buildCountryProblems(country: CountryPage): { title: string; description: string }[] {
  const seed = seedFromSlug(country.slug);
  const problems: { title: string; description: string }[] = [];

  country.regulatoryNotes.slice(0, 2).forEach((note, i) => {
    problems.push({
      title: i === 0 ? `Meeting ${country.countryName}'s regulatory expectations technically` : `Staying current as ${country.countryName}'s framework evolves`,
      description: note,
    });
  });

  problems.push({
    title: `Scaling past ${pick(SCALE_CHALLENGES, seed)}`,
    description: `Businesses operating in ${country.countryName} often reach a point where the platform that got them to launch isn't the platform that can carry them through their next stage of growth — and retrofitting scale onto a system not designed for it is far more expensive than designing for it from the start.`,
  });

  problems.push({
    title: `Finding an engineering partner who understands ${country.countryName} specifically`,
    description: `Generic development shops apply the same playbook everywhere, which means someone on your team ends up re-explaining local regulatory and market context on every decision — slowing delivery and increasing the risk that something specific to ${country.countryName} gets missed.`,
  });

  return problems;
}

export function buildCountryServiceHighlights(
  country: CountryPage
): { title: string; description: string }[] {
  const focusServices = country.focusServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const items = focusServices.map((service) => ({
    title: `${service.name} in ${country.countryName}`,
    description: service.painPoints[0]?.description ?? service.intro,
  }));

  items.push({
    title: `Production-grade delivery for ${country.countryName} teams`,
    description: `Every engagement follows the same discipline regardless of market: formal test coverage, security review before launch, and monitoring from the first day of production traffic — not a lighter process because a market is smaller.`,
  });

  return items;
}

export function buildCountryIndustries(country: CountryPage): { title: string; description: string; href: string }[] {
  const relevant = industries.filter((industry) =>
    industry.relatedServiceSlugs.some((slug) => country.focusServiceSlugs.includes(slug))
  );
  const selected = (relevant.length > 0 ? relevant : industries).slice(0, 6);
  return selected.map((industry) => ({
    title: `${industry.name} in ${country.countryName}`,
    description: `${industry.summary} ${industry.needs[0] ? `A common starting point: ${industry.needs[0].toLowerCase()}.` : ""}`,
    href: `/industries/${industry.slug}/${country.slug}`,
  }));
}

export function buildCountryEngineeringChecklist(country: CountryPage): { title: string; description: string }[] {
  const base = [
    {
      title: "Architecture reviewed for local regulatory fit",
      description: `Data handling, access control, and audit logging designed against ${country.countryName}'s specific regulatory expectations before development starts, not retrofitted after a partner review flags a gap.`,
    },
    {
      title: "Built for real transaction volume",
      description: `Load-tested against realistic ${country.countryName} usage patterns rather than a clean demo scenario, so scaling from launch to growth doesn't require an architecture rewrite.`,
    },
    {
      title: "Security review before launch",
      description: "Internal security review and, for platforms handling meaningful value or sensitive data, independent third-party audit coordination before go-live, not as an afterthought.",
    },
    {
      title: "Documentation your team can actually use",
      description: "Architecture decisions, deployment runbooks, and operational documentation handed off in a form your internal team or future hires can work from directly.",
    },
  ];
  return base;
}

export function buildCountryExtendedFaqs(country: CountryPage): FaqItem[] {
  const focusServices = country.focusServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const firstService = focusServices[0]?.name ?? "your platform";

  return [
    {
      question: `Do you have engineers with direct experience building for the ${country.countryName} market?`,
      answer: `Yes — our team has delivered ${focusServices.map((s) => s.name.toLowerCase()).join(", ") || "blockchain, payments, and platform"} engagements for clients operating in and around ${country.countryName}, and we build to the regulatory context outlined above from the first architecture conversation.`,
    },
    {
      question: `How long does a typical ${firstService.toLowerCase()} engagement take for a ${country.countryName}-based business?`,
      answer: `Timelines depend on scope more than geography. Milestones and delivery time are agreed after an initial discovery call specific to your requirements, and every milestone ends with your sign-off.`,
    },
    {
      question: `Can you work with our existing team based in ${country.countryName}?`,
      answer: `Yes, we regularly work alongside in-house engineering teams as an embedded pod, handing off documentation and architecture decisions rather than operating as a fully separate black box.`,
    },
    {
      question: `Do you provide ongoing support once a platform is live in ${country.countryName}?`,
      answer: `Yes, post-launch retainers covering monitoring, incident response, and continued feature development are available for every engagement type, not just larger platform builds.`,
    },
    {
      question: `What's the first step to start a project in ${country.countryName}?`,
      answer: `A discovery call where we walk through your specific requirements, target timeline, and any regulatory or banking-partner constraints already known — from there we scope a technical estimate, typically within 5 business days.`,
    },
    {
      question: `Do you work remotely, or do you need a local presence in ${country.countryName}?`,
      answer: `We work remotely with clients across every market we serve, communicating on your team's schedule and tools, and can coordinate with local counsel or partners in ${country.countryName} as needed without requiring an in-country office.`,
    },
  ];
}
