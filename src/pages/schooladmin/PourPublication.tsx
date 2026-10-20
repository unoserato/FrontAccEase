import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/services/axios"

type Validation = { ready: boolean; errors: string[] }

export default function PourPublication({ revisionId }: { revisionId: string }) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const check = useMutation({ mutationFn: async () => (await api.get<Validation>(`/admin/pour/revisions/validation/${revisionId}`)).data })
  const publish = useMutation({
    mutationFn: async () => api.post(`/admin/pour/revisions/publish/${revisionId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pour-curriculum"] })
      navigate("/admin/learning-materials")
    },
  })
  const detail = axios.isAxiosError(publish.error) ? publish.error.response?.data?.detail : undefined
  const publishErrors: string[] = detail && typeof detail === "object" && Array.isArray(detail.errors) ? detail.errors : []
  return (
    <Card>
      <CardHeader><CardTitle>Publication</CardTitle><CardDescription>Save all changes before checking or publishing. Only saved content is included.</CardDescription></CardHeader>
      <CardContent className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" disabled={check.isPending || publish.isPending} onClick={() => check.mutate()}>{check.isPending ? "Checking…" : "Check saved module"}</Button>
          <Button type="button" disabled={!check.data?.ready || check.isPending || publish.isPending} onClick={() => publish.mutate()}>{publish.isPending ? "Publishing…" : "Publish saved module"}</Button>
        </div>
        {check.isError && <p role="alert">Could not check this module. Please try again.</p>}
        {check.data?.ready && <p role="status">The saved module passed validation. Publishing checks it again.</p>}
        {check.data && !check.data.ready && <div role="status"><p>Complete these items before publishing:</p><ul className="list-disc pl-5">{check.data.errors.map((error, index) => <li key={`${index}-${error}`}>{error}</li>)}</ul></div>}
        {publish.isError && <div role="alert"><p>{publishErrors.length ? "The saved module needs changes before it can be published:" : "Could not publish. The draft may have changed; check it again."}</p>{publishErrors.length > 0 && <ul className="list-disc pl-5">{publishErrors.map((error, index) => <li key={`${index}-${error}`}>{error}</li>)}</ul>}</div>}
      </CardContent>
    </Card>
  )
}
