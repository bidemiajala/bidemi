import { MetadataRoute } from 'next'
import { BLOG_POSTS } from './data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.bidemi.xyz'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ]

  // Dynamic blog pages
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}${post.link}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages]
} 