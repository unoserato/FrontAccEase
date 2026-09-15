import SearchTemplate from "@/components/common/SearchTemplate"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import PageWithTitleTemplate from "@/components/common/PageWithTitleTemplate"

export default function Modules() {
  const [search, setSearch] = useState("")
  return (
    <PageWithTitleTemplate title="Modules">
      <div className="max-w-md">
        <SearchTemplate title="modues" onChange={setSearch} value={search} />
      </div>
      <Card>
        <CardContent>{search}</CardContent>
      </Card>
    </PageWithTitleTemplate>
  )
}
