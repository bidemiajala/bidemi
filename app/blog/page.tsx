import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS } from '../data'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on quality engineering, test automation, AI testing, and software development best practices.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Bidemi Ajala',
    description: 'Thoughts on quality engineering, test automation, AI testing, and software development best practices.',
    url: 'https://www.bidemi.xyz/blog',
  },
}

const sorted = [...BLOG_POSTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

export default function BlogPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
          Blog
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          Writing on quality engineering, test automation, AI, and the craft of building software.
        </p>
      </div>

      {sorted.length > 0 ? (
        <div className="flex flex-col gap-2">
          {sorted.map((post) => (
            <Link
              key={post.uid}
              href={post.link}
              className="group flex flex-col gap-1 rounded-xl border border-zinc-200 p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-[450] text-zinc-900 dark:text-zinc-50">
                  {post.title}
                </span>
                <time
                  dateTime={post.date}
                  className="shrink-0 pt-0.5 text-xs text-zinc-400 dark:text-zinc-500"
                >
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Posts coming soon.
          </p>
        </div>
      )}
    </div>
  )
}
