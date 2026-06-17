"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow } from "@/types/database";

export function DecisionCenter({ pendingProjects }: { pendingProjects: ProjectRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDecision(projectId: string, approve: boolean) {
    setBusyId(projectId);
    const supabase = createClient();
    const { data: authData } = await supabase.auth.getUser();

    if (approve) {
      await supabase
        .from("projects")
        .update({
          status: "active",
          approved_by: authData.user?.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", projectId);
    } else {
      await supabase
        .from("projects")
        .update({ status: "cancelled" })
        .eq("id", projectId);
    }

    setBusyId(null);
    router.refresh();
  }

  if (pendingProjects.length === 0) {
    return (
      <div className="surface rounded-2xl p-6 text-center">
        <p className="text-sm text-ink-400">
          No pending decisions right now — new project proposals will show up
          here for approval.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {pendingProjects.map((project) => (
        <div
          key={project.id}
          className="surface flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-display text-sm font-semibold text-white">
              {project.name}
            </p>
            {project.vision_statement && (
              <p className="mt-1 text-sm text-ink-400">
                {project.vision_statement}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => handleDecision(project.id, false)}
              disabled={busyId === project.id}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-ink-300 transition-colors hover:bg-white/5 disabled:opacity-50"
            >
              <XCircle className="h-3.5 w-3.5" />
              Decline
            </button>
            <button
              onClick={() => handleDecision(project.id, true)}
              disabled={busyId === project.id}
              className="inline-flex items-center gap-1.5 rounded-lg bg-crimson-600 px-3 py-2 text-xs font-semibold text-white shadow-crimson-sm transition-colors hover:bg-crimson-700 disabled:opacity-50"
            >
              {busyId === project.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )}
              Approve
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
