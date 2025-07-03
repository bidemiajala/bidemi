import { WORK_EXPERIENCE, SOCIAL_LINKS, EMAIL } from '@/app/data'

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bidemi Ajala",
    "url": "https://www.bidemi.xyz",
    "image": "https://www.bidemi.xyz/cover.jpg",
    "jobTitle": "AI Quality Engineer",
    "description": "Software Quality Engineer with 10+ years experience building test automation frameworks and quality systems. Specializing in AI testing, fintech, and enterprise software quality assurance.",
    "email": EMAIL,
    "knowsAbout": [
      "Quality Assurance",
      "Test Automation",
      "AI Testing",
      "Software Testing",
      "Cypress",
      "Playwright",
      "API Testing",
      "Fintech",
      "JavaScript",
      "TypeScript",
      "Test Strategy",
      "Quality Engineering"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Chili Piper",
      "url": "https://www.chilipiper.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New York",
      "addressCountry": "US"
    },
    "sameAs": SOCIAL_LINKS.map(link => link.link),
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Quality Engineer",
      "occupationLocation": {
        "@type": "City",
        "name": "New York"
      },
      "skills": [
        "Test Automation",
        "Quality Assurance",
        "AI Testing",
        "Software Testing",
        "API Testing",
        "Performance Testing",
        "Test Strategy",
        "Cypress",
        "Playwright"
      ]
    },
    "alumniOf": WORK_EXPERIENCE.map(work => ({
      "@type": "Organization",
      "name": work.company,
      "url": work.link
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 