import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

type ToolTip = {
  action?: () => void
  enable?: boolean
  description: string
  children: React.ReactNode
  styles?: string
}

export function ToolTipDemo({
  action,
  enable,
  description,
  children,
  styles
}: ToolTip) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className='p-0'>
          <Button
            variant='ghost'
            onClick={action}
            disabled={enable}
            className={styles}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
