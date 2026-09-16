import { TRUST_STATS } from "@/lib/site-config";

export function TrustStatsBar({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`grid grid-cols-2 gap-6 sm:grid-cols-3 ${compact ? "lg:grid-cols-6" : "lg:grid-cols-6"}`}
    >
      {TRUST_STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className={`font-bold gradient-text ${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}>
            {stat.value}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
