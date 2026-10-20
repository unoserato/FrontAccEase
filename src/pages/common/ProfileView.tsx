import { useRef, useState } from "react"
import { useCheckToken } from "@/services/tanstack/auth"
import { useUploadProfileImage } from "@/services/tanstack/users"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import {
  BookOpen,
  Camera,
  Check,
  CheckCircle2,
  Copy,
  GraduationCap,
  KeyRound,
  Loader2,
  Mail,
  Shield,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react"
import { cn } from "cn"
import copyText from "@/hooks/copy-text"
import PageSkeleton from "@/components/skeleton/PageSkeleton"
import type { UserRole } from "@/const/props/userProps"

function getInitials(name?: string): string {
  if (!name) return "U"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface RoleConfig {
  label: string
  bannerText: string
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
        bannerText: "ADMINISTRATOR",
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
        bannerText: "INSTRUCTOR",
        icon: BookOpen,
        badgeClass:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        description:
          "Authoring, curriculum, and student assessment privileges.",
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
        bannerText: "LEARNER",
        icon: GraduationCap,
        badgeClass:
          "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
        description:
          "Interactive learning, evaluation tools, and personal progress.",
        capabilities: [
          "Access interactive accessibility modules",
          "Run web accessibility analyzer scans",
          "Participate in classroom discussions & quizzes",
          "Track personal accessibility skill milestones",
        ],
      }
  }
}

export default function ProfileView() {
  const { data: userProps, isLoading } = useCheckToken()
  const uploadMutation = useUploadProfileImage()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function handleCopy(text: string, key: string) {
    if (!text) return
    copyText({
      textToCopy: text,
      setCopied: (val) => setCopiedKey(val ? key : null),
      timeout: 2000,
    })
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate image MIME type
    if (!file.type.startsWith("image/")) {
      toast.add({
        title: "Invalid File Type",
        description: "Please select an image file (PNG, JPG, JPEG, WEBP).",
        type: "error",
      })
      return
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        title: "File Too Large",
        description: "Please select an image smaller than 5 MB.",
        type: "error",
      })
      return
    }

    uploadMutation.mutate(file, {
      onSuccess: () => {
        toast.add({
          title: "Profile Photo Updated",
          description: "Your new profile picture has been saved.",
          type: "success",
        })
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      },
      onError: () => {
        toast.add({
          title: "Upload Failed",
          description: "Could not upload profile picture. Please try again.",
          type: "error",
        })
      },
    })
  }

  if (isLoading && !userProps) {
    return <PageSkeleton />
  }

  if (!userProps?.user) {
    return (
      <section className="p-responsive">
        <Card className="border-border/60 p-8 text-center">
          <CardHeader>
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
              <UserIcon className="size-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">No Profile Data Available</CardTitle>
            <CardDescription>
              Could not find your user credentials. Please ensure you are logged
              in.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    )
  }

  const { user, role } = userProps
  const roleConfig = getRoleConfig(role)
  const RoleIcon = roleConfig.icon

  return (
    <section className="p-responsive space-y-6">
      {/* Hidden file input for photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload profile image"
      />

      {/* Hero Header Card */}
      <Card className="overflow-hidden border-border/70 bg-card shadow-xs">
        {/* Banner: Typographic Role in ALL CAPS spanning across the entire length */}
        <div className="relative flex h-24 w-full items-center justify-center overflow-hidden border-b border-border/40 bg-muted/30 select-none sm:h-28">
          <span className="pointer-events-none w-full text-center font-heading text-4xl font-black tracking-widest whitespace-nowrap text-foreground/[0.07] uppercase select-none sm:text-6xl md:text-7xl lg:text-8xl dark:text-foreground/9">
            {roleConfig.bannerText}
          </span>
        </div>

        {/* User Identity Info */}
        <div className="p-4 sm:p-6 sm:pt-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            {/* Avatar & Display Name */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="group relative -mt-12 inline-block sm:-mt-14">
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

                {/* Avatar upload overlay trigger on hover */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadMutation.isPending}
                  title="Upload profile photo"
                  aria-label="Upload profile photo"
                  className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-100"
                >
                  {uploadMutation.isPending ? (
                    <Loader2 className="size-6 animate-spin text-white" />
                  ) : (
                    <Camera className="size-6 text-white" />
                  )}
                </button>

                {/* Small camera badge in corner */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadMutation.isPending}
                  title="Change profile photo"
                  aria-label="Change profile photo"
                  className="absolute right-0 bottom-0 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-foreground text-background shadow-xs transition-transform hover:scale-110 disabled:opacity-70"
                >
                  {uploadMutation.isPending ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Camera className="size-3.5" />
                  )}
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground capitalize sm:text-3xl">
                    {user.name}
                  </h1>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "gap-1.5 border-0 px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase",
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
          </div>
        </div>
      </Card>

      {/* Main Content Grid: Account Information & Security */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1: Account Credentials */}
        <Card className="border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/40 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">
                  Account Credentials
                </CardTitle>
                <CardDescription className="text-xs">
                  Primary identification details for this account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Full Name
              </span>
              <p className="text-sm font-medium text-foreground capitalize">
                {user.name}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Email Address
              </span>
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3.5 py-2.5">
                <span className="truncate text-sm font-medium text-foreground">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(user.email, "email")}
                  aria-label="Copy email address"
                  className="inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {copiedKey === "email" ? (
                    <>
                      <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span className="font-mono text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                User Identifier
              </span>
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3.5 py-2.5">
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {user.id}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(user.id, "id")}
                  aria-label="Copy User ID"
                  className="inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {copiedKey === "id" ? (
                    <>
                      <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span className="font-mono text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Security & Access */}
        <Card className="border-border/70 bg-card shadow-xs">
          <CardHeader className="border-b border-border/40 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <KeyRound className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">
                  Security & Access
                </CardTitle>
                <CardDescription className="text-xs">
                  Platform privileges, role scope, and session security
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Platform Role
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {roleConfig.label}
                </span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "border-0 text-xs font-semibold tracking-wider uppercase",
                    roleConfig.badgeClass
                  )}
                >
                  {role}
                </Badge>
              </div>
              <p className="pt-0.5 text-xs leading-relaxed text-muted-foreground">
                {roleConfig.description}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Key Permissions
              </span>
              <ul className="space-y-2">
                {roleConfig.capabilities.map((capability, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="leading-snug">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium">
                <Shield className="size-3.5 text-foreground/70" />
                Session Authentication
              </span>
              <span className="font-mono font-medium text-foreground/90">
                HTTP-Only Cookie (Encrypted)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
