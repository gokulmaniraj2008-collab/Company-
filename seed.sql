-- =====================================================================
-- DRYNN FOUNDER OS — Optional seed data
-- Run AFTER you've signed up at least one user (so auth.users has a row).
-- Replace the placeholder UUID below with your real founder user id,
-- found via: select id, email from auth.users;
-- =====================================================================

-- 1. Promote yourself to founder (run this first, with your real id/email)
-- update public.users set role = 'founder' where email = 'you@example.com';

-- 2. Sample company laws (Company Book)
insert into public.company_laws (section, title, content, status, created_by)
select 'constitution', 'DRYNN Constitution', '# DRYNN Constitution

## Article I — Purpose
DRYNN exists to give every founder, manager, and team member one operating
system for how the company thinks, decides, and ships.

## Article II — Principles
1. Clarity over cleverness.
2. Ownership over approval-seeking.
3. Speed with accountability.', 'active', id
from public.users where role = 'founder' limit 1;

insert into public.company_laws (section, title, content, status, created_by)
select 'leadership', 'Leadership System', '# Leadership System

Founders set direction and approve plans. Managers translate vision into
execution. Team members own delivery of their assigned work and report
progress honestly and early.', 'active', id
from public.users where role = 'founder' limit 1;

-- 3. Sample KPIs (Growth Dashboard + Founder Dashboard key metrics)
insert into public.kpis (label, category, value, unit, recorded_for, created_by)
select 'Monthly Active Users', 'growth', 1240, 'users', current_date - interval '0 day', id from public.users where role = 'founder' limit 1
union all
select 'Monthly Active Users', 'growth', 1080, 'users', current_date - interval '30 day', id from public.users where role = 'founder' limit 1
union all
select 'Monthly Recurring Revenue', 'revenue', 8400, '$', current_date, id from public.users where role = 'founder' limit 1
union all
select 'Monthly Recurring Revenue', 'revenue', 7150, '$', current_date - interval '30 day', id from public.users where role = 'founder' limit 1
union all
select 'Growth Rate', 'growth', 14.8, '%', current_date, id from public.users where role = 'founder' limit 1;

-- 4. Sample products (public Products page)
insert into public.products (name, tagline, description, is_public, sort_order)
values
  ('DRYNN Studio', 'Design custom garments in minutes', 'A guided design flow for creating print-ready garment artwork across front, back, and sleeve placements.', true, 1),
  ('Founder OS', 'The operating system for growing startups', 'Company handbook, project management, and reporting in one platform.', true, 2);

-- 5. Sample project
insert into public.projects (name, description, vision_statement, status, owner_id, progress_percent)
select 'Founder OS Launch', 'Ship the v1 platform to the team.', 'Give every team member one place to see the whole company.', 'active', id, 35
from public.users where role = 'founder' limit 1;
