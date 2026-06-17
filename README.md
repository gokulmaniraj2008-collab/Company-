# DRYNN Founder OS

A startup operating system for founders, managers, and team members —
combining a company handbook, project management, task tracking,
documentation, and reporting into one platform.

## What's in this slice

This is **slice 1** of the build: foundation + auth + public site + the
Founder Dashboard, fully wired to a real Supabase backend. Every other
private module (Manager Dashboard, Team Dashboard, Project Management,
Task Management, Documentation Hub, Reports Center, Growth Dashboard,
Company Book, full Settings) has a placeholder page in the sidebar so
navigation works end-to-end, and will be built one module at a time in
the same way DRYNN itself was built.

### Included and working right now
- Tailwind theme: black / white / crimson, premium SaaS aesthetic
- Public site: Home, Vision, Mission, Values, Team, Products, Contact
- Email + Google auth (Supabase Auth), with a callback route for both
  OAuth and email confirmation links
- Role-based middleware: `/dashboard/founder` is founder-only,
  `/dashboard/manager` is founder+manager, everything else under
  `/dashboard` is open to any authenticated role
- Full database schema (11 tables) + Row Level Security policies
  enforcing the 3-role model at the database layer, not just in the UI
- Founder Dashboard: company overview, active projects, key metrics
  (revenue/MAU trend chart), Decision Center (approve/decline pending
  projects), weekly reports feed, and a "Founder Pulse" live stats strip
- Working profile editor in Settings

## Setup

### 1. Create a new Supabase project
Go to [supabase.com](https://supabase.com) and create a new project
(per your earlier confirmation, this is separate from the existing
DRYNN Supabase project).

### 2. Run the database migrations
In the Supabase SQL Editor, run in order:
1. `supabase/migrations/0001_schema.sql` — all 11 tables + triggers
2. `supabase/migrations/0002_rls_policies.sql` — role-based RLS

### 3. Enable Google auth
In Supabase Dashboard → Authentication → Providers → Google, paste in
your existing Google OAuth Client ID and Secret (the one you said
you'll reuse). Set the redirect URL to:
```
https://<your-project-ref>.supabase.co/auth/v1/callback
```
And in your Google Cloud Console OAuth client, add this app's callback
as an authorized redirect URI too:
```
https://your-deployed-domain.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

### 4. Environment variables
Copy `.env.local.example` to `.env.local` and fill in:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```
Found under Supabase Dashboard → Project Settings → API.

### 5. Install and run locally
```bash
npm install
npm run dev
```

### 6. Become the Founder
Sign up through `/signup` (your first real account). Then in the
Supabase SQL Editor, run:
```sql
update public.users set role = 'founder' where email = 'you@example.com';
```
Every signup defaults to `team_member`; the Founder promotes others
later via Settings → Team Management (built in a future slice — for
now, promote manually via SQL: `update public.users set role = 'manager' where email = '...'`).

### 7. (Optional) Seed sample data
Run `supabase/seed.sql` after promoting yourself to Founder, to get
sample KPIs, a sample project, and Company Book entries so the Founder
Dashboard isn't empty on first load.

### 8. Deploy to Vercel
Push this repo to GitHub, import it in Vercel, and add the same
environment variables from step 4 in the Vercel project settings.
Set `NEXT_PUBLIC_SITE_URL` to your real Vercel URL once assigned.

## Next slices
In the same iterative pattern as your other projects: tell me which
module to build next (Manager Dashboard, Project Management, Task
Management, Company Book, Documentation Hub, Reports Center, Growth
Dashboard, or full Settings/Team Management), upload this code back if
you've made changes, and we build that module out fully — wired to the
real schema, same design language.
