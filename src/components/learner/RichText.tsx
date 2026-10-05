import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

import "highlight.js/styles/github-dark.css"

type RichTextProps = {
  content: string
}

export function RichText({ content }: RichTextProps) {
  return (
    <div className="max-w-none text-sm leading-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre({ children }) {
            return (
              <pre className="my-4 overflow-x-auto rounded-lg border bg-muted p-4">
                {children}
              </pre>
            )
          },

          code({ className, children, ...props }) {
            const isCodeBlock = className?.startsWith("language-")

            if (isCodeBlock) {
              return (
                <code className={`${className} font-mono text-sm`} {...props}>
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
