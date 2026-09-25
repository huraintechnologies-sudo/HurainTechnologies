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
        <p className={`eyebrow flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-6 bg-primary" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-3xl text-foreground sm:text-[2.6rem]">{title}</h2>
      {description && <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">{description}</p>}
    </div>
  );
}
