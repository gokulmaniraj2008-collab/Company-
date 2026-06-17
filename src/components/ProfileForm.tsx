"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { UserRow } from "@/types/database";

interface ProfileFormProps {
  profile: UserRow | null;
  email: string;
}

export function ProfileForm({ profile, email }: ProfileFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [title, setTitle] = useState(profile?.title ?? "");
  const [department, setDepartment] = useState(profile?.department ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    await supabase
      .from("users")
      .update({ full_name: fullName, title, department, phone })
      .eq("id", profile.id);

    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink-200">Full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white focus:border-crimson-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-200">Email</label>
          <input
            value={email}
            disabled
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900/50 px-4 py-2.5 text-sm text-ink-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-200">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Head of Design"
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-crimson-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-200">Department</label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g. Product"
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-crimson-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-200">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Optional"
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900 px-4 py-2.5 text-sm text-white placeholder:text-ink-500 focus:border-crimson-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-200">Role</label>
          <input
            value={profile?.role.replace("_", " ") ?? ""}
            disabled
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink-900/50 px-4 py-2.5 text-sm capitalize text-ink-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-crimson-600 px-5 py-2.5 text-sm font-semibold text-white shadow-crimson-sm transition-all hover:bg-crimson-700 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save changes
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Saved
          </span>
        )}
      </div>
    </form>
  );
}
