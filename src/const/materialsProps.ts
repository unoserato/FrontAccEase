import type { UserProps } from "./data"

export interface ModuleProps {
  id: string
  created_at: string
  title: string
  principle: "Perceivable" | "Operable" | "Understandable" | "Robust"
  content: string | object
}

export interface ClassroomProps {
  id: string
  name: string
  classroom_code: string
  join_code: string
  learners: UserProps[] | []
}
