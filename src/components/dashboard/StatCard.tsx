import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  icon: LucideIcon;
}

export function StatCard({ label, value, delta, icon: Icon }: StatCardProps) {
  return (
    <div className="surface rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-ink-500">
          {label}
        </span>
        <Icon className="h-4 w-4 text-ink-500" />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-bold text-white">{value}</span>
        {delta && (
          <span
            className={`text-xs font-semibold ${
              delta.positive ? "text-emerald-400" : "text-crimson-400"
            }`}
          >
            {delta.positive ? "+" : ""}
            {delta.value}
          </span>
        )}
      </div>
    </div>
  );
}
