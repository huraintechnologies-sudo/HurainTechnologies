import { Metadata } from "next";
import Link from "next/link";
import { ServiceVerticalGrid } from "@/components/ServiceVerticalGrid";
import { siteConfig } from "@/lib/site-config";
import { localeForCountrySlug } from "@/lib/locale";
import { countries } from "@/data/countries";

// Exclude Pakistan, Israel, China, Japan
const excludedCountries = ["pakistan", "israel", "china", "japan"];
const filteredCountries = countries.filter(
  (c) => !excludedCountries.includes(c.slug.toLowerCase())
);

export const metadata: Metadata = {
  title: "Mobile App, E-Commerce & Fintech Development Solutions | Hurain Technologies",
  description: "Custom software solutions for mobile apps, e-commerce platforms, fintech, healthcare, food delivery, retail & AI. 14+ specialized development verticals with 16+ years expertise.",
  openGraph: {
    title: "Mobile App, E-Commerce & Fintech Development Solutions | Hurain Technologies",
    description: "Professional development solutions across 14+ business verticals including mobile apps, e-commerce, fintech, healthcare, and emerging technologies",
    url: `${siteConfig.url}/solutions`,
  },
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Solutions for Every Business Vertical
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Hurain Technologies delivers specialized software solutions across diverse industries.
            From mobile apps to blockchain platforms, we have the expertise to transform your business.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-gray-600">Industry Verticals</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">60+</div>
              <div className="text-sm text-gray-600">Markets Served</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">2000+</div>
              <div className="text-sm text-gray-600">Projects Delivered</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <ServiceVerticalGrid />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Our Solutions?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-4">16+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Years of Experience</h3>
              <p className="text-gray-600">
                Proven track record building enterprise solutions across multiple industries and technologies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-4">300+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Startups Launched</h3>
              <p className="text-gray-600">
                From MVP to scale-up, we've supported 300+ startups in reaching their business goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-4">50+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Specialists</h3>
              <p className="text-gray-600">
                Dedicated team of architects, engineers, and specialists across all technology domains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Technology Stack</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Frontend & Mobile</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Vue.js", "Angular", "React Native", "Flutter", "iOS", "Android"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Backend & Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Python", "Go", "Java", "PostgreSQL", "MongoDB", "AWS", "Kubernetes"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Blockchain & Web3</h3>
              <div className="flex flex-wrap gap-2">
                {["Ethereum", "Solidity", "Polygon", "Web3.js", "Smart Contracts", "NFTs", "DeFi"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">AI & Analytics</h3>
              <div className="flex flex-wrap gap-2">
                {["TensorFlow", "PyTorch", "OpenAI", "Machine Learning", "Data Analytics", "BigQuery"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 md:px-8 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Development Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Discovery", description: "Understand your business requirements and vision" },
              { step: "02", title: "Strategy", description: "Create technical roadmap and architecture" },
              { step: "03", title: "Development", description: "Build with agile methodology and best practices" },
              { step: "04", title: "Testing", description: "Comprehensive QA and security audits" },
              { step: "05", title: "Launch", description: "Deploy with monitoring and 24/7 support" },
            ].map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{item.step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Availability Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Markets We Serve</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Our solution verticals are available across {filteredCountries.length}+ countries. Click on any country to explore local expertise and city-specific availability.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
            {filteredCountries.map((country) => (
              <Link
                key={country.slug}
                href={`/${localeForCountrySlug(country.slug)}`}
                className="p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-600 hover:shadow-md transition-all text-center text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                {country.countryName}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/markets-we-cover"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              View All Markets →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Solution?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Let's discuss how Hurain Technologies can help transform your business with our specialized solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${siteConfig.url}/contact`}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started Today
            </a>
            <a
              href={`${siteConfig.url}/case-studies`}
              className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors inline-block border border-blue-500"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
