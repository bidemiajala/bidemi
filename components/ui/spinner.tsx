import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100',
        sizeClasses[size],
        className
      )}
    />
  )
}

interface PageLoaderProps {
  className?: string
}

export function PageLoader({ className }: PageLoaderProps) {
  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80',
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        <Spinner size="lg" />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    </div>
  )
}

interface ImageLoaderProps {
  className?: string
}

export function ImageLoader({ className }: ImageLoaderProps) {
  return (
    <div className={cn(
      'absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-xl',
      className
    )}>
      <Spinner size="md" />
    </div>
  )
} 