export type UserRole = "founder" | "manager" | "team_member";
export type ProjectStatus = "planning" | "active" | "on_hold" | "completed" | "cancelled";
export type TaskStatus = "todo" | "in_progress" | "in_review" | "done" | "blocked";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type ReportType = "weekly" | "monthly" | "team" | "project";
export type DocumentCategory = "sop" | "meeting_notes" | "decision" | "lesson_learned" | "internal";
export type LawStatus = "active" | "draft" | "archived";
export type LawSection =
  | "constitution"
  | "laws"
  | "roles"
  | "playbook"
  | "leadership"
  | "systems";

export interface UserRow {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  title: string | null;
  department: string | null;
  phone: string | null;
  is_active: boolean;
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectRow {
  id: string;
  name: string;
  description: string | null;
  vision_statement: string | null;
  status: ProjectStatus;
  owner_id: string | null;
  manager_id: string | null;
  start_date: string | null;
  target_date: string | null;
  completed_at: string | null;
  approved_by: string | null;
  approved_at: string | null;
  progress_percent: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectMilestoneRow {
  id: string;
  project_id: string;
  title: string;
  due_date: string | null;
  is_completed: boolean;
  completed_at: string | null;
  sort_order: number;
  created_at: string;
}

export interface TaskRow {
  id: string;
  project_id: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigned_to: string | null;
  created_by: string | null;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskCommentRow {
  id: string;
  task_id: string;
  author_id: string | null;
  body: string;
  created_at: string;
}

export interface DocumentRow {
  id: string;
  title: string;
  category: DocumentCategory;
  content: string | null;
  file_url: string | null;
  project_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SopRow {
  id: string;
  title: string;
  department: string | null;
  summary: string | null;
  content: string;
  version: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReportRow {
  id: string;
  type: ReportType;
  title: string;
  period_start: string | null;
  period_end: string | null;
  summary: string | null;
  content: string | null;
  project_id: string | null;
  submitted_by: string | null;
  created_at: string;
}

export interface MeetingRow {
  id: string;
  title: string;
  notes: string | null;
  held_at: string;
  created_by: string | null;
  project_id: string | null;
  created_at: string;
}

export interface KpiRow {
  id: string;
  label: string;
  category: string | null;
  value: number;
  unit: string | null;
  recorded_for: string;
  created_by: string | null;
  created_at: string;
}

export interface CompanyLawRow {
  id: string;
  section: LawSection;
  title: string;
  content: string;
  status: LawStatus;
  version: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductRow {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  is_public: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Minimal Database interface for supabase-js typing.
// Extend per-table `Row`/`Insert`/`Update` shapes as the schema evolves.
export interface Database {
  public: {
    Tables: {
      users: { Row: UserRow; Insert: Partial<UserRow>; Update: Partial<UserRow> };
      projects: { Row: ProjectRow; Insert: Partial<ProjectRow>; Update: Partial<ProjectRow> };
      project_milestones: {
        Row: ProjectMilestoneRow;
        Insert: Partial<ProjectMilestoneRow>;
        Update: Partial<ProjectMilestoneRow>;
      };
      tasks: { Row: TaskRow; Insert: Partial<TaskRow>; Update: Partial<TaskRow> };
      task_comments: {
        Row: TaskCommentRow;
        Insert: Partial<TaskCommentRow>;
        Update: Partial<TaskCommentRow>;
      };
      documents: { Row: DocumentRow; Insert: Partial<DocumentRow>; Update: Partial<DocumentRow> };
      sops: { Row: SopRow; Insert: Partial<SopRow>; Update: Partial<SopRow> };
      reports: { Row: ReportRow; Insert: Partial<ReportRow>; Update: Partial<ReportRow> };
      meetings: { Row: MeetingRow; Insert: Partial<MeetingRow>; Update: Partial<MeetingRow> };
      kpis: { Row: KpiRow; Insert: Partial<KpiRow>; Update: Partial<KpiRow> };
      company_laws: {
        Row: CompanyLawRow;
        Insert: Partial<CompanyLawRow>;
        Update: Partial<CompanyLawRow>;
      };
      products: { Row: ProductRow; Insert: Partial<ProductRow>; Update: Partial<ProductRow> };
    };
  };
}
