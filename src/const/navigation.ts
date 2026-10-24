import {
  Activity,
  BarChart3,
  BookMarked,
  BotMessageSquare,
  HelpCircle,
  FolderKanban,
  LayoutDashboard,
  Library,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react"
import { SiGoogleclassroom } from "react-icons/si"

export const publicNav = [
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
  { name: "Accessibility", href: "/accessibility" },
  { name: "About", href: "/about" },
]

export const learnerNav = [
  { name: "Dashboard", href: "/learner/dashboard", icon: LayoutDashboard },
  { name: "Modules", href: "/learner/modules", icon: BookMarked },
  // { name: "Quizzes", href: "/learner/quizzes", icon: HelpCircle },
  { name: "Classroom", href: "/learner/classroom", icon: SiGoogleclassroom },
  { name: "Chat", href: "/learner/chat", icon: BotMessageSquare },
  { name: "Analyzer", href: "/learner/analyzer", icon: ScanSearch },
]

export const instructorNav = [
  { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
  { name: "Modules", href: "/instructor/modules", icon: BookMarked },
  { name: "Quizzes", href: "/instructor/quizzes", icon: HelpCircle },
  { name: "Classroom", href: "/instructor/classroom", icon: SiGoogleclassroom },
  { name: "Analyzer Logs", href: "/instructor/logs", icon: Activity },
]

export const schoolAdminNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Learning Materials", href: "/admin/learning-materials", icon: Library },
  {
    name: "Instructor Materials",
    href: "/admin/instructor-materials",
    icon: FolderKanban,
  },
  { name: "Instruments", href: "/admin/instruments", icon: SlidersHorizontal },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Analyzer Logs", href: "/admin/logs", icon: BarChart3 },
  { name: "Permissions", href: "/admin/permissions", icon: ShieldCheck },
]
