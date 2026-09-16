import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";
import { siteConfig, FOOTER_LEGAL_LINKS } from "@/lib/site-config";
import { services } from "@/data/services";
import { countries } from "@/data/countries";
import { localeForCountrySlug } from "@/lib/locale";

export function Footer() {
  const year = new Date().getFullYear();
  const featuredCountries = countries.slice(0, 10);

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { name: "linkedin" as const, href: siteConfig.social.linkedin },
                { name: "twitter" as const, href: siteConfig.social.twitter },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label={s.name}
                >
                  <Icon name={s.name} className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2 text-sm text-muted">
              <p className="flex items-start gap-2">
                <Icon name="map" className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}, {siteConfig.address.country}</span>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="mail" className="w-4 h-4 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">{siteConfig.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <Icon name="phone" className="w-4 h-4 shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-primary">{siteConfig.phoneDisplay}</a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-muted hover:text-primary transition-colors">
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/about" className="text-sm text-muted hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/industries" className="text-sm text-muted hover:text-primary transition-colors">Industries</Link></li>
              <li><Link href="/case-studies" className="text-sm text-muted hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="text-sm text-muted hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-sm text-muted hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-muted hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Locations We Serve</h3>
            <ul className="mt-4 space-y-2.5">
              {featuredCountries.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${localeForCountrySlug(c.slug)}`} className="text-sm text-muted hover:text-primary transition-colors">
                    {c.countryName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="text-sm text-primary hover:underline">
                  View all locations →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-muted hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
