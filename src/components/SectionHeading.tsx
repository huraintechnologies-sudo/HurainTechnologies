export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>}
    </div>
  );
}
