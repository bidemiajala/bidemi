'use client'
import { motion } from 'motion/react'
import { XIcon, ChevronLeftIcon, ChevronRightIcon, Underline } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { useState, useCallback, useEffect } from 'react'
import { PageLoader, ImageLoader } from '@/components/ui/spinner'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  EXPERIENCE_OVERVIEW,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
  TRAVEL_DESTINATIONS,
  ARTICLES,
} from './data'
import SpotifyNowPlaying from '@/components/spotify-now-playing'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

type ProjectVideoProps = {
  src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          className="aspect-video w-full cursor-zoom-in rounded-xl"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

type ThumbnailImageProps = {
  src: string
  alt: string
  city: string
  photoCount: number
}

function ThumbnailImage({ src, alt, city, photoCount }: ThumbnailImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && (
        <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center rounded-xl">
          <ImageLoader />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 text-left">
        <h4 className="text-lg font-semibold text-white">
          {city}
        </h4>
        <p className="text-sm text-white/80">
          {photoCount} photo{photoCount !== 1 ? 's' : ''}
        </p>
      </div>
    </>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

type PhotoCarouselProps = {
  photos: string[]
  country: string
}

function PhotoCarousel({ photos, country }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set())

  const nextPhoto = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = (prev + 1) % photos.length
      setImageLoading(true)
      return newIndex
    })
  }, [photos.length])

  const prevPhoto = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = (prev - 1 + photos.length) % photos.length
      setImageLoading(true)
      return newIndex
    })
  }, [photos.length])

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageLoadErrors(prev => new Set(prev).add(currentIndex))
  }

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index)
    setImageLoading(true)
  }

  return (
    <div className="relative flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-xl min-h-[50vh] md:min-h-[70vh] max-h-[80vh]">
      {imageLoading && !imageLoadErrors.has(currentIndex) && (
        <ImageLoader />
      )}
      <img
        src={photos[currentIndex]}
        alt={`${country} photo ${currentIndex + 1}`}
        className="max-h-[50vh] md:max-h-[70vh] max-w-full rounded-xl object-contain"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoading && !imageLoadErrors.has(currentIndex) ? 'none' : 'block' }}
      />
      
      {/* Navigation buttons */}
      {photos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 dark:bg-white/50 dark:text-black dark:hover:bg-white/70"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70 dark:bg-white/50 dark:text-black dark:hover:bg-white/70"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Photo indicators */}
      {photos.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndexChange(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white shadow-lg'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const ARTICLES_PAGE_SIZE = 3

type CombinedArticle =
  | { kind: 'internal'; uid: string; title: string; description: string; link: string; date: string }
  | { kind: 'external'; id: string; title: string; description: string; url: string; date: string }

const ALL_ARTICLES: CombinedArticle[] = [
  ...BLOG_POSTS.map((p) => ({
    kind: 'internal' as const,
    uid: p.uid,
    title: p.title,
    description: p.description,
    link: p.link,
    date: p.date,
  })),
  ...ARTICLES.map((a) => ({
    kind: 'external' as const,
    id: a.id,
    title: a.title,
    description: a.description,
    url: a.url,
    date: a.date,
  })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const ExternalIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 opacity-50"
  >
    <path
      d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

function ArticlesSection() {
  const [visible, setVisible] = useState(ARTICLES_PAGE_SIZE)
  const shown = ALL_ARTICLES.slice(0, visible)
  const hasMore = visible < ALL_ARTICLES.length

  return (
    <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
      <h3 className="mb-5 text-lg font-medium"> 📚 Articles</h3>
      <div className="flex flex-col gap-2">
        {shown.map((item) => {
          const key = item.kind === 'internal' ? item.uid : item.id
          const isExternal = item.kind === 'external'
          const href = isExternal ? item.url : item.link
          const Tag = isExternal ? 'a' : Link
          const extraProps = isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {}

          return (
            <Tag
              key={key}
              href={href}
              {...(extraProps as any)}
              className="group flex flex-col gap-1 rounded-xl border border-zinc-200 p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-[450] text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </span>
                <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
                  {isExternal && <ExternalIcon />}
                  <time
                    dateTime={item.date}
                    className="text-xs text-zinc-400 dark:text-zinc-500"
                  >
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </time>
                </div>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {item.description}
              </p>
            </Tag>
          )
        })}
      </div>
      <div className="mt-6 text-center">
        {hasMore ? (
          <button
            onClick={() => setVisible((v) => v + ARTICLES_PAGE_SIZE)}
            className="inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            More
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L6 10M2 6L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            View all on blog
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 2L6 10M2 6L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
        )}
      </div>
    </motion.section>
  )
}

export default function Personal() {
  const [visibleDestinations, setVisibleDestinations] = useState(4)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    // Simulate page loading time
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const showMoreDestinations = () => {
    setVisibleDestinations(prev => Math.min(prev + 3, TRAVEL_DESTINATIONS.length))
  }

  if (pageLoading) {
    return <PageLoader />
  }

  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            Automation Engineer improving the quality of web apps for the past 10+ years 🚀. I care about travel, photography, and delivering bug-free user experiences. <br/>
            <br/>
            A few years back, I joined the team at <a href="https://www.chilipiper.com" target="_blank" rel="noopener noreferrer" className="group relative text-zinc-900 dark:text-zinc-50">Chili Piper<span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span></a>, where I get to work on enhancing how companies convert demand into actual business. 
            These days, you'll find me helping to build <a href="https://www.chilipiper.com/distro" target="_blank" rel="noopener noreferrer" className="group relative text-zinc-900 dark:text-zinc-50">Distro<span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span></a>, where we're simplifying lead routing. <br/>
            <br/>
            AI has completely captured my attention lately. I'm spending way too much time in <a href="https://www.cursor.com" target="_blank" rel="noopener noreferrer" className="group relative text-zinc-900 dark:text-zinc-50">Cursor<span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span></a>, and exploring MCP servers.
          </p>  
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium"> 🖌️ Recent Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              {/* <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectVideo src={project.video} />
              </div> */}
              <div className="px-1">
                <a
                  className="font-base group relative inline-flex items-center gap-1 font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100"
                  >
                    <path
                      d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <ArticlesSection />

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium"> 👨🏾‍💻 Professional Experience</h3>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.slice(0, 1).map((job) => (
            <a
              className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              key={job.id}
            >
              <Spotlight
                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                size={64}
              />
              <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                <div className="relative flex w-full flex-row justify-between">
                  <div className="flex-1">
                    <h4 className="font-normal dark:text-zinc-100">
                      {job.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {job.company}
                      </p>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        📍 {job.location}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {job.description}
                    </p>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {job.start} - {job.end}
                  </p>
                </div>
              </div>
            </a>
          ))}
          <div
            className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
            aria-label="Experience overview"
          >
            <Spotlight
              className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
              size={64}
            />
            <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
              <h4 className="font-normal dark:text-zinc-100">
                Previously...
              </h4>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {EXPERIENCE_OVERVIEW}
              </p>
            </div>
          </div>
          {WORK_EXPERIENCE.slice(1).map((job) => (
            <a
              className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              key={job.id}
            >
              <Spotlight
                className="from-zinc-900 via-zinc-800 to-zinc-700 blur-2xl dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-50"
                size={64}
              />
              <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                <div className="relative flex w-full flex-row justify-between">
                  <div className="flex-1">
                    <h4 className="font-normal dark:text-zinc-100">
                      {job.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {job.company}
                      </p>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        📍 {job.location}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {job.description}
                    </p>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {job.start} - {job.end}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium"> ✈️ Travel </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TRAVEL_DESTINATIONS.slice(0, visibleDestinations).map((destination) => (
            <div key={destination.country} className="space-y-2">
              <MorphingDialog
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 0.3,
                }}
              >
                <MorphingDialogTrigger className="group w-full">
                  <div className="relative cursor-pointer overflow-hidden rounded-xl">
                    <ThumbnailImage 
                      src={destination.photos[0]}
                      alt={destination.country}
                      city={destination.city}
                      photoCount={destination.photos.length}
                    />
                  </div>
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent className="relative max-w-[90vw] max-h-[90vh] rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
                    <PhotoCarousel photos={destination.photos} country={destination.country} />
                  </MorphingDialogContent>
                  <MorphingDialogClose
                    className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1 shadow-lg dark:bg-zinc-800"
                    variants={{
                      initial: { opacity: 0 },
                      animate: {
                        opacity: 1,
                        transition: { delay: 0.3, duration: 0.1 },
                      },
                      exit: { opacity: 0, transition: { duration: 0 } },
                    }}
                  >
                    <XIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  </MorphingDialogClose>
                </MorphingDialogContainer>
              </MorphingDialog>
              <div className="px-1">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-50">
                  {destination.country}
                </h4>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {visibleDestinations < TRAVEL_DESTINATIONS.length && (
          <div className="mt-6 text-center">
            <button
              onClick={showMoreDestinations}
              className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              More
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform"
              >
                <path
                  d="M6 2L6 10M2 6L10 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
      </motion.section>

      {/* <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-3 text-lg font-medium">Blog</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section> */}

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium"> 🎵 Music</h3>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Music is a big part of my day. I'm constantly listening to house, jazz, R&B, and pretty much anything that sounds interesting. 
          I got nerdy about it and built a streamer that displays whatever's currently playing or the last song I had on.
        </p>
        <SpotifyNowPlaying />
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium"> 💬 Connect</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Want to work together? Contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}?subject=Hello from your website 👋🏻`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
          <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
            <Link
              href="/blog"
              className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              Blog
            </Link>
          </Magnetic>
        </div>
      </motion.section>
    </motion.main>
  )
}
