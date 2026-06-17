import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-white">
        <span className="font-display text-sm font-black tracking-tight text-ink-950">
          D
        </span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-crimson-600 transition-transform group-hover:scale-125" />
      </span>
      <span className="font-display text-[15px] font-bold tracking-tight text-white">
        DRYNN<span className="text-crimson-600"> OS</span>
      </span>
    </Link>
  );
}
