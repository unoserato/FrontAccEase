import PageWithTitleTemplate, {
  type CtaItem,
} from "@/components/common/PageWithTitleTemplate"
import { Book } from "lucide-react"

const cta: CtaItem[] = [
  {
    name: "New Module",
    href: "/",
    variant: "default",
    iconPos: "start",
    icon: Book,
  },
]

export default function ClassroomInstructor() {
  return (
    <PageWithTitleTemplate
      title="Classrooms"
      subtitle="
      Manage students, active sessions, and announcements."
      cta={cta}
    ></PageWithTitleTemplate>
  )
}
