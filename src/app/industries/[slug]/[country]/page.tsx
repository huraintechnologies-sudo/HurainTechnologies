import { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, getIndustryBySlug } from "@/data/industries";
import { getCountryBySlug, priorityCountries } from "@/data/countries";
import { cities } from "@/data/cities";
import { getServiceBySlug } from "@/data/services";
import { getIndustryPlaybook, industryAsVertical } from "@/data/industry-playbooks";
import { buildMetadata } from "@/lib/seo";
import { locationContext, getCityFacts } from "@/lib/geo-facts";
import { buildCountryContent } from "@/lib/solution-location-content";
import { countryHreflang, locationPageJsonLd, placeJsonLd } from "@/lib/location-seo";
import { sameRegionCountries, cityDisplayName } from "@/lib/location-links";
import { SolutionLocationPage } from "@/components/location/SolutionLocationPage";

interface Props {
  params: Promise<{ slug: string; country: string }>;
}

// Near-static content: revalidate monthly. Priority countries are pre-rendered;
// every other country renders on first request via ISR (nothing 404s).
export const revalidate = 2592000;

export function generateStaticParams() {
  return industries.flatMap((i) => priorityCountries.map((c) => ({ slug: i.slug, country: c.slug })));
}

function load(slug: string, country: string) {
  const industry = getIndustryBySlug(slug);
  const countryData = getCountryBySlug(country);
  const playbook = getIndustryPlaybook(slug);
  if (!industry || !countryData || !playbook) return null;
  const ctx = locationContext(country);
  const content = buildCountryContent(industryAsVertical(industry, playbook.localAngleAs), playbook, ctx, countryData.countryName);
  // Industry pages read better as "<Industry> Software Development in <Country>".
  content.h1 = `${industry.name} Software Development in ${countryData.countryName}`;
  content.title = `${industry.name} Software Development in ${countryData.countryName}${ctx.country?.currency ? ` | ${ctx.country.currency.code} Pricing` : ""}`;
  return { industry, countryData, playbook, ctx, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, country } = await params;
  const d = load(slug, country);
  if (!d) return {};
  const meta = buildMetadata({ title: d.content.title, description: d.content.metaDescription, path: `/industries/${slug}/${country}`, keywords: d.content.keywords });
  const image = d.ctx.country?.image || d.playbook.heroImage.src;
  return {
    ...meta,
    alternates: { canonical: meta.alternates?.canonical, languages: countryHreflang(`/industries/${slug}`, `/industries/${slug}`) },
    openGraph: { ...meta.openGraph, images: [{ url: image, alt: `${d.industry.name} software in ${d.countryData.countryName}` }] },
  };
}

export default async function IndustryCountryPage({ params }: Props) {
  const { slug, country } = await params;
  const d = load(slug, country);
  if (!d) notFound();
  const { industry, countryData, playbook, ctx, content } = d;
  const countryName = countryData.countryName;
  const path = `/industries/${industry.slug}/${country}`;

  const breadcrumbs = [
    { name: "Industries", href: "/industries" },
    { name: industry.name, href: `/industries/${industry.slug}` },
    { name: countryName, href: path },
  ];

  const f = ctx.country;
  const photo = f?.image
    ? { src: f.image, alt: f.imageCaption && f.imageCaption !== countryName ? `${f.imageCaption}, ${countryName}` : countryName, width: f.imageWidth, height: f.imageHeight, commonsFile: f.imageFile }
    : { src: playbook.heroImage.src, alt: `${industry.name} software in ${countryName}` };

  const countryCities = cities
    .filter((c) => c.countrySlug === country)
    .map((c) => ({ name: cityDisplayName(c, getCityFacts(country, c.slug)), href: `${path}/${c.slug}`, pop: getCityFacts(country, c.slug)?.population || 0 }))
    .sort((a, b) => b.pop - a.pop)
    .slice(0, 24);

  const jsonLd = locationPageJsonLd({
    path,
    name: content.title,
    description: content.metaDescription,
    serviceName: `${industry.name} software development in ${countryName}`,
    serviceType: `${industry.name} software development`,
    image: photo.src,
    area: placeJsonLd(countryName, f),
    faqs: content.faqs,
    breadcrumbs,
    currency: f?.currency?.code,
  });

  return (
    <SolutionLocationPage
      solutionName={`${industry.name} Software`}
      placeLabel={countryName}
      content={content}
      playbook={playbook}
      photo={photo}
      breadcrumbs={breadcrumbs}
      jsonLd={jsonLd}
      nearbyTitle={`${industry.name} software by city in ${countryName}`}
      nearby={countryCities}
      otherTitle={`Other industries we serve in ${countryName}`}
      basePathLabel="industries"
      otherSolutions={industries.filter((i) => i.slug !== industry.slug).map((i) => ({ name: i.name, href: `/industries/${i.slug}/${country}` }))}
      relatedServices={playbook.relatedServices.map((s) => getServiceBySlug(s)).filter(Boolean).map((s) => ({ name: `${s!.navLabel} in ${countryName}`, href: `/services/${s!.slug}/${country}` }))}
      regulatoryNotes={countryData.regulatoryNotes}
      regionLinks={sameRegionCountries(country, 12).map((c) => ({ name: c.countryName, href: `/industries/${industry.slug}/${c.slug}` }))}
    />
  );
}
