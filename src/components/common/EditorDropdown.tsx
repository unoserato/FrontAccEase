import type { ActionType } from "../instructor/DeleteArchiveDialog"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Archive,
  ArchiveRestore,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react"

export default function EditorDropdown({
  itemType,
  archived,
  setAction,
}: {
  itemType?: "quiz" | "module" | "classroom"
  archived?: boolean
  setAction: (value: ActionType) => void
}) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger
          onClick={(e) => e.stopPropagation()}
          render={
            <Button variant="ghost" size="icon" aria-label="Module actions">
              <EllipsisVertical className="size-4" />
            </Button>
          }
        />

        <DropdownMenuContent onClick={(e) => e.stopPropagation()} align="end">
          <DropdownMenuItem onClick={() => setAction("edit")}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          {itemType != "quiz" && archived ? (
            <DropdownMenuItem onClick={() => setAction("unarchive")}>
              <ArchiveRestore className="mr-2 h-4 w-4" />
              Unarchive
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setAction("archive")}>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
          )}

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
  )
}
