import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";
import { ListChecks } from "lucide-react";

export default function TeamDashboardPage() {
  return (
    <ModulePlaceholder
      icon={ListChecks}
      title="Team Dashboard"
      description="Your assigned tasks, deadlines, progress updates, and completed work — coming in the next build slice."
    />
  );
}
