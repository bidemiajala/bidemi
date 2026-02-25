'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const onBlog = pathname.startsWith('/thoughts')

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link href="/" className="font-semibold text-black dark:text-white" style={{ fontSize: '20px' }}>
          Bidemi Ajala  🌍
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          New York
        </TextEffect>
      </div>
      {!onBlog && (
        <Link
          href="/thoughts"
          className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          Thoughts
        </Link>
      )}
    </header>
  )
}
