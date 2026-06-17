-- =====================================================================
-- DRYNN FOUNDER OS — Row Level Security
-- Enforces the 3-role model (founder / manager / team_member) at the DB layer.
-- Run after 0001_schema.sql
-- =====================================================================

-- ---------------------------------------------------------------------
-- Helper: current user's role, read once per statement
-- ---------------------------------------------------------------------
create or replace function public.current_role_name()
returns user_role as $$
  select role from public.users where id = auth.uid();
$$ language sql stable security definer set search_path = public;

create or replace function public.is_founder()
returns boolean as $$
  select public.current_role_name() = 'founder';
$$ language sql stable security definer set search_path = public;

create or replace function public.is_manager_or_above()
returns boolean as $$
  select public.current_role_name() in ('founder', 'manager');
$$ language sql stable security definer set search_path = public;

-- Enable RLS everywhere
alter table public.users enable row level security;
alter table public.roles enable row level security;
alter table public.projects enable row level security;
alter table public.project_milestones enable row level security;
alter table public.project_members enable row level security;
alter table public.tasks enable row level security;
alter table public.task_comments enable row level security;
alter table public.documents enable row level security;
alter table public.sops enable row level security;
alter table public.reports enable row level security;
alter table public.meetings enable row level security;
alter table public.meeting_attendees enable row level security;
alter table public.kpis enable row level security;
alter table public.company_laws enable row level security;
alter table public.products enable row level security;

-- ---------------------------------------------------------------------
-- USERS
-- Everyone signed in can view the team directory.
-- A person can update their own profile; Founders can update anyone (role changes).
-- ---------------------------------------------------------------------
create policy "users_select_all_authenticated" on public.users
  for select using (auth.role() = 'authenticated');

create policy "users_update_own_profile" on public.users
  for update using (auth.uid() = id);

create policy "founder_update_any_user" on public.users
  for update using (public.is_founder());

create policy "founder_insert_user" on public.users
  for insert with check (public.is_founder() or auth.uid() = id);

-- ---------------------------------------------------------------------
-- ROLES (permission overrides) — Founder-managed only
-- ---------------------------------------------------------------------
create policy "roles_select_own_or_founder" on public.roles
  for select using (auth.uid() = user_id or public.is_founder());

create policy "roles_founder_write" on public.roles
  for all using (public.is_founder()) with check (public.is_founder());

-- ---------------------------------------------------------------------
-- PROJECTS
-- All authenticated members can view projects (transparency by default).
-- Founders create/approve. Managers can create execution-level projects too,
-- and update projects they manage. Founders can do everything.
-- ---------------------------------------------------------------------
create policy "projects_select_all_authenticated" on public.projects
  for select using (auth.role() = 'authenticated');

create policy "projects_insert_founder_or_manager" on public.projects
  for insert with check (public.is_manager_or_above());

create policy "projects_update_owner_manager_or_founder" on public.projects
  for update using (
    public.is_founder()
    or manager_id = auth.uid()
    or owner_id = auth.uid()
  );

create policy "projects_delete_founder_only" on public.projects
  for delete using (public.is_founder());

-- Milestones follow the parent project's visibility; writes by manager+ 
create policy "milestones_select_all_authenticated" on public.project_milestones
  for select using (auth.role() = 'authenticated');

create policy "milestones_write_manager_or_founder" on public.project_milestones
  for all using (public.is_manager_or_above()) with check (public.is_manager_or_above());

-- Project membership visible to all; managed by manager+
create policy "project_members_select_all_authenticated" on public.project_members
  for select using (auth.role() = 'authenticated');

create policy "project_members_write_manager_or_founder" on public.project_members
  for all using (public.is_manager_or_above()) with check (public.is_manager_or_above());

-- ---------------------------------------------------------------------
-- TASKS
-- Everyone can see tasks (so team members see project context).
-- Team members can update status/comments on tasks assigned to them.
-- Managers/Founders can create, assign, and edit any task.
-- ---------------------------------------------------------------------
create policy "tasks_select_all_authenticated" on public.tasks
  for select using (auth.role() = 'authenticated');

create policy "tasks_insert_manager_or_founder" on public.tasks
  for insert with check (public.is_manager_or_above());

