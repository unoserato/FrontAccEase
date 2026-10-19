import type { User } from "./userProps"
import type { ModuleProps } from "./moduleProps"
import type { QuizProps, QuizSubmissionProps } from "./quizProps"

export interface ClassroomProps {
  id: string
  classroom_code: string
  classroom_join_code: string
  name: string
  classroom_description: string
  archived: boolean
  instructor?: { name: string | null }
  created_by?: string
  enrollment_count: number
  created_at?: string
}

export interface ClassroomViewProps {
  classroom: ClassroomProps
  modules: ModuleProps[]
  learners: User[]
  quizzes: QuizProps[]
  submissions: QuizSubmissionProps[]
}

export type ClassroomContentProps = ClassroomViewProps
