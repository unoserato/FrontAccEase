import { useState } from "react"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { coreModules } from "@/const/coreModules"
import type { CoreTopicsProps } from "@/const/materialsProps"
import { Link, useParams } from "react-router-dom"
import NotFound from "../errors/NotFound"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Award,
  CheckCircle2,
  ChevronRight,
  CircleCheck,
  CircleDashed,
  Compass,
  Keyboard,
  Layers,
  Palette,
  Pencil,
  Volume2,
} from "lucide-react"
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
import type { UserProps } from "@/const/data"

// Mock data at the top of the file for missing progress, badges, and remaining topics
const mockModuleProgress = {
  completedPercent: 50,
  quizzesCompleted: 2,
  quizzesTotal: 4,
  topicsCount: 12,
  earnedBadges: [
    {
      id: "b1",
      title: "Screen Reader Rookie",
      subtitle: "Completed 1.1",
      icon: Volume2,
    },
    {
      id: "b2",
      title: "ARIA Explorer",
      subtitle: "Foundations Met",
      icon: Compass,
    },
  ],
  remainingTopics: [
    {
      id: "r1",
      title: "Color Contrast Deep Dive",
      icon: Palette,
    },
    {
      id: "r2",
      title: "Keyboard Focus Management",
      icon: Keyboard,
    },
  ],
}

export default function CoreModulesView() {
  const { principleId } = useParams()
  const user: UserProps = { name: "", role: "admin", id: "", img: "" }

  const targetModule = coreModules.find((c) => c.id === principleId)

  if (!targetModule) {
    return <NotFound />
  }

  const isEditor = user?.role == "admin" || false

  return (
    <section className="p-responsive">
      <HeaderTemplate
        title={targetModule?.principle}
        subtitle={targetModule?.description}
        backTo={"-1"}
      />

      <div className="grid grid-cols-1 gap-6 pt-6 sm:pt-6 lg:grid-cols-3">
        {/* Left Column: Learning Pathway */}
        <div
          className={`space-y-4 ${isEditor ? "col-span-3" : "lg:col-span-2"}`}
        >
          <div className="space-y-6">
            <CardTitle className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Learning Pathway
            </CardTitle>

            <CardContent className="p-3 sm:p-6 sm:pt-0">
              <Accordion multiple className="w-full space-y-4">
                {targetModule.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="group flex w-full gap-3 sm:gap-5"
                  >
                    {/* Stepper Node & Vertical Line */}
                    <div className="flex shrink-0 flex-col items-center gap-1">
                      <CircleCheck size={16} className="shrink-0" />
                      <div
                        className="mt-2 h-full w-0.5 bg-border group-last:hidden"
                        aria-label="vertical-line"
                      />
                    </div>

                    {/* Topic Card Item */}
                    <AccordionItem
                      value={topic.id}
                      className="w-full rounded-xl border border-border/80 bg-card p-0 shadow-sm transition-all hover:border-border"
                    >
                      <AccordionTrigger className={`p-3 sm:p-5`}>
                        <div className="flex flex-1 justify-between">
                          <div>
                            <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                              {topic.name}
                            </h3>
                            <p className="line-clamp-2 text-xs font-normal text-muted-foreground sm:text-sm">
                              {topic.description}
                            </p>
                          </div>
                          {isEditor && <EditButton topic={topic} />}
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="border-t border-border/60 bg-muted/20 p-2 sm:p-3">
                        <div className="space-y-1.5">
                          {topic.lessons.map((lesson) => (
                            <Item
                              key={lesson.id}
                              className="rounded-lg border border-border/40 bg-background px-3 py-2.5 transition-colors hover:border-border hover:bg-muted/40"
                              render={
                                <Link to={`./${topic.id}/${lesson.id}`} />
                              }
                            >
                              <ItemMedia className="text-foreground">
                                <CheckCircle2 className="size-4 text-foreground" />
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle className="text-xs font-semibold text-foreground sm:text-sm">
                                  {lesson.name}
                                </ItemTitle>
                              </ItemContent>
                              <ItemActions>
                                <ChevronRight className="size-4 text-muted-foreground" />
                              </ItemActions>
                            </Item>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </CardContent>
          </div>
        </div>

        {/* Right Sidebar Column */}
        {!isEditor && (
          <div className="space-y-4 sm:space-y-6 lg:col-span-1">
            {/* Card 1: Module Progress */}
            <Card className="border border-border/80 shadow-sm">
              <CardHeader className="p-4 sm:p-5">
                <div className="flex items-center gap-2 text-foreground">
                  <CircleDashed className="size-5 stroke-2 text-foreground" />
                  <CardTitle className="text-base font-bold sm:text-lg">
                    Module Progress
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 p-4 pt-0 sm:p-5 sm:pt-0">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                      {mockModuleProgress.completedPercent}%
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
                      Completed
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground transition-all duration-500"
                      style={{
                        width: `${mockModuleProgress.completedPercent}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Quizzes
                    </p>
                    <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
                      {mockModuleProgress.quizzesCompleted} /{" "}
                      {mockModuleProgress.quizzesTotal}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Topics
                    </p>
                    <p className="mt-1 text-base font-bold text-foreground sm:text-lg">
                      {mockModuleProgress.topicsCount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Earned Badges */}
            <EarnedBagdes />
            {/* Card 3: Remaining Topics */}
            <Card className="border border-border/80 shadow-sm">
              <CardHeader className="p-4 sm:p-5">
                <div className="flex items-center gap-2 text-foreground">
                  <Layers className="size-5 stroke-2 text-foreground" />
                  <CardTitle className="text-base font-bold sm:text-lg">
                    Remaining Topics
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5 p-4 pt-0 sm:p-5 sm:pt-0">
                {mockModuleProgress.remainingTopics.map((rem) => {
                  const IconComponent = rem.icon
                  return (
                    <div
                      key={rem.id}
                      className="flex items-center gap-3 rounded-lg bg-muted/40 px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background text-muted-foreground">
                        <IconComponent className="size-4" />
                      </div>
                      <span className="truncate text-xs font-semibold sm:text-sm">
                        {rem.title}
                      </span>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}

export function EarnedBagdes() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-foreground">
          <Award className="size-5" />
          <CardTitle className="text-base font-bold sm:text-lg">
            Earned Badges
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-0 sm:p-5 sm:pt-0">
        {mockModuleProgress.earnedBadges.map((badge) => {
          const IconComponent = badge.icon
          return (
            <div
              key={badge.id}
              className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-card p-3 shadow-2xs transition-colors"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
                <IconComponent className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-foreground sm:text-sm">
                  {badge.title}
                </p>
                <p className="truncate text-xs font-medium text-muted-foreground">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

function EditButton({ topic }: { topic: CoreTopicsProps }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(topic.name)
  const [description, setDescription] = useState(topic.description)

  function handleSubmit() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            onClick={(e) => {
              e.stopPropagation()
            }}
            variant="ghost"
            size="xs"
          />
        }
      >
        <Pencil className="size-4" />
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()} className={`w-lg`}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Edit Topic</DialogTitle>
            <DialogDescription>
              Update the topic title and description below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor={`topic-name-${topic.id}`}>Topic Name</Label>
              <Input
                id={`topic-name-${topic.id}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`topic-desc-${topic.id}`}>Description</Label>
              <Textarea
                id={`topic-desc-${topic.id}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
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
