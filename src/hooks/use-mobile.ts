import * as React from "react"

const MOBILE_BREAKPOINT = 768
const MOBILE_LANDSCAPE_MAX_HEIGHT = 500

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Matches portrait width OR mobile landscape (landscape orientation + short viewport height)
    const mediaQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px), ((orientation: landscape) and (max-height: ${MOBILE_LANDSCAPE_MAX_HEIGHT}px))`
    const mql = window.matchMedia(mediaQuery)

    const onChange = () => {
      setIsMobile(mql.matches)
    }

    mql.addEventListener("change", onChange)
    setIsMobile(mql.matches)

    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
