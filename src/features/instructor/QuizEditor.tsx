import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useHotkeys } from "react-hotkeys-hook"
import { cn } from "@/lib/utils"

// UI Components
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { ModeToggle } from "@/components/modeToggle"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import SearchTemplate from "@/components/common/SearchTemplate"
import EmptyState from "@/components/common/EmptyState"
import PageSkeleton from "@/components/skeleton/PageSkeleton"
import { toast } from "@/components/ui/toast"

// Features & Types
import QuizForm from "@/features/instructor/QuizForm"
import type { QuizProps } from "@/const/props/quizProps"
import {
  type WCAGPrinciple,
  WCAG_PRINCIPLES_DATA,
} from "@/const/props/wcagProps"

// Icons
import {
  ChevronLeft,
  Plus,
  Trash,
  Copy,
  Save,
  X,
  ArrowUp,
  ArrowDown,
  CircleDot,
  CheckSquare,
  ListOrdered,
  ToggleLeft,
  GripVertical,
  CheckCircle2,
  Clock,
  Eye,
  Edit3,
  RotateCcw,
  Palette,
  Check,
  Globe,
  Lock,
  AlertCircle,
  History,
  RefreshCw,
} from "lucide-react"

// Constants & Data
import { useUnmount } from "@/hooks/useUnmount"

// Helpers
import {
  DEFAULT_QUIZ_JSON,
  getQuizJson,
  addPage,
  deletePage,
  duplicatePage,
  updatePageTitle,
  addQuestion,
  deleteQuestion,
  duplicateQuestion,
  moveQuestion,
  updateQuestion,
  addChoice,
  updateChoice,
  deleteChoice,
  type QuizJson,
  type QuestionType,
  type QuestionElement,
} from "./quizHelper"
import {
  useClassrooms,
  useQuizAnswerById,
  useQuizById,
} from "@/services/tanstack/materials"
import type { ClassroomProps } from "@/const/props/classroomProps"
import { useMutation } from "@tanstack/react-query"
import {
  createInstructorQuizAPI,
  udpateInstructorQuizAPI,
} from "@/services/api/materialsAPI"
import { useInvalidateQueries } from "@/services/tanstack/auth"

/**
 * Maps a question's unique `name` to its correct answer.
 *
 * Instructor-only scoring data. It is kept out of the quiz definition itself so
 * that the learner-facing payload never ships answers alongside questions.
 */
type AnswerKey = Record<string, QuestionElement["correctAnswer"]>

const QUIZZES_PATH = "/instructor/quizzes"
const AUTOSAVE_STORAGE_PREFIX = "frontaccease_quiz_draft_"

interface QuizDraft {
  id?: string
  quizJson: QuizJson
  principle: WCAGPrinciple
  tags: string[]
  classrooms: string[]
  theme: string
  hasTimeLimit: boolean
  timeLimit: number
  attemptCount: number
  dueDate: string | null
  createdBy: string
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

const QUESTION_TYPE_OPTIONS: {
  value: QuestionType
  label: string
  icon: React.ReactNode
}[] = [
  {
    value: "radiogroup",
    label: "Multiple Choice",
    icon: <CircleDot className="size-4 text-blue-500" />,
  },
  {
    value: "checkbox",
    label: "Checkboxes (Multiple Select)",
    icon: <CheckSquare className="size-4 text-emerald-500" />,
  },
  {
    value: "dropdown",
    label: "Dropdown Select",
    icon: <ListOrdered className="size-4 text-purple-500" />,
  },
  {
    value: "boolean",
    label: "True / False",
    icon: <ToggleLeft className="size-4 text-amber-500" />,
  },
  {
    value: "ranking",
    label: "Ranking / Order",
    icon: <ArrowDown className="size-4 text-indigo-500" />,
  },
]

/**
 * Returns a copy of the quiz definition with every `correctAnswer` stripped out.
 *
 * Answers live in the instructor-only `AnswerKey`; the quiz definition that gets
 * published to classrooms must not carry them.
 */
function stripCorrectAnswers(quizJson: QuizJson): QuizJson {
  return {
    ...quizJson,
    pages: quizJson.pages.map((page) => ({
      ...page,
      elements: (page.elements || []).map(
        ({ correctAnswer: _answer, ...element }) => element
      ),
    })),
  }
}

function stitchCorrectAnswer(
  quizJson: QuizJson,
  answerKey: AnswerKey
): QuizJson {
  return {
    ...quizJson,
    pages: quizJson.pages.map((page) => ({
      ...page,
      elements: (page.elements || []).map((element) => ({
        ...element,
        ...(Object.hasOwn(answerKey, element.name)
          ? { correctAnswer: answerKey[element.name] }
          : {}),
      })),
    })),
  }
}

function extractAnswerKey(quiz: QuizJson): AnswerKey {
  const key: AnswerKey = {}
  for (const page of quiz.pages) {
    for (const q of page.elements || []) {
      if (q.name) {
        key[q.name] = q.correctAnswer
      }
    }
  }
  return key
}

interface DebouncedInputProps
  extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  value: string | number | undefined
  onValueChange: (value: string) => void
  debounceMs?: number
}

const DebouncedInput = React.memo(
  React.forwardRef<HTMLInputElement, DebouncedInputProps>(function DebouncedInput(
    { value, onValueChange, debounceMs = 150, onBlur, onFocus, ...props },
    ref
  ) {
    const [localValue, setLocalValue] = useState(value ?? "")
    const isFocusedRef = useRef(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const latestValueRef = useRef(localValue)

    useEffect(() => {
      if (!isFocusedRef.current) {
        setLocalValue(value ?? "")
        latestValueRef.current = value ?? ""
      }
    }, [value])

    const flush = useCallback(
      (val: string) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        onValueChange(val)
      },
      [onValueChange]
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextVal = e.target.value
      setLocalValue(nextVal)
      latestValueRef.current = nextVal

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        flush(nextVal)
      }, debounceMs)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = false
      if (timeoutRef.current) {
        flush(String(latestValueRef.current ?? ""))
      }
      onBlur?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = true
      onFocus?.(e)
    }

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    return (
      <Input
        {...props}
        ref={ref}
        value={localValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  })
)
DebouncedInput.displayName = "DebouncedInput"

