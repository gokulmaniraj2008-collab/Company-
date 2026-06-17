import { SectionHeading } from "@/components/SectionHeading";
import { Zap, ShieldCheck, Eye, Users2, GitBranch, Flame } from "lucide-react";

const VALUES = [
  {
    icon: Zap,
    title: "Speed with accountability",
    description:
      "We move fast, but every fast decision has an owner and a record of why it was made.",
  },
  {
    icon: Eye,
    title: "Clarity over cleverness",
    description:
      "If a plan needs ten minutes of explaining, it isn't ready. We write things down so anyone can pick them up.",
  },
  {
    icon: ShieldCheck,
    title: "Ownership over approval-seeking",
    description:
      "Every role exists to make decisions within its scope — not to escalate everything upward.",
  },
  {
    icon: Users2,
    title: "Default to transparency",
    description:
      "Projects, tasks, and reports are visible across the company unless there's a real reason they shouldn't be.",
  },
  {
    icon: GitBranch,
    title: "Systems over heroics",
    description:
      "We'd rather build a process that works without a hero than rely on someone burning out to save a launch.",
  },
  {
    icon: Flame,
    title: "Honest reporting, always",
    description:
      "A red status today is worth more than a green status that turns into a crisis next week.",
  },
];

export default function ValuesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Company Values"
        title="The principles behind every decision"
        description="These aren't posters on a wall — they're written into the Company Book and referenced in how we actually plan, assign, and review work."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map((value) => {
          const Icon = value.icon;
          return (
            <div key={value.title} className="surface rounded-2xl p-7">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-crimson-600/10 text-crimson-500">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
