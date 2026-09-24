import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Item, ItemContent, ItemActions } from "@/components/ui/item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  wcagGuidelines,
  wcagCriteria,
  type WCAGCriterion,
  type WCAGGuideline,
  type WCAGLevel,
  type WCAGPrinciple,
} from "@/const/criterion"
import { useIsMobile } from "@/hooks/use-mobile"
import { ExternalLink, PanelLeft, Pencil } from "lucide-react"
import SearchTemplate from "@/components/common/SearchTemplate"

export default function Instruments() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const { guidelineId } = useParams<{ guidelineId?: string }>()

  const [search, setSearch] = useState("")
  const [criteriaList, setCriteriaList] =
    useState<WCAGCriterion[]>(wcagCriteria)
  const [selectedCriterionId, setSelectedCriterionId] =
    useState<string>("1.1.1")
  const [sheetOpen, setSheetOpen] = useState(false)

  // Current active guideline ID from URL or default to "1.1"
  const selectedGuidelineId = guidelineId || "1.1"

  // Sync selected criterion when guidelineId changes
  useEffect(() => {
    const firstCriterion = criteriaList.find(
      (c) => c.guidelineId === selectedGuidelineId
    )
    if (firstCriterion) {
      setSelectedCriterionId(firstCriterion.id)
    }
  }, [selectedGuidelineId, criteriaList])

  // Filter guidelines based on search query
  const filteredGuidelines = wcagGuidelines.filter((g) => {
    if (!search.trim()) return true
    const query = search.toLowerCase()
    return (
      g.name.toLowerCase().includes(query) ||
      g.principle.toLowerCase().includes(query)
    )
  })

  // Criteria belonging to the currently selected guideline
  const currentGuidelineCriteria = criteriaList.filter(
    (c) => c.guidelineId === selectedGuidelineId
  )

  // Group guidelines by principle
  const principles: WCAGPrinciple[] = [
    "Perceivable",
    "Operable",
    "Understandable",
    "Robust",
  ]

  const selectedCriterion =
    criteriaList.find((c) => c.id === selectedCriterionId) ||
    currentGuidelineCriteria[0] ||
    criteriaList[0]

  const handleUpdateCriterion = (updated: WCAGCriterion) => {
    setCriteriaList((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    )
  }

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
          subtitle="Rules the analyzer cross-checks against a client’s HTML."
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
                  criteriaList={criteriaList}
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
              criteriaList={criteriaList}
            />
          </CardContent>
        </Card>

        {/* Right Column: Selected Criterion Detail using shadcn Tabs */}
        <Card className="flex flex-col justify-between shadow-xs lg:col-span-2">
          {currentGuidelineCriteria.length > 0 ? (
            <Tabs
              value={selectedCriterionId}
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
                          value={c.id}
                          className="text-xs"
                        >
                          {c.num} {c.name.replace(`${c.num} `, "")}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                )}

                {/* TabsContent for each criterion */}
                {currentGuidelineCriteria.map((c) => (
                  <TabsContent
                    key={c.id}
                    value={c.id}
                    className="mt-0 space-y-6 p-0 outline-none"
                  >
                    {/* Header Info & Edit Action */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-foreground">
                          {c.principle}
                        </p>
                        <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                          {c.name}
                        </h2>
                        <div className="pt-1">
                          <Badge variant="secondary" className="font-semibold">
                            {c.level}
                          </Badge>
                        </div>
                      </div>

                      <EditCriterionDialog
                        criterion={c}
                        onSave={handleUpdateCriterion}
                      />
                    </div>

                    {/* Description Box */}
                    <div className="space-y-1.5 rounded-2xl border border-border/40 bg-muted/40 p-4">
                      <h3 className="text-sm font-bold text-foreground">
                        Description
                      </h3>
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {c.description}
                      </p>
                    </div>

                    {/* Techniques & Rules */}
                    {c.techniques && c.techniques.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h3 className="text-sm font-bold text-foreground">
                          Techniques & Analyzer Rules
                        </h3>
                        <div className="space-y-2">
                          {c.techniques.map((tech) => (
                            <Item
                              key={tech.id}
                              variant="outline"
                              className="justify-between rounded-xl bg-card p-3 text-xs sm:text-sm"
                            >
                              <ItemContent className="flex-row items-center gap-2">
                                <span className="font-bold text-foreground">
                                  {tech.id}:
                                </span>
                                <span className="text-muted-foreground">
                                  {tech.title}
                                </span>
                              </ItemContent>
                              {tech.url && (
                                <ItemActions>
                                  <a
                                    href={tech.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ml-2 text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </ItemActions>
                              )}
                            </Item>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </div>

              {/* Bottom Reference Link */}
              {selectedCriterion && (
                <div className="mt-6 flex justify-end border-t border-border/60 pt-4">
                  <Button
                    variant="link"
                    className="px-0 font-semibold text-foreground"
                  >
                    <a
                      href={selectedCriterion.referenceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5"
                    >
                      <span>References</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </Tabs>
          ) : (
            <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
              Select a guideline to view criteria details.
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
  criteriaList,
}: {
  search: string
  setSearch: (val: string) => void
  principles: WCAGPrinciple[]
  filteredGuidelines: WCAGGuideline[]
  selectedGuidelineId: string
  onSelectGuideline: (guidelineId: string) => void
  criteriaList: WCAGCriterion[]
}) {
  return (
    <div className="flex-1 space-y-4">
      <SearchTemplate
        search={search}
        setSearch={(value) => setSearch(value)}
        title="principle"
      />
      <div className="space-y-6 overflow-y-auto pr-1">
        {principles.map((principle) => {
          const guidelinesInPrinciple = filteredGuidelines.filter(
            (g) => g.principle === principle
          )

          if (guidelinesInPrinciple.length === 0) return null

          return (
            <div key={principle} className="space-y-1.5">
              <h4 className="px-1 text-sm font-bold tracking-wide">
                {principle}
              </h4>
              <div className="space-y-1">
                {guidelinesInPrinciple.map((guideline) => {
                  const isActive = selectedGuidelineId === guideline.id
                  const subCount = criteriaList.filter(
                    (c) => c.guidelineId === guideline.id
                  ).length

                  return (
                    <Button
                      key={guideline.id}
                      type="button"
                      variant={"ghost"}
                      className={"w-full justify-between"}
                      onClick={() => onSelectGuideline(guideline.id)}
                    >
                      <span>{guideline.name}</span>
                      {subCount > 1 && (
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                            isActive
                              ? "bg-background/20 text-background"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {subCount}
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

function EditCriterionDialog({
  criterion,
  onSave,
}: {
  criterion: WCAGCriterion
  onSave: (updated: WCAGCriterion) => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(criterion.name)
  const [level, setLevel] = useState<WCAGLevel>(criterion.level)
  const [description, setDescription] = useState(criterion.description)
  const [referenceUrl, setReferenceUrl] = useState(criterion.referenceUrl)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...criterion,
      name,
      level,
      description,
      referenceUrl,
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" className="rounded-full">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit Criterion</span>
          </Button>
        }
      />
      <DialogContent className={"max-w-xl"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Criterion</DialogTitle>
            <DialogDescription>
              Update rule definition and details for the LLM knowledgebase.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="criterion-name">Criterion Name</Label>
              <Input
                id="criterion-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="criterion-level">Compliance Level</Label>
              <Select
                value={level}
                onValueChange={(val) => setLevel(val as WCAGLevel)}
              >
                <SelectTrigger id="criterion-level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Level A">Level A</SelectItem>
                  <SelectItem value="Level AA">Level AA</SelectItem>
                  <SelectItem value="Level AAA">Level AAA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="criterion-desc">Description</Label>
              <Textarea
                id="criterion-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="criterion-ref">Reference URL</Label>
              <Input
                id="criterion-ref"
                value={referenceUrl}
                onChange={(e) => setReferenceUrl(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
