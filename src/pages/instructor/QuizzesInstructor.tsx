import PageWithTitleTemplate, {
  type CtaItem,
} from "@/components/common/PageWithTitleTemplate"
import { Book, Pencil } from "lucide-react"

const cta: CtaItem[] = [
  {
    name: "Drafts",
    href: "/",
    variant: "secondary",
    iconPos: "start",
    icon: Pencil,
  },
  {
    name: "New Quiz",
    href: "/",
    variant: "default",
    iconPos: "start",
    icon: Book,
  },
]

export default function QuizzesInstructor() {
  return (
    <PageWithTitleTemplate
      title="Quizzes"
      subtitle="Design, publish, and monitor student evaluations."
      cta={cta}
    ></PageWithTitleTemplate>
  )
}
