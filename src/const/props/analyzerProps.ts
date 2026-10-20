// llm scan
export interface TargetContext {
  next: string
  previous: string
}

export interface Target {
  html: string
  parent: string
  context: TargetContext
}

export interface Criterion {
  id: string
  level: string
  title: string
  principle: string
  description: string
}

export interface Task {
  target: Target
  task_id: string
  criterion: Criterion
  evaluation_prompt: string
  status?: string
  reason?: string
}

export interface PourGroups {
  robust: Task[]
  operable: Task[]
  perceivable: Task[]
  understandable: Task[]
}

export interface PourSummary {
  robust: number
  operable: number
  perceivable: number
  understandable: number
}

export interface TaskBatch {
  tasks: Task[]
  pour_groups: PourGroups
  total_tasks: number
  pour_summary: PourSummary
  system_prompt: string
}

export interface Content {
  url: string
  scan_type: string
  task_batch: TaskBatch
}

// server scan
export interface PrincipleIssue {
  wcag: string
  level?: string
  message: string
  severity?: "critical" | "serious" | "moderate" | "minor" | string
  status?: string
  count?: number
  element?: string
  selector?: string
  identifier?: string
  examples?: Array<{
    element?: string
    selector?: string
    identifier?: string
  }>
}

export interface PrinciplePassed {
  wcag: string
  level?: string
  element?: string
  selector?: string
  message: string
  status?: string
  severity?: string | null
}

export interface PrincipleSummaryCount {
  name: string
  count: number
}

export interface PrincipleData {
  score: number
  summary?:
    | PrincipleSummaryCount[]
    | {
        critical_count?: number
        failed_count?: number
        manual_review_count?: number
        minor_count?: number
        moderate_count?: number
        passed_count?: number
        serious_count?: number
      }
  issues: PrincipleIssue[]
  passed?: PrinciplePassed[]
  manual_review?: any[]
}

export interface PrincipleItem {
  name: string
  data: PrincipleData
}

export interface PrincipleScoreItem {
  principle: string
  score: number
}

export interface ResultSummaryItem {
  name: string
  count: number
}

export interface Result {
  url: string
  overall_score?: number
  principles: PrincipleItem[]
  summary?:
    | ResultSummaryItem[]
    | {
        critical_count?: number
        failed_count?: number
        manual_review_count?: number
        minor_count?: number
        moderate_count?: number
        passed_count?: number
        serious_count?: number
      }
  principle_scores?: PrincipleScoreItem[]
  elapsed_time?: number
}

// what is needed only
export interface AnalyzerResultItem {
  // main server props
  id: string
  created_at?: string
  learner_id?: string
  status?: string | null
  content: Result | string
  instructor_comment: string | null
}

export interface WcagEvaluationProps {
  // main llm props
  id: string
  learner_id?: string
  content: Content | string
  status?: string | null
  created_at?: string
  instructor_comment: string | null
}

export interface AnalyzerResultsProps {
  id?: string
  data?: AnalyzerResultItem | WcagEvaluationProps | Result
  scanEntry?: AnalyzerResultItem | WcagEvaluationProps
  result?: Result
  hideHeaderBack?: boolean
  backTo?: string
  onBack?: () => void
  hideSitemap?: boolean
}

// summary
export interface AnalyzerSummaryProps {
  created_at: string
  id: string
  score: number
  url: string
  violation_count: number
}

// Instructor Classroom Analyzer Logs
export interface AnalyzerUsageDay {
  date: string
  scan_count: number
}

export interface IssuesPerPrinciple {
  perceivable: number
  operable: number
  robust: number
  understandable: number
}

export interface ClassroomScanItem {
  classroom_id: string
  class_name: string
  classroom_code?: string
  scan_count: number
  enrollment_count: number
  total_violations?: number
  pass_rate?: number
  last_scanned_at?: string
}

export interface ClassroomAnalyzerLogsResponse {
  total_scans: number
  active_classrooms: number
  violations: number
  pass_rate: number
  scans_per_classroom: Record<string, number>
  analyzer_usage_last_7_days: AnalyzerUsageDay[]
  classroom_scan_count: number
  issues_per_principle: IssuesPerPrinciple
  classroom_scans: ClassroomScanItem[]
}

export interface ClassroomScanDetailItem {
  id: string
  url: string | null
  score: number | null
  created_at: string
  violation_count: number
  learner_name: string
}

export interface ClassroomAnalyzerLogsDetailResponse {
  total_scans: number
  violations: number
  pass_rate: number
  analyzer_usage_last_7_days: AnalyzerUsageDay[]
  classroom_scan_count: number
  issues_per_principle: IssuesPerPrinciple
  classroom_scans: ClassroomScanDetailItem[]
}
