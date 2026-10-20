import { mergeAttributes, Node } from "@tiptap/core"

type LessonButtonAttributes = {
  imageAlt: string
  imageSrc: string | null
  label: string
  type: "button" | "reset" | "submit"
}

const buttonTypes = new Set<LessonButtonAttributes["type"]>([
  "button",
  "reset",
  "submit",
])

function isSafeImageSource(source: string | null): source is string {
  if (!source) return false

  try {
    const url = new URL(source, window.location.origin)
    return ["blob:", "data:", "http:", "https:"].includes(url.protocol)
  } catch {
    return false
  }
}

/**
 * Renders the accessible icon buttons used in POUR lessons without allowing
 * arbitrary HTML to execute in lesson content.
 */
export const LessonButton = Node.create({
  name: "lessonButton",
  group: "inline",
  inline: true,
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      type: { default: "button" },
      imageSrc: { default: null },
      imageAlt: { default: "" },
      label: { default: "" },
    }
  },

  parseHTML() {
    return [
      {
        tag: "button",
        getAttrs: (element) => {
          const button = element as HTMLButtonElement
          const image = button.querySelector("img")
          const type = button.type as LessonButtonAttributes["type"]

          return {
            type: buttonTypes.has(type) ? type : "button",
            imageSrc: isSafeImageSource(image?.getAttribute("src") ?? null)
              ? image?.getAttribute("src")
              : null,
            imageAlt: image?.getAttribute("alt") ?? "",
            label: button.textContent?.trim() ?? "",
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { imageAlt, imageSrc, label, type } =
      HTMLAttributes as LessonButtonAttributes
    const attributes = mergeAttributes({ type })
    const children: (string | [string, Record<string, string>])[] = []

    if (imageSrc) children.push(["img", { src: imageSrc, alt: imageAlt }])
    if (label) children.push(label)

    return ["button", attributes, ...children]
  },
})
