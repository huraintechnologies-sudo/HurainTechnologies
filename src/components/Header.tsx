"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { NAV_LINKS } from "@/lib/site-config";

// Slim menu data, built on the server in layout.tsx. Importing the full
// services/industries content files here would ship ~190KB of page copy to
// every visitor because this is a client component.
export interface HeaderNav {
  services: { slug: string; navLabel: string; category: string }[];
  serviceVerticals: { id: string; slug: string; name: string; category: string }[];
  industries: { slug: string; name: string }[];
}

export function Header({ nav }: { nav: HeaderNav }) {
  const { services, serviceVerticals, industries } = nav;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  // Mobile menu uses its own accordion state — separate from the desktop
  // hover-driven dropdowns above, which don't apply on touch devices.
  const [mobileSection, setMobileSection] = useState<"services" | "solutions" | "industries" | "company" | null>(null);
  const toggleMobileSection = (section: "services" | "solutions" | "industries" | "company") => {
    setMobileSection((current) => (current === section ? null : section));
  };

  return (
    <header className="theme-dark sticky top-0 z-50 border-b border-border/80 !bg-background/85 backdrop-blur-xl">
      {/* Top strip */}
      <div className="hidden sm:block border-b border-border/60">
        <Container className="flex h-8 items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
          <span>Software engineering since 2010 · Palanpur, Gujarat, India</span>
          <span className="flex items-center gap-4">
            <span>2,000+ projects</span>
            <span className="text-border">/</span>
            <span>98% client retention</span>
          </span>
        </Container>
      </div>

      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/85 hover:text-foreground transition-colors">
              Services
              <Icon name="chevron" className="w-3.5 h-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 w-[560px]">
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-2 card-glow">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="rounded-lg px-3 py-2.5 text-sm text-foreground/85 hover:bg-surface-2 hover:text-primary transition-colors"
                    >
                      <span className="block font-medium">{service.navLabel}</span>
                      <span className="block text-xs text-muted mt-0.5">{service.category}</span>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="col-span-2 mt-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-primary hover:bg-surface-2 transition-colors"
                  >
                    View all services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/75 hover:text-foreground transition-colors">
              Solutions
              <Icon name="chevron" className="w-3.5 h-3.5" />
            </button>
            {solutionsOpen && (
              <div className="absolute left-0 top-full pt-2 w-[500px]">
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-2 card-glow">
                  {serviceVerticals.slice(0, 12).map((vertical) => (
                    <Link
                      key={vertical.id}
                      href={`/solutions/${vertical.slug}`}
                      className="rounded-lg px-3 py-2.5 text-sm text-foreground/85 hover:bg-surface-2 hover:text-primary transition-colors"
                    >
                      <span className="block font-medium">{vertical.name}</span>
                      <span className="block text-xs text-muted mt-0.5">{vertical.category}</span>
                    </Link>
                  ))}
                  <Link
                    href="/solutions"
                    className="col-span-2 mt-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-primary hover:bg-surface-2 transition-colors"
                  >
                    View all solutions →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/75 hover:text-foreground transition-colors">
              Industries
              <Icon name="chevron" className="w-3.5 h-3.5" />
            </button>
            {industriesOpen && (
              <div className="absolute left-0 top-full pt-2 w-[500px]">
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-2 card-glow">
                  {industries.slice(0, 12).map((industry) => (
                    <Link
                      key={industry.slug}
                      href={`/industries/${industry.slug}`}
                      className="rounded-lg px-3 py-2.5 text-sm text-foreground/85 hover:bg-surface-2 hover:text-primary transition-colors"
                    >
                      <span className="block font-medium">{industry.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/industries"
                    className="col-span-2 mt-1 rounded-lg px-3 py-2 text-center text-sm font-medium text-primary hover:bg-surface-2 transition-colors"
                  >
                    View all industries →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/75 hover:text-foreground transition-colors">
              Company
              <Icon name="chevron" className="w-3.5 h-3.5" />
            </button>
            {companyOpen && (
              <div className="absolute right-0 top-full pt-2 w-[280px]">
                <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-2 card-glow">
                  <Link
                    href="/case-studies"
                    className="rounded-lg px-3 py-2.5 text-sm text-foreground/85 hover:bg-surface-2 hover:text-primary transition-colors"
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-lg px-3 py-2.5 text-sm text-foreground/85 hover:bg-surface-2 hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/blog"
                    className="rounded-lg px-3 py-2.5 text-sm text-foreground/85 hover:bg-surface-2 hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/careers"
                    className="rounded-lg px-3 py-2.5 text-sm text-foreground/85 hover:bg-surface-2 hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                  <Link
                    href="/markets-we-cover"
                    className="rounded-lg px-3 py-2.5 text-sm text-foreground/85 hover:bg-surface-2 hover:text-primary transition-colors"
                  >
                    Markets We Cover
                  </Link>
                  <div className="border-t border-border/50 my-1" />
                  <Link
                    href="/contact"
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary hover:bg-surface-2 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.filter((l) => l.label !== "Services" && l.label !== "Home" && l.label !== "Industries" && l.label !== "Case Studies" && l.label !== "About" && l.label !== "Blog" && l.label !== "Careers" && l.label !== "Contact").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-foreground/75 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-background hover:bg-primary/90 transition-colors"
          >
            Book a Consultation
            <Icon name="arrow" className="w-4 h-4" />
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => {
            setMobileOpen((v) => !v);
            setMobileSection(null);
          }}
          aria-label="Toggle menu"
        >
          <Icon name={mobileOpen ? "close" : "menu"} className="w-6 h-6" />
        </button>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain">
          <Container className="py-4 flex flex-col gap-1">
            {/* Mobile Services (accordion) */}
            <div className="border-b border-border/30 pb-1">
              <button
                type="button"
                onClick={() => toggleMobileSection("services")}
                aria-expanded={mobileSection === "services"}
                className="w-full flex items-center justify-between px-2 py-3.5 text-[17px] font-medium text-foreground/90 hover:text-foreground"
              >
                Services
                <Icon
                  name="chevron"
                  className={`w-4 h-4 transition-transform ${mobileSection === "services" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileSection === "services" && (
                <div className="ml-4 flex flex-col gap-1 mt-1 pb-2">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="px-2 py-2 text-sm text-foreground/70 hover:text-primary"
                    >
                      {service.navLabel}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-sm font-medium text-primary"
                  >
                    View all services →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Solutions (accordion) */}
            <div className="border-b border-border/30 pb-1">
              <button
                type="button"
                onClick={() => toggleMobileSection("solutions")}
                aria-expanded={mobileSection === "solutions"}
                className="w-full flex items-center justify-between px-2 py-3.5 text-[17px] font-medium text-foreground/90 hover:text-foreground"
              >
                Solutions
                <Icon
                  name="chevron"
                  className={`w-4 h-4 transition-transform ${mobileSection === "solutions" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileSection === "solutions" && (
                <div className="ml-4 flex flex-col gap-1 mt-1 pb-2">
                  {serviceVerticals.map((vertical) => (
                    <Link
                      key={vertical.id}
                      href={`/solutions/${vertical.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="px-2 py-2 text-sm text-foreground/70 hover:text-primary"
                    >
                      {vertical.name}
                    </Link>
                  ))}
                  <Link
                    href="/solutions"
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-sm font-medium text-primary"
                  >
                    View all solutions →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Industries (accordion) */}
            <div className="border-b border-border/30 pb-1">
              <button
                type="button"
                onClick={() => toggleMobileSection("industries")}
                aria-expanded={mobileSection === "industries"}
                className="w-full flex items-center justify-between px-2 py-3.5 text-[17px] font-medium text-foreground/90 hover:text-foreground"
              >
                Industries
                <Icon
                  name="chevron"
                  className={`w-4 h-4 transition-transform ${mobileSection === "industries" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileSection === "industries" && (
                <div className="ml-4 flex flex-col gap-1 mt-1 pb-2">
                  {industries.map((industry) => (
                    <Link
                      key={industry.slug}
                      href={`/industries/${industry.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="px-2 py-2 text-sm text-foreground/70 hover:text-primary"
                    >
                      {industry.name}
                    </Link>
                  ))}
                  <Link
                    href="/industries"
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-sm font-medium text-primary"
                  >
                    View all industries →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Company (accordion) */}
            <div className="pb-1">
              <button
                type="button"
                onClick={() => toggleMobileSection("company")}
                aria-expanded={mobileSection === "company"}
                className="w-full flex items-center justify-between px-2 py-3.5 text-[17px] font-medium text-foreground/90 hover:text-foreground"
              >
                Company
                <Icon
                  name="chevron"
                  className={`w-4 h-4 transition-transform ${mobileSection === "company" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileSection === "company" && (
                <div className="ml-4 flex flex-col gap-1 mt-1 pb-2">
                  <Link
                    href="/case-studies"
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-sm text-foreground/70 hover:text-primary"
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-sm text-foreground/70 hover:text-primary"
                  >
                    About
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-sm text-foreground/70 hover:text-primary"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/careers"
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-sm text-foreground/70 hover:text-primary"
                  >
                    Careers
                  </Link>
                  <Link
                    href="/markets-we-cover"
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-2 text-sm text-foreground/70 hover:text-primary"
                  >
                    Markets We Cover
                  </Link>
                </div>
              )}
            </div>

            {NAV_LINKS.filter((l) => l.label !== "Services" && l.label !== "Home" && l.label !== "Industries" && l.label !== "Case Studies" && l.label !== "About" && l.label !== "Blog" && l.label !== "Careers" && l.label !== "Contact").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-3.5 text-[17px] font-medium text-foreground/90 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-background"
            >
              Book a Consultation
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
