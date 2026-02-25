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
    {
      url: `${baseUrl}/thoughts`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Dynamic blog pages - commented out until blog posts are added
  // const blogPages = BLOG_POSTS.map((post) => ({
  //   url: `${baseUrl}${post.link}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }))

  return [...staticPages] // Add ...blogPages when blog posts are ready
} 