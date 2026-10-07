import { useState } from "react"
import HeaderTemplate from "@/components/common/PageTemplate"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { DoorOpen, Info, Lock } from "lucide-react"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

export default function ClassroomEmpty() {
  const [code, setCode] = useState("")
  const isCodeComplete = code.length === 6

  return (
    <section className="p-responsive space-y-8">
      <HeaderTemplate
        title="Classroom"
        subtitle="You are not enrolled in a classroom yet."
      />

      <Empty className="rounded-2xl border border-dashed border-border p-12 sm:p-16">
        <EmptyHeader>
          <EmptyMedia
            variant="icon"
            className="size-12 rounded-xl bg-muted text-muted-foreground [&_svg:not([class*='size-'])]:size-6"
          >
            <DoorOpen />
          </EmptyMedia>
          <EmptyTitle className="text-lg font-bold tracking-tight text-foreground">
            Join a Classroom
          </EmptyTitle>
          <EmptyDescription className="max-w-md text-sm">
            Enter the 6-digit classroom code provided by your instructor to
            enroll and unlock your modules, classworks, and quizzes.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent className="max-w-md gap-4">
          <div className="flex flex-col items-center gap-3">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              inputMode="numeric"
              aria-label="6-digit classroom join code"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="size-10 text-base" />
                <InputOTPSlot index={1} className="size-10 text-base" />
                <InputOTPSlot index={2} className="size-10 text-base" />
                <InputOTPSlot index={3} className="size-10 text-base" />
                <InputOTPSlot index={4} className="size-10 text-base" />
                <InputOTPSlot index={5} className="size-10 text-base" />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-muted-foreground">
              6-digit code, numbers only.
            </p>
          </div>

          <Button className="w-full max-w-xs" disabled={!isCodeComplete}>
            Join Classroom
          </Button>

          <div className="mt-2 w-full rounded-xl border border-border bg-muted/40 p-4 text-left">
            <div className="mb-2 flex items-center gap-2 text-foreground">
              <Info className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Before you join</h3>
            </div>
            <ul className="list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-muted-foreground">
              <li>
                You can only join{" "}
                <span className="font-medium text-foreground">
                  one classroom at a time
                </span>
                . Leaving or switching classrooms will unenroll you from your
                current one.
              </li>
              <li>
                Joining a classroom shares your data with that classroom,
                including your{" "}
                <span className="font-medium text-foreground">
                  name, email, classworks, and analyzer logs
                </span>
                .
              </li>
            </ul>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="size-3" />
              Your data is only visible to that classroom&apos;s instructor.
            </div>
          </div>
        </EmptyContent>
      </Empty>
    </section>
  )
}
