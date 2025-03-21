import { lazy, Suspense } from 'react'
import { Card } from '@/components/ui/card'

const SpotifyPlayer = lazy(() => import('@/components/spotify-player'))
const AISection = lazy(() => import('@/components/sections/AISection'))

function RepAndRes() {
  return (
    <div className='h-full w-full min-h-[300px] rounded-lg flex flex-col gap-2'>
      <Card className='h-[50%] shadow-[1px_3px_6px_1px] shadow-slate-200 dark:shadow-[1px_1px_5px_1px] dark:shadow-neutral-900 flex justify-center items-center p-5'>
        <Suspense fallback={<h1>Cargando...</h1>}>
          <SpotifyPlayer />
        </Suspense>
      </Card>
      <Card className='h-[50%] shadow-[1px_3px_6px_1px] shadow-slate-200 dark:shadow-[1px_1px_5px_1px] dark:shadow-neutral-900'>
        <AISection />
      </Card>
    </div>
  )
}

export default RepAndRes
