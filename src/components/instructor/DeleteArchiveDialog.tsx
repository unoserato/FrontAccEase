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
} from "@/const/props/materialProps"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  arhiveModuleAPI,
  unarhiveModuleAPI,
} from "@/services/api/CRUD/materialsCRUDAPI"
import { toast } from "../ui/toast"

export type ActionType = "delete" | "archive" | "edit" | "unarchive" | null

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
  const queryClient = useQueryClient()

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
  const isModalOpen =
    action === "archive" || action === "delete" || action == "unarchive"

  const { mutate: archiveModule, isPending: isArchiving } = useMutation({
    mutationFn: arhiveModuleAPI,
    onSuccess: (data) => {
      toast.add({
        type: "success",
        title: "Module Archived",
        description: "Successfully archived module",
      })
      queryClient.setQueryData(["modules"], data)
      setAction(null)
    },
  })

  const { mutate: unarchiveModule, isPending: isUnarchiving } = useMutation({
    mutationFn: unarhiveModuleAPI,
    onSuccess: (data) => {
      toast.add({
        type: "success",
        title: "Module Unarchived",
        description: "Successfully unarchived module",
      })
      queryClient.setQueryData(["modules"], data)

      setAction(null)
    },
  })

  function handleArchiveModule() {
    archiveModule(item.id)
  }
  function handleUnarchiveModule() {
    unarchiveModule(item.id)
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
              : action === "unarchive"
                ? `Unarchive ${itemType}?`
                : `Delete ${itemType}?`}
          </DialogTitle>

          <DialogDescription>
            {action === "unarchive" && (
              <span>
                Unarchiving <b className="text-foreground">{item.name}</b> will
                restore it and make it available to active members.
              </span>
            )}
            {action === "archive" && (
              <span>
                Archiving <b className="text-foreground">{item.name}</b> will
                make it unavailable to active members.
              </span>
            )}
            {action === "delete" && (
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
            disabled={isArchiving || isUnarchiving}
            onClick={() => {
              if (action === "archive" && itemType === "module") {
                handleArchiveModule()
              }
              if (action === "unarchive" && itemType === "module") {
                handleUnarchiveModule()
              }
            }}
          >
            {action === "archive"
              ? isArchiving
                ? "Archiving..."
                : "Archive"
              : action === "unarchive"
                ? isUnarchiving
                  ? "Unarchiving..."
                  : "Unarchive"
                : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
