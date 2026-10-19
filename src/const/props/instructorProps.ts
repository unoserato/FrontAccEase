import type { User } from "./userProps"

export interface InstructorMaterialsProps {
  role: string
  user: User & {
    module_count: number
    classroom_count: number
    quiz_count: number
  }
}
