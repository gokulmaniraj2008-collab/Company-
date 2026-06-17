import type { LucideIcon } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ModulePlaceholder({ title, description, icon: Icon }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-crimson-600/10 text-crimson-500">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="mt-5 font-display text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-400">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-ink-500">
        Built in the next slice
      </span>
    </div>
  );
}
