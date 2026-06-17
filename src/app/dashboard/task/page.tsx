import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";
import { ListChecks } from "lucide-react";

export default function TasksPage() {
  return (
    <ModulePlaceholder
      icon={ListChecks}
      title="Task Management"
      description="Create, assign, and track tasks with priority levels, due dates, status, and comments — coming in the next build slice."
    />
  );
}
