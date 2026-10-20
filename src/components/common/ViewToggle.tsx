import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ViewMode = "grid" | "list"

interface ViewToggleProps {
  viewMode: ViewMode
  setViewMode: (value: ViewMode) => void
  className?: string
}

export default function ViewToggle({
  viewMode,
  setViewMode,
  className = "",
}: ViewToggleProps) {
  return (
    <div
      role="group"
      aria-label="View layout switch"
      className={`inline-flex items-center rounded-lg border border-border bg-muted p-1 ${className}`}
    >
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-pressed={viewMode === "grid"}
        aria-label="Grid view"
        className={`h-8 w-8 rounded-md transition-all ${
          viewMode === "grid"
            ? "bg-background text-foreground shadow-sm hover:bg-background"
            : "text-muted-foreground hover:bg-transparent hover:text-foreground"
        }`}
        onClick={() => setViewMode("grid")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-pressed={viewMode === "list"}
        aria-label="List view"
        className={`h-8 w-8 rounded-md transition-all ${
          viewMode === "list"
            ? "bg-background text-foreground shadow-sm hover:bg-background"
            : "text-muted-foreground hover:bg-transparent hover:text-foreground"
        }`}
        onClick={() => setViewMode("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}
