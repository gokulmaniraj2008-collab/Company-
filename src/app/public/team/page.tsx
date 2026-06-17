import { createClient } from "@/lib/supabase/server";
import { SectionHeading } from "@/components/SectionHeading";
import { User } from "lucide-react";
import type { UserRow } from "@/types/database";

export const revalidate = 60;

export default async function TeamPage() {
  const supabase = createClient();
  const { data: teamData } = await supabase
    .from("users")
    .select("id, full_name, title, department, role, avatar_url")
    .eq("is_active", true)
    .order("role", { ascending: true });

  const team = (teamData as Pick<UserRow, "id" | "full_name" | "title" | "department" | "role" | "avatar_url">[]) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Our Team"
        title="The people building DRYNN"
        description="Founders, managers, and team members working from the same playbook."
      />

      {team.length > 0 ? (
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.id} className="surface rounded-2xl p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-ink-400">
                <User className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-white">
                {member.full_name || "Team member"}
              </h3>
              <p className="mt-1 text-sm text-ink-400">
                {member.title || roleLabel(member.role)}
              </p>
              {member.department && (
                <p className="mt-1 text-xs text-ink-500">{member.department}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="surface mt-16 rounded-2xl p-12 text-center">
          <p className="text-base text-ink-400">
            Our team directory is being set up — check back soon.
          </p>
        </div>
      )}
    </div>
  );
}

function roleLabel(role: string) {
  switch (role) {
    case "founder":
      return "Founder";
    case "manager":
      return "Manager";
    default:
      return "Team Member";
  }
}
