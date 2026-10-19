import type { WCAGPrinciple } from "./wcagProps"

export interface QuizAnswer {
  question_name: string
  answer: string
}

export interface QuizAnswerKey {
  content?: Record<string, unknown>
}

export type QuizSubmissionAnswerKey = QuizAnswerKey

export type QuestionType =
  | "radiogroup"
  | "checkbox"
  | "dropdown"
  | "ranking"
  | "boolean"

export interface QuestionElement {
  type: QuestionType
  name: string
  title: string
  choices?: string[]
  correctAnswer?: any
  isRequired?: boolean
  points?: number
}

export interface QuizPage {
  name: string
  title: string
  elements: QuestionElement[]
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

export interface QuizProps {
  id: string
  name: string
  status?: string
  principle?: WCAGPrinciple
  tags?: string[]
  classrooms?: string[]
  question_count?: number
  total_points?: number
  time_limit?: number
  due_date?: string
  theme?: string
  quiz_json: QuizJson
  created_at?: string
  created_by?: string
  attempt_count?: number
  instructor?: { name: string | null }
  quiz_answer?:
    | QuizAnswerKey
    | QuizAnswer
    | QuizAnswer[]
    | Record<string, unknown>
}

export interface QuizSubmissionProps {
  id: string
  learner_id?: string
  quiz_id?: string
  answers?: Record<string, unknown> | string
  content?: Record<string, unknown> | string
  score?: number
  submitted_at?: string
  submittedAt?: string
  started_at?: string
  startedAt?: string
  attempt_count?: number
  quiz?: Partial<QuizProps> & {
    name: string
    quiz_json?: QuizJson | Record<string, unknown> | string
  }
  quiz_answer?:
    | QuizAnswerKey
    | QuizAnswer
    | QuizAnswer[]
    | Record<string, unknown>
}
