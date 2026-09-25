import { WHY_CHOOSE_US } from "@/lib/site-config";

export function WhyChooseUs() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow flex items-center gap-3">
          <span className="h-px w-6 bg-primary" aria-hidden="true" />
          {WHY_CHOOSE_US.eyebrow}
        </p>
        <h2 className="mt-4 text-3xl text-foreground sm:text-[2.6rem]">{WHY_CHOOSE_US.title}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">{WHY_CHOOSE_US.description}</p>
      </div>
      <ol className="lg:col-span-7 divide-y divide-border border-y border-border">
        {WHY_CHOOSE_US.points.map((point, i) => (
          <li key={point} className="flex items-baseline gap-5 py-5">
            <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[15px] leading-relaxed text-foreground/90">{point}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
