type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

type TravelDestination = {
  country: string
  description: string
  photos: string[]
  id: string
}

type Article = {
  title: string
  description: string
  url: string
  id: string
}

export const PROJECTS: Project[] = [
  {
    name: 'E2E Lab',
    description:
      'Test automation playground built in React, tested with Cypress and Playwright.',
    link: 'https://github.com/bidemiajala/e2e-lab',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Quick Notes',
    description: 'Chrome extension with test automation using Playwright and Page Object Model patterns.',
    link: 'https://github.com/bidemiajala/quick-notes',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Chili Piper',
    title: 'QA Lead',
    start: '2022',
    end: 'Present',
    link: 'https://www.chilipiper.com',
    id: 'work1',
  },
  {
    company: 'Modus Create (Contract)',
    title: 'Sr. Automation Engineer',
    start: '2021',
    end: '2022',
    link: 'https://www.moduscreate.com',
    id: 'work2',
  },
  {
    company: 'Okra',
    title: 'QA Lead',
    start: '2020',
    end: '2022',
    link: 'https://okra.ng/',
    id: 'work3',
  },
  {
    company: 'Intelia',
    title: 'Sr. QA Engineer',
    start: '2019',
    end: '2020',
    link: 'https://www.intelia.io',
    id: 'work4',
  },
  {
    company: 'Ericsson',
    title: 'QA Analyst',
    start: '2014',
    end: '2019',
    link: 'https://www.ericsson.com',
    id: 'work5',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/bidemiajala',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/bidemiajala',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/oniri.ajo',
  },
  {
    label: 'Spotify',
    link: 'https://open.spotify.com/user/jlmnwzz0sp3hv1hqiykwefl5v?si=92548ab827ff4991',
  },
]

export const EMAIL = 'demiajala@outlook.com'

export const TRAVEL_DESTINATIONS: TravelDestination[] = [
  {
    country: 'New York',
    description: 'Skyline, Statue of Liberty, and Central Park.',
    photos: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop',
    ],
    id: 'travel1',
  },
  {
    country: 'Sicily',
    description: 'Food, wine, and beautiful beaches.',
    photos: [
      'https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
    ],
    id: 'travel2',
  },
  {
    country: 'Iceland',
    description: 'Northern lights, geysers, and breathtaking landscapes.',
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1539593395743-7da5ee10ff07?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1476659230171-9fe9bb5fd5dd?w=800&h=600&fit=crop',
    ],
    id: 'travel3',
  },
  {
    country: 'Morocco',
    description: 'Vibrant markets, desert adventures, and rich traditions.',
    photos: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562003077-90a9fd8bad0a?w=800&h=600&fit=crop',
    ],
    id: 'travel4',
  },
  {
    country: 'Malta',
    description: 'Beautiful beaches, ancient history, and delicious food.',
    photos: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop',
    ],
    id: 'travel5',
  },
  {
    country: 'Greece',
    description: 'Ancient history, stunning islands, and Mediterranean charm.',
    photos: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1603618812495-e2788c5e5fdf?w=800&h=600&fit=crop',
    ],
    id: 'travel6',
  },
  {
    country: 'London',
    description: 'Taxis, Harry Potter, and rain..',
    photos: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531065208531-4036c0dba3ca?w=800&h=600&fit=crop',
    ],
    id: 'travel7',
  },
  {
    country: 'Turkey',
    description: 'History, architecture, and delicious food.',
    photos: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=800&h=600&fit=crop',
    ],
    id: 'travel8',
  },
  {
    country: 'Lisbon',
    description: 'Stunning nature, beaches, and friendly people.',
    photos: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
    id: 'travel9',
  },
  {
    country: 'Algarve',
    description: 'Beaches, fish, and sunsets.',
    photos: [
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544985361-b420d7435000?w=800&h=600&fit=crop',
    ],
    id: 'travel10',
  },
]

export const ARTICLES: Article[] = [
  {
    title: "Here's why you should write unit tests",
    description: "A comprehensive guide exploring the benefits of unit testing, from saving time and money to improving code quality. Covers testing techniques, tools, and best practices for writing effective automated tests.",
    url: "https://moduscreate.com/blog/heres-why-you-should-write-unit-tests/",
    id: "article1",
  },
]
