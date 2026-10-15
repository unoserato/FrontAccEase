"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, Clock2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DateTimePickerProps {
  value?: Date
  onChange: (value: Date) => void
  placeholder?: string
  className?: string
  disabled?: (date: Date) => boolean
}

const TIME_INPUT_CLASS =
  "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"

/** Merges an `HH:mm:ss` clock string onto a calendar date. */
function withTimeOfDay(date: Date, time: string): Date {
  const [hours = 0, minutes = 0, seconds = 0] = time
    .split(":")
    .map((part) => parseInt(part, 10))
  const merged = new Date(date)
  merged.setHours(
    Number.isNaN(hours) ? 0 : hours,
    Number.isNaN(minutes) ? 0 : minutes,
    Number.isNaN(seconds) ? 0 : seconds,
    0
  )
  return merged
}

/**
 * Combined calendar + time-of-day picker.
 *
 * Keeps the calendar and the clock input inside one popover so setting a
 * deadline does not mean hunting for a second control on the page. The clock is
 * derived from `value` and only held as a local draft while the popover is open,
 * so an external change to `value` is never overwritten by a stale edit.
 */
export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick a date & time",
  className,
  disabled,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [timeDraft, setTimeDraft] = React.useState<string | null>(null)
  const timeId = React.useId()

  const time =
    timeDraft ??
    (value ? format(value, "HH:mm:ss") : format(new Date(), "HH:mm:ss"))

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    // Drop any in-progress clock edit so the next open reflects `value`.
    if (!nextOpen) setTimeDraft(null)
  }

  function handleSelectDate(date?: Date) {
    if (!date) return
    // The popover stays open so the clock can be set straight after.
    onChange(withTimeOfDay(date, time))
  }

  function handleTimeChange(nextTime: string) {
    setTimeDraft(nextTime)
    if (value) onChange(withTimeOfDay(value, nextTime))
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!value}
            className={cn(
              "h-9 justify-between gap-2 text-left text-xs font-normal data-[empty=true]:text-muted-foreground",
              className
            )}
          >
            <span className="truncate">
              {value ? format(value, "PPP") : placeholder}
            </span>
            <span className="flex shrink-0 items-center gap-2">
              {value && (
                <span className="text-muted-foreground tabular-nums">
                  {format(value, "p")}
                </span>
              )}
              <CalendarIcon className="size-3.5 opacity-50" />
            </span>
          </Button>
        }
      />
      <PopoverContent className="w-auto max-w-xs p-4" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelectDate}
          disabled={disabled}
          defaultMonth={value}
          className="w-full p-0"
        />
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { label: "Today", value: 0 },
            { label: "Tomorrow", value: 1 },
            { label: "In 3 days", value: 3 },
            { label: "In a week", value: 7 },
            { label: "In 2 weeks", value: 14 },
          ].map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const newDate = addDays(new Date(), preset.value)
                onChange(newDate)
              }}
            >
              {preset.label}
            </Button>
          ))}
        </div>
        <div className="border-t bg-card p-3">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={timeId} className="text-xs">
                Due time
              </FieldLabel>
              <InputGroup className="h-9">
                <InputGroupInput
                  id={timeId}
                  type="time"
                  step="1"
                  value={time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className={TIME_INPUT_CLASS}
                />
                <InputGroupAddon>
                  <Clock2Icon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
          <Button className={`mt-4 w-full`} onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
