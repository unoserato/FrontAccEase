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
import { ArrowLeft, Calendar, FileText, GraduationCap } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getDateString } from "@/hooks/date-to-string"
import { useMe } from "@/services/tanstack/auth"
import { useEffect } from "react"
import { useModuleById } from "@/services/tanstack/materials"

interface ReadOnlyProps {
  href?: string
}

export default function ModuleReadOnly({ href }: ReadOnlyProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: user } = useMe()
  const { data: targetDoc } = useModuleById(id!)
  const isEditor = user?.role === "instructor"

  function handleBack() {
    if (href) {
      navigate(href)
    } else {
      navigate(-1)
    }
  }

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Read-only module content area.",
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-112.5 leading-relaxed text-foreground",
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

  // Sync content dynamically when document finishes loading
  useEffect(() => {
    if (editor && targetDoc && targetDoc.content) {
      try {
        const parsedContent =
          typeof targetDoc.content === "string"
            ? JSON.parse(targetDoc.content)
            : targetDoc.content

        editor.commands.setContent(parsedContent)
      } catch {
        editor.commands.setContent(targetDoc.content)
      }
    }
  }, [editor, targetDoc])

  if (!targetDoc) {
    return (
      <div
        style={{ minHeight: "70vh" }}
        className="mx-auto my-auto flex items-center justify-center p-4"
      >
        <Card className="max-w-md p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
            <FileText className="size-6 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            Module Not Found
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The requested module could not be found or may have been deleted.
          </p>
          <Button onClick={handleBack} variant="outline" className="mt-6 gap-2">
            <ArrowLeft className="size-4" />
            Back to Modules
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background pb-16">
      {/* Sticky Reader Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleBack()}
              title="Back"
              aria-label="Back"
              className="shrink-0 cursor-pointer"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="shrink-0 bg-foreground px-1.5 py-0.5 text-xs font-medium tracking-wider text-background uppercase sm:px-2 sm:text-xs">
                {targetDoc.principle}
              </span>
              <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">
                {targetDoc.name}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Document Area */}
      <main className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 sm:pt-8">
        <Card className="p-6 shadow-sm sm:p-10">
          <header className="mb-6 space-y-3 border-b border-border pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs font-semibold">
                {targetDoc.principle}
              </Badge>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {targetDoc.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                Created {getDateString(targetDoc.created_at)}
              </span>
            </div>

            {/* Assigned Classrooms (Visible for Editors only) */}
            {isEditor && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
                  <GraduationCap className="size-3.5 text-primary" />
                  Assigned Classrooms:
                </span>
                {/* {assignedClassrooms.length > 0 ? (
                  assignedClassrooms.map((c) => {
                    if (!c) return null
                    return (
                      <Badge key={c.id} variant="outline" className="text-xs">
                        {c.classroomCode} • {c.name}
                      </Badge>
                    )
                  })
                ) : (
                  <Badge
                    variant="secondary"
                    className="text-xs text-muted-foreground"
                  >
                    No classrooms assigned
                  </Badge>
                )} */}
              </div>
            )}
          </header>

          <EditorContent editor={editor} />
        </Card>
      </main>
    </div>
  )
}
