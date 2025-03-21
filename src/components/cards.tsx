import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Check, Ellipsis, Pencil, StickyNote, Trash, X } from 'lucide-react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@radix-ui/react-menubar'
import useTask from '@/hooks/useTask'
import { ToolTipDemo } from './tooltip-demo'
import { DialogDemo } from '@/components/dialog-edit'

interface CardWithActionsProps {
  actions: boolean
  state: string
  content?: string
  id?: number
}

function CardTask({ ...props }: CardWithActionsProps) {
  const status =
    props.state.toLowerCase() === 'complete'
      ? ''
      : ' bg-neutral-100 dark:bg-neutral-800'
  return (
    <Card
      className={`border py-4 text-sm  ${
        props.state === 'Pending' ? '' : `${status} + text-xs`
      } hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-500`}
    >
      <CardContent>
        <div className='flex justify-center items-center '>
          <div className='flex items-center space-x-4 w-full px-2'>
            <StickyNote />
            <div className='overflow-auto flex flex-col space-y-1'>
              <p>{props.content}</p>
            </div>
          </div>
          <div className='flex flex-col space-y-1'>
            <div className='flex justify-end'>
              <Badge variant='secondary' className='block md:hidden'>
                {props.actions && props.state === 'Pending'
                  ? 'Pending'
                  : `${props.state.slice(0, 5)}...`}
              </Badge>
              <Badge variant='secondary' className='hidden md:block'>
                {props.actions && props.state === 'Pending'
                  ? 'Pending'
                  : `${props.state.slice(0, 5)}...`}
              </Badge>
            </div>
            {props.actions && <CardActions id={props?.id || 0} />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CardActions({ id }: { id: number }) {
  const { deleteTask, completeState, incompleteState, tasks } = useTask()

  const taskSelect = tasks.filter((task) => task.id === id)

  return (
    <Menubar className='text-center md:text-right'>
      <MenubarMenu>
        <MenubarTrigger className='p-2'>
          <Ellipsis />
        </MenubarTrigger>
        <MenubarContent
          className='border rounded-lg shadow-lg bg-white dark:bg-neutral-900'
          align='center'
        >
          <MenubarItem>
            <ToolTipDemo
              action={() => completeState(id, 'Complete')}
              description='Complete Task'
            >
              <Check />
            </ToolTipDemo>
          </MenubarItem>
          <DialogDemo
            title='Edit User'
            description={
              'Make changes to your task here. Click save when you are done.'
            }
            value={taskSelect[0]}
          >
            <MenubarItem onSelect={(e) => e.preventDefault()}>
              <ToolTipDemo description='Edit Task'>
                <Pencil />
              </ToolTipDemo>
            </MenubarItem>
          </DialogDemo>
          <MenubarItem>
            <ToolTipDemo
              action={() => incompleteState(id, 'Incomplete')}
              description='Incomplete Task'
            >
              <X />
            </ToolTipDemo>
          </MenubarItem>
          <MenubarItem>
            <ToolTipDemo
              description='Delete Task'
              action={() => deleteTask(id)}
            >
              <Trash />
            </ToolTipDemo>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
export { CardTask }
