import { useEffect } from "react"
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
import { BookOpen, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CoreModuleLessonActivity } from "@/const/props/moduleProps"

interface CoreModuleLessonViewProps {
  activity: CoreModuleLessonActivity
  principleLabel: string
}

export default function CoreModuleLessonView({
  activity,
  principleLabel,
}: CoreModuleLessonViewProps) {
  const lessonData = activity.lesson

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Read-only core module lesson content area.",
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] leading-relaxed text-foreground",
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
    content: lessonData?.content || "",
  })

  const lessonContent = lessonData?.content

  useEffect(() => {
    if (editor && lessonContent) {
      try {
        const parsedContent =
          typeof lessonContent === "string"
            ? JSON.parse(lessonContent)
            : lessonContent

        editor.commands.setContent(parsedContent)
      } catch {
        editor.commands.setContent(lessonContent)
      }
    }
  }, [editor, lessonContent])

  return (
    <div className="space-y-6">
      <header className="space-y-4 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold">
            {principleLabel}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <BookOpen className="size-3" />
            Lesson
          </Badge>
          {lessonData.wcag_criteria?.map((wcag) => (
            <Badge key={wcag} variant="outline" className="font-mono text-xs">
              WCAG {wcag}
            </Badge>
          ))}
          {activity.required && (
            <Badge variant="default" className="text-xs">
              Required
            </Badge>
          )}
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {lessonData.title}
        </h1>

        {lessonData.description && (
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {lessonData.description}
          </p>
        )}

        {lessonData.learning_objectives?.length > 0 && (
          <div className="mt-4 rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-5">
            <h2 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-foreground uppercase">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Learning Objectives
            </h2>
            <ul className="space-y-2">
              {lessonData.learning_objectives.map((obj, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-muted-foreground sm:text-sm"
                >
                  <span className="mt-1.5 flex size-1.5 shrink-0 rounded-full bg-foreground" />
                  <span className="leading-snug">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <EditorContent editor={editor} />
    </div>
  )
}