interface DebouncedTextareaProps
  extends Omit<React.ComponentProps<typeof Textarea>, "value" | "onChange"> {
  value: string | undefined
  onValueChange: (value: string) => void
  debounceMs?: number
}

const DebouncedTextarea = React.memo(
  React.forwardRef<HTMLTextAreaElement, DebouncedTextareaProps>(
    function DebouncedTextarea(
      { value, onValueChange, debounceMs = 150, onBlur, onFocus, ...props },
      ref
    ) {
      const [localValue, setLocalValue] = useState(value ?? "")
      const isFocusedRef = useRef(false)
      const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
      const latestValueRef = useRef(localValue)

      useEffect(() => {
        if (!isFocusedRef.current) {
          setLocalValue(value ?? "")
          latestValueRef.current = value ?? ""
        }
      }, [value])

      const flush = useCallback(
        (val: string) => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
          onValueChange(val)
        },
        [onValueChange]
      )

      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nextVal = e.target.value
        setLocalValue(nextVal)
        latestValueRef.current = nextVal

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          flush(nextVal)
        }, debounceMs)
      }

      const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        isFocusedRef.current = false
        if (timeoutRef.current) {
          flush(String(latestValueRef.current ?? ""))
        }
        onBlur?.(e)
      }

      const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        isFocusedRef.current = true
        onFocus?.(e)
      }

      useEffect(() => {
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
        }
      }, [])

      return (
        <Textarea
          {...props}
          ref={ref}
          value={localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )
    }
  )
)
DebouncedTextarea.displayName = "DebouncedTextarea"

