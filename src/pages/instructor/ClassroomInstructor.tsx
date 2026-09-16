import PageWithTitleTemplate, {
  type CtaItem,
} from "@/components/common/PageWithTitleTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import { Book } from "lucide-react"
import { useState } from "react"

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
  const [search, setSearch] = useState("")
  return (
    <PageWithTitleTemplate
      title="Classrooms"
      subtitle="
      Manage students, active sessions, and announcements."
      cta={cta}
    >
      <SearchTemplate
        title="classroom"
        value={search}
        onChange={(value) => setSearch(value)}
      />
    </PageWithTitleTemplate>
  )
}
