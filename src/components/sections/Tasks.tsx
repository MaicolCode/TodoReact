import { Label } from '@radix-ui/react-menubar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardTask } from '@/components/cards'
import { Task } from '@/types'
import useTask from '@/hooks/useTask'
import ThemeSwitcher from '@/components/theme-switcher'
import { toast } from 'sonner'
import { useState } from 'react'
import { AlertDialogDemo } from '@/components/dialog-alert-demo'
import { Eraser, Plus, Sticker } from 'lucide-react'

function Tasks() {
  const [text, setText] = useState('')
  const [required, setRequired] = useState(false)
  const { tasks, addTask, cleanAllTasks, completeTasks, incompleteTasks } =
    useTask()
  const maxChars = 150
  const enable =
    tasks.length > 0 || incompleteTasks.length > 0 || completeTasks.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value

    if (newText.length <= maxChars) {
      setText(newText)
    }

    if (required) {
      if (newText.length < 10) {
        setRequired(true)
      } else {
        setRequired(false)
      }
    }
  }

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const id: number = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1

    const task: string = formData.get('task') as string

    if (task.length < 10) {
      setRequired(true)
      return toast.error(
        'Hey, wait, you need to write a text with 10 characters.'
      )
    }

    const newTask: Task = { id, content: task, state: 'Pending' }
    addTask(newTask)

    setText('')
  }

  return (
    <section className='relative h-full w-full md:w-[150%] min-h-[300px] flex flex-col gap-5 rounded-lg shadow-[1px_3px_6px_1px] shadow-slate-200 dark:shadow-[1px_1px_5px_1px] dark:shadow-neutral-900 dark:bg-neutral-900 py-6'>
      <div className='flex flex-col gap-3 px-6 h-full  overflow-auto '>
        <form className='flex flex-col gap-3' onSubmit={handleClick}>
          <span className='font-semibold'>
            Welcome your site for your tasks.
          </span>
          <div id='labeldiv' className='flex flex-col space-y-1.5'>
            <Label className='text-xs text-muted-foreground'>
              Insert your new task
            </Label>
            <div className='flex justify-between gap-1'>
              <div className='w-full flex flex-col space-y-2'>
                <Input
                  id='task'
                  name='task'
                  placeholder='Your task...'
                  onChange={handleChange}
                  value={text}
                  className={`${
                    (required || text.length === maxChars) &&
                    'border border-orange-500 bg-red-50 text-orange-400 focus-visible:border-orange-400 focus-visible:ring-orange-300'
                  }`}
                />
                <p
                  className={`text-xs text-end ${
                    text.length === maxChars && 'text-orange-400'
                  }`}
                >
                  {text.length} / {maxChars} characters
                </p>
              </div>
              <Button
                id='addTask'
                aria-label='AddTask'
                aria-labelledby='labeldiv'
                variant='default'
                data-testid='addTask'
                size='icon'
                className='bg-yellow-200 text-black shadow-sm hover:bg-yellow-100 '
              >
                <Plus />
              </Button>
            </div>
          </div>
        </form>
        <div className='flex flex-col space-y-3 h-full mt-2'>
          {tasks.length > 0 ? (
            tasks?.map((task: Task) => (
              <CardTask
                key={task.id}
                actions={true}
                state={task.state}
                content={task.content}
                id={task?.id}
              />
            ))
          ) : (
            <div className='h-full w-full flex flex-col justify-center items-center text-xs text-zinc-400'>
              <Sticker size={50} strokeWidth={1} />
              <span>Add the tasks you are going to focus on.</span>
            </div>
          )}
        </div>
      </div>
      <ThemeSwitcher />

      <div className='absolute bottom-5 right-5'>
        <AlertDialogDemo
          title={'Delete all Tasks'}
          description='This action will delete all the entered tasks.'
          action={cleanAllTasks}
          enable={!enable}
        >
          <Eraser />
        </AlertDialogDemo>
      </div>
    </section>
  )
}

export default Tasks
