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
      className={`relative overflow-hidden rounded-t-2xl border-b border-border bg-gradient-to-br from-surface-2 via-surface to-background ${heights[size]}`}
    >
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/15 blur-2xl" />
      <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 p-4">
          <Icon name={icon} className={`${iconSizes[size]} text-primary`} />
        </div>
      </div>
      <span className="absolute left-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-primary backdrop-blur">
        {category}
      </span>
    </div>
  );
}
