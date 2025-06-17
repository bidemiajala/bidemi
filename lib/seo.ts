import type { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

export function generateSEO(props: SEOProps): Metadata {
  const {
    title = 'Bidemi Ajala - AI Quality Engineer',
    description = 'Software Quality Engineer with 10+ years experience building test automation frameworks and quality systems. Specializing in AI testing, fintech, and enterprise software quality assurance.',
    image = '/cover.jpg',
    url = '/',
    type = 'website',
    publishedTime,
    modifiedTime,
    tags = []
  } = props

  const baseUrl = 'https://www.bidemi.xyz'
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`

  return {
    title,
    description,
    openGraph: {
      type,
      url: fullUrl,
      title,
      description,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      siteName: 'Bidemi Ajala - AI Quality Engineer',
      locale: 'en_US',
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        tags,
        authors: ['Bidemi Ajala'],
      })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImage],
      creator: '@bidemiajala',
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

export const defaultSEO: Metadata = generateSEO({})

export function generateBlogPostSEO(
  title: string,
  description: string,
  slug: string,
  publishedAt?: string,
  tags?: string[]
): Metadata {
  return generateSEO({
    title: `${title} | Bidemi Ajala`,
    description,
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: publishedAt,
    modifiedTime: publishedAt,
    tags,
  })
} 