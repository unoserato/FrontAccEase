import type { User } from "./userProps"

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
}

export interface ModuleProps {
  id: string
  name: string
  principle: string
  created_at: string
  content: JSON | object
  created_by: string | null
  classroom_id: string[]
  archived: boolean
}

export interface InstructorMaterialsProps {
  role: string
  user: User & {
    module_count: number
    classroom_count: number
    quiz_count: number
  }
}
