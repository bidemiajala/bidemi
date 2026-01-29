'use client'
import { useState, useEffect } from 'react'
import { ImageLoader } from './ui/spinner'

interface SpotifyData {
  isPlaying: boolean
  title: string | null
  artist: string | null
  album: string | null
  albumImageUrl: string | null
  songUrl: string | null
  timestamp: number | null
  duration?: number | null
  progress?: number | null
  releaseDate?: string | null
  explicit?: boolean
  popularity?: number | null
  trackNumber?: number | null
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [currentProgress, setCurrentProgress] = useState<number | null>(null)
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0)

  useEffect(() => {
    let apiInterval: NodeJS.Timeout | null = null
    
    const fetchSpotifyData = async () => {
      // Don't fetch if page is not visible (saves resources when user tabs away)
      if (document.hidden) {
        return
      }
      
      try {
        const response = await fetch('/api/spotify')
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const spotifyData = await response.json()
        setData(spotifyData)
        
        // Update progress tracking
        if (spotifyData.isPlaying && spotifyData.progress !== null && spotifyData.progress !== undefined) {
          // Only update if this is a different song or if we were not playing before
          if (!data?.isPlaying || data?.title !== spotifyData.title) {
            setCurrentProgress(spotifyData.progress)
            setLastUpdateTime(Date.now())
          }
        } else {
          setCurrentProgress(null)
        }
        
        setError(false)
      } catch (err) {
        console.error('Error fetching Spotify data:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    const startPolling = () => {
      fetchSpotifyData()
      apiInterval = setInterval(fetchSpotifyData, 20000)
    }

    const stopPolling = () => {
      if (apiInterval) {
        clearInterval(apiInterval)
        apiInterval = null
      }
    }

    // Start initial polling
    startPolling()
    
    // Pause polling when page is hidden, resume when visible (saves resources)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling()
      } else {
        startPolling()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      stopPolling()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Real-time progress bar updates
  useEffect(() => {
    if (!data?.isPlaying || currentProgress === null || !data.duration) {
      return
    }

    const progressInterval = setInterval(() => {
      const now = Date.now()
      const timeSinceUpdate = now - lastUpdateTime
      const newProgress = currentProgress + timeSinceUpdate
      
      // Don't go beyond song duration
      if (data.duration && newProgress <= data.duration) {
        setCurrentProgress(newProgress)
        setLastUpdateTime(now)
      }
    }, 1000) // Update every second

    return () => clearInterval(progressInterval)
  }, [data?.isPlaying, currentProgress, data?.duration, lastUpdateTime])

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl bg-zinc-100 p-6 dark:bg-zinc-900">
        <ImageLoader />
      </div>
    )
  }

  if (error || !data || !data.title) {
    return (
      <div className="rounded-xl bg-zinc-100 p-6 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-zinc-400 dark:text-zinc-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-6h2v6zm0-8H9V6h2v2zm1 8h2v-4c0-1.1.9-2 2-2s2 .9 2 2v4h2v-4c0-2.21-1.79-4-4-4s-4 1.79-4 4v4z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              No music data available
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Check back later for my music activity
            </p>
          </div>
        </div>
      </div>
    )
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} min ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hr ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`
    const weeks = Math.floor(days / 7)
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`
  }

  return (
    <div className="rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900">
      <div className="flex items-start gap-3">
        {/* Album artwork */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800">
          {data.albumImageUrl ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageLoader />
                </div>
              )}
              <img
                src={data.albumImageUrl}
                alt={`${data.album} album cover`}
                className="h-full w-full object-cover"
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="h-8 w-8 text-zinc-400 dark:text-zinc-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28-2.48 0-4.5 1.79-4.5 4s2.02 4 4.5 4 4.5-1.79 4.5-4V7h4V3h-7z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Track info */}
        <div className="min-w-0 flex-1">
          {/* Header with status and metadata */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full ${
                data.isPlaying 
                  ? 'bg-green-500 animate-pulse' 
                  : 'bg-zinc-400 dark:bg-zinc-600'
              }`} />
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {data.isPlaying ? 'Now playing' : 'Last played'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              {data.explicit && (
                <span className="rounded bg-zinc-700 px-1 py-0.5 text-white dark:bg-zinc-600">E</span>
              )}
              {!data.isPlaying && data.timestamp != null && (
                <span>{formatTimeAgo(data.timestamp)}</span>
              )}
            </div>
          </div>

          {/* Song details */}
          <div className="mb-2">
            <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {data.title}
            </h3>
            <p className="truncate text-sm text-zinc-600 dark:text-zinc-400">
              {data.artist}
            </p>
            <span className="block truncate text-xs text-zinc-500 dark:text-zinc-500">
              {data.album}
            </span>
          </div>

          {/* Progress bar for now playing */}
          {data.isPlaying && data.duration && currentProgress !== null && (
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                <span>{formatDuration(currentProgress)}</span>
                <span>{formatDuration(data.duration)}</span>
              </div>
              <div className="h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full">
                <div 
                  className="h-1 bg-green-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((currentProgress / data.duration) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Duration and Spotify link */}
          <div className="flex items-center justify-between">
            {!data.isPlaying && data.duration && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {formatDuration(data.duration)}
              </span>
            )}
            {data.songUrl && (
              <a
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors ml-auto"
              >
                <span>Listen on Spotify</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
