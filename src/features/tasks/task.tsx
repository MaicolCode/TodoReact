import { TaskState } from '@/types'
import { createContext } from 'react'
import { useTasksStore } from './reducer'

const TaskContext = createContext<TaskState | null>(null)

function TaskProvider({ children }: { children: React.ReactNode }) {
  const taskStore = useTasksStore()

  return (
    <TaskContext.Provider value={taskStore}>{children}</TaskContext.Provider>
  )
}

export { TaskProvider, TaskContext }
