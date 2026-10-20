import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Highlight from "@tiptap/extension-highlight"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import { LessonButton } from "@/components/tiptap-extension/lesson-button-extension"
import { normalizeLessonContent } from "@/components/tiptap-extension/normalize-lesson-content"

export default function PourContent({ content }: { content: Record<string, unknown> }) {
  const editor = useEditor({
    editable: false,
    content: normalizeLessonContent(content),
    extensions: [StarterKit, Image, Highlight.configure({ multicolor: true }), TaskList, TaskItem.configure({ nested: true }), TextAlign.configure({ types: ["heading", "paragraph"] }), Typography, Subscript, Superscript, LessonButton],
    editorProps: { attributes: { class: "prose max-w-none dark:prose-invert", "aria-label": "Learning content" } },
  })
  return <EditorContent editor={editor} />
}
