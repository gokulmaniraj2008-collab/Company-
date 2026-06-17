import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FounderPulse } from "@/components/dashboard/FounderPulse";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { KpiTrendChart } from "@/components/dashboard/KpiTrendChart";
import { DecisionCenter } from "@/components/dashboard/DecisionCenter";
import {
  FolderKanban,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Gavel,
  FileBarChart,
} from "lucide-react";
import type { ProjectRow, ReportRow, KpiRow } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function FounderDashboardPage() {
  const supabase = createClient();

  const [
    { data: projects },
    { data: pendingProjects },
    { count: teamMemberCount },
    { data: kpis },
    { data: recentReports },
    { count: openTasks },
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("projects")
      .select("*")
      .eq("status", "planning")
      .is("approved_at", null),
    supabase.from("users").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("kpis").select("*").order("recorded_for", { ascending: true }),
    supabase
      .from("reports")
      .select("*")
      .eq("type", "weekly")
      .order("created_at", { ascending: false })
      .limit(4),
    supabase.from("tasks").select("id", { count: "exact", head: true }).neq("status", "done"),
  ]);

  const allProjects = (projects as ProjectRow[]) || [];
  const pending = (pendingProjects as ProjectRow[]) || [];
  const reports = (recentReports as ReportRow[]) || [];
  const allKpis = (kpis as KpiRow[]) || [];

  const activeProjectCount = allProjects.filter((p) => p.status === "active").length;
  const safeTeamCount = teamMemberCount ?? 0;
  const safeOpenTasks = openTasks ?? 0;

  const mrrSeries = buildSeries(allKpis, "Monthly Recurring Revenue");
  const mauSeries = buildSeries(allKpis, "Monthly Active Users");
  const latestMrr = mrrSeries.at(-1)?.value ?? 0;
  const latestMau = mauSeries.at(-1)?.value ?? 0;
  const growthRate = allKpis.find((k) => k.label === "Growth Rate")?.value;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">
          Company Overview
        </h1>
        <p className="mt-1 text-sm text-ink-400">
          Everything happening across DRYNN, in one view.
        </p>
      </div>

      <FounderPulse
        metrics={[
          { label: "Active projects", value: String(activeProjectCount), trend: "flat" },
          { label: "Open tasks", value: String(safeOpenTasks), trend: "flat" },
          { label: "Team", value: `${safeTeamCount} members`, trend: "up" },
          { label: "MRR", value: `$${latestMrr.toLocaleString()}`, trend: "up" },
        ]}
      />

      {/* Key metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Projects" value={String(activeProjectCount)} icon={FolderKanban} />
        <StatCard label="Team Size" value={String(safeTeamCount)} icon={Users} />
        <StatCard
          label="Monthly Revenue"
          value={`$${latestMrr.toLocaleString()}`}
          delta={growthRate ? { value: `${growthRate}%`, positive: true } : undefined}
          icon={DollarSign}
        />
        <StatCard label="Monthly Active Users" value={latestMau.toLocaleString()} icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active projects */}
        <div className="surface rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-white">
              Active Projects
            </h2>
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center gap-1 text-xs font-medium text-crimson-400 hover:text-crimson-300"
            >
              View all
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {allProjects.length === 0 && (
              <p className="text-sm text-ink-500">No projects yet. Create one to get started.</p>
            )}
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{project.name}</p>
                  <div className="mt-2 h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-ink-700">
                    <div
                      className="h-full rounded-full bg-crimson-600"
                      style={{ width: `${project.progress_percent}%` }}
                    />
                  </div>
                </div>
                <StatusBadge status={project.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Revenue trend */}
        <div className="surface rounded-2xl p-6">
          <h2 className="font-display text-base font-semibold text-white">
            Revenue Trend
          </h2>
          <p className="text-xs text-ink-500">Monthly recurring revenue</p>
          <div className="mt-4">
            {mrrSeries.length > 0 ? (
              <KpiTrendChart data={mrrSeries} unitPrefix="$" />
            ) : (
              <p className="py-10 text-center text-sm text-ink-500">
                No revenue data yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Decision Center */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <Gavel className="h-4 w-4 text-crimson-500" />
            <h2 className="font-display text-base font-semibold text-white">
              Decision Center
            </h2>
          </div>
          <DecisionCenter pendingProjects={pending} />
        </div>

        {/* Weekly reports */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileBarChart className="h-4 w-4 text-crimson-500" />
              <h2 className="font-display text-base font-semibold text-white">
                Weekly Reports
              </h2>
            </div>
            <Link
              href="/dashboard/reports"
              className="text-xs font-medium text-crimson-400 hover:text-crimson-300"
            >
              View all
            </Link>
          </div>
          <div className="surface rounded-2xl p-5">
            {reports.length === 0 ? (
              <p className="text-sm text-ink-500">No weekly reports submitted yet.</p>
            ) : (
              <ul className="space-y-4">
                {reports.map((report) => (
                  <li key={report.id} className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-white">{report.title}</p>
                    {report.summary && (
                      <p className="mt-1 text-xs text-ink-400 line-clamp-2">{report.summary}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function buildSeries(kpis: KpiRow[], label: string) {
  return kpis
    .filter((k) => k.label === label)
    .sort((a, b) => new Date(a.recorded_for).getTime() - new Date(b.recorded_for).getTime())
    .map((k) => ({
      date: new Date(k.recorded_for).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Number(k.value),
    }));
}
