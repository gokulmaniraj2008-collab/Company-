import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { Users, ShieldCheck, Building2 } from "lucide-react";
import type { UserRow } from "@/types/database";

export default async function SettingsPage() {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) redirect("/login");

  const { data: profileData } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData.user!.id)
    .single();

  const profile = (profileData as UserRow) ?? null;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-ink-400">
          Manage your profile. Team management, permissions, and company
          settings are coming in a future slice.
        </p>
      </div>

      <div className="surface rounded-2xl p-6">
        <h2 className="font-display text-base font-semibold text-white">Profile</h2>
        <p className="mt-1 text-sm text-ink-500">
          This information is visible to your team.
        </p>
        <div className="mt-6">
          <ProfileForm profile={profile} email={authData.user!.email ?? ""} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: Users, title: "Team Management", desc: "Invite, deactivate, and manage members." },
          { icon: ShieldCheck, title: "Permissions", desc: "Fine-tune role-based access." },
          { icon: Building2, title: "Company Settings", desc: "Workspace name, branding, and defaults." },
        ].map((item) => (
          <div key={item.title} className="surface rounded-2xl p-5 opacity-60">
            <item.icon className="h-5 w-5 text-ink-500" />
            <p className="mt-3 text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-xs text-ink-500">{item.desc}</p>
            <span className="mt-3 inline-block rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-ink-500">
              Next slice
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
