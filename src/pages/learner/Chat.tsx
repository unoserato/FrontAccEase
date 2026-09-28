import { useState, useRef, useEffect } from "react"
import { initialChatMessages } from "@/const/data"
import type { ChatMessage } from "@/const/materialsProps"
import { ArrowUp, Copy, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const MAX_WORDS = 200

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0
  const isOverWordLimit = wordCount > MAX_WORDS

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim() || isOverWordLimit || isTyping) return

    const currentPrompt = input.trim()
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: currentPrompt,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulated assistant response with typing indicator
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: "assistant",
        text: `Here is a response regarding your inquiry: "${currentPrompt}". Let me know if you need further details or code examples.`,
        createdAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages((prev) => [...prev, assistantMsg])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCodeId(id)
    setTimeout(() => setCopiedCodeId(null), 2000)
  }

  return (
    <div className="flex h-full w-full flex-col justify-between bg-background p-4 font-sans sm:p-6">
      {/* Messages Scroll Area with Live Region for Screen Readers */}
      <div
        role="log"
        aria-live="polite"
        aria-label="Chat messages history"
        className="flex-1 space-y-6 overflow-y-auto pr-2"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="w-full">
            {msg.sender === "user" ? (
              <div className="flex justify-end">
                <div className="max-w-7/10 rounded-2xl border border-border bg-muted/40 px-5 py-3 text-sm break-words whitespace-pre-wrap text-foreground shadow-2xs">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div className="flex max-w-9/10 items-start space-x-3">
                {/* Assistant Bot Icon */}
                <div
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground font-bold text-background"
                  aria-hidden="true"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2a3 3 0 0 1 3 3v1h1a3 3 0 0 1 3 3v1h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1v1a3 3 0 0 1-3 3h-1v1a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1H5a3 3 0 0 1-3-3v-1H1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1V8a3 3 0 0 1 3-3h1V5a3 3 0 0 1 3-3h3zm0 2.5H9a1.5 1.5 0 0 0-1.5 1.5v1h9V6A1.5 1.5 0 0 0 15 4.5h-3zM5 8.5A1.5 1.5 0 0 0 3.5 10v4A1.5 1.5 0 0 0 5 15.5h14a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 19 8.5H5z" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1 space-y-4">
                  <p className="text-sm leading-relaxed break-words whitespace-pre-wrap text-foreground/90">
                    {msg.text}
                  </p>

                  {/* Code Snippet Card */}
                  {msg.codeSnippet && (
                    <div className="group relative overflow-hidden rounded-2xl border border-border/80 bg-muted/30 p-4 font-mono text-sm text-foreground shadow-2xs">
                      <div className="mb-2 flex items-center justify-between border-b border-border/40 pb-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase">
                          {msg.codeSnippet.language || "Code"}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            copyCode(msg.codeSnippet!.code, msg.id)
                          }
                          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                          aria-label="Copy code to clipboard"
                        >
                          {copiedCodeId === msg.id ? (
                            <>
                              <Check
                                className="size-3.5 text-emerald-500"
                                aria-hidden="true"
                              />
                              <span className="text-emerald-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3.5" aria-hidden="true" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-1 overflow-x-auto">
                        {msg.codeSnippet.code.split("\n").map((line, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="w-8 shrink-0 pr-4 text-right text-xs text-muted-foreground/60 select-none">
                              {idx + 1}
                            </span>
                            <span className="flex-1 wrap-break-word whitespace-pre">
                              <RenderSyntaxHighlightedLine line={line} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            </div>
            <p className="text-xs text-muted-foreground italic">
              Assistant is thinking...
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <div className="mt-4 pt-2">
        <div
          className={cn(
            "relative flex min-h-30 flex-col justify-between rounded-3xl border border-border bg-card p-4 shadow-2xs transition-colors",
            "focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20",
            isOverWordLimit &&
              "border-destructive focus-within:border-destructive focus-within:ring-destructive/20"
          )}
        >
          <label htmlFor="chat-textarea" className="sr-only">
            Type your message (maximum 200 words)
          </label>
          <textarea
            id="chat-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            placeholder="What would you like to know? (LIMIT 200 WORDS)"
            className="w-full resize-none border-0 bg-transparent p-1 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-0 focus:outline-none disabled:opacity-50"
            rows={2}
          />
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              {/* Word Count Indicator */}
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  isOverWordLimit
                    ? "font-bold text-destructive"
                    : "text-muted-foreground/70"
                )}
              >
                {wordCount} / {MAX_WORDS} words
              </span>

              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isOverWordLimit || isTyping}
                className={cn(
                  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  input.trim() && !isOverWordLimit && !isTyping
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "cursor-not-allowed bg-muted-foreground/20 text-muted-foreground opacity-50"
                )}
                title="Send Message"
                aria-label="Send Message"
              >
                <ArrowUp className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RenderSyntaxHighlightedLine({ line }: { line: string }) {
  if (line.trim().startsWith("//")) {
    return <span className="text-muted-foreground/70 italic">{line}</span>
  }

  const parts = line.split(
    /(".*?"|'.*?'|\b(?:import|from|export|default|function|const|let|var|return|new)\b)/g
  )

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (
          [
            "import",
            "from",
            "export",
            "default",
            "function",
            "const",
            "let",
            "var",
            "return",
            "new",
          ].includes(part)
        ) {
          return (
            <span
              key={i}
              className="font-semibold text-amber-600 dark:text-amber-400"
            >
              {part}
            </span>
          )
        }
        if (part.startsWith('"') || part.startsWith("'")) {
          return (
            <span key={i} className="text-emerald-600 dark:text-emerald-400">
              {part}
            </span>
          )
        }
        if (
          [
            "useState",
            "useEffect",
            "toLocaleTimeString",
            "parseInt",
            "split",
          ].some((fn) => part.includes(fn))
        ) {
          const subParts = part.split(
            /\b(useState|useEffect|toLocaleTimeString|parseInt|split)\b/g
          )
          return (
            <span key={i}>
              {subParts.map((sub, j) =>
                [
                  "useState",
                  "useEffect",
                  "toLocaleTimeString",
                  "parseInt",
                  "split",
                ].includes(sub) ? (
                  <span
                    key={j}
                    className="font-semibold text-pink-600 dark:text-pink-400"
                  >
                    {sub}
                  </span>
                ) : (
                  sub
                )
              )}
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}
