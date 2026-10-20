import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import type { ReactNode } from "react"

interface ToolTipTemplateProps {
  content: string
  triggerTextIcon: string | ReactNode
  triggerVariant: "default" | "ghost" | "outline" | "secondary" | "destructive"
  align?: "center" | "end" | "start"
  onClick?: () => void
}

export default function TooltipButtonTemplate({
  content,
  triggerTextIcon,
  triggerVariant,
  align,
  onClick,
}: ToolTipTemplateProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant={triggerVariant}>{triggerTextIcon}</Button>}
        onClick={onClick}
      />
      <TooltipContent align={align}>{content}</TooltipContent>
    </Tooltip>
  )
}
