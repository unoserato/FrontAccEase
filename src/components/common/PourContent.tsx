import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface PourContentProps {
  content: Record<string, unknown>
}

/** Renders the structured Tiptap content attached to a POUR lesson or path. */
export default function PourContent({ content }: PourContentProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    content,
    extensions: [
      StarterKit,
      Image,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Typography,
      Subscript,
      Superscript,
    ],
    editorProps: {
      attributes: {
        class: "prose max-w-none dark:prose-invert",
        "aria-label": "Learning content",
      },
    },
  })

  return <EditorContent editor={editor} />
}
