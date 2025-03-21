import { ChangeStateParams, Task, TaskState } from '@/types'
import { create } from 'zustand'

const tasksInitialState: Task[] = JSON.parse(
  window.localStorage.getItem('tasks') || '[]'
)

const completeInitialState: Task[] = JSON.parse(
  window.localStorage.getItem('completeTasks') || '[]'
)

const incompleteInitialState: Task[] = JSON.parse(
  window.localStorage.getItem('incompleteTasks') || '[]'
)

const updateLocalStorage = (state: Array<Task>, type: string) => {
  window.localStorage.setItem(type, JSON.stringify(state))
}

const deleteLocalStorage = () => {
  window.localStorage.clear()
}

interface TaskStateActions {
  addTask: (task: Task) => void
  deleteTask: (id: number) => void
  completeState: (id: number, st: Task['state']) => void
  incompleteState: (id: number, st: Task['state']) => void
  cleanAllTasks: () => void
  updateTask: (id: number, updatedData: Partial<Task>) => void
}

const useTasksStore = create<TaskState & TaskStateActions>((set) => ({
  tasks: tasksInitialState,
  completeTasks: completeInitialState,
  incompleteTasks: incompleteInitialState,
  addTask: (task: Task) => {
    return set((state) => {
      const updatedTasks = [...state.tasks, task]
      updateLocalStorage(updatedTasks, 'tasks')
      return { tasks: updatedTasks }
    })
  },
  deleteTask: (id: number) => {
    return set((state) => {
      const filteredTasks = state.tasks.filter((task) => task.id !== id)
      updateLocalStorage(filteredTasks, 'tasks')
      return { tasks: filteredTasks }
    })
  },
  completeState: (id: number, st: Task['state']) => {
    return set((state) => {
      state.deleteTask(id)
      const updatedCompTasks: Task[] =
        changeState({
          tasks: state.tasks,
          stateTasks: state.completeTasks,
          id,
          st
        }) || []
      updateLocalStorage(updatedCompTasks, 'completeTasks')

      return { completeTasks: updatedCompTasks }
    })
  },
  incompleteState: (id: number, st: Task['state']) => {
    return set((state) => {
      state.deleteTask(id)
      const updatedCompTasks: Task[] =
        changeState({
          tasks: state.tasks,
          stateTasks: state.incompleteTasks,
          id,
          st
        }) || []

      updateLocalStorage(updatedCompTasks, 'incompleteTasks')

      return { incompleteTasks: updatedCompTasks }
    })
  },
  cleanAllTasks: () => {
    return set(() => {
      deleteLocalStorage()
      return {
        tasks: [],
        completeTasks: [],
        incompleteTasks: []
      }
    })
  },
  updateTask: (id: number, updatedData: Partial<Task>) => {
    return set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
      updateLocalStorage(updatedTasks, 'tasks')
      return { tasks: updatedTasks }
    })
  }
}))

function changeState({
  tasks,
  stateTasks,
  id,
  st
}: ChangeStateParams): Task[] | undefined {
  const taskFind = tasks.find((task) => task.id === id)

  if (!taskFind) return // Return the current state if task is not found
  const idUp = tasks.length > 0 ? stateTasks[stateTasks.length - 1]?.id + 1 : 1

  const newTask: Task = { ...taskFind, state: st, id: idUp }
  const updatedCompTasks: Task[] = [...stateTasks, newTask]

  return updatedCompTasks
}

export { useTasksStore }
