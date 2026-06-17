import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <ModulePlaceholder
      icon={BarChart3}
      title="Reports Center"
      description="Weekly reports, monthly reviews, team reports, and project reports — coming in the next build slice."
    />
  );
}
