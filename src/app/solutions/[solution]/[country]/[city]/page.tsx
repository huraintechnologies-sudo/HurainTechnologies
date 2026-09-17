import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { siteConfig } from "@/lib/site-config";
import { localeForCountrySlug } from "@/lib/locale";
import { getCityMarketContent } from "@/lib/solution-city-content";
import { JsonLd } from "@/components/JsonLd";
import { strongestSolutionCityJsonLd, breadcrumbJsonLd } from "@/lib/jsonld-enhanced";
import { getCityPageSchemas } from "@/lib/jsonld-universal";
import { buildSolutionCityPageKeywords } from "@/lib/keywords-builder";
import Link from "next/link";

interface Props {
  params: Promise<{
    solution: string;
    country: string;
    city: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution, country, city } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countries.find((c) => c.slug === country);
  const cityData = cities.find((c) => c.slug === city && c.countrySlug === country);

  if (!vertical || !countryData || !cityData) return notFound();

  const titleSuffix = vertical.name.toLowerCase().includes("development") ? "" : " Development";
  const serviceLabel = vertical.name.toLowerCase().includes("development") ? vertical.name : `${vertical.name} Development`;
  const title = `${vertical.name}${titleSuffix} in ${cityData.cityName} | Local ${serviceLabel} Services | Hurain Technologies`;
  const description = `Professional ${vertical.name.toLowerCase()} development services in ${cityData.cityName}, ${countryData.countryName}. Local team, 24/7 support. Custom solutions for ${cityData.cityName} businesses. 16+ years expertise.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/solutions/${solution}/${country}/${city}`,
    },
  };
}

export const revalidate = 3600; // ISR: revalidate every hour
export const dynamicParams = true; // Enable on-demand ISR for ALL city combinations

export async function generateStaticParams() {
  // Pre-render popular combinations only (Vercel handles the rest via ISR)
  // Top 3 solutions × Top 10 cities = 30 pre-rendered pages
  // ALL other combinations (1000+ pages) generated on-demand via ISR
  const topVerticals = serviceVerticals.slice(0, 3);
  const topCities = cities.slice(0, 10);
  return topVerticals.flatMap((vertical) =>
    topCities.map((city) => ({
      solution: vertical.slug,
      country: city.countrySlug,
      city: city.slug,
    }))
  );
}

export default async function SolutionCityPage({ params }: Props) {
  const { solution, country, city } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countries.find((c) => c.slug === country);
  const cityData = cities.find((c) => c.slug === city && c.countrySlug === country);

  if (!vertical || !countryData || !cityData) return notFound();

  const content = getCityMarketContent(cityData.cityName, countryData.countryName, vertical.name);

  // Breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Solutions", url: `${siteConfig.url}/solutions` },
    { name: vertical.name, url: `${siteConfig.url}/solutions/${vertical.slug}` },
    { name: countryData.countryName, url: `${siteConfig.url}/solutions/${vertical.slug}/${country}` },
    { name: cityData.cityName, url: `${siteConfig.url}/solutions/${vertical.slug}/${country}/${city}` },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data - STRONGEST schemas for Google ranking */}
      <JsonLd
        data={getCityPageSchemas(
          strongestSolutionCityJsonLd(
            {
              name: vertical.name,
              slug: vertical.slug,
              keywords: buildSolutionCityPageKeywords(vertical.name, cityData.cityName, countryData.countryName).split(", ")
            },
            cityData.cityName,
            countryData.countryName,
            { lat: cityData.coordinates?.lat || 0, lng: cityData.coordinates?.lng || 0 }
          ),
          breadcrumbJsonLd(breadcrumbItems)
        )}
      />

      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 flex gap-2">
            <Link href={`/solutions/${vertical.slug}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              {vertical.name}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/solutions/${vertical.slug}/${country}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              {countryData.countryName}
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {vertical.name} in {cityData.cityName}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Expert {vertical.name.toLowerCase()} development services in {cityData.cityName}, {countryData.countryName}.
            Local expertise with global standards. Serving {cityData.cityName}'s thriving tech community.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Local Team", "24/7 Support", "Fast Delivery", "Quality Focused"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Rich, Comprehensive */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* City Introduction */}
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.cityIntro.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Market Dynamics */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: content.marketDynamics.replace(/\n/g, '<br/>').replace(/\*\*/g, '<strong>').replace(/::/g, '</strong>:') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Local Services */}
          <div>
            <div dangerouslySetInnerHTML={{ __html: content.localServices.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Success Stories */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: content.successStories.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Technical Expertise */}
          <div>
            <div dangerouslySetInnerHTML={{ __html: content.technicalExpertise.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">').replace(/\- /g, '<li>').replace(/\n<li>/g, '</li>\n<li>').replace(/\n$/g, '</li>') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Support & Maintenance */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: content.supportAndMaintenance.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">').replace(/\- /g, '<li>').replace(/\n<li>/g, '</li>\n<li>') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* FAQ */}
          <div>
            <div dangerouslySetInnerHTML={{ __html: content.faq.replace(/\n/g, '<br/>').replace(/\*\*Q:/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">Q:').replace(/\*\*A:/g, '</h4><p class="text-gray-700 mb-4">A:').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Why Choose Local Partner */}
          <div className="border-2 border-blue-200 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: content.whyChooseLocalPartner.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">').replace(/\- /g, '<li>') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Build Your {vertical.name} Solution in {cityData.cityName}?</h2>
            <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
              Let's discuss how we can help you build a world-class {vertical.name.toLowerCase()} solution for your {cityData.cityName} business.
              Our local team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`${siteConfig.url}/contact`}
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Schedule Consultation
              </a>
              <a
                href={`${siteConfig.url}/case-studies`}
                className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors border border-blue-500"
              >
                View Case Studies
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
