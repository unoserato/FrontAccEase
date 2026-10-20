import { useState, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/services/axios"

type Lesson = { id: string; title: string; description: string; content: Record<string, unknown>; learning_objectives: string[]; wcag_criteria: string[]; [key: string]: unknown }
type Activity = { kind: string; lesson_version_id: string | null; display_order: number }
type LessonList = { lessons: Lesson[]; activities: Activity[] }

function LessonEditor({ revisionId, lesson, onClose }: { revisionId: string; lesson: Lesson; onClose: () => void }) {
  const [saved, setSaved] = useState(lesson)
  const [title, setTitle] = useState(lesson.title)
  const [description, setDescription] = useState(lesson.description)
  const [objectives, setObjectives] = useState(lesson.learning_objectives.join("\n"))
  const [criteria, setCriteria] = useState(lesson.wcag_criteria.join("\n"))
  const [content, setContent] = useState(lesson.content)
  const [dirty, setDirty] = useState(false)
  const queryClient = useQueryClient()
  const save = useMutation({
    mutationFn: async () => (await api.put<Lesson>(`/admin/pour/revisions/lessons/${revisionId}/${lesson.id}`, {
      expected: saved, title: title.trim(), description, content,
      learning_objectives: objectives.split("\n").map((item) => item.trim()).filter(Boolean),
      wcag_criteria: criteria.split("\n").map((item) => item.trim()).filter(Boolean),
    })).data,
    onSuccess: (result) => {
      setSaved(result)
      setDirty(false)
      queryClient.invalidateQueries({ queryKey: ["admin", "pour-lessons", revisionId] })
    },
  })
  const submit = (event: FormEvent) => { event.preventDefault(); save.mutate() }
  return (
    <Card>
      <CardHeader><CardTitle>Edit lesson</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={submit} onChange={() => setDirty(true)} className="flex flex-col gap-6">
          <FieldGroup>
            <Field><FieldLabel htmlFor="lesson-title">Lesson title</FieldLabel><Input id="lesson-title" value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={255} /></Field>
            <Field><FieldLabel htmlFor="lesson-description">Description</FieldLabel><Textarea id="lesson-description" value={description} onChange={(event) => setDescription(event.target.value)} /></Field>
            <Field><FieldLabel htmlFor="lesson-objectives">Learning objectives, one per line</FieldLabel><Textarea id="lesson-objectives" value={objectives} onChange={(event) => setObjectives(event.target.value)} /></Field>
            <Field><FieldLabel htmlFor="lesson-criteria">WCAG success criteria, one per line</FieldLabel><Textarea id="lesson-criteria" value={criteria} onChange={(event) => setCriteria(event.target.value)} placeholder="1.1.1" /></Field>
            <Field><FieldLabel>Lesson content</FieldLabel><SimpleEditor initialContent={lesson.content} onChange={(value) => { setContent(value); setDirty(true) }} /></Field>
          </FieldGroup>
          {save.isError && <p role="alert">Could not save the lesson. Reload if it was changed elsewhere.</p>}
          {save.isSuccess && <p role="status">Lesson saved.</p>}
          <div className="flex flex-wrap gap-3"><Button type="submit" disabled={save.isPending || !title.trim()}>{save.isPending ? "Saving…" : "Save lesson"}</Button><Button type="button" variant="outline" onClick={() => { if (!dirty || window.confirm("Discard unsaved changes to this lesson?")) onClose() }}>Back to lessons</Button></div>
        </form>
      </CardContent>
    </Card>
  )
}

export default function PourLessons({ revisionId }: { revisionId: string }) {
  const [newTitle, setNewTitle] = useState("")
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const key = ["admin", "pour-lessons", revisionId]
  const query = useQuery({ queryKey: key, queryFn: async () => (await api.get<LessonList>(`/admin/pour/revisions/lessons/${revisionId}`)).data })
  const refresh = () => queryClient.invalidateQueries({ queryKey: key })
  const create = useMutation({
    mutationFn: async () => (await api.post<Lesson>(`/admin/pour/revisions/lessons/${revisionId}`, { title: newTitle.trim() })).data,
    onSuccess: (lesson) => { setNewTitle(""); setCreating(false); setEditingId(lesson.id); refresh() },
  })
  const remove = useMutation({
    mutationFn: async (lessonId: string) => api.delete(`/admin/pour/revisions/lessons/${revisionId}/${lessonId}`),
    onSuccess: (_, lessonId) => { if (editingId === lessonId) setEditingId(null); refresh() },
  })
  const lessons = [...(query.data?.lessons ?? [])].sort((a, b) => {
    const order = (lessonId: string) => query.data?.activities.find((item) => item.kind === "lesson" && item.lesson_version_id === lessonId)?.display_order ?? 0
    return order(a.id) - order(b.id)
  })
  const selected = lessons.find((lesson) => lesson.id === editingId)
  return (
    <div className="flex flex-col gap-4">
      {!selected && <Card>
        <CardHeader><CardTitle>Lessons</CardTitle><CardDescription>Manage lessons in this draft. Each lesson also needs a mini-assessment before publication.</CardDescription></CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!creating && <div><Button type="button" onClick={() => setCreating(true)}>Add lesson</Button></div>}
          {creating && <form onSubmit={(event) => { event.preventDefault(); create.mutate() }} className="flex flex-col items-start gap-3">
            <Field><FieldLabel htmlFor="new-lesson-title">New lesson title</FieldLabel><Input id="new-lesson-title" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} maxLength={255} required /></Field>
            <div className="flex gap-2"><Button type="submit" disabled={create.isPending || !newTitle.trim()}>{create.isPending ? "Creating…" : "Create and edit"}</Button><Button type="button" variant="outline" onClick={() => setCreating(false)}>Cancel</Button></div>
          </form>}
          {query.isPending && <p role="status">Loading lessons…</p>}
          {query.isError && <p role="alert">Could not load lessons.</p>}
          {create.isError && <p role="alert">Could not create the lesson.</p>}
          {remove.isError && <p role="alert">Could not delete the lesson. Remove its linked activities first.</p>}
          {query.data && lessons.length === 0 && <p>No lessons have been created.</p>}
          <ul className="flex flex-col gap-3">
            {lessons.map((lesson) => <li key={lesson.id} className="flex flex-wrap items-center justify-between gap-3"><span>{lesson.title}</span><div className="flex gap-2"><Button type="button" variant="outline" onClick={() => setEditingId(lesson.id)}>Edit</Button><Button type="button" variant="outline" disabled={remove.isPending} onClick={() => { if (window.confirm(`Delete the draft lesson “${lesson.title}”?`)) remove.mutate(lesson.id) }}>Delete</Button></div></li>)}
          </ul>
        </CardContent>
      </Card>}
      {selected && <LessonEditor key={selected.id} revisionId={revisionId} lesson={selected} onClose={() => setEditingId(null)} />}
    </div>
  )
}
