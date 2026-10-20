import { useMemo, useState, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.min.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/services/axios"

type Choice = string | number | boolean | { value: string | number | boolean; text?: string }
type Question = { name: string; title?: string; type: string; choices?: Choice[]; isRequired?: boolean }
type SurveyData = { pages?: { name?: string; elements?: Question[] }[] }
type Assessment = { id: string; activity_id: string; questions: SurveyData; answer_key: Record<string, unknown>; explanations: Record<string, string>; passing_percent: number; max_attempts: number; [key: string]: unknown }
type Activity = { id: string; kind: "pre" | "mini" | "post"; title: string; lesson_version_id: string | null; display_order: number }
type Data = { assessments: Assessment[]; activities: Activity[]; lessons: { id: string; title: string }[] }

const objectiveTypes = new Set(["radiogroup", "dropdown", "boolean", "checkbox", "ranking"])
const choiceValue = (choice: Choice) => typeof choice === "object" ? choice.value : choice
const choiceLabel = (choice: Choice) => typeof choice === "object" ? choice.text ?? String(choice.value) : String(choice)

function AssessmentEditor({ revisionId, assessment, onClose }: { revisionId: string; assessment: Assessment; onClose: () => void }) {
  const [saved, setSaved] = useState(assessment)
  const [pages, setPages] = useState(() => structuredClone(assessment.questions.pages?.length ? assessment.questions.pages : [{ name: "page1", elements: [] }]))
  const [answers, setAnswers] = useState<Record<string, unknown>>(() => ({ ...assessment.answer_key }))
  const [explanations, setExplanations] = useState(assessment.explanations ?? {})
  const [passing, setPassing] = useState(String(assessment.passing_percent))
  const [attempts, setAttempts] = useState(String(assessment.max_attempts))
  const [formError, setFormError] = useState("")
  const [preview, setPreview] = useState(false)
  const [dirty, setDirty] = useState(false)
  const queryClient = useQueryClient()
  const save = useMutation({
    mutationFn: async (changes: object) => (await api.put<Assessment>(`/admin/pour/revisions/assessments/${revisionId}/${assessment.activity_id}`, { expected: saved, ...changes })).data,
    onSuccess: (result) => { setSaved(result); setDirty(false); queryClient.invalidateQueries({ queryKey: ["admin", "pour-assessments", revisionId] }) },
  })
  const questions = pages.flatMap((page) => page.elements ?? [])
  const previewModel = useMemo(() => new Model({ pages: pages.map((page) => ({ ...page, elements: (page.elements ?? []).map((question) => ({ ...question, isRequired: true })) })) }), [pages])
  const updateQuestion = (name: string, update: Partial<Question>) => { setDirty(true); setPages((current) => current.map((page) => ({ ...page, elements: (page.elements ?? []).map((question) => question.name === name ? { ...question, ...update } : question) }))) }
  const addQuestion = () => { setDirty(true); setPages((current) => current.map((page, index) => index === 0 ? { ...page, elements: [...(page.elements ?? []), { name: crypto.randomUUID(), title: "", type: "radiogroup", choices: ["", ""], isRequired: true }] } : page)) }
  const removeQuestion = (name: string) => {
    setDirty(true)
    setPages((current) => current.map((page) => ({ ...page, elements: (page.elements ?? []).filter((question) => question.name !== name) })))
    setAnswers((current) => { const next = { ...current }; delete next[name]; return next })
    setExplanations((current) => { const next = { ...current }; delete next[name]; return next })
  }
  const setAnswer = (name: string, value: unknown) => { setDirty(true); setAnswers((current) => ({ ...current, [name]: value })) }
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const names = questions.map((q) => q.name)
    if (!questions.length || questions.some((q) => !objectiveTypes.has(q.type) || !q.name || !q.title?.trim() || answers[q.name] === undefined || answers[q.name] === null || !explanations[q.name]?.trim()) || new Set(names).size !== names.length) {
      setFormError("Each objective question needs a title, correct answer, and feedback explanation.")
      return
    }
    setFormError("")
    const cleanPages = pages.map((page) => ({ name: page.name, elements: (page.elements ?? []).map((q) => ({ name: q.name, type: q.type, title: q.title, ...(q.choices ? { choices: q.choices } : {}), isRequired: true })) }))
    save.mutate({ questions: { pages: cleanPages }, answer_key: Object.fromEntries(names.map((name) => [name, answers[name]])), explanations: Object.fromEntries(names.map((name) => [name, explanations[name].trim()])), passing_percent: Number(passing), max_attempts: Number(attempts) })
  }
  return <Card><CardHeader><CardTitle>Edit assessment</CardTitle><CardDescription>Create objective questions and preview them using SurveyJS. Explanations provide feedback after submission.</CardDescription></CardHeader><CardContent>
    <form onSubmit={submit} onChange={() => setDirty(true)} className="flex flex-col gap-6">
      <FieldGroup><Field><FieldLabel htmlFor="passing">Passing percentage</FieldLabel><Input id="passing" type="number" min="0" max="100" step="0.01" value={passing} onChange={(event) => setPassing(event.target.value)} required /></Field><Field><FieldLabel htmlFor="attempts">Maximum attempts</FieldLabel><Input id="attempts" type="number" min="1" max="100" step="1" value={attempts} onChange={(event) => setAttempts(event.target.value)} required /></Field></FieldGroup>
      {questions.map((question, index) => {
        const choices = question.choices ?? []
        const answer = answers[question.name]
        const selected = Array.isArray(answer) ? answer : []
        return <fieldset key={question.name} className="flex flex-col gap-4 rounded-lg border p-4"><legend>Question {index + 1}</legend>
          <Field><FieldLabel htmlFor={`title-${question.name}`}>Question</FieldLabel><Input id={`title-${question.name}`} value={question.title ?? ""} onChange={(event) => updateQuestion(question.name, { title: event.target.value })} required /></Field>
          <Field><FieldLabel htmlFor={`type-${question.name}`}>Question type</FieldLabel><select id={`type-${question.name}`} className="h-9 rounded-md border bg-background px-3" value={question.type} onChange={(event) => { updateQuestion(question.name, { type: event.target.value }); setAnswer(question.name, undefined) }}>
            <option value="radiogroup">Multiple choice</option><option value="dropdown">Dropdown</option><option value="boolean">True / false</option><option value="checkbox">Multiple select</option><option value="ranking">Ranking</option>
          </select></Field>
          {question.type !== "boolean" && <fieldset className="flex flex-col gap-2"><legend>Choices</legend>{choices.map((choice, choiceIndex) => <div key={choiceIndex} className="flex gap-2"><Input aria-label={`Choice ${choiceIndex + 1}`} value={choiceLabel(choice)} onChange={(event) => { const updated = [...choices]; updated[choiceIndex] = event.target.value; updateQuestion(question.name, { choices: updated }); setAnswer(question.name, undefined) }} /><Button type="button" variant="outline" onClick={() => { updateQuestion(question.name, { choices: choices.filter((_, i) => i !== choiceIndex) }); setAnswer(question.name, undefined) }}>Remove</Button></div>)}<div><Button type="button" variant="outline" onClick={() => { updateQuestion(question.name, { choices: [...choices, ""] }); setAnswer(question.name, undefined) }}>Add choice</Button></div></fieldset>}
          {question.type === "boolean" ? <Field><FieldLabel htmlFor={`answer-${question.name}`}>Correct answer</FieldLabel><select id={`answer-${question.name}`} className="h-9 rounded-md border bg-background px-3" value={typeof answer === "boolean" ? String(answer) : ""} onChange={(event) => setAnswer(question.name, event.target.value === "" ? undefined : event.target.value === "true")}><option value="">Select an answer</option><option value="true">True</option><option value="false">False</option></select></Field> : question.type === "ranking" ? <fieldset className="flex flex-col gap-2"><legend>Correct order</legend><p className="text-sm text-muted-foreground">Select choices in the correct order. Clear to start again.</p>{choices.map((choice, i) => <Button key={i} type="button" variant="outline" disabled={!choiceLabel(choice).trim() || selected.includes(choiceValue(choice))} onClick={() => setAnswer(question.name, [...selected, choiceValue(choice)])}>{choiceLabel(choice) || `Choice ${i + 1}`}</Button>)}<p>Order: {selected.map((value) => choiceLabel(choices.find((choice) => choiceValue(choice) === value) ?? String(value))).join(" → ") || "None selected"}</p><div><Button type="button" variant="outline" onClick={() => setAnswer(question.name, [])}>Clear order</Button></div></fieldset> : <fieldset className="flex flex-col gap-2"><legend>Correct answer{question.type === "checkbox" ? "s" : ""}</legend>{choices.map((choice, i) => <label key={i} className="flex items-center gap-2"><input type={question.type === "checkbox" ? "checkbox" : "radio"} name={`answer-${question.name}`} checked={question.type === "checkbox" ? selected.includes(choiceValue(choice)) : answer === choiceValue(choice)} onChange={(event) => setAnswer(question.name, question.type === "checkbox" ? event.target.checked ? [...selected, choiceValue(choice)] : selected.filter((value) => value !== choiceValue(choice)) : choiceValue(choice))} />{choiceLabel(choice) || `Choice ${i + 1}`}</label>)}</fieldset>}
          <Field><FieldLabel htmlFor={`feedback-${question.name}`}>Feedback explanation (shown after submission)</FieldLabel><Textarea id={`feedback-${question.name}`} value={explanations[question.name] ?? ""} onChange={(event) => setExplanations((current) => ({ ...current, [question.name]: event.target.value }))} /></Field>
          <div><Button type="button" variant="outline" onClick={() => removeQuestion(question.name)}>Remove question</Button></div>
        </fieldset>
      })}
      <div className="flex gap-2"><Button type="button" variant="outline" onClick={addQuestion}>Add question</Button><Button type="button" variant="outline" onClick={() => setPreview(!preview)}>{preview ? "Hide preview" : "Preview assessment"}</Button></div>
      {formError && <p role="alert">{formError}</p>}{save.isError && <p role="alert">Could not save. Check the questions or reload if the assessment changed elsewhere.</p>}{save.isSuccess && <p role="status">Assessment saved.</p>}
      <div className="flex flex-wrap gap-3"><Button type="submit" disabled={save.isPending}>{save.isPending ? "Saving…" : "Save assessment"}</Button><Button type="button" variant="outline" onClick={() => { if (!dirty || window.confirm("Discard unsaved changes to this assessment?")) onClose() }}>Back to assessments</Button></div>
    </form>
    {preview && <div aria-label="Assessment preview" className="mt-6"><Survey model={previewModel} /></div>}
  </CardContent></Card>
}

