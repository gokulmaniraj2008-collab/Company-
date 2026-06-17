import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 text-center">
      <span className="font-mono text-sm text-crimson-500">404</span>
      <h1 className="mt-4 font-display text-3xl font-bold text-white">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-2 text-sm text-ink-400">
        The page you&apos;re looking for may have moved or been removed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-crimson-600 px-5 py-2.5 text-sm font-semibold text-white shadow-crimson-sm hover:bg-crimson-700"
      >
        Back to home
      </Link>
    </div>
  );
}
