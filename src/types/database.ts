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

// Properly typed Database interface compatible with @supabase/supabase-js generics.
// Insert omits auto-generated fields (id, created_at, updated_at) and makes
// nullable fields optional. Update makes all fields optional.
export interface Database {
  public: {
    Tables: {
      users: {
        Row: UserRow;
        Insert: Omit<UserRow, "id" | "created_at" | "updated_at" | "joined_at"> & { id?: string; joined_at?: string; created_at?: string; updated_at?: string };
        Update: Partial<UserRow>;
      };
      projects: {
        Row: ProjectRow;
        Insert: Omit<ProjectRow, "id" | "created_at" | "updated_at"> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<ProjectRow>;
      };
      project_milestones: {
        Row: ProjectMilestoneRow;
        Insert: Omit<ProjectMilestoneRow, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<ProjectMilestoneRow>;
      };
      tasks: {
        Row: TaskRow;
        Insert: Omit<TaskRow, "id" | "created_at" | "updated_at"> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<TaskRow>;
      };
      task_comments: {
        Row: TaskCommentRow;
        Insert: Omit<TaskCommentRow, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<TaskCommentRow>;
      };
      documents: {
        Row: DocumentRow;
        Insert: Omit<DocumentRow, "id" | "created_at" | "updated_at"> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<DocumentRow>;
      };
      sops: {
        Row: SopRow;
        Insert: Omit<SopRow, "id" | "created_at" | "updated_at"> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<SopRow>;
      };
      reports: {
        Row: ReportRow;
        Insert: Omit<ReportRow, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<ReportRow>;
      };
      meetings: {
        Row: MeetingRow;
        Insert: Omit<MeetingRow, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<MeetingRow>;
      };
      kpis: {
        Row: KpiRow;
        Insert: Omit<KpiRow, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<KpiRow>;
      };
      company_laws: {
        Row: CompanyLawRow;
        Insert: Omit<CompanyLawRow, "id" | "created_at" | "updated_at"> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<CompanyLawRow>;
      };
      products: {
        Row: ProductRow;
        Insert: Omit<ProductRow, "id" | "created_at" | "updated_at"> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<ProductRow>;
      };
    };
  };
}
