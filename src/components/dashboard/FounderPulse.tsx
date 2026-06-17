import { Activity } from "lucide-react";

interface PulseMetric {
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
}

export function FounderPulse({ metrics }: { metrics: PulseMetric[] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-crimson-600/20 bg-gradient-to-r from-ink-900 via-ink-900 to-ink-950 p-5">
      <div className="absolute inset-0 bg-crimson-glow opacity-40" />
      <div className="relative flex flex-wrap items-center gap-x-8 gap-y-3">
        <div className="flex items-center gap-2 text-crimson-500">
          <Activity className="h-4 w-4 animate-pulse-line" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Founder Pulse
          </span>
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-2">
              <span className="text-xs text-ink-500">{metric.label}</span>
              <span className="font-mono text-sm font-semibold text-white">
                {metric.value}
              </span>
              <TrendDot trend={metric.trend} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrendDot({ trend }: { trend: "up" | "down" | "flat" }) {
  const color =
    trend === "up"
      ? "bg-emerald-500"
      : trend === "down"
      ? "bg-crimson-500"
      : "bg-ink-500";
  return <span className={`h-1.5 w-1.5 rounded-full ${color}`} />;
}
