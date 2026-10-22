import { useEffect, useState } from "react"
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
  Check,
  Code2,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FolderArchive,
  FolderOpen,
  Globe,
  ImageIcon,
  Loader2,
  Puzzle,
  Sparkles,
  Terminal,
} from "lucide-react"
import { SiBrave, SiFirefox, SiGooglechrome, SiOpera } from "react-icons/si"
import {
  useCreateExtensionScan,
  useExtensionScan,
} from "@/services/tanstack/materials"
import { WEBLLM_MODELS } from "@/services/webLLM"

function StepImagePlaceholder({
  title,
  subtitle,
  icon: Icon = ImageIcon,
}: {
  title: string
  subtitle: string
  icon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-dashed border-border/80 bg-muted/20 transition-colors hover:border-border hover:bg-muted/30">
      {/* Mock browser header bar */}
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-red-500/70" />
          <div className="size-2 rounded-full bg-yellow-500/70" />
          <div className="size-2 rounded-full bg-green-500/70" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <ImageIcon className="size-3.5" />
          <span className="max-w-40 truncate sm:max-w-xs">{title}</span>
        </div>
        <Badge
          variant="outline"
          className="px-1.5 py-0 text-xs font-semibold tracking-wider uppercase text-muted-foreground"
        >
          Placeholder
        </Badge>
      </div>

      {/* Main mockup canvas */}
      <div className="flex min-h-48 flex-col items-center justify-center p-6 text-center sm:min-h-56 sm:p-8">
        <div className="mb-3 flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/90 text-muted-foreground shadow-xs transition-transform group-hover:scale-105 sm:size-14">
          <Icon className="size-6 sm:size-7" />
        </div>
        <p className="text-xs font-bold text-foreground sm:text-sm">
          {title}
        </p>
        <p className="mt-1 max-w-md text-xs text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default function AnalyzerExtension() {
  const navigate = useNavigate()
  const [pairingCode, setPairingCode] = useState<string | null>(null)
  const [isCopied, setIsCopied] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState(
    "Generate a code to begin"
  )
  const [selectedModel, setSelectedModel] = useState<string>(
    WEBLLM_MODELS[2].value
  )

  const supportedBrowsers = [
    { name: "Google Chrome", icon: SiGooglechrome, url: "chrome://extensions" },
    { name: "Microsoft Edge", icon: Globe, url: "edge://extensions" },
    { name: "Brave", icon: SiBrave, url: "brave://extensions" },
    { name: "Opera", icon: SiOpera, url: "opera://extensions" },
    { name: "Firefox", icon: SiFirefox, url: "about:debugging" },
  ]

  const createScanMutation = useCreateExtensionScan()

  const { data: extensionSession } = useExtensionScan(
    pairingCode || undefined,
    { enabled: !!pairingCode }
  )

  useEffect(() => {
    if (!extensionSession) return

    if (extensionSession.status === "completed") {
      setConnectionStatus("Scan received. Opening results...")
      if (extensionSession.scan_type === "llm" && extensionSession.task_batch) {
        navigate("/learner/analyzer", {
          state: {
            taskBatch: extensionSession.task_batch,
            targetUrl: extensionSession.url || "",
            webLLMModel: selectedModel,
          },
        })
        return
      }
      if (extensionSession.result) {
        navigate(`/learner/analyzer/${Date.now()}`, {
          state: {
            result: extensionSession.result,
            scanId: `extension-${Date.now()}`,
          },
        })
        return
      }
      setConnectionStatus(
        "The scan finished without a result. Generate a new code and try again."
      )
      return
    }

    if (extensionSession.status === "failed") {
      setConnectionStatus(
        "The extension scan failed. Generate a new code and try again."
      )
      return
    }

    setConnectionStatus(
      extensionSession.status === "processing"
        ? "Extension is processing the page..."
        : "Waiting for the extension to submit a scan..."
    )
  }, [extensionSession, navigate, selectedModel])

  function handleGenerateCode() {
    createScanMutation.mutate(undefined, {
      onSuccess: (session) => {
        setPairingCode(session.code)
        setConnectionStatus("Waiting for the extension to submit a scan...")
        setIsCopied(false)
        toast.add({
          title: "Pairing Code Generated",
          description: `Code ${session.code} is ready for the extension.`,
        })
      },
      onError: (error) => {
        toast.add({
          title: "Could not generate a pairing code",
          description:
            error instanceof Error ? error.message : "Please try again.",
        })
      },
    })
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

  function handleCopyText(text: string, label: string) {
    navigator.clipboard.writeText(text)
    toast.add({
      title: "Copied to Clipboard",
      description: `${label} (${text}) copied to clipboard.`,
    })
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
            Set up the FrontAccEase browser extension in 5 quick steps to audit
            live websites, inspect DOM accessibility compliance, and run
            on-device WebLLM evaluations.
          </p>
        </div>
      </div>

      {/* Main Vertical Timeline Container */}
      <div className="relative space-y-10 pl-10 sm:pl-14">
        {/* Vertical Line Connector */}
        <div className="absolute top-5 bottom-5 left-4 z-0 w-0.5 bg-border/80 sm:left-5" />

        {/* STEP 1: Install / Download .zip */}
        <div className="relative z-10">
          <div className="absolute top-1 -left-10 flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md sm:-left-14 sm:size-10 sm:text-sm">
            1
          </div>

          <Card className="space-y-5 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-7">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-semibold uppercase">
                  Step 1
                </Badge>
                <h2 className="text-base font-bold text-foreground sm:text-lg">
                  Install the .zip Package
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Download the official FrontAccEase Extension ZIP archive. The
                extension is open-source, fully offline-capable, and uses
                Manifest V3 to securely audit web accessibility without sending
                page data to external servers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
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
                <span>Open in GitHub</span>
                <ExternalLink className="size-3.5" />
              </Button>
            </div>

            {/* Placeholder Image for Step 1 */}
            <StepImagePlaceholder
              title="Download FrontAccEase-Extension.zip"
              subtitle="Screenshot showing download action or GitHub Releases archive asset"
              icon={FolderArchive}
            />
          </Card>
        </div>

        {/* STEP 2: Unzip the downloaded file */}
        <div className="relative z-10">
          <div className="absolute top-1 -left-10 flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md sm:-left-14 sm:size-10 sm:text-sm">
            2
          </div>

          <Card className="space-y-5 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-7">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-semibold uppercase">
                  Step 2
                </Badge>
                <h2 className="text-base font-bold text-foreground sm:text-lg">
                  Unzip the Downloaded File
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Extract the downloaded archive onto your computer (e.g. into your
                Documents or Developer folder). Keep the extracted folder in a
                permanent location because the browser loads the files directly
                from this directory.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
              <div className="space-y-1 rounded-xl border border-border/70 bg-muted/30 p-3.5">
                <span className="font-bold text-foreground">Windows</span>
                <p className="text-muted-foreground">
                  Right-click the ZIP archive and select{" "}
                  <span className="font-semibold text-foreground">Extract All...</span>
                </p>
              </div>
              <div className="space-y-1 rounded-xl border border-border/70 bg-muted/30 p-3.5">
                <span className="font-bold text-foreground">macOS</span>
                <p className="text-muted-foreground">
                  Double-click the ZIP archive to expand it into a regular folder.
                </p>
              </div>
              <div className="space-y-1 rounded-xl border border-border/70 bg-muted/30 p-3.5">
                <span className="font-bold text-foreground">Linux</span>
                <p className="font-mono text-muted-foreground">
                  unzip FrontAccEase-Extension.zip -d FrontAccEase-Extension
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-3.5 text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Verification Check: </span>
              Ensure the unzipped folder contains{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground font-semibold">
                manifest.json
              </code>
              , the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground font-semibold">dist/</code> directory, and extension icon assets.
            </div>

            {/* Placeholder Image for Step 2 */}
            <StepImagePlaceholder
              title="Extracted Extension Directory"
              subtitle="Screenshot showing extracted directory containing manifest.json and extension assets"
              icon={FolderOpen}
            />
          </Card>
        </div>

        {/* STEP 3: Install extension using developer mode load unpacked */}
        <div className="relative z-10">
          <div className="absolute top-1 -left-10 flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md sm:-left-14 sm:size-10 sm:text-sm">
            3
          </div>

          <Card className="space-y-5 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-7">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-semibold uppercase">
                  Step 3
                </Badge>
                <h2 className="text-base font-bold text-foreground sm:text-lg">
                  Install Extension using Developer Mode (Load Unpacked)
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Open your browser&apos;s extension manager, enable Developer
                mode in the top toolbar, click &quot;Load unpacked&quot;, and
                select the folder you extracted in Step 2.
              </p>
            </div>

            {/* Browser shortcuts */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-muted-foreground">
                Browser extension management shortcuts (click to copy)
              </p>
              <div className="flex flex-wrap gap-2">
                {supportedBrowsers.map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => handleCopyText(b.url, b.name)}
                    className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-border hover:bg-muted/60"
                  >
                    <b.icon className="size-3.5 text-muted-foreground" />
                    <span>{b.name}</span>
                    <span className="font-mono text-muted-foreground">
                      ({b.url})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Instructions list */}
            <div className="space-y-1.5 text-xs text-muted-foreground sm:text-sm leading-relaxed">
              <p>
                1. Navigate to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground font-semibold">chrome://extensions</code> (or your browser equivalent).
              </p>
              <p>
                2. Switch the <span className="font-semibold text-foreground">&quot;Developer mode&quot;</span> toggle to ON in the upper-right corner.
              </p>
              <p>
                3. Click the <span className="font-semibold text-foreground">&quot;Load unpacked&quot;</span> button in the upper-left menu.
              </p>
              <p>
                4. Select the extracted folder. The FrontAccEase icon will immediately appear in your extensions list.
              </p>
            </div>

            {/* Placeholder Image for Step 3 */}
            <StepImagePlaceholder
              title="Browser Extensions > Developer Mode & Load Unpacked"
              subtitle="Screenshot showing chrome://extensions with Developer Mode toggled ON and Load Unpacked clicked"
              icon={Puzzle}
            />
          </Card>
        </div>

        {/* STEP 4: Select model and generate pairing code */}
        <div className="relative z-10">
          <div className="absolute top-1 -left-10 flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md sm:-left-14 sm:size-10 sm:text-sm">
            4
          </div>

          <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-50 shadow-lg sm:p-8">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-zinc-700 bg-zinc-900 text-xs font-semibold uppercase text-zinc-300"
                >
                  Step 4
                </Badge>
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Select Model & Generate Pairing Code
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
                Choose your preferred on-device WebLLM model for AI-assisted
                audits, then generate a secure one-time pairing code to link
                the extension to this browser session.
              </p>
            </div>

            {/* Model Selector */}
            <div className="max-w-md space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
                <Cpu className="size-4 text-emerald-400" />
                <span>On-Device WebLLM AI Engine</span>
              </div>
              <Select
                value={selectedModel}
                onValueChange={(val) => val && setSelectedModel(val)}
              >
                <SelectTrigger className="h-10 w-full rounded-xl border-zinc-700 bg-zinc-900 text-xs font-semibold text-zinc-100">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {WEBLLM_MODELS.filter((m) => !!m.value).map((model) => (
                    <SelectItem
                      key={model.value}
                      value={model.value}
                      className="text-xs font-medium"
                    >
                      {model.label}
                      {model.value === WEBLLM_MODELS[2].value
                        ? " (Recommended)"
                        : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-zinc-400">
                Runs locally via WebGPU. Your audited page structure and HTML
                never leave your browser.
              </p>
            </div>

            {/* Code Generator & Status */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-t border-zinc-800/80 pt-6">
              <div className="space-y-2">
                {pairingCode ? (
                  <div className="flex flex-wrap items-center gap-3">
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
                    disabled={createScanMutation.isPending}
                    className="h-11 gap-2 rounded-xl bg-white px-6 text-xs font-bold text-zinc-950 shadow-md hover:bg-zinc-100 sm:text-sm"
                  >
                    {createScanMutation.isPending ? (
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
                  Paste this code into the extension to pair. Valid for your
                  current scan session.
                </p>
              </div>

              {/* Waiting for Connection Indicator */}
              <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-xs text-zinc-300 shrink-0">
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

            {/* Placeholder Image for Step 4 */}
            <StepImagePlaceholder
              title="Pairing Code & Engine Configuration"
              subtitle="Screenshot showing generated pairing code and on-device WebLLM selection"
              icon={Code2}
            />
          </div>
        </div>

        {/* STEP 5: Paste the code in the extension and choose scan mode */}
        <div className="relative z-10">
          <div className="absolute top-1 -left-10 flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-black text-background shadow-md sm:-left-14 sm:size-10 sm:text-sm">
            5
          </div>

          <Card className="space-y-5 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-7">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-semibold uppercase">
                  Step 5
                </Badge>
                <h2 className="text-base font-bold text-foreground sm:text-lg">
                  Paste Code in Extension & Choose Scan Mode
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Open the webpage you wish to audit, click the FrontAccEase
                puzzle piece icon in your browser toolbar, enter your pairing
                code, and pick your evaluation mode.
              </p>
            </div>

            {/* Scan Modes Breakdown */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 rounded-xl border border-border/70 bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-foreground" />
                  <span className="font-bold text-foreground text-xs sm:text-sm">
                    Automated Rule Scan (Fast)
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Instantly checks DOM against WCAG 2.2 Level A/AA criteria
                  using deterministic rule assertions. Best for rapid checks.
                </p>
              </div>

              <div className="space-y-1.5 rounded-xl border border-border/70 bg-muted/30 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-foreground" />
                  <span className="font-bold text-foreground text-xs sm:text-sm">
                    WebLLM AI Multimodal Scan
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Uses the selected on-device AI model to semantically inspect
                  context, text alternatives, form usability, and cognitive flow.
                </p>
              </div>
            </div>

            <div className="space-y-2 rounded-xl border border-border/70 bg-card p-4 text-xs text-muted-foreground sm:text-sm leading-relaxed">
              <p className="font-bold text-foreground">
                What happens when you click &quot;Start Scan&quot;?
              </p>
              <p>
                The extension runs the scan on the active tab and securely
                transfers the structured results to your FrontAccEase session.
                This page will automatically detect the completed scan and
                navigate you to the comprehensive accessibility report!
              </p>
            </div>

            {/* Placeholder Image for Step 5 */}
            <StepImagePlaceholder
              title="Extension Popup: Pairing Code & Scan Mode"
              subtitle="Screenshot showing the extension popup with the pairing code field, scan mode selection, and Start Scan button"
              icon={Terminal}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
