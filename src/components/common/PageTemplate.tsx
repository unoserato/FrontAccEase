import { useEffect, type ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { ChevronLeft, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "cn"

interface HeaderTemplateProps {
  title?: string
  subtitle?: string | ReactNode
  cta?: ReactNode[]
  backTo?: string
  classname?: string
  changeTitle?: boolean
}

export default function HeaderTemplate({
  title = "Page Title",
  subtitle,
  cta,
  backTo,
  classname,
  changeTitle = true,
}: HeaderTemplateProps) {
  const isMobile = useIsMobile()
  const hasCta = Boolean(cta && cta.length > 0)

  const navigate = useNavigate()

  function handleBack() {
    if (backTo)
      if (backTo == "-1") {
        navigate(-1)
      } else {
        navigate(backTo)
      }
  }

  useEffect(() => {
    if (changeTitle) {
      document.title = `${title} | FrontAccEase`
    }
  }, [changeTitle, title])

  return (
    <header className={cn("space-y-6", classname)}>
      {backTo && (
        <Button onClick={handleBack} variant={"ghost"} size={"xs"}>
          <ChevronLeft />
          Back
        </Button>
      )}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight capitalize md:text-2xl lg:text-3xl">
            {title}
          </h1>
          {subtitle && <p className="text-base">{subtitle}</p>}
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
