import { Icon } from "@/components/Icon";

type IconName = React.ComponentProps<typeof Icon>["name"];

const categoryIcon: Record<string, IconName> = {
  "Crypto & Web3": "blockchain",
  "Blockchain & Crypto": "blockchain",
  "Payments & PSPs": "payments",
  Payments: "payments",
  "Banking & Fintech": "banking",
  "API & Platform": "api",
  "Cloud & DevOps": "cloud",
  "Cloud Modernization": "cloud",
  "AI & Automation": "ai",
  "Security & Compliance": "security",
  "Enterprise SaaS & Platforms": "cloud",
  "HealthTech & InsurTech": "security",
};

export function CoverBanner({
  category,
  size = "md",
}: {
  category: string;
  size?: "sm" | "md" | "lg";
}) {
  const icon = categoryIcon[category] ?? "blockchain";
  const heights = { sm: "h-32", md: "h-44", lg: "h-64 sm:h-72" };
  const iconSizes = { sm: "w-10 h-10", md: "w-14 h-14", lg: "w-20 h-20" };

  return (
    <div
      className={`relative overflow-hidden rounded-t-2xl border-b border-border bg-surface-2 ${heights[size]}`}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(to right, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 100%",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name={icon} className={`${iconSizes[size]} text-foreground/40`} />
      </div>
      <span className="absolute left-4 top-4 rounded-md border border-border bg-background/80 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-foreground/80 backdrop-blur">
        {category}
      </span>
    </div>
  );
}
