import {
  Book,
  BotMessageSquare,
  Files,
  FileSearch2,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react"
import { SiGoogleclassroom, SiQuizlet } from "react-icons/si"

export const publicNav = [
  { name: "Learner", href: "/learner" },
  { name: "Instructor", href: "/instructor" },
  { name: "Admin", href: "/admin" },
]

export const learnerNav = [
  { name: "Dashboard", href: "/learner/dashboard", icon: LayoutDashboard },
  { name: "Modules", href: "/learner/modules", icon: Book },
  { name: "Quizzes", href: "/learner/quizzes", icon: SiQuizlet },
  { name: "Classroom", href: "/learner/classroom", icon: SiGoogleclassroom },
  { name: "Chat", href: "/learner/chat", icon: BotMessageSquare },
  { name: "Analyzer", href: "/learner/analyzer", icon: FileSearch2 },
]
export const instructorNav = [
  { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
  { name: "Modules", href: "/instructor/modules", icon: Book },
  { name: "Quizzes", href: "/instructor/quizzes", icon: SiQuizlet },
  { name: "Classroom", href: "/instructor/classroom", icon: SiGoogleclassroom },
  { name: "Analyzer Logs", href: "/instructor/logs", icon: FileText },
]
export const adminNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Academic Materials", href: "/admin/materials", icon: Book },
  { name: "Instruments", href: "/admin/instruments", icon: Files },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Analyzer Logs", href: "/admin/logs", icon: FileText },
  { name: "Permissions", href: "/admin/permissions", icon: ShieldCheck },
]
