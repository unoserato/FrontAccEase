export interface User {
  id: string
  name: string
  email: string
  profile_picture: string
}

export interface UserProps {
  role: string
  user: User
}

export type UserRole = "learner" | "instructor" | "admin"
