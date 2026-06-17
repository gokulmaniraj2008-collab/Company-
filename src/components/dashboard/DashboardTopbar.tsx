"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MobileDashboardNav } from "./MobileDashboardNav";
import type { UserRole } from "@/types/database";

interface DashboardTopbarProps {
  fullName: string | null;
  email: string;
  role: UserRole;
  title?: string | null;
}

export function DashboardTopbar({ fullName, email, role, title }: DashboardTopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const displayName = fullName || email.split("@")[0];
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[0.06] bg-ink-950/90 px-4 py-3 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-3">
        <MobileDashboardNav role={role} />
        <div>
          <p className="text-sm font-semibold text-white">
            Welcome back, {displayName.split(" ")[0]}
          </p>
          <p className="text-xs text-ink-500">{title || roleLabel(role)}</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1.5 transition-colors hover:bg-white/5"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson-600 text-xs font-bold text-white">
            {initial}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-white/10 bg-ink-900 py-2 shadow-card">
              <div className="border-b border-white/[0.06] px-4 py-3">
                <p className="text-sm font-semibold text-white">{displayName}</p>
                <p className="truncate text-xs text-ink-500">{email}</p>
              </div>
              <a
                href="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink-300 hover:bg-white/5 hover:text-white"
              >
                <UserIcon className="h-4 w-4" />
                Profile settings
              </a>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-crimson-400 hover:bg-crimson-600/10"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function roleLabel(role: UserRole) {
  switch (role) {
    case "founder":
      return "Founder";
    case "manager":
      return "Manager";
    default:
      return "Team Member";
  }
}
