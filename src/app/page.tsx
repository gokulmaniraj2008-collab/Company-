import { Rocket, CheckCircle2 } from "lucide-react";

const COMMITMENTS = [
  "Give founders a real decision center, not just a dashboard of vanity metrics.",
  "Make execution visible — every manager and team member sees how their work connects to the bigger plan.",
  "Codify how the company runs, so culture and process survive growth and turnover.",
  "Replace scattered docs and chat threads with one documentation hub that's actually searchable.",
];

export default function MissionPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-crimson-600/30 bg-crimson-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-crimson-400">
          <Rocket className="h-3.5 w-3.5" />
          Our Mission
        </span>
        <h1 className="mt-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Build the operating system every growing company needs, but almost
          none have.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-400">
          We build software that turns a founder&apos;s vision into a running
          company — with the structure, accountability, and visibility to
          scale without losing what made it work in the first place.
        </p>
      </div>

      <div className="mt-20">
        <h2 className="font-display text-2xl font-bold text-white">
          What we commit to
        </h2>
        <div className="mt-8 space-y-4">
          {COMMITMENTS.map((item) => (
            <div key={item} className="surface flex items-start gap-4 rounded-xl p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crimson-500" />
              <p className="text-base leading-relaxed text-ink-200">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
