"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  BookOpen,
  FileText,
  BarChart3,
  TrendingUp,
  Settings,
  ClipboardList,
} from "lucide-react";
import type { UserRole } from "@/types/database";
import { Logo } from "@/components/Logo";

const NAV_ITEMS = [
  { href: "/dashboard/founder", label: "Founder Overview", icon: LayoutDashboard, roles: ["founder"] },
  { href: "/dashboard/manager", label: "Manager Overview", icon: ClipboardList, roles: ["founder", "manager"] },
  { href: "/dashboard/team", label: "My Tasks", icon: ListChecks },
  { href: "/dashboard/project", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/task", label: "Task Board", icon: ListChecks },
  { href: "/dashboard/company-book", label: "Company Book", icon: BookOpen },
  { href: "/dashboard/documents", label: "Documentation Hub", icon: FileText },
  { href: "/dashboard/reports", label: "Reports Center", icon: BarChart3 },
  { href: "/dashboard/growth", label: "Growth Dashboard", icon: TrendingUp, roles: ["founder", "manager"] },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileDashboardNav({ role }: { role: UserRole }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  return (
    <div className="lg:hidden">
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="text-white"
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex w-72 flex-col bg-ink-950 border-r border-white/[0.06]">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
              <Logo />
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      active
                        ? "bg-crimson-600/10 text-white"
                        : "text-ink-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`h-[18px] w-[18px] ${active ? "text-crimson-500" : "text-ink-500"}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
