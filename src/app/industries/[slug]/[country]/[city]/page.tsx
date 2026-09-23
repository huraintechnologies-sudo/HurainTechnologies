import { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, getIndustryBySlug } from "@/data/industries";
import { getCountryBySlug } from "@/data/countries";
import { cities } from "@/data/cities";
import { cities as curatedCities } from "@/data/cities-curated";
import { getServiceBySlug } from "@/data/services";
import { getIndustryPlaybook, industryAsVertical } from "@/data/industry-playbooks";
import { buildMetadata } from "@/lib/seo";
import { locationContext, getCityFacts } from "@/lib/geo-facts";
import { buildCityContent } from "@/lib/solution-location-content";
import { locationPageJsonLd, placeJsonLd } from "@/lib/location-seo";
import { cityDisplayName } from "@/lib/location-links";
import { localeForCountrySlug } from "@/lib/locale";
import { SolutionLocationPage } from "@/components/location/SolutionLocationPage";

interface Props {
  params: Promise<{ slug: string; country: string; city: string }>;
}

// Near-static content: revalidate monthly. Curated cities are pre-rendered;
// every other city renders on first request via ISR (nothing 404s).
export const revalidate = 2592000;

export function generateStaticParams() {
  return industries.flatMap((i) => curatedCities.map((c) => ({ slug: i.slug, country: c.countrySlug, city: c.slug })));
}

function load(slug: string, country: string, city: string) {
  const industry = getIndustryBySlug(slug);
  const countryData = getCountryBySlug(country);
  const cityData = cities.find((c) => c.slug === city && c.countrySlug === country);
  const playbook = getIndustryPlaybook(slug);
  if (!industry || !countryData || !cityData || !playbook) return null;
  const ctx = locationContext(country, city);
  const cityName = cityDisplayName(cityData, ctx.city);
  const content = buildCityContent(industryAsVertical(industry, playbook.localAngleAs), playbook, ctx, cityName, countryData.countryName);
  content.h1 = `${industry.name} Software Development in ${cityName}`;
  content.title = `${industry.name} Software Development in ${cityName}, ${countryData.countryName}`;
  return { industry, countryData, cityName, playbook, ctx, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, country, city } = await params;
  const d = load(slug, country, city);
  if (!d) return {};
  const meta = buildMetadata({ title: d.content.title, description: d.content.metaDescription, path: `/industries/${slug}/${country}/${city}`, keywords: d.content.keywords });
  const image = d.ctx.city?.image || d.ctx.country?.image || d.playbook.heroImage.src;
  return { ...meta, openGraph: { ...meta.openGraph, images: [{ url: image, alt: `${d.industry.name} software in ${d.cityName}` }] } };
}

export default async function IndustryCityPage({ params }: Props) {
  const { slug, country, city } = await params;
  const d = load(slug, country, city);
  if (!d) notFound();
  const { industry, countryData, cityName, playbook, ctx, content } = d;
  const countryName = countryData.countryName;
  const path = `/industries/${industry.slug}/${country}/${city}`;

  const breadcrumbs = [
    { name: "Industries", href: "/industries" },
    { name: industry.name, href: `/industries/${industry.slug}` },
    { name: countryName, href: `/industries/${industry.slug}/${country}` },
    { name: cityName, href: path },
  ];

  const cf = ctx.city;
  const photo = cf?.image
    ? { src: cf.image, alt: `${cityName}, ${countryName}`, width: cf.imageWidth, height: cf.imageHeight, commonsFile: cf.imageFile }
    : ctx.country?.image
      ? { src: ctx.country.image, alt: ctx.country.imageCaption ? `${ctx.country.imageCaption}, ${countryName}` : countryName, width: ctx.country.imageWidth, height: ctx.country.imageHeight, commonsFile: ctx.country.imageFile }
      : { src: playbook.heroImage.src, alt: `${industry.name} software in ${cityName}` };

  const siblings = cities
    .filter((c) => c.countrySlug === country && c.slug !== city)
    .map((c) => ({ name: cityDisplayName(c, getCityFacts(country, c.slug)), href: `/industries/${industry.slug}/${country}/${c.slug}`, pop: getCityFacts(country, c.slug)?.population || 0 }))
    .sort((a, b) => b.pop - a.pop)
    .slice(0, 16);

  const locale = localeForCountrySlug(country);
  const jsonLd = locationPageJsonLd({
    path,
    name: content.title,
    description: content.metaDescription,
    serviceName: `${industry.name} software development in ${cityName}`,
    serviceType: `${industry.name} software development`,
    image: photo.src,
    area: placeJsonLd(countryName, ctx.country, cityName, cf),
    faqs: content.faqs,
    breadcrumbs,
    currency: ctx.country?.currency?.code,
  });

  return (
    <SolutionLocationPage
      solutionName={`${industry.name} Software`}
      placeLabel={`${cityName}, ${countryName}`}
      content={content}
      playbook={playbook}
      photo={photo}
      breadcrumbs={breadcrumbs}
      jsonLd={jsonLd}
      nearbyTitle={`${industry.name} software in other ${countryName} cities`}
      nearby={[{ name: `All of ${countryName}`, href: `/industries/${industry.slug}/${country}` }, ...siblings]}
      otherTitle={`Other industries we serve in ${cityName}`}
      basePathLabel="industries"
      otherSolutions={industries.filter((i) => i.slug !== industry.slug).map((i) => ({ name: i.name, href: `/industries/${i.slug}/${country}/${city}` }))}
      relatedServices={[
        ...playbook.relatedServices.map((s) => getServiceBySlug(s)).filter(Boolean).map((s) => ({ name: `${s!.navLabel} in ${cityName}`, href: `/services/${s!.slug}/${country}/${city}` })),
        ...(locale ? [{ name: `${cityName} technology overview`, href: `/${locale}/${city}` }] : []),
      ]}
    />
  );
}
