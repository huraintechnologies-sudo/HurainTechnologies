import Link from "next/link";

// Monogram: two pillars joined by a rising bar — an "H" that reads as a
// connection scaling upward.
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4" y="3" width="7" height="26" rx="1.5" fill="currentColor" />
      <rect x="21" y="3" width="7" height="26" rx="1.5" fill="currentColor" />
      <path d="M11 20.5 21 11.5" stroke="var(--primary)" strokeWidth="4.5" strokeLinecap="butt" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Hurain Technologies home">
      <LogoMark className="h-7 w-7 text-foreground" />
      <span className="flex flex-col leading-none">
        <span className="text-[16px] font-semibold tracking-[-0.02em] text-foreground">
          Hurain<span className="font-normal text-foreground/60"> Technologies</span>
        </span>
        <span className="mt-1 hidden font-mono text-[9px] tracking-[0.14em] text-muted uppercase sm:block">
          Hurain Engitech &amp; Trade
        </span>
      </span>
    </Link>
  );
}
