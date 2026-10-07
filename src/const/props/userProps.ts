export interface UserProps {
  role: string
  user: {
    id: string
    name: string
    email: string
    profile_picture: string
  }
}

export type UserRole = "learner" | "instructor" | "admin"
