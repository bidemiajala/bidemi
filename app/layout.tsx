import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'
import { StructuredData } from '@/components/structured-data'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bidemi.xyz'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Bidemi Ajala - Automation Engineer',
    template: '%s | Bidemi Ajala'
  },
  description: 'Automation Engineer with 10+ years experience building test automation frameworks and quality systems. Specializing in AI testing, fintech, and enterprise software quality assurance. Based in New York.',
  keywords: [
    'QA Engineer',
    'Quality Assurance',
    'Test Automation',
    'AI Testing',
    'Cypress',
    'Playwright',
    'API Testing',
    'Fintech QA',
    'Software Quality',
    'Test Strategy',
    'QA Lead',
    'New York',
    'Bidemi Ajala'
  ],
  authors: [{ name: 'Bidemi Ajala', url: 'https://www.bidemi.xyz' }],
  creator: 'Bidemi Ajala',
  publisher: 'Bidemi Ajala',
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bidemi.xyz',
    siteName: 'Bidemi Ajala - Automation Engineer',
    title: 'Bidemi Ajala - Automation Engineer',
    description: 'Automation Engineer with 10+ years experience building test automation frameworks and quality systems. Specializing in AI testing, fintech, and enterprise software quality assurance.',
    images: [
      {
        url: '/og-image.png',
        width: 528,
        height: 560,
        alt: 'Bidemi Ajala - Automation Engineer',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Bidemi Ajala - Automation Engineer',
    description: 'Automation Engineer with 10+ years experience building test automation frameworks and quality systems.',
    images: ['/og-image.png'],
  },
  verification: {
    google: '', // TODO: Add your Google Search Console verification code here (e.g., 'abc123xyz789')
    // To get this code: Google Search Console → Settings → Ownership verification → HTML tag method
    yandex: '', // Add if needed
    yahoo: '', // Add if needed
  },
  category: 'Technology',
  classification: 'Business',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
};

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} overflow-x-hidden bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
