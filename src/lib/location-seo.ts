import { siteConfig } from "@/lib/site-config";
import { countries } from "@/data/countries";
import { localeForCountrySlug } from "@/lib/locale";
import { FaqItem } from "@/lib/types";
import { CityFacts, CountryFacts } from "@/lib/geo-facts";

// hreflang cluster for a family of country pages that share a base path,
// e.g. /solutions/fintech-app/{country}. Each country variant is tagged
// en-XX, and the global hub page is x-default. Every page in the cluster
// emits the same map, which keeps the annotations reciprocal.
export function countryHreflang(basePath: string, hubPath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const c of countries) {
    const locale = localeForCountrySlug(c.slug);
    if (!locale) continue;
    const [lang, region] = locale.split("-");
    languages[`${lang}-${region.toUpperCase()}`] = `${siteConfig.url}${basePath}/${c.slug}`;
  }
  languages["x-default"] = `${siteConfig.url}${hubPath}`;
  return languages;
}

const orgRef = { "@id": `${siteConfig.url}/#organization` };

export function placeJsonLd(countryName: string, country?: CountryFacts, cityName?: string, city?: CityFacts) {
  const countryNode = {
    "@type": "Country",
    name: countryName,
    ...(country?.code ? { identifier: country.code } : {}),
    ...(country?.wiki ? { sameAs: country.wiki } : {}),
  };
  if (!cityName) return countryNode;
  return {
    "@type": "City",
    name: cityName,
    containedInPlace: countryNode,
    ...(city?.lat != null && city?.lon != null ? { geo: { "@type": "GeoCoordinates", latitude: city.lat, longitude: city.lon } } : {}),
    ...(city?.wiki ? { sameAs: [city.wiki, ...(city.wikidata ? [`https://www.wikidata.org/wiki/${city.wikidata}`] : [])] } : {}),
  };
}

// WebPage + Service (with areaServed / ServiceArea) + FAQPage + BreadcrumbList
// in one @graph. We deliberately do NOT emit LocalBusiness with a local
// address: we have no office in each city, and a fake local address violates
// Google's structured-data guidelines. areaServed is the honest signal.
export function locationPageJsonLd(args: {
  path: string;
  name: string;
  description: string;
  serviceName: string;
  serviceType: string;
  image?: string;
  area: object;
  faqs: FaqItem[];
  breadcrumbs: { name: string; href: string }[];
  currency?: string | null;
}) {
  const url = `${siteConfig.url}${args.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: args.name,
        description: args.description,
        inLanguage: "en",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(args.image ? { primaryImageOfPage: { "@type": "ImageObject", url: args.image.startsWith("http") ? args.image : `${siteConfig.url}${args.image}` } } : {}),
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".quick-answer"] },
        dateModified: CONTENT_UPDATED,
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: args.serviceName,
        serviceType: args.serviceType,
        description: args.description,
        provider: orgRef,
        areaServed: args.area,
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${siteConfig.url}/contact`,
          servicePhone: siteConfig.phone,
          availableLanguage: ["English", "Hindi"],
        },
        ...(args.currency ? { offers: { "@type": "Offer", priceCurrency: args.currency, availability: "https://schema.org/InStock", url: `${siteConfig.url}/contact` } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [{ name: "Home", href: "/" }, ...args.breadcrumbs].map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: `${siteConfig.url}${b.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: args.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      },
    ],
  };
}

// Bump when location page content materially changes. Used for dateModified
// and sitemap <lastmod> so Google sees a stable, truthful freshness signal
// (a lastmod that changes on every request is ignored by Google).
export const CONTENT_UPDATED = "2026-09-24";
