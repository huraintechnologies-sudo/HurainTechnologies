import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

// Visible breadcrumb trail + BreadcrumbList JSON-LD. Pages that already emit
// a BreadcrumbList inside their own @graph pass withSchema={false} so Google
// doesn't see two competing lists.
export function Breadcrumbs({ items, withSchema = true }: { items: { name: string; href: string }[]; withSchema?: boolean }) {
  const full = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      {withSchema && <JsonLd data={breadcrumbJsonLd(full.map((i) => ({ name: i.name, url: `${siteConfig.url}${i.href}` })))} />}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {full.map((item, index) => (
          <span key={`breadcrumb-${index}-${item.href}`} className="flex items-center gap-1.5">
            {index > 0 && <Icon name="chevron" className="w-3 h-3 -rotate-90 shrink-0" />}
            {index === full.length - 1 ? (
              <span className="text-foreground/70">{item.name}</span>
            ) : (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
