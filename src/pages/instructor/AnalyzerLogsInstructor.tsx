import PageWithTitleTemplate, {
  type CtaItem,
} from "@/components/common/PageWithTitleTemplate"
import { FileText } from "lucide-react"

const cta: CtaItem[] = [
  {
    name: "Export Data",
    ctaFn: () => {
      alert("Export")
    },
    variant: "default",
    iconPos: "start",
    icon: FileText,
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
