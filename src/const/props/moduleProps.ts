import type { LucideIcon } from "lucide-react"
import type { WCAGPrinciple } from "./wcagProps"
import type { QuizJson } from "./quizProps"

export interface CoreLessonsProps {
  id: string
  name: string // from WCAG_PRINCIPLES_DATA e.g. 1.1.1
  description: string
  content: string | object // the Tiptap contents
  lastModified: string
}

export interface CoreTopicsProps {
  id: string
  name: string
  description: string
  lessons: CoreLessonsProps[]
}

export interface CoreModulesProps {
  id: string
  principle: WCAGPrinciple
  description: string
  topics: CoreTopicsProps[]
  icon: LucideIcon
}

export interface CurriculumRevision {
  id: string
  principle_id: string
  version: number
  status: "draft" | "published" | string
  title: string
  description: string
  created_at: string
  published_at: string | null
}

export interface CurriculumPrinciple {
  id: string
  code: string
  title: string
  display_order: number
  revisions: CurriculumRevision[]
}

export interface ModuleProps {
  id: string
  name: string
  principle: WCAGPrinciple
  created_at: string
  content?: JSON | object
  created_by?: string | null
  classroom_id?: string[]
  archived?: boolean
}

// Core Module Progress (/learner/pour/progress)
export type PrincipleProgressStatus =
  "not_started" | "in_progress" | "completed" | "unavailable" | string

export interface PrincipleActivityProps {
  id: string
  kind: "pre" | "lesson" | "mini" | "interactive" | "post" | string
  title: string
  display_order: number
  required: boolean
  lesson_version_id: string | null
}

export interface PrincipleRevisionProps {
  id: string
  principle_id: string
  title: string
  description: string
  introduction: {
    type: string
    content?: unknown[]
  }
  learning_objectives: string[]
  status: "published" | "draft" | "archived" | string
  version: number
}

export interface PrincipleCompletionProps {
  id?: string
  activity_id?: string
  completed_at?: string
  [key: string]: unknown
}

export interface PrincipleAttemptProps {
  id?: string
  activity_id?: string
  score?: number
  [key: string]: unknown
}

export interface PrincipleProgressProps {
  completed_activities: number
  total_activities: number
  percentage: number
  status: PrincipleProgressStatus
  completed_lessons: number
  total_lessons: number
  lesson_percentage: number
  next_activity_id: string | null
  id: string
  title: string
  revision: PrincipleRevisionProps | null
  activities: PrincipleActivityProps[]
  completions?: PrincipleCompletionProps[]
  attempts?: PrincipleAttemptProps[]
}

export interface PrincipleProgressItem {
  name: "perceivable" | "operable" | "understandable" | "robust" | string
  content: PrincipleProgressProps
}

// export interface CoreModuleProgressProps {
//   completed_activities: number
//   total_activities: number
//   percentage: number
//   status: PrincipleProgressStatus
//   principles: PrincipleProgressItem[]
// }

export interface CoreModuleProgressProps {
  overall_progress: number
  active_principle: string
  next_activity: NextActivityProps
  principles: CoreModuleProgressItemProps[]
}

export interface NextActivityProps {
  id: string
  name: string
  description: string
}

export interface CoreModuleProgressItemProps {
  name: WCAGPrinciple
  description: string
  progress: number
}

export interface CoreModuleActivityItemProps {
  id: string
  display_order: number
  name: string
  description: string
  type: "pre" | "lesson" | "mini" | "interactive" | "post" | string
}

export interface CoreModuleCompletionItemProps {
  activity_id: string
  completed_at: string
}

export interface CoreModuleProgressPrincipleProps {
  name: WCAGPrinciple
  description: string
  completed_activites: number
  next_activity_id: string //to prevent url manipulation
  activities: CoreModuleActivityItemProps[]
  completions: CoreModuleCompletionItemProps[]
}

// Activity Contents (/learner/pour/activities/:id)
export interface CoreModuleLessonDetail {
  id: string
  title: string
  description: string
  learning_objectives: string[]
  content:
    | {
        type: string
        content?: {
          type: string
          content?: {
            text?: string
            type: string
            [key: string]: unknown
          }[]
          [key: string]: unknown
        }[]
        [key: string]: unknown
      }
    | string
  wcag_criteria: string[]
}

export interface CoreModuleLessonActivity {
  id: string
  kind: "lesson"
  title: string
  display_order: number
  required: boolean
  lesson: CoreModuleLessonDetail
}

export interface CoreModuleAssessmentActivity {
  id: string
  kind: "mini" | "pre" | "post" | string
  title: string
  display_order: number
  required: boolean
  questions: QuizJson | Record<string, unknown>
  max_attempts: number
  passing_percent: number
  attempt_count: number
}

export interface CoreModuleScenarioChoice {
  value: string
  label: string
}

export interface CoreModuleScenario {
  prompt: string
  choices: CoreModuleScenarioChoice[]
  correct_answer?: string
  explanation?: string
  feedback?: Record<string, string>
  [key: string]: unknown
}

export interface CoreModuleInteractiveActivity {
  id: string
  kind: "interactive"
  title: string
  display_order: number
  required: boolean
  scenario: CoreModuleScenario
}

export type CoreModuleActivityContent =
  | CoreModuleLessonActivity
  | CoreModuleAssessmentActivity
  | CoreModuleInteractiveActivity

export interface ActivityLockedResponse {
  detail: string
}

export type CoreModuleActivityResponse =
  CoreModuleActivityContent | ActivityLockedResponse
