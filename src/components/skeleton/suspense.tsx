import { Suspense, type ReactNode } from "react"

/**
 * Wrap a lazy-loaded route element in a Suspense boundary with a
 * page-appropriate skeleton fallback.
 */
export function suspense(element: ReactNode, fallback: ReactNode) {
  return <Suspense fallback={fallback}>{element}</Suspense>
}
