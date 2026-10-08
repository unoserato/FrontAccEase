import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { getDateString } from "@/hooks/date-to-string"
import { Label } from "../ui/label"
import { useState } from "react"
import DeleteArchiveDialog, {
  type ActionType,
} from "../instructor/DeleteArchiveDialog"
import EditorDropdown from "./EditorDropdown"
import { useNavigate } from "react-router-dom"
import { useMe } from "@/services/tanstack/auth"
import type { ModuleProps } from "@/const/props/materialProps"

export type ModuleCardTemplateProps = {
  module: ModuleProps
  view?: "grid" | "list"
  href?: string
}

export default function ModuleCardTemplate({
  module,
  view = "grid",
  href,
}: ModuleCardTemplateProps) {
  const [action, setAction] = useState<ActionType>(null)
  const { data: user } = useMe()
  const navigate = useNavigate()
  const isEditor = user?.role === "instructor"

  if (view === "list") {
    return (
      <>
        <div
          onClick={() => {
            navigate(href || `/instructor/modules/${module.id}`)
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
                {getDateString(module.created_at)}
              </p>
            </div>
            {isEditor && (
              <EditorDropdown setAction={(value) => setAction(value)} />
            )}
          </div>
        </div>

        {/* <DeleteArchiveDialog
          action={action}
          setAction={setAction}
          item={module}
        /> */}
      </>
    )
  }

  return (
    <>
      <Card
        onClick={() => {
          navigate(href || `/instructor/modules/${module.id}`)
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
              {getDateString(module.created_at)}
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
