import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SiGoogleclassroom } from "react-icons/si"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useMutation } from "@tanstack/react-query"
import { createClassroomAPI } from "@/services/api/materialsAPI"
import { useInvalidateQueries } from "@/services/tanstack/auth"

export default function NewClassroomDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const invalidateQueries = useInvalidateQueries()

  const { mutate, isPending } = useMutation({
    mutationFn: createClassroomAPI,
    onSuccess: () => {
      invalidateQueries(["classroom"])
      setOpen(false)
    },
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log("Classroom payload:", formData)

    const payload = {
      name: formData.name,
      classroom_description: formData.description,
      classroom_code: formData.code,
    }
    mutate(payload)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <SiGoogleclassroom className="mr-2 h-4 w-4" />
            New Classroom
          </Button>
        }
      />

      <DialogContent className={"max-w-xl"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>New Classroom</DialogTitle>
            <DialogDescription>
              Enter the classroom details below to create a new session.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="classroom-name">Name</FieldLabel>
              <Input
                id="classroom-name"
                name="name"
                placeholder="e.g. Web Development 101"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="classroom-code">Classroom Code</FieldLabel>
              <FieldDescription>This is not the join code</FieldDescription>
              <Input
                id="classroom-code"
                name="code"
                placeholder="e.g. CS-301"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="classroom-description">
                Description
              </FieldLabel>
              <Textarea
                id="classroom-description"
                name="description"
                placeholder="Brief summary or objectives of this classroom..."
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-2">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Classroom..." : "Create Classroom"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
