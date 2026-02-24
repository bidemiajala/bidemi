import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '../../data'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.uid,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.uid === slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Bidemi Ajala`,
      description: post.description,
      url: `https://www.bidemi.xyz/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.uid === slug)
  if (!post) notFound()

  try {
    const { default: Post } = await import(`./${slug}.mdx`)
    return <Post />
  } catch {
    notFound()
  }
}
