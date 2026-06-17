const STATUS_STYLES: Record<string, string> = {
  // Project statuses
  planning: "bg-ink-700 text-ink-200",
  active: "bg-emerald-500/15 text-emerald-400",
  on_hold: "bg-amber-500/15 text-amber-400",
  completed: "bg-blue-500/15 text-blue-400",
  cancelled: "bg-ink-700 text-ink-400",
  // Task statuses
  todo: "bg-ink-700 text-ink-300",
  in_progress: "bg-amber-500/15 text-amber-400",
  in_review: "bg-violet-500/15 text-violet-400",
  done: "bg-emerald-500/15 text-emerald-400",
  blocked: "bg-crimson-600/15 text-crimson-400",
};

const STATUS_LABELS: Record<string, string> = {
  planning: "Planning",
  active: "Active",
  on_hold: "On Hold",
  completed: "Completed",
  cancelled: "Cancelled",
  todo: "To Do",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
  blocked: "Blocked",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] || "bg-ink-700 text-ink-300";
  const label = STATUS_LABELS[status] || status;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}

const PRIORITY_STYLES: Record<string, string> = {
  low: "bg-ink-700 text-ink-300",
  medium: "bg-blue-500/15 text-blue-400",
  high: "bg-amber-500/15 text-amber-400",
  urgent: "bg-crimson-600/15 text-crimson-400",
};

export function PriorityBadge({ priority }: { priority: string }) {
  const style = PRIORITY_STYLES[priority] || "bg-ink-700 text-ink-300";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${style}`}>
      {priority}
    </span>
  );
}
