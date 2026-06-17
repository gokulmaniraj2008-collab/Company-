import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";
import { FileText } from "lucide-react";

export default function DocumentsPage() {
  return (
    <ModulePlaceholder
      icon={FileText}
      title="Documentation Hub"
      description="SOPs, meeting notes, decisions, lessons learned, and internal documents — coming in the next build slice."
    />
  );
}
