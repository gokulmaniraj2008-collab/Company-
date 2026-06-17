"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // No `contact_submissions` table exists in the current schema (it wasn't
    // part of the specified Database Structure), so this submits via mailto
    // for now. Add a `contact_submissions` table + insert call here if you'd
    // like submissions stored and visible in a dashboard module later.
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Contact from ${data.get("name")}`);
    const body = encodeURIComponent(
      `${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`
    );
    window.location.href = `mailto:hello@drynn.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        description="Questions about DRYNN Founder OS, partnerships, or your workspace setup — reach out and we'll respond shortly."
      />

      <div className="mt-16 surface rounded-2xl p-8 sm:p-10">
        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-crimson-500" />
            <h3 className="mt-4 font-display text-xl font-semibold text-white">
              Message ready to send
            </h3>
            <p className="mt-2 text-sm text-ink-400">
              Your email client should have opened with the message prefilled.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-ink-200">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
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
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-crimson-600 focus:outline-none"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-ink-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-crimson-600 focus:outline-none"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-full bg-crimson-600 px-6 py-3 text-sm font-semibold text-white shadow-crimson-sm transition-all hover:bg-crimson-700 disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send message"}
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}

        <div className="mt-8 flex items-center gap-2 border-t border-white/[0.06] pt-6 text-sm text-ink-400">
          <Mail className="h-4 w-4" />
          Or reach us directly at hello@drynn.com
        </div>
      </div>
    </div>
  );
}
