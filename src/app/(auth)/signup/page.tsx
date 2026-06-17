"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmEmailSent, setConfirmEmailSent] = useState(false);

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // If email confirmations are on, there's no session yet — show the message.
    if (data.user && !data.session) {
      setConfirmEmailSent(true);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleSignup() {
    setError(null);
    setGoogleLoading(true);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  }

  if (confirmEmailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6">
        <div className="surface-raised w-full max-w-md rounded-2xl p-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-crimson-500" />
          <h1 className="mt-4 font-display text-xl font-bold text-white">
            Check your inbox
          </h1>
          <p className="mt-2 text-sm text-ink-400">
            We sent a confirmation link to <strong className="text-white">{email}</strong>.
            Confirm your email to activate your workspace.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 bg-grid-faint bg-grid px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="surface-raised rounded-2xl p-8">
          <h1 className="font-display text-2xl font-bold text-white">
            Create your workspace
          </h1>
          <p className="mt-1 text-sm text-ink-400">
            The first person to sign up becomes the Founder. Everyone else
            joins as a Team Member until promoted.
          </p>

          {error && (
            <div className="mt-5 rounded-lg border border-crimson-700/40 bg-crimson-900/20 px-4 py-3 text-sm text-crimson-300">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-50 disabled:opacity-60"
          >
            {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-wider text-ink-500">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="text-sm font-medium text-ink-200">
                Full name
              </label>
              <input
                id="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-crimson-600 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-crimson-600 focus:outline-none"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-ink-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-crimson-600 focus:outline-none"
                placeholder="At least 8 characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-crimson-600 py-2.5 text-sm font-semibold text-white shadow-crimson-sm transition-all hover:bg-crimson-700 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Create workspace
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-400">
            Already have a workspace?{" "}
            <Link href="/login" className="font-medium text-crimson-400 hover:text-crimson-300">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.69-2.26 1.1-3.71 1.1-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.14c-.22-.69-.35-1.43-.35-2.14s.13-1.45.35-2.14V7.02H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.98z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.02l3.66 2.84c.87-2.6 3.3-4.48 6.16-4.48z" />
    </svg>
  );
}
