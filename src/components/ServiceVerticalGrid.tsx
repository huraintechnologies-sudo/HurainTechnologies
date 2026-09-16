"use client";

import { useState } from "react";
import Link from "next/link";
import { serviceVerticals } from "@/data/service-verticals";
import { industries } from "@/data/industries";

export function ServiceVerticalGrid() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Application Development");
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);

  // Group verticals by category
  const groupedByCategory = serviceVerticals.reduce(
    (acc, vertical) => {
      if (!acc[vertical.category]) {
        acc[vertical.category] = [];
      }
      acc[vertical.category].push(vertical);
      return acc;
    },
    {} as Record<string, typeof serviceVerticals>
  );

  const categories = Object.keys(groupedByCategory).sort();

  return (
    <div className="w-full space-y-12 py-12">
      {/* Service Verticals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Header */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Solutions & Verticals →</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Hurain Technologies specializes in building industry-specific solutions across diverse sectors.
            Choose from our proven verticals to transform your business.
          </p>
        </div>

        {/* Right Column - Verticals */}
        <div className="lg:col-span-2 space-y-4">
          {categories.map((category) => (
            <div key={category} className="border rounded-lg overflow-hidden">
              {/* Category Header - Clickable */}
              <button
                onClick={() =>
                  setExpandedCategory(expandedCategory === category ? null : category)
                }
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-semibold text-gray-900 transition-colors"
              >
                <span>{category}</span>
                <span
                  className={`transform transition-transform ${
                    expandedCategory === category ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Category Items - Expandable */}
              {expandedCategory === category && (
                <div className="px-6 py-4 bg-white space-y-3 border-t">
                  {groupedByCategory[category].map((vertical) => (
                    <div key={vertical.id} className="pb-3 border-b last:border-b-0">
                      <Link
                        href={`/services/${vertical.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        {vertical.name}
                      </Link>
                      <p className="text-gray-600 text-xs mt-1">{vertical.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Industries Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t">
        {/* Left Column - Header */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Industries →</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Hurain Technologies is a product development & digital transformation company serving
            diverse industries with specialized expertise and proven solutions.
          </p>
        </div>

        {/* Right Column - Industries */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {/* Industry Experts */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Industry Experts</h3>
            <div className="space-y-2">
              {industries.slice(0, 6).map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium block"
                >
                  {industry.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Technology Experts */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Technology Expertise</h3>
            <div className="space-y-2">
              <Link href="/services/ai-fraud-detection-automation" className="text-blue-600 hover:text-blue-800 text-sm font-medium block">
                AI & Machine Learning
              </Link>
              <Link href="/services/blockchain-cryptocurrency-development" className="text-blue-600 hover:text-blue-800 text-sm font-medium block">
                Blockchain Technologies
              </Link>
              <Link href="/services/payment-gateway-integration" className="text-blue-600 hover:text-blue-800 text-sm font-medium block">
                Payment Solutions
              </Link>
              <Link href="/services/cloud-application-modernization" className="text-blue-600 hover:text-blue-800 text-sm font-medium block">
                Cloud & DevOps
              </Link>
              <Link href="/services/cybersecurity-compliance" className="text-blue-600 hover:text-blue-800 text-sm font-medium block">
                Security & Compliance
              </Link>
              <Link href="/services/api-integration-services" className="text-blue-600 hover:text-blue-800 text-sm font-medium block">
                Enterprise APIs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width - All Industries Expanded View */}
      <div className="pt-8 border-t">
        <div className="mb-6">
          <button
            onClick={() =>
              setExpandedIndustry(expandedIndustry ? null : "all")
            }
            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between font-semibold text-gray-900 rounded-lg transition-colors"
          >
            <span>View All Industries & Sectors</span>
            <span
              className={`transform transition-transform ${
                expandedIndustry ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {expandedIndustry && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 text-sm mb-2">
                    {industry.name}
                  </h4>
                  <p className="text-gray-600 text-xs">{industry.summary}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
