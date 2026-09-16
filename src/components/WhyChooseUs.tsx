import { Icon } from "@/components/Icon";
import { WHY_CHOOSE_US } from "@/lib/site-config";

export function WhyChooseUs() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{WHY_CHOOSE_US.eyebrow}</p>
      <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {WHY_CHOOSE_US.title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{WHY_CHOOSE_US.description}</p>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {WHY_CHOOSE_US.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-4">
            <Icon name="check" className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <span className="text-sm text-foreground/85">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
