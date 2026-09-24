import type { ClassroomProps } from "@/const/materialsProps"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Archive, EllipsisVertical, Pencil, Trash, Users } from "lucide-react"
import { useState } from "react"
import { Badge } from "../ui/badge"
import DeleteArchiveDialog, {
  type ActionType,
} from "../instructor/DeleteArchiveDialog"

export default function ClassroomCardTemplate({
  classroom,
}: {
  classroom: ClassroomProps
}) {
  const [action, setAction] = useState<ActionType>(null)

  return (
    <>
      <Card className="group relative flex min-h-52 w-full cursor-pointer flex-col justify-between overflow-hidden p-0 sm:min-h-56">
        {/* Google Classroom Header Banner */}
        <CardHeader className="relative bg-foreground p-4 pr-12 text-background sm:p-5">
          <div className="space-y-1 pr-6">
            <CardTitle className="line-clamp-1 text-base font-bold text-background capitalize sm:text-lg">
              {classroom.classroomCode}
            </CardTitle>
            <CardDescription className="line-clamp-1 text-xs text-background/80 sm:text-sm">
              {classroom.name}
            </CardDescription>
          </div>

          <div
            className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                onClick={(e) => e.stopPropagation()}
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-background hover:bg-background/20 hover:text-background"
                    aria-label="Classroom actions"
                  >
                    <EllipsisVertical className="size-4" />
                  </Button>
                }
              />

              <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                align="end"
              >
                <DropdownMenuItem onClick={() => setAction("edit")}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setAction("archive")}>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setAction("delete")}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                {classroom.learners.length}{" "}
                {classroom.learners.length === 1 ? "Learner" : "Learners"}
              </p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                Enrolled
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] sm:text-xs">
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
