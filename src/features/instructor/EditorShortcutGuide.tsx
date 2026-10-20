import { useMemo, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Keyboard,
  Search,
  Sparkles,
  Type,
  Heading,
  List,
  AlignLeft,
  X,
  FileText,
} from "lucide-react"
import { isMac, parseShortcutKeys } from "@/lib/tiptap-utils"
import { cn } from "cn"

interface ShortcutItem {
  id: string
  label: string
  category: "essentials" | "formatting" | "structure" | "blocks" | "alignment"
  shortcut?: string
  markdown?: string
  description?: string
}

const SHORTCUTS: ShortcutItem[] = [
  // Essentials
  {
    id: "save",
    label: "Save & Publish Module",
    category: "essentials",
    shortcut: "ctrl+s",
    description: "Open the publish and save dialog",
  },
  {
    id: "undo",
    label: "Undo",
    category: "essentials",
    shortcut: "ctrl+z",
    description: "Revert previous edit",
  },
  {
    id: "redo",
    label: "Redo",
    category: "essentials",
    shortcut: "ctrl+shift+z",
    description: "Reapply undone change",
  },
  {
    id: "search-replace",
    label: "Search & Replace",
    category: "essentials",
    shortcut: "ctrl+f",
    description: "Find or replace text in module",
  },
  {
    id: "toggle-shortcuts",
    label: "Keyboard Shortcuts Guide",
    category: "essentials",
    shortcut: "ctrl+/",
    description: "Toggle this shortcut guide",
  },

  // Formatting
  {
    id: "bold",
    label: "Bold",
    category: "formatting",
    shortcut: "ctrl+b",
    markdown: "**text**",
  },
  {
    id: "italic",
    label: "Italic",
    category: "formatting",
    shortcut: "ctrl+i",
    markdown: "*text*",
  },
  {
    id: "underline",
    label: "Underline",
    category: "formatting",
    shortcut: "ctrl+u",
  },
  {
    id: "strikethrough",
    label: "Strikethrough",
    category: "formatting",
    shortcut: "ctrl+shift+x",
    markdown: "~~text~~",
  },
  {
    id: "highlight",
    label: "Highlight Text",
    category: "formatting",
    shortcut: "ctrl+shift+h",
    markdown: "==text==",
  },
  {
    id: "inline-code",
    label: "Inline Code",
    category: "formatting",
    shortcut: "ctrl+e",
    markdown: "`code`",
  },
  {
    id: "link",
    label: "Add or Edit Link",
    category: "formatting",
    shortcut: "ctrl+k",
  },
  {
    id: "image",
    label: "Insert Image",
    category: "formatting",
    shortcut: "ctrl+shift+i",
  },
  {
    id: "superscript",
    label: "Superscript",
    category: "formatting",
    shortcut: "ctrl+.",
  },
  {
    id: "subscript",
    label: "Subscript",
    category: "formatting",
    shortcut: "ctrl+,",
  },

  // Structure / Headings
  {
    id: "h1",
    label: "Heading 1 (Main Section)",
    category: "structure",
    shortcut: "ctrl+alt+1",
    markdown: "# + Space",
  },
  {
    id: "h2",
    label: "Heading 2 (Sub-section)",
    category: "structure",
    shortcut: "ctrl+alt+2",
    markdown: "## + Space",
  },
  {
    id: "h3",
    label: "Heading 3 (Topic)",
    category: "structure",
    shortcut: "ctrl+alt+3",
    markdown: "### + Space",
  },
  {
    id: "h4",
    label: "Heading 4 (Minor Topic)",
    category: "structure",
    shortcut: "ctrl+alt+4",
    markdown: "#### + Space",
  },
  {
    id: "paragraph",
    label: "Normal Paragraph",
    category: "structure",
    shortcut: "ctrl+alt+0",
  },

  // Blocks & Lists
  {
    id: "bullet-list",
    label: "Bullet List",
    category: "blocks",
    shortcut: "ctrl+shift+8",
    markdown: "- + Space",
  },
  {
    id: "ordered-list",
    label: "Numbered List",
    category: "blocks",
    shortcut: "ctrl+shift+7",
    markdown: "1. + Space",
  },
  {
    id: "task-list",
    label: "Task / Checklist",
    category: "blocks",
    shortcut: "ctrl+shift+9",
    markdown: "[ ] + Space",
  },
  {
    id: "blockquote",
    label: "Blockquote / Callout",
    category: "blocks",
    shortcut: "ctrl+shift+b",
    markdown: "> + Space",
  },
  {
    id: "code-block",
    label: "Code Block",
    category: "blocks",
    shortcut: "ctrl+alt+c",
    markdown: "``` + Space",
  },
  {
    id: "divider",
    label: "Horizontal Divider Rule",
    category: "blocks",
    markdown: "--- + Enter",
  },

  // Alignment
  {
    id: "align-left",
    label: "Align Left",
    category: "alignment",
    shortcut: "ctrl+shift+l",
  },
  {
    id: "align-center",
    label: "Align Center",
    category: "alignment",
    shortcut: "ctrl+shift+e",
  },
  {
    id: "align-right",
    label: "Align Right",
    category: "alignment",
    shortcut: "ctrl+shift+r",
  },
  {
    id: "align-justify",
    label: "Justify Text",
    category: "alignment",
    shortcut: "ctrl+shift+j",
  },
]

