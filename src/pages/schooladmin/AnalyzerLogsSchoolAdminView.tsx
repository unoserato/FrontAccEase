import { useParams } from "react-router-dom"
import {
  useAdminAnalyzerLogs,
  useAnalyzerLogsByInstructorId,
} from "@/services/tanstack/materials"
import { AnalyzerLogsInstructorContent } from "@/pages/instructor/AnalyzerLogsInstructor"
import TableSkeleton from "@/components/skeleton/TableSkeleton"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function AnalyzerLogsSchoolAdminView() {
  const { instructor_id } = useParams<{ instructor_id: string }>()
  const { data: adminLogs } = useAdminAnalyzerLogs()
  const { data: logs, isPending, isError } =
    useAnalyzerLogsByInstructorId(instructor_id)

  const instructorName = adminLogs?.instructor_scans?.find(
    (ins) => ins.instructor_id === instructor_id
  )?.instructor_name

  if (isPending) {
    return <TableSkeleton />
  }

  if (isError || !logs) {
    return (
      <section className="p-responsive space-y-6">
        <HeaderTemplate
          title={instructorName || "Faculty Analyzer Logs"}
          subtitle="Failed to load telemetry or instructor logs not found."
          backTo="/admin/logs"
        />
        <Card className="flex h-48 w-full flex-col items-center justify-center gap-2 border-dashed text-sm text-muted-foreground">
          <FileText className="size-8" />
          <span>No analyzer scan telemetry available for this instructor.</span>
        </Card>
      </section>
    )
  }

  return (
    <AnalyzerLogsInstructorContent
      data={logs}
      instructorName={instructorName}
      baseClassroomLogUrl="/admin/logs/classroom"
    />
  )
}
