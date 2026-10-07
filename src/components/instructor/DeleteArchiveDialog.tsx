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
import type { ClassroomProps, ModuleProps } from "@/const/props/materialProps"
import { useMutation } from "@tanstack/react-query"
import { arhiveModuleAPI } from "@/services/api/materialsAPI"
import { useInvalidateQueries } from "@/services/tanstack/auth"
import { toast } from "../ui/toast"

export type ActionType = "delete" | "archive" | "edit" | null

interface Props {
  action: ActionType
  setAction: (value: ActionType) => void
  item: ModuleProps | ClassroomProps
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
  const invalidateQuery = useInvalidateQueries()

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
    if ("classroomCode" in item) return "classroom"
    return "quiz"
  }

  const itemType = getItemTypeLabel()
  const isModalOpen = action === "archive" || action === "delete"

  const { mutate: archiveModule } = useMutation({
    mutationFn: arhiveModuleAPI,
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Module Archived",
        description: "Successfully archived module",
      })
      invalidateQuery(["modules"])
      setAction(null)
    },
  })

  function handleArchiveModule() {
    archiveModule(item.id)
  }
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) setAction(null)
      }}
    >
      <DialogContent showCloseButton={false} className={"max-w-lg"}>
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
              if (action == "archive" && itemType == "module") {
                handleArchiveModule()
              }
            }}
          >
            {action === "archive" ? "Archive" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
