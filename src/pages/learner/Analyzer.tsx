import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import type { AnalyzerResultItem, Result } from "@/const/props/analyzerProps"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ArrowRight,
  BugOffIcon,
  Check,
  CheckIcon,
  ChevronDown,
  Copy,
  Cpu,
  Globe,
  History,
  Loader2,
  Radio,
  Search,
  Sparkles,
  WrenchIcon,
} from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import {
  useAnalyzer,
  useAnalyzerLogsByLearner,
  useCreateExtensionScan,
  useExtensionScan,
  useWebLLMTasks,
} from "@/services/tanstack/materials"
import { ScanHistory } from "@/components/learner/ScanHistory"
import { CreateMLCEngine, type MLCEngine } from "@mlc-ai/web-llm"
import {
  compileWebLLMResults,
  parseWebLLMResponse,
  WEBLLM_MODELS,
  type WebLLMEvaluation,
  type WebLLMTaskBatch,
} from "@/services/webLLM"
import copyText from "@/hooks/copy-text"

const steps = [
  { name: "Analyze", icon: Search },
  { name: "Scrutinize", icon: BugOffIcon },
  { name: "Optimize", icon: WrenchIcon },
]

function isValidUrl(input: string): boolean {
  if (!input || typeof input !== "string") return false

  const trimmed = input.trim()
  const urlToTest = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`

  try {
    const parsed = new URL(urlToTest)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false
    }
    const hostname = parsed.hostname
    return /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(hostname)
  } catch {
    return false
  }
}

export default function Analyzer() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

  const [domain, setDomain] = useState("")
  const [openPopover, setOpenPopover] = useState(false)
  const [error, setError] = useState("")

  // WebLLM scanning states
  const [isWebLLMPending, setIsWebLLMPending] = useState(false)
  const [modelProgress, setModelProgress] = useState(0)
  const [modelProgressText, setModelProgressText] = useState("")
  const [currentTask, setCurrentTask] = useState(0)
  const [totalTasks, setTotalTasks] = useState(0)

  // Extension scan states
  const [extensionScanCode, setExtensionScanCode] = useState("------")
  const [extensionScanStatus, setExtensionScanStatus] = useState<
    "idle" | "creating" | "pending" | "processing" | "completed" | "failed"
  >("idle")
  const [extensionModel, setExtensionModel] = useState<any>(WEBLLM_MODELS[2])
  const [copyCode, setCopyCode] = useState(false)

  const engineRef = useRef<{ model: string; engine: MLCEngine } | null>(null)
  const processedExtensionBatch = useRef(false)

  // TanStack Query & Mutations
  const { data: scanHistory } = useAnalyzerLogsByLearner()
  const analyzerMutation = useAnalyzer()
  const webLLMTasksMutation = useWebLLMTasks()
  const createExtensionScanMutation = useCreateExtensionScan()

  // Polling extension scan status with TanStack Query
  const isExtensionPollingActive =
    extensionScanCode !== "------" &&
    (extensionScanStatus === "pending" || extensionScanStatus === "processing")

  const { data: extensionSession, error: extensionQueryError } =
    useExtensionScan(extensionScanCode, { enabled: isExtensionPollingActive })

  const isScanning =
    analyzerMutation.isPending ||
    webLLMTasksMutation.isPending ||
    isWebLLMPending

  async function saveAndOpenResult(data: Result) {
    setError("")
    await queryClient.invalidateQueries({
      queryKey: ["analyzer-logs"],
    })

    const newId = Date.now().toString()
    try {
      sessionStorage.setItem(
        `frontaccease_analyzer_result_${newId}`,
        JSON.stringify(data)
      )
      sessionStorage.setItem(
        "frontaccease_latest_analyzer_result",
        JSON.stringify(data)
      )
    } catch (e) {
      console.error("Failed to save scan result to session storage", e)
    }

    const updatedHistory = queryClient.getQueryData<AnalyzerResultItem[]>([
      "analyzer-logs",
    ])
    const targetId = updatedHistory?.[0]?.id || newId

    navigate(`/learner/analyzer/${targetId}`, {
      state: {
        result: data,
        scanId: targetId,
      },
    })
  }

  async function runWebLLMScan(
    targetUrl: string,
    providedBatch?: WebLLMTaskBatch,
    modelId = extensionModel.value
  ) {
    const startedAt = performance.now()
    setIsWebLLMPending(true)
    setModelProgress(0)
    setModelProgressText("Preparing WebLLM tasks...")
    setCurrentTask(0)
    setTotalTasks(0)
    setError("")

    try {
      const batch =
        providedBatch || (await webLLMTasksMutation.mutateAsync(targetUrl))
      if (!batch.tasks?.length) {
        throw new Error(
          "No WebLLM evaluation tasks were returned for this page."
        )
      }

      setTotalTasks(batch.tasks.length)
      let engine = engineRef.current?.engine
      if (!engine || engineRef.current?.model !== modelId) {
        engine = await CreateMLCEngine(modelId, {
          initProgressCallback: (progress) => {
            setModelProgress(Math.round((progress.progress || 0) * 100))
            setModelProgressText(
              progress.text || "Loading WebLLM browser model..."
            )
          },
        })
        engineRef.current = { model: modelId, engine }
      }

      setModelProgress(100)
      setModelProgressText("Model ready. Evaluating accessibility tasks...")
      const evaluations = new Map<string, WebLLMEvaluation>()
      const systemPrompt =
        (batch.system_prompt ? `${batch.system_prompt}\n\n` : "") +
        'Do not generate a thinking process, analysis, or explanation before answering. Respond only with JSON: {"status":"Pass" | "Fail" | "Manual Review","reason":"..."}. Keep reason concise. Use Manual Review only when the supplied HTML and context are insufficient. Never return Pass with a reason that asks for manual review.'

      for (let index = 0; index < batch.tasks.length; index += 1) {
        const task = batch.tasks[index]
        setCurrentTask(index + 1)
        try {
          const completion = await engine.chat.completions.create({
            messages: [
              { role: "system", content: systemPrompt },
              {
                role: "user",
                content:
                  task.evaluation_prompt ||
                  `Evaluate this HTML for WCAG ${task.criterion.id}:\n\`\`\`html\n${task.target.html || ""}\n\`\`\``,
              },
            ],
            temperature: 0.1,
            ...(modelId.startsWith("Qwen3-")
              ? { extra_body: { enable_thinking: false } }
              : {}),
          })
          const rawResponse = completion.choices[0]?.message?.content || ""
          evaluations.set(task.task_id, {
            taskId: task.task_id,
            ...parseWebLLMResponse(rawResponse),
          })
        } catch (taskError) {
          evaluations.set(task.task_id, {
            taskId: task.task_id,
            status: "Manual Review",
            reason: `WebLLM could not evaluate this task: ${taskError instanceof Error ? taskError.message : String(taskError)}`,
          })
        }
      }

      const compiled = compileWebLLMResults(
        batch.tasks,
        evaluations,
        targetUrl,
        (performance.now() - startedAt) / 1000
      )
      await saveAndOpenResult(compiled)
    } catch (scanError) {
      setError(
        scanError instanceof Error
          ? scanError.message
          : "WebLLM scan failed. Please try again."
      )
    } finally {
      setIsWebLLMPending(false)
    }
  }

  // Handle incoming tasks passed from AnalyzerExtension page
  useEffect(() => {
    const state = location.state as {
      taskBatch?: WebLLMTaskBatch
      targetUrl?: string
      webLLMModel?: any
    } | null
    if (
      !state?.taskBatch ||
      !state.targetUrl ||
      processedExtensionBatch.current
    ) {
      return
    }
    processedExtensionBatch.current = true
    void runWebLLMScan(
      state.targetUrl,
      state.taskBatch,
      state.webLLMModel || WEBLLM_MODELS[2].value
    )
  }, [location.state])

  // React to extension polling updates from TanStack Query
  useEffect(() => {
    if (!extensionSession) return

    if (extensionSession.status === "completed") {
      setExtensionScanStatus("completed")
      if (extensionSession.scan_type === "llm" && extensionSession.task_batch) {
        void runWebLLMScan(
          extensionSession.url || "",
          extensionSession.task_batch,
          extensionModel.value
        )
        return
      }
      if (extensionSession.result) {
        void saveAndOpenResult(extensionSession.result)
        return
      }
      setError(
        "The extension scan completed without a report. Generate a new code and try again."
      )
      return
    }

    if (extensionSession.status === "failed") {
      setExtensionScanStatus("failed")
      setError("The extension scan failed. Generate a new code and try again.")
      return
    }

    if (extensionSession.status === "processing") {
      setExtensionScanStatus("processing")
    }
  }, [extensionSession, extensionModel])

  // Handle polling errors
  useEffect(() => {
    if (extensionQueryError) {
      setExtensionScanStatus("failed")
      setError(
        extensionQueryError instanceof Error
          ? extensionQueryError.message
          : "Could not retrieve the extension scan."
      )
    }
  }, [extensionQueryError])

  function handleCreateExtensionScan() {
    setError("")
    setExtensionScanStatus("creating")
    createExtensionScanMutation.mutate(undefined, {
      onSuccess: (session) => {
        setExtensionScanCode(session.code)
        setExtensionScanStatus("pending")
      },
      onError: (createError) => {
        setExtensionScanStatus("failed")
        setError(
          createError instanceof Error
            ? createError.message
            : "Could not create an extension scan code."
        )
      },
    })
  }

  function handleSubmit(type: string) {
    if (!extensionModel) {
      setError("Please select a scanner model.")
      return
    }
    if (!isValidUrl(domain)) {
      setError("Please enter a valid domain or URL (e.g. attendex.online).")
      return
    }

    const cleanInput = domain.trim()
    const fullUrl = /^https?:\/\//i.test(cleanInput)
      ? cleanInput
      : `https://${cleanInput}`

    setError("")
    if (type === "server") {
      analyzerMutation.mutate(fullUrl, {
        onSuccess: (data: Result) => {
          void saveAndOpenResult(data)
        },
        onError: (err: unknown) => {
          const msg =
            err instanceof Error
              ? err.message
              : "Failed to analyze URL. Please check the domain and try again."
          setError(msg)
        },
      })
      return
    }

    void runWebLLMScan(fullUrl)
  }

  const firstStep = steps[0]

  return (
    <div className="mx-auto flex h-fit min-h-full w-full max-w-5xl flex-col justify-center gap-8 px-4 py-8 sm:px-6 sm:py-12 md:gap-12 md:px-8">
      {/* Top Process Cycle Diagram */}
      <div className="relative flex w-full flex-col items-center gap-10 sm:gap-14">
        <svg
          className="pointer-events-none absolute inset-0 mx-auto h-full w-3/4 text-muted-foreground/30 sm:w-1/2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path
                d="M 0 0 L 10 5 L 0 10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </marker>
          </defs>

          {/* Analyze -> Scrutinize */}
          <line x1="38%" y1="35%" x2="22%" y2="60%" markerEnd="url(#arrow)" />

          {/* Scrutinize -> Optimize */}
          <line x1="32%" y1="85%" x2="68%" y2="85%" markerEnd="url(#arrow)" />

          {/* Optimize -> Analyze */}
          <line x1="78%" y1="60%" x2="62%" y2="35%" markerEnd="url(#arrow)" />
        </svg>

        <Card
          key={firstStep.name}
          className="z-10 flex w-24 items-center justify-center shadow-xs sm:w-28"
        >
          <CardContent className="flex flex-col items-center gap-2 p-4 text-xs font-semibold sm:text-sm">
            <div className="rounded-full bg-foreground p-2.5 text-background shadow-xs">
              <firstStep.icon className="size-4 sm:size-5" />
            </div>
            <span>{firstStep.name}</span>
          </CardContent>
        </Card>

        <div className="z-10 flex gap-12 sm:gap-28 md:gap-44">
          {steps.slice(1, 3).map((step) => (
            <Card
              key={step.name}
              className="flex w-24 items-center justify-center shadow-xs sm:w-28"
            >
              <CardContent className="flex flex-col items-center gap-2 p-4 text-xs font-semibold sm:text-sm">
                <div className="rounded-full bg-foreground p-2.5 text-background shadow-xs">
                  <step.icon className="size-4 sm:size-5" />
                </div>
                <span>{step.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <Button
          onClick={() => {
            document.getElementById("analyzer-history")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }}
          size={"xs"}
          variant={"secondary"}
        >
          <History />
          History
        </Button>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Let's Analyze your Page
        </h1>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
          Audit any public URL for WCAG 2.2 &amp; 2.2 Level AA/AAA compliance,
          DOM semantic hierarchy, contrast ratios, and screen reader readiness.
        </p>
      </div>

      {/* Main Responsive URL Analyzer Input Box */}
      <div className="mx-auto w-full max-w-3xl">
        <Field className="w-full">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/80 bg-card p-2.5 shadow-md sm:p-3 md:flex-row md:items-center">
            {/* Input Box with Fixed https:// Prefix */}
            <div className="relative flex flex-1 items-center overflow-hidden rounded-xl border border-input/80 bg-muted/20 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <span className="flex h-11 shrink-0 items-center border-r border-border/60 bg-muted/60 px-3.5 font-mono text-xs font-bold text-muted-foreground select-none sm:text-sm">
                <Globe className="mr-1.5 size-3.5 text-muted-foreground/70" />
                https://
              </span>
              <input
                type="text"
                disabled={isScanning}
                placeholder="attendex.online"
                value={domain}
                onChange={(e) => {
                  let val = e.target.value
                  if (val.startsWith("https://")) val = val.slice(8)
                  else if (val.startsWith("http://")) val = val.slice(7)
                  setDomain(val)
                  if (error) setError("")
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isScanning) handleSubmit("server")
                }}
                className="h-11 w-full bg-transparent px-3 text-xs font-semibold text-foreground outline-none placeholder:text-muted-foreground/50 disabled:opacity-50 sm:text-sm"
                aria-invalid={!!error}
                aria-label="URL to inspect for WCAG compliance"
              />
            </div>

            {/* Controls Row: Model Popover & Scan Button */}
            <div className="flex items-center gap-2">
              {/* Scan Button with Live Mutation State */}
              <Button
                size="lg"
                onClick={() => handleSubmit("server")}
                disabled={isScanning || !domain.trim()}
                className="h-11 shrink-0 rounded-xl px-5 text-xs font-bold sm:text-sm"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="mr-1.5 size-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Scan</span>
                    <ArrowRight className="ml-1 size-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress / Status indicator */}
          {isScanning && (
            <div className="mt-2.5 flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-2 text-xs font-medium text-foreground">
              <Sparkles className="size-4 animate-pulse text-primary" />
              <span>
                {isWebLLMPending
                  ? modelProgressText ||
                    `Processing task ${currentTask} of ${totalTasks}...`
                  : `Evaluating WCAG 2.2 Level AA & AAA rules on “${domain}”...`}
              </span>
            </div>
          )}

          {isWebLLMPending && totalTasks > 0 && (
            <div className="mt-2.5 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between font-medium">
                <span>
                  {currentTask
                    ? `Processing task ${currentTask} of ${totalTasks}`
                    : "Loading browser model"}
                </span>
                <span>{modelProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{
                    width: `${currentTask ? Math.round((currentTask / totalTasks) * 100) : modelProgress}%`,
                  }}
                />
              </div>
            </div>
          )}

          {error && (
            <FieldError className="mt-2 text-xs font-semibold">
              {error}
            </FieldError>
          )}
        </Field>
      </div>

      {/* Browser Extension Scan Card */}
      <Card className="mx-auto w-full max-w-3xl border-primary/20 bg-card shadow-xs">
        <CardContent className="space-y-4 p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <Radio className="size-5 text-primary" />
                Browser Extension Scan
              </h2>
              <p className="text-xs text-muted-foreground">
                Generate a code, enter it in the FrontAccEase extension, then
                keep this page open while it sends the scan.
              </p>
            </div>
            <Badge
              variant={
                extensionScanStatus === "failed"
                  ? "destructive"
                  : extensionScanStatus === "completed"
                    ? "default"
                    : "outline"
              }
              className="w-fit font-mono text-xs uppercase"
            >
              {extensionScanStatus === "idle"
                ? "Ready"
                : extensionScanStatus.replace("_", " ")}
            </Badge>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-md border bg-muted/30 px-4 py-2 font-mono text-2xl font-bold tracking-widest text-foreground">
              {extensionScanCode}
            </div>

            <Button
              type="button"
              disabled={
                createExtensionScanMutation.isPending ||
                extensionScanStatus === "processing"
              }
              onClick={() => {
                if (extensionScanCode === "------") {
                  handleCreateExtensionScan()
                } else {
                  copyText({
                    textToCopy: extensionScanCode,
                    setCopied(value) {
                      setCopyCode(value)
                    },
                  })
                }
              }}
            >
              {createExtensionScanMutation.isPending ? (
                <>
                  <Loader2 className="mr-1.5 size-4 animate-spin" />
                  <span>Generating code…</span>
                </>
              ) : extensionScanCode !== "------" ? (
                <>
                  {!copyCode ? (
                    <Copy className="mr-1.5 size-4" />
                  ) : (
                    <CheckIcon className="mr-1.5 size-4 text-emerald-500" />
                  )}
                  <span>{copyCode ? "Copied code" : "Copy code"}</span>
                </>
              ) : (
                "Generate scan code"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/learner/analyzer/extension")}
            >
              Extension setup guide
            </Button>

            {extensionScanCode !== "------" &&
              extensionScanStatus === "pending" && (
                <p className="text-xs text-muted-foreground">
                  Enter this code in the extension, then choose Fast Scan or Use
                  LLM.
                </p>
              )}
            {extensionScanStatus === "processing" && (
              <p className="text-xs text-muted-foreground">
                The extension submitted the page. Preparing the report…
              </p>
            )}
            {extensionScanStatus === "completed" && (
              <p className="text-xs text-emerald-600">
                Scan received. Opening the report…
              </p>
            )}
          </div>

          <div className="flex flex-col justify-between gap-2 border-t border-border/60 pt-4 sm:flex-row sm:items-center">
            <Label
              htmlFor="extension-webllm-model"
              className="text-xs font-semibold text-muted-foreground"
            >
              WebLLM model for extension tasks
            </Label>
            {/* Popover Model Selector */}
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    disabled={isScanning}
                    className="h-11 flex-1 justify-between gap-2 rounded-xl border-input/80 px-3.5 text-xs font-semibold sm:flex-none sm:text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Cpu className="size-4 shrink-0 text-primary" />
                      <span className="truncate">{extensionModel.label}</span>
                    </div>
                    <ChevronDown className="size-3.5 shrink-0 opacity-60" />
                  </Button>
                }
              />

              <PopoverContent
                align="end"
                sideOffset={6}
                className="w-72 rounded-2xl border border-border/80 bg-popover p-3 shadow-xl sm:w-80"
              >
                <PopoverHeader className="mb-2 border-b border-border/40 pb-2">
                  <PopoverTitle className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Select Scanner Model
                  </PopoverTitle>
                </PopoverHeader>

                <div className="space-y-1.5">
                  {WEBLLM_MODELS.map((m) => {
                    const isSelected = extensionModel.value === m.value
                    return (
                      <button
                        key={m.value}
                        type="button"
                        onClick={() => {
                          setExtensionModel(m)
                          setOpenPopover(false)
                          if (error) setError("")
                        }}
                        className={`flex w-full items-start justify-between gap-3 rounded-xl p-2.5 text-left transition-all ${
                          isSelected
                            ? "border border-primary/30 bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        }`}
                      >
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-foreground">
                              {m.label}
                            </span>
                            {m.badge && (
                              <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-bold text-muted-foreground">
                                {m.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {m.description}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Scan History Section */}
      <div
        className="mx-auto w-full max-w-4xl space-y-4 pt-6"
        id="analyzer-history"
      >
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <History className="size-5 text-primary" />
            <h2 className="text-base font-bold text-foreground sm:text-lg">
              Recent Audits &amp; History
            </h2>
          </div>
          <span className="text-xs font-bold text-muted-foreground">
            {scanHistory.length} Scans Recorded
          </span>
        </div>

        {scanHistory.length > 0 ? (
          <div className="divide-y divide-border/40 overflow-hidden rounded-2xl border border-border/60 bg-muted/10">
            <ScanHistory scanHistory={scanHistory} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
            No previous audit scans found.
          </div>
        )}
      </div>
    </div>
  )
}
