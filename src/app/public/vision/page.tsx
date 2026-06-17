import { SectionHeading } from "@/components/SectionHeading";
import { Target, Compass } from "lucide-react";

export default function VisionPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-crimson-600/30 bg-crimson-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-crimson-400">
          <Compass className="h-3.5 w-3.5" />
          Our Vision
        </span>
        <h1 className="mt-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          A world where every founder can run a company like a system, not a
          scramble.
        </h1>
      </div>

      <div className="mt-16 space-y-8 text-lg leading-relaxed text-ink-300">
        <p>
          Most startups don&apos;t fail because the idea was wrong. They fail
          because the company around the idea never became a system — decisions
          live in someone&apos;s head, plans live in someone&apos;s notes app,
          and progress lives nowhere at all.
        </p>
        <p>
          We believe the companies that win are the ones that turn vision into
          structure early: a constitution everyone can read, a leadership
          system everyone understands, and a single place where work actually
          moves from idea to shipped.
        </p>
        <p>
          DRYNN exists to be that place — the operating system underneath the
          company, so founders can lead, managers can execute, and teams can
          build, all from the same source of truth.
        </p>
      </div>

      <div className="mt-20 surface rounded-2xl p-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-crimson-600/10 text-crimson-500">
          <Target className="h-6 w-6" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-bold text-white">
          Where we&apos;re going
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-400">
          We&apos;re building toward a future where any founder, anywhere, can
          stand up a fully operating company infrastructure in days instead of
          years — complete with the governance, processes, and visibility that
          usually only come after a company has scaled the hard way.
        </p>
      </div>
    </div>
  );
}
