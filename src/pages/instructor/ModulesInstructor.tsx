import PageWithTitleTemplate, {
  type CtaItem,
} from "@/components/common/PageWithTitleTemplate"
import { Book, Pencil } from "lucide-react"

const cta: CtaItem[] = [
  {
    name: "Drafts",
    ctaFn: function alertFn() {
      alert("Draft button clicked")
    },
    variant: "secondary",
    iconPos: "start",
    icon: Pencil,
  },
  {
    name: "New Module",
    href: "./new",
    variant: "default",
    iconPos: "start",
    icon: Book,
  },
]

export default function ModulesInstructor() {
  return (
    <PageWithTitleTemplate
      title="Modules"
      subtitle="Create, organize, and publish course materials."
      cta={cta}
    ></PageWithTitleTemplate>
  )
}
