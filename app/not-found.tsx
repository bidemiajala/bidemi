import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-medium text-zinc-900 dark:text-zinc-100">
        404
      </h1>
      <h2 className="mb-6 text-xl text-zinc-600 dark:text-zinc-400">
        Page Not Found
      </h2>
      <p className="mb-8 text-zinc-500 dark:text-zinc-500">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Go Home
      </Link>
    </div>
  )
} 