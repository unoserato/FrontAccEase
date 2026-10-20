import { useState } from "react"
import type { UserProps, UserRole } from "@/const/props/userProps"
import { useCheckToken } from "@/services/tanstack/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  GraduationCap,
  Hash,
  KeyRound,
  Mail,
  Shield,
  ShieldCheck,
  Sparkles,
  User as UserIcon,
} from "lucide-react"
import { cn } from "cn"

export interface UserProfileProps {
  user?: UserProps
  className?: string
  children?: React.ReactNode
}

function getInitials(name?: string): string {
  if (!name) return "U"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface RoleConfig {
  label: string
  icon: typeof GraduationCap
  badgeClass: string
  description: string
  capabilities: string[]
}

function getRoleConfig(role?: string): RoleConfig {
  const normalized = (role?.toLowerCase() || "learner") as UserRole

  switch (normalized) {
    case "admin":
      return {
        label: "School Administrator",
        icon: ShieldCheck,
        badgeClass:
          "border-purple-500/20 bg-purple-500/10 text-purple-700 dark:text-purple-300",
        description: "Full management privileges across the institution.",
        capabilities: [
          "Manage institutional users & roles",
          "Oversee learning materials & instruments",
          "Inspect system-wide accessibility logs",
          "Configure security permissions & access overrides",
        ],
      }
    case "instructor":
      return {
        label: "Instructor",
        icon: BookOpen,
        badgeClass:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        description: "Authoring, curriculum, and student assessment privileges.",
        capabilities: [
          "Create and edit learning modules",
          "Design quizzes and review submissions",
          "Manage classroom enrollments & classwork",
          "Analyze student web accessibility evaluations",
        ],
      }
    case "learner":
    default:
      return {
        label: "Learner",
        icon: GraduationCap,
        badgeClass:
          "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
        description: "Interactive learning, evaluation tools, and personal progress.",
        capabilities: [
          "Access interactive accessibility modules",
          "Run web accessibility analyzer scans",
          "Participate in classroom discussions & quizzes",
          "Track personal accessibility skill milestones",
        ],
      }
  }
}

export default function UserProfile({
  user: userProp,
  className,
  children,
}: UserProfileProps) {
  const { data: fetchedUser, isLoading } = useCheckToken()
  const currentUser = userProp ?? fetchedUser

  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function handleCopy(text: string, key: string) {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev))
    }, 2000)
  }

  if (isLoading && !currentUser) {
    return (
      <div className={cn("mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6", className)}>
        <Card className="overflow-hidden border-border/60">
          <Skeleton className="h-32 w-full" />
          <div className="space-y-4 p-6 pt-0">
            <div className="-mt-12 flex items-end gap-4">
              <Skeleton className="size-24 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    )
  }

  if (!currentUser?.user) {
    return (
      <Card className={cn("mx-auto w-full max-w-5xl border-border/60 p-8 text-center", className)}>
        <CardHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
            <UserIcon className="size-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">No Profile Data Available</CardTitle>
          <CardDescription>
            Could not find user credentials. Please ensure you are logged in.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const { user, role } = currentUser
  const roleConfig = getRoleConfig(role)
  const RoleIcon = roleConfig.icon

  return (
    <div className={cn("mx-auto w-full max-w-5xl space-y-6", className)}>
      {/* Hero Header Card */}
      <Card className="overflow-hidden border-border/60 bg-card shadow-xs">
        {/* Decorative Tone-on-tone Banner */}
        <div className="relative h-32 w-full overflow-hidden border-b border-border/40 bg-gradient-to-r from-muted/80 via-accent/30 to-muted/60">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="absolute top-3 right-4 flex items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1.5 border-border/60 bg-background/80 px-2.5 py-1 text-xs backdrop-blur-xs"
            >
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-muted-foreground">Active Session</span>
            </Badge>
          </div>
        </div>

        {/* User Identity Info */}
        <div className="p-4 sm:p-6 sm:pt-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            {/* Avatar & Display Name */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="-mt-14 relative inline-block">
                <Avatar className="size-24 rounded-full border-4 border-background bg-muted shadow-md ring-1 ring-border/50">
                  <AvatarImage
                    src={user.profile_picture || undefined}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground capitalize sm:text-3xl">
                    {user.name}
                  </h1>
                  <Badge
                    variant="outline"
                    className={cn(
                      "gap-1.5 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
                      roleConfig.badgeClass
                    )}
                  >
                    <RoleIcon className="size-3.5" />
                    <span>{roleConfig.label}</span>
                  </Badge>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="size-3.5 text-muted-foreground/70" />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(user.email, "email")}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {copiedKey === "email" ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span>Copied Email</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(user.id, "id")}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {copiedKey === "id" ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span>Copied ID</span>
                  </>
                ) : (
                  <>
                    <Hash className="size-3.5" />
                    <span>Copy ID</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Basic Information Bento Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Card 1: Account Credentials */}
        <Card className="border-border/60 bg-card">
          <CardHeader className="border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Account Credentials</CardTitle>
                <CardDescription className="text-xs">
                  Primary identification details for this account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Full Name
              </span>
              <p className="text-sm font-medium text-foreground capitalize">
                {user.name}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email Address
              </span>
              <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/30 px-3 py-2">
                <span className="truncate text-sm text-foreground">{user.email}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(user.email, "email-box")}
                  aria-label="Copy email"
                  className="ml-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copiedKey === "email-box" ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Unique User Identifier
              </span>
              <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/30 px-3 py-2">
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {user.id}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(user.id, "id-box")}
                  aria-label="Copy User ID"
                  className="ml-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copiedKey === "id-box" ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Role & System Security */}
        <Card className="border-border/60 bg-card">
          <CardHeader className="border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <KeyRound className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Security & Access</CardTitle>
                <CardDescription className="text-xs">
                  Assigned permissions and session integrity
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Assigned Platform Role
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {roleConfig.label}
                </span>
                <Badge variant="outline" className={cn("text-xs", roleConfig.badgeClass)}>
                  {role}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground pt-0.5">
                {roleConfig.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Key Permissions
              </span>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {roleConfig.capabilities.map((capability, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500 mt-0.5" />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border/40 pt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Shield className="size-3.5 text-primary" />
                Session Authentication
              </span>
              <span className="font-mono text-foreground font-medium">HTTP-Only Cookie</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modular Extension Slot (for future user-specific renders) */}
      {children ? (
        <div className="space-y-4">{children}</div>
      ) : (
        <Card className="border-dashed border-border/70 bg-muted/10 p-6 text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted/60 text-muted-foreground mb-3">
            <Sparkles className="size-5" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Role Activity & Extensions Ready</h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
            Basic user profile loaded. User-specific renders (e.g. course progress, instructor classroom metrics, or administrative actions) will attach here.
          </p>
        </Card>
      )}
    </div>
  )
}
