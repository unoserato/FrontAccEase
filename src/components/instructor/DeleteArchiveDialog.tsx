import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  DialogContent,
  DialogClose,
  DialogDescription,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import type {
  ClassroomProps,
  ModuleProps,
  QuizProps,
} from "@/const/materialsProps"

export type ActionType = "delete" | "archive" | "edit" | null

interface Props {
  action: ActionType
  setAction: (value: ActionType) => void
  item: ModuleProps | ClassroomProps | QuizProps
  editUrl?: string
  itemType?: "module" | "classroom" | "quiz" | string
}

export default function DeleteArchiveDialog({
  action,
  setAction,
  item,
  editUrl,
  itemType: customItemType,
}: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    if (action === "edit") {
      setAction(null)
      const targetUrl = editUrl ?? `./edit/${item.id}`
      navigate(targetUrl)
    }
  }, [action, editUrl, item.id, navigate, setAction])

  const getItemTypeLabel = () => {
    if (customItemType) return customItemType
    if ("principle" in item) return "module"
    if ("classroom_code" in item) return "classroom"
    return "quiz"
  }

  const itemType = getItemTypeLabel()
  const isModalOpen = action === "archive" || action === "delete"

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) setAction(null)
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="capitalize">
            {action === "archive"
              ? `Archive ${itemType}?`
              : `Delete ${itemType}?`}
          </DialogTitle>

          <DialogDescription>
            {action === "archive" ? (
              `Archiving ${item.name} will make it unavailable to active members.`
            ) : (
              <span>
                Deleting <b className="text-foreground">{item.name}</b> will
                permanently remove the {itemType}.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>

          <Button
            variant={action === "delete" ? "destructive" : "default"}
            onClick={() => {
              // perform action
              setAction(null)
            }}
          >
            {action === "archive" ? "Archive" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
