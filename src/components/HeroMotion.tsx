// Hero backdrop: a neutral light from above over a fine dot matrix that fades
// out toward the edges. Static and cheap to paint on mobile.
export function HeroMotion({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(236,235,230,0.14) 1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 70% at 70% 0%, black 10%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 70% 0%, black 10%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[520px]"
        style={{ background: "radial-gradient(ellipse 60% 100% at 65% 0%, rgba(236,235,230,0.07), transparent 70%)" }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </div>
  );
}
