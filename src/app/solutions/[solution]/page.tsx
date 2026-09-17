import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { serviceVerticals } from "@/data/service-verticals";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { getServiceImage } from "@/lib/unsplash-service";

interface Props {
  params: Promise<{
    solution: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { solution } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);

  if (!vertical) return notFound();

  const titleSuffix = vertical.name.toLowerCase().includes("development") ? "" : " Development";
  const title = `${vertical.name}${titleSuffix} | Expert Services by Hurain Technologies`;
  const description = `Professional ${vertical.name.toLowerCase()} development services. ${vertical.description} 16+ years experience delivering ${vertical.name.toLowerCase()} solutions for global businesses.`;
  const keywords = vertical.keywords.join(", ");

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/solutions/${vertical.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return serviceVerticals.map((vertical) => ({
    solution: vertical.slug,
  }));
}

export default async function SolutionVerticalPage({ params }: Props) {
  const { solution } = await params;
  const vertical = serviceVerticals.find((v) => v.slug === solution);

  if (!vertical) return notFound();

  // Fetch unique image for this solution
  const solutionImage = await getServiceImage(vertical.name);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      {solutionImage && (
        <div className="relative h-64 md:h-96 overflow-hidden">
          <Image
            src={solutionImage.url}
            alt={solutionImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/40" />
        </div>
      )}

      <section className="py-16 px-4 md:px-8 -mt-8 relative z-10 bg-white rounded-t-2xl mx-4 md:mx-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Link href="/solutions" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              ← Back to Solutions
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {vertical.name.toLowerCase().includes("development") ? vertical.name : `${vertical.name} Development`}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Expert {vertical.name.toLowerCase()} development services with 16+ years of proven experience.
            Custom solutions for businesses of all sizes, from startups to enterprises.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Custom Development", "Expert Team", "Fast Delivery", "Quality Assured", "24/7 Support"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is {vertical.name}?</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {vertical.description} At Hurain Technologies, we specialize in delivering comprehensive {vertical.name.toLowerCase()}
            solutions that drive business growth and digital transformation. Our team of experienced developers understands the unique
            requirements of {vertical.name.toLowerCase()} projects and delivers solutions that exceed expectations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Why {vertical.name}?</h3>
              <p className="text-gray-600 mb-4">
                {vertical.name} is essential for modern businesses looking to:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Improve customer engagement and retention</li>
                <li>✓ Streamline business operations</li>
                <li>✓ Increase revenue and market reach</li>
                <li>✓ Scale with technology infrastructure</li>
                <li>✓ Ensure security and compliance</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Expertise</h3>
              <p className="text-gray-600 mb-4">
                Hurain Technologies brings deep expertise in:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Custom development from scratch</li>
                <li>✓ MVP to full product scaling</li>
                <li>✓ Legacy system modernization</li>
                <li>✓ Performance optimization</li>
                <li>✓ Enterprise solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our {vertical.name} Services</h2>
          <p className="text-lg text-gray-600 mb-8">
            We offer comprehensive {vertical.name.toLowerCase()} development services tailored to your specific business needs:
          </p>

          <div className="space-y-6">
            {[
              {
                title: "Custom Development",
                items: [
                  "Bespoke application development from concept to launch",
                  "Full-stack development using latest technologies",
                  "Scalable architecture design and implementation",
                  "API development and third-party integrations",
                ]
              },
              {
                title: "MVP Development",
                items: [
                  "Rapid prototype development for market testing",
                  "Lean methodology for faster time-to-market",
                  "Cost-effective solutions for startups",
                  "Flexibility to pivot based on market feedback",
                ]
              },
              {
                title: "Legacy Modernization",
                items: [
                  "Migrate outdated systems to modern platforms",
                  "Code refactoring and performance optimization",
                  "Database migration and optimization",
                  "Minimal downtime deployment strategies",
                ]
              },
              {
                title: "Maintenance & Support",
                items: [
                  "24/7 technical support and monitoring",
                  "Regular updates and security patches",
                  "Performance optimization and scaling",
                  "Bug fixes and feature enhancements",
                ]
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-600 flex gap-3">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Hurain Technologies for {vertical.name}?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">16+</div>
              <h3 className="font-bold text-gray-900 mb-2">Years Experience</h3>
              <p className="text-sm text-gray-600">
                Proven track record delivering {vertical.name.toLowerCase()} solutions across industries
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-lg border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">2000+</div>
              <h3 className="font-bold text-gray-900 mb-2">Projects Delivered</h3>
              <p className="text-sm text-gray-600">
                Successfully completed {vertical.name.toLowerCase()} projects for global clients
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-lg border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <h3 className="font-bold text-gray-900 mb-2">Client Retention</h3>
              <p className="text-sm text-gray-600">
                High satisfaction rate with long-term client relationships
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Advantages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Experienced development team with diverse skill sets",
              "Agile development methodology for flexibility",
              "Quality assurance at every stage of development",
              "Transparent communication and regular updates",
              "Competitive pricing without compromising quality",
              "Post-launch support and maintenance",
              "Scalable solutions for growing businesses",
              "Industry best practices and latest technologies",
            ].map((advantage, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-blue-600 font-bold text-lg">✓</span>
                <span className="text-gray-600">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack for {vertical.name}</h2>
          <p className="text-lg text-gray-600 mb-8">
            We leverage cutting-edge technologies and frameworks to build robust, scalable {vertical.name.toLowerCase()} solutions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                category: "Frontend",
                tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Angular"]
              },
              {
                category: "Backend",
                tech: ["Node.js", "Python", "Java", "Go", "Ruby on Rails", ".NET Core"]
              },
              {
                category: "Databases",
                tech: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Elasticsearch", "Firebase"]
              },
              {
                category: "Cloud & DevOps",
                tech: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "CI/CD Pipelines"]
              },
              {
                category: "Mobile",
                tech: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin", "Ionic"]
              },
              {
                category: "Tools & Services",
                tech: ["Git", "Jenkins", "GitHub Actions", "Datadog", "Sentry", "Jira"]
              }
            ].map((stack, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Development Process</h2>
          <p className="text-lg text-gray-600 mb-8">
            We follow a proven development methodology that ensures project success:
          </p>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                desc: "We understand your business needs, goals, and requirements. Our team conducts thorough analysis to create a comprehensive project plan."
              },
              {
                step: "02",
                title: "Design & Architecture",
                desc: "Our architects design scalable, secure solutions that meet all requirements. We create wireframes, prototypes, and technical specifications."
              },
              {
                step: "03",
                title: "Development",
                desc: "Experienced developers build your solution using agile methodology. Regular code reviews and quality checks ensure excellence."
              },
              {
                step: "04",
                title: "Testing & QA",
                desc: "Comprehensive testing including unit, integration, and end-to-end testing. We ensure zero defects and optimal performance."
              },
              {
                step: "05",
                title: "Deployment & Launch",
                desc: "We deploy your solution to production with minimal downtime. Post-launch monitoring ensures smooth operations."
              },
              {
                step: "06",
                title: "Support & Maintenance",
                desc: "Ongoing support, maintenance, and optimization. We continuously improve your solution based on user feedback and performance metrics."
              }
            ].map((phase) => (
              <div key={phase.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white font-bold text-lg">
                    {phase.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                  <p className="text-gray-600">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Availability */}
      <section className="py-16 px-4 md:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{vertical.name} Services by Location</h2>
          <p className="text-lg text-gray-600 mb-8">
            We provide {vertical.name.toLowerCase()} development services to businesses worldwide. Explore our services by location:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "United Kingdom", slug: "united-kingdom" },
              { name: "United States", slug: "united-states" },
              { name: "United Arab Emirates", slug: "united-arab-emirates" },
              { name: "India", slug: "india" },
              { name: "Germany", slug: "germany" },
              { name: "Canada", slug: "canada" },
              { name: "Australia", slug: "australia" },
              { name: "Singapore", slug: "singapore" },
              { name: "Mexico", slug: "mexico" },
            ].map((country) => (
              <Link
                key={country.slug}
                href={`/solutions/${vertical.slug}/${country.slug}`}
                className="p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-600 hover:shadow-lg transition-all text-center font-medium text-blue-600 hover:text-blue-800"
              >
                {country.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "How long does a typical project take?",
                a: "Project timelines vary based on complexity and scope. MVP development typically takes 3-6 months, while full-scale applications may take 6-12 months. We provide detailed timelines during the planning phase."
              },
              {
                q: "What is your pricing model?",
                a: "We offer flexible pricing options including fixed-price projects, time & material engagement, and dedicated team models. We'll work with you to find the best fit for your budget and requirements."
              },
              {
                q: "Do you provide post-launch support?",
                a: "Yes, we provide comprehensive post-launch support including bug fixes, performance optimization, security updates, and feature enhancements. Support packages can be customized to your needs."
              },
              {
                q: "What technologies do you work with?",
                a: "We work with a wide range of modern technologies including React, Node.js, Python, Go, Flutter, React Native, and cloud platforms like AWS, Google Cloud, and Azure."
              },
              {
                q: "Can you work with our existing team?",
                a: "Absolutely! We can augment your existing development team, work alongside your developers, or take full ownership of the project. We're flexible and collaborative in our approach."
              },
              {
                q: "How do you ensure code quality?",
                a: "We implement rigorous quality assurance processes including code reviews, automated testing, security audits, and comprehensive QA testing before deployment."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your {vertical.name} Solution?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Our experienced team is ready to help you bring your {vertical.name.toLowerCase()} project to life.
            Get in touch with us today for a free consultation and project assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${siteConfig.url}/contact`}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Schedule Free Consultation
            </a>
            <a
              href={`${siteConfig.url}/case-studies`}
              className="px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-colors border border-blue-500 inline-block"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceVerticals.filter(v => v.slug !== vertical.slug).slice(0, 3).map((related) => (
              <Link
                key={related.slug}
                href={`/solutions/${related.slug}`}
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-gray-900 mb-2 hover:text-blue-600">{related.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{related.description}</p>
                <span className="text-blue-600 font-medium hover:underline">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
