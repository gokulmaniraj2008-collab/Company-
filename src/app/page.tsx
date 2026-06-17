import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";
import { FolderKanban } from "lucide-react";

export default function ProjectsPage() {
  return (
    <ModulePlaceholder
      icon={FolderKanban}
      title="Project Management"
      description="Create projects, track status, manage milestones, deadlines, and team assignments — coming in the next build slice."
    />
  );
}
