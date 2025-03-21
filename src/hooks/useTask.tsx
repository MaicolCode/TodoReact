import { TaskContext } from '@/features/tasks/task'
import { useContext } from 'react'

function useTask() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('Contexto funcional :,3')
  }

  return context
}

export default useTask
