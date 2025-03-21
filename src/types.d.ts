type Task = {
  id: number
  content: string
  state: string
}

interface TaskState {
  tasks: Array<Task>
  addTask: (task: Task) => void
  deleteTask: (id: number) => void
  completeState: (id: number, st: Task['state']) => void
  incompleteState: (id: number, st: Task['state']) => void
  completeTasks: Array<Task>
  incompleteTasks: Array<Task>
  cleanAllTasks: () => void
  updateTask: (id: number, updatedData: Partial<Task>) => void
}

interface ChangeStateParams {
  tasks: Task[]
  stateTasks: Task[]
  id: number
  st: Task['state']
}

interface Track {
  file: string
  image: string
  title: string
  type: string
}

export { Task, TaskState, ChangeStateParams, Track }
