// Builds the copy for /solutions/[solution]/[country] and .../[city] pages
// from three real inputs: the solution playbook, verified geo facts
// (population, currency, time zone, photo) and the country market profile
// (tax, privacy law, payment rails, mobile platform mix).
//
// Content is written answer-first for AEO: each section opens with a direct
// one- or two-sentence answer an assistant or featured snippet can lift as-is.

import { FaqItem } from "@/lib/types";
import { SolutionPlaybook } from "@/data/solution-playbooks";
import { ServiceVertical } from "@/data/service-verticals";
import { LocationContext, formatPopulation } from "@/lib/geo-facts";
import { isDatabaseService } from "@/data/database-services";

export interface KeyFact {
  label: string;
  value: string;
}

export interface LocalConsideration {
  title: string;
  body: string;
}

export interface LocationContent {
  title: string;
  metaDescription: string;
  h1: string;
  answer: string;
  intro: string[];
  keyFacts: KeyFact[];
  whyHere: string[];
  considerations: LocalConsideration[];
  delivery: { title: string; body: string }[];
  timelineAnswer: string;
  costAnswer: string;
  faqs: FaqItem[];
  keywords: string[];
}

const list = (items: string[], max = 4) => {
  const xs = items.slice(0, max);
  if (xs.length <= 1) return xs.join("");
  return `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
};

// Sentence-case a title for use mid-sentence: "Food Delivery App" -> "food
// delivery app", while keeping acronyms and brand casing (AI, IoT, SaaS, Web3).
export const lc = (s: string) =>
  s.replace(/[A-Za-z][A-Za-z0-9]*/g, (w) => (/^[A-Z][a-z]+$/.test(w) || /^[A-Z]$/.test(w) ? w.toLowerCase() : w));
// For sentences and descriptions: only the first letter, so proper nouns survive.
const lcFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

function platformAdvice(skew: string | undefined, place: string): string {
  if (skew === "ios") return `In ${place} iPhone usage is high among paying customers, so we usually launch iOS and Android together from a shared Flutter or React Native codebase and polish the iOS experience first.`;
  if (skew === "balanced") return `${place} has a fairly even iOS/Android split, so a cross-platform build that ships to both stores on day one is usually the most cost-effective choice.`;
  return `Android dominates smartphone usage in ${place}, so we optimise for mid-range Android devices first — small APK size, fast start-up and graceful behaviour on patchy mobile data — while still shipping iOS from the same codebase.`;
}

// The single paragraph that makes each solution's local page different in
// substance: what actually changes about this product in this market.
function localAngle(slug: string, ctx: LocationContext, place: string, countryName: string): string {
  const m = ctx.market;
  const pay = m.payments ? list(m.payments) : "local cards and bank transfers";
  const law = m.privacyLaw || "the local data-protection framework";
  const tax = m.tax ? `${m.tax}` : "local indirect tax";
  // All database services share the Remote DBA local angle.
  switch (isDatabaseService(slug) ? "remote-dba-services" : slug) {
    case "mobile-app-development":
      return `${platformAdvice(m.mobile, place)} Checkout flows are built around the payment methods customers in ${countryName} actually use — ${pay} — and personal data is handled in line with ${law}.`;
    case "ecommerce-app":
      return `An online store in ${place} converts best when checkout offers ${pay}. Prices and invoices must reflect ${tax}, and customer data, marketing consent and cookies must follow ${law}. We configure all three before launch rather than after the first complaint.`;
    case "food-delivery":
      return `Delivery platforms in ${place} live or die on payment mix and dispatch accuracy. We support ${pay}${m.region === "africa" || m.region === "asia" || m.region === "latam" || m.region === "middle-east" ? " plus cash on delivery with rider cash reconciliation" : ""}, set commissions and delivery fees inclusive of ${tax}, and tune ETAs using real road-network routing for ${place}.`;
    case "retail-software-development":
      return `Retail systems in ${countryName} must calculate ${tax} correctly on every receipt, accept ${pay} at the counter and online, and keep loyalty data compliant with ${law}. We build these rules into the POS and inventory core instead of patching them into reports.`;
    case "fintech-app":
      return `Fintech products serving ${countryName} typically engage with ${m.regulator || "the national financial regulator"}. We build the ledger, KYC/AML and audit controls that licensing reviews expect, integrate local rails such as ${pay}, and process personal data under ${law}. Your legal counsel sets the licence model; we engineer to it.`;
    case "healthcare-software":
      return `Health data is special-category data almost everywhere, and in ${countryName} it falls under ${law}. We design consent flows, role-based access, audit logs and in-region hosting to that standard, and integrate with local labs, pharmacies and insurers through HL7/FHIR or their APIs.`;
    case "hire-developers":
      return `Our developers and support engineers work 24/7, so your ${place} business day is fully covered for stand-ups, code reviews and pairing${ctx.overlap ? ` (${ctx.overlap.diffLabel})` : ""}, and work handed over at the end of your day keeps moving overnight.`;
    case "remote-dba-services":
      return `Databases serving customers in ${countryName} must keep personal data under ${law}, which usually means controlled access, encryption, audit logs and — for some sectors — keeping data in-country or in a nearby cloud region. Our DBAs are on call 24/7${ctx.overlap ? ` (${place} is on ${ctx.overlap.offsetLabel})` : ""}, so maintenance windows are scheduled outside your peak ${place} trading hours and incidents are handled the moment they happen, day or night.`;
    case "ai-ml-development":
      return `AI systems for ${countryName} must respect ${law} on automated decisions and personal data, and should work in ${m.businessLanguage || "the languages your customers use"}. We redact personal data before it reaches a model, keep evaluation sets in local languages, and can host models in-region when data may not leave the country.`;
    case "web-application-development":
      return `Web applications for ${place} are built to load fast on local networks, support ${m.businessLanguage || "your customers' languages"}, collect consent correctly under ${law}, and take payments through ${pay} where the app sells anything.`;
    case "saas-development":
      return `Selling SaaS into ${countryName} means pricing in ${ctx.country?.currency?.code || "local currency"} where it helps conversion, charging ${tax} on digital services where it applies, and offering a data-processing agreement aligned with ${law}. We set up billing, tax and data-residency options so enterprise buyers in ${place} can say yes.`;
    case "cloud-application-modernization":
      return `Modernisation projects in ${countryName} are usually shaped by ${law} and by sector rules on outsourcing and data residency. We map which workloads can move to a public-cloud region, which must stay in-country, and plan migration waves around your ${place} business hours to avoid customer-facing downtime.`;
    case "iot-embedded-systems":
      return `IoT deployments in ${countryName} need radio type-approval for devices, connectivity chosen for local network coverage (cellular NB-IoT/LTE-M, LoRaWAN or Wi-Fi), and location or personal data handled under ${law}. We plan certification and connectivity early so pilots in ${place} can scale.`;
    case "blockchain-web3-development":
      return `Blockchain products touching ${countryName} customers must account for local virtual-asset rules${m.regulator ? ` and the expectations of ${m.regulator}` : ""}, AML/sanctions screening and ${law}. We pair on-chain contracts with off-chain KYC gating, travel-rule data and audit trails so the product can pass banking-partner and regulator reviews.`;
    case "elearning-platform-development":
      return `Learners in ${place} mostly study on phones, so we use adaptive video, offline downloads and ${m.businessLanguage || "local-language"} interfaces. Course payments support ${pay}, and learner data — especially for minors — is handled under ${law}.`;
    case "real-estate-software":
      return `Property platforms in ${place} need map search tuned to local neighbourhoods, prices in ${ctx.country?.currency?.code || "local currency"}, lead capture from the portals and WhatsApp channels buyers use, and tenant data handled under ${law}. Rent and booking payments run through ${pay}.`;
    default:
      return `We adapt payments (${pay}), tax (${tax}) and data protection (${law}) to ${countryName} before launch.`;
  }
}

function keyFactsFor(ctx: LocationContext, cityName?: string): KeyFact[] {
  const c = ctx.country;
  const facts: KeyFact[] = [];
  if (cityName && ctx.city?.population) facts.push({ label: `${cityName} population`, value: formatPopulation(ctx.city.population)! });
  if (!cityName && c?.population) facts.push({ label: "Population", value: formatPopulation(c.population)! });
  if (!cityName && c?.capital) facts.push({ label: "Capital", value: c.capital });
  if (c?.currency) facts.push({ label: "Currency", value: `${c.currency.name} (${c.currency.code})` });
  if (ctx.market.tax) facts.push({ label: "Indirect tax", value: ctx.market.tax });
  if (ctx.overlap) facts.push({ label: "Time zone", value: `${ctx.overlap.offsetLabel} · ${ctx.overlap.zone.replace(/_/g, " ")}` });
  facts.push({ label: "Support availability", value: "24/7 — every local business hour covered" });
  if (c?.languages?.length) facts.push({ label: "Languages", value: c.languages.slice(0, 3).join(", ") });
  if (ctx.market.payments?.length) facts.push({ label: "Payment rails to support", value: ctx.market.payments.slice(0, 3).join(" · ") });
  return facts;
}

function deliveryBlocks(ctx: LocationContext, place: string, pb: SolutionPlaybook) {
  const o = ctx.overlap;
  const hours = `Our team works 24/7, so stand-ups, demos and urgent fixes happen during your ${place} business day${o ? ` (${o.offsetLabel})` : ""}, and work keeps progressing while you are offline.`;
  return [
    { title: "24/7 availability & communication", body: `${hours} Everyday collaboration runs on Slack or Microsoft Teams, Jira and GitHub, with a demo of working software every two weeks.` },
    { title: "Kick-off & delivery timeline", body: `Discovery can start within 5 business days of a signed proposal. A first release of ${pb.slug === "hire-developers" ? "your dedicated team is productive" : "the product ships"} in ${pb.mvpWeeks}; a fuller build typically takes ${pb.fullWeeks}.` },
    { title: "Response times after launch", body: `Response times are written into a support SLA before launch: our team is available 24/7, critical production issues get immediate attention from an on-call engineer, and routine tickets are handled around the clock.` },
    { title: "Meetings & site visits", body: `Most engagements run fully remote over video. Workshops and go-live visits to ${place} can be arranged for larger programmes.` },
  ];
}

export function buildCountryContent(vertical: ServiceVertical, pb: SolutionPlaybook, ctx: LocationContext, countryName: string): LocationContent {
  const name = vertical.name;
  const c = ctx.country;
  const pop = formatPopulation(c?.population);
  const pay = ctx.market.payments ? list(ctx.market.payments, 3) : null;

  const answer = `Hurain Technologies delivers ${lc(name)} for businesses in ${countryName}, delivered remotely by a senior team in India that works 24/7, so every ${countryName} business hour is covered. Typical first release: ${pb.mvpWeeks}. Builds include ${pay ? `local payment rails (${pay}), ` : ""}${ctx.market.tax ? `${ctx.market.tax} handling, ` : ""}and data protection aligned with ${ctx.market.privacyLaw || "local law"}.`;

  const intro = [
    `${countryName}${c?.description ? `, ${lcFirst(c.description)}` : ""}${pop ? ` with about ${pop} people` : ""}, is one of the markets in ${ctx.regionLabel} where we deliver ${lc(name)}. ${pb.answer}`,
    localAngle(vertical.slug, ctx, countryName, countryName),
  ];

  const whyHere = [
    `${ctx.regionLabel} buyers increasingly expect digital-first service, and ${countryName} businesses that invest in ${lc(name)} compete on convenience, not just price.`,
    ctx.market.mobile === "android"
      ? `Smartphone access in ${countryName} is overwhelmingly Android, which rewards lightweight, mobile-first products.`
      : ctx.market.mobile === "ios"
        ? `High iPhone penetration in ${countryName} means customers expect polished, app-store-quality experiences.`
        : `${countryName}'s mixed iOS/Android audience rewards products that launch on both platforms at once.`,
    ctx.market.payments?.length
      ? `Local payment habits (${list(ctx.market.payments, 3)}) are specific enough that international off-the-shelf tools often convert poorly without local integration.`
      : `Local payment and invoicing habits often need integration work that off-the-shelf international tools don't cover.`,
  ];

  const considerations: LocalConsideration[] = [
    { title: "Currency & pricing", body: c?.currency ? `Show prices, invoices and reports in ${c.currency.name} (${c.currency.code}); where you sell cross-border, store the transaction currency and FX rate on every record.` : "Store the transaction currency and FX rate on every record for clean reporting." },
    { title: "Tax (VAT / GST)", body: ctx.market.tax ? `The standard headline rate in ${countryName} is ${ctx.market.tax}. We build tax-inclusive pricing, compliant invoice fields and exportable tax reports; your accountant confirms treatment for your specific products.` : `We build configurable tax rules, compliant invoice fields and exportable tax reports; your accountant confirms treatment for your specific products.` },
    { title: "Data protection", body: `${ctx.market.privacyLaw ? `Personal data is governed by ${ctx.market.privacyLaw}.` : `Personal data must be handled under ${countryName}'s data-protection rules.`} We implement consent capture, data-subject request handling, encryption and retention rules, and host in a region that meets your residency needs.` },
    { title: "Payments", body: ctx.market.payments ? `Customers in ${countryName} expect ${list(ctx.market.payments)}. We integrate these through local or international PSPs with webhook-based reconciliation.` : "We integrate cards, bank transfers and popular wallets through local or international PSPs." },
    ...(ctx.market.regulator && ["fintech-app", "blockchain-web3-development", "healthcare-software", "cloud-application-modernization"].includes(vertical.slug)
      ? [{ title: "Regulators", body: `Depending on your activity, ${ctx.market.regulator} may be relevant. We build the audit logs, reporting and controls these bodies expect and work alongside your legal counsel.` }]
      : []),
    { title: "Language & localisation", body: `Interfaces can ship in ${ctx.market.businessLanguage || (c?.languages?.length ? list(c.languages, 3) : "English")}, with right-to-left layouts, local date/number formats and ${c?.callingCode ? `${c.callingCode} phone validation` : "local phone validation"}.` },
  ];

  const costAnswer = `The cost of ${lc(name)} in ${countryName} depends mainly on ${list(pb.costDrivers.map(lcFirst), 3)}. Because our team is based in India, clients in ${countryName} typically pay significantly less than local agency rates for senior engineers. We give a fixed-scope estimate${c?.currency ? ` (in USD or ${c.currency.code})` : ""} within 5 business days of a discovery call.`;
  const timelineAnswer = `A first production release typically takes ${pb.mvpWeeks}, and a full-featured platform ${pb.fullWeeks}. Timelines depend on scope, integrations and how quickly decisions are made on your side.`;

  const faqs: FaqItem[] = [
    { question: `How much does ${lc(name)} cost in ${countryName}?`, answer: costAnswer },
    { question: `How long does ${lc(name)} take for a business in ${countryName}?`, answer: timelineAnswer },
    { question: `Which payment methods should a product in ${countryName} support?`, answer: ctx.market.payments ? `Most customers in ${countryName} expect ${list(ctx.market.payments)}. We integrate these with automated reconciliation so finance teams don't match payments by hand.` : `Cards, bank transfers and popular local wallets. We confirm the exact mix during discovery based on your customers.` },
    { question: `What data-protection law applies to ${lc(name)} in ${countryName}?`, answer: `${ctx.market.privacyLaw ? `Mainly ${ctx.market.privacyLaw}.` : `${countryName}'s data-protection rules apply.`} We build consent, access controls, encryption, audit logs and data-subject request handling to that standard; legal interpretation stays with your counsel.` },
    { question: `Can a team in India work effectively with a company in ${countryName}?`, answer: `Yes. Our team works 24/7${ctx.overlap ? ` (${ctx.overlap.diffLabel})` : ""}, so your whole ${countryName} business day is covered. We add daily stand-ups, fortnightly demos and a single accountable project manager.` },
    { question: `Do you charge ${ctx.market.tax?.split(" ")[0] || "VAT/GST"} in ${countryName} on your invoices?`, answer: `Our services are exported from India and are generally invoiced without Indian GST under export-of-services rules. In many countries a business customer then self-accounts for local tax under a reverse-charge mechanism — confirm the treatment for ${countryName} with your accountant.` },
    ...pb.faqs,
  ];

  return {
    title: `${name} Company in ${countryName}${c?.currency ? ` | ${c.currency.code} Pricing` : ""}`,
    metaDescription: `${name} for businesses in ${countryName}: ${pb.mvpWeeks} to first release, ${ctx.market.payments ? `${ctx.market.payments.slice(0, 2).join(" & ")} integration, ` : ""}${ctx.market.tax ? `${ctx.market.tax.split("(")[0].trim()}-ready invoicing, ` : ""}24/7 support. Get a fixed quote in 5 days.`.slice(0, 300),
    h1: `${name} in ${countryName}`,
    answer,
    intro,
    keyFacts: keyFactsFor(ctx),
    whyHere,
    considerations,
    delivery: deliveryBlocks(ctx, countryName, pb),
    timelineAnswer,
    costAnswer,
    faqs,
    keywords: [...pb.keywords.slice(0, 4).map((k) => `${k} ${countryName}`), `${lc(name)} company in ${countryName}`, `hire ${lc(name)} developers ${countryName}`],
  };
}

export function buildCityContent(vertical: ServiceVertical, pb: SolutionPlaybook, ctx: LocationContext, cityName: string, countryName: string): LocationContent {
  const name = vertical.name;
  const city = ctx.city;
  const pop = formatPopulation(city?.population);
  const place = `${cityName}`;

  const answer = `Hurain Technologies provides ${lc(name)} for companies in ${cityName}, ${countryName}: 24/7 support in ${cityName} time, a first release in ${pb.mvpWeeks}, and builds that support ${ctx.market.payments ? list(ctx.market.payments, 2) : "local payment methods"}${ctx.market.tax ? `, ${ctx.market.tax.split("(")[0].trim()}` : ""} and ${ctx.market.privacyLaw ? ctx.market.privacyLaw.replace(/^the /, "the ") : "local data-protection rules"}.`;

  const intro = [
    `${cityName}${city?.description ? ` is ${/^(a|an|the)\b/i.test(city.description) ? lcFirst(city.description) : `the ${lcFirst(city.description)}`}` : ` is a commercial centre in ${countryName}`}${pop ? `, home to around ${pop} people` : ""}. For ${cityName} businesses investing in ${lc(name)}, the details matter: ${lcFirst(pb.overview[0])}`,
    localAngle(vertical.slug, ctx, cityName, countryName),
    `Our engineering team works remotely from India for ${cityName} clients${ctx.overlap ? ` — ${ctx.overlap.diffLabel.toLowerCase()} — ` : " "}with one project manager as your single point of contact, fortnightly demos and full source-code ownership from day one.`,
  ];

  const whyHere = [
    `${cityName} businesses compete for customers who compare them against the best digital experiences in ${countryName} and abroad.`,
    ctx.market.payments?.length ? `Customers in ${cityName} pay with ${list(ctx.market.payments, 3)}, so local payment integration is not optional.` : `Local payment habits in ${cityName} need to be supported at checkout.`,
    pop && (city?.population || 0) > 1_000_000 ? `A metro market of ${pop} people gives enough scale to justify a custom product rather than generic tools.` : `A focused local market rewards products tailored to how ${cityName} customers actually buy and communicate.`,
  ];

  const considerations: LocalConsideration[] = [
    { title: `24/7 support in ${cityName}`, body: `${ctx.overlap ? `${cityName} is on ${ctx.overlap.offsetLabel} (${ctx.overlap.zone.replace(/_/g, " ")}). ` : ""}Our team works 24/7, so every ${cityName} business hour — and any out-of-hours incident — is covered.` },
    { title: "Payments & currency", body: `${ctx.country?.currency ? `Pricing and settlement in ${ctx.country.currency.code}` : "Local-currency pricing"} with ${ctx.market.payments ? list(ctx.market.payments) : "local payment methods"}, reconciled automatically against your PSP and bank statements.` },
    { title: "Tax & invoicing", body: ctx.market.tax ? `${countryName} applies ${ctx.market.tax}. Your product's receipts, invoices and reports are built to show it correctly.` : `Receipts, invoices and reports are built with configurable tax rules for ${countryName}.` },
    { title: "Data protection", body: `${ctx.market.privacyLaw ? `Customer data from ${cityName} is handled under ${ctx.market.privacyLaw}` : `Customer data from ${cityName} is handled under ${countryName}'s data-protection rules`}: consent records, encryption, access logs and in-region hosting where required.` },
  ];

  const costAnswer = `Cost depends on ${list(pb.costDrivers.map(lcFirst), 3)}. ${cityName} companies working with our India-based team typically pay considerably less than local agency rates for the same seniority. Share your requirements and we return a fixed-scope estimate within 5 business days.`;
  const timelineAnswer = `Typically ${pb.mvpWeeks} for a first production release and ${pb.fullWeeks} for a full platform. Discovery can begin within 5 business days of a signed proposal.`;

  const faqs: FaqItem[] = [
    { question: `Do you have developers available for ${cityName} projects?`, answer: `Yes. Our team works remotely with ${cityName} clients and is available 24/7. You get a dedicated project manager, direct access to engineers and fortnightly demos.` },
    { question: `How much does ${lc(name)} cost in ${cityName}?`, answer: costAnswer },
    { question: `How long does it take to build ${/^[aeiou]/i.test(name) ? "an" : "a"} ${lc(name)} solution for a ${cityName} business?`, answer: timelineAnswer },
    { question: `Can you meet us in ${cityName}?`, answer: `Most work runs over video calls. For larger programmes we can arrange on-site workshops or go-live visits in ${cityName}.` },
    { question: `Which payment methods will the product support in ${cityName}?`, answer: ctx.market.payments ? `${list(ctx.market.payments)} — plus cards and international wallets where your customers need them.` : "Cards, bank transfers and the local wallets your customers use, confirmed during discovery." },
    // Database pages keep every service FAQ (tuning, audit, migration, ongoing support).
    ...pb.faqs.slice(0, isDatabaseService(vertical.slug) ? pb.faqs.length : 2),
  ];

  return {
    title: `${name} in ${cityName}, ${countryName}`,
    metaDescription: `${name} for ${cityName} businesses: 24/7 support, first release in ${pb.mvpWeeks}, ${ctx.market.payments ? `${ctx.market.payments[0]} integration, ` : ""}fixed quote in 5 days.`.slice(0, 300),
    h1: `${name} in ${cityName}`,
    answer,
    intro,
    keyFacts: keyFactsFor(ctx, cityName),
    whyHere,
    considerations,
    delivery: deliveryBlocks(ctx, place, pb),
    timelineAnswer,
    costAnswer,
    faqs,
    keywords: [...pb.keywords.slice(0, 3).map((k) => `${k} ${cityName}`), `${lc(name)} company ${cityName}`, `${lc(name)} ${cityName} ${countryName}`],
  };
}

// Topic-agnostic local brief for pages that are not solution pages
// (services, industries, /en-xx hubs): facts, local requirements and
// 24/7 availability for a country or city.
export function buildMarketBrief(ctx: LocationContext, placeName: string, countryName: string, topic: string, isCity = false) {
  const c = ctx.country;
  const o = ctx.overlap;
  const considerations: LocalConsideration[] = [
    { title: "Currency & pricing", body: c?.currency ? `Prices, invoices and reports in ${c.currency.name} (${c.currency.code}), with the transaction currency and FX rate stored on every record for cross-border sales.` : "Multi-currency pricing with the FX rate stored on every record." },
    { title: "Tax (VAT / GST)", body: ctx.market.tax ? `${countryName} applies ${ctx.market.tax}. We build tax-correct pricing, invoice fields and exportable tax reports; your accountant confirms treatment for your products.` : `Configurable tax rules, invoice fields and exportable tax reports for ${countryName}.` },
    { title: "Payments", body: ctx.market.payments ? `Customers in ${placeName} expect ${list(ctx.market.payments)} — integrated with automatic reconciliation.` : `Cards, bank transfers and local wallets, integrated with automatic reconciliation.` },
    { title: "Data protection", body: `${ctx.market.privacyLaw ? `Personal data is governed by ${ctx.market.privacyLaw}.` : `${countryName}'s data-protection rules apply.`} We build consent, encryption, access logs and in-region hosting where required.` },
    { title: "24/7 availability", body: `${o ? `${placeName} is on ${o.offsetLabel} (${o.diffLabel}). ` : ""}Our team works 24/7, so your full business day and any out-of-hours incident are covered.` },
    { title: "Delivery timeline", body: `Discovery starts within 5 business days of a signed proposal. Most ${lc(topic)} engagements ship a first production release in 6–14 weeks, with demos every two weeks.` },
  ];
  const faqs: FaqItem[] = [
    { question: `Do you work with ${lc(topic)} clients in ${placeName}?`, answer: `Yes. We deliver remotely to ${placeName} with 24/7 availability, a single project manager, fortnightly demos and full source-code ownership.` },
    { question: `Which currency and taxes apply to projects in ${countryName}?`, answer: `${c?.currency ? `We can quote in USD or ${c.currency.code}. ` : ""}Our services are exported from India and generally invoiced without Indian GST; many ${countryName} businesses then self-account for local ${ctx.market.tax?.split(" ")[0] || "VAT/GST"} under reverse charge — confirm with your accountant.` },
    { question: `How quickly can you start a project in ${placeName}?`, answer: "Discovery can begin within 5 business days of a signed proposal; dedicated developers can start within 1–2 weeks." },
  ];
  return { keyFacts: keyFactsFor(ctx, isCity ? placeName : undefined), considerations, faqs };
}
