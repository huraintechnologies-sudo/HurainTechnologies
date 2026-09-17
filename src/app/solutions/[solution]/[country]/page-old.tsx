import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { siteConfig } from "@/lib/site-config";
import { localeForCountrySlug } from "@/lib/locale";
import { getCountryMarketContent, getCountryKeywords } from "@/lib/solution-country-content";
import Link from "next/link";

interface Props {
  params: Promise<{
    solution: string;
    country: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution, country } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countries.find((c) => c.slug === country);

  if (!vertical || !countryData) return notFound();

  const titleSuffix = vertical.name.toLowerCase().includes("development") ? "" : " Development";
  const title = `${vertical.name}${titleSuffix} in ${countryData.countryName} | Expert Services by Hurain Technologies`;
  const description = `Professional ${vertical.name.toLowerCase()} development services in ${countryData.countryName}. Local expertise, global standards. 16+ years experience serving ${countryData.countryName} businesses. Custom solutions from MVP to enterprise.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/solutions/${solution}/${country}`,
    },
  };
}

export const revalidate = 3600; // ISR: revalidate every hour
export const dynamicParams = true; // Enable on-demand ISR for ALL country combinations

export async function generateStaticParams() {
  // Pre-render popular combinations only (Vercel handles the rest via ISR)
  // Top 5 solutions × Top 20 countries = 100 pre-rendered pages
  // ALL other combinations (5000+ pages) generated on-demand via ISR
  const topVerticals = serviceVerticals.slice(0, 5);
  const topCountries = countries.slice(0, 20);
  return topVerticals.flatMap((vertical) =>
    topCountries.map((country) => ({
      solution: vertical.slug,
      country: country.slug,
    }))
  );
}

export default async function SolutionCountryPage({ params }: Props) {
  const { solution, country } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);
  const countryData = countries.find((c) => c.slug === country);

  if (!vertical || !countryData) return notFound();

  const content = getCountryMarketContent(countryData.countryName, vertical.name);
  const keywords = getCountryKeywords(countryData.countryName, vertical.keywords);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Link href={`/solutions/${vertical.slug}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              ← Back to {vertical.name}
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {vertical.name} in {countryData.countryName}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Expert {vertical.name.toLowerCase()} development services for businesses in {countryData.countryName}.
            Specialized expertise meeting local requirements and regulatory standards.
          </p>
        </div>
      </section>

      {/* Main Content - Rich, Comprehensive with Beautiful Design */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* Market Overview - Styled Section */}
          <div className="bg-gradient-to-r from-blue-600/5 to-indigo-600/5 border-l-4 border-blue-600 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: content.marketOverview
              .replace(/\n/g, '<br/>')
              .replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0">')
              .replace(/<br\/>/g, '</h3><p class="text-gray-700 leading-relaxed mb-4">') + '</p>'
            }} className="text-gray-700 leading-relaxed" />
          </div>

          {/* Why Country Matters */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: content.whyCountryMatters.replace(/\n/g, '<br/>') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Detailed Services */}
          <div>
            <div dangerouslySetInnerHTML={{ __html: content.detailedServices.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-xl font-bold text-gray-900 mt-6 mb-3">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Technology Stack */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: content.technologyStack.replace(/\n/g, '<br/>').replace(/\*\*/g, '<strong>').replace(/::/g, '</strong>:') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Implementation Process */}
          <div>
            <div dangerouslySetInnerHTML={{ __html: content.implementationProcess.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Case Studies */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: content.casesAndExamples.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* FAQ */}
          <div>
            <div dangerouslySetInnerHTML={{ __html: content.faq.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Why Choose Us */}
          <div className="border-2 border-blue-200 p-8 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: content.whyChooseUs.replace(/\n/g, '<br/>').replace(/###/g, '<h4 class="text-lg font-bold text-gray-900 mt-3 mb-2">').replace(/##/g, '<h3 class="text-2xl font-bold text-gray-900 mb-4">') }} className="text-gray-700 leading-relaxed space-y-4" />
          </div>

          {/* Stats Section */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">16+</div>
                <div className="text-gray-700 font-semibold">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">2000+</div>
                <div className="text-gray-700 font-semibold">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-700 font-semibold">Client Retention</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your {vertical.name} Project in {countryData.countryName}?</h2>
            <p className="mb-6 text-blue-100 text-lg">
              Let's discuss how we can help you build a world-class {vertical.name.toLowerCase()} solution for your {countryData.countryName} business.
            </p>
            <a
              href={`${siteConfig.url}/contact`}
              className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get a Free Consultation
            </a>
          </div>

          {/* Keywords for SEO (hidden) */}
          <div className="hidden">
            <p>{keywords.join(', ')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
