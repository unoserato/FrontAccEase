import { buttonVariants } from "@/components/ui/button"
import { HomeIcon, LogIn } from "lucide-react"

export interface ErrorOneProps {
  /** The HTTP error code to display prominently, e.g. "404" */
  code?: string
  /** Bold headline beneath the error code */
  title?: string
  /** Supporting description copy */
  description?: string
  /** Primary call-to-action */
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function GradientCode({ code }: { code: string }) {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full max-w-80 select-none sm:max-w-md"
      aria-hidden="true"
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-primary/20 stroke-primary font-black tracking-tighter"
        style={{ fontSize: "20rem" }}
        strokeWidth="2"
        strokeDasharray="40 20"
      >
        {code}
      </text>
    </svg>
  )
}

export function ErrorOne({
  code = "404",
  title = "No, no, that's right.",
  description = "This is a 404 page. And this page exists, no matter what anyone says.",
}: ErrorOneProps) {
  return (
    <main className="theme-injected relative flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
      <div
        className="dakr:opacity-20 mask-radia-at-center pointer-events-none absolute inset-0 z-0 mask-radial-from-muted mask-radial-to-transparent opacity-10"
        style={{
          backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, var(--primary) 19px, var(--primary) 20px, transparent 20px, transparent 39px, var(--primary) 39px, var(--primary) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, var(--primary) 19px, var(--primary) 20px, transparent 20px, transparent 39px, var(--primary) 39px, var(--primary) 40px),
        radial-gradient(circle at 20px 20px, var(--primary) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, var(--primary) 2px, transparent 2px)
      `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      <section
        aria-labelledby="error-one-title"
        className="z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center"
      >
        <GradientCode code={code} />

        <div className="flex flex-col items-center gap-2">
          <h1
            id="error-one-title"
            className="text-xl leading-snug font-bold tracking-tight sm:text-2xl"
          >
            {title}
          </h1>
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground sm:max-w-sm sm:text-base">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-4 border pt-4">
          {code == "401" ? (
            <a href="/login" className={buttonVariants({ variant: "default" })}>
              Log in
              <LogIn />
            </a>
          ) : (
            <a href="/" className={buttonVariants({ variant: "default" })}>
              Go to Home Page
              <HomeIcon />
            </a>
          )}
        </div>
      </section>
    </main>
  )
}

export default ErrorOne
