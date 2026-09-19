import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
export default function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Window scroll reset
    window.scrollTo(0, 0)

    // Optional: if you have a scrollable root/main container (e.g. inside an app layout)
    const mainContainer = document.querySelector("main")
    if (mainContainer) {
      mainContainer.scrollTo(0, 0)
    }
  }, [pathname])

  return <Outlet />
}
