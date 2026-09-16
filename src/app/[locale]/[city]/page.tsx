import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities } from "@/data/cities";
import { countries } from "@/data/countries";
import { siteConfig } from "@/lib/site-config";
import { countrySlugForLocale } from "@/lib/locale";
import Link from "next/link";
import { generateCityPageContent } from "@/lib/content-generator";

interface Props {
  params: Promise<{
    locale: string;
    city: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city } = await params;
  const citySlug = city;
  const countrySlug = countrySlugForLocale(locale);
  if (!countrySlug) return notFound();
  const cityData = cities.find((c) => c.slug === citySlug && c.countrySlug === countrySlug);

  if (!cityData) return notFound();

  const title = `Blockchain, Cryptocurrency & Fintech Development in ${cityData.cityName} | Hurain Technologies`;
  const description = `Expert blockchain, cryptocurrency, and fintech development services in ${cityData.cityName}. Custom Web3 solutions for ${cityData.cityName} businesses. 16+ years experience, 2000+ projects delivered.`;

  return {
    title,
    description,
  };
}

// Disable static generation for city pages - they're dynamic
export const dynamic = "force-dynamic";

export default async function CityPage({ params }: Props) {
  const { locale, city } = await params;
  const citySlug = city;
  const countrySlug = countrySlugForLocale(locale);
  if (!countrySlug) return notFound();
  const cityData = cities.find((c) => c.slug === citySlug && c.countrySlug === countrySlug);
  const countryData = countries.find((c) => c.slug === countrySlug);

  if (!cityData || !countryData) return notFound();

  const content = generateCityPageContent(citySlug, countrySlug);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {cityData.cityName}, {countryData.countryName}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Expert blockchain development services for {cityData.cityName} businesses.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.replace(/^#/gm, "##") }} />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build in {cityData.cityName}?</h2>
          <a
            href={`${siteConfig.url}/contact`}
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100"
          >
            Get Free Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
