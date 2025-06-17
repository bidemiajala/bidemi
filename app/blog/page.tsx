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

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
          Blog
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Thoughts on quality engineering, test automation, AI testing, and software development best practices.
        </p>
      </div>
      
      <div className="space-y-6">
        {BLOG_POSTS.length > 0 ? (
          BLOG_POSTS.map((post) => (
            <article key={post.uid} className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
              <Link href={post.link} className="group">
                <h2 className="text-lg font-medium text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                  {post.title}
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
                <span className="mt-3 inline-flex text-sm text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-300">
                  Read more →
                </span>
              </Link>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400">
              Blog posts coming soon. Check back later for insights on quality engineering, test automation, and software development.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 