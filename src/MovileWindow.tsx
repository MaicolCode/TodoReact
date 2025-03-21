import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { TaskProvider } from '@/features/tasks/task'
import { lazy, Suspense } from 'react'
import { Toaster } from 'sonner'

const CompleteAndIncomplete = lazy(
  () => import('@/components/sections/CompleteAndIncomplete')
)
const Tasks = lazy(() => import('@/components/sections/Tasks'))
const RepAndRes = lazy(() => import('@/components/sections/RespAndRes'))

function MovileWindow() {
  return (
    <section className='w-full h-dvh  md:hidden flex justify-center items-center'>
      <Carousel
        className='h-full w-full rounded-lg'
        opts={{
          startIndex: 1,
          loop: true
        }}
      >
        <CarouselContent className='h-full p-2'>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <Suspense fallback={<h1>Cargando componentes...</h1>}>
                <TaskProvider>
                  {index === 0 && <CompleteAndIncomplete />}
                  {index === 1 && <Tasks />}
                  {index === 2 && <RepAndRes />}
                </TaskProvider>
              </Suspense>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Toaster position='bottom-right' />
    </section>
  )
}

export default MovileWindow
