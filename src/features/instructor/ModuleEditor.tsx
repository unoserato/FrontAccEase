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
import {
  AlertCircle,
  Check,
  ChevronLeft,
  FileText,
  Globe,
  History,
  Keyboard,
  Lock,
  RefreshCw,
  Save,
  Send,
} from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useHotkeys } from "react-hotkeys-hook"
import { cn } from "cn"
import SearchTemplate from "@/components/common/SearchTemplate"
import { useUnmount } from "@/hooks/useUnmount"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createModuleAPI } from "@/services/api/materialsAPI"
import { toast } from "@/components/ui/toast"
import { useClassrooms, useModules } from "@/services/tanstack/materials"
import { isMac } from "@/lib/tiptap-utils"
import { EditorShortcutGuide } from "./EditorShortcutGuide"
import type { WCAGPrinciple } from "@/const/props/wcagProps"

const MODULES_PATH = "/instructor/modules"
const AUTOSAVE_STORAGE_PREFIX = "frontaccease_module_draft_"

interface ModuleDraft {
  id?: string
  name: string
  principle: WCAGPrinciple
  classroom_id: string[]
  content: any
  updatedAt: number
}

function formatTime(timestamp: number) {
  const d = new Date(timestamp)
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

function formatDraftDate(timestamp: number) {
  const d = new Date(timestamp)
  const isToday = new Date().toDateString() === d.toDateString()
  if (isToday) {
    return `today at ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
  }
  return `${d.toLocaleDateString([], { month: "short", day: "numeric" })} at ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
}

export default function ModuleEditor() {
  const { id } = useParams()
  const { data: modules } = useModules()
  const { data: classrooms } = useClassrooms()
  const existingModule = useMemo(
    () => (id ? modules?.find((doc) => String(doc.id) === String(id)) : null),
    [id, modules]
  )
  const navigate = useNavigate()

  const storageKey = useMemo(
    () => `${AUTOSAVE_STORAGE_PREFIX}${id ? String(id) : "new"}`,
    [id]
  )

  const [name, setName] = useState(
    existingModule ? existingModule.name : "Untitled Module"
  )
  const contentRef = useRef<any>(existingModule?.content ?? "")
  const [contentVersion, setContentVersion] = useState(0)
  const [isDirty, setIsDirty] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  // Local Autosave States
  const [autosaveState, setAutosaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle")
  const [lastSavedTime, setLastSavedTime] = useState<number | null>(null)
  const [draftData, setDraftData] = useState<ModuleDraft | null>(null)
  const [hasDraftPrompt, setHasDraftPrompt] = useState(false)

  // Editor instance key for clean remounting on draft restoration
  const [editorKey, setEditorKey] = useState(0)
  const [initialEditorContent, setInitialEditorContent] = useState<any>(
    existingModule?.content
  )

  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>(
    existingModule?.classroom_id ? existingModule.classroom_id : []
  )
  const [selectedPrinciple, setSelectedPrinciple] = useState(
    existingModule?.principle ? existingModule.principle : "Perceivable"
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleEditorChange = useCallback((newContent: any) => {
    contentRef.current = newContent
    setIsDirty(true)
    setAutosaveState("saving")
    setContentVersion((prev) => prev + 1)
  }, [])

  const [prevModuleId, setPrevModuleId] = useState(existingModule?.id)
  if (existingModule && existingModule.id !== prevModuleId) {
    setPrevModuleId(existingModule.id)
    setName(existingModule.name)
    if (existingModule.principle)
      setSelectedPrinciple(existingModule.principle)
    if (existingModule.classroom_id)
      setSelectedClassrooms(existingModule.classroom_id)
    contentRef.current = existingModule.content
    setInitialEditorContent(existingModule.content)
  }

  // Check for existing local autosave draft on mount / when existingModule is available
  const checkedDraftRef = useRef(false)
  useEffect(() => {
    if (checkedDraftRef.current) return
    if (id && !modules) return

    checkedDraftRef.current = true
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw) as ModuleDraft

      const currentName = existingModule
        ? existingModule.name
        : "Untitled Module"
      const currentPrinciple = existingModule?.principle ?? "Perceivable"
      const currentClassrooms = existingModule?.classroom_id ?? []
      const currentContent = existingModule?.content ?? ""

      const isDiff =
        parsed.name !== currentName ||
        parsed.principle !== currentPrinciple ||
        JSON.stringify(parsed.classroom_id || []) !==
          JSON.stringify(currentClassrooms) ||
        (parsed.content &&
          JSON.stringify(parsed.content) !== JSON.stringify(currentContent))

      if (isDiff && parsed.updatedAt) {
        setTimeout(() => {
          setDraftData(parsed)
          setHasDraftPrompt(true)
        }, 0)
      }
    } catch (err) {
      console.warn("Failed to read local autosave draft:", err)
    }
  }, [id, modules, existingModule, storageKey])

  // Debounced Autosave to localStorage (1000ms after last change)
  useEffect(() => {
    if (!isDirty) return

    const timer = setTimeout(() => {
      try {
        const draft: ModuleDraft = {
          id: id ? String(id) : undefined,
          name,
          principle: selectedPrinciple,
          classroom_id: selectedClassrooms,
          content: contentRef.current,
          updatedAt: Date.now(),
        }
        localStorage.setItem(storageKey, JSON.stringify(draft))
        setAutosaveState("saved")
        setLastSavedTime(draft.updatedAt)
      } catch (err) {
        console.error("Local autosave failed:", err)
        setAutosaveState("error")
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [
    name,
    selectedPrinciple,
    selectedClassrooms,
    contentVersion,
    isDirty,
    storageKey,
    id,
  ])

  // Save immediately on tab close or refresh if dirty
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isDirty) return
      try {
        const draft: ModuleDraft = {
          id: id ? String(id) : undefined,
          name,
          principle: selectedPrinciple,
          classroom_id: selectedClassrooms,
          content: contentRef.current,
          updatedAt: Date.now(),
        }
        localStorage.setItem(storageKey, JSON.stringify(draft))
      } catch (err) {
        console.warn("Failed to write draft before unload:", err)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [name, selectedPrinciple, selectedClassrooms, isDirty, storageKey, id])

  function handleRestoreDraft() {
    if (!draftData) return
    setName(draftData.name)
    if (draftData.principle) setSelectedPrinciple(draftData.principle)
    if (draftData.classroom_id) setSelectedClassrooms(draftData.classroom_id)
    contentRef.current = draftData.content
    setInitialEditorContent(draftData.content)
    setEditorKey((prev) => prev + 1)
    setIsDirty(true)
    setHasDraftPrompt(false)
    setLastSavedTime(draftData.updatedAt)
    setAutosaveState("saved")
    toast.add({
      type: "success",
      title: "Draft restored",
      description: "Your locally saved draft has been loaded into the editor.",
    })
  }

  function handleDiscardDraft() {
    try {
      localStorage.removeItem(storageKey)
    } catch (err) {
      console.warn("Failed to discard local draft:", err)
    }
    setDraftData(null)
    setHasDraftPrompt(false)
    toast.add({
      type: "info",
      title: "Draft discarded",
      description: "Local draft discarded. Showing saved module version.",
    })
  }

  useUnmount({ when: isDirty })

  useHotkeys(
    ["ctrl+s", "mod+s"],
    (e) => {
      e.preventDefault()
      setDialogOpen(true)
    },
    { enableOnFormTags: true, enableOnContentEditable: true }
  )

  useHotkeys(
    ["ctrl+/", "mod+/", "ctrl+?", "mod+?"],
    (e) => {
      e.preventDefault()
      setShortcutsOpen((prev) => !prev)
    },
    { enableOnFormTags: true, enableOnContentEditable: true }
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.ctrlKey || e.metaKey
      const isSlash = e.key === "/" || e.key === "?" || e.code === "Slash"
      if (isModifier && isSlash) {
        e.preventDefault()
        e.stopPropagation()
        setShortcutsOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown, true)
    return () => window.removeEventListener("keydown", handleKeyDown, true)
  }, [])

  const isPublish = selectedClassrooms.length > 0
  const isAllSelected =
    classrooms.length > 0 && selectedClassrooms.length === classrooms.length

  const filteredClassrooms = useMemo(() => {
    if (!searchQuery.trim()) return classrooms
    const q = searchQuery.toLowerCase()
    return classrooms.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.classroom_code.toLowerCase().includes(q)
    )
  }, [searchQuery, classrooms])

  function handleToggleAll(checked: boolean) {
    setIsDirty(true)
    setAutosaveState("saving")
    if (checked) {
      setSelectedClassrooms(classrooms.map((c) => c.id))
    } else {
      setSelectedClassrooms([])
    }
  }

  function handleToggleClassroom(classroomId: string) {
    setIsDirty(true)
    setAutosaveState("saving")
    setSelectedClassrooms((prev) =>
      prev.includes(classroomId)
        ? prev.filter((item) => item !== classroomId)
        : [...prev, classroomId]
    )
  }

  const queryClient = useQueryClient()
  const { mutate: saveModule } = useMutation({
    mutationFn: createModuleAPI,
    onSuccess: async () => {
      setIsDirty(false)
      try {
        localStorage.removeItem(storageKey)
      } catch (err) {
        console.warn("Failed to clean up draft after save:", err)
      }
      queryClient.invalidateQueries({ queryKey: ["modules"] })
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
    const payload = {
      name: name,
      principle: selectedPrinciple,
      content: contentRef.current,
      classroom_id: selectedClassrooms,
    }

    saveModule(payload)
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 shrink-0 border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
          {/* Left section: Back button, Title input, Status Pill, & Autosave Indicator */}
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
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setIsDirty(true)
                  setAutosaveState("saving")
                }}
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

              {/* Local Autosave Telemetry Indicator */}
              <div className="hidden shrink-0 items-center gap-1.5 text-xs text-muted-foreground lg:inline-flex">
                {autosaveState === "saving" && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <RefreshCw className="size-3 animate-spin text-muted-foreground" />
                    Saving draft...
                  </span>
                )}
                {autosaveState === "saved" && lastSavedTime && (
                  <span
                    className="flex items-center gap-1 text-muted-foreground/80"
                    title={`Draft saved to your browser on ${new Date(lastSavedTime).toLocaleString()}`}
                  >
                    <Check className="size-3 text-emerald-500" />
                    Saved locally ({formatTime(lastSavedTime)})
                  </span>
                )}
                {autosaveState === "error" && (
                  <span className="flex items-center gap-1 text-destructive">
                    <AlertCircle className="size-3" />
                    Autosave error
                  </span>
                )}
                {autosaveState === "idle" && isDirty && (
                  <span className="text-muted-foreground/60">
                    Unsaved changes
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right section: Shortcuts Guide & Primary Save Action */}
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShortcutsOpen(true)}
              className="gap-1.5 text-xs text-muted-foreground shadow-2xs hover:text-foreground"
              aria-label="Open keyboard shortcuts guide"
            >
              <Keyboard className="size-4" />
              <span className="hidden sm:inline">Shortcuts</span>
              <kbd className="hidden md:inline-flex items-center rounded border border-border/70 bg-muted/80 px-1 py-0.5 font-mono text-xs text-muted-foreground">
                {isMac() ? "⌘/" : "Ctrl+/"}
              </kbd>
            </Button>

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
                              setIsDirty(true)
                              setAutosaveState("saving")
                            }}
                          >
                            {principle}
                          </Button>
                        )
                      })}
                    </div>
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
                          onClick={() => {
                            setSelectedClassrooms([])
                            setIsDirty(true)
                            setAutosaveState("saving")
                          }}
                          className="text-xs text-muted-foreground underline hover:text-foreground"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

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
                        filteredClassrooms.map((cls) => {
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
                                  Code: {cls.classroom_code}
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

      {/* Unsaved Local Draft Recovery Banner */}
      {hasDraftPrompt && draftData && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-950 sm:px-6 dark:text-amber-200">
          <div className="flex min-w-0 items-center gap-2">
            <History className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span className="truncate">
              <strong>Unsaved draft found</strong> from{" "}
              {formatDraftDate(draftData.updatedAt)}. Would you like to restore
              your recent changes?
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="default"
              onClick={handleRestoreDraft}
              className="h-7 bg-amber-600 px-3 text-xs text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
            >
              Restore Draft
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={handleDiscardDraft}
              className="h-7 px-2 text-xs hover:bg-amber-500/20"
            >
              Discard
            </Button>
          </div>
        </div>
      )}

      {/* Editor Body */}
      <main className="flex-1 overflow-hidden">
        <SimpleEditor
          key={editorKey}
          onChange={handleEditorChange}
          initialContent={initialEditorContent}
        />
      </main>

      {/* Keyboard Shortcuts Bottom Sheet Guide */}
      <EditorShortcutGuide
        open={shortcutsOpen}
        onOpenChange={setShortcutsOpen}
      />
    </div>
  )
}
