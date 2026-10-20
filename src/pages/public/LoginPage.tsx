// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { ModeToggle } from "@/components/modeToggle"
// import { ShieldCheck, ArrowLeft, ArrowRight, Lock, Mail } from "lucide-react"

// export default function LoginPage() {
//   const navigate = useNavigate()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setTimeout(() => {
//       setIsLoading(false)
//       // Default to learner dashboard upon form submission
//       navigate("/learner/dashboard")
//     }, 600)
//   }

//   return (
//     <div className="flex min-h-screen w-full flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
//       {/* Centered Auth Card */}
//       <main className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
//         <div className="w-full max-w-md space-y-6">
//           <div className="space-y-2 text-center">
//             <Link
//               to="/"
//               className="mb-2 inline-flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-transform hover:scale-105"
//               aria-label="FrontAccEase Home"
//             >
//               <ShieldCheck className="size-5" />
//             </Link>
//             <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
//               Welcome back
//             </h1>
//             <p className="text-xs text-muted-foreground sm:text-sm">
//               Sign in to access your modules, quizzes, and accessibility tools.
//             </p>
//           </div>

//           <Card className="border-border shadow-md">
//             <form onSubmit={handleSubmit}>
//               <CardContent className="space-y-4 pt-6">
//                 <div className="space-y-1.5">
//                   <Label htmlFor="login-email">Email Address</Label>
//                   <div className="relative">
//                     <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="login-email"
//                       type="email"
//                       required
//                       placeholder="student@university.edu"
//                       className="pl-9"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-1.5">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="login-password">Password</Label>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         alert(
//                           "Password reset instructions will be sent to your institutional email address."
//                         )
//                       }
//                       className="text-xs font-medium text-primary hover:underline focus-visible:outline-1 focus-visible:outline-primary"
//                     >
//                       Forgot password?
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="login-password"
//                       type="password"
//                       required
//                       placeholder="••••••••"
//                       className="pl-9"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="mt-2 h-10 w-full justify-center gap-2 font-semibold"
//                 >
//                   <span>{isLoading ? "Signing in..." : "Sign In"}</span>
//                   <ArrowRight className="size-4" />
//                 </Button>
//               </CardContent>

//               <CardFooter className="flex flex-col items-center gap-3 border-t border-border bg-muted/30 p-4 text-xs">
//                 <div className="text-muted-foreground">
//                   Don&apos;t have an account?{" "}
//                   <Link
//                     to="/signup"
//                     className="font-semibold text-primary hover:underline"
//                   >
//                     Create an account
//                   </Link>
//                 </div>
//               </CardFooter>
//             </form>
//           </Card>

//           {/* Quick Demo Access Bar */}
//           <div className="space-y-2 rounded-xl border border-border bg-card p-3.5 text-center">
//             <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
//               Quick Role Preview
//             </p>
//             <div className="grid grid-cols-3 gap-2">
//               <Link
//                 to="/learner/dashboard"
//                 className="rounded-md border border-border bg-muted/50 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
//               >
//                 Learner
//               </Link>
//               <Link
//                 to="/instructor/dashboard"
//                 className="rounded-md border border-border bg-muted/50 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
//               >
//                 Instructor
//               </Link>
//               <Link
//                 to="/admin/dashboard"
//                 className="rounded-md border border-border bg-muted/50 py-1 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
//               >
//                 Admin
//               </Link>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Minimal Footer */}
//       <footer className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
//         <p>
//           © {new Date().getFullYear()} FrontAccEase. WCAG 2.1 &amp; 2.2 AA
//           Aligned Educational Platform.
//         </p>
//       </footer>
//     </div>
//   )
// }
