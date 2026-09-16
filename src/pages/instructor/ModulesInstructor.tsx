import PageWithTitleTemplate, {
  type CtaItem,
} from "@/components/common/PageWithTitleTemplate"
import { Button } from "@/components/ui/button"
import { Pencil, Plus } from "lucide-react"

const cta: CtaItem[] = [
  {
    name: "Drafts",
    ctaFn: function alertFn() {
      alert("Draft button clicked")
    },
    variant: "ghost",
    iconPos: "start",
  },
  {
    name: "New Module",
    href: "./new",
    variant: "default",
    iconPos: "start",
    icon: Plus,
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
