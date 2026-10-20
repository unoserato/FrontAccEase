import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import PourContent from "@/components/common/PourContent"
import { Model } from "survey-core"
import { Survey } from "survey-react-ui"
import "survey-core/survey-core.min.css"
import { Button } from "@/components/ui/button"
import { api } from "@/services/axios"
import { usePourProgress } from "./PourLearning"

type Result = { id: string; score: number; passed: boolean; attempt_number: number; feedback: { explanations?: Record<string, string>; correct_answers?: Record<string, unknown> } }
type Activity = { id: string; kind: string; title: string; lesson?: { description: string; content: Record<string, unknown>; learning_objectives: string[]; wcag_criteria: string[] }; questions?: Record<string, unknown>; max_attempts?: number | null; attempt_count?: number; scenario?: { prompt: string; choices: { value: string; label: string }[] } }

function Assessment({ activity }: { activity: Activity }) {
  const queryClient = useQueryClient()
  const [submissionKey, setSubmissionKey] = useState(() => crypto.randomUUID())
  const [answers, setAnswers] = useState<Record<string, unknown> | null>(null)
  const results = useQuery({ queryKey: ["learner", "pour-results", activity.id], queryFn: async () => (await api.get<Result[]>(`/learner/pour/activities/results/${activity.id}`)).data })
  const submit = useMutation({ mutationFn: async (data: Record<string, unknown>) => (await api.post<Result>(`/learner/pour/activities/submit/${activity.id}`, { idempotency_key: submissionKey, answers: data })).data, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["learner", "pour-progress"] }); queryClient.invalidateQueries({ queryKey: ["learner", "pour-results", activity.id] }); queryClient.invalidateQueries({ queryKey: ["learner", "pour-activity", activity.id] }) } })
  const survey = useMemo(() => {
    const model = new Model(activity.questions)
    model.onComplete.add((sender) => { const data = sender.data as Record<string, unknown>; setAnswers(data); submit.mutate(data) })
    return model
    // The survey is recreated for each deliberate retry, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity.id, submissionKey])
  const attemptsUsed = results.data?.length ?? activity.attempt_count ?? 0
  const canRetry = !results.isFetching && !results.isError && (activity.max_attempts == null || attemptsUsed < activity.max_attempts)
  return <div className="flex flex-col gap-5">
    {results.isError && <p role="alert">Could not load previous results.</p>}
    {results.data?.length ? <div><h2 className="font-semibold">Previous results</h2><ul className="flex flex-col gap-3">{results.data.map((result) => <li key={result.id}><p>Attempt {result.attempt_number}: {result.score}% · {result.passed ? "Passed" : "Not passed"}</p>{result.feedback?.explanations && <ul className="list-disc pl-5">{Object.entries(result.feedback.explanations).map(([question, explanation]) => <li key={question}>{question}: {explanation} {result.feedback.correct_answers?.[question] !== undefined && <>Correct answer: {JSON.stringify(result.feedback.correct_answers[question])}</>}</li>)}</ul>}</li>)}</ul></div> : null}
    {results.isPending && <p role="status">Loading previous results…</p>}
    {!submit.isSuccess && (canRetry || answers) && <Survey model={survey} />}
    {submit.isPending && <p role="status">Saving your answers…</p>}
    {submit.isError && <div role="alert"><p>Could not submit your answers.</p>{answers && <Button variant="outline" onClick={() => submit.mutate(answers)}>Retry submission</Button>}</div>}
    {submit.isSuccess && <div role="status"><p>Attempt submitted: {submit.data.score}% · {submit.data.passed ? "Passed" : "Not passed"}</p>{submit.data.feedback?.explanations && <ul className="list-disc pl-5">{Object.entries(submit.data.feedback.explanations).map(([question, explanation]) => <li key={question}>{question}: {explanation} {submit.data.feedback.correct_answers?.[question] !== undefined && <>Correct answer: {JSON.stringify(submit.data.feedback.correct_answers[question])}</>}</li>)}</ul>}{canRetry && <Button variant="outline" onClick={() => { setAnswers(null); submit.reset(); setSubmissionKey(crypto.randomUUID()) }}>Try again</Button>}</div>}
    {!canRetry && !submit.isSuccess && !results.isFetching && !results.isError && <p>No attempts remain for this assessment.</p>}
  </div>
}

export default function PourActivity() {
  const { activityId } = useParams()
  return <ActivityPage key={activityId} />
}

function ActivityPage() {
  const { code, activityId } = useParams()
  const queryClient = useQueryClient()
  const [choice, setChoice] = useState("")
  const progress = usePourProgress()
  const query = useQuery({ queryKey: ["learner", "pour-activity", activityId], queryFn: async () => (await api.get<Activity>(`/learner/pour/activities/${activityId}`)).data, enabled: Boolean(activityId) })
  const complete = useMutation({ mutationFn: async () => api.post(`/learner/pour/activities/complete/${activityId}`), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["learner", "pour-progress"] }) })
  const answer = useMutation({ mutationFn: async () => (await api.post<{ correct: boolean; explanation: string }>(`/learner/pour/activities/answer/${activityId}`, { choice })).data, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["learner", "pour-progress"] }) })
  const activity = query.data
  const path = progress.data?.principles.find((principle) => principle.name === code)?.content
  const activityIndex = path?.activities?.findIndex((item) => item.id === activityId) ?? -1
  const nextActivity = activityIndex >= 0 ? path?.activities?.[activityIndex + 1] : undefined
  const isCompleted = path?.completions?.some((completion) => completion.activity_id === activityId) ?? false
  return <section className="p-responsive flex flex-col gap-6"><Link className="underline" to={`/learner/modules/pour/${code}`}>Back to learning path</Link>
    {query.isPending && <p role="status">Loading activity…</p>}{query.isError && <p role="alert">Could not load this activity. Complete earlier activities first and try again.</p>}
    {activity && <><h1 className="text-2xl font-bold">{activity.title}</h1>
      {activity.lesson && <><p>{activity.lesson.description}</p>{activity.lesson.learning_objectives?.length ? <div><h2 className="font-semibold">Learning objectives</h2><ul className="list-disc pl-5">{activity.lesson.learning_objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div> : null}{activity.lesson.wcag_criteria?.length ? <p>WCAG criteria: {activity.lesson.wcag_criteria.join(", ")}</p> : null}<PourContent content={activity.lesson.content} /><div><Button disabled={complete.isPending || complete.isSuccess || isCompleted} onClick={() => complete.mutate()}>{complete.isSuccess || isCompleted ? "Lesson completed" : "Mark lesson complete"}</Button></div>{complete.isError && <p role="alert">Could not save completion. Please try again.</p>}{complete.isSuccess && <p role="status">Lesson completion saved.</p>}</>}
      {activity.questions && <Assessment activity={activity} />}
      {activity.scenario && <><fieldset className="flex flex-col gap-3"><legend className="font-semibold">{activity.scenario.prompt}</legend>{activity.scenario.choices.map((option) => <label key={option.value} className="flex items-center gap-2"><input type="radio" name="scenario" value={option.value} checked={choice === option.value} onChange={() => setChoice(option.value)} />{option.label}</label>)}</fieldset><div><Button disabled={!choice || answer.isPending} onClick={() => answer.mutate()}>Check answer</Button></div>{answer.isError && <p role="alert">Could not check your answer.</p>}{answer.isSuccess && <p role="status">{answer.data.correct ? "Correct." : "Try again."} {answer.data.explanation}</p>}</>}
      {progress.isFetching && <p role="status">Updating your learning progress…</p>}
      {progress.isError && <div role="alert"><p>Could not load your progress to find the next activity.</p><Button variant="outline" onClick={() => progress.refetch()}>Try again</Button></div>}
      {!progress.isFetching && !progress.isError && isCompleted && (nextActivity ? <div><Button render={<Link to={`/learner/modules/pour/${code}/activity/${nextActivity.id}`} />}>Continue to {nextActivity.title}</Button></div> : <div role="status"><p>You have reached the end of this learning path.</p><Link className="underline" to="/learner/modules">View learning modules</Link></div>)}
    </>}
  </section>
}
