import { useState, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import HeaderTemplate from "@/components/common/PageTemplate"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ClipboardCheck, FileText, Rocket, Sparkles } from "lucide-react"
import { api } from "@/services/axios"
import PourLessons from "./PourLessons"
import PourPublication from "./PourPublication"
import PourAssessments from "./PourAssessments"
import PourScenarios from "./PourScenarios"

type Draft = {
  id: string
  title: string
  description: string
  introduction: Record<string, unknown>
  learning_objectives: string[]
  [key: string]: unknown
}

function DraftForm({ initial }: { initial: Draft }) {
  const queryClient = useQueryClient()
  const [saved, setSaved] = useState(initial)
  const [title, setTitle] = useState(initial.title)
  const [description, setDescription] = useState(initial.description)
  const [objectives, setObjectives] = useState(initial.learning_objectives.join("\n"))
  const [introduction, setIntroduction] = useState(initial.introduction)
  const mutation = useMutation({
    mutationFn: async () => (await api.put<Draft>(`/admin/pour/revisions/draft/${initial.id}`, {
      expected: saved,
      title: title.trim(),
      description,
      introduction,
      learning_objectives: objectives.split("\n").map((item) => item.trim()).filter(Boolean),
    })).data,
    onSuccess: (result) => {
      setSaved(result)
      queryClient.invalidateQueries({ queryKey: ["admin", "pour-curriculum"] })
    },
  })
  const submit = (event: FormEvent) => {
    event.preventDefault()
    mutation.mutate()
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <FieldGroup>
        <Field><FieldLabel htmlFor="draft-title">Title</FieldLabel><Input id="draft-title" value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={255} /></Field>
        <Field><FieldLabel htmlFor="draft-description">Description</FieldLabel><Textarea id="draft-description" value={description} onChange={(event) => setDescription(event.target.value)} /></Field>
        <Field><FieldLabel htmlFor="draft-objectives">Learning objectives, one per line</FieldLabel><Textarea id="draft-objectives" value={objectives} onChange={(event) => setObjectives(event.target.value)} /></Field>
        <Field><FieldLabel>Introduction</FieldLabel><SimpleEditor initialContent={initial.introduction} onChange={setIntroduction} /></Field>
      </FieldGroup>
      {mutation.isError && <p role="alert">Could not save the draft. It may have changed elsewhere; reload the page and try again.</p>}
      {mutation.isSuccess && <p role="status">Draft saved.</p>}
      <div><Button type="submit" disabled={mutation.isPending || !title.trim()}>{mutation.isPending ? "Saving…" : "Save draft"}</Button></div>
    </form>
  )
}

export default function PourDraft() {
  const { revisionId } = useParams()
  const query = useQuery({
    queryKey: ["admin", "pour-draft", revisionId],
    queryFn: async () => (await api.get<Draft>(`/admin/pour/revisions/draft/${revisionId}`)).data,
    enabled: Boolean(revisionId),
  })
  return (
    <section className="p-responsive flex flex-col gap-6">
      <HeaderTemplate title={query.data?.title ? `Edit ${query.data.title}` : "Edit module draft"} subtitle="Build your learning path one section at a time." />
      <Link to="/admin/learning-materials" className="underline">Back to Learning Materials</Link>
      {query.isPending && <p role="status">Loading draft…</p>}
      {query.isError && <p role="alert">Could not load this draft. It may have been published or removed.</p>}
      {query.data && <Tabs defaultValue="details" className="gap-6">
        <div className="overflow-x-auto">
          <TabsList aria-label="Module editor sections" className="min-w-max">
            <TabsTrigger value="details"><FileText data-icon="inline-start" />Details</TabsTrigger>
            <TabsTrigger value="lessons"><BookOpen data-icon="inline-start" />Lessons</TabsTrigger>
            <TabsTrigger value="assessments"><ClipboardCheck data-icon="inline-start" />Assessments</TabsTrigger>
            <TabsTrigger value="activities"><Sparkles data-icon="inline-start" />Interactive</TabsTrigger>
            <TabsTrigger value="publish"><Rocket data-icon="inline-start" />Publish</TabsTrigger>
          </TabsList>
        </div>
        <p className="text-sm text-muted-foreground">Save changes in each section before leaving this page. Published content stays unchanged until you publish this draft.</p>
        <TabsContent value="details" keepMounted><Card><CardHeader><CardTitle>Module details</CardTitle><p className="text-sm text-muted-foreground">Introduce the principle and describe what students will learn.</p></CardHeader><CardContent><DraftForm key={query.data.id} initial={query.data} /></CardContent></Card></TabsContent>
        <TabsContent value="lessons" keepMounted><PourLessons revisionId={query.data.id} /></TabsContent>
        <TabsContent value="assessments" keepMounted><PourAssessments revisionId={query.data.id} /></TabsContent>
        <TabsContent value="activities" keepMounted><PourScenarios revisionId={query.data.id} /></TabsContent>
        <TabsContent value="publish" keepMounted><PourPublication revisionId={query.data.id} /></TabsContent>
      </Tabs>}
    </section>
  )
}
