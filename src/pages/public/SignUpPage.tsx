import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import { Logo } from "@/components/common/Logo"

export default function SignUpPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify and try again.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate("/learner/dashboard")
    }, 600)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Centered Sign Up Card */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <Link
              to="/"
              className="mx-auto flex w-full justify-center"
              aria-label="FrontAccEase Home"
            >
              <Logo className="" size={100} />
            </Link>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Create an account
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Start learning web accessibility with interactive modules and
              tools.
            </p>
          </div>

          <Card className="border-border shadow-md">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                {error && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs font-medium text-destructive">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    required
                    placeholder="e.g. Jordan Santos"
                    className=""
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    required
                    placeholder="student@university.edu"
                    className=""
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    className=""
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="signup-confirm-password">
                    Confirm Password
                  </Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    required
                    placeholder="Re-enter your password"
                    className=""
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
                  <p>
                    <strong className="text-foreground">
                      Note on Account Roles:
                    </strong>{" "}
                    Institutional privileges (Student, Instructor,
                    Administrator) are verified and managed securely through
                    platform enrollment.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 h-10 w-full justify-center gap-2 font-semibold"
                >
                  <span>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </span>
                  <ArrowRight className="size-4" />
                </Button>
              </CardContent>

              <CardFooter className="flex flex-col items-center gap-3 border-t border-border bg-muted/30 p-4 text-xs">
                <div className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
