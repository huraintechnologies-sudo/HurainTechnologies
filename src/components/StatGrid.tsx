export function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface px-5 py-6">
          <p className="font-display text-3xl leading-none text-foreground sm:text-4xl">{stat.value}</p>
          <p className="mt-2 text-xs text-muted sm:text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
