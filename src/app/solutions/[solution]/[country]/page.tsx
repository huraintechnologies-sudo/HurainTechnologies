import { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceVerticals } from "@/data/service-verticals";
import { countries } from "@/data/countries";
import { siteConfig } from "@/lib/site-config";
import { localeForCountrySlug } from "@/lib/locale";
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

export async function generateStaticParams() {
  // Limit pre-rendering to top 2 solutions × 10 top countries (~20 pages)
  // Rest use on-demand ISR (Vercel will cache on first visit)
  const topVerticals = serviceVerticals.slice(0, 2);
  const topCountries = countries.slice(0, 10);
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

      {/* Main Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us for {vertical.name} in {countryData.countryName}?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Hurain Technologies brings specialized {vertical.name.toLowerCase()} expertise to {countryData.countryName}.
              We understand the local market dynamics, business landscape, and regulatory requirements specific to {countryData.countryName}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Local Expertise</h3>
                <p className="text-sm text-gray-600">
                  Deep understanding of {countryData.countryName}'s market, business culture, and industry requirements.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Global Standards</h3>
                <p className="text-sm text-gray-600">
                  Enterprise-grade development that meets international quality and compliance standards.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Rapid Delivery</h3>
                <p className="text-sm text-gray-600">
                  Quick turnaround times with agile development methodology and local support.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-sm text-gray-600">
                  Local support team available for {countryData.countryName} businesses with timezone alignment.
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{vertical.name} Services in {countryData.countryName}</h2>
            <div className="space-y-4">
              {[
                { title: "Custom Development", items: ["Full-stack development", "MVP to full product", "Custom features", "Legacy system modernization"] },
                { title: "Technical Support", items: ["24/7 technical support", "Performance optimization", "Security updates", "Feature enhancements"] },
                { title: "Integration Services", items: ["Third-party integrations", "API development", "Local payment integration", "Enterprise system integration"] },
              ].map((service) => (
                <div key={service.title} className="border rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">{service.title}</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.items.map((item) => (
                      <li key={item} className="text-gray-600 text-sm">✓ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Why {Country} */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why {countryData.countryName} for {vertical.name}?</h2>
            <p className="text-gray-600 mb-6">
              {countryData.countryName} presents unique opportunities for {vertical.name.toLowerCase()} development.
              With 16+ years of experience, we've successfully delivered solutions to 2,000+ businesses globally,
              including many in {countryData.countryName}.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">16+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">2000+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Client Retention</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your {vertical.name} Project in {countryData.countryName}?</h2>
            <p className="mb-6 text-blue-100">
              Let's discuss how we can help you build a world-class {vertical.name.toLowerCase()} solution for your {countryData.countryName} business.
            </p>
            <a
              href={`${siteConfig.url}/contact`}
              className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
