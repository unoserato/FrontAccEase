import { useEffect } from "react"
import { useBlocker } from "react-router-dom"

interface UsePromptProps {
  when: boolean
  message?: string
}

export function useUnmount({
  when,
  message = "Changes you made may not be saved. Are you sure you want to leave?",
}: UsePromptProps) {
  // 1. Handle in-app React Router navigation
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      when && currentLocation.pathname !== nextLocation.pathname
  )

  useEffect(() => {
    if (blocker.state === "blocked") {
      const proceed = window.confirm(message)
      if (proceed) {
        blocker.proceed()
      } else {
        blocker.reset()
      }
    }
  }, [blocker, message])

  // 2. Handle browser refresh, closing tab, or typing a new URL
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!when) return
      e.preventDefault()
      e.returnValue = message // Required for modern browser confirmation dialogs
      return message
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [when, message])
}
