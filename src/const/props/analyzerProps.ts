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
  content: Result
}

export interface WcagEvaluationProps {
  // main llm props
  id: string
  learner_id: string
  content: Content
  status: string | null
  created_at: string
}
// summary
export interface AnalyzerSummaryProps {
  created_at: string
  id: string
  score: number
  url: string
  violation_count: number
}
