import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/services/axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Attempt = { activity_id: string; attempt_number: number; score: number; passed: boolean; submitted_at: string }
type Activity = { id: string; kind: string; title: string }
type Path = { status: string; percentage: number; completed_lessons: number; total_lessons: number; activities?: Activity[]; attempts?: Attempt[]; completions?: { activity_id: string }[] }
type Student = { learner: { id: string; name: string; email: string }; classrooms: string[]; status: string; percentage: number; principles: { name: string; status: string; percentage: number }[]; last_activity: string | null; needs_support: boolean }
type Overview = { students: Student[]; total_students: number; status_counts: Record<string, number>; completion_rate: number; assessment_averages: Record<string, number | null> }
type Detail = { learner: Student["learner"]; classrooms: string[]; progress: { percentage: number; principles: { name: string; content: Path }[] } }
const label = (value: string) => value.replaceAll("_", " ").replace(/^./, (s) => s.toUpperCase())
const score = (value: number | null | undefined) => value == null ? "—" : `${value}%`

function StudentDetail({ id, onBack }: { id: string; onBack: () => void }) {
  const query = useQuery({ queryKey: ["instructor", "pour-learner", id], queryFn: async () => (await api.get<Detail>(`/instructor/pour/progress/learner/${id}`)).data })
  return <div className="flex flex-col gap-5"><div><Button variant="outline" onClick={onBack}>Back to progress</Button></div>
    {query.isPending && <p role="status">Loading learner progress…</p>}{query.isError && <p role="alert">Could not load this learner’s progress.</p>}
    {query.data && <><div><h2 className="text-2xl font-semibold">{query.data.learner.name}</h2><p className="text-muted-foreground">{query.data.learner.email} · {query.data.classrooms.join(", ")}</p><p>Overall progress: {score(query.data.progress.percentage)}</p></div>
      {query.data.progress.principles.map(({ name, content: path }) => {
        const completed = new Set(path.completions?.map((c) => c.activity_id))
        const activities = path.activities ?? []
        const attempts = path.attempts ?? []
        const pre = activities.find((a) => a.kind === "pre")
        const post = activities.find((a) => a.kind === "post")
        const preScore = attempts.find((a) => a.activity_id === pre?.id)?.score
        const postScore = attempts.find((a) => a.activity_id === post?.id)?.score
        return <Card key={name}><CardHeader><CardTitle>{label(name)}</CardTitle><CardDescription>{label(path.status)} · {score(path.percentage)} · {path.completed_lessons}/{path.total_lessons} lessons complete</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">
          <progress max={100} value={path.percentage} aria-label={`${label(name)} progress`} className="w-full accent-foreground" />
          <p>Pre: {score(preScore)} · Post: {score(postScore)} · Improvement: {preScore != null && postScore != null ? `${(postScore - preScore).toFixed(2)} percentage points` : "—"}</p>
          {activities.length > 0 && <ul className="flex flex-col gap-2">{activities.map((activity) => { const results = attempts.filter((a) => a.activity_id === activity.id); return <li key={activity.id} className="rounded-md border p-3"><p className="font-medium">{activity.title} <span className="text-muted-foreground">({label(activity.kind)})</span></p><p className="text-sm">{completed.has(activity.id) ? "Completed" : "Not completed"}{results.length > 0 && ` · ${results.length} attempt${results.length === 1 ? "" : "s"}`}</p>{results.map((result) => <p className="text-sm text-muted-foreground" key={`${result.activity_id}-${result.attempt_number}`}>Attempt {result.attempt_number}: {score(result.score)} · {result.passed ? "Passed" : "Below threshold"}</p>)}</li> })}</ul>}
        </CardContent></Card>
      })}</>}
  </div>
}

export default function PourProgress({ classroomId }: { classroomId: string }) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string | null>(null)
  const query = useQuery({ queryKey: ["instructor", "pour-progress", classroomId], queryFn: async () => (await api.get<Overview>(`/instructor/pour/progress/classroom/${classroomId}`)).data })
  const students = query.data?.students.filter((s) => `${s.learner.name} ${s.learner.email} ${s.classrooms.join(" ")}`.toLowerCase().includes(search.toLowerCase())) ?? []
  return <section className="flex flex-col gap-6"><div><h2 className="text-2xl font-semibold">POUR progress</h2><p className="text-muted-foreground">Monitor learners enrolled in this classroom.</p></div>
    {selected ? <StudentDetail id={selected} onBack={() => setSelected(null)} /> : <>
      {query.isPending && <p role="status">Loading progress…</p>}{query.isError && <p role="alert">Could not load POUR progress. Try again later.</p>}
      {query.data && <><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Enrolled learners", query.data.total_students], ["Not started", query.data.status_counts.not_started], ["In progress", query.data.status_counts.in_progress], ["Completed", query.data.status_counts.completed]].map(([title, value]) => <Card key={title}><CardHeader><CardDescription>{title}</CardDescription><CardTitle>{value}</CardTitle></CardHeader></Card>)}</div>
        <Card><CardHeader><CardTitle>Class performance</CardTitle><CardDescription>{score(query.data.completion_rate)} of enrolled learners completed all four principles.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3"><p>Average latest scores: Pre {score(query.data.assessment_averages.pre)} · Mini {score(query.data.assessment_averages.mini)} · Post {score(query.data.assessment_averages.post)}</p><p className="text-sm text-muted-foreground">Needs support indicates a most recent assessment attempt below its configured threshold.</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{["perceivable", "operable", "understandable", "robust"].map((principle) => { const paths = query.data.students.flatMap((s) => s.principles.filter((p) => p.name === principle)); return <div key={principle} className="rounded-md border p-3"><p className="font-medium">{label(principle)}</p><p className="text-sm">{paths.filter((p) => p.status === "completed").length} completed · {paths.filter((p) => p.status === "in_progress").length} in progress · {paths.filter((p) => p.status === "not_started").length} not started · {paths.filter((p) => p.status === "unavailable").length} unavailable</p></div> })}</div>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Learners</CardTitle><CardDescription>Search by name, email, or classroom.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4"><Input aria-label="Search learners" placeholder="Search learners" value={search} onChange={(e) => setSearch(e.target.value)} />
          {students.length === 0 ? <p>{query.data.total_students ? "No learners match your search." : "No learners are enrolled in this classroom."}</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr><th className="p-2">Learner</th><th className="p-2">Status</th><th className="p-2">Progress by principle</th><th className="p-2">Last activity</th><th className="p-2"><span className="sr-only">Details</span></th></tr></thead><tbody>{students.map((student) => <tr key={student.learner.id} className="border-t"><td className="p-2"><span className="font-medium">{student.learner.name}</span><br />{student.classrooms.join(", ")}</td><td className="p-2">{label(student.status)} · {score(student.percentage)}{student.needs_support && <p>May need support</p>}</td><td className="p-2">{student.principles.map((p) => <div key={p.name}>{label(p.name)}: {p.status === "unavailable" ? "Unavailable" : score(p.percentage)}</div>)}</td><td className="p-2">{student.last_activity ? new Date(student.last_activity).toLocaleDateString() : "—"}</td><td className="p-2"><Button variant="outline" onClick={() => setSelected(student.learner.id)} aria-label={`View ${student.learner.name}'s progress`}>View</Button></td></tr>)}</tbody></table></div>}
        </CardContent></Card></>}
    </>}
  </section>
}
