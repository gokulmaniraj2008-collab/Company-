import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-crimson-600/10 text-crimson-500">
        <ShieldAlert className="h-7 w-7" />
      </div>
      <h1 className="mt-6 font-display text-2xl font-bold text-white">
        You don&apos;t have access to this page
      </h1>
      <p className="mt-2 max-w-md text-sm text-ink-400">
        This section is restricted to a different role. If you think this is
        a mistake, ask a Founder to check your permissions in Settings.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-crimson-600 px-5 py-2.5 text-sm font-semibold text-white shadow-crimson-sm hover:bg-crimson-700"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
