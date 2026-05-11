import { cn } from '@/lib/utils'

interface VideoHeroProps {
  src?: string
  poster?: string
  /** 'full' = full viewport; 'short' = ~50vh (artist page strip). */
  height?: 'full' | 'short'
  children?: React.ReactNode
  videoOpacity?: number
  className?: string
}

export function VideoHero({
  src = '/4uh-aka.webm',
  poster = '/4uh-aka-poster.jpg',
  height = 'full',
  children,
  videoOpacity = 0.55,
  className,
}: VideoHeroProps) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-black',
        height === 'full'
          ? 'h-[100svh] min-h-[520px] max-h-[1080px]'
          : 'h-[48svh] min-h-[320px] max-h-[640px]',
        className
      )}
    >
      <div className="absolute inset-0 bg-black" aria-hidden />
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
        style={{ opacity: videoOpacity }}
        aria-hidden
      >
        <source src={src} type="video/webm" />
      </video>

      {/* Gentle bottom fade for content sitting underneath. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 hero-fade-bottom" aria-hidden />

      {children && (
        <div className="relative z-10 h-full">
          <div className="mx-auto flex h-full max-w-site flex-col justify-end site-inset pb-12 sm:pb-16 md:pb-20">
            {children}
          </div>
        </div>
      )}
    </section>
  )
}
