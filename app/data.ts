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
