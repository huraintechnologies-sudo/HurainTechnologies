import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceVerticals } from "@/data/service-verticals";
import { priorityCountries as curatedCountries, getCountryBySlug } from "@/data/countries";
import { countryForSolution, citiesForSolution, isWorldSolution, worldCountries } from "@/data/world-geo";
import { getServiceBySlug } from "@/data/services";
import { getPlaybook } from "@/data/solution-playbooks";
import { buildMetadata } from "@/lib/seo";
import { locationContext, getCityFacts } from "@/lib/geo-facts";
import { buildCountryContent } from "@/lib/solution-location-content";
import { countryHreflang, locationPageJsonLd, placeJsonLd } from "@/lib/location-seo";
import { sameRegionCountries, sameRegionWorldCountries, cityDisplayName } from "@/lib/location-links";
import { SolutionLocationPage } from "@/components/location/SolutionLocationPage";

interface Props {
  params: Promise<{ solution: string; country: string }>;
}

// Near-static content: revalidate monthly. Curated countries are pre-rendered;
// every other country renders on first request via ISR (nothing 404s).
export const revalidate = 2592000;

export async function generateStaticParams() {
  return serviceVerticals.flatMap((v) => curatedCountries.map((c) => ({ solution: v.slug, country: c.slug })));
}

function load(solution: string, country: string) {
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countryForSolution(solution, country);
  const playbook = getPlaybook(solution);
  if (!vertical || !countryData || !playbook) return null;
  const ctx = locationContext(country);
  const content = buildCountryContent(vertical, playbook, ctx, countryData.countryName);
  return { vertical, countryData, playbook, ctx, content };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution, country } = await params;
  const d = load(solution, country);
  if (!d) return {};
  const path = `/solutions/${solution}/${country}`;
  const meta = buildMetadata({ title: d.content.title, description: d.content.metaDescription, path, keywords: d.content.keywords });
  const image = d.ctx.country?.image || d.playbook.heroImage.src;
  return {
    ...meta,
    alternates: { canonical: meta.alternates?.canonical, languages: isWorldSolution(solution) ? undefined : countryHreflang(`/solutions/${solution}`, `/solutions/${solution}`) },
    openGraph: { ...meta.openGraph, images: [{ url: image, alt: `${d.vertical.name} in ${d.countryData.countryName}` }] },
  };
}

export default async function SolutionCountryPage({ params }: Props) {
  const { solution, country } = await params;
  const d = load(solution, country);
  if (!d) notFound();
  const { vertical, countryData, playbook, ctx, content } = d;
  const countryName = countryData.countryName;
  const path = `/solutions/${vertical.slug}/${country}`;

  const breadcrumbs = [
    { name: "Solutions", href: "/solutions" },
    { name: vertical.name, href: `/solutions/${vertical.slug}` },
    { name: countryName, href: path },
  ];

  const f = ctx.country;
  const photo = f?.image
    ? { src: f.image, alt: f.imageCaption && f.imageCaption !== countryName ? `${f.imageCaption}, ${countryName}` : countryName, width: f.imageWidth, height: f.imageHeight, commonsFile: f.imageFile }
    : { src: playbook.heroImage.src, alt: `${vertical.name} in ${countryName}` };

  const countryCities = citiesForSolution(vertical.slug, country)
    .map((c) => ({ name: cityDisplayName(c, getCityFacts(country, c.slug)), href: `${path}/${c.slug}`, pop: getCityFacts(country, c.slug)?.population || 0 }))
    .sort((a, b) => b.pop - a.pop)
    .slice(0, 24);

  const jsonLd = locationPageJsonLd({
    path,
    name: content.title,
    description: content.metaDescription,
    serviceName: `${vertical.name} in ${countryName}`,
    serviceType: vertical.name,
    image: photo.src,
    area: placeJsonLd(countryName, f),
    faqs: content.faqs,
    breadcrumbs,
    currency: f?.currency?.code,
  });

  return (
    <SolutionLocationPage
      solutionName={vertical.name}
      placeLabel={countryName}
      content={content}
      playbook={playbook}
      photo={photo}
      breadcrumbs={breadcrumbs}
      jsonLd={jsonLd}
      nearbyTitle={`${vertical.name} by city in ${countryName}`}
      nearby={countryCities}
      otherSolutions={serviceVerticals.filter((v) => v.slug !== vertical.slug && countryForSolution(v.slug, country)).map((v) => ({ name: v.name, href: `/solutions/${v.slug}/${country}` }))}
      relatedServices={(getCountryBySlug(country) ? playbook.relatedServices : []).map((s) => getServiceBySlug(s)).filter(Boolean).map((s) => ({ name: `${s!.navLabel} in ${countryName}`, href: `/services/${s!.slug}/${country}` }))}
      regulatoryNotes={getCountryBySlug(country)?.regulatoryNotes}
      regionLinks={(isWorldSolution(vertical.slug) ? sameRegionWorldCountries(country, worldCountries, 12) : sameRegionCountries(country, 12)).map((c) => ({ name: c.countryName, href: `/solutions/${vertical.slug}/${c.slug}` }))}
    />
  );
}
