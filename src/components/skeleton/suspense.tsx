import { Suspense, type ReactNode } from "react"

export function suspense(element: ReactNode, fallback: ReactNode) {
  return <Suspense fallback={fallback}>{element}</Suspense>
}
