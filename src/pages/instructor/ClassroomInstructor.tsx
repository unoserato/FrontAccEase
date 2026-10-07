import ClassroomCardTemplate from "@/components/common/ClassroomCardTemplate"
import HeaderTemplate from "@/components/common/PageTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import TooltipButtonTemplate from "@/components/common/TooltipButtonTemplate"
import NewClassroomDialog from "@/features/instructor/NewClassroomDialog"
import { useClassrooms } from "@/services/tanstack/materials"
import { Archive } from "lucide-react"
import { useState } from "react"

export default function ClassroomInstructor() {
  const [search, setSearch] = useState("")
  const { data: classrooms } = useClassrooms()

  const filteredClassrooms = classrooms.filter((c) =>
    search.trim().length > 0
      ? c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.classroom_code.toLowerCase().includes(search.toLowerCase())
      : true
  )

  return (
    <section className="p-responsive">
      <HeaderTemplate
        title="Classroom Management"
        subtitle="Manage classrooms"
        cta={[<NewClassroomDialog key="new-classroom" />]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full flex-1 sm:max-w-md md:max-w-lg">
          <SearchTemplate
            search={search}
            setSearch={(e) => setSearch(e)}
            title="Classroom"
          />
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2">
          <TooltipButtonTemplate
            triggerTextIcon={<Archive />}
            triggerVariant="outline"
            content="Archived Classroom"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-20 min-[540px]:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
        {filteredClassrooms.map((classroom) => (
          <ClassroomCardTemplate key={classroom.id} classroom={classroom} />
        ))}
      </div>
    </section>
  )
}
