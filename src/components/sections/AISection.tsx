import { Bot, Sparkles, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import useTask from '@/hooks/useTask'
import { SkeletonCard } from '@/components/ai-skeleton'
import AIFetch from '@/features/ai/aifetch'

function AISection() {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const { completeTasks, incompleteTasks } = useTask()
  console.log(completeTasks, incompleteTasks)

  const enable = completeTasks.length > 0 || incompleteTasks.length > 0

  const generateSummary = async () => {
    setSummary('')
    setLoading(true)
    try {
      const response = await AIFetch(completeTasks, incompleteTasks)

      const data = await response.json()

      setSummary(data.choices[0].message.content)
    } catch (error) {
      console.error('Error generando el resumen:', error)
      setSummary('Hubo un error al generar el resumen.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <CardContent className='relative px-4 flex flex-col space-y-3 h-full'>
      <div id='aidiv' className='w-full flex justify-end'>
        <Button
          name='resume'
          aria-label='Resume'
          aria-labelledby='aidiv'
          className='bg-yellow-200 text-black hover:bg-yellow-100 text-xs'
          size={'sm'}
          onClick={generateSummary}
          disabled={loading || !enable}
        >
          <Sparkles /> Generate Resume
        </Button>
      </div>
      {loading && <SkeletonCard />}
      {!summary && !loading && (
        <div className='w-full h-full flex flex-col justify-center items-center text-zinc-400 '>
          <Bot size={40} strokeWidth={1.1} />
          <span className='text-xs'>Generate a resume with AI...</span>
        </div>
      )}
      {summary && (
        <Textarea
          placeholder='AI-generated resume for more experience in your tasks...'
          className='w-full h-[90%] resize-none border-0 text-muted-foreground '
          defaultValue={summary}
          readOnly
        ></Textarea>
      )}
      {summary && (
        <Button
          name='deleteResume'
          aria-label='DeleteResume'
          aria-labelledby='aidiv'
          onClick={() => setSummary('')}
          className='absolute bottom-0 right-4 w-8 h-8'
        >
          <Trash size={5} />
        </Button>
      )}
    </CardContent>
  )
}

export default AISection
