'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
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
      <Link
        href="/blog"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        Blog
      </Link>
    </header>
  )
}
