import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import useTask from '@/hooks/useTask'
import { Task } from '@/types'
import { useState } from 'react'
import { InputDemo } from './input-demo'

export function DialogDemo({
  title,
  description,
  children,
  value
}: {
  title: string
  description: string
  children: React.ReactElement
  value?: Partial<Task>
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { updateTask } = useTask()
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const text = formData.get('input') as string

    if (value && 'id' in value && 'content' in value) {
      value.content = text
      if (value.id !== undefined) {
        updateTask(value.id, value)
      }
    }

    setIsDialogOpen(false)
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form action='' onSubmit={handleUpdate}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-1 items-center gap-4'>
              <Label htmlFor='task' className='text-right'>
                Task
              </Label>
              <InputDemo description={value?.content} />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
