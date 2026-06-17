import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

export default async function DashboardIndexPage() {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/login");
  }

  const { data: profileData } = await supabase
    .from("users")
    .select("role")
    .eq("id", authData.user!.id)
    .single();

  const role = (profileData as { role: UserRole } | null)?.role;

  if (role === "founder") {
    redirect("/dashboard/founder");
  } else if (role === "manager") {
    redirect("/dashboard/manager");
  } else {
    redirect("/dashboard/team");
  }
}
