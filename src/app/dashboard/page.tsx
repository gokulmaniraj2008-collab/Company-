import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardIndexPage() {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", authData.user!.id)
    .single();

  if (profile?.role === "founder") {
    redirect("/dashboard/founder");
  } else if (profile?.role === "manager") {
    redirect("/dashboard/manager");
  } else {
    redirect("/dashboard/team");
  }
}
