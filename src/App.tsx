import RootRouter from "./routers/rootRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./components/ui/toast"

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Toaster />
      <RootRouter />
    </QueryClientProvider>
  )
}
