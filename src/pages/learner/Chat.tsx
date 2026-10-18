import { useState, useRef, useEffect, useCallback } from "react"
import { useLocation } from "react-router-dom"
import type { ChatMessage } from "@/const/materialsProps"
import {
  ArrowDown,
  ArrowUp,
  BotMessageSquare,
  Check,
  Copy,
  SquarePen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useMutation } from "@tanstack/react-query"
import { chatAPI } from "@/services/api/materialsAPI"
import { RichText } from "@/components/learner/RichText"
import copyText from "@/hooks/copy-text"

const MAX_WORDS = 200
const WORD_WARNING_THRESHOLD = 150
const SESSION_STORAGE_KEY = "frontaccease_learner_chat_session"

const STARTER_PROMPTS = [
  {
    title: "Keyboard Focus Trapping",
    criterion: "WCAG 2.1.2",
    description:
      "Manage keyboard focus in modal dialogs, including Escape behavior.",
    prompt:
      "How do I ensure a custom modal dialog traps keyboard focus and releases it on escape (WCAG 2.1.2)?",
  },
  {
    title: "ARIA Landmark Roles",
    criterion: "WCAG 1.3.1 · 4.1.2",
    description:
      "Structure a React layout with accessible landmarks and semantic regions.",
    prompt:
      "What are the essential ARIA landmark roles and how do I properly structure them in a React layout?",
  },
  {
    title: "Color Contrast Ratio",
    criterion: "WCAG 1.4.3 · 1.4.6",
    description:
      "Identify contrast failures and meet WCAG AA and AAA requirements.",
    prompt:
      "How do I calculate and resolve text color contrast failures to meet both WCAG Level AA and AAA?",
  },
  {
    title: "aria-label vs aria-labelledby",
    criterion: "WCAG 4.1.2",
    description:
      "Understand accessible names and descriptions with practical code examples.",
    prompt:
      "What is the difference between aria-label, aria-labelledby, and aria-describedby with code examples?",
  },
]

