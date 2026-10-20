import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

import "highlight.js/styles/github-dark.css"

type RichTextProps = {
  content: string
  className?: string
  preClassName?: string
}

export function RichText({ content, className, preClassName }: RichTextProps) {
  return (
    <div className={`max-w-none text-sm leading-6 ${className || ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre({ children }) {
            return (
              <pre
                className={`overflow-x-auto rounded-lg bg-zinc-950 p-3.5 font-mono text-xs text-zinc-100 selection:bg-primary/30 dark:bg-zinc-900/90 ${
                  preClassName ?? "my-3"
                }`}
              >
                {children}
              </pre>
            )
          },

          code({ className, children, ...props }) {
            const isCodeBlock =
              Boolean(className?.includes("language-")) ||
              Boolean(className?.includes("hljs"))

            if (isCodeBlock) {
              return (
                <code className={`${className || ""} font-mono text-xs`} {...props}>
                  {children}
                </code>
              )
            }

            return (
              <code
                className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs"
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
