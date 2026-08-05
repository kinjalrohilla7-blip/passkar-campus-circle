import { cn } from "@/lib/utils";

export function PassKarMark({
  className,
  strokeWidth = 4.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 43V10" />
        <path d="M16 10a11 11 0 1 1 0 22" />
        <path d="M21 27.6 15 32l6 4.4" />
      </g>
    </svg>
  );
}

export function PassKarLogo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-forest", className)}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest text-[color:var(--ivory)]">
        <PassKarMark className="h-5 w-5" strokeWidth={5} />
      </span>
      {!compact && (
        <span className="font-display text-[1.35rem] leading-none font-medium tracking-tight text-foreground">
          PassKar
        </span>
      )}
    </span>
  );
}
