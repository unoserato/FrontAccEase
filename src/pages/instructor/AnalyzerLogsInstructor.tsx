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
    name: "New Module",
    href: "/",
    variant: "default",
    iconPos: "start",
    icon: Book,
  },
]

export default function AnalyzerLogsInstructor() {
  return (
    <PageWithTitleTemplate
      title="Analyzer Logs"
      subtitle="Real-time audit history and automated scan execution logs for this classroom."
      cta={cta}
    ></PageWithTitleTemplate>
  )
}
