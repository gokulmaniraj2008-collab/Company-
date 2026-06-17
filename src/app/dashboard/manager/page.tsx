import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";
import { ClipboardList } from "lucide-react";

export default function ManagerDashboardPage() {
  return (
    <ModulePlaceholder
      icon={ClipboardList}
      title="Manager Dashboard"
      description="Project planning, task assignment, progress tracking, and team coordination — coming in the next build slice."
    />
  );
}
