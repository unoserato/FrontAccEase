import type { PrincipleItem, Result } from "@/const/props/analyzerProps"

export type WebLLMStatus = "Pass" | "Fail" | "Manual Review"

export interface WebLLMTask {
  task_id: string
  target: {
    html?: string
    selector?: string
    parent?: string | null
    context?: { previous?: string; next?: string }
  }
  criterion: {
    id: string
    title: string
    level?: string
    principle?: string
    description?: string
  }
  evaluation_prompt?: string
}

export interface WebLLMTaskBatch {
  tasks: WebLLMTask[]
  system_prompt?: string
}

export interface WebLLMEvaluation {
  taskId: string
  status: WebLLMStatus
  reason: string
}

export interface ExtensionScanSession {
  code: string
  status: "pending" | "processing" | "completed" | "failed" | string
  scan_type?: "fast" | "llm" | string | null
  url?: string | null
  result?: Result | null
  task_batch?: WebLLMTaskBatch | null
  expires_at?: string
}

export const WEBLLM_MODELS = [
  {
    label: "Select a model",
    value: "",
    badge: "",
    description: null,
  },
  {
    label: "Qwen2.5 0.5B Instruct",
    value: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
    badge: "On device",
    description: "Runs the accessibility review privately in this browser.",
  },
  {
    label: "Llama 3.2 1B Instruct",
    value: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    badge: "On device",
    description:
      "A larger browser-local model for detailed accessibility review.",
  },
  {
    label: "Qwen3 0.6B",
    value: "Qwen3-0.6B-q4f16_1-MLC",
    badge: "Default",
    description:
      "The default browser-local model for extension-delivered tasks.",
  },
] as const

export function parseWebLLMResponse(
  rawResponse: string
): Omit<WebLLMEvaluation, "taskId"> {
  const jsonCandidate = rawResponse
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .match(/\{[\s\S]*\}/)?.[0]

  let status: WebLLMStatus = "Manual Review"
  let reason = rawResponse.trim() || "The model returned no evaluation reason."

  if (jsonCandidate) {
    try {
      const parsed = JSON.parse(jsonCandidate) as {
        status?: string
        reason?: string
      }
      reason = parsed.reason?.trim() || reason
      const normalizedStatus = parsed.status?.trim().toLowerCase()
      if (normalizedStatus === "pass") status = "Pass"
      if (normalizedStatus === "fail") status = "Fail"
      if (normalizedStatus === "manual review") status = "Manual Review"
    } catch {
      // An unparseable response is retained as a manual review result.
    }
  }

  if (
    /manual review|requires? (?:a )?manual|cannot (?:be )?determin|unable to determin|needs? (?:further )?review/i.test(
      reason
    )
  ) {
    status = "Manual Review"
  }

  return { status, reason }
}

function normalizedPrinciple(principle?: string): string {
  const value = principle?.trim().toLowerCase()
  if (
    ["perceivable", "operable", "understandable", "robust"].includes(
      value || ""
    )
  ) {
    return value!
  }
  return "robust"
}

export function compileWebLLMResults(
  tasks: WebLLMTask[],
  evaluations: Map<string, WebLLMEvaluation>,
  url: string,
  elapsedTimeSeconds: number
): Result {
  const grouped = new Map<string, PrincipleItem>()
  let passed = 0
  let failed = 0
  let manual = 0

  for (const task of tasks) {
    const evaluation = evaluations.get(task.task_id)
    if (!evaluation) continue

    const key = normalizedPrinciple(task.criterion.principle)
    const name = key.charAt(0).toUpperCase() + key.slice(1)
    const group = grouped.get(key) || {
      name,
      data: { score: 100, issues: [], passed: [], manual_review: [] },
    }
    const item = {
      wcag: task.criterion.id,
      level: task.criterion.level || "A",
      message: evaluation.reason,
      status: evaluation.status,
      element: task.target.html,
      selector: task.target.selector,
    }

    if (evaluation.status === "Fail") {
      failed += 1
      group.data.issues.push({ ...item, severity: "serious", count: 1 })
    } else if (evaluation.status === "Pass") {
      passed += 1
      group.data.passed?.push({ ...item, severity: null })
    } else {
      manual += 1
      group.data.manual_review?.push(item)
    }
    grouped.set(key, group)
  }

  const total = passed + failed + manual
  const overallScore = total ? Math.round((passed / total) * 100) : 100
  const principles = [...grouped.values()].map((group) => {
    const checked =
      group.data.issues.length +
      (group.data.passed?.length || 0) +
      (group.data.manual_review?.length || 0)
    const groupPassed = group.data.passed?.length || 0
    return {
      ...group,
      data: {
        ...group.data,
        score: checked ? Math.round((groupPassed / checked) * 100) : 100,
      },
    }
  })

  return {
    url,
    overall_score: overallScore,
    principles,
    summary: [
      { name: "critical", count: 0 },
      { name: "serious", count: failed },
      { name: "moderate", count: 0 },
      { name: "minor", count: 0 },
      { name: "passed", count: passed },
      { name: "manual_review", count: manual },
    ],
    principle_scores: principles.map((principle) => ({
      principle: principle.name,
      score: principle.data.score,
    })),
    elapsed_time: elapsedTimeSeconds,
  }
}
