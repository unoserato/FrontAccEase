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
import type { ClassroomProps, ModuleProps, QuizProps } from "@/const/materialsProps"

export type ActionType = "delete" | "archive" | "edit" | null

interface Props {
  action: ActionType
  setAction: (value: ActionType) => void
  item: ModuleProps | ClassroomProps | QuizProps
}

export default function DeleteArchiveDialog({
  action,
  setAction,
  item,
}: Props) {
  const navigate = useNavigate()

  useEffect(() => {
    if (action === "edit") {
      setAction(null)
      if ("principle" in item) {
        navigate(`/instructor/modules/edit/${item.id}`)
      } else if ("classroom_code" in item) {
        navigate(`/instructor/classroom/edit/${item.id}`)
      } else if (
        "total_submissions" in item ||
        "due_date" in item ||
        "questions" in item
      ) {
        navigate(`/instructor/quizzes/edit/${item.id}`)
      } else {
        navigate(`./edit/${item.id}`)
      }
    }
  }, [action, item, navigate, setAction])

  const getItemTypeLabel = () => {
    if ("principle" in item) return "module"
    if ("classroom_code" in item) return "classroom"
    if ("total_submissions" in item || "due_date" in item || "questions" in item)
      return "quiz"
    return "item"
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
