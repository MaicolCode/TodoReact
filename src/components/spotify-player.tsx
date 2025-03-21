import { useState, useRef, useEffect, memo, useCallback } from 'react'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Track } from '@/types'
import { Button } from './ui/button'

export default function SpotifyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [sampleTrack, setSampleTrack] = useState<Track[]>([])
  const [music, setMusic] = useState(0)

  const cont = useRef<number>(0)

  // Sample track - using a royalty-free music sample
  useEffect(() => {
    fetch('./playlists.json')
      .then((response) => response.json())
      .then((data) => setSampleTrack(data))
      .catch((error) => console.error('JSON error detected: ', error))
  }, [])

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Handle play/pause
  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  // Handle seeking
  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  // Handle metadata loaded
  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleBack = useCallback(() => {
    cont.current--
    setMusic(cont.current)
    setIsPlaying(false)
  }, [])

  const handleForward = useCallback(() => {
    cont.current++
    setMusic(cont.current)
    setIsPlaying(false)
  }, [])

  // Set initial volume when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  return (
    <div className='w-full max-w-md md:h-full bg-[#121212] text-white rounded-lg overflow-hidden shadow-md'>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={sampleTrack[music]?.file}
        preload='metadata'
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleMetadataLoaded}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Album art and info */}
      <div className='flex flex-col items-start gap-3'>
        <div className='relative flex flex-col justify-center items-center w-full'>
          <img
            src={sampleTrack[music]?.image}
            alt={sampleTrack[music]?.title}
            className='w-full object-cover h-64 opacity-80'
            loading='lazy'
          />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 z-10'>
            <div className='flex-grow min-w-0'>
              <h3 className='font-medium text-sm truncate text-clip'>
                {sampleTrack[music]?.title}
              </h3>
              <p className='text-xs text-zinc-200 truncate'>
                {sampleTrack[music]?.type}
              </p>
            </div>
            {/* Controls */}
            <Controls
              actionPlay={togglePlay}
              actionBack={handleBack}
              actionForward={handleForward}
              start={isPlaying}
              indexMusic={music}
              lengthMusic={sampleTrack.length}
            />
          </div>
        </div>

        <div id='controlRepdiv' className='p-4 w-full hidden md:block'>
          {/* Progress bar */}
          <div className='pb-2'>
            <Slider
              id='charge'
              aria-label='Charge'
              aria-labelledby='controlRepdiv'
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className='my-2'
            />
            <div className='flex justify-between text-xs text-zinc-200'>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume control */}
          <div className='flex items-center gap-2'>
            <Volume2 className='h-4 w-4 text-white' />
            <Slider
              id='volume'
              aria-label='Volume'
              aria-labelledby='controlRepdiv'
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className='w-24'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Controls = memo(function Controls({
  actionPlay,
  actionForward,
  actionBack,
  start,
  indexMusic,
  lengthMusic
}: {
  actionPlay: () => void
  actionForward: () => void
  actionBack: () => void
  start: boolean
  indexMusic: number
  lengthMusic: number
}) {
  const enableBack = indexMusic > 0
  const enableForward = indexMusic == lengthMusic - 1
  return (
    <div className='px-4 pb-4'>
      <div
        id='reproductordiv'
        className='flex items-center justify-center gap-4 mb-4'
      >
        <Button
          id='back'
          aria-label='Back'
          aria-labelledby='reproductordiv'
          onClick={actionBack}
          className='p-2 bg-transparent text-zinc-50 hover:bg-transparent hover:text-yellow-200'
          disabled={!enableBack}
        >
          <SkipBack className='h-5 w-5' strokeWidth={2.51} />
        </Button>
        <button
          id='start'
          aria-label='Start'
          aria-labelledby='reproductordiv'
          onClick={actionPlay}
          className='p-3 bg-white text-black rounded-full hover:scale-105 transition-transform'
        >
          {start ? (
            <Pause className='h-5 w-5' />
          ) : (
            <Play className='h-5 w-5 ml-0.5' />
          )}
        </button>
        <Button
          id='forward'
          aria-label='Forward'
          aria-labelledby='reproductordiv'
          onClick={actionForward}
          className='p-2 bg-transparent text-zinc-50 hover:bg-transparent hover:text-yellow-200'
          disabled={enableForward}
        >
          <SkipForward className='h-5 w-5' strokeWidth={2.51} />
        </Button>
      </div>
    </div>
  )
})
