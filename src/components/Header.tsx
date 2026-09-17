"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { NAV_LINKS } from "@/lib/site-config";
import { services } from "@/data/services";
import { serviceVerticals } from "@/data/service-verticals";
import { industries } from "@/data/industries";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur">
      {/* Top Badge */}
      <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-b border-border/50 py-2">
        <Container className="flex items-center justify-center gap-2">
          <span className="text-xs font-semibold text-foreground/80">✓ 16+ Years of Excellence</span>
          <span className="text-xs text-foreground/60">|</span>
          <span className="text-xs text-foreground/80">2,000+ Projects Delivered</span>
          <span className="text-xs text-foreground/60">|</span>
          <span className="text-xs text-foreground/80">98% Client Retention</span>
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
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/85 hover:text-primary transition-colors">
              Services
              <Icon name="chevron" className="w-3.5 h-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 w-[560px]">
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-3 card-glow">
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
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/85 hover:text-primary transition-colors">
              Solutions
              <Icon name="chevron" className="w-3.5 h-3.5" />
            </button>
            {solutionsOpen && (
              <div className="absolute left-0 top-full pt-2 w-[500px]">
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-3 card-glow">
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
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/85 hover:text-primary transition-colors">
              Industries
              <Icon name="chevron" className="w-3.5 h-3.5" />
            </button>
            {industriesOpen && (
              <div className="absolute left-0 top-full pt-2 w-[500px]">
                <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-3 card-glow">
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
            <button className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/85 hover:text-primary transition-colors">
              Company
              <Icon name="chevron" className="w-3.5 h-3.5" />
            </button>
            {companyOpen && (
              <div className="absolute right-0 top-full pt-2 w-[280px]">
                <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-3 card-glow">
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
              className="px-3 py-2 text-sm text-foreground/85 hover:text-primary transition-colors"
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
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Icon name={mobileOpen ? "close" : "menu"} className="w-6 h-6" />
        </button>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <Container className="py-4 flex flex-col gap-2">
            {/* Mobile Services */}
            <div>
              <Link
                href="/services"
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2.5 text-sm font-medium text-foreground/85 hover:text-primary"
              >
                Services
              </Link>
              <div className="ml-4 flex flex-col gap-1 mt-1">
                {services.slice(0, 6).map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-1.5 text-xs text-foreground/70 hover:text-primary"
                  >
                    {service.navLabel}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Solutions */}
            <div>
              <Link
                href="/solutions"
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2.5 text-sm font-medium text-foreground/85 hover:text-primary"
              >
                Solutions
              </Link>
              <div className="ml-4 flex flex-col gap-1 mt-1">
                {serviceVerticals.slice(0, 6).map((vertical) => (
                  <Link
                    key={vertical.id}
                    href={`/solutions/${vertical.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-1.5 text-xs text-foreground/70 hover:text-primary"
                  >
                    {vertical.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Industries */}
            <div>
              <Link
                href="/industries"
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2.5 text-sm font-medium text-foreground/85 hover:text-primary"
              >
                Industries
              </Link>
              <div className="ml-4 flex flex-col gap-1 mt-1">
                {industries.slice(0, 6).map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="px-2 py-1.5 text-xs text-foreground/70 hover:text-primary"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Company */}
            <div className="border-t border-border/30 pt-2">
              <div className="px-2 py-2.5 text-sm font-medium text-foreground/85">
                Company
              </div>
              <div className="ml-4 flex flex-col gap-1 mt-1">
                <Link
                  href="/case-studies"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 text-xs text-foreground/70 hover:text-primary"
                >
                  Case Studies
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 text-xs text-foreground/70 hover:text-primary"
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 text-xs text-foreground/70 hover:text-primary"
                >
                  Blog
                </Link>
                <Link
                  href="/careers"
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-1.5 text-xs text-foreground/70 hover:text-primary"
                >
                  Careers
                </Link>
              </div>
            </div>

            {NAV_LINKS.filter((l) => l.label !== "Services" && l.label !== "Home" && l.label !== "Industries" && l.label !== "Case Studies" && l.label !== "About" && l.label !== "Blog" && l.label !== "Careers" && l.label !== "Contact").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2.5 text-sm text-foreground/85 hover:text-primary"
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
