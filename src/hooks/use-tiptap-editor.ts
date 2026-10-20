import type { Editor } from "@tiptap/react"
import { useCurrentEditor } from "@tiptap/react"
import { useEffect, useState } from "react"

export function useTiptapEditor(providedEditor?: Editor | null): {
  editor: Editor | null
  editorState?: Editor["state"]
  canCommand?: Editor["can"]
} {
  const { editor: coreEditor } = useCurrentEditor()
  const mainEditor = providedEditor ?? coreEditor

  // Coalesce toolbar re-renders onto requestAnimationFrame so that
  // typing in the editor is completely non-blocking (0ms input latency).
  const [, setTick] = useState(0)

  useEffect(() => {
    if (!mainEditor) return

    let rafId: number | null = null

    const handleUpdate = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        setTick((t) => (t + 1) % 1000000)
      })
    }

    mainEditor.on("selectionUpdate", handleUpdate)
    mainEditor.on("transaction", handleUpdate)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      mainEditor.off("selectionUpdate", handleUpdate)
      mainEditor.off("transaction", handleUpdate)
    }
  }, [mainEditor])

  return {
    editor: mainEditor,
    editorState: mainEditor?.state,
    canCommand: mainEditor?.can,
  }
}
