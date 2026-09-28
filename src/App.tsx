import { RouterProvider } from "react-router-dom"
import { router } from "./routers/rootRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./components/ui/toast"

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
