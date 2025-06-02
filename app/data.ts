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
  description: string
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
  city: string
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
    description: 'Implementing comprehensive testing strategies for a revenue acceleration platform, and building test automation frameworks.',
  },
  {
    company: 'Modus Create (Contract)',
    title: 'Sr. Automation Engineer',
    start: '2021',
    end: '2022',
    link: 'https://www.moduscreate.com',
    id: 'work2',
    description: 'Designed and implemented automated testing frameworks for enterprise clients and improving deployment confidence.',
  },
  {
    company: 'Okra',
    title: 'QA Lead',
    start: '2020',
    end: '2022',
    link: 'https://okra.ng/',
    id: 'work3',
    description: 'Established QA processes and testing standards for fintech platform and building a robust test automation infrastructure.',
  },
  {
    company: 'Intelia',
    title: 'Sr. QA Engineer',
    start: '2019',
    end: '2020',
    link: 'https://www.intelia.io',
    id: 'work4',
    description: 'Developed comprehensive test strategies for AI-powered analytics platform, implementing API testing frameworks and performance testing protocols.',
  },
  {
    company: 'Ericsson',
    title: 'QA Analyst',
    start: '2014',
    end: '2019',
    link: 'https://www.ericsson.com',
    id: 'work5',
    description: 'Performed quality assurance for telecommunications software, specializing in network management systems and 4G infrastructure testing.',
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

export const EMAIL = 'hi@bidemi.xyz'

export const TRAVEL_DESTINATIONS: TravelDestination[] = [
  {
    country: 'United states  ',
    city: 'New York',
    description: 'Skyline, Statue of Liberty, and Central Park.',
    photos: [
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/NY1.JPG?alt=media&token=50b8ceba-0304-42a3-8d2d-126cee330c30',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/NY2.JPG?alt=media&token=14063648-a2b3-4e0e-be21-97ba478f776c',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/NY3.JPG?alt=media&token=2a23522f-8390-408a-8007-030e1007a114',
    ],
    id: 'travel1',
  },
  {
    country: 'Malta',
    city: 'Valletta',
    description: 'Beautiful beaches, ancient history, and delicious food.',
    photos: [
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/MT1.JPG?alt=media&token=5d852576-7380-4d28-89c3-e18b372404ef',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/MT2.JPG?alt=media&token=7db92838-b344-43c0-b0e1-2643d1a1886d',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/MT3.JPG?alt=media&token=89bd8ccd-e1fd-4589-9511-621e93c2a817',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/MT4.JPG?alt=media&token=66127472-66fa-4980-b758-8c7358e85374',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/MT5.JPG?alt=media&token=eebd3741-91ff-46d3-804f-1c6b02b5c4e7',
    ],
    id: 'travel2',
  },
  {
    country: 'Greece',
    city: 'Athens',
    description: 'Ancient history, stunning islands, and Mediterranean charm.',
    photos: [
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/ATH1.JPG?alt=media&token=08dc39a3-0ff0-4f75-812f-8bd093c03f6d',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/ATH2.JPG?alt=media&token=0dd356dc-98ab-4959-8e24-18e889a1aaed',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/ATH3.JPG?alt=media&token=633d750e-9bd7-4f5e-9396-66a1b7468c7f',
    ],
    id: 'travel3',
  },
  {
    country: 'Portugal',
    city: 'Lisbon',
    description: 'Stunning nature, beaches, and friendly people.',
    photos: [
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/LIS1.JPG?alt=media&token=5a47b0a0-0273-4bfa-a0c0-e06855b057a5',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/CAS1.JPG?alt=media&token=c1cb936f-6a91-46dc-b946-3ad027e2ea51',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/CAS2.JPG?alt=media&token=67fdf2d8-ad1a-4ab6-9850-0b0469e080e0',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/CAS3.JPG?alt=media&token=6cba3920-1500-483c-aab3-078184e3b5ae',
    ],
    id: 'travel4',
  },
  {
    country: 'United States',
    city: 'DC',
    description: 'Monuments, museums, and history.',
    photos: [
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/DC1.JPG?alt=media&token=2a40bf9b-1608-4e80-83bf-23f10c1d2fea',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/DC2.JPG?alt=media&token=628371a2-13f8-4437-90db-f7898a6d4629',
    ],
    id: 'travel5',
  },
  {
    country: 'United States ',
    city: 'Las Vegas',
    description: 'Casinos, shows, and food.',
    photos: [
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/VG1.JPG?alt=media&token=256a750b-ef26-411d-8e58-f6c1c43d6c59',
      'https://firebasestorage.googleapis.com/v0/b/newagent-5c4db.appspot.com/o/VG2.JPG?alt=media&token=9fe81feb-80ce-4188-abf6-7dbecfdb7d29',
    ],
    id: 'travel6',
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
