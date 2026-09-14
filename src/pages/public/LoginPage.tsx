import { ModeToggle } from "@/components/modeToggle"
import { buttonVariants } from "@/components/ui/button"
import { publicNav } from "@/const/navigation"
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-2">
      {publicNav.map((link) => (
        <Link
          key={link.name}
          to={link.href}
          className={buttonVariants({ variant: "default" })}
        >
          {link.name}
        </Link>
      ))}
      <ModeToggle />
    </div>
  )
}
