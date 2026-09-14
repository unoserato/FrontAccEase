import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Unauthorized() {
  return (
    <div>
      Unauthorized
      <Link to="/" className={buttonVariants({ variant: "default" })}>
        Home
      </Link>
    </div>
  )
}
