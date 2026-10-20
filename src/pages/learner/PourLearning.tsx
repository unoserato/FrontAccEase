import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { api } from "@/services/axios"
import PourContent from "@/components/common/PourContent"
import { coreModules } from "@/const/coreModules"
import { ArrowRight, Check, Circle, History, LockKeyhole, Play } from "lucide-react"
import { cn } from "@/lib/utils"

type Activity = { id: string; kind: string; title: string; required: boolean }
type Attempt = { id: string; activity_id: string; attempt_number: number; score: number; passed: boolean; submitted_at: string }
type Path = { title: string; status: string; percentage: number; completed_lessons: number; total_lessons: number; next_activity_id: string | null; revision: { description: string; introduction: Record<string, unknown>; learning_objectives: string[] } | null; activities?: Activity[]; completions?: { activity_id: string }[]; attempts?: Attempt[] }
type Progress = { percentage: number; status: string; principles: { name: string; content: Path }[] }

export function usePourProgress() {
  return useQuery({ queryKey: ["learner", "pour-progress"], queryFn: async () => (await api.get<Progress>("/learner/pour/progress")).data })
}

function ProgressValue({ value, label }: { value: number; label: string }) {
  return <div className="flex flex-col gap-2"><div className="flex justify-between text-sm font-medium"><span>{label}</span><span>{value}%</span></div><progress className="h-2 w-full overflow-hidden rounded-full accent-foreground" max={100} value={value} aria-label={label} /></div>
}

export function PourOverview() {
  const query = usePourProgress()
  const navigate = useNavigate()
  const start = useMutation({ mutationFn: async ({ code, activityId }: { code: string; activityId: string }) => { await api.post(`/learner/pour/principles/start/${code}`); return { code, activityId } }, onSuccess: ({ code, activityId }) => navigate(`/learner/modules/pour/${code}/activity/${activityId}`) })
  const entries = (query.data?.principles ?? []).map(({ name, content }) => [name, content] as const)
  const recent = entries.flatMap(([, path]) => (path.attempts ?? []).map((attempt) => ({ ...attempt, principle: path.title, activity: path.activities?.find((item) => item.id === attempt.activity_id)?.title ?? "Assessment" }))).sort((a, b) => b.submitted_at.localeCompare(a.submitted_at)).slice(0, 5)
  const next = entries.find(([, path]) => path.status === "in_progress" && path.next_activity_id) ?? entries.find(([, path]) => path.status === "not_started" && path.next_activity_id)
  const nextActivity = next?.[1].activities?.find((activity) => activity.id === next[1].next_activity_id)
  return <section className="flex flex-col gap-4" aria-labelledby="pour-learning-heading">
    <h2 id="pour-learning-heading" className="sr-only">POUR Learning Module</h2>
    {query.isPending && <p role="status">Loading your progress…</p>}
    {query.isError && <div role="alert"><p>Could not load your learning progress.</p><Button variant="outline" onClick={() => query.refetch()}>Try again</Button></div>}
    {start.isError && <p role="alert">Could not open the next activity. Please try again.</p>}
    {query.data && <>
      {next && next[1].next_activity_id ? <div className="relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-foreground p-8 text-background sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex max-w-xl flex-col gap-3"><p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide"><History className="size-4" aria-hidden="true" /> Continue learning</p><h3 className="text-2xl font-bold">{nextActivity?.title ?? next[1].title}</h3><p className="text-sm opacity-80">{next[1].title} · {next[1].revision?.description}</p><div className="w-full max-w-xs"><p className="flex justify-between text-sm"><span>Overall progress</span><span>{query.data.percentage}%</span></p><progress className="h-2 w-full accent-background" max={100} value={query.data.percentage} aria-label="Overall progress" /></div></div>
        <Button variant="secondary" className="relative shrink-0" disabled={start.isPending} onClick={() => start.mutate({ code: next[0], activityId: next[1].next_activity_id! })}>Continue module <ArrowRight data-icon="inline-end" /></Button>
      </div> : <div className="rounded-2xl bg-muted p-6"><p>{query.data.status === "completed" ? "You have completed all available learning paths." : "Published learning paths will appear here when available."}</p><ProgressValue value={query.data.percentage} label="Overall progress" /></div>}
      <h3 className="mt-6 text-lg font-semibold uppercase">Core principles</h3><div className="grid gap-6 md:grid-cols-2">{entries.map(([code, path]) => {
        const module = coreModules.find((item) => item.id === code)
        const Icon = module?.icon
        const content = <Card className="relative h-full gap-5 overflow-hidden p-6 transition-shadow hover:shadow-md">
          {Icon && <Icon aria-hidden="true" className="pointer-events-none absolute right-6 top-6 size-24 text-muted-foreground/10" />}
          <CardHeader className="relative gap-4 p-0">{Icon && <span className={cn("flex size-14 items-center justify-center rounded-xl", path.status === "unavailable" ? "bg-muted text-muted-foreground" : "bg-foreground text-background")}><Icon className="size-6" aria-hidden="true" /></span>}<CardTitle className="text-xl font-bold">{path.title}</CardTitle><CardDescription className="min-h-12 text-base">{path.revision?.description || module?.description || "No published learning path is available yet."}</CardDescription></CardHeader>
          <CardContent className="relative flex flex-col gap-3 p-0"><ProgressValue value={path.percentage} label="Learning progress" /><p className="text-sm text-muted-foreground">{path.status === "unavailable" ? "Not yet available" : `${path.completed_lessons} of ${path.total_lessons} lessons completed · ${path.status.replaceAll("_", " ")}`}</p></CardContent>
        </Card>
        return path.status === "unavailable" ? <div key={code}>{content}</div> : <Link key={code} className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4" to={`/learner/modules/pour/${code}`} aria-label={`${path.title}, ${path.percentage}% complete`}>{content}</Link>
      })}</div><div className="mt-4"><h3 className="font-semibold">Recent assessment scores</h3>{recent.length ? <ul className="flex flex-col gap-2">{recent.map((item) => <li key={item.id}>{item.principle} · {item.activity}: {item.score}%</li>)}</ul> : <p className="text-sm text-muted-foreground">No assessments completed yet.</p>}</div></>}
  </section>
}

