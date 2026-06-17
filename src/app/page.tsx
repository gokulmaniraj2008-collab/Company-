import { ModulePlaceholder } from "@/components/dashboard/ModulePlaceholder";
import { BookOpen } from "lucide-react";

export default function CompanyBookPage() {
  return (
    <ModulePlaceholder
      icon={BookOpen}
      title="Company Book"
      description="Constitution, Laws, Roles & Responsibilities, Founder Playbook, Leadership System, Company Systems, and SOP Library — coming in the next build slice."
    />
  );
}
