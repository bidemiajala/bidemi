import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bidemi Ajala - AI Quality Engineer',
    short_name: 'Bidemi Ajala',
    description: 'Software Quality Engineer with 10+ years experience building test automation frameworks and quality systems. Specializing in AI testing, fintech, and enterprise software quality assurance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/cover.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/cover.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
} 