export default function Chat() {
  const location = useLocation()
  const initialPromptProcessed = useRef(false)

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
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [showScrollBottom, setShowScrollBottom] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isFirstRender = useRef(true)

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0
  const isOverWordLimit = wordCount > MAX_WORDS
  const showWordCount = wordCount >= WORD_WARNING_THRESHOLD
  const canSend = input.trim().length > 0 && !isOverWordLimit
  const isEmpty = messages.length === 0

  // changes one time
  useEffect(() => {
    document.title = "Aria Chat | FrontAccEase"
  }, [])

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
    onSuccess: (data: { reply: string }) => {
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

  const handleSend = useCallback(
    (overrideText?: string) => {
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
    },
    [isPending, mutate, input, isOverWordLimit]
  )

  useEffect(() => {
    const prompt = (location.state as { prompt?: string } | null)?.prompt
    if (prompt && !initialPromptProcessed.current) {
      initialPromptProcessed.current = true
      window.history.replaceState({}, document.title)
      handleSend(prompt)
    }
  }, [location.state, handleSend])

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

  const handleCopy = useCallback((text: string, key: string) => {
    setCopiedKey(key)
    copyText({
      textToCopy: text,
      timeout: 2000,
      setCopied: (value) => {
        if (!value) {
          setCopiedKey(null)
        }
      },
    })
  }, [])

  const handleContainerScroll = () => {
    const container = messagesContainerRef.current
    if (!container) return
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight
    setShowScrollBottom(distanceFromBottom > 120)
  }

  const scrollToBottom = () => {
    const container = messagesContainerRef.current
    if (!container) return
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    })
  }

  const composer = (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSend()
      }}
      className={cn(
        "flex items-end gap-2 rounded-3xl border border-input bg-card p-2 pl-5 shadow-xs transition duration-200",
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
        placeholder="Ask Aria about accessibility..."
        rows={1}
        className="field-sizing-content max-h-52 min-h-10 flex-1 resize-none bg-transparent py-2 text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
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
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="submit"
                size="icon-lg"
                disabled={!canSend || isPending}
                aria-label="Send message"
                className="cursor-pointer rounded-full disabled:cursor-not-allowed"
              >
                <ArrowUp
                  className="size-5"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
              </Button>
            }
          />
          <TooltipContent side="top">
            {isOverWordLimit
              ? "Shorten message to send"
              : !canSend
                ? "Type a message to send"
                : "Send message (Enter)"}
          </TooltipContent>
        </Tooltip>
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
        <div className="absolute top-3 right-3 z-10 sm:top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearChat}
                  disabled={isPending}
                  className="cursor-pointer gap-1.5 rounded-full border-border/80 bg-background/90 text-xs font-medium text-muted-foreground shadow-2xs backdrop-blur-sm hover:border-primary/40 hover:text-foreground"
                >
                  <SquarePen
                    className="size-3.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>New chat</span>
                </Button>
              }
            />
            <TooltipContent side="left">
              Start a fresh conversation
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {isEmpty ? (
        /* Empty state: centered greeting with composer, no header */
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <section
            aria-labelledby="chat-welcome-title"
            className="m-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-2xs">
                <BotMessageSquare className="size-6" strokeWidth={1.75} />
              </div>
              <h1
                id="chat-welcome-title"
                className="font-heading text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl"
              >
                How can I help you build accessibly?
              </h1>
              <p className="max-w-md text-sm text-pretty text-muted-foreground sm:text-base">
                Ask about WCAG criteria, ARIA design patterns, or paste code for
                an accessibility review.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {composer}
              {composerHint}
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {STARTER_PROMPTS.map((item) => (
                <li key={item.title} className="min-w-0">
                  <button
                    type="button"
                    onClick={() => handleSend(item.prompt)}
                    disabled={isPending}
                    className="group flex h-full w-full flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.criterion}
                    </span>

                    <div className="flex flex-1 flex-col items-start gap-1.5">
                      <h3 className="text-sm leading-snug font-semibold text-foreground transition-colors group-hover:text-primary">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <>
          {/* Conversation list */}
          <div
            ref={messagesContainerRef}
            onScroll={handleContainerScroll}
            role="log"
            aria-live="polite"
            aria-label="Conversation with Aria"
            className="min-h-0 flex-1 overflow-y-auto"
          >
            <ol className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pt-14 pb-8 sm:px-6">
              {messages.map((msg, i) =>
                msg.sender === "user" ? (
                  <li
                    key={i}
                    className="group flex animate-in justify-end duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none"
                  >
                    <div className="flex max-w-xl items-end gap-1.5 sm:gap-2">
                      {/* Copy button for user messages */}
                      <div className="opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() =>
                                  handleCopy(msg.text, `user-${i}`)
                                }
                                aria-label={
                                  copiedKey === `user-${i}`
                                    ? "Copied message"
                                    : "Copy message"
                                }
                                className="size-7 cursor-pointer rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                              >
                                {copiedKey === `user-${i}` ? (
                                  <Check
                                    className="size-3.5 text-emerald-500"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Copy
                                    className="size-3.5"
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                  />
                                )}
                              </Button>
                            }
                          />
                          <TooltipContent side="top">
                            {copiedKey === `user-${i}`
                              ? "Copied!"
                              : "Copy message"}
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* User message text */}
                      <div className="rounded-3xl border border-border/40 bg-muted/80 px-5 py-2.5 text-base leading-relaxed wrap-break-word whitespace-pre-wrap text-foreground shadow-2xs">
                        <span className="sr-only">You said:</span>
                        {msg.text}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li
                    key={i}
                    className="group flex animate-in items-start gap-3 duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none sm:gap-4"
                  >
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary shadow-2xs"
                      aria-hidden="true"
                    >
                      <BotMessageSquare className="size-4" strokeWidth={1.75} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
                      <span className="sr-only">Aria said:</span>
                      <div className="text-base leading-7 wrap-break-word whitespace-pre-wrap text-foreground">
                        <RichText content={msg.text} />
                      </div>
                      {/* Copy button for assistant responses */}
                      <div className="-ml-1 flex items-center gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() =>
                                  handleCopy(msg.text, `assistant-${i}`)
                                }
                                aria-label={
                                  copiedKey === `assistant-${i}`
                                    ? "Copied response"
                                    : "Copy response"
                                }
                                className="size-7 cursor-pointer rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                              >
                                {copiedKey === `assistant-${i}` ? (
                                  <Check
                                    className="size-3.5 text-emerald-500"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Copy
                                    className="size-3.5"
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                  />
                                )}
                              </Button>
                            }
                          />
                          <TooltipContent side="bottom">
                            {copiedKey === `assistant-${i}`
                              ? "Copied!"
                              : "Copy response"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </li>
                )
              )}

              {/* Bouncing typing indicator */}
              {isPending && (
                <li
                  className="flex animate-in items-start gap-3 duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none sm:gap-4"
                  role="status"
                >
                  <div
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary shadow-2xs"
                    aria-hidden="true"
                  >
                    <BotMessageSquare
                      className="size-4 animate-pulse text-primary"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div
                      className="flex h-9 items-center gap-1.5 rounded-2xl border border-border/40 bg-muted/70 px-4 py-2"
                      aria-hidden="true"
                    >
                      <span
                        className="animate-dot-bounce size-2 rounded-full bg-foreground/70"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="animate-dot-bounce size-2 rounded-full bg-foreground/70"
                        style={{ animationDelay: "180ms" }}
                      />
                      <span
                        className="animate-dot-bounce size-2 rounded-full bg-foreground/70"
                        style={{ animationDelay: "360ms" }}
                      />
                    </div>
                    <span className="sr-only">
                      Aria is thinking and writing a reply...
                    </span>
                  </div>
                </li>
              )}
            </ol>
          </div>

          {/* Scroll-to-bottom button when scrolled up */}
          {showScrollBottom && (
            <div className="absolute right-6 bottom-24 z-20 animate-in duration-200 zoom-in-90 fade-in">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon-sm"
                      onClick={scrollToBottom}
                      aria-label="Scroll to newest messages"
                      className="cursor-pointer rounded-full border border-border bg-background/95 shadow-md backdrop-blur-xs hover:bg-muted"
                    >
                      <ArrowDown className="size-4" strokeWidth={2} />
                    </Button>
                  }
                />
                <TooltipContent side="left">Scroll to bottom</TooltipContent>
              </Tooltip>
            </div>
          )}

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
