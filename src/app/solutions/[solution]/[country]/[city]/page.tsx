import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { siteConfig } from "@/lib/site-config";
import { localeForCountrySlug } from "@/lib/locale";
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

  return (
    <div className="min-h-screen bg-white">
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

      {/* Main Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{vertical.name} in {cityData.cityName}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Hurain Technologies has a dedicated team in {cityData.cityName} specializing in {vertical.name.toLowerCase()}.
              We bring global expertise combined with deep understanding of {cityData.cityName}'s unique market dynamics,
              business culture, and local opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3">Local Presence</h3>
                <p className="text-sm text-gray-600">
                  Office in {cityData.cityName} with local team understanding the market and available for in-person meetings.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3">Market Expertise</h3>
                <p className="text-sm text-gray-600">
                  Deep knowledge of {cityData.cityName}'s business landscape, competitive dynamics, and growth opportunities.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3">Quick Response</h3>
                <p className="text-sm text-gray-600">
                  Fast turnaround times and timezone-aligned support for {cityData.cityName}-based businesses.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-3">Industry Connections</h3>
                <p className="text-sm text-gray-600">
                  Strong network within {cityData.cityName}'s business, tech, and startup communities.
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{vertical.name} Services Available in {cityData.cityName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Development Services</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Custom {vertical.name.toLowerCase()} development</li>
                  <li>✓ MVP to full product scaling</li>
                  <li>✓ Feature development & enhancement</li>
                  <li>✓ Legacy system modernization</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Support & Maintenance</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ 24/7 technical support</li>
                  <li>✓ Performance optimization</li>
                  <li>✓ Security & compliance updates</li>
                  <li>✓ Continuous improvement</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why {City} */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why {cityData.cityName} for {vertical.name}?</h2>
            <p className="text-gray-600 mb-6">
              {cityData.cityName} is a thriving tech hub with growing demand for {vertical.name.toLowerCase()} services.
              With 16+ years of global experience and 2,000+ successful projects, we're equipped to help {cityData.cityName}
              businesses succeed in today's competitive market.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">16+</div>
                <div className="text-sm text-gray-600">Years of Experience</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">2000+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Client Retention Rate</div>
              </div>
            </div>
          </div>

          {/* Process */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>
            <div className="space-y-4">
              {[
                { step: "01", title: "Consultation", desc: "Understand your business goals and requirements" },
                { step: "02", title: "Strategy", desc: "Create technical roadmap and development plan" },
                { step: "03", title: "Development", desc: "Build with agile methodology and regular updates" },
                { step: "04", title: "Testing", desc: "Comprehensive QA and security audits" },
                { step: "05", title: "Launch", desc: "Deploy with monitoring and support" },
              ].map((phase) => (
                <div key={phase.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white font-bold">
                      {phase.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{phase.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
