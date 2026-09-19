import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import PageWithTitleTemplate, {
  type StatusTabValue,
} from "@/components/common/PageWithTitleTemplate"

export default function Modules() {
  const [search, setSearch] = useState("")
  const [statusTab, setStatusTab] = useState<StatusTabValue>("active")

  return (
    <PageWithTitleTemplate
      searchTitle="modules"
      showSearch={true}
      searchValue={search}
      onSearchChange={(e) => setSearch(e)}
      title="Modules"
      subtitle="Browse enrolled and available learning modules."
      showStatusTabs={false}
      statusTab={statusTab}
      onStatusTabChange={setStatusTab}
    >
      <Card>
        <CardContent>{search || `Showing ${statusTab} modules`}</CardContent>
      </Card>
    </PageWithTitleTemplate>
  )
}
