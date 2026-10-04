import type { ModuleProps } from "@/const/materialsProps"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { getDateString } from "@/hooks/date-to-string"
import { Badge } from "../ui/badge"
import { Label } from "../ui/label"
import { useMemo, useState } from "react"
import DeleteArchiveDialog, {
  type ActionType,
} from "../instructor/DeleteArchiveDialog"
import EditorDropdown from "./EditorDropdown"
import { useNavigate } from "react-router-dom"
import { classrooms } from "@/const/data"
import { GraduationCap } from "lucide-react"
import { useMe } from "@/services/tanstack/auth"

export type ModuleCardTemplateProps = {
  module: ModuleProps
  view?: "grid" | "list"
}

export default function ModuleCardTemplate({
  module,
  view = "grid",
}: ModuleCardTemplateProps) {
  const [action, setAction] = useState<ActionType>(null)
  const { data: user } = useMe()
  const navigate = useNavigate()
  const isEditor = user?.role === "instructor"

  const assignedClassrooms = useMemo(() => {
    return (module.classrooms ?? [])
      .map((cId) => classrooms.find((c) => String(c.id) === String(cId)))
      .filter(Boolean)
  }, [module.classrooms])

  if (view === "list") {
    return (
      <>
        <div
          onClick={() => {
            navigate(`/instructor/modules/${module.id}`)
          }}
          className="group relative flex w-full cursor-pointer flex-col justify-between gap-2.5 rounded-xl border border-border bg-card p-3 transition-all hover:shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:p-4"
        >
          {/* Main Info */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
            <div className="w-fit max-w-full shrink-0 truncate bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-wider text-background uppercase sm:px-2 sm:text-xs">
              <p className="truncate">{module.principle}</p>
            </div>
            <div className="min-w-0 flex-1 pr-8 sm:pr-0">
              <h3 className="truncate text-xs font-semibold text-foreground capitalize sm:text-base">
                {module.name}
              </h3>
            </div>

            {/* Assigned Classrooms (Visible for Editors only) */}
            {isEditor && (
              <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                <GraduationCap className="size-3.5 shrink-0" />
                <span className="max-w-40 truncate">
                  {assignedClassrooms.length > 0
                    ? assignedClassrooms
                        .map((c) => c?.classroomCode || c?.name)
                        .join(", ")
                    : "No classrooms"}
                </span>
              </div>
            )}

            {/* Tags */}
            <div className="flex shrink-0 items-center gap-1.5 overflow-hidden">
              {module.tags.slice(0, 2).map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="max-w-35 sm:max-w-50"
                >
                  <span className="truncate">{tag.trim()}</span>
                </Badge>
              ))}
              {module.tags.length > 2 && (
                <Badge variant="secondary" className="shrink-0 px-1.5 text-xs">
                  +{module.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>

          {/* Meta & Actions */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border pt-1.5 sm:border-t-0 sm:pt-0">
            <div className="text-left sm:text-right">
              <Label
                htmlFor={`created_at_${module.id}`}
                className="block text-xs text-muted-foreground sm:text-xs"
              >
                Created at
              </Label>
              <p
                className="text-xs font-medium text-foreground sm:text-xs"
                id={`created_at_${module.id}`}
              >
                {getDateString(module.createdAt)}
              </p>
            </div>
            {isEditor && (
              <EditorDropdown setAction={(value) => setAction(value)} />
            )}
          </div>
        </div>

        <DeleteArchiveDialog
          action={action}
          setAction={setAction}
          item={module}
        />
      </>
    )
  }

  return (
    <>
      <Card
        onClick={() => {
          navigate(`/instructor/modules/${module.id}`)
        }}
        className="group relative flex aspect-3/4 min-h-48 w-full cursor-pointer flex-col justify-between overflow-hidden p-0 transition-all hover:shadow-md sm:aspect-3/4"
      >
        <CardHeader className="p-3.5 pb-1.5 sm:p-5 sm:pb-3">
          <div className="flex items-start justify-between gap-2">
            <div
              style={{ maxWidth: "calc(100% - 2.5rem)" }}
              className="w-fit truncate bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-wider text-background uppercase sm:px-2 sm:text-xs"
            >
              <p className="truncate">{module.principle}</p>
            </div>
            <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5">
              {isEditor && (
                <EditorDropdown setAction={(value) => setAction(value)} />
              )}
            </div>
          </div>

          <CardTitle className="mt-1.5 line-clamp-2 pr-6 text-xs leading-snug font-semibold tracking-tight capitalize sm:line-clamp-3 sm:text-base md:text-lg">
            {module.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-end gap-2 p-3 pt-0 pb-1.5 sm:p-5 sm:pt-0 sm:pb-3">
          {/* Assigned Classrooms (Visible for Editors only) */}
          {isEditor && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <GraduationCap className="size-3.5 shrink-0" />
              <span className="truncate">
                {assignedClassrooms.length > 0
                  ? assignedClassrooms
                      .map((c) => c?.classroomCode || c?.name)
                      .join(", ")
                  : "No classrooms"}
              </span>
            </div>
          )}

          <div className="flex w-full min-w-0 flex-wrap items-center gap-1.5">
            {module.tags.slice(0, 2).map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="max-w-32.5 px-2 py-0.5 text-xs font-normal sm:max-w-45 sm:text-xs"
              >
                <span className="truncate">{tag.trim()}</span>
              </Badge>
            ))}

            {module.tags.length > 2 && (
              <Badge
                variant="secondary"
                className="shrink-0 px-1.5 py-0.5 text-xs font-medium"
              >
                +{module.tags.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-1.5 border-t border-border p-3 pt-2 sm:p-5 sm:pt-3">
          <div className="min-w-0 flex-1">
            <Label
              htmlFor={`created_at_${module.id}`}
              className="block truncate text-xs text-muted-foreground sm:text-xs"
            >
              Created at
            </Label>
            <p
              className="truncate text-xs font-medium text-foreground sm:text-xs"
              id={`created_at_${module.id}`}
            >
              {getDateString(module.createdAt)}
            </p>
          </div>
        </CardFooter>
      </Card>

      <DeleteArchiveDialog
        action={action}
        setAction={setAction}
        item={module}
        editUrl={`/instructor/modules/edit/${module.id}`}
        itemType="module"
      />
    </>
  )
}
