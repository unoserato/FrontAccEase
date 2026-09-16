import { useDocumentContext } from "@/context/DocumentContext"
import FindAndReplace from "@tiptap/extension-find-and-replace"
import Highlight from "@tiptap/extension-highlight"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Image from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import { Selection } from "@tiptap/extensions"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { ArrowLeft, Calendar, FileText } from "lucide-react"
import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ModuleReadOnly() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { documents, loading } = useDocumentContext()

  // Handle numerical ID vs string ID parsing
  const documentId = id ? (isNaN(Number(id)) ? id : Number(id)) : null
  const targetDoc = documents.find((doc) => doc.id === documentId)
  const isMobile = useIsMobile()

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Read-only document content area.",
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[500px]",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: true,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      FindAndReplace.configure({
        searchDebounceMs: 500,
        injectCSS: false,
      }),
    ],
    content: "",
  })

  // Sync content dynamically when document finishes loading from Context
  useEffect(() => {
    if (editor && targetDoc?.content) {
      try {
        const parsedContent =
          typeof targetDoc.content === "string"
            ? JSON.parse(targetDoc.content)
            : targetDoc.content

        editor.commands.setContent(parsedContent)
      } catch {
        // Fallback if content is raw HTML or plain string
        editor.commands.setContent(targetDoc.content)
      }
    }
  }, [editor, targetDoc])

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">
            Loading document...
          </p>
        </div>
      </div>
    )
  }

  if (!targetDoc) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold">Document Not Found</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The requested document could not be found or may have been deleted.
        </p>
        <Button
          onClick={() => navigate("/documents")}
          variant="outline"
          className="mt-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Documents
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-12">
      <div
        className={`sticky top-0 left-0 z-10 flex h-15 w-full items-center justify-between border ${isMobile ? "px-2" : "px-8"}`}
      >
        <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-background/95 px-4 backdrop-blur sm:px-6">
          {/* Left Section: Back Button + Title */}
          <div className="flex w-full max-w-xl items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-8 w-8 shrink-0"
            >
              <Link to="../documents" title="Back to documents">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </header>
      </div>
      <main className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
        <div className="rounded-2xl border bg-card p-8 shadow-sm sm:p-12">
          <header className="mb-8 space-y-3 border-b pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {targetDoc.title || "Untitled Document"}
            </h1>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Created on{" "}
                {targetDoc.created_at
                  ? new Date(targetDoc.created_at).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Recently"}
              </span>
            </div>
          </header>

          <EditorContent editor={editor} />
        </div>
      </main>
    </div>
  )
}
