import {
  Book,
  BotMessageSquare,
  FileQuestion,
  Files,
  FileSearch2,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react"
import { SiGoogleclassroom } from "react-icons/si"

export const publicNav = [
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Accessibility", href: "/accessibility" },
  { name: "About", href: "/about" },
]

export const learnerNav = [
  { name: "Dashboard", href: "/learner/dashboard", icon: LayoutDashboard },
  { name: "Modules", href: "/learner/modules", icon: Book },
  // { name: "Quizzes", href: "/learner/quizzes", icon: SiQuizlet },
  { name: "Classroom", href: "/learner/classroom", icon: SiGoogleclassroom },
  { name: "Chat", href: "/learner/chat", icon: BotMessageSquare },
  { name: "Analyzer", href: "/learner/analyzer", icon: FileSearch2 },
]

export const instructorNav = [
  { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
  { name: "Modules", href: "/instructor/modules", icon: Book },
  { name: "Quizzes", href: "/instructor/quizzes", icon: FileQuestion },
  { name: "Classroom", href: "/instructor/classroom", icon: SiGoogleclassroom },
  { name: "Analyzer Logs", href: "/instructor/logs", icon: FileText },
]

export const schoolAdminNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Learning Materials", href: "/admin/learning-materials", icon: Book },
  {
    name: "Instructor Materials",
    href: "/admin/instructor-materials",
    icon: SiGoogleclassroom,
  },
  { name: "Instruments", href: "/admin/instruments", icon: Files },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Analyzer Logs", href: "/admin/logs", icon: FileText },
  { name: "Permissions", href: "/admin/permissions", icon: ShieldCheck },
]
