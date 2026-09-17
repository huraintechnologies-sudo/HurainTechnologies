import { Metadata } from "next";
import { countries } from "@/data/countries";
import { cities } from "@/data/cities";
import { siteConfig } from "@/lib/site-config";
import { localeForCountrySlug } from "@/lib/locale";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Markets We Cover — 23 Countries, 1,100+ Cities | Hurain Technologies",
  description: "Blockchain, fintech, and software development services across 23 countries and 1,100+ demand hub cities. See where we deliver expertise.",
  keywords: [
    "global markets",
    "international blockchain development",
    "worldwide fintech services",
    "software development countries",
    "crypto services worldwide",
  ],
};

export default function MarketsPage() {
  // Exclude Pakistan, Israel, China, Japan
  const excludedCountries = ["pakistan", "israel", "china", "japan"];
  const filteredCountries = countries.filter(
    (c) => !excludedCountries.includes(c.slug.toLowerCase())
  );

  // Group cities by country
  const citiesByCountry = filteredCountries.map((country) => {
    const countryCities = cities.filter((c) => c.countrySlug === country.slug);
    return {
      country,
      cities: countryCities.sort((a, b) => a.cityName.localeCompare(b.cityName)),
    };
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Markets We Cover
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Blockchain, cryptocurrency, fintech, and software development services across{" "}
            <strong>23 countries</strong> and <strong>1,100+ demand hub cities</strong>
          </p>
          <p className="text-lg text-gray-600">
            16+ years of experience delivering solutions to regulated digital businesses worldwide.
          </p>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {citiesByCountry.map(({ country, cities: countryCities }) => (
              <div key={country.slug} className="border-l-4 border-blue-600 pl-6">
                <div className="mb-4">
                  <Link
                    href={`/${localeForCountrySlug(country.slug)}`}
                    className="text-2xl font-bold text-blue-600 hover:underline"
                  >
                    {country.countryName}
                  </Link>
                  <p className="text-gray-600 mt-2">
                    {countryCities.length} demand hub cities
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {countryCities.slice(0, 50).map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${localeForCountrySlug(city.countrySlug)}/${city.slug}`}
                      className="text-blue-500 hover:text-blue-700 hover:underline text-sm"
                    >
                      {city.cityName}
                    </Link>
                  ))}
                  {countryCities.length > 50 && (
                    <span className="text-gray-500 text-sm">
                      + {countryCities.length - 50} more cities
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{filteredCountries.length}</div>
            <div className="text-gray-700">Countries Served</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1,149+</div>
            <div className="text-gray-700">Demand Hub Cities</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">14</div>
            <div className="text-gray-700">Solution Verticals</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">16+</div>
            <div className="text-gray-700">Years Experience</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Services Available in All Markets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Blockchain & Crypto</h3>
              <p className="text-gray-600 text-sm">
                Smart contracts, DeFi platforms, Web3 solutions
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Fintech Solutions</h3>
              <p className="text-gray-600 text-sm">
                Payment infrastructure, lending platforms, open banking APIs
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Software Development</h3>
              <p className="text-gray-600 text-sm">
                Mobile apps, web platforms, cloud solutions
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Cloud Modernization</h3>
              <p className="text-gray-600 text-sm">
                Legacy migration, microservices, DevOps
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Security & Compliance</h3>
              <p className="text-gray-600 text-sm">
                AML-KYC, cybersecurity, regulatory solutions
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">AI & Fraud Detection</h3>
              <p className="text-gray-600 text-sm">
                Machine learning models, fraud prevention systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build in Your Market?</h2>
          <p className="text-lg mb-8">
            Whether you're in one of our priority markets or looking to expand to new regions,
            our team can deliver blockchain, fintech, and software solutions to regulated
            businesses worldwide.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
