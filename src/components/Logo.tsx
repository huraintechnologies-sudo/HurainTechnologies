import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Hurain Technologies home">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-2 text-background font-bold text-lg">
        H
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-foreground">Hurain Technologies</span>
        <span className="text-[10px] tracking-wide text-muted uppercase">Hurain Engitech &amp; Trade</span>
      </span>
    </Link>
  );
}
