import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, XCircle } from "lucide-react"
import { Logo } from "@/components/common/Logo"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useMutation } from "@tanstack/react-query"
import { signupAPI } from "@/services/api/authAPI"
import { toast } from "@/components/ui/toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const passwordRequirements = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
]

export default function SignUpPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Account Created Successfully",
        description: "Check your email for activation.",
      })
      navigate("/login")
    },
    onError: (err: any) => {
      setError(
        err.response.data.detail ||
          "We are currently having problems with account creation.\nPlease try again later."
      )
    },
  })

  function handleSubmit() {
    setError("")

    const validPassword = passwordRequirements.every((req) =>
      req.regex.test(password)
    )

    if (password !== confirmPassword) {
      return setError("Password do not match")
    }

    if (!validPassword) {
      return setError(
        "Password must be at least 8 characters and include a lowercase letter, uppercase letter, number, and special character."
      )
    }
    mutate({ name, email, password })
  }

  return (
    <div className="p-responsive h-fit w-full">
      <div className="mx-auto my-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Link
            to="/"
            className="mx-auto flex w-fit"
            aria-label="FrontAccEase Home"
          >
            <Logo size={100} />
          </Link>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Create an account
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Start learning web accessibility with interactive modules and tools.
          </p>
        </div>

        <Card className="border-border shadow-md">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            autoComplete="off"
          >
            <CardContent className="space-y-4 pb-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="signup-name">Full Name</FieldLabel>
                  <Input
                    className="h-10"
                    id="signup-name"
                    type="text"
                    required
                    placeholder="e.g. Juan Dela Cruz"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                  <Input
                    className="h-10"
                    id="signup-email"
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                  <Input
                    className="h-10"
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Minimum 8 characters"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${password.length > 0 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="space-y-1">
                      {passwordRequirements.map((req, index) => {
                        const isValid = req.regex.test(password)
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span
                              className={` ${
                                isValid ? "text-green-500" : "text-red-500"
                              } `}
                            >
                              {isValid ? (
                                <CheckCircle2 size={12} />
                              ) : (
                                <XCircle size={12} />
                              )}
                            </span>
                            <span
                              className={
                                isValid
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }
                            >
                              {req.text}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Field>
                <Field>
                  <FieldLabel
                    htmlFor="signup-confirm-password"
                    className="font-medium"
                  >
                    Confirm Password
                  </FieldLabel>
                  <Input
                    className="h-10"
                    id="signup-confirm-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <FieldError>{error}</FieldError>
                </Field>
              </FieldGroup>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="show-password"
                  className="text-xs text-muted-foreground"
                >
                  Show Password
                </Label>
                <Switch
                  id="show-password"
                  checked={showPassword}
                  onCheckedChange={() => setShowPassword(!showPassword)}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 h-10 w-full justify-center gap-2 font-semibold"
              >
                <span>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </span>
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-3 border-t border-border bg-muted/30 p-4 text-sm">
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
    </div>
  )
}
