import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";
import { TrendingUp } from "lucide-react";

export default function GrowthPage() {
  return (
    <ModulePlaceholder
      icon={TrendingUp}
      title="Growth Dashboard"
      description="Users, revenue, growth rate, product metrics, and company KPIs — coming in the next build slice."
    />
  );
}
