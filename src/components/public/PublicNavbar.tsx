import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { ModeToggle } from "@/components/modeToggle"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, ArrowRight, ShieldCheck } from "lucide-react"
import { publicNav } from "@/const/navigation"
import { Logo } from "../common/Logo"

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="FrontAccEase Home"
        >
          <Logo className="size-8 text-foreground" aria-hidden="true" />
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-foreground">
              FrontAccEase
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex md:items-center md:gap-1 lg:gap-2"
          aria-label="Primary navigation"
        >
          {publicNav.map((item) => {
            // const active = isActive(item.href)
            return (
              <NavLink
                key={item.name}
                to={item.href}
                // aria-current={ ? "page" : undefined}
                className={({ isActive }) =>
                  `relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive
                      ? "font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-3 h-0.5 rounded-full bg-primary" />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />

          <div className="hidden sm:flex sm:items-center sm:gap-2">
            <Link
              to="/login"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              <span>Get Started</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-sm",
                })}
                aria-label="Open mobile navigation menu"
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-80">
                <SheetHeader className="pb-4 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <ShieldCheck className="size-4" />
                    </div>
                    <span className="font-heading text-base font-bold">
                      FrontAccEase
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 py-4">
                  <p className="px-3 pb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Navigation
                  </p>
                  {publicNav.map((item) => {
                    // const active = isActive(item.href)
                    return (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}

                        // aria-current={active ? "page" : undefined}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-primary/10 font-semibold text-primary"
                              : "text-foreground hover:bg-muted"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    )
                  })}
                </div>
                <div className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full justify-center",
                    })}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className={buttonVariants({
                      variant: "default",
                      className: "w-full justify-center",
                    })}
                  >
                    Get Started
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
