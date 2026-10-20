interface CopyTextParams {
  textToCopy: string
  setCopied: (value: boolean) => void
  timeout?: number
}

export default async function copyText({
  textToCopy,
  setCopied,
  timeout = 5000,
}: CopyTextParams): Promise<boolean> {
  if (!textToCopy || typeof navigator === "undefined" || !navigator.clipboard) {
    return false
  }

  try {
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), timeout)
    return true
  } catch (error) {
    console.error("Failed to copy text:", error)
    setCopied(false)
    return false
  }
}
