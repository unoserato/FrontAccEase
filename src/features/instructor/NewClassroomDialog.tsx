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
import { Label } from "@/components/ui/label"
import { SiGoogleclassroom } from "react-icons/si"

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log("Classroom payload:", formData)

    setFormData({ name: "", code: "", description: "" })
    setOpen(false)
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

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="classroom-name">Name</Label>
              <Input
                id="classroom-name"
                name="name"
                placeholder="e.g. Web Development 101"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="classroom-code">Code</Label>
              <Input
                id="classroom-code"
                name="code"
                placeholder="e.g. CS-301"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="classroom-description">Description</Label>
              <Textarea
                id="classroom-description"
                name="description"
                placeholder="Brief summary or objectives of this classroom..."
                rows={3}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="submit">Create Classroom</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
