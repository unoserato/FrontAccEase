import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui/button"
import { Grid, List } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface Props {
  gridView: boolean
  setGridView: (value: boolean) => void
}

export default function GridListButtonGroupTemplate({
  gridView,
  setGridView,
}: Props) {
  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant={gridView ? "default" : "outline"}
              onClick={() => !gridView && setGridView(true)}
            >
              <Grid />
            </Button>
          }
        />
        <TooltipContent>Grid layout</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant={!gridView ? "default" : "outline"}
              onClick={() => gridView && setGridView(false)}
            >
              <List />
            </Button>
          }
        />
        <TooltipContent>List layout</TooltipContent>
      </Tooltip>
    </ButtonGroup>
  )
}
