'use client'
import { Check, Link2, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'

function ShareBar() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(t)
    }
  }, [copied])

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  const encodedUrl = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')
  const encodedTitle = encodeURIComponent(typeof window !== 'undefined' ? document.title : '')

  const iconBtn =
    'inline-flex items-center justify-center rounded-full border border-zinc-200 p-2 text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200'

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={iconBtn}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={iconBtn}
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        onClick={handleCopy}
        type="button"
        aria-label="Copy link"
        className={iconBtn}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  )
}

export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
      <div className="absolute right-4 top-24">
        <ShareBar />
      </div>
      <main className="prose prose-gray mt-24 pb-20 prose-h4:prose-base dark:prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium">
        {children}
      </main>
    </>
  )
}
