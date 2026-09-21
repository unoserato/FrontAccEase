import type { ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button, buttonVariants } from "../ui/button"
import { ChevronLeft, Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "cn"

interface HeaderTemplateProps {
  title?: string
  subtitle?: string
  cta?: ReactNode[]
  backTo?: string
  classname?: string
}

export default function HeaderTemplate({
  title = "Page Title",
  subtitle = "Page Subtitle",
  cta,
  backTo,
  classname,
}: HeaderTemplateProps) {
  const isMobile = useIsMobile()
  const hasCta = Boolean(cta && cta.length > 0)

  document.title = `${title} | FrontAccEase`
  return (
    <header className={cn("space-y-6", classname)}>
      {backTo && (
        <Link
          to={backTo}
          className={cn(buttonVariants({ variant: "ghost", size: "xs" }))}
        >
          <ChevronLeft />
          Back
        </Link>
      )}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-bold tracking-tight capitalize sm:text-xl md:text-2xl lg:text-3xl">
            {title}
          </h1>
          <p className="text-base">{subtitle}</p>
        </div>
        {hasCta &&
          (!isMobile ? (
            <div className="flex items-center gap-2">
              {cta!.map((btn, index) => (
                <div key={index} className="flex items-center">
                  {btn}
                </div>
              ))}
            </div>
          ) : (
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    size="icon"
                    className="fixed right-10 bottom-10 z-50 h-12 w-12 rounded-full shadow-lg"
                    aria-label="Actions"
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                }
              />
              <PopoverContent className={"w-fit"} align="end">
                {cta!.map((btn, index) => (
                  <div key={index} className="">
                    {btn}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          ))}
      </div>
    </header>
  )
}
