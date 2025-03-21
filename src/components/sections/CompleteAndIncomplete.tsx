import useTask from '@/hooks/useTask'
import { CardTask } from '@/components/cards'
import { MiniCardPresentation } from '@/components/mini-card'

function CompleteAndIncomplete() {
  const { completeTasks, incompleteTasks } = useTask()

  return (
    <div
      className='h-full w-full min-h-[300px] flex flex-col justify-center items-center
    rounded-lg shadow-[1px_3px_6px_1px] shadow-slate-200 dark:shadow-[1px_1px_5px_1px] dark:shadow-neutral-900 dark:bg-neutral-900 py-2'
    >
      <div className='h-[49%] rounded-b-none overflow-auto scrol'>
        <div className='flex flex-col gap-3 px-3 h-full w-full'>
          {completeTasks.length > 0 ? (
            completeTasks.map((task, index) => (
              <CardTask
                key={index}
                actions={false}
                state={task.state}
                content={task.content}
                id={task.id}
              />
            ))
          ) : (
            <MiniCardPresentation text='Your complete Tasks.' />
          )}
        </div>
      </div>
      <div className='h-[49%] w-full rounded-t-none border-t-1 pt-2 border-dashed border-slate-200 dark:border-neutral-800 overflow-auto mt-2'>
        <div className='flex flex-col gap-3 px-3 h-full w-full'>
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((task, index) => (
              <CardTask
                key={index}
                actions={false}
                state={task.state}
                content={task.content}
                id={task.id}
              />
            ))
          ) : (
            <MiniCardPresentation text='Your incomplete Tasks.' />
          )}
        </div>
      </div>
    </div>
  )
}

export default CompleteAndIncomplete
