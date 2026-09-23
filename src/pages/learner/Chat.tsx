import { useState, useRef, useEffect } from "react"
import { initialChatMessages } from "@/const/data"
import type { ChatMessage } from "@/const/materialsProps"
import { Image, CodeXml, Mic, ArrowUp } from "lucide-react"

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: input.trim(),
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMsg])
    const currentPrompt = input.trim()
    setInput("")

    // Simulated assistant response
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
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between bg-background p-6 font-sans">
      {/* Messages Scroll Area */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className="w-full">
            {msg.sender === "user" ? (
              <div className="flex justify-end">
                <div className="max-w-[70%] rounded-2xl border border-border bg-muted/40 px-5 py-3 text-sm text-foreground shadow-xs">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div className="flex max-w-[90%] items-start space-x-3">
                {/* Custom Bot Icon matching screenshot */}
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground font-bold text-background">
                  <svg
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2a3 3 0 0 1 3 3v1h1a3 3 0 0 1 3 3v1h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1v1a3 3 0 0 1-3 3h-1v1a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1H5a3 3 0 0 1-3-3v-1H1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1V8a3 3 0 0 1 3-3h1V5a3 3 0 0 1 3-3h3zm0 2.5H9a1.5 1.5 0 0 0-1.5 1.5v1h9V6A1.5 1.5 0 0 0 15 4.5h-3zM5 8.5A1.5 1.5 0 0 0 3.5 10v4A1.5 1.5 0 0 0 5 15.5h14a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 19 8.5H5z" />
                  </svg>
                </div>

                <div className="flex-1 space-y-4">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {msg.text}
                  </p>

                  {/* Code Snippet Card */}
                  {msg.codeSnippet && (
                    <div className="overflow-hidden rounded-2xl border border-border/80 bg-muted/30 p-4 font-mono text-sm text-foreground shadow-2xs">
                      <div className="space-y-1">
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <div className="mt-4 pt-2">
        <div className="relative flex min-h-[120px] flex-col justify-between rounded-3xl border border-border bg-card p-4 shadow-xs">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What would you like to know? LIMIT 200 WORDS"
            className="w-full resize-none border-0 bg-transparent p-1 text-sm text-foreground placeholder:text-muted-foreground/60 focus:ring-0 focus:outline-hidden"
            rows={2}
          />
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3 text-muted-foreground">
              <button
                type="button"
                className="cursor-pointer rounded-md p-1 transition-colors hover:bg-accent hover:text-foreground"
                title="Attach Image"
              >
                <Image className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-md p-1 transition-colors hover:bg-accent hover:text-foreground"
                title="Code"
              >
                <CodeXml className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-md p-1 transition-colors hover:bg-accent hover:text-foreground"
                title="Voice Input"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-muted-foreground/30 text-foreground transition-colors hover:bg-muted-foreground/50 disabled:opacity-40"
              title="Send"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RenderSyntaxHighlightedLine({ line }: { line: string }) {
  // Simple custom syntax highlighter matching the screenshot palette
  if (line.trim().startsWith("//")) {
    return <span className="text-muted-foreground/70 italic">{line}</span>
  }

  // Tokenize keywords, strings, function names
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
          // Highlight standard hooks & helper functions in fuchsia/pink
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
