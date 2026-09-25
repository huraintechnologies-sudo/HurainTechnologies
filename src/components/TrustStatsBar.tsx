import { TRUST_STATS } from "@/lib/site-config";

export function TrustStatsBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
      {TRUST_STATS.map((stat) => (
        <div key={stat.label} className={`bg-background ${compact ? "px-4 py-4" : "px-5 py-6"}`}>
          <p className={`font-display leading-none text-foreground ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>
            {stat.value}
          </p>
          <p className="mt-2 text-[11px] leading-snug text-muted sm:text-xs">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
