import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  ArrowRight,
  BugOffIcon,
  Puzzle,
  Search,
  WrenchIcon,
} from "lucide-react"
import { useState } from "react"

const steps = [
  { name: "Analyze", icon: Search },
  { name: "Scrutinize", icon: BugOffIcon },
  { name: "Optimize", icon: WrenchIcon },
]

const models = [
  { label: "qwen 2.5 0.6b", value: "qwenV2.5P0.6b" },
  { label: "Gemini 3.5 Flash", value: "GeminiV3.5Flas" },
]

export default function Analyzer() {
  const [url, setUrl] = useState("")
  const [model, setModel] = useState("")
  const [error, setError] = useState("")

  function handleSubmit() {
    if (!model) {
      setError("Please select a model")
      return
    }
    if (
      !url ||
      !["https://", "http://"].some((prefix) => url.startsWith(prefix))
    ) {
      setError("Please enter a valid url")
      return
    }

    alert(`Scanning ${url} using ${model}`)
  }

  const firstStep = steps[0]
  const isMobile = useIsMobile()
  return (
    <div className="mx-auto flex h-fit min-h-full w-full max-w-7xl flex-col justify-center gap-6 px-8 py-12">
      <div className="relative flex w-full flex-col items-center gap-16">
        <svg
          className="pointer-events-none absolute inset-0 mx-auto h-full w-1/2 text-muted-foreground/40"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        >
          <defs>
            {/* Defines the arrowhead shape once to reuse on all lines */}
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

          {/* Analyze -> Scrutinize (Top to Bottom-Left) */}
          <line x1="38%" y1="35%" x2="22%" y2="60%" markerEnd="url(#arrow)" />

          {/* Scrutinize -> Optimize (Left to Right) */}
          <line x1="32%" y1="85%" x2="68%" y2="85%" markerEnd="url(#arrow)" />

          {/* Optimize -> Analyze (Bottom-Right to Top) */}
          <line x1="78%" y1="60%" x2="62%" y2="35%" markerEnd="url(#arrow)" />
        </svg>
        <Card
          key={firstStep.name}
          className="flex w-20 items-center justify-center"
        >
          <CardContent className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-foreground p-2 text-background">
              <firstStep.icon />
            </div>
            {firstStep.name}
          </CardContent>
        </Card>
        <div className="flex gap-20 md:gap-60">
          {steps.slice(1, 3).map((step) => (
            <Card
              key={step.name}
              className="flex w-20 items-center justify-center"
            >
              <CardContent className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-foreground p-2 text-background">
                  <step.icon />
                </div>
                {step.name}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-5xl font-bold">Let's Analyze your Page</h1>
        <p className="">
          Audit any public URL for WCAG 2.1 AA compliance, including DOM
          hierarchy, contrast ratios, and keyboard navigation.
        </p>
      </div>
      <div className="flex w-full items-center justify-center">
        <Field className="mx-auto h-fit w-full max-w-4xl">
          <InputGroup className="h-12 w-full">
            <InputGroupInput
              placeholder="e.g., https://attendex.online"
              onChange={(e) => {
                setUrl(e.target.value)
                if (error) setError("")
              }}
              required
              type="text"
              aria-invalid={!!error}
            />
            <InputGroupAddon
              align={isMobile ? "block-end" : "inline-end"}
              className="justify-between"
            >
              <Select
                defaultValue={"qwenV2.5P0.6b"}
                items={models}
                onValueChange={(value) => {
                  setModel(String(value))
                  if (error) setError("")
                }}
              >
                <SelectTrigger className={"text-xs"}>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Scanner Models</SelectLabel>
                    {models.map((model) => (
                      <SelectItem key={model.label} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button onClick={handleSubmit}>
                Scan
                <ArrowRight />
              </Button>
            </InputGroupAddon>
          </InputGroup>

          {/* Render the error message here */}
          {error && <FieldError>{error}</FieldError>}
        </Field>
      </div>

      <div className="mx-auto w-full max-w-4xl space-y-2">
        <div className="flex items-center gap-4">
          <div className="h-0.5 w-full bg-muted-foreground/20" />
          <p>or</p>
          <div className="h-0.5 w-full bg-muted-foreground/20" />
        </div>
        <div className="mx-auto w-fit">
          <Button>
            <Puzzle />
            Use Analyzer Web Extension
          </Button>
        </div>
      </div>
    </div>
  )
}
