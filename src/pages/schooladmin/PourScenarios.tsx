import { useState, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/services/axios"

type Choice = { value: string; label: string }
type Scenario = { id: string; title: string; lesson_version_id: string; display_order: number; content: { prompt: string; explanation: string; choices: Choice[]; correct_choice: string }; [key: string]: unknown }
type Lesson = { id: string; title: string }
type ScenarioList = { activities: Scenario[]; lessons: Lesson[] }

function ScenarioEditor({ revisionId, lessons, initial, onClose }: { revisionId: string; lessons: Lesson[]; initial?: Scenario; onClose: () => void }) {
  const [saved, setSaved] = useState(initial)
  const [lessonId, setLessonId] = useState(initial?.lesson_version_id ?? "")
  const [title, setTitle] = useState(initial?.title ?? "")
  const [prompt, setPrompt] = useState(initial?.content.prompt ?? "")
  const [explanation, setExplanation] = useState(initial?.content.explanation ?? "")
  const [choices, setChoices] = useState<Choice[]>(initial?.content.choices ?? [{ value: crypto.randomUUID(), label: "" }, { value: crypto.randomUUID(), label: "" }])
  const [correct, setCorrect] = useState(initial?.content.correct_choice ?? "")
  const [dirty, setDirty] = useState(false)
  const queryClient = useQueryClient()
  const save = useMutation({
    mutationFn: async () => {
      const data = { lesson_id: lessonId, title: title.trim(), prompt: prompt.trim(), explanation: explanation.trim(), choices: choices.map((choice) => ({ ...choice, label: choice.label.trim() })), correct_choice: correct, expected: saved ?? null }
      const url = `/admin/pour/revisions/scenarios/${revisionId}`
      return saved ? (await api.put<Scenario>(`${url}/${saved.id}`, data)).data : (await api.post<Scenario>(url, data)).data
    },
    onSuccess: (result) => { setSaved(result); setDirty(false); queryClient.invalidateQueries({ queryKey: ["admin", "pour-scenarios", revisionId] }) },
  })
  const valid = lessonId && title.trim() && prompt.trim() && explanation.trim() && choices.length >= 2 && choices.every((choice) => choice.label.trim()) && choices.some((choice) => choice.value === correct)
  const submit = (event: FormEvent) => { event.preventDefault(); if (valid) save.mutate() }
  return <Card><CardHeader><CardTitle>{saved ? "Edit scenario" : "Create scenario"}</CardTitle><CardDescription>Students choose one answer and receive feedback after submitting.</CardDescription></CardHeader><CardContent>
    <form onSubmit={submit} onChange={() => setDirty(true)} className="flex flex-col gap-4"><FieldGroup>
      <Field><FieldLabel htmlFor="scenario-lesson">Lesson</FieldLabel><select id="scenario-lesson" value={lessonId} onChange={(event) => setLessonId(event.target.value)} disabled={!!saved} required className="h-9 rounded-md border bg-background px-3"><option value="">Choose a lesson</option>{lessons.map((lesson) => <option key={lesson.id} value={lesson.id}>{lesson.title}</option>)}</select></Field>
      <Field><FieldLabel htmlFor="scenario-title">Title</FieldLabel><Input id="scenario-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={255} required /></Field>
      <Field><FieldLabel htmlFor="scenario-prompt">Scenario and question</FieldLabel><Textarea id="scenario-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} required /></Field>
      <fieldset className="flex flex-col gap-2"><legend>Answer choices and correct answer</legend>{choices.map((choice, index) => <div key={choice.value} className="flex items-center gap-2"><input type="radio" name="correct-scenario-choice" aria-label={`Mark choice ${index + 1} correct`} checked={correct === choice.value} onChange={() => setCorrect(choice.value)} /><Input aria-label={`Choice ${index + 1}`} value={choice.label} onChange={(event) => setChoices((items) => items.map((item) => item.value === choice.value ? { ...item, label: event.target.value } : item))} required /><Button type="button" variant="outline" onClick={() => { setDirty(true); setChoices((items) => items.filter((item) => item.value !== choice.value)); if (correct === choice.value) setCorrect("") }}>Remove</Button></div>)}<div><Button type="button" variant="outline" disabled={choices.length >= 20} onClick={() => { setDirty(true); setChoices((items) => [...items, { value: crypto.randomUUID(), label: "" }]) }}>Add choice</Button></div></fieldset>
      <Field><FieldLabel htmlFor="scenario-feedback">Feedback explanation</FieldLabel><Textarea id="scenario-feedback" value={explanation} onChange={(event) => setExplanation(event.target.value)} required /></Field>
    </FieldGroup><p className="text-sm text-muted-foreground">Select a correct answer and provide at least two choices.</p>
      {save.isError && <p role="alert">Could not save the scenario. Reload if it changed elsewhere.</p>}{save.isSuccess && <p role="status">Scenario saved.</p>}
      <div className="flex gap-2"><Button type="submit" disabled={!valid || save.isPending}>{save.isPending ? "Saving…" : "Save scenario"}</Button><Button type="button" variant="outline" onClick={() => { if (!dirty || window.confirm("Discard unsaved changes to this scenario?")) onClose() }}>Back to scenarios</Button></div>
    </form>
  </CardContent></Card>
}

export default function PourScenarios({ revisionId }: { revisionId: string }) {
  const [editing, setEditing] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const key = ["admin", "pour-scenarios", revisionId]
  const query = useQuery({ queryKey: key, queryFn: async () => (await api.get<ScenarioList>(`/admin/pour/revisions/scenarios/${revisionId}`)).data })
  const remove = useMutation({ mutationFn: async (id: string) => api.delete(`/admin/pour/revisions/scenarios/${revisionId}/${id}`), onSuccess: (_, id) => { if (editing === id) setEditing(null); queryClient.invalidateQueries({ queryKey: key }) } })
  const selected = query.data?.activities.find((activity) => activity.id === editing)
  return <div className="flex flex-col gap-4">{!editing && <Card><CardHeader><CardTitle>Interactive scenarios</CardTitle><CardDescription>Create scenarios for learners to practice applying a lesson.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">
    {query.isPending && <p role="status">Loading scenarios…</p>}{query.isError && <p role="alert">Could not load scenarios.</p>}{remove.isError && <p role="alert">Could not delete the scenario.</p>}
    {query.data && <><div><Button type="button" variant="outline" disabled={!query.data.lessons.length} onClick={() => setEditing("new")}>Create scenario</Button></div>{!query.data.lessons.length && <p>Add a lesson before creating a scenario.</p>}
      <ul className="flex flex-col gap-3">{[...query.data.activities].sort((a, b) => a.display_order - b.display_order).map((activity) => <li key={activity.id} className="flex flex-wrap items-center justify-between gap-2"><span>{activity.title} · {query.data.lessons.find((lesson) => lesson.id === activity.lesson_version_id)?.title}</span><div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setEditing(activity.id)}>Edit</Button><Button type="button" variant="outline" disabled={remove.isPending} onClick={() => { if (window.confirm(`Delete draft scenario “${activity.title}”?`)) remove.mutate(activity.id) }}>Delete</Button></div></li>)}</ul></>}
  </CardContent></Card>}{query.data && editing && (editing === "new" || selected) && <ScenarioEditor key={editing} revisionId={revisionId} lessons={query.data.lessons} initial={selected} onClose={() => setEditing(null)} />}</div>
}
