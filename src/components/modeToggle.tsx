import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTheme } from "@/components/theme-provider"
import { cn } from "cn"

export interface ModeToggleProps {
  variant?: "dropdown" | "select"
  className?: string
}

export function ModeToggle({
  variant = "dropdown",
  className,
}: ModeToggleProps) {
  const { theme, setTheme } = useTheme()

  if (variant === "select") {
    return (
      <Select value={theme} onValueChange={(val: any) => setTheme(val)}>
        <SelectTrigger
          className={cn(
            "h-8 rounded-lg border-border/50 bg-background/60 px-2.5 text-xs font-medium capitalize shadow-none transition-colors hover:bg-accent/60",
            className
          )}
        >
          <SelectValue placeholder="Select theme" className="capitalize" />
        </SelectTrigger>
        <SelectContent
          alignItemWithTrigger={false}
          className="w-32 rounded-xl border-border/50 p-1 shadow-lg"
        >
          <SelectItem value="light" className="rounded-lg text-base capitalize">
            Light
          </SelectItem>
          <SelectItem value="dark" className="rounded-lg text-base capitalize">
            Dark
          </SelectItem>
          <SelectItem
            value="system"
            className="rounded-lg text-base capitalize"
          >
            System
          </SelectItem>
        </SelectContent>
      </Select>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" className={className}>
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
