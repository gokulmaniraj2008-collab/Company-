import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    redirect("/login");
  }

  const user = authData.user!;

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, role, title")
    .eq("id", user.id)
    .single();

  const role = profile?.role ?? "team_member";

  return (
    <div className="flex min-h-screen bg-ink-950">
      <DashboardSidebar role={role} />
      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopbar
          fullName={profile?.full_name ?? null}
          email={user.email ?? ""}
          role={role}
          title={profile?.title}
        />
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
