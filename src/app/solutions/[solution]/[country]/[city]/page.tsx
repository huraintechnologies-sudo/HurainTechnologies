import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceVerticals } from "@/data/service-verticals";
import { cities as curatedCities } from "@/data/cities-curated";
import { getServiceBySlug } from "@/data/services";
import { getPlaybook } from "@/data/solution-playbooks";
import { buildMetadata } from "@/lib/seo";
import { locationContext, getCityFacts } from "@/lib/geo-facts";
import { buildCityContent } from "@/lib/solution-location-content";
import { locationPageJsonLd, placeJsonLd } from "@/lib/location-seo";
import { cityDisplayName } from "@/lib/location-links";
import { countryForSolution, cityForSolution, citiesForSolution } from "@/data/world-geo";
import { localeForCountrySlug } from "@/lib/locale";
import { getCountryBySlug } from "@/data/countries";
import { cities } from "@/data/cities";
import { SolutionLocationPage } from "@/components/location/SolutionLocationPage";

interface Props {
  params: Promise<{ solution: string; country: string; city: string }>;
}

// Near-static content: revalidate monthly. Curated cities are pre-rendered;
// every other city renders on first request via ISR (nothing 404s).
export const revalidate = 2592000;

export async function generateStaticParams() {
  return serviceVerticals.flatMap((v) => curatedCities.map((c) => ({ solution: v.slug, country: c.countrySlug, city: c.slug })));
}

function load(solution: string, country: string, city: string) {
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countryForSolution(solution, country);
  const cityData = cityForSolution(solution, country, city);
  const playbook = getPlaybook(solution);
  if (!vertical || !countryData || !cityData || !playbook) return null;
  const ctx = locationContext(country, city);
  const cityName = cityDisplayName(cityData, ctx.city);
  const content = buildCityContent(vertical, playbook, ctx, cityName, countryData.countryName);
  return { vertical, countryData, cityData, cityName, playbook, ctx, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution, country, city } = await params;
  const d = load(solution, country, city);
  if (!d) return {};
  const meta = buildMetadata({ title: d.content.title, description: d.content.metaDescription, path: `/solutions/${solution}/${country}/${city}`, keywords: d.content.keywords });
  const image = d.ctx.city?.image || d.ctx.country?.image || d.playbook.heroImage.src;
  return { ...meta, openGraph: { ...meta.openGraph, images: [{ url: image, alt: `${d.vertical.name} in ${d.cityName}` }] } };
}

export default async function SolutionCityPage({ params }: Props) {
  const { solution, country, city } = await params;
  const d = load(solution, country, city);
  if (!d) notFound();
  const { vertical, countryData, cityName, playbook, ctx, content } = d;
  const countryName = countryData.countryName;
  const path = `/solutions/${vertical.slug}/${country}/${city}`;

  const breadcrumbs = [
    { name: "Solutions", href: "/solutions" },
    { name: vertical.name, href: `/solutions/${vertical.slug}` },
    { name: countryName, href: `/solutions/${vertical.slug}/${country}` },
    { name: cityName, href: path },
  ];

  const cf = ctx.city;
  const photo = cf?.image
    ? { src: cf.image, alt: `${cityName}, ${countryName}`, width: cf.imageWidth, height: cf.imageHeight, commonsFile: cf.imageFile }
    : ctx.country?.image
      ? { src: ctx.country.image, alt: ctx.country.imageCaption ? `${ctx.country.imageCaption}, ${countryName}` : countryName, width: ctx.country.imageWidth, height: ctx.country.imageHeight, commonsFile: ctx.country.imageFile }
      : { src: playbook.heroImage.src, alt: `${vertical.name} in ${cityName}` };

  const siblings = citiesForSolution(vertical.slug, country)
    .filter((c) => c.slug !== city)
    .map((c) => ({ name: cityDisplayName(c, getCityFacts(country, c.slug)), href: `/solutions/${vertical.slug}/${country}/${c.slug}`, pop: getCityFacts(country, c.slug)?.population || 0 }))
    .sort((a, b) => b.pop - a.pop)
    .slice(0, 16);

  // Only link to pages that exist: world-only cities/countries have no
  // service or /en-xx pages, and other solutions may not cover this city.
  const inSiteGeo = !!getCountryBySlug(country) && cities.some((c) => c.countrySlug === country && c.slug === city);
  const locale = inSiteGeo ? localeForCountrySlug(country) : undefined;
  const jsonLd = locationPageJsonLd({
    path,
    name: content.title,
    description: content.metaDescription,
    serviceName: `${vertical.name} in ${cityName}`,
    serviceType: vertical.name,
    image: photo.src,
    area: placeJsonLd(countryName, ctx.country, cityName, cf),
    faqs: content.faqs,
    breadcrumbs,
    currency: ctx.country?.currency?.code,
  });

  return (
    <SolutionLocationPage
      solutionName={vertical.name}
      placeLabel={`${cityName}, ${countryName}`}
      content={content}
      playbook={playbook}
      photo={photo}
      breadcrumbs={breadcrumbs}
      jsonLd={jsonLd}
      nearbyTitle={`${vertical.name} in other ${countryName} cities`}
      nearby={[{ name: `All of ${countryName}`, href: `/solutions/${vertical.slug}/${country}` }, ...siblings]}
      otherSolutions={serviceVerticals.filter((v) => v.slug !== vertical.slug && cityForSolution(v.slug, country, city)).map((v) => ({ name: v.name, href: `/solutions/${v.slug}/${country}/${city}` }))}
      relatedServices={[
        ...(inSiteGeo ? playbook.relatedServices : []).map((s) => getServiceBySlug(s)).filter(Boolean).map((s) => ({ name: `${s!.navLabel} in ${cityName}`, href: `/services/${s!.slug}/${country}/${city}` })),
        ...(locale ? [{ name: `${cityName} technology overview`, href: `/${locale}/${city}` }] : []),
      ]}
    />
  );
}
