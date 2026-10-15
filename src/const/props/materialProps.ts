import type { LucideIcon } from "lucide-react"
import type { User } from "./userProps"

export type WCAGPrinciple =
  "Perceivable" | "Operable" | "Understandable" | "Robust"

export const WCAG_PRINCIPLES_DATA: Record<WCAGPrinciple, string[]> = {
  Perceivable: [
    "1.1.1 Non-Text Content",
    "1.2.1 Audio-only and Video-only",
    "1.2.2 Captions (Prerecorded)",
    "1.2.3 Audio Description or Media Alternative",
    "1.3.1 Info and Relationships",
    "1.3.2 Meaningful Sequence",
    "1.3.3 Sensory Characteristics",
    "1.3.4 Orientation",
    "1.3.5 Identify Input Purpose",
    "1.4.1 Use of Color",
    "1.4.2 Audio Control",
    "1.4.3 Contrast (Minimum)",
    "1.4.4 Resize Text",
    "1.4.10 Reflow",
    "1.4.11 Non-text Contrast",
    "1.4.12 Text Spacing",
    "1.4.13 Content on Hover or Focus",
  ],

  Operable: [
    "2.1.1 Keyboard",
    "2.1.2 No Keyboard Trap",
    "2.1.4 Character Key Shortcuts",
    "2.2.1 Timing Adjustable",
    "2.2.2 Pause Stop Hide",
    "2.3.1 Three Flashes or Below Threshold",
    "2.4.1 Bypass Blocks",
    "2.4.2 Page Titled",
    "2.4.3 Focus Order",
    "2.4.4 Link Purpose (In Context)",
    "2.4.6 Headings and Labels",
    "2.4.7 Focus Visible",
    "2.5.1 Pointer Gestures",
    "2.5.2 Pointer Cancellation",
    "2.5.3 Label in Name",
    "2.5.7 Dragging Movements",
    "2.5.8 Target Size (Minimum)",
  ],
  Understandable: [
    "3.1.1 Language of Page",
    "3.1.2 Language of Parts",
    "3.2.1 On Focus",
    "3.2.2 On Input",
    "3.2.3 Consistent Navigation",
    "3.2.4 Consistent Identification",
    "3.2.6 Consistent Help",
    "3.3.1 Error Identification",
    "3.3.2 Labels or Instructions",
    "3.3.3 Error Suggestion",
    "3.3.4 Error Prevention (Legal Financial Data)",
    "3.3.7 Redundant Entry",
    "3.3.8 Accessible Authentication (Minimum)",
  ],
  Robust: ["4.1.2 Name Role Value", "4.1.3 Status Messages"],
}

export interface CoreTopicsProps {
  id: string
  name: string
  description: string
  lessons: CoreLessonsProps[]
}

export interface CoreLessonsProps {
  id: string
  name: string //from WCAG_PRINCIPLE_DATA e.g. 1.1.1
  description: string
  content: string | object // the Tiptap contents
  lastModified: string
}

export interface ClassroomProps {
  id: string
  classroom_code: string
  classroom_join_code: string
  name: string
  classroom_description: string
  archived: boolean
  instructor: { name: string }
  enrollment_count: number
  created_at: string
}

export interface ClassroomViewProps {
  classroom: ClassroomProps
  modules: ModuleProps[]
  learners: User[]
  quizzes: QuizProps[]
}

export interface ModuleProps {
  id: string
  name: string
  principle: WCAGPrinciple
  created_at: string
  content: JSON | object
  created_by: string | null
  classroom_id: string[]
  archived: boolean
}

export interface CoreModulesProps {
  id: string
  principle: WCAGPrinciple
  description: string
  topics: CoreTopicsProps[]
  icon: LucideIcon
}

export interface InstructorMaterialsProps {
  role: string
  user: User & {
    module_count: number
    classroom_count: number
    quiz_count: number
  }
}

// quiz
export type QuestionType =
  "radiogroup" | "checkbox" | "dropdown" | "ranking" | "boolean"

export interface QuizProps {
  id: string
  name: string
  status?: string
  principle: WCAGPrinciple
  tags: string[]
  classrooms: string[]
  question_count?: number
  total_points?: number
  time_limit: number | undefined
  due_date: string
  theme: string
  quiz_json: QuizJson
  created_at: string
  created_by?: string
  attempt_count: number
  items?: number
}

export interface QuizJson {
  title: string
  description?: string
  showQuestionNumbers?: string
  showProgressBar?: boolean | string
  progressBarLocation?: string
  progressBarType?: string
  progressBarShowPageNumbers?: boolean
  progressBarShowNavigationText?: boolean
  completedHtml?: string
  pages: QuizPage[]
  timeLimit?: number
  showTimer?: boolean
}

export interface QuizPage {
  name: string
  title: string
  elements: QuestionElement[]
}

export interface QuestionElement {
  type: QuestionType
  name: string
  title: string
  choices?: string[]
  correctAnswer?: any
  isRequired?: boolean
  points?: number
}

// Analyzer
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
  overall_score: number
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
  elapsed_time: number
}

export interface AnalyzerResultItem {
  id: string
  created_at: string
  learner_id: string
  content: Result
}
