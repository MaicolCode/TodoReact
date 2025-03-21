import { lazy } from 'react'
import { TaskProvider } from './features/tasks/task'
import { Toaster } from 'sonner'
import './App.css'

const MovileWindow = lazy(() => import('./MovileWindow'))
const CompleteAndIncomplete = lazy(
  () => import('@/components/sections/CompleteAndIncomplete')
)
const Tasks = lazy(() => import('@/components/sections/Tasks'))
const RepAndRes = lazy(() => import('@/components/sections/RespAndRes'))

function App() {
  return (
    <>
      <section className='w-[480px] sm:w-[768px] h-dvh md:w-full hidden md:flex  justify-between p-10 box-border border m-[0px_auto] overflow-auto gap-2'>
        <TaskProvider>
          <CompleteAndIncomplete />
          <Tasks />
          <RepAndRes />
        </TaskProvider>
        <Toaster position='top-right' />
      </section>
      <MovileWindow />
    </>
  )
}

export default App
