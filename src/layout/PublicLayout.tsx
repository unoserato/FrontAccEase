import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import PageSkeleton from "@/components/skeleton/PageSkeleton"
import PublicNavbar from "@/components/public/PublicNavbar"
import PublicFooter from "@/components/public/PublicFooter"

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Accessible Skip Navigation Link for Keyboard & Screen Reader Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-xl focus:ring-2 focus:ring-ring focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Global Header */}
      <PublicNavbar />

      {/* Main Page Area */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Global Footer */}
      <PublicFooter />
    </div>
  )
}
