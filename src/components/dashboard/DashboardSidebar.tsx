"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  BookOpen,
  FileText,
  BarChart3,
  TrendingUp,
  Settings,
  Users,
  ClipboardList,
} from "lucide-react";
import type { UserRole } from "@/types/database";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: UserRole[]; // omit = visible to all roles
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard/founder", label: "Founder Overview", icon: LayoutDashboard, roles: ["founder"] },
  { href: "/dashboard/manager", label: "Manager Overview", icon: ClipboardList, roles: ["founder", "manager"] },
  { href: "/dashboard/team", label: "My Tasks", icon: ListChecks },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/tasks", label: "Task Board", icon: ListChecks },
  { href: "/dashboard/company-book", label: "Company Book", icon: BookOpen },
  { href: "/dashboard/documents", label: "Documentation Hub", icon: FileText },
  { href: "/dashboard/reports", label: "Reports Center", icon: BarChart3 },
  { href: "/dashboard/growth", label: "Growth Dashboard", icon: TrendingUp, roles: ["founder", "manager"] },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  return (
    <aside className="hidden w-60 shrink-0 border-r border-white/[0.06] bg-ink-950 lg:flex lg:flex-col">
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-crimson-600/10 text-white"
                  : "text-ink-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${
                  active ? "text-crimson-500" : "text-ink-500 group-hover:text-ink-300"
                }`}
              />
              <span className="truncate">{item.label}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-500" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.06] px-3 py-4">
        <div className="rounded-lg bg-white/[0.03] px-3 py-3">
          <p className="flex items-center gap-1.5 text-xs font-medium text-ink-400">
            <Users className="h-3.5 w-3.5" />
            Signed in as
          </p>
          <p className="mt-1 text-xs font-semibold capitalize text-white">
            {role.replace("_", " ")}
          </p>
        </div>
      </div>
    </aside>
  );
}
