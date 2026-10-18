import { useEffect, useState } from "react"
import { useNavigation } from "react-router-dom"

export default function NavigationProgressBar() {
  const navigation = useNavigation()
  const isNavigating = Boolean(navigation.location)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (isNavigating) {
      const raf = requestAnimationFrame(() => setActive(true))
      return () => cancelAnimationFrame(raf)
    }

    const timer = setTimeout(() => setActive(false), 200)
    return () => clearTimeout(timer)
  }, [isNavigating])

  if (!isNavigating && !active) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-primary/20"
    >
      <div
        className={`h-full bg-primary shadow-sm shadow-primary/50 transition-all duration-300 ease-out ${
          isNavigating ? "w-4/5 animate-pulse" : "w-full opacity-0"
        }`}
      />
    </div>
  )
}
