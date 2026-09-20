import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "./calendar"

interface DatePickerProps {
  date?: Date
  setDate: (value?: Date) => void
  placeholder?: string
  className?: string
  disabled?: (date: Date) => boolean
}

export function DatePicker({
  date,
  setDate,
  placeholder = "Pick a date",
  className,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className={cn(
              "h-7 w-[150px] justify-between text-left font-normal text-xs data-[empty=true]:text-muted-foreground",
              className
            )}
          >
            <span className="truncate">{date ? format(date, "PPP") : placeholder}</span>
            <CalendarIcon className="size-3.5 opacity-50 shrink-0" />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate)
            setOpen(false)
          }}
          disabled={disabled}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  )
}