const CATEGORIES = [
  { id: "all", label: "All Shortcuts", icon: Sparkles },
  { id: "essentials", label: "Essentials", icon: FileText },
  { id: "formatting", label: "Formatting", icon: Type },
  { id: "structure", label: "Headings", icon: Heading },
  { id: "blocks", label: "Lists & Blocks", icon: List },
  { id: "alignment", label: "Alignment", icon: AlignLeft },
] as const

interface EditorShortcutGuideProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ShortcutKeysDisplay({ shortcut }: { shortcut: string }) {
  const keys = useMemo(() => {
    return parseShortcutKeys({ shortcutKeys: shortcut }).map((key) =>
      key.toLowerCase() === "mod" ? "Ctrl" : key
    )
  }, [shortcut])

  if (!keys || keys.length === 0) return null

  return (
    <div className="flex items-center gap-1">
      {keys.map((key, idx) => (
        <span key={`${key}-${idx}`} className="flex items-center gap-1">
          {idx > 0 && (
            <span className="text-xs text-muted-foreground/60 select-none">
              +
            </span>
          )}
          <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border/80 bg-muted/80 px-1.5 font-mono text-xs font-medium text-foreground shadow-2xs select-none">
            {key}
          </kbd>
        </span>
      ))}
    </div>
  )
}

export function EditorShortcutGuide({
  open,
  onOpenChange,
}: EditorShortcutGuideProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const mac = useMemo(() => isMac(), [])

  const filteredShortcuts = useMemo(() => {
    return SHORTCUTS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory

      if (!matchesCategory) return false

      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase().trim()
      const matchesLabel = item.label.toLowerCase().includes(q)
      const matchesDesc = item.description?.toLowerCase().includes(q)
      const matchesMarkdown = item.markdown?.toLowerCase().includes(q)
      const matchesShortcut = item.shortcut?.toLowerCase().includes(q)

      return (
        matchesLabel ||
        Boolean(matchesDesc) ||
        Boolean(matchesMarkdown) ||
        Boolean(matchesShortcut)
      )
    })
  }, [activeCategory, searchQuery])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        style={{ maxHeight: "82vh" }}
        className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border-t border-border/80 bg-background/98 p-0 shadow-2xl backdrop-blur-md sm:rounded-t-3xl"
      >
        {/* Subtle Bottom-Sheet Pill */}
        <div className="flex justify-center pt-2.5 pb-1">
          <div className="h-1.5 w-12 rounded-full bg-muted-foreground/25" />
        </div>

        {/* Sheet Header */}
        <SheetHeader className="border-b px-5 pt-1 pb-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <SheetTitle className="flex items-center gap-2 text-base font-semibold sm:text-lg">
                <Keyboard className="size-5 text-primary" />
                Keyboard Shortcuts & Markdown Guide
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground sm:text-sm">
                Boost your module authoring speed using keyboard shortcuts and
                markdown shortcuts.
              </SheetDescription>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground/70" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shortcuts..."
                aria-label="Filter keyboard shortcuts"
                className="h-9 pr-8 pl-8 text-xs sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-3 no-scrollbar flex items-center gap-1.5 overflow-x-auto pt-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isSelected = activeCategory === cat.id
              return (
                <Button
                  key={cat.id}
                  type="button"
                  size="sm"
                  variant={isSelected ? "secondary" : "ghost"}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "h-7 shrink-0 gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
                    isSelected
                      ? "bg-primary/10 font-semibold text-primary hover:bg-primary/15"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-3.5" />
                  {cat.label}
                </Button>
              )
            })}
          </div>
        </SheetHeader>

        {/* Shortcuts Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {filteredShortcuts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Keyboard className="mb-2 size-8 text-muted-foreground/40" />
              <p className="text-sm font-medium text-foreground">
                No shortcuts found
              </p>
              <p className="text-xs text-muted-foreground">
                Try searching for something else or clear the filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredShortcuts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-card/60 p-2.5 transition-colors hover:border-border hover:bg-accent/30"
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-xs font-medium text-foreground sm:text-sm">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="truncate text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    {item.shortcut && (
                      <ShortcutKeysDisplay shortcut={item.shortcut} />
                    )}

                    {item.markdown && (
                      <span className="inline-flex h-5 items-center rounded border border-dashed border-border/70 bg-muted/40 px-1.5 font-mono text-xs text-muted-foreground">
                        {item.markdown}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="flex items-center justify-between border-t bg-muted/20 px-5 py-2.5 text-xs text-muted-foreground sm:px-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-2 rounded-full bg-primary/60" />
            <span>
              Tip: Press{" "}
              <kbd className="rounded border bg-background px-1 py-0.5 font-mono text-xs text-foreground">
                {mac ? "⌘" : "Ctrl"}
              </kbd>{" "}
              +{" "}
              <kbd className="rounded border bg-background px-1 py-0.5 font-mono text-xs text-foreground">
                /
              </kbd>{" "}
              anytime to toggle this guide.
            </span>
          </div>

          <span className="hidden text-xs text-muted-foreground/80 sm:inline">
            {filteredShortcuts.length}{" "}
            {filteredShortcuts.length === 1 ? "shortcut" : "shortcuts"}
          </span>
        </div>
      </SheetContent>
    </Sheet>
  )
}