export default function PourAssessments({ revisionId }: { revisionId: string }) {
  const [editing, setEditing] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const key = ["admin", "pour-assessments", revisionId]
  const query = useQuery({ queryKey: key, queryFn: async () => (await api.get<Data>(`/admin/pour/revisions/assessments/${revisionId}`)).data })
  const refresh = () => { queryClient.invalidateQueries({ queryKey: key }); queryClient.invalidateQueries({ queryKey: ["admin", "pour-lessons", revisionId] }) }
  const create = useMutation({ mutationFn: async (input: { kind: string; lesson_id?: string }) => (await api.post<{ activity: Activity }>(`/admin/pour/revisions/assessments/${revisionId}`, input)).data, onSuccess: (data) => { setEditing(data.activity.id); refresh() } })
  const remove = useMutation({ mutationFn: async (id: string) => api.delete(`/admin/pour/revisions/assessments/${revisionId}/${id}`), onSuccess: (_, id) => { if (editing === id) setEditing(null); refresh() } })
  const selected = query.data?.assessments.find((exam) => exam.activity_id === editing)
  return <div className="flex flex-col gap-4">{!selected && <Card><CardHeader><CardTitle>Assessments</CardTitle><CardDescription>Create the pre-assessment, a mini-assessment for each lesson, and the post-assessment.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4">
    {query.isPending && <p role="status">Loading assessments…</p>}{query.isError && <p role="alert">Could not load assessments.</p>}{create.isError && <p role="alert">Could not create assessment. It may already exist.</p>}{remove.isError && <p role="alert">Could not delete assessment.</p>}
    {query.data && <><div className="flex flex-wrap gap-2">{!query.data.activities.some ( (a) => a.kind === "pre") && <Button variant="outline" disabled={create.isPending} onClick={() => create.mutate({ kind: "pre" })}>Create pre-assessment</Button>}{!query.data.activities.some((a) => a.kind === "post") && <Button variant="outline" disabled={create.isPending} onClick={() => create.mutate({ kind: "post" })}>Create post-assessment</Button>}</div>
      {query.data.lessons.filter((lesson) => !query.data.activities.some((a) => a.kind === "mini" && a.lesson_version_id === lesson.id)).map((lesson) => <div key={lesson.id}><Button variant="outline" disabled={create.isPending} onClick={() => create.mutate({ kind: "mini", lesson_id: lesson.id })}>Create mini-assessment for {lesson.title}</Button></div>)}
      <ul className="flex flex-col gap-3">{[...query.data.activities].sort((a, b) => a.display_order - b.display_order).map((activity) => <li key={activity.id} className="flex flex-wrap items-center justify-between gap-3"><span>{activity.title}{activity.lesson_version_id && ` · ${query.data.lessons.find((lesson) => lesson.id === activity.lesson_version_id)?.title ?? "Lesson"}`}</span><div className="flex gap-2"><Button variant="outline" onClick={() => setEditing(activity.id)}>Edit</Button><Button variant="outline" disabled={remove.isPending} onClick={() => { if (window.confirm(`Delete this draft ${activity.title.toLowerCase()}?`)) remove.mutate(activity.id) }}>Delete</Button></div></li>)}</ul></>}
  </CardContent></Card>}{selected && <AssessmentEditor key={selected.id} revisionId={revisionId} assessment={selected} onClose={() => setEditing(null)} />}</div>
}
