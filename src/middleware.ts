import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

// Dashboard routes that are restricted to specific roles.
// Anything under /dashboard not listed here is open to any authenticated user.
const ROLE_RESTRICTED_PREFIXES: { prefix: string; roles: string[] }[] = [
  { prefix: "/dashboard/founder", roles: ["founder"] },
  { prefix: "/dashboard/manager", roles: ["founder", "manager"] },
  // /dashboard/team is open to all authenticated roles (founder/manager can also view team view)
  { prefix: "/dashboard/settings/team", roles: ["founder", "manager"] },
  { prefix: "/dashboard/company-book/edit", roles: ["founder"] },
];

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const path = request.nextUrl.pathname;

  const isDashboardRoute = path.startsWith("/dashboard");
  const isAuthRoute = path.startsWith("/login") || path.startsWith("/signup");

  // Not signed in, trying to reach a private route → bounce to login
  if (isDashboardRoute && !user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectedFrom", path);
    return NextResponse.redirect(redirectUrl);
  }

  // Already signed in, trying to reach login/signup → send to dashboard
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Role-gate specific dashboard sections
  if (isDashboardRoute && user) {
    const restricted = ROLE_RESTRICTED_PREFIXES.find((r) =>
      path.startsWith(r.prefix)
    );

    if (restricted) {
      // Look up the user's role from public.users
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value;
            },
            set() {},
            remove() {},
          },
        }
      );

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile || !restricted.roles.includes(profile.role)) {
        return NextResponse.redirect(new URL("/dashboard/unauthorized", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