function AssessmentSummary({ path }: { path: Path }) {
  const completed = new Set(path.completions?.map((item) => item.activity_id))
  const activities = path.activities ?? []
  const attempts = [...(path.attempts ?? [])].sort((a, b) => b.submitted_at.localeCompare(a.submitted_at))
  const score = (kind: string) => { const id = activities.find((activity) => activity.kind === kind)?.id; return attempts.find((attempt) => attempt.activity_id === id)?.score }
  const pre = score("pre"), post = score("post")
  const minis = activities.filter((activity) => activity.kind === "mini" && activity.required)
  return <div className="flex flex-col gap-1 text-sm"><p>Pre-assessment: {pre === undefined ? "Not completed" : `${pre}%`}</p><p>Mini-assessments: {minis.filter((activity) => completed.has(activity.id)).length} of {minis.length} completed</p><p>Post-assessment: {post === undefined ? "Not completed" : `${post}%`}</p>{pre !== undefined && post !== undefined && <p>Improvement: {post - pre > 0 ? "+" : ""}{Number((post - pre).toFixed(2))} percentage points</p>}</div>
}

export default function PourPath() {
  const { code } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const query = usePourProgress()
  const path = query.data?.principles.find((principle) => principle.name === code)?.content
  const start = useMutation({ mutationFn: async (activityId: string) => { await api.post(`/learner/pour/principles/start/${code}`); return activityId }, onSuccess: (activityId) => { queryClient.invalidateQueries({ queryKey: ["learner", "pour-progress"] }); navigate(`/learner/modules/pour/${code}/activity/${activityId}`) } })
  const done = new Set(path?.completions?.map((item) => item.activity_id))
  return <section className="p-responsive flex flex-col gap-6"><Link to="/learner/modules" className="underline">Back to learning modules</Link>
    {query.isPending && <p role="status">Loading learning path…</p>}{query.isError && <p role="alert">Could not load this learning path.</p>}
    {query.data && !path && <p role="alert">Learning path not found.</p>}
    {path && <><div><h1 className="text-2xl font-bold">{path.title}</h1><p>{path.revision?.description}</p></div>{path.revision?.introduction && <PourContent content={path.revision.introduction} />}<ProgressValue value={path.percentage} label="Principle progress" /><AssessmentSummary path={path} />
      {path.revision?.learning_objectives?.length ? <div><h2 className="font-semibold">Learning objectives</h2><ul className="list-disc pl-5">{path.revision.learning_objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div> : null}
      {start.isError && <p role="alert">Could not open this activity. Please try again.</p>}
      {path.status === "unavailable" ? <p>This learning path is not available yet.</p> : <><h2 className="text-lg font-semibold">Learning path</h2><ol className="relative flex flex-col gap-4 before:absolute before:bottom-3 before:left-3 before:top-3 before:w-px before:bg-border">{path.activities?.map((activity) => {
        const completed = done.has(activity.id)
        const index = path.activities?.findIndex((item) => item.id === activity.id) ?? 0
        const canOpen = completed || (path.activities ?? []).slice(0, index).every((item) => !item.required || done.has(item.id))
        const active = activity.id === path.next_activity_id && !completed
        const kind = activity.kind === "pre" ? "Pre-assessment" : activity.kind === "post" ? "Post-assessment" : activity.kind === "mini" ? "Mini-assessment" : activity.kind === "interactive" ? "Interactive activity" : "Lesson"
        const latest = [...(path.attempts ?? [])].filter((attempt) => attempt.activity_id === activity.id).sort((a, b) => b.submitted_at.localeCompare(a.submitted_at))[0]
        return <li key={activity.id} className="relative flex items-start gap-4"><span className={cn("relative z-0 mt-2 flex size-6 shrink-0 items-center justify-center rounded-full", completed ? "bg-foreground text-background" : active ? "border-2 border-foreground bg-background" : "bg-muted text-muted-foreground")} aria-hidden="true">{completed ? <Check className="size-4" /> : active ? <Circle className="size-2 fill-foreground" /> : <LockKeyhole className="size-3" />}</span><Card className={cn("w-full gap-3 p-5", active ? "bg-foreground text-background" : !canOpen ? "opacity-65" : "bg-muted/50")}><CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 p-0"><CardTitle className="text-base font-semibold">{activity.title}</CardTitle><span className={cn("rounded border px-2 py-1 text-xs", active && "bg-background text-foreground")}>{completed ? "Completed" : active ? "In progress" : canOpen ? "Available" : "Locked"}</span></CardHeader><CardContent className="flex flex-col items-start gap-3 p-0"><p className={cn("text-sm", active ? "text-background/80" : "text-muted-foreground")}>{kind}{!activity.required && " · Optional"}{latest && ` · Latest score: ${latest.score}%`}</p><Button variant={active ? "secondary" : "outline"} disabled={!canOpen || start.isPending} onClick={() => start.mutate(activity.id)}>{completed ? "Review" : active ? <><Play data-icon="inline-start" />Resume</> : canOpen ? "Open" : "Locked"}</Button></CardContent></Card></li>
      })}</ol></>}
    </>}
  </section>
}
