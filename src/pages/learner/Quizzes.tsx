import PageWithTitleTemplate, {
  type StatusTabValue,
} from "@/components/common/PageWithTitleTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import { useState } from "react"

export default function Quizzes() {
  const [search, setSearch] = useState("")
  const [statusTab, setStatusTab] = useState<StatusTabValue>("active")

  return (
    <PageWithTitleTemplate
      title="Quizzes"
      subtitle="Access active quizzes and review archived assessments."
      showStatusTabs
      statusTab={statusTab}
      onStatusTabChange={setStatusTab}
    >
      <SearchTemplate
        title="quizzes"
        search={search}
        setSearch={(value) => setSearch(value)}
      />
    </PageWithTitleTemplate>
  )
}
