import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import {
  ArrowLeft,
  BookOpen,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Globe,
  Loader2,
} from "lucide-react"
import { SiBrave, SiFirefox, SiGooglechrome, SiOpera } from "react-icons/si"
import { createExtensionScanAPI, getExtensionScanAPI } from "@/services/api/materialsAPI"
import { WEBLLM_MODELS } from "@/services/webLLM"

export default function AnalyzerExtension() {
  const navigate = useNavigate()
  const [pairingCode, setPairingCode] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("Generate a code to begin")
  const [selectedModel, setSelectedModel] = useState("Qwen3-0.6B-q4f16_1-MLC")
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const supportedBrowsers = [
    { name: "Google Chrome", icon: SiGooglechrome },
    { name: "Microsoft Edge", icon: Globe },
    { name: "Firefox", icon: SiFirefox },
    { name: "Brave", icon: SiBrave },
    { name: "Opera", icon: SiOpera },
  ]

  useEffect(() => () => {
    if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current)
  }, [])

  useEffect(() => {
    if (!pairingCode) return
    let cancelled = false

    const pollForSubmittedScan = async () => {
      try {
        const session = await getExtensionScanAPI(pairingCode)
        if (cancelled) return

        if (session.status === "completed") {
          setConnectionStatus("Scan received. Opening results...")
          if (session.scan_type === "llm" && session.task_batch) {
            navigate("/learner/analyzer", {
              state: {
                taskBatch: session.task_batch,
                targetUrl: session.url || "",
                webLLMModel: selectedModel,
              },
            })
            return
          }
          if (session.result) {
            navigate(`/learner/analyzer/${Date.now()}`, {
              state: { result: session.result, scanId: `extension-${Date.now()}` },
            })
            return
          }
          setConnectionStatus("The scan finished without a result. Generate a new code and try again.")
          return
        }

        if (session.status === "failed") {
          setConnectionStatus("The extension scan failed. Generate a new code and try again.")
          return
        }
        setConnectionStatus(session.status === "processing" ? "Extension is processing the page..." : "Waiting for the extension to submit a scan...")
      } catch {
        setConnectionStatus("Could not check the scan yet. Retrying...")
      }

      if (!cancelled) pollTimeoutRef.current = setTimeout(pollForSubmittedScan, 2000)
    }

    void pollForSubmittedScan()
    return () => {
      cancelled = true
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current)
    }
  }, [navigate, pairingCode, selectedModel])

  async function handleGenerateCode() {
    setIsGenerating(true)
    try {
      const session = await createExtensionScanAPI()
      setPairingCode(session.code)
      setConnectionStatus("Waiting for the extension to submit a scan...")
      setIsGenerating(false)
      setIsCopied(false)
      toast.add({
        title: "Pairing Code Generated",
        description: `Code ${session.code} is ready for the extension.`,
      })
    } catch (error) {
      setIsGenerating(false)
      toast.add({
        title: "Could not generate a pairing code",
        description: error instanceof Error ? error.message : "Please try again.",
      })
    }
  }

  function handleCopyCode() {
    if (!pairingCode) return
    navigator.clipboard.writeText(pairingCode)
    setIsCopied(true)
    toast.add({
      title: "Copied to Clipboard",
      description: `Pairing code ${pairingCode} copied. Paste into extension.`,
    })
    setTimeout(() => setIsCopied(false), 2000)
  }

  function handleDownloadZip() {
    toast.add({
      title: "Downloading Extension",
      description: "FrontAccEase-Extension.zip download started.",
    })
  }

  return (
    <div className="mx-auto flex h-fit min-h-full w-full max-w-5xl flex-col justify-center gap-8 px-4 py-8 sm:px-6 sm:py-12 md:px-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="size-8 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Analyzer Web Extension Guide
            </h1>
          </div>
          <p className="max-w-2xl pl-10 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Getting started takes just a few clicks. Follow this guide to
            install the extension, authenticate your session, and load your
            preferred WebLLM engine for on-device scanning.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 rounded-xl text-xs font-semibold"
            onClick={() =>
              window.open("https://github.com", "_blank", "noopener,noreferrer")
            }
          >
            <BookOpen className="size-3.5" />
            <span>Docs</span>
          </Button>
        </div>
      </div>

      {/* Main Vertical Timeline Container */}
      <div className="relative space-y-8 pl-10 sm:pl-14">
        {/* Vertical Line Connector */}
        <div className="absolute top-5 bottom-5 left-4 z-0 w-0.5 bg-border/80 sm:left-5" />

        {/* STEP 1: Download .zip extension */}
        <div className="relative z-10">
          <div className="absolute top-1 -left-10 flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md sm:-left-14 sm:size-10 sm:text-sm">
            1
          </div>

          <Card className="space-y-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-foreground sm:text-lg">
                Download the .zip extension
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Download the extension ZIP file directly from our official
                GitHub repository. The project is fully open-source to ensure
                complete transparency and code integrity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                onClick={handleDownloadZip}
                className="h-10 gap-2 rounded-xl px-5 text-xs font-bold sm:text-sm"
              >
                <span>Download .zip</span>
                <Download className="size-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    "https://github.com",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="h-10 gap-2 rounded-xl px-4 text-xs font-semibold sm:text-sm"
              >
                <span>Open in github</span>
                <ExternalLink className="size-3.5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* STEP 2: Install Extension */}
        <div className="relative z-10">
          <div className="absolute top-1 -left-10 flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md sm:-left-14 sm:size-10 sm:text-sm">
            2
          </div>

          <Card className="space-y-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-foreground sm:text-lg">
                Install Extension
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Navigate to your browser&apos;s extension management page (e.g.,
                chrome://extensions, edge://extensions, or about:debugging for
                Firefox). Enable Developer mode, select the option to load an
                unpacked or temporary extension, and choose your extracted
                folder.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold text-muted-foreground">
                List of supported browsers
              </p>

              <div className="flex flex-wrap gap-2">
                {supportedBrowsers.map((b) => (
                  <Badge
                    key={b.name}
                    variant="outline"
                    className="flex items-center gap-1.5 rounded-xl border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-foreground"
                  >
                    <b.icon className="size-3.5 text-muted-foreground" />
                    <span>{b.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* STEP 3: Enter Pairing Code (Dark Hero Banner Card) */}
        <div className="relative z-10">
          <div className="absolute top-1 -left-10 flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md sm:-left-14 sm:size-10 sm:text-sm">
            3
          </div>

          <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-50 shadow-lg sm:p-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Enter Pairing Code
              </h2>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Code Generator & Copy Button */}
              <div className="space-y-2">
                {pairingCode ? (
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 px-5 font-mono text-lg font-black tracking-widest text-emerald-400">
                      {pairingCode}
                    </div>

                    <Button
                      onClick={handleCopyCode}
                      className="h-11 gap-2 rounded-xl bg-white px-4 text-xs font-bold text-zinc-950 hover:bg-zinc-200 sm:text-sm"
                    >
                      {isCopied ? (
                        <>
                          <Check className="size-4 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-4" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={handleGenerateCode}
                      className="h-11 rounded-xl text-xs text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    >
                      Regenerate
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleGenerateCode}
                    disabled={isGenerating}
                    className="h-11 gap-2 rounded-xl bg-white px-6 text-xs font-bold text-zinc-950 shadow-md hover:bg-zinc-100 sm:text-sm"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Pairing Code</span>
                        <Code2 className="size-4" />
                      </>
                    )}
                  </Button>
                )}

                <p className="text-xs text-zinc-400">
                  Paste this server-generated code into the extension. This page will open the result automatically.
                </p>
              </div>

              {/* Waiting for Connection Indicator */}
              <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-xs text-zinc-300">
                <div className="relative flex size-3 items-center justify-center">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="animate-pulse font-mono">...</span>
                  <span>{connectionStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4: Start Scanning */}
        <div className="relative z-10">
          <div className="absolute top-1 -left-10 flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md sm:-left-14 sm:size-10 sm:text-sm">
            4
          </div>

          <Card className="space-y-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-foreground sm:text-lg">
                Start Scanning
              </h2>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Navigate to your target page, launch the extension, choose WebLLM Tasks, and run the audit. This app will evaluate the received tasks with the model below.
              </p>
            </div>

            <div className="max-w-sm space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-muted-foreground">
                WebLLM Browser Model
              </label>
              <Select
                value={selectedModel}
                onValueChange={(val) => val && setSelectedModel(val)}
              >
                <SelectTrigger className="h-10 w-full rounded-xl text-xs font-semibold">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {WEBLLM_MODELS.map((model) => (
                    <SelectItem key={model.value} value={model.value} className="text-xs font-medium">
                      {model.label}{model.value === "Qwen3-0.6B-q4f16_1-MLC" ? " (Default)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
