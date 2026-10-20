interface CopyTextParams {
  textToCopy: string
  setCopied: (value: boolean) => void
  timeout?: number
}

export default async function copyText({
  textToCopy,
  setCopied,
  timeout = 2000,
}: CopyTextParams): Promise<boolean> {
  if (!textToCopy) {
    return false
  }

  // 1. Try modern navigator.clipboard (available in secure contexts: HTTPS or localhost)
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
      return true
    } catch (err) {
      console.warn("navigator.clipboard.writeText failed, falling back to execCommand:", err)
    }
  }

  // 2. Fallback for insecure contexts (e.g. LAN IP access like http://192.168.x.x:5173)
  if (typeof document !== "undefined") {
    try {
      const textArea = document.createElement("textarea")
      textArea.value = textToCopy
      textArea.style.position = "fixed"
      textArea.style.top = "0"
      textArea.style.left = "0"
      textArea.style.width = "2em"
      textArea.style.height = "2em"
      textArea.style.padding = "0"
      textArea.style.border = "none"
      textArea.style.outline = "none"
      textArea.style.boxShadow = "none"
      textArea.style.background = "transparent"
      textArea.style.opacity = "0"
      textArea.setAttribute("readonly", "")

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      textArea.setSelectionRange(0, textArea.value.length)

      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
        return true
      }
    } catch (fallbackError) {
      console.error("Fallback execCommand copy failed:", fallbackError)
    }
  }

  setCopied(false)
  return false
}
