import type { User } from "./userProps"
import type { WCAGPrinciple } from "./wcagProps"

export interface InstructorMaterialsCountProps {
  role: string
  user: User & {
    module_count: number
    classroom_count: number
    quiz_count: number
  }
}

export interface InstructorMaterialsQuizItem {
  id: string
  name: string
  principle?: WCAGPrinciple | string
  due_date?: string
  question_count?: number
  total_points?: number
  created_by?: string
  status?: string
}

export interface InstructorMaterialsModuleItem {
  id: string
  name: string
  principle: WCAGPrinciple | string
  archived: boolean | null
  created_at: string
}

export interface InstructorMaterialsClassroomItem {
  id: string
  name: string
  code: string
  enrollment_count: number
  classroom_code?: string
  archived?: boolean
}

export interface InstructorMaterialsDetailProps {
  quizzes: InstructorMaterialsQuizItem[]
  modules: InstructorMaterialsModuleItem[]
  classrooms: InstructorMaterialsClassroomItem[]
}
