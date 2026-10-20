import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { coreModules } from "@/const/coreModules"
import { api } from "@/services/axios"

type Revision = {
  id: string
  version: number
  status: "draft" | "published"
  title: string
  description: string
}

type Principle = {
  id: string
  code: string
  title: string
  revisions: Revision[]
}

export default function PourCurriculum() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const createDraft = useMutation({
    mutationFn: async ({ principleId, published }: { principleId: string; published: boolean }) => (await api.post<Revision>(`/admin/pour/principles/${published ? "edit" : "draft"}/${principleId}`)).data,
    onSuccess: (draft) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pour-curriculum"] })
      navigate(`/admin/learning-materials/pour/drafts/${draft.id}`)
    },
  })
  const deleteDraft = useMutation({
    mutationFn: async (revisionId: string) => api.delete(`/admin/pour/revisions/draft/${revisionId}`),
    onSuccess: async (_, revisionId) => {
      queryClient.removeQueries({ queryKey: ["admin", "pour-draft", revisionId] })
      await queryClient.invalidateQueries({ queryKey: ["admin", "pour-curriculum"] })
    },
  })
  const query = useQuery({
    queryKey: ["admin", "pour-curriculum"],
    queryFn: async () => (await api.get<Principle[]>("/admin/pour/curriculum")).data,
  })

  return (
    <section className="flex flex-col gap-4" aria-labelledby="pour-curriculum-heading">
      <div>
        <h2 id="pour-curriculum-heading" className="text-lg font-bold text-foreground">POUR Learning Module</h2>
        <p className="text-sm text-muted-foreground">Manage the published and draft learning paths for students.</p>
      </div>
      {query.isPending && <p role="status">Loading curriculum…</p>}
      {query.isError && (
        <Card role="alert">
          <CardHeader><CardTitle>Could not load the curriculum</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-start gap-3">
            <p>Check your connection and try again.</p>
            <Button variant="outline" onClick={() => query.refetch()}>Try again</Button>
          </CardContent>
        </Card>
      )}
      {createDraft.isError && <p role="alert">Could not open an editable module draft. Please try again or check that the backend and database migrations are up to date.</p>}
      {deleteDraft.isError && <p role="alert">Could not delete the draft. It may have been published or removed, or the database migration may not be installed. Refresh and try again.</p>}
      {query.data?.length === 0 && <p>No POUR principles are available.</p>}
      {query.data && query.data.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {query.data.map((principle) => {
            const module = coreModules.find((item) => item.id === principle.code.toLowerCase())
            const Icon = module?.icon
            const draft = principle.revisions.find((revision) => revision.status === "draft")
            const published = principle.revisions.some((revision) => revision.status === "published")
            return (
            <Card key={principle.id} className="relative flex h-full flex-col overflow-hidden p-6 shadow-sm">
              {Icon && <Icon aria-hidden="true" className="pointer-events-none absolute top-3 right-3 size-28 stroke-1 text-muted-foreground/10" />}
              <CardHeader>
                {Icon && <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground"><Icon className="size-6" aria-hidden="true" /></div>}
                <CardTitle className="text-xl">{principle.title}</CardTitle>
                <CardDescription>{module?.description ?? "Manage this principle's learning path."}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {draft && <Button variant="outline" render={<Link to={`/admin/learning-materials/pour/drafts/${draft.id}`} />}>Edit latest draft</Button>}
                  {published && !draft && <Button disabled={createDraft.isPending} onClick={() => createDraft.mutate({ principleId: principle.id, published: true })}>Edit published module</Button>}
                  {!draft && !published && <Button variant="outline" disabled={createDraft.isPending} onClick={() => createDraft.mutate({ principleId: principle.id, published: false })}>Create module</Button>}
                </div>
                {published && <p className="text-sm text-muted-foreground">{draft ? "Continue editing the existing draft. Students see the current published version until you publish the draft." : "Editing the published module creates a draft. Students see the current version until you publish the changes."}</p>}
                {principle.revisions.filter((revision) => revision.status === "draft").length > 1 && <p role="status" className="text-sm text-muted-foreground">This module has older drafts from before the one-draft limit. Review them before removing any.</p>}
                {principle.revisions.length === 0 ? (
                  <p className="text-muted-foreground">No revisions have been created.</p>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {principle.revisions.map((revision) => (
                      <li key={revision.id} className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p>{revision.status === "draft" ? <Link className="underline" to={`/admin/learning-materials/pour/drafts/${revision.id}`}>{revision.title}</Link> : revision.title} · Version {revision.version}</p>
                          {revision.description && <p className="text-sm text-muted-foreground">{revision.description}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={revision.status === "published" ? "default" : "secondary"}>{revision.status}</Badge>
                          {revision.status === "draft" && <Button type="button" variant="outline" disabled={deleteDraft.isPending} aria-label={`Delete ${revision.title}, version ${revision.version}`} onClick={() => {
                            if (window.confirm(`Delete “${revision.title}” version ${revision.version}? This permanently removes its draft lessons and assessments.`)) deleteDraft.mutate(revision.id)
                          }}>{deleteDraft.isPending && deleteDraft.variables === revision.id ? "Deleting…" : "Delete draft"}</Button>}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          )})}
        </div>
      )}
    </section>
  )
}
