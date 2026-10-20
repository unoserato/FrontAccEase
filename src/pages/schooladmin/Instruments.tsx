import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { FileText, PanelLeft } from "lucide-react"
import SearchTemplate from "@/components/common/SearchTemplate"
import { useWCAGInstruments } from "@/services/tanstack/materials"
import type { InstrumentProps } from "@/const/props/miscellaneousProps"

// TODO: make it dropddown per 1.1, 1.2. etc

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

  // Extract level from content e.g. (Level A), (Level AA), (Level AAA), (Level AA) New
  const levelMatch = item.content.match(
    /^\s*\(Level\s+(A{1,3})\)(?:\s+(New))?/i
  )
  const level = levelMatch
    ? `Level ${levelMatch[1].toUpperCase()}${levelMatch[2] ? " (New)" : ""}`
    : item.content.trim().startsWith("Note")
      ? "Note"
      : null

  // Strip leading (Level ...) tag lines
  const body = item.content
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
  const sections = body.split(/\n\n+/).filter(Boolean)

  return (
    <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
      {sections.map((section, idx) => {
        const lines = section
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)

        // Check if lines are a bulleted list (- item)
        const isBulletList =
          lines.length > 1 && lines.every((line) => line.startsWith("- "))

        if (isBulletList) {
          return (
            <ul key={idx} className="space-y-1.5 pl-2">
              {lines.map((line, lIdx) => (
                <li key={lIdx} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                  <span>{line.replace(/^-\s*/, "")}</span>
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
            (firstLine.length < 35 && !firstLine.includes(".")))

        if (isHeadingAndBody) {
          const heading = firstLine
          const rest = lines.slice(1).join(" ")
          return (
            <div
              key={idx}
              className="space-y-1 rounded-xl border border-border/70 bg-muted/30 p-3.5 sm:p-4"
            >
              <h4 className="font-bold text-foreground">{heading}</h4>
              <p className="text-muted-foreground">{rest}</p>
            </div>
          )
        }

        return (
          <p key={idx} className="leading-relaxed">
            {section}
          </p>
        )
      })}
    </div>
  )
}

export default function Instruments() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { data: instrumentsData } = useWCAGInstruments()
  const { guidelineId } = useParams<{ guidelineId?: string }>()

  const [search, setSearch] = useState("")
  const [selectedCriterionId, setSelectedCriterionId] = useState<string>("1")
  const [sheetOpen, setSheetOpen] = useState(false)

  // Parse all instruments from the API dataset
  const parsedInstruments = useMemo(() => {
    return instrumentsData.map(parseInstrument)
  }, [])

  // Current active guideline ID from URL or default to "1.1"
  const selectedGuidelineId = guidelineId || "1.1"

  // Filter criteria based on search query
  const filteredInstruments = useMemo(() => {
    if (!search.trim()) return parsedInstruments
    const query = search.toLowerCase()
    return parsedInstruments.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.principle.toLowerCase().includes(query) ||
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

  // Criteria belonging to the currently selected guideline
  const currentGuidelineCriteria = useMemo(() => {
    return filteredInstruments
      .filter((c) => c.guidelineId === selectedGuidelineId)
      .sort((a, b) => compareCriterionNum(a.criterionNum, b.criterionNum))
  }, [filteredInstruments, selectedGuidelineId])

  // Sync selected criterion when guidelineId changes or when criteria list changes
  const [prevGuidelineId, setPrevGuidelineId] = useState(selectedGuidelineId)
  if (selectedGuidelineId !== prevGuidelineId) {
    setPrevGuidelineId(selectedGuidelineId)
    const firstCriterion = currentGuidelineCriteria[0]
    if (firstCriterion) {
      setSelectedCriterionId(String(firstCriterion.id))
    }
  }

  // Ensure selectedCriterionId belongs to currentGuidelineCriteria
  const activeCriterion =
    currentGuidelineCriteria.find(
      (c) => String(c.id) === selectedCriterionId
    ) ||
    currentGuidelineCriteria[0] ||
    null

  const principles: WCAGPrinciple[] = [
    "Perceivable",
    "Operable",
    "Understandable",
    "Robust",
  ]

  const handleSelectGuideline = (id: string) => {
    navigate(`/admin/instruments/${id}`)
    if (isMobile) {
      setSheetOpen(false)
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
              <SheetContent side="left" className="p-4">
                <SheetHeader className="p-0 pb-3">
                  <SheetTitle>Browse Guidelines</SheetTitle>
                </SheetHeader>
                <BrowseGuidelinesContent
                  search={search}
                  setSearch={setSearch}
                  principles={principles}
                  filteredGuidelines={filteredGuidelines}
                  selectedGuidelineId={selectedGuidelineId}
                  onSelectGuideline={handleSelectGuideline}
                  instruments={filteredInstruments}
                />
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Desktop Left Column: Browse Guidelines Card */}
        <Card className="hidden border border-border/80 shadow-xs lg:col-span-1 lg:block">
          <CardHeader className="p-4 sm:p-5">
            <CardTitle className="text-base font-bold sm:text-lg">
              Browse guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-5 sm:pt-0">
            <BrowseGuidelinesContent
              search={search}
              setSearch={setSearch}
              principles={principles}
              filteredGuidelines={filteredGuidelines}
              selectedGuidelineId={selectedGuidelineId}
              onSelectGuideline={handleSelectGuideline}
              instruments={filteredInstruments}
            />
          </CardContent>
        </Card>

        {/* Right Column: Selected Criterion Detail */}
        <Card className="flex flex-col justify-between shadow-xs lg:col-span-2">
          {currentGuidelineCriteria.length > 0 && activeCriterion ? (
            <Tabs
              value={String(activeCriterion.id)}
              onValueChange={setSelectedCriterionId}
              className="flex flex-1 flex-col justify-between p-4 sm:p-6"
            >
              <div className="h-fit space-y-6">
                {/* Sub-criterion TabsList if guideline has multiple criteria */}
                {currentGuidelineCriteria.length > 1 && (
                  <div className="space-y-2 pb-4">
                    <span className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Success Criteria ({currentGuidelineCriteria.length})
                    </span>
                    <TabsList className="flex-wrap justify-start gap-1 bg-muted p-1">
                      {currentGuidelineCriteria.map((c) => (
                        <TabsTrigger
                          key={c.id}
                          value={String(c.id)}
                          className="text-xs"
                        >
                          <span className="font-bold">{c.criterionNum}</span>
                          <span className="ml-1 text-muted-foreground">
                            {c.criterionName}
                          </span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                )}

                {/* TabsContent for each criterion */}
                {currentGuidelineCriteria.map((c) => (
                  <TabsContent
                    key={c.id}
                    value={String(c.id)}
                    className="mt-0 space-y-6 p-0 outline-none"
                  >
                    {/* Header Info */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                          {c.principle}
                        </span>
                        <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                          {c.title}
                        </h2>
                        {c.level && (
                          <div className="pt-1">
                            <Badge
                              variant={
                                c.level.includes("Level AAA")
                                  ? "outline"
                                  : c.level.includes("Level AA")
                                    ? "secondary"
                                    : "default"
                              }
                              className="font-semibold"
                            >
                              {c.level}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
                      <h3 className="mb-4 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                        Criterion Specification & Guidance
                      </h3>
                      {renderContentBody(c.body)}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <FileText className="mb-2 size-8 opacity-40" />
              <p className="text-sm font-medium">
                No criteria found matching your selection.
              </p>
              <p className="text-xs">
                Select a guideline from the list or clear your search query.
              </p>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}

function BrowseGuidelinesContent({
  search,
  setSearch,
  principles,
  filteredGuidelines,
  selectedGuidelineId,
  onSelectGuideline,
  instruments,
}: {
  search: string
  setSearch: (val: string) => void
  principles: WCAGPrinciple[]
  filteredGuidelines: WCAGGuideline[]
  selectedGuidelineId: string
  onSelectGuideline: (guidelineId: string) => void
  instruments: ParsedInstrument[]
}) {
  return (
    <div className="flex-1 space-y-4">
      <SearchTemplate
        search={search}
        setSearch={(value) => setSearch(value)}
        title="principle or criterion"
      />
      <div className="space-y-6 overflow-y-auto pr-1">
        {principles.map((principle) => {
          const guidelinesInPrinciple = filteredGuidelines.filter(
            (g) => g.principle === principle
          )

          if (guidelinesInPrinciple.length === 0) return null

          return (
            <div key={principle} className="space-y-1.5">
              <h4 className="px-1 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                {principle}
              </h4>
              <div className="space-y-1">
                {guidelinesInPrinciple.map((guideline) => {
                  const isActive = selectedGuidelineId === guideline.id
                  const count = instruments.filter(
                    (c) => c.guidelineId === guideline.id
                  ).length

                  return (
                    <Button
                      key={guideline.id}
                      type="button"
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-between font-medium"
                      onClick={() => onSelectGuideline(guideline.id)}
                    >
                      <span className="truncate">{guideline.name}</span>
                      {count > 0 && (
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${
                            isActive
                              ? "bg-foreground/10 text-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </Button>
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
