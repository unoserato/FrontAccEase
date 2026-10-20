import type { JSONContent } from "@tiptap/core"

const BUTTON_HTML = /<button\b[^>]*>[\s\S]*?<\/button>/gi

function buttonNode(markup: string): JSONContent | null {
  if (typeof document === "undefined") return null

  const template = document.createElement("template")
  template.innerHTML = markup
  const button = template.content.querySelector("button")
  if (!button) return null

  const image = button.querySelector("img")
  const source = image?.getAttribute("src") ?? null
  let imageSrc: string | null = null

  if (source) {
    try {
      const url = new URL(source, window.location.origin)
      if (["blob:", "data:", "http:", "https:"].includes(url.protocol)) {
        imageSrc = source
      }
    } catch {
      imageSrc = null
    }
  }

  const type = button.getAttribute("type")
  return {
    type: "lessonButton",
    attrs: {
      type: type === "submit" || type === "reset" ? type : "button",
      imageSrc,
      imageAlt: image?.getAttribute("alt") ?? "",
      label: button.textContent?.trim() ?? "",
    },
  }
}

function normalizeText(text: string): JSONContent[] | null {
  const matches = [...text.matchAll(BUTTON_HTML)]
  if (!matches.length) return null

  const result: JSONContent[] = []
  let cursor = 0

  for (const match of matches) {
    const start = match.index ?? 0
    const button = buttonNode(match[0])
    if (!button) continue

    if (start > cursor) result.push({ type: "text", text: text.slice(cursor, start) })
    result.push(button)
    cursor = start + match[0].length
  }

  if (cursor < text.length) result.push({ type: "text", text: text.slice(cursor) })
  return result
}

function normalizeNode(content: JSONContent): JSONContent[] {
  if (!content.content || content.type === "codeBlock") return [content]

  const paragraphText =
    content.type === "paragraph" &&
    content.content.every((child) => child.type === "text")
      ? content.content.map((child) => child.text ?? "").join("")
      : null

  if (paragraphText && BUTTON_HTML.test(paragraphText)) {
    BUTTON_HTML.lastIndex = 0
    return [
      {
        type: "codeBlock",
        attrs: { language: "html" },
        content: [{ type: "text", text: paragraphText.trim() }],
      },
    ]
  }

  BUTTON_HTML.lastIndex = 0
  const normalizedChildren = content.content.flatMap((child) => {
    if (child.type === "text" && child.text) {
      return normalizeText(child.text) ?? [child]
    }

    return normalizeNode(child)
  })

  return [{ ...content, content: normalizedChildren }]
}

/** Converts legacy literal button markup into readable code samples. */
export function normalizeLessonContent(content: JSONContent): JSONContent {
  return normalizeNode(content)[0]
}
