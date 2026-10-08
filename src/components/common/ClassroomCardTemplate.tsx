import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { useState } from "react"
import { Badge } from "../ui/badge"
import DeleteArchiveDialog, {
  type ActionType,
} from "../instructor/DeleteArchiveDialog"
import { useNavigate } from "react-router-dom"
import EditorDropdown from "./EditorDropdown"
import { useMe } from "@/services/tanstack/auth"
import { Users } from "lucide-react"
import type { ClassroomProps } from "@/const/props/materialProps"

export default function ClassroomCardTemplate({
  classroom,
}: {
  classroom: ClassroomProps
}) {
  const [action, setAction] = useState<ActionType>(null)
  const navigate = useNavigate()
  const { data: user } = useMe()
  const isEditor = user?.role == "instructor"

  return (
    <>
      <Card
        onClick={() => navigate(`/${user.role}/classroom/${classroom.id}`)}
        className="group relative flex min-h-52 w-full cursor-pointer flex-col justify-between overflow-hidden p-0 sm:min-h-56"
      >
        {/* Google Classroom Header Banner */}
        <CardHeader className="relative bg-foreground p-4 pr-12 text-background sm:p-5">
          <div className="space-y-1 pr-6">
            <CardTitle className="line-clamp-1 text-base font-bold text-background capitalize sm:text-lg">
              {classroom.classroom_code}
            </CardTitle>
            <CardDescription className="line-clamp-1 text-xs text-background/80 sm:text-sm">
              {classroom.name}
            </CardDescription>
          </div>

          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            {isEditor && (
              <EditorDropdown setAction={(value) => setAction(value)} />
            )}
          </div>
        </CardHeader>

        {/* Card Body & Footer */}
        <CardContent className="flex items-center justify-between p-4 sm:p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground sm:text-sm">
                {classroom.enrollment_count}{" "}
                {classroom.enrollment_count === 1 ? "Learner" : "Learners"}
              </p>
              <p className="text-xs text-muted-foreground sm:text-xs">
                Enrolled
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs sm:text-xs">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      <DeleteArchiveDialog
        action={action}
        setAction={setAction}
        item={classroom}
        editUrl={`/instructor/classroom/edit/${classroom.id}`}
        itemType="classroom"
      />
    </>
  )
}
