export interface ClassroomProps {
  id: string
  classroom_code: string
  classroom_join_code?: string | null
  name: string
  classroom_description: string
  archived: boolean
  instructor: { name: string }
  enrollment_count: number
}

export interface ModuleProps {
  id: string
  name: string
  principle: string
  created_at: string
  content: JSON | object
  created_by: string | null
  classroom_id: string[]
}

