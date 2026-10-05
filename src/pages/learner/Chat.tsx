import { useState, useRef, useEffect } from "react"
import type { ChatMessage } from "@/const/materialsProps"
import {
  ArrowUp,
  BotMessageSquare,
  Check,
  Copy,
  SquarePen,
  Code2,
  Terminal,
  Sparkles,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { chatAPI } from "@/services/api/materialsAPI"
import { RichText } from "@/components/learner/RichText"

const MAX_WORDS = 200
const WORD_WARNING_THRESHOLD = 150
const SESSION_STORAGE_KEY = "frontaccease_learner_chat_session"

const STARTER_PROMPTS = [
  {
    title: "Keyboard Focus Trapping",
    criterion: "WCAG 2.1.2",
    prompt:
      "How do I ensure a custom modal dialog traps keyboard focus and releases it on escape (WCAG 2.1.2)?",
    icon: Terminal,
  },
  {
    title: "ARIA Landmark Roles",
    criterion: "WCAG 1.3.1 & 4.1.2",
    prompt:
      "What are the essential ARIA landmark roles and how do I properly structure them in a React layout?",
    icon: Code2,
  },
  {
    title: "Color Contrast Ratio",
    criterion: "WCAG 1.4.3 & 1.4.6",
    prompt:
      "How do I calculate and resolve text color contrast failures to meet both WCAG Level AA and AAA?",
    icon: Sparkles,
  },
  {
    title: "aria-label vs aria-labelledby",
    criterion: "WCAG 4.1.2",
    prompt:
      "What is the difference between aria-label, aria-labelledby, and aria-describedby with code examples?",
    icon: HelpCircle,
  },
]

export default function Chat() {
  // Initialize messages from sessionStorage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (e) {
      console.error("Failed to load chat messages from session:", e)
    }
    return []
  })

  const [input, setInput] = useState("")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isFirstRender = useRef(true)

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0
  const isOverWordLimit = wordCount > MAX_WORDS
  const showWordCount = wordCount >= WORD_WARNING_THRESHOLD
  const canSend = input.trim().length > 0 && !isOverWordLimit
  const isEmpty = messages.length === 0

  // Persist messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages))
    } catch (e) {
      console.error("Failed to save chat messages to session:", e)
    }
  }, [messages])

  // Mutation for sending messages to the chat API
  const { mutate, isPending } = useMutation({
    mutationFn: chatAPI,
    onSuccess: (data: any) => {
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: data.reply },
      ])
    },
    onError: (err: unknown) => {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to connect to Aria AI service."
      const assistantError: ChatMessage = {
        sender: "assistant",
        text: `Error: ${errorMessage}. Please check your connection or try again.`,
      }
      setMessages((prev) => [...prev, assistantError])
    },
  })

  useEffect(() => {
    if (messages.length === 0) return
    const container = messagesContainerRef.current
    if (!container) return

    const behavior: ScrollBehavior = isFirstRender.current
      ? "instant"
      : "smooth"
    isFirstRender.current = false

    const frameId = requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      })
    })

    return () => cancelAnimationFrame(frameId)
  }, [messages, isPending])

  const handleSend = (overrideText?: string) => {
    const textToSend = (overrideText ?? input).trim()
    if (!textToSend || isOverWordLimit || isPending) return

    const userMessage: ChatMessage = {
      sender: "user",
      text: textToSend,
    }

    setMessages((prev) => [...prev, userMessage])
    if (!overrideText) {
      setInput("")
    }

    mutate(textToSend)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClearChat = () => {
    setMessages([])
    isFirstRender.current = true
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY)
    } catch (e) {
      console.error("Failed to clear chat session:", e)
    }
    textareaRef.current?.focus()
  }

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (e) {
      console.error("Failed to copy message:", e)
    }
  }

  const composer = (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSend()
      }}
      className={cn(
        "flex items-end gap-2 rounded-3xl border border-input bg-card p-2 pl-5 shadow-sm transition duration-200",
        "focus-within:border-ring focus-within:shadow-md",
        isOverWordLimit && "border-destructive focus-within:border-destructive"
      )}
    >
      <label htmlFor="chat-textarea" className="sr-only">
        Message Aria (maximum {MAX_WORDS} words)
      </label>
      <textarea
        ref={textareaRef}
        id="chat-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isPending}
        aria-invalid={isOverWordLimit}
        aria-describedby="chat-composer-hint"
        placeholder="Ask Aria about accessibility"
        rows={1}
        className="f-center field-sizing-content max-h-52 min-h-10 flex-1 resize-none bg-transparent py-2 text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
      />
      <div className="flex shrink-0 items-center gap-2 pb-0.5">
        {showWordCount && (
          <span
            className={cn(
              "text-xs tabular-nums",
              isOverWordLimit
                ? "font-medium text-destructive"
                : "text-muted-foreground"
            )}
          >
            {wordCount}/{MAX_WORDS}
            <span className="sr-only"> words</span>
          </span>
        )}
        <Button
          type="submit"
          size="icon-lg"
          disabled={!canSend || isPending}
          aria-label="Send message"
          className="rounded-full"
        >
          <ArrowUp className="size-5" strokeWidth={2.25} aria-hidden="true" />
        </Button>
      </div>
    </form>
  )

  const composerHint = (
    <p
      id="chat-composer-hint"
      className="px-4 text-center text-xs leading-relaxed text-muted-foreground"
    >
      {isOverWordLimit
        ? `Your message is over the ${MAX_WORDS}-word limit. Shorten it to send.`
        : "Aria can make mistakes, so verify against the WCAG spec. This chat is saved only for this browser tab."}
    </p>
  )

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-background">
      {!isEmpty && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClearChat}
          disabled={isPending}
          className="absolute top-3 right-3 z-10 bg-background/80 text-muted-foreground backdrop-blur-sm hover:text-foreground sm:top-4 sm:right-4"
        >
          <SquarePen strokeWidth={1.75} aria-hidden="true" />
          New chat
        </Button>
      )}

      {isEmpty ? (
        /* Empty state: centered greeting with composer, like ChatGPT / Gemini */
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <section
            aria-labelledby="chat-welcome-title"
            className="m-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <h1
                id="chat-welcome-title"
                className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
              >
                How can I help you build accessibly?
              </h1>
              <p className="max-w-md text-base text-pretty text-muted-foreground">
                Ask about WCAG criteria, ARIA patterns, or paste code for a
                review.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {composer}
              {composerHint}
            </div>

            <ul
              aria-label="Suggested questions"
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              {STARTER_PROMPTS.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      onClick={() => handleSend(item.prompt)}
                      disabled={isPending}
                      title={item.prompt}
                      className="group flex h-full w-full items-start gap-3 rounded-2xl border border-border px-4 py-3 text-left transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-99 disabled:opacity-50"
                    >
                      <Icon
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-sm font-medium text-foreground">
                          {item.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.criterion}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      ) : (
        <>
          {/* Conversation */}
          <div
            ref={messagesContainerRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation with Aria"
            className="min-h-0 flex-1 overflow-y-auto"
          >
            <ol className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pt-16 pb-8 sm:px-6">
              {messages.map((msg, i) =>
                msg.sender === "user" ? (
                  <li
                    key={i}
                    className="flex animate-in justify-end duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none"
                  >
                    <span className="sr-only">You said:</span>
                    <p className="max-w-xl rounded-3xl bg-muted px-5 py-2.5 text-base leading-relaxed break-words whitespace-pre-wrap text-foreground">
                      {msg.text}
                    </p>
                  </li>
                ) : (
                  <li
                    key={i}
                    className="group flex animate-in items-start gap-4 duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none"
                  >
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary"
                      aria-hidden="true"
                    >
                      <BotMessageSquare className="size-4" strokeWidth={1.75} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
                      <span className="sr-only">Aria said:</span>
                      <div className="text-base leading-7 wrap-break-word whitespace-pre-wrap text-foreground">
                        <RichText content={msg.text} />
                      </div>
                      <div className="-ml-2 flex items-center opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleCopy(msg.text, i)}
                          aria-label={
                            copiedIndex === i ? "Copied" : "Copy response"
                          }
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {copiedIndex === i ? (
                            <Check strokeWidth={2} aria-hidden="true" />
                          ) : (
                            <Copy strokeWidth={1.75} aria-hidden="true" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </li>
                )
              )}

              {isPending && (
                <li className="flex items-start gap-4" role="status">
                  <div
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary"
                    aria-hidden="true"
                  >
                    <BotMessageSquare
                      className="size-4 motion-safe:animate-pulse"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div
                    className="flex h-8 items-center gap-1.5"
                    aria-hidden="true"
                  >
                    <span className="size-2 rounded-full bg-muted-foreground/70 motion-safe:animate-pulse" />
                    <span className="size-2 rounded-full bg-muted-foreground/70 delay-150 motion-safe:animate-pulse" />
                    <span className="size-2 rounded-full bg-muted-foreground/70 delay-300 motion-safe:animate-pulse" />
                  </div>
                  <span className="sr-only">Aria is writing a reply</span>
                </li>
              )}
            </ol>
          </div>

          {/* Pinned composer */}
          <div className="shrink-0 bg-linear-to-t from-background from-70% to-transparent">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-4 pt-2 pb-4 sm:px-6">
              {composer}
              {composerHint}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
