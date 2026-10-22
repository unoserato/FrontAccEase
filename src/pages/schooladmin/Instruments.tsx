import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  wcagGuidelines,
  type WCAGGuideline,
  type WCAGPrinciple,
} from "@/const/criterion"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  PanelLeft,
  Pencil,
  Save,
} from "lucide-react"
import SearchTemplate from "@/components/common/SearchTemplate"
import {
  useWCAGInstruments,
  useUpdateWCAGInstrument,
} from "@/services/tanstack/materials"
import type { InstrumentProps } from "@/const/props/miscellaneousProps"
import { cn } from "@/lib/utils"

interface ParsedInstrument extends InstrumentProps {
  guidelineId: string
  criterionNum: string
  criterionName: string
  level: string | null
  body: string
}

function parseInstrument(item: InstrumentProps): ParsedInstrument {
  const match = item.title.match(/^(\d+\.\d+)(?:\.(\d+))?\s*(.*)$/)
  const guidelineId = match ? match[1] : ""
  const criterionNum = match
    ? match[2]
      ? `${match[1]}.${match[2]}`
      : match[1]
    : ""
  const criterionName = match ? match[3] : item.title

  // Normalize newlines in content for robust parsing across environments
  const normalizedContent = (item.content || "").replace(/\r\n/g, "\n")

  // Extract level from content e.g. (Level A), (Level AA), (Level AAA), (Level AA) New
  const levelMatch = normalizedContent.match(
    /^\s*\(Level\s+(A{1,3})\)(?:\s+(New))?/i
  )
  const level = levelMatch
    ? `Level ${levelMatch[1].toUpperCase()}${levelMatch[2] ? " (New)" : ""}`
    : normalizedContent.trim().startsWith("Note")
      ? "Note"
      : null

  // Strip leading (Level ...) tag lines
  const body = normalizedContent
    .replace(/^(\s*\(Level\s+[A-Za-z0-9]+\)(?:\s+New)?\s*)+/i, "")
    .trim()

  return {
    ...item,
    guidelineId,
    criterionNum,
    criterionName,
    level,
    body,
  }
}

function compareCriterionNum(a: string, b: string): number {
  const aParts = a.split(".").map(Number)
  const bParts = b.split(".").map(Number)
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aVal = aParts[i] || 0
    const bVal = bParts[i] || 0
    if (aVal !== bVal) return aVal - bVal
  }
  return 0
}

function renderContentBody(body: string) {
  // Normalize line endings to \n to support both LF and CRLF strings from database and editor
  const normalizedBody = (body || "").replace(/\r\n/g, "\n")
  const sections = normalizedBody
    .split(/\n\s*\n+/)
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
      {sections.map((section, idx) => {
        const lines = section
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)

        if (lines.length === 0) return null

        // Check if lines are a bulleted list (- item or * item)
        const isBulletList =
          lines.every((line) => line.startsWith("- ") || line.startsWith("* "))

        if (isBulletList) {
          return (
            <ul key={idx} className="space-y-1.5 pl-2">
              {lines.map((line, lIdx) => (
                <li key={lIdx} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                  <span>{line.replace(/^[-*]\s*/, "")}</span>
                </li>
              ))}
            </ul>
          )
        }

        // Check if first line acts as a section heading
        const firstLine = lines[0] || ""
        const isHeadingAndBody =
          lines.length > 1 &&
          (firstLine.endsWith(":") ||
            firstLine.startsWith("Note") ||
            firstLine.startsWith("Exception") ||
            firstLine === "Controls, Input" ||
            firstLine === "Time-Based Media" ||
            firstLine === "Test" ||
            firstLine === "Sensory" ||
            firstLine === "CAPTCHA" ||
            firstLine === "Decoration, Formatting, Invisible" ||
            (firstLine.length < 40 && !firstLine.includes(".")))

        if (isHeadingAndBody) {
          const heading = firstLine
          const bodyLines = lines.slice(1)
          const hasBullets = bodyLines.some(
            (l) => l.startsWith("- ") || l.startsWith("* ")
          )

          return (
            <div
              key={idx}
              className="space-y-2 rounded-xl border border-border/70 bg-muted/30 p-3.5 sm:p-4"
            >
              <h4 className="font-bold text-foreground">{heading}</h4>
              {hasBullets ? (
                <div className="space-y-1.5 text-muted-foreground">
                  {bodyLines.map((bLine, bIdx) =>
                    bLine.startsWith("- ") || bLine.startsWith("* ") ? (
                      <div key={bIdx} className="flex items-start gap-2 pl-1">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                        <span>{bLine.replace(/^[-*]\s*/, "")}</span>
                      </div>
                    ) : (
                      <p key={bIdx} className="leading-relaxed">
                        {bLine}
                      </p>
                    )
                  )}
                </div>
              ) : (
                <p className="leading-relaxed text-muted-foreground">
                  {bodyLines.join(" ")}
                </p>
              )}
            </div>
          )
        }

        return (
          <p key={idx} className="leading-relaxed">
            {lines.join(" ")}
          </p>
        )
      })}
    </div>
  )
}

