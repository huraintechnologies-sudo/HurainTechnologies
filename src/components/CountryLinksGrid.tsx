import Link from "next/link";
import { Icon } from "@/components/Icon";
import { countries } from "@/data/countries";

export function CountryLinksGrid({ basePath }: { basePath: string }) {
  // Exclude certain countries per business requirements
  const excludedCountries = ["pakistan", "israel", "china", "japan"];
  const filteredCountries = countries.filter(
    (c) => !excludedCountries.includes(c.slug.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
      {filteredCountries.map((country, idx) => (
        <Link
          key={`country-${country.slug}-${idx}`}
          href={`${basePath}/${country.slug}`}
          prefetch={false}
          className="group flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm hover:border-primary/50 transition-colors"
        >
          <span className="text-foreground/85">{country.countryName}</span>
          <Icon name="arrow" className="w-3.5 h-3.5 text-muted group-hover:text-primary transition-colors" />
        </Link>
      ))}
    </div>
  );
}
