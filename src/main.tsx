import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import { SidebarProvider } from "./components/ui/sidebar.tsx"
import { Toaster } from "./components/ui/toast.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <TooltipProvider>
          <Toaster />
          <App />
        </TooltipProvider>
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
)