const QuestionCard = React.memo(function QuestionCard({
  q,
  qIdx,
  validPageIndex,
  isActive,
  totalQuestions,
  onSelect,
  onUpdateQuestion,
  onUpdateChoice,
  onAddChoice,
  onDeleteChoice,
  onDuplicateQuestion,
  onDeleteQuestion,
  onMoveQuestion,
}: {
  q: QuestionElement
  qIdx: number
  validPageIndex: number
  isActive: boolean
  totalQuestions: number
  onSelect: () => void
  onUpdateQuestion: (
    validPageIndex: number,
    qIdx: number,
    key: keyof QuestionElement,
    value: any
  ) => void
  onUpdateChoice: (
    validPageIndex: number,
    qIdx: number,
    cIdx: number,
    val: string
  ) => void
  onAddChoice: (validPageIndex: number, qIdx: number) => void
  onDeleteChoice: (validPageIndex: number, qIdx: number, cIdx: number) => void
  onDuplicateQuestion: (validPageIndex: number, qIdx: number) => void
  onDeleteQuestion: (validPageIndex: number, qIdx: number) => void
  onMoveQuestion: (
    validPageIndex: number,
    qIdx: number,
    direction: "up" | "down"
  ) => void
}) {
  return (
    <Card
      key={q.name || qIdx}
      onClick={onSelect}
      className={cn(
        "relative border bg-background p-4 shadow-sm transition-all sm:p-6",
        isActive
          ? "border-l-4 border-l-primary shadow-md ring-1 ring-primary/20"
          : "hover:border-border/80"
      )}
    >
      {/* Drag / Active indicator handle */}
      <div className="mb-2 flex items-center justify-center text-muted-foreground/30">
        <GripVertical className="size-4" />
      </div>

      {/* Question Title & Type Selection Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 space-y-1">
          <DebouncedInput
            value={q.title}
            onValueChange={(val) =>
              onUpdateQuestion(validPageIndex, qIdx, "title", val)
            }
            placeholder={`Question ${qIdx + 1}`}
            className="h-10 text-base font-semibold text-foreground focus-visible:bg-muted/30"
          />
        </div>

        {/* Top Right Controls: Question Type Selector & Individual Points */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Question Objective Type Selector */}
          <div className="w-full sm:w-56">
            <select
              value={q.type}
              onChange={(e) =>
                onUpdateQuestion(
                  validPageIndex,
                  qIdx,
                  "type",
                  e.target.value as QuestionType
                )
              }
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground shadow-xs transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              {QUESTION_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Individual Question Points Input */}
          <div className="flex h-10 items-center gap-1.5 rounded-md border border-input bg-muted/40 px-3 py-1 shadow-xs transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary hover:bg-muted/70">
            <span className="text-xs font-semibold whitespace-nowrap text-muted-foreground">
              Pts:
            </span>
            <DebouncedInput
              type="number"
              min={1}
              max={100}
              value={q.points ?? 5}
              onValueChange={(val) => {
                const num = Math.max(1, parseInt(val) || 1)
                onUpdateQuestion(validPageIndex, qIdx, "points", num)
              }}
              className="h-7 w-12 border-none bg-transparent p-0 text-center text-xs font-bold text-foreground shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      {/* --- QUESTION ANSWER TYPES CONTENT --- */}

      {/* 1. BOOLEAN QUESTION TYPE */}
      {q.type === "boolean" && (
        <div className="mt-4 space-y-3 rounded-lg border bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Select Correct Answer
            </span>
          </div>
          <div className="flex gap-6">
            <label className="flex cursor-pointer items-center gap-2.5 rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/40">
              <input
                type="radio"
                name={`correct_${q.name}`}
                className="size-4 accent-emerald-600"
                checked={q.correctAnswer === true}
                onChange={() =>
                  onUpdateQuestion(validPageIndex, qIdx, "correctAnswer", true)
                }
              />
              True
            </label>

            <label className="flex cursor-pointer items-center gap-2.5 rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/40">
              <input
                type="radio"
                name={`correct_${q.name}`}
                className="size-4 accent-emerald-600"
                checked={q.correctAnswer === false}
                onChange={() =>
                  onUpdateQuestion(validPageIndex, qIdx, "correctAnswer", false)
                }
              />
              False
            </label>
          </div>
        </div>
      )}

      {/* 2. OBJECTIVE CHOICE TYPES (radiogroup, checkbox, dropdown, ranking) */}
      {[
        "radiogroup",
        "checkbox",
        "dropdown",
        "ranking",
      ].includes(q.type) && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              {q.type === "ranking"
                ? "Define Correct Item Order (Top to Bottom)"
                : q.type === "checkbox"
                  ? "Select Correct Answer(s)"
                  : "Select Single Correct Answer"}
            </span>
          </div>

          <div className="space-y-2">
            {q.choices?.map((choice, cIdx) => {
              const isCorrect =
                q.type === "checkbox"
                  ? Array.isArray(q.correctAnswer) &&
                    q.correctAnswer.includes(choice)
                  : q.correctAnswer === choice

              return (
                <div key={cIdx} className="flex items-center gap-3">
                  {/* Choice Indicator */}
                  {q.type === "ranking" ? (
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                      {cIdx + 1}
                    </span>
                  ) : q.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      title="Mark as correct answer"
                      className="size-4 cursor-pointer rounded accent-emerald-600"
                      checked={isCorrect}
                      onChange={(e) => {
                        const currentAns = Array.isArray(q.correctAnswer)
                          ? q.correctAnswer
                          : []
                        const newAns = e.target.checked
                          ? [...currentAns, choice]
                          : currentAns.filter((a) => a !== choice)
                        onUpdateQuestion(
                          validPageIndex,
                          qIdx,
                          "correctAnswer",
                          newAns
                        )
                      }}
                    />
                  ) : (
                    <input
                      type="radio"
                      name={`correct_${q.name}`}
                      title="Mark as correct answer"
                      className="size-4 cursor-pointer accent-emerald-600"
                      checked={isCorrect}
                      onChange={() =>
                        onUpdateQuestion(
                          validPageIndex,
                          qIdx,
                          "correctAnswer",
                          choice
                        )
                      }
                    />
                  )}

                  <DebouncedInput
                    value={choice}
                    onValueChange={(val) =>
                      onUpdateChoice(validPageIndex, qIdx, cIdx, val)
                    }
                    placeholder={`Option ${cIdx + 1}`}
                    className={cn(
                      "h-9 flex-1 text-sm transition-colors",
                      isCorrect || q.type === "ranking"
                        ? "border-emerald-500/50 bg-emerald-500/5 font-medium dark:bg-emerald-950/20"
                        : ""
                    )}
                  />

                  <Button
                    type="button"
                    disabled={(q.choices?.length || 0) <= 1}
                    onClick={() => onDeleteChoice(validPageIndex, qIdx, cIdx)}
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              )
            })}
          </div>

          <Button
            type="button"
            onClick={() => onAddChoice(validPageIndex, qIdx)}
            variant="outline"
            size="sm"
            className="mt-1 h-8 gap-1.5 text-xs"
          >
            <Plus className="size-3.5" /> Add Choice
          </Button>
        </div>
      )}

      {/* Question Bottom Action Toolbar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            disabled={qIdx === 0}
            onClick={() => onMoveQuestion(validPageIndex, qIdx, "up")}
            variant="ghost"
            size="icon-sm"
            title="Move Question Up"
          >
            <ArrowUp className="size-4" />
          </Button>
          <Button
            type="button"
            disabled={qIdx === totalQuestions - 1}
            onClick={() => onMoveQuestion(validPageIndex, qIdx, "down")}
            variant="ghost"
            size="icon-sm"
            title="Move Question Down"
          >
            <ArrowDown className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r pr-4">
            <Switch
              checked={q.isRequired ?? true}
              onCheckedChange={(checked) =>
                onUpdateQuestion(validPageIndex, qIdx, "isRequired", checked)
              }
              id={`req_${q.name}`}
            />
            <label
              htmlFor={`req_${q.name}`}
              className="cursor-pointer text-xs font-medium text-muted-foreground"
            >
              Required
            </label>
          </div>

          <Button
            type="button"
            onClick={() => onDuplicateQuestion(validPageIndex, qIdx)}
            variant="ghost"
            size="icon-sm"
            title="Duplicate Question"
          >
            <Copy className="size-4" />
          </Button>

          <Button
            type="button"
            onClick={() => onDeleteQuestion(validPageIndex, qIdx)}
            variant="ghost"
            size="icon-sm"
            title="Delete Question"
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
})
QuestionCard.displayName = "QuestionCard"

export default function QuizEditor() {
  const { id } = useParams()
  const { data: existingQuiz, isPending: existingQuizPending } = useQuizById(id)
  const answerQuery = useQuizAnswerById(existingQuiz?.id)

  if (id && existingQuizPending) {
    return <PageSkeleton />
  }

  if (existingQuiz && answerQuery.isPending) {
    return <EmptyState title="Loading quiz answers…" role="status" />
  }

  if (existingQuiz && answerQuery.isError) {
    return (
      <EmptyState
        title="Unable to load quiz answers"
        description="Try again to load the correct answers before editing."
        actions={
          <Button onClick={() => answerQuery.refetch()}>Try again</Button>
        }
      />
    )
  }

  if (id && !existingQuiz) {
    return <EmptyState title="Quiz not found" className="h-full" />
  }

  return (
    <QuizEditorContent
      key={existingQuiz?.id ?? "new"}
      id={id}
      existingQuiz={existingQuiz ?? null}
      savedAnswerKey={answerQuery.data}
    />
  )
}

function QuizEditorContent({
  id,
  existingQuiz,
  savedAnswerKey,
}: {
  id?: string
  existingQuiz: QuizProps | null
  savedAnswerKey?: AnswerKey
}) {
  const { data: classrooms } = useClassrooms()

  const [activePageIndex, setActivePageIndex] = useState(0)
  const [createdBy, setCreatedBy] = useState("Instructor")
  const [hasTimeLimit, setHasTimeLimit] = useState<boolean>(() =>
    Boolean(existingQuiz?.time_limit)
  )
  const [timeLimit, setTimeLimit] = useState<number>(
    () => existingQuiz?.time_limit || 0
  )
  const [attemptCount, setAttemptCount] = useState<number>(
    () => existingQuiz?.attempt_count || 3
  )
  const [dueDate, setDueDate] = useState<Date>(() =>
    existingQuiz?.due_date ? new Date(existingQuiz.due_date) : new Date()
  )
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor")
  const [previewKey, setPreviewKey] = useState(0)
  const [selectedTheme, setSelectedTheme] = useState<string>(
    () => existingQuiz?.theme || "Default"
  )
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>(
    () =>
      existingQuiz?.classrooms?.map((c) =>
        typeof c === "string" ? c : c.id
      ) || []
  )
  const [selectedPrinciple, setSelectedPrinciple] = useState<WCAGPrinciple>(
    () => existingQuiz?.principle || "Perceivable"
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(
    () => existingQuiz?.tags || []
  )

  const [quizJson, setQuizJson] = useState<QuizJson>(() => {
    return existingQuiz
      ? stitchCorrectAnswer(getQuizJson(existingQuiz), savedAnswerKey ?? {})
      : DEFAULT_QUIZ_JSON
  })
  const savingError = ""

  const storageKey = useMemo(
    () => `${AUTOSAVE_STORAGE_PREFIX}${id ? String(id) : "new"}`,
    [id]
  )

  const isDirtyRef = useRef(false)
  const [isDirty, setIsDirty] = useState(false)
  const [autosaveState, setAutosaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle")
  const [lastSavedTime, setLastSavedTime] = useState<number | null>(null)
  const [draftData, setDraftData] = useState<QuizDraft | null>(null)
  const [hasDraftPrompt, setHasDraftPrompt] = useState(false)

  const isInitializedRef = useRef(false)
  const isRestoringRef = useRef(false)
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Keep a ref of the latest data so debounced callbacks and unload handlers
  // always access fresh values without needing quizJson in their dependencies
  const currentDataRef = useRef<Omit<QuizDraft, "updatedAt">>({
    id: id ? String(id) : undefined,
    quizJson,
    principle: selectedPrinciple,
    tags: selectedTags,
    classrooms: selectedClassrooms,
    theme: selectedTheme,
    hasTimeLimit,
    timeLimit,
    attemptCount,
    dueDate: dueDate ? dueDate.toISOString() : null,
    createdBy,
  })

  useEffect(() => {
    currentDataRef.current = {
      id: id ? String(id) : undefined,
      quizJson,
      principle: selectedPrinciple,
      tags: selectedTags,
      classrooms: selectedClassrooms,
      theme: selectedTheme,
      hasTimeLimit,
      timeLimit,
      attemptCount,
      dueDate: dueDate ? dueDate.toISOString() : null,
      createdBy,
    }
  })

  // Schedule autosave with debounce; avoids re-rendering while actively typing
  const scheduleAutosave = useCallback(() => {
    if (!isDirtyRef.current) {
      isDirtyRef.current = true
      setIsDirty(true)
    }

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current)
    }

    autosaveTimerRef.current = setTimeout(() => {
      try {
        setAutosaveState("saving")
        const draft: QuizDraft = {
          ...currentDataRef.current,
          updatedAt: Date.now(),
        }
        localStorage.setItem(storageKey, JSON.stringify(draft))
        setAutosaveState("saved")
        setLastSavedTime(draft.updatedAt)
      } catch (err) {
        console.error("Local quiz autosave failed:", err)
        setAutosaveState("error")
      }
    }, 1000)
  }, [storageKey])

  // Check for existing local autosave draft on mount / when existingQuiz is available
  const checkedDraftRef = useRef(false)
  useEffect(() => {
    if (checkedDraftRef.current) return
    if (id && !existingQuiz) return

    checkedDraftRef.current = true
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw) as QuizDraft

      const initialJson = existingQuiz
        ? stitchCorrectAnswer(getQuizJson(existingQuiz), savedAnswerKey ?? {})
        : DEFAULT_QUIZ_JSON
      const initialPrinciple = existingQuiz?.principle || "Perceivable"
      const initialTags = existingQuiz?.tags || []
      const initialClassrooms =
        existingQuiz?.classrooms?.map((c) =>
          typeof c === "string" ? c : c.id
        ) || []
      const initialTheme = existingQuiz?.theme || "Default"
      const initialTimeLimit = existingQuiz?.time_limit || 0
      const initialAttemptCount = existingQuiz?.attempt_count || 3

      const isDiff =
        JSON.stringify(parsed.quizJson) !== JSON.stringify(initialJson) ||
        parsed.principle !== initialPrinciple ||
        JSON.stringify(parsed.tags || []) !== JSON.stringify(initialTags) ||
        JSON.stringify(parsed.classrooms || []) !==
          JSON.stringify(initialClassrooms) ||
        parsed.theme !== initialTheme ||
        parsed.timeLimit !== initialTimeLimit ||
        parsed.attemptCount !== initialAttemptCount

      if (isDiff && parsed.updatedAt) {
        setTimeout(() => {
          setDraftData(parsed)
          setHasDraftPrompt(true)
        }, 0)
      }
    } catch (err) {
      console.warn("Failed to read local autosave quiz draft:", err)
    }
  }, [id, existingQuiz, savedAnswerKey, storageKey])

  // Trigger autosave on changes
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true
      return
    }
    if (isRestoringRef.current) {
      isRestoringRef.current = false
      return
    }
    scheduleAutosave()
  }, [
    quizJson,
    selectedPrinciple,
    selectedTags,
    selectedClassrooms,
    selectedTheme,
    hasTimeLimit,
    timeLimit,
    attemptCount,
    dueDate,
    createdBy,
    scheduleAutosave,
  ])

  // Save immediately on tab close or refresh if dirty
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isDirtyRef.current) return
      try {
        const draft: QuizDraft = {
          ...currentDataRef.current,
          updatedAt: Date.now(),
        }
        localStorage.setItem(storageKey, JSON.stringify(draft))
      } catch (err) {
        console.warn("Failed to write quiz draft before unload:", err)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current)
      }
    }
  }, [storageKey])

  function handleRestoreDraft() {
    if (!draftData) return
    isRestoringRef.current = true
    isDirtyRef.current = true
    setQuizJson(draftData.quizJson)
    if (draftData.principle) setSelectedPrinciple(draftData.principle)
    if (draftData.tags) setSelectedTags(draftData.tags)
    if (draftData.classrooms) setSelectedClassrooms(draftData.classrooms)
    if (draftData.theme) setSelectedTheme(draftData.theme)
    if (draftData.hasTimeLimit !== undefined) {
      setHasTimeLimit(draftData.hasTimeLimit)
      setTimeLimit(draftData.timeLimit || 0)
    }
    if (draftData.attemptCount !== undefined) {
      setAttemptCount(draftData.attemptCount)
    }
    if (draftData.dueDate) {
      const parsed = new Date(draftData.dueDate)
      if (!isNaN(parsed.getTime())) {
        setDueDate(parsed)
      }
    }
    if (draftData.createdBy) {
      setCreatedBy(draftData.createdBy)
    }
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
      console.warn("Failed to discard local quiz draft:", err)
    }
    setDraftData(null)
    setHasDraftPrompt(false)
    toast.add({
      type: "info",
      title: "Draft discarded",
      description: "Local draft discarded. Showing saved quiz version.",
    })
  }

  const computedTotalQuestions = useMemo(() => {
    return quizJson.pages.reduce(
      (acc, page) => acc + (page.elements?.length || 0),
      0
    )
  }, [quizJson])

  const computedTotalPoints = useMemo(() => {
    return quizJson.pages.reduce((acc, page) => {
      return (
        acc + (page.elements?.reduce((sum, q) => sum + (q.points ?? 5), 0) || 0)
      )
    }, 0)
  }, [quizJson])

  // Validation logic evaluated on demand (when save dialog is shown or upon saving)
  const getValidationErrors = useCallback((): string[] => {
    const errors: string[] = []

    if (!quizJson.title?.trim()) {
      errors.push("Quiz title cannot be empty.")
    }

    if (!dueDate) {
      errors.push("Please set due date")
    }

    if (computedTotalQuestions === 0) {
      errors.push("Quiz must contain at least 1 question.")
    }

    let hasEmptyQuestionTitle = false
    let hasEmptyChoice = false

    for (const page of quizJson.pages) {
      for (const q of page.elements || []) {
        if (!q.title?.trim()) {
          hasEmptyQuestionTitle = true
        }
        if (q.type !== "boolean" && q.choices) {
          if (q.choices.some((c) => !c.trim())) {
            hasEmptyChoice = true
          }
        }
      }
    }

    if (hasEmptyQuestionTitle) {
      errors.push("Every question must have a non-empty question title.")
    }

    if (hasEmptyChoice) {
      errors.push("Every choice option must have non-empty text.")
    }

    if (dueDate && dueDate.getTime() < Date.now() && !existingQuiz) {
      errors.push("Due date & time cannot be set in the past.")
    }

    return errors
  }, [quizJson, computedTotalQuestions, dueDate, existingQuiz])

  // Safeguards error list (evaluated only when save dialog is opened)
  const validationErrors = useMemo(() => {
    if (!isSaveDialogOpen) return []
    return getValidationErrors()
  }, [isSaveDialogOpen, getValidationErrors])

  const isPublish = selectedClassrooms.length > 0
  const isAllSelected =
    classrooms.length > 0 && selectedClassrooms.length === classrooms.length

  const availableTags = WCAG_PRINCIPLES_DATA[selectedPrinciple] || []

  const filteredClassrooms = useMemo(() => {
    if (!searchQuery.trim()) return classrooms
    const q = searchQuery.toLowerCase()
    return classrooms.filter(
      (c: ClassroomProps) =>
        c.name.toLowerCase().includes(q) ||
        c.classroom_code.toLowerCase().includes(q)
    )
  }, [searchQuery, classrooms])

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

  const previewQuizProps: QuizProps = useMemo(() => {
    if (activeTab !== "preview") {
      return {} as QuizProps
    }
    const updatedQuizJson: QuizJson = {
      ...quizJson,
      timeLimit: hasTimeLimit ? timeLimit : undefined,
    }
    return {
      id: existingQuiz?.id || "",
      created_at: existingQuiz?.created_at || Date().toString(),
      name: quizJson.title,
      status: isPublish ? "Open" : "Draft",
      principle: selectedPrinciple,
      tags: selectedTags,
      classrooms: selectedClassrooms,
      question_count: computedTotalQuestions,
      total_points: computedTotalPoints,
      time_limit: hasTimeLimit ? timeLimit : undefined,
      due_date: dueDate ? dueDate.toISOString() : Date(),
      theme: selectedTheme,
      quiz_json: updatedQuizJson,
      created_by: createdBy,
      attempt_count: attemptCount,
    }
  }, [
    activeTab,
    existingQuiz?.id,
    existingQuiz?.created_at,
    quizJson,
    hasTimeLimit,
    timeLimit,
    dueDate,
    selectedTheme,
    selectedPrinciple,
    selectedTags,
    selectedClassrooms,
    isPublish,
    computedTotalQuestions,
    computedTotalPoints,
    createdBy,
    attemptCount,
  ])

  // Active question highlight state
  const [activeQId, setActiveQId] = useState<string | null>(null)

  // Ensure activePageIndex is within bounds
  const validPageIndex = Math.min(
    activePageIndex,
    Math.max(0, quizJson.pages.length - 1)
  )
  const activePage = quizJson.pages[validPageIndex]

  const [prevQuiz, setPrevQuiz] = useState(existingQuiz)

  if (existingQuiz !== prevQuiz) {
    setPrevQuiz(existingQuiz)
    if (existingQuiz) {
      setQuizJson(
        stitchCorrectAnswer(getQuizJson(existingQuiz), savedAnswerKey ?? {})
      )
      if (existingQuiz.created_by) setCreatedBy(existingQuiz.created_by)
      if (existingQuiz.theme) setSelectedTheme(existingQuiz.theme)
      if (existingQuiz.principle) setSelectedPrinciple(existingQuiz.principle)
      if (existingQuiz.tags) setSelectedTags(existingQuiz.tags)
      if (existingQuiz.classrooms)
        setSelectedClassrooms(
          existingQuiz.classrooms.map((c: any) =>
            typeof c === "string" ? c : c.id
          )
        )
      if (existingQuiz.time_limit !== undefined) {
        setHasTimeLimit(true)
        setTimeLimit(existingQuiz.time_limit)
      } else {
        setHasTimeLimit(false)
      }
      if (existingQuiz.due_date) {
        const parsed = new Date(existingQuiz.due_date)
        if (!isNaN(parsed.getTime())) {
          setDueDate(parsed)
        }
      }
    }
  }

  // Save action handler - opens Save Dialog (flushing any active focused input first)
  const handleSave = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    setIsSaveDialogOpen(true)
  }

  const navigate = useNavigate()
  const { mutate: createQuiz, isPending: isCreating } = useMutation({
    mutationKey: ["instructor-quizzes"],
    mutationFn: createInstructorQuizAPI,
    onSuccess: () => {
      isDirtyRef.current = false
      setIsDirty(false)
      try {
        localStorage.removeItem(storageKey)
      } catch (err) {
        console.warn("Failed to clean up draft after save:", err)
      }
      toast.add({
        type: "success",
        title: "Quiz saved",
        description: "Your quiz has been created successfully.",
      })
      navigate("/instructor/quizzes")
      setIsSaveDialogOpen(false)
    },
    onError: (err: any) => {
      console.error("Error creating quiz:", err)
      toast.add({
        type: "error",
        title: "Error saving quiz",
        description: "An error occurred while creating the quiz.",
      })
    },
  })

  const invalidateQueries = useInvalidateQueries()
  const { mutate: updateQuiz, isPending: isUpdating } = useMutation({
    mutationKey: ["quiz", existingQuiz?.id],
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      udpateInstructorQuizAPI(id, payload),
    onSuccess: () => {
      isDirtyRef.current = false
      setIsDirty(false)
      try {
        localStorage.removeItem(storageKey)
      } catch (err) {
        console.warn("Failed to clean up draft after save:", err)
      }
      toast.add({
        type: "success",
        title: "Quiz updated",
        description: "Your quiz has been updated successfully.",
      })
      invalidateQueries([["quiz", existingQuiz!.id]])
      navigate("/instructor/quizzes")
      setIsSaveDialogOpen(false)
    },
    onError: (err: any) => {
      console.error("Error updating quiz:", err)
      toast.add({
        type: "error",
        title: "Error updating quiz",
        description: "An error occurred while updating the quiz.",
      })
    },
  })

  // Confirm save execution
  const confirmSave = () => {
    const errors = getValidationErrors()
    if (errors.length > 0) return
    const payload = {
      answer_key: extractAnswerKey(quizJson),
      name: quizJson.title,
      status: isPublish ? "Open" : "Draft",
      principle: selectedPrinciple,
      tags: selectedTags,
      classrooms: selectedClassrooms,
      question_count: computedTotalQuestions,
      total_points: computedTotalPoints,
      time_limit: timeLimit,
      due_date: dueDate ? dueDate.toISOString() : undefined,
      theme: selectedTheme,
      quiz_json: stripCorrectAnswers(quizJson),
      attempt_count: attemptCount,
    }

    if (existingQuiz) {
      updateQuiz({
        id: existingQuiz.id,
        payload,
      })
    } else {
      createQuiz(payload)
    }
  }

  // Stable callbacks for QuestionCard to avoid cascade re-rendering
  const handleUpdateQuestion = useCallback(
    (
      pIdx: number,
      qIdx: number,
      key: keyof QuestionElement,
      value: any
    ) => {
      setQuizJson((prev) => updateQuestion(prev, pIdx, qIdx, key, value))
    },
    []
  )

  const handleUpdateChoice = useCallback(
    (pIdx: number, qIdx: number, cIdx: number, val: string) => {
      setQuizJson((prev) => updateChoice(prev, pIdx, qIdx, cIdx, val))
    },
    []
  )

  const handleAddChoice = useCallback((pIdx: number, qIdx: number) => {
    setQuizJson((prev) => addChoice(prev, pIdx, qIdx))
  }, [])

  const handleDeleteChoice = useCallback(
    (pIdx: number, qIdx: number, cIdx: number) => {
      setQuizJson((prev) => deleteChoice(prev, pIdx, qIdx, cIdx))
    },
    []
  )

  const handleDuplicateQuestion = useCallback((pIdx: number, qIdx: number) => {
    setQuizJson((prev) => duplicateQuestion(prev, pIdx, qIdx))
  }, [])

  const handleDeleteQuestion = useCallback((pIdx: number, qIdx: number) => {
    setQuizJson((prev) => deleteQuestion(prev, pIdx, qIdx))
  }, [])

  const handleMoveQuestion = useCallback(
    (pIdx: number, qIdx: number, direction: "up" | "down") => {
      setQuizJson((prev) => moveQuestion(prev, pIdx, qIdx, direction))
    },
    []
  )

  // Ctrl+S / Cmd+S Hotkey
  useHotkeys(
    "mod+s",
    (e) => {
      e.preventDefault()
      handleSave()
    },
    { enableOnFormTags: true }
  )

  useUnmount({ when: isDirty })

  return (
    <Tabs
      value={activeTab}
      onValueChange={(val: any) => setActiveTab(val)}
      className="flex h-full w-full flex-col overflow-hidden bg-muted/20 text-foreground"
    >
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-40 shrink-0 border-b bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
          {/* Left section: Back button & Quiz Title */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Link
              to={QUIZZES_PATH}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "shrink-0 rounded-full text-muted-foreground hover:text-foreground"
              )}
              aria-label="Back to quizzes"
            >
              <ChevronLeft className="size-5" />
            </Link>

            <div className="flex min-w-0 flex-1 items-center gap-2">
              <h1 className="truncate text-sm font-bold text-foreground sm:text-base">
                {existingQuiz
                  ? `Editing Quiz - ${existingQuiz.name} `
                  : "New Quiz"}
              </h1>

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

          {/* Right section: Tabs switcher, ModeToggle & Primary Save Action */}
          <div className="flex shrink-0 items-center gap-2">
            <TabsList>
              <TabsTrigger value="editor" className="gap-1.5">
                <Edit3 className="size-4" />
                <span className="hidden sm:inline">Edit</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-1.5">
                <Eye className="size-4" />
                <span className="hidden sm:inline">Preview</span>
              </TabsTrigger>
            </TabsList>

            <ModeToggle />
            <Button
              type="button"
              onClick={handleSave}
              disabled={isCreating || isUpdating}
              variant={isPublish ? "default" : "secondary"}
              size="sm"
              className="gap-1.5 shadow-xs"
            >
              <Save className="size-4" />
              <span className="xs:inline hidden">Save & Publish</span>
              <span className="xs:hidden">Save</span>
            </Button>
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

      {/* Main Content Workspace - Main Editor & Preview Tabs */}
      <TabsContent
        value="editor"
        className="h-full flex-1 overflow-y-auto p-4 sm:p-6 md:p-8"
      >
        <div className="mx-auto max-w-3xl space-y-6 pb-20">
          {/* Form Top Banner Card */}
          <Card className="relative overflow-hidden border-t-8 border-t-primary bg-background p-6 shadow-sm sm:p-8">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <FieldLabel
                  htmlFor="quiz-title-input"
                  className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  Quiz Title
                </FieldLabel>
                <DebouncedInput
                  id="quiz-title-input"
                  value={quizJson.title}
                  onValueChange={(val) =>
                    setQuizJson((prev) => ({ ...prev, title: val }))
                  }
                  placeholder="Untitled Quiz Assessment"
                  className="h-11 text-base font-bold text-foreground sm:text-lg"
                />
              </div>

              <div className="space-y-1.5">
                <FieldLabel
                  htmlFor="quiz-desc-input"
                  className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  Quiz Description
                </FieldLabel>
                <DebouncedTextarea
                  id="quiz-desc-input"
                  maxLength={500}
                  value={quizJson.description || ""}
                  onValueChange={(val) =>
                    setQuizJson((prev) => ({ ...prev, description: val }))
                  }
                  placeholder="Provide description or instructions for students..."
                  className="min-h-17.5 text-sm text-foreground focus-visible:ring-1"
                />
              </div>

              <div className="flex flex-wrap items-center gap-5 border-t pt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={
                      quizJson.showProgressBar === true ||
                      quizJson.showProgressBar === "top" ||
                      quizJson.showProgressBar === "bottom" ||
                      quizJson.showProgressBar === "both" ||
                      quizJson.showProgressBar === "belowHeader"
                    }
                    onCheckedChange={(checked) =>
                      setQuizJson({
                        ...quizJson,
                        showProgressBar: checked ? "top" : "off",
                        progressBarType:
                          quizJson.progressBarType || "questions",
                      })
                    }
                    id="show-progress"
                  />
                  <label
                    htmlFor="show-progress"
                    className="cursor-pointer font-medium"
                  >
                    Progress Bar
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={quizJson.showQuestionNumbers === "on"}
                    onCheckedChange={(checked) =>
                      setQuizJson({
                        ...quizJson,
                        showQuestionNumbers: checked ? "on" : "off",
                      })
                    }
                    id="show-q-numbers"
                  />
                  <label
                    htmlFor="show-q-numbers"
                    className="cursor-pointer font-medium"
                  >
                    Question Numbers
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Palette className="size-3.5 text-muted-foreground" />
                  <label htmlFor="theme-select" className="font-medium">
                    Theme:
                  </label>
                  <Select
                    value={selectedTheme}
                    onValueChange={(val: any) =>
                      setSelectedTheme(val || "Default")
                    }
                  >
                    <SelectTrigger
                      id="theme-select"
                      size="sm"
                      className="h-7 w-30 text-xs"
                    >
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Default">Default</SelectItem>
                        <SelectItem value="Flat">Flat</SelectItem>
                        <SelectItem value="Plain">Plain</SelectItem>
                        <SelectItem value="Soft">Soft</SelectItem>
                        <SelectItem value="Contrast">Contrast</SelectItem>
                        <SelectItem value="Borderless">Borderless</SelectItem>
                        <SelectItem value="3D">3D</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <RotateCcw className="size-3.5 text-muted-foreground" />
                  <label htmlFor="attempt-count" className="font-medium">
                    Attempts:
                  </label>
                  <DebouncedInput
                    type="number"
                    className="w-fit"
                    placeholder="Default 3"
                    value={attemptCount}
                    onValueChange={(val) => setAttemptCount(Number(val) || 1)}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b pt-1 pb-2">
            {quizJson.pages.map((page, pIdx) => {
              const isActive = pIdx === validPageIndex
              return (
                <button
                  key={page.name || pIdx}
                  type="button"
                  onClick={() => setActivePageIndex(pIdx)}
                  className={cn(
                    "group flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all",
                    isActive
                      ? "border-primary bg-primary/10 text-primary shadow-xs"
                      : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                    )}
                  >
                    {pIdx + 1}
                  </span>
                  <span className="max-w-35 truncate sm:max-w-50">
                    {page.title || `Section ${pIdx + 1}`}
                  </span>
                </button>
              )
            })}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setQuizJson((prev) => addPage(prev))
                setActivePageIndex(quizJson.pages.length)
              }}
              className="h-9 shrink-0 gap-1.5 border-dashed text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground"
            >
              <Plus className="size-3.5" />
              <span>New Section</span>
            </Button>
          </div>

          {/* Active Section Content */}
          {activePage && (
            <div key={activePage.name || validPageIndex} className="space-y-4">
              {/* Section Header Card */}
              <Card className="border bg-card/60 p-4 shadow-xs">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      0{validPageIndex + 1}
                    </span>
                    <DebouncedInput
                      value={activePage.title}
                      onValueChange={(val) =>
                        setQuizJson((prev) =>
                          updatePageTitle(prev, validPageIndex, val)
                        )
                      }
                      placeholder="Section Title (e.g. Web Accessibility Principles)"
                      className="h-9 text-sm font-semibold sm:text-base"
                    />
                  </div>

                  <div className="flex shrink-0 items-center justify-end gap-1.5 border-t pt-2 sm:border-t-0 sm:pt-0">
                    <Button
                      type="button"
                      onClick={() => {
                        setQuizJson((prev) =>
                          duplicatePage(prev, validPageIndex)
                        )
                        setActivePageIndex(validPageIndex + 1)
                      }}
                      variant="ghost"
                      size="icon-sm"
                      title="Duplicate Section"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      disabled={quizJson.pages.length <= 1}
                      onClick={() => {
                        setQuizJson((prev) => deletePage(prev, validPageIndex))
                        if (validPageIndex > 0) {
                          setActivePageIndex(validPageIndex - 1)
                        }
                      }}
                      variant="ghost"
                      size="icon-sm"
                      title="Delete Section"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Questions Container for Active Section */}
              <div className="space-y-4">
                {activePage.elements.map((q, qIdx) => (
                  <QuestionCard
                    key={q.name || qIdx}
                    q={q}
                    qIdx={qIdx}
                    validPageIndex={validPageIndex}
                    isActive={activeQId === q.name}
                    totalQuestions={activePage.elements.length}
                    onSelect={() => setActiveQId(q.name)}
                    onUpdateQuestion={handleUpdateQuestion}
                    onUpdateChoice={handleUpdateChoice}
                    onAddChoice={handleAddChoice}
                    onDeleteChoice={handleDeleteChoice}
                    onDuplicateQuestion={handleDuplicateQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                    onMoveQuestion={handleMoveQuestion}
                  />
                ))}
              </div>

              {/* Add Question Button in Active Section */}
              <div className="flex items-center justify-center pt-2">
                <Button
                  type="button"
                  onClick={() =>
                    setQuizJson((prev) => addQuestion(prev, validPageIndex))
                  }
                  variant="outline"
                  className="w-full gap-2 border-dashed border-border py-5 text-sm font-medium hover:border-primary/50"
                >
                  <Plus className="size-4 text-primary" /> Add Question to
                  Section {validPageIndex + 1}
                </Button>
              </div>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Preview Tab Content */}
      <TabsContent
        value="preview"
        className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8"
      >
        <div className="mx-auto max-w-4xl space-y-4 pb-20">
          <Card className="relative border-t-4 border-t-primary bg-background p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Eye className="size-4 text-primary" />
                <span>Quiz Interactive Preview</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPreviewKey((k) => k + 1)}
                className="gap-1.5"
                title="Reset Quiz Preview"
              >
                <RotateCcw className="size-4" />
                <span>Reset Preview</span>
              </Button>
            </div>
            {activeTab === "preview" && (
              <QuizForm quiz={previewQuizProps} key={previewKey} />
            )}
          </Card>
        </div>
      </TabsContent>

      {/* Save Quiz Dialog copied & adapted from ModuleEditor.tsx */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className="flex max-h-9/10 flex-col overflow-hidden p-5 sm:max-w-xl sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold sm:text-xl">
              Save Quiz Assessment
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground sm:text-sm">
              Assign target classrooms to publish immediately, or leave empty to
              save as a draft.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 space-y-4 overflow-y-auto py-2 pr-1">
            {/* Validation Safeguards Error Banner */}
            {validationErrors.length > 0 && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="size-4 shrink-0 text-destructive" />
                  <span>Submission Safeguards - Please fix before saving:</span>
                </div>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-5">
                  {savingError}
                  {validationErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Due Date & Time Picker */}
            <Field className="flex flex-col gap-2">
              <FieldLabel className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Due Date &amp; Time
              </FieldLabel>
              <div className="flex flex-wrap items-center gap-2">
                <DateTimePicker
                  value={dueDate}
                  onChange={setDueDate}
                  placeholder="Pick a due date"
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  className="h-9 flex-1 text-xs sm:w-auto"
                />

                {dueDate && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setDueDate(new Date())}
                    title="Reset due date to now"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            </Field>

            {/* Toggle: Time Limit */}
            <div className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FieldLabel className="text-sm font-semibold">
                    Time Limit
                  </FieldLabel>
                  <p className="text-xs text-muted-foreground">
                    Limit test completion duration (only visible when enabled)
                  </p>
                </div>
                <Switch
                  checked={hasTimeLimit}
                  onCheckedChange={setHasTimeLimit}
                />
              </div>

              {hasTimeLimit && (
                <div className="mt-1 flex items-center gap-2 border-t pt-2.5">
                  <Clock className="size-4 shrink-0 text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    Duration Limit:
                  </span>
                  <DebouncedInput
                    type="number"
                    min={1}
                    max={600}
                    value={timeLimit || 30}
                    onValueChange={(val) =>
                      setTimeLimit(Math.max(1, parseInt(val) || 1))
                    }
                    className="h-8 w-20 text-xs font-semibold"
                  />
                  <span className="text-xs text-muted-foreground">minutes</span>
                </div>
              )}
            </div>

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
                  Publish this quiz to every assigned classroom
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
                          onCheckedChange={() => handleToggleClassroom(cls.id)}
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

              {/* Selected Classrooms Badge Container */}
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
              <span className="text-xs text-muted-foreground">Status:</span>
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
              <span className="text-xs text-muted-foreground">
                · {computedTotalQuestions} questions ({computedTotalPoints} pts)
              </span>
            </div>

            <Button
              type="button"
              onClick={confirmSave}
              disabled={isUpdating || isCreating || validationErrors.length > 0}
              variant={isPublish ? "default" : "secondary"}
              className="w-full sm:w-auto"
            >
              <Save className="size-4" />
              <span>
                {isCreating || isUpdating
                  ? "Saving..."
                  : isPublish
                    ? "Save & Publish"
                    : "Save as Draft"}
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}
