"use client"

import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { loginAPI } from "@/services/api/authAPI"
import { useMutation } from "@tanstack/react-query"
import { Field, FieldError, FieldGroup, FieldLabel } from "./field"
import { Spinner } from "./spinner"
import { useRemoveQueries, useSetQueryData } from "@/services/tanstack/auth"
import { Logo } from "../common/Logo"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const remove = useRemoveQueries()
  const setQueryData = useSetQueryData()

  const { mutate, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data: any) => {
      remove(["user"])
      setQueryData(["user"], data.user)

      switch (data.role) {
        case "student":
          navigate("/student", { replace: true })
          break
        case "instructor":
          navigate("/instructor", { replace: true })
          break
        case "admin":
          navigate("/admin", { replace: true })
          break
      }
    },
    onError: (err: any) => {
      setError(err.response.data.detail || "Error logging in")
    },
  })

  function handleSubmit() {
    setError("")
    mutate({ email, password })
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="relative hidden flex-col justify-between overflow-hidden bg-background/50 p-12 lg:flex lg:w-1/2">
          <>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
              alt="Modern workspace"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="w-full space-y-1">
              <Link
                to="/"
                className="h-fit w-fit"
                aria-label="FrontAccEase Home"
              >
                <Logo className="" size={100} />
              </Link>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Welcome back
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in to pick up right where you left off.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              className="space-y-8"
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email" className="text-sm font-medium">
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 border-transparent bg-muted ring-0 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                  />
                </Field>
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel>Password</FieldLabel>
                    <Link
                      to=""
                      className="text-xs hover:underline"
                      // className={buttonVariants({
                      //   variant: "link",
                      //   size: "xs",
                      // })}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 overflow-hidden border-transparent bg-muted ring-0 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                    />
                    <button
                      className={
                        "absolute top-0 right-0 z-10 h-full px-4 dark:text-background"
                      }
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <FieldError>{error && error}</FieldError>
                </Field>
              </FieldGroup>
              <Button
                className="h-11 w-full text-base font-semibold"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Spinner />
                    Logging in
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link
                type="button"
                to="/signup"
                className={buttonVariants({ variant: "link" })}
              >
                Create a free account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