create policy "tasks_update_assignee_or_manager" on public.tasks
  for update using (
    public.is_manager_or_above()
    or assigned_to = auth.uid()
  );

create policy "tasks_delete_manager_or_founder" on public.tasks
  for delete using (public.is_manager_or_above());

-- Task comments: anyone authenticated can read + add comments on tasks they can see
create policy "task_comments_select_all_authenticated" on public.task_comments
  for select using (auth.role() = 'authenticated');

create policy "task_comments_insert_own" on public.task_comments
  for insert with check (author_id = auth.uid());

create policy "task_comments_delete_own_or_founder" on public.task_comments
  for delete using (author_id = auth.uid() or public.is_founder());

-- ---------------------------------------------------------------------
-- DOCUMENTS (Documentation Hub)
-- Readable by all; writable by manager+ (team members can be granted via roles table if needed)
-- ---------------------------------------------------------------------
create policy "documents_select_all_authenticated" on public.documents
  for select using (auth.role() = 'authenticated');

create policy "documents_write_manager_or_founder" on public.documents
  for all using (public.is_manager_or_above()) with check (public.is_manager_or_above());

-- ---------------------------------------------------------------------
-- SOPs (SOP Library, part of Company Book)
-- ---------------------------------------------------------------------
create policy "sops_select_all_authenticated" on public.sops
  for select using (auth.role() = 'authenticated');

create policy "sops_write_manager_or_founder" on public.sops
  for all using (public.is_manager_or_above()) with check (public.is_manager_or_above());

-- ---------------------------------------------------------------------
-- REPORTS (Reports Center)
-- Anyone can submit a report; visible to all (transparency); only author/founder can edit.
-- ---------------------------------------------------------------------
create policy "reports_select_all_authenticated" on public.reports
  for select using (auth.role() = 'authenticated');

create policy "reports_insert_own" on public.reports
  for insert with check (submitted_by = auth.uid());

create policy "reports_update_own_or_founder" on public.reports
  for update using (submitted_by = auth.uid() or public.is_founder());

create policy "reports_delete_own_or_founder" on public.reports
  for delete using (submitted_by = auth.uid() or public.is_founder());

-- ---------------------------------------------------------------------
-- MEETINGS
-- ---------------------------------------------------------------------
create policy "meetings_select_all_authenticated" on public.meetings
  for select using (auth.role() = 'authenticated');

create policy "meetings_write_manager_or_founder" on public.meetings
  for all using (public.is_manager_or_above()) with check (public.is_manager_or_above());

create policy "meeting_attendees_select_all_authenticated" on public.meeting_attendees
  for select using (auth.role() = 'authenticated');

create policy "meeting_attendees_write_manager_or_founder" on public.meeting_attendees
  for all using (public.is_manager_or_above()) with check (public.is_manager_or_above());

-- ---------------------------------------------------------------------
-- KPIs (Growth Dashboard) — Founder + Manager write; all can read
-- ---------------------------------------------------------------------
create policy "kpis_select_all_authenticated" on public.kpis
  for select using (auth.role() = 'authenticated');

create policy "kpis_write_manager_or_founder" on public.kpis
  for all using (public.is_manager_or_above()) with check (public.is_manager_or_above());

-- ---------------------------------------------------------------------
-- COMPANY LAWS (Company Book core sections) — Founder-only write, all read
-- ---------------------------------------------------------------------
create policy "company_laws_select_all_authenticated" on public.company_laws
  for select using (auth.role() = 'authenticated');

create policy "company_laws_write_founder_only" on public.company_laws
  for all using (public.is_founder()) with check (public.is_founder());

-- ---------------------------------------------------------------------
-- PRODUCTS — public read for is_public rows (used on public Products page);
-- authenticated read for all; founder/manager write
-- ---------------------------------------------------------------------
create policy "products_select_public" on public.products
  for select using (is_public = true);

create policy "products_select_authenticated_all" on public.products
  for select using (auth.role() = 'authenticated');

create policy "products_write_manager_or_founder" on public.products
  for all using (public.is_manager_or_above()) with check (public.is_manager_or_above());
