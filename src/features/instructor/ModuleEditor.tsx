import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { classrooms, modules } from "@/const/data"
import {
  type ClassroomProps,
  type WCAGPrinciple,
  WCAG_PRINCIPLES_DATA,
} from "@/const/materialsProps"
import {
  Check,
  ChevronLeft,
  FileText,
  Globe,
  Lock,
  Save,
  Send,
  X,
} from "lucide-react"
import { useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useHotkeys } from "react-hotkeys-hook"
import { cn } from "cn"
import SearchTemplate from "@/components/common/SearchTemplate"
import { useUnmount } from "@/hooks/useUnmount"
import { useMutation } from "@tanstack/react-query"
import { createModuleAPI } from "@/services/api/materialsAPI"
import { toast } from "@/components/ui/toast"

const MODULES_PATH = "/instructor/modules"

export default function ModuleEditor() {
  const { id } = useParams<{ id?: string }>()
  const existingModule = useMemo(
    () => (id ? modules.find((doc) => String(doc.id) === String(id)) : null),
    [id]
  )
  const navigate = useNavigate()

  const [title, setTitle] = useState(
    existingModule ? existingModule.name : "Untitled Module"
  )
  const [content, setContent] = useState<any>(
    existingModule ? existingModule.content : ""
  )

  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>(
    existingModule?.classrooms ? existingModule.classrooms : []
  )
  const [selectedPrinciple, setSelectedPrinciple] = useState<WCAGPrinciple>(
    existingModule?.principle ? existingModule.principle : "Perceivable"
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(
    existingModule?.tags ? existingModule.tags : []
  )
  const [isSaving, setIsSaving] = useState(false)

  const [prevModule, setPrevModule] = useState(existingModule)
  if (existingModule !== prevModule) {
    setPrevModule(existingModule)
    if (existingModule) {
      setTitle(existingModule.name)
      setContent(existingModule.content)
      if (existingModule.principle)
        setSelectedPrinciple(existingModule.principle)
      if (existingModule.tags) setSelectedTags(existingModule.tags)
      if (existingModule.classrooms)
        setSelectedClassrooms(existingModule.classrooms)
    }
  }

  const availableTags = WCAG_PRINCIPLES_DATA[selectedPrinciple] || []

  useUnmount({ when: !!content })

  useHotkeys(
    "mod+s",
    (e) => {
      e.preventDefault()
      setDialogOpen(true)
    },
    { enableOnFormTags: true }
  )

  const isPublish = selectedClassrooms.length > 0
  const isAllSelected =
    classrooms.length > 0 && selectedClassrooms.length === classrooms.length

  const filteredClassrooms = useMemo(() => {
    if (!searchQuery.trim()) return classrooms
    const q = searchQuery.toLowerCase()
    return classrooms.filter(
      (c: ClassroomProps) =>
        c.name.toLowerCase().includes(q) ||
        c.classroomCode.toLowerCase().includes(q)
    )
  }, [searchQuery])

  function handleToggleAll(checked: boolean) {
    if (checked) {
      setSelectedClassrooms(classrooms.map((c: ClassroomProps) => c.id))
    } else {
      setSelectedClassrooms([])
    }
  }

  function handleToggleClassroom(id: string) {
    setSelectedClassrooms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  function handleToggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const { mutate: saveModule } = useMutation({
    mutationFn: createModuleAPI,
    onSuccess: async () => {
      toast.add({
        type: "success",
        title: "Module saved",
        description: "Your module has been saved successfully.",
      })
      setIsSaving(false)
      setDialogOpen(false)
      setTimeout(() => {
        navigate(-1)
      }, 1000)
    },
    onError: (err: any) => {
      console.error("Error saving module:", err)
      setIsSaving(false)
      toast.add({
        type: "error",
        title: "Error saving module",
        description: "An error occurred while saving the module.",
      })
    },
  })

  function handleSave() {
    setIsSaving(true)
    saveModule({ title, principle: selectedPrinciple, content })
    // const payload = {
    //   title,
    //   content,
    //   principle: selectedPrinciple,
    //   tags: selectedTags,
    //   classrooms: selectedClassrooms,
    //   status: isPublish ? "published" : "draft",
    // }
    // console.log("Saved module document:", payload)

    // setTimeout(() => {
    //   setIsSaving(false)
    //   setDialogOpen(false)
    // }, 400)
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 shrink-0 border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
          {/* Left section: Back button & Title input */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Link
              to={MODULES_PATH}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "shrink-0 rounded-full text-muted-foreground hover:text-foreground"
              )}
              aria-label="Back to modules"
            >
              <ChevronLeft className="size-5" />
            </Link>

            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Untitled Module"
                aria-label="Module title"
                className="xs:max-w-65 xs:text-base h-9 max-w-45 min-w-0 flex-1 border-transparent bg-transparent px-2 text-sm font-semibold tracking-tight shadow-none transition-colors hover:border-border focus-visible:border-ring focus-visible:bg-background sm:max-w-md sm:text-lg"
              />

              {/* Status Pill Badge */}
              {isPublish ? (
                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 sm:inline-flex dark:text-emerald-400">
                  <Globe className="size-3" />
                  Published ({selectedClassrooms.length})
                </span>
              ) : (
                <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border/50 bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground sm:inline-flex">
                  <Lock className="size-3" />
                  Draft
                </span>
              )}
            </div>
          </div>

          {/* Right section: Primary Save Action */}
          <div className="flex shrink-0 items-center gap-2">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger
                render={(props) => (
                  <Button
                    {...props}
                    type="button"
                    variant="default"
                    size="sm"
                    className="gap-1.5 shadow-xs"
                  >
                    <Save className="size-4" />
                    <span className="xs:inline hidden">Save & Publish</span>
                    <span className="xs:hidden">Save</span>
                  </Button>
                )}
              />

              <DialogContent
                style={{ maxHeight: "90vh", width: "calc(100vw - 2rem)" }}
                className="flex flex-col overflow-hidden p-5 sm:max-w-lg sm:p-6"
              >
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold sm:text-xl">
                    Save Module
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground sm:text-sm">
                    Assign target classrooms to publish immediately, or leave
                    empty to save as a draft.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex-1 space-y-4 overflow-y-auto py-2 pr-1">
                  {/* WCAG Principle Selector (Single Principle Only) */}
                  <Field className="flex flex-col gap-2">
                    <FieldLabel className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      WCAG Principle (Select One)
                    </FieldLabel>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {(
                        [
                          "Perceivable",
                          "Operable",
                          "Understandable",
                          "Robust",
                        ] as const
                      ).map((principle) => {
                        const isSelected = selectedPrinciple === principle
                        return (
                          <Button
                            key={principle}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className="h-8 text-xs font-medium"
                            onClick={() => {
                              setSelectedPrinciple(principle)
                              setSelectedTags([])
                            }}
                          >
                            {principle}
                          </Button>
                        )
                      })}
                    </div>
                  </Field>

                  {/* WCAG Tags / Success Criteria Selector (Filtered by Principle) */}
                  <Field className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <FieldLabel className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        WCAG Topics / Tags ({selectedTags.length})
                      </FieldLabel>
                      {selectedTags.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedTags([])}
                          className="text-xs text-muted-foreground underline hover:text-foreground"
                        >
                          Clear tags
                        </button>
                      )}
                    </div>

                    <div className="max-h-36 divide-y overflow-y-auto rounded-lg border bg-background">
                      {availableTags.map((tag) => {
                        const checked = selectedTags.includes(tag)
                        return (
                          <label
                            key={tag}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 p-2 text-xs transition-colors select-none hover:bg-muted/50",
                              checked && "bg-accent/40 font-medium"
                            )}
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => handleToggleTag(tag)}
                            />
                            <span className="flex-1 truncate">{tag}</span>
                            {checked && (
                              <Check className="size-3.5 shrink-0 text-primary" />
                            )}
                          </label>
                        )
                      })}
                    </div>

                    {selectedTags.length > 0 && (
                      <div className="flex max-h-24 flex-wrap gap-1.5 overflow-y-auto rounded-md border bg-muted/20 p-2">
                        {selectedTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                          >
                            <span className="max-w-45 truncate">{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleToggleTag(tag)}
                              className="rounded-full p-0.5 hover:bg-muted"
                              aria-label={`Remove ${tag}`}
                            >
                              <X className="size-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </Field>

                  {/* Toggle: All Classrooms */}
                  <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
                    <div className="space-y-0.5 pr-2">
                      <FieldLabel className="text-sm font-semibold">
                        All Active Classrooms
                      </FieldLabel>
                      <p className="text-xs text-muted-foreground">
                        Publish this module to every assigned classroom
                      </p>
                    </div>
                    <Switch
                      checked={isAllSelected}
                      onCheckedChange={handleToggleAll}
                    />
                  </div>

                  {/* Classroom Selector */}
                  <Field className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <FieldLabel className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Select Classrooms ({selectedClassrooms.length})
                      </FieldLabel>
                      {selectedClassrooms.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedClassrooms([])}
                          className="text-xs text-muted-foreground underline hover:text-foreground"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {/* Filter Search */}
                    {/* <div className="relative">
                      <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search classrooms by name or code..."
                        className="h-9 pl-9 text-xs sm:text-sm"
                      />
                    </div> */}
                    <SearchTemplate
                      title="classrooms by name or code"
                      search={searchQuery}
                      setSearch={(e) => setSearchQuery(e)}
                    />

                    {/* Classroom List */}
                    <div className="max-h-44 divide-y overflow-y-auto rounded-lg border bg-background">
                      {filteredClassrooms.length === 0 ? (
                        <div className="p-4 text-center text-xs text-muted-foreground">
                          No matching classrooms found.
                        </div>
                      ) : (
                        filteredClassrooms.map((cls: ClassroomProps) => {
                          const checked = selectedClassrooms.includes(cls.id)
                          return (
                            <label
                              key={cls.id}
                              className={cn(
                                "flex cursor-pointer items-center gap-3 p-2.5 text-sm transition-colors select-none hover:bg-muted/50",
                                checked && "bg-accent/40"
                              )}
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() =>
                                  handleToggleClassroom(cls.id)
                                }
                              />
                              <div className="flex min-w-0 flex-1 flex-col">
                                <span className="truncate text-xs font-medium sm:text-sm">
                                  {cls.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Code: {cls.classroomCode}
                                </span>
                              </div>
                              {checked && (
                                <Check className="size-4 shrink-0 text-primary" />
                              )}
                            </label>
                          )
                        })
                      )}
                    </div>

                    {/* Selected Tags Badge Container */}
                    {selectedClassrooms.length > 0 && (
                      <div className="flex max-h-24 flex-wrap gap-1.5 overflow-y-auto rounded-md border bg-muted/20 p-2">
                        {selectedClassrooms.map((id) => {
                          const match = classrooms.find(
                            (c: ClassroomProps) => c.id === id
                          )
                          return (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                            >
                              <span className="max-w-30 truncate">
                                {match?.name ?? id}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleToggleClassroom(id)}
                                className="rounded-full p-0.5 hover:bg-muted"
                                aria-label={`Remove ${match?.name ?? id}`}
                              >
                                <X className="size-3" />
                              </button>
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </Field>
                </div>

                <DialogFooter className="flex flex-col items-center justify-between gap-3 border-t pt-3 sm:flex-row">
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-xs text-muted-foreground">
                      Status:
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isPublish
                          ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      {isPublish
                        ? `Will Publish (${selectedClassrooms.length})`
                        : "Draft"}
                    </span>
                  </div>

                  <Button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    variant={isPublish ? "default" : "secondary"}
                    className="w-full sm:w-auto"
                  >
                    {isPublish ? (
                      <>
                        <Send className="mr-1.5 size-4" />
                        Publish ({selectedClassrooms.length})
                      </>
                    ) : (
                      <>
                        <FileText className="mr-1.5 size-4" />
                        Save as Draft
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Editor Body */}
      <main className="flex-1 overflow-hidden">
        <SimpleEditor
          onChange={setContent}
          initialContent={content || existingModule?.content}
        />
      </main>
    </div>
  )
}
