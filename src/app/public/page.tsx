import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  ListChecks,
  BookOpen,
  TrendingUp,
  FileText,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const MODULES = [
  {
    icon: LayoutDashboard,
    title: "Founder Dashboard",
    description:
      "Company overview, active projects, team performance, and the decision center — all in one view.",
  },
  {
    icon: ListChecks,
    title: "Project & Task Management",
    description:
      "Plan execution, assign work, track priority and deadlines, and watch progress move in real time.",
  },
  {
    icon: BookOpen,
    title: "Company Book",
    description:
      "Your constitution, laws, roles, playbook, and SOPs — codified so the company runs the same way every time.",
  },
  {
    icon: FileText,
    title: "Documentation Hub",
    description:
      "SOPs, meeting notes, decisions, and lessons learned — searchable, never lost in a chat thread again.",
  },
  {
    icon: TrendingUp,
    title: "Growth Dashboard",
    description:
      "Users, revenue, growth rate, and product KPIs tracked against the metrics that actually matter.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description:
      "Founders, managers, and team members each get the exact view and permissions their role requires.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid-faint bg-grid">
        <div className="absolute inset-0 bg-crimson-glow" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-28 lg:px-8">
          <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-300">
            <span className="h-1.5 w-1.5 animate-pulse-line rounded-full bg-crimson-500" />
            The operating system for growing startups
          </span>

          <h1 className="animate-fade-up mx-auto mt-8 max-w-4xl text-balance font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            One platform to run your{" "}
            <span className="text-crimson-600">entire company.</span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-400"
            style={{ animationDelay: "0.1s" }}
          >
            DRYNN Founder OS combines your company handbook, project
            management, task tracking, documentation, and reporting into a
            single source of truth — for founders, managers, and every
            team member.
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "0.2s" }}
          >
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-crimson-600 px-6 py-3 text-sm font-semibold text-white shadow-crimson-sm transition-all hover:bg-crimson-700"
            >
              Start your workspace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/vision"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              Read our vision
            </Link>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="Everything in one place"
          title="Built for how startups actually run"
          description="Every module founders, managers, and teams need to operate — connected, not scattered across ten different tools."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.title}
                className="group surface animate-fade-up rounded-2xl p-6 transition-all hover:border-crimson-600/40"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-crimson-600/10 text-crimson-500 transition-colors group-hover:bg-crimson-600/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">
                  {mod.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow strip */}
      <section className="border-y border-white/[0.06] bg-ink-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="How work flows"
            title="From vision to shipped, with full visibility"
          />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                role: "Founder",
                steps: ["Creates vision", "Creates project", "Approves plan"],
              },
              {
                role: "Manager",
                steps: ["Creates execution plan", "Assigns tasks", "Tracks progress"],
              },
              {
                role: "Team",
                steps: ["Completes tasks", "Submits work", "Receives feedback"],
              },
            ].map((col) => (
              <div key={col.role} className="surface rounded-2xl p-8">
                <span className="font-display text-sm font-bold uppercase tracking-wider text-crimson-500">
                  {col.role}
                </span>
                <ol className="mt-6 space-y-4">
                  {col.steps.map((step, idx) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-xs text-ink-300">
                        {idx + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-200">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
        <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Ready to run your company on one system?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-400">
          Set up your workspace, invite your team, and assign roles in
          minutes.
        </p>
        <Link
          href="/signup"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-crimson-600 px-6 py-3 text-sm font-semibold text-white shadow-crimson-sm transition-all hover:bg-crimson-700"
        >
          Get started for free
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>
    </>
  );
}