const PRINCIPLES: WCAGPrinciple[] = [
  "Perceivable",
  "Operable",
  "Understandable",
  "Robust",
]

export default function Instruments() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { data: instrumentsData } = useWCAGInstruments()
  const updateMutation = useUpdateWCAGInstrument()
  const { guidelineId } = useParams<{ guidelineId?: string }>()

  const [search, setSearch] = useState("")
  const [selectedCriterionId, setSelectedCriterionId] = useState<string>("")
  const [sheetOpen, setSheetOpen] = useState(false)

  // Edit dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editPrinciple, setEditPrinciple] = useState<string>("Perceivable")
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const [editError, setEditError] = useState<string | null>(null)

  // Parse all instruments from the API dataset - recompute when instrumentsData updates
  const parsedInstruments = useMemo(() => {
    return (instrumentsData || []).map(parseInstrument)
  }, [instrumentsData])

  // Filter criteria based on search query
  const filteredInstruments = useMemo(() => {
    if (!search.trim()) return parsedInstruments
    const query = search.toLowerCase()
    return parsedInstruments.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.principle.toLowerCase().includes(query) ||
        item.criterionNum.toLowerCase().includes(query) ||
        item.criterionName.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    )
  }, [parsedInstruments, search])

  // Filter guidelines matching search or containing matching criteria
  const matchingGuidelineIds = useMemo(() => {
    return new Set(filteredInstruments.map((item) => item.guidelineId))
  }, [filteredInstruments])

  const filteredGuidelines = useMemo(() => {
    if (!search.trim()) return wcagGuidelines
    const query = search.toLowerCase()
    return wcagGuidelines.filter(
      (g) =>
        g.name.toLowerCase().includes(query) ||
        g.principle.toLowerCase().includes(query) ||
        matchingGuidelineIds.has(g.id)
    )
  }, [search, matchingGuidelineIds])

  // Active guideline ID from URL or default to "1.1"
  const selectedGuidelineId = guidelineId || "1.1"

  // Active criterion resolution
  const activeCriterion: ParsedInstrument | null = useMemo(() => {
    if (parsedInstruments.length === 0) return null

    // 1. If explicit criterion ID is selected, find it
    if (selectedCriterionId) {
      const match = parsedInstruments.find(
        (c) => String(c.id) === selectedCriterionId
      )
      if (match) return match
    }

    // 2. Otherwise find the first criterion belonging to the URL guideline
    const guidelineCriteria = parsedInstruments
      .filter((c) => c.guidelineId === selectedGuidelineId)
      .sort((a, b) => compareCriterionNum(a.criterionNum, b.criterionNum))

    if (guidelineCriteria.length > 0) {
      return guidelineCriteria[0]
    }

    // 3. Fallback to the first criterion overall
    return parsedInstruments[0] || null
  }, [parsedInstruments, selectedCriterionId, selectedGuidelineId])

  // Sequential navigation (Prev / Next) across all sorted criteria
  const sortedAllCriteria = useMemo(() => {
    return [...parsedInstruments].sort((a, b) =>
      compareCriterionNum(a.criterionNum, b.criterionNum)
    )
  }, [parsedInstruments])

  const activeIndex = useMemo(() => {
    if (!activeCriterion) return -1
    return sortedAllCriteria.findIndex((c) => c.id === activeCriterion.id)
  }, [sortedAllCriteria, activeCriterion])

  const prevCriterion =
    activeIndex > 0 ? sortedAllCriteria[activeIndex - 1] : null
  const nextCriterion =
    activeIndex >= 0 && activeIndex < sortedAllCriteria.length - 1
      ? sortedAllCriteria[activeIndex + 1]
      : null

  const handleSelectCriterion = (criterion: ParsedInstrument) => {
    setSelectedCriterionId(String(criterion.id))
    if (criterion.guidelineId) {
      navigate(`/admin/instruments/${criterion.guidelineId}`)
    }
    if (isMobile) {
      setSheetOpen(false)
    }
  }

  const handleSelectGuideline = (id: string) => {
    navigate(`/admin/instruments/${id}`)
    const firstUnderGuideline = parsedInstruments
      .filter((c) => c.guidelineId === id)
      .sort((a, b) => compareCriterionNum(a.criterionNum, b.criterionNum))[0]
    if (firstUnderGuideline) {
      setSelectedCriterionId(String(firstUnderGuideline.id))
    }
    if (isMobile) {
      setSheetOpen(false)
    }
  }

  const handleOpenEdit = (criterion: ParsedInstrument) => {
    setEditPrinciple(criterion.principle)
    setEditTitle(criterion.title)
    setEditContent(criterion.content)
    setEditError(null)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!activeCriterion) return
    if (!editTitle.trim()) {
      setEditError("Criterion title cannot be empty.")
      return
    }
    if (!editContent.trim()) {
      setEditError("Content cannot be empty.")
      return
    }

    setEditError(null)
    try {
      await updateMutation.mutateAsync({
        id: String(activeCriterion.id),
        data: {
          principle: editPrinciple,
          title: editTitle.trim(),
          content: editContent.trim(),
        },
      })
      setIsEditDialogOpen(false)
    } catch (err: unknown) {
      const errObj = err as {
        response?: { data?: { message?: string } }
        message?: string
      }
      setEditError(
        errObj?.response?.data?.message ||
          errObj?.message ||
          "Failed to update criterion instrument."
      )
    }
  }

  return (
    <section className="p-responsive space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <HeaderTemplate
          title="Instruments"
          subtitle="WCAG 2.2 accessibility success criteria and rules cross-checked against HTML."
        />

        {/* Mobile Browse Guidelines Sheet Trigger */}
        {isMobile && (
          <div className="block lg:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger
                render={
                  <Button variant="outline" className="w-full justify-start">
                    <PanelLeft className="mr-2 h-4 w-4" />
                    Browse Guidelines
                  </Button>
                }
              />
              <SheetContent
                side="left"
                className="flex h-full w-full flex-col p-0 sm:max-w-md"
              >
                <SheetHeader className="shrink-0 border-b border-border/50 p-4">
                  <SheetTitle>Browse Guidelines</SheetTitle>
                </SheetHeader>
                <div className="min-h-0 flex-1 overflow-y-auto p-4">
                  <BrowseGuidelinesContent
                    search={search}
                    setSearch={setSearch}
                    principles={PRINCIPLES}
                    filteredGuidelines={filteredGuidelines}
                    activeCriterionId={
                      activeCriterion ? String(activeCriterion.id) : ""
                    }
                    selectedGuidelineId={selectedGuidelineId}
                    onSelectGuideline={handleSelectGuideline}
                    onSelectCriterion={handleSelectCriterion}
                    instruments={filteredInstruments}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* Desktop Left Column: Full-height Browse Guidelines Card */}
        <Card
          className="hidden overflow-hidden border border-border/80 shadow-xs lg:sticky lg:top-4 lg:col-span-1 lg:flex lg:flex-col"
          style={{ height: "calc(100vh - 8.5rem)" }}
        >
          <CardHeader className="shrink-0 space-y-3 border-b border-border/50 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold sm:text-lg">
                Browse guidelines
              </CardTitle>
              <span className="text-xs font-semibold text-muted-foreground">
                {filteredInstruments.length} criteria
              </span>
            </div>
            <SearchTemplate
              search={search}
              setSearch={(value) => setSearch(value)}
              title="principle or criterion"
            />
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto p-4 pt-4 sm:p-5 sm:pt-4">
            <BrowseGuidelinesContent
              search={search}
              setSearch={setSearch}
              principles={PRINCIPLES}
              filteredGuidelines={filteredGuidelines}
              activeCriterionId={
                activeCriterion ? String(activeCriterion.id) : ""
              }
              selectedGuidelineId={selectedGuidelineId}
              onSelectGuideline={handleSelectGuideline}
              onSelectCriterion={handleSelectCriterion}
              instruments={filteredInstruments}
              showSearchInput={false}
            />
          </CardContent>
        </Card>

        {/* Right Column: Selected Criterion Detail without Tabs */}
        <Card
          className="flex flex-col border border-border/80 shadow-xs lg:col-span-2"
          style={{ minHeight: "calc(100vh - 8.5rem)" }}
        >
          {activeCriterion ? (
            <div className="flex flex-1 flex-col justify-between space-y-6 p-5 sm:p-7">
              <div className="space-y-6">
                {/* Meta Bar & Edit Action */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                      {activeCriterion.principle}
                    </span>
                    <span className="text-muted-foreground/40">•</span>
                    <span className="text-xs font-medium text-muted-foreground">
                      Guideline {activeCriterion.guidelineId}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEdit(activeCriterion)}
                    className="gap-1.5 font-medium hover:bg-muted"
                  >
                    <Pencil className="size-3.5" />
                    Edit Instrument
                  </Button>
                </div>

                {/* Criterion Title & Level Badge */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    {activeCriterion.title}
                  </h2>
                  {activeCriterion.level && (
                    <div className="pt-1">
                      <Badge
                        variant={
                          activeCriterion.level.includes("Level AAA")
                            ? "outline"
                            : activeCriterion.level.includes("Level AA")
                              ? "secondary"
                              : "default"
                        }
                        className="px-2.5 py-0.5 text-xs font-semibold"
                      >
                        {activeCriterion.level}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content Specification & Guidance Box */}
                <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
                  <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Criterion Specification & Guidance
                  </h3>
                  {renderContentBody(activeCriterion.body)}
                </div>
              </div>

              {/* Prev / Next Criterion Navigation Footer */}
              <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                {prevCriterion ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSelectCriterion(prevCriterion)}
                    className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="size-4" />
                    <span className="max-w-35 truncate sm:max-w-55">
                      {prevCriterion.criterionNum} {prevCriterion.criterionName}
                    </span>
                  </Button>
                ) : (
                  <div />
                )}

                {nextCriterion && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSelectCriterion(nextCriterion)}
                    className="ml-auto gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <span className="max-w-35 truncate sm:max-w-55">
                      {nextCriterion.criterionNum} {nextCriterion.criterionName}
                    </span>
                    <ChevronRight className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <FileText className="mb-2 size-8 opacity-40" />
              <p className="text-sm font-medium">
                No criteria found matching your selection.
              </p>
              <p className="text-xs">
                Select a guideline or clear your search query.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Edit WCAG Instrument Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="flex max-h-9/10 w-full flex-col overflow-hidden sm:max-w-2xl">
          <DialogHeader className="shrink-0 border-b border-border/50 p-6 pb-4">
            <DialogTitle className="text-lg font-bold">
              Edit WCAG Instrument
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update the WCAG specification, title, or guidance content.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6">
            {editError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/15 p-3 text-xs font-medium text-destructive">
                {editError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Principle
              </label>
              <Select
                value={editPrinciple}
                onValueChange={(val: any) => setEditPrinciple(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select principle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PRINCIPLES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Criterion Title
              </label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="e.g. 1.2.1 Audio-only and Video-only (Prerecorded)"
                className="text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground">
                  Content Specification & Guidance
                </label>
                <span className="text-xs text-muted-foreground">
                  WCAG formatting supported
                </span>
              </div>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={12}
                className="min-h-55 resize-y font-mono text-xs leading-relaxed"
                placeholder="Enter criterion content..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveEdit}
              disabled={
                updateMutation.isPending ||
                !editTitle.trim() ||
                !editContent.trim()
              }
              className="gap-1.5"
            >
              {updateMutation.isPending ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Save className="size-3.5" />
              )}
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function BrowseGuidelinesContent({
  search,
  setSearch,
  principles,
  filteredGuidelines,
  activeCriterionId,
  selectedGuidelineId,
  onSelectGuideline,
  onSelectCriterion,
  instruments,
  showSearchInput = true,
}: {
  search: string
  setSearch: (val: string) => void
  principles: WCAGPrinciple[]
  filteredGuidelines: WCAGGuideline[]
  activeCriterionId: string
  selectedGuidelineId: string
  onSelectGuideline: (guidelineId: string) => void
  onSelectCriterion: (criterion: ParsedInstrument) => void
  instruments: ParsedInstrument[]
  showSearchInput?: boolean
}) {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      {showSearchInput && (
        <div className="shrink-0">
          <SearchTemplate
            search={search}
            setSearch={(value) => setSearch(value)}
            title="principle or criterion"
          />
        </div>
      )}

      <div className="flex-1 space-y-5">
        {principles.map((principle) => {
          const guidelinesInPrinciple = filteredGuidelines.filter(
            (g) => g.principle === principle
          )

          if (guidelinesInPrinciple.length === 0) return null

          return (
            <div key={principle} className="space-y-2">
              <h4 className="px-1 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                {principle}
              </h4>
              <div className="space-y-3">
                {guidelinesInPrinciple.map((guideline) => {
                  const criteriaInGuideline = instruments
                    .filter((c) => c.guidelineId === guideline.id)
                    .sort((a, b) =>
                      compareCriterionNum(a.criterionNum, b.criterionNum)
                    )

                  const isGuidelineActive = selectedGuidelineId === guideline.id

                  return (
                    <div key={guideline.id} className="space-y-1">
                      {/* Guideline row (static header, not collapsible) */}
                      <button
                        type="button"
                        onClick={() => onSelectGuideline(guideline.id)}
                        className={cn(
                          "group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-bold transition-colors",
                          isGuidelineActive
                            ? "bg-muted/80 text-foreground"
                            : "text-foreground/80 hover:bg-muted/40 hover:text-foreground"
                        )}
                      >
                        <span className="truncate">{guideline.name}</span>
                        {criteriaInGuideline.length > 0 && (
                          <span
                            className={cn(
                              "ml-1.5 shrink-0 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums",
                              isGuidelineActive
                                ? "bg-foreground/15 text-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {criteriaInGuideline.length}
                          </span>
                        )}
                      </button>

                      {/* Nested Criteria List (Always visible / static) */}
                      {criteriaInGuideline.length > 0 && (
                        <div className="ml-3 space-y-0.5 border-l border-border/50 pl-2">
                          {criteriaInGuideline.map((c) => {
                            const isCriterionActive =
                              String(c.id) === activeCriterionId

                            // Extract short level tag e.g. "A", "AA", "AAA"
                            const levelTag = c.level
                              ? c.level.replace(/^Level\s+/i, "")
                              : null

                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => onSelectCriterion(c)}
                                className={cn(
                                  "group flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs transition-colors",
                                  isCriterionActive
                                    ? "bg-secondary font-semibold text-foreground shadow-2xs"
                                    : "font-normal text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                              >
                                <div className="flex min-w-0 items-center gap-1.5">
                                  <span
                                    className={cn(
                                      "shrink-0 font-mono text-xs",
                                      isCriterionActive
                                        ? "font-bold text-foreground"
                                        : "font-medium text-muted-foreground/90"
                                    )}
                                  >
                                    {c.criterionNum}
                                  </span>
                                  <span className="truncate">
                                    {c.criterionName}
                                  </span>
                                </div>
                                {levelTag && (
                                  <span
                                    className={cn(
                                      "ml-1.5 shrink-0 rounded px-1 py-0.5 text-xs font-bold tracking-tight uppercase tabular-nums",
                                      isCriterionActive
                                        ? "bg-foreground/15 text-foreground"
                                        : "bg-muted/80 text-muted-foreground"
                                    )}
                                  >
                                    {levelTag}
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
