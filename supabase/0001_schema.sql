-- =====================================================================
-- DRYNN FOUNDER OS — Core Schema
-- Run this in Supabase SQL Editor (or via `supabase db push`)
-- =====================================================================

-- ---------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- ENUM TYPES
-- ---------------------------------------------------------------------
create type user_role as enum ('founder', 'manager', 'team_member');
create type project_status as enum ('planning', 'active', 'on_hold', 'completed', 'cancelled');
create type task_status as enum ('todo', 'in_progress', 'in_review', 'done', 'blocked');
create type task_priority as enum ('low', 'medium', 'high', 'urgent');
create type report_type as enum ('weekly', 'monthly', 'team', 'project');
create type document_category as enum ('sop', 'meeting_notes', 'decision', 'lesson_learned', 'internal');
create type law_status as enum ('active', 'draft', 'archived');

-- ---------------------------------------------------------------------
-- USERS  (extends auth.users with profile + role data)
-- ---------------------------------------------------------------------
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  role user_role not null default 'team_member',
  title text,                          -- e.g. "Head of Design"
  department text,
  phone text,
  is_active boolean not null default true,
  joined_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.users is 'Profile + role data for every member of the company workspace.';

-- ---------------------------------------------------------------------
-- ROLES  (granular permission overrides, optional fine-tuning beyond user_role)
-- ---------------------------------------------------------------------
create table public.roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  permission text not null,            -- e.g. 'projects.create', 'reports.approve'
  granted boolean not null default true,
  granted_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  unique (user_id, permission)
);

-- ---------------------------------------------------------------------
-- PROJECTS
-- ---------------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  vision_statement text,                -- set by Founder when creating vision
  status project_status not null default 'planning',
  owner_id uuid references public.users(id),       -- Founder who created it
  manager_id uuid references public.users(id),      -- Manager executing it
  start_date date,
  target_date date,
  completed_at timestamptz,
  approved_by uuid references public.users(id),
  approved_at timestamptz,
  progress_percent int not null default 0 check (progress_percent between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  due_date date,
  is_completed boolean not null default false,
  completed_at timestamptz,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (project_id, user_id)
);

-- ---------------------------------------------------------------------
-- TASKS
-- ---------------------------------------------------------------------
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  description text,
  status task_status not null default 'todo',
  priority task_priority not null default 'medium',
  assigned_to uuid references public.users(id),
  created_by uuid references public.users(id),
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  author_id uuid references public.users(id),
  body text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- DOCUMENTS  (SOPs, meeting notes, decisions, lessons learned, internal docs)
-- ---------------------------------------------------------------------
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category document_category not null,
  content text,                         -- markdown body
  file_url text,                        -- optional Supabase Storage file
  project_id uuid references public.projects(id) on delete set null,
  created_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- SOPs  (dedicated table for the SOP Library, distinct from generic documents)
-- ---------------------------------------------------------------------
create table public.sops (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text,
  summary text,
  content text not null,                -- markdown body
  version int not null default 1,
  created_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- REPORTS
-- ---------------------------------------------------------------------
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  type report_type not null,
  title text not null,
  period_start date,
  period_end date,
  summary text,
  content text,                         -- markdown body
  project_id uuid references public.projects(id) on delete set null,
  submitted_by uuid references public.users(id),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- MEETINGS
-- ---------------------------------------------------------------------
create table public.meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  notes text,
  held_at timestamptz not null default now(),
  created_by uuid references public.users(id),
  project_id uuid references public.projects(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.meeting_attendees (
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  primary key (meeting_id, user_id)
);

-- ---------------------------------------------------------------------
-- KPIs  (company-level + growth metrics)
-- ---------------------------------------------------------------------
create table public.kpis (
  id uuid primary key default gen_random_uuid(),
  label text not null,                  -- e.g. "Monthly Active Users", "MRR"
  category text,                        -- e.g. "growth", "revenue", "product"
  value numeric not null,
  unit text,                            -- e.g. "$", "%", "users"
  recorded_for date not null default current_date,
  created_by uuid references public.users(id),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- COMPANY LAWS  (Company Book: Constitution, Laws, Roles, Playbook, etc.)
-- ---------------------------------------------------------------------
create table public.company_laws (
  id uuid primary key default gen_random_uuid(),
  section text not null,   -- 'constitution' | 'laws' | 'roles' | 'playbook' | 'leadership' | 'systems'
  title text not null,
  content text not null,                -- markdown body
  status law_status not null default 'active',
  version int not null default 1,
  created_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- PRODUCTS  (for the public Products page + internal product metrics)
-- ---------------------------------------------------------------------
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text,
  description text,
  logo_url text,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_users_updated_at before update on public.users for each row execute function public.set_updated_at();
create trigger trg_projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger trg_tasks_updated_at before update on public.tasks for each row execute function public.set_updated_at();
create trigger trg_documents_updated_at before update on public.documents for each row execute function public.set_updated_at();
create trigger trg_sops_updated_at before update on public.sops for each row execute function public.set_updated_at();
create trigger trg_company_laws_updated_at before update on public.company_laws for each row execute function public.set_updated_at();
create trigger trg_products_updated_at before update on public.products for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Auto-create a public.users row when someone signs up via Supabase Auth
-- ---------------------------------------------------------------------
create or replace function public.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    'team_member'  -- default role; a Founder/Manager promotes via Settings > Team Management
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ---------------------------------------------------------------------
-- Indexes for common query patterns
-- ---------------------------------------------------------------------
create index idx_tasks_assigned_to on public.tasks(assigned_to);
create index idx_tasks_project_id on public.tasks(project_id);
create index idx_tasks_status on public.tasks(status);
create index idx_projects_manager_id on public.projects(manager_id);
create index idx_projects_status on public.projects(status);
create index idx_reports_type on public.reports(type);
create index idx_kpis_recorded_for on public.kpis(recorded_for);
create index idx_documents_category on public.documents(category);
create index idx_company_laws_section on public.company_laws(section);
