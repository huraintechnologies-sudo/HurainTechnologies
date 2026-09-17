import Link from "next/link";
import { cities } from "@/data/cities";

interface CityLinksGridProps {
  countrySlug: string;
  countryName: string;
  solutionSlug: string;
  solutionName: string;
}

export function CityLinksGrid({
  countrySlug,
  countryName,
  solutionSlug,
  solutionName,
}: CityLinksGridProps) {
  const countryCities = cities
    .filter((city) => city.countrySlug === countrySlug)
    .sort((a, b) => a.cityName.localeCompare(b.cityName));

  if (countryCities.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 pb-3 border-b-4 border-blue-600">
          {solutionName} Services in Major {countryName} Cities
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl">
          Explore our specialized {solutionName.toLowerCase()} services across {countryName}'s
          major cities. Whether you're in a tier-1 metro or emerging city, our local teams
          provide expert development and 24/7 support tailored to your city's unique market
          dynamics.
        </p>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countryCities.map((city) => (
            <Link
              key={city.slug}
              href={`/solutions/${solutionSlug}/${countrySlug}/${city.slug}`}
              className="group relative overflow-hidden bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/10 transition-all duration-300" />

              {/* City Badge */}
              <div className="relative z-10">
                <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 group-hover:bg-blue-200 transition-colors">
                  City
                </div>

                {/* City Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {city.cityName}
                </h3>

                {/* State/Region */}
                <p className="text-sm text-gray-600 mb-4">{city.state}</p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  <span>Learn more</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Statistics Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {countryCities.length}+
              </div>
              <p className="text-gray-600">Major Cities Covered</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <p className="text-gray-600">Local Support Available</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600">Local Market Coverage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
