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
    "2.2.2 Pause, Stop, Hide",
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
    "3.3.4 Error Prevention (Legal, Financial, Data)",
    "3.3.7 Redundant Entry",
    "3.3.8 Accessible Authentication (Minimum)",
  ],
  Robust: ["4.1.2 Name, Role, Value", "4.1.3 Status Messages"],
}

export interface ModuleProps {
  id: string
  created_at: string
  name: string
  principle: WCAGPrinciple
  content: string | object
  tags: string[]
  classrooms: string[]
}

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
}

export interface QuizProps {
  id: string
  name: string
  created_at: string
  content?: string | QuizJson | object
  quizContent?: QuizJson
  principle?: WCAGPrinciple
  questions_count?: number
  time_limit?: number
  total_points?: number
  tags?: string[]
  status?: "Open" | "Closed" | "Draft"
  author?: string
  passing_rate?: number
  avg_score?: number
  submissions_count?: number
  total_submissions?: number
  due_date?: string
  classrooms?: string[]
  theme?: string
}

export interface ClassroomProps {
  id: string
  name: string
  classroom_code: string
  join_code: string
  learners: string[]
}

export interface Submission {
  user_id: string
  content: string
  score: number | null
}

export interface Classwork {
  id: string
  classroom_id: string
  name: string
  due: string | null
  submissions: Submission[]
}

export interface QuizSubmissionProps {
  id: string
  quizId: string
  learnerId: string
  content: string | object
  score?: number
  submitted_at?: string
}
