export function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-surface px-5 py-6 text-center">
          <p className="text-2xl font-bold gradient-text sm:text-3xl">{stat.value}</p>
          <p className="mt-1.5 text-xs text-muted sm:text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
