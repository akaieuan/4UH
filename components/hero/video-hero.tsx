'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface VideoHeroProps {
  poster?: string
  /** 'full' = full viewport; 'short' = ~50vh (artist page strip). */
  height?: 'full' | 'short'
  children?: React.ReactNode
  videoOpacity?: number
  className?: string
}

/**
 * Full-bleed background video hero.
 *
 * Mobile autoplay notes:
 *  - `muted` + `playsInline` + `autoPlay` are required for iOS / Android.
 *  - The MP4/H.264 source is listed FIRST so iOS Safari picks it. iOS
 *    14–15 can't decode WebM/VP9 at all; iOS 16+ handles it
 *    inconsistently. The WebM stays as a smaller fallback for browsers
 *    that prefer it.
 *  - `preload="auto"` so the browser actually has enough buffered before
 *    paint to start playback (preload="metadata" was leaving mobile
 *    stuck on the poster).
 *  - The `useEffect` calls `.play()` defensively in case the browser
 *    ignored the autoplay attribute (e.g. page restored from bfcache,
 *    low-power mode that lifted mid-session). The rejection from a
 *    truly-blocked autoplay is swallowed — the poster remains.
 */
export function VideoHero({
  poster = '/4uh-aka-poster.jpg',
  height = 'full',
  children,
  videoOpacity = 0.55,
  className,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const tryPlay = () => {
      v.play().catch(() => {
        /* autoplay still blocked — poster stays visible */
      })
    }
    tryPlay()
    // Some mobile browsers pause on page visibility changes (e.g. tab
    // switch, lock screen) and don't resume — nudge them on visible.
    const onVisible = () => {
      if (document.visibilityState === 'visible' && v.paused) tryPlay()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

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
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
        style={{ opacity: videoOpacity }}
        aria-hidden
      >
        {/* MP4 first — iOS Safari needs H.264. WebM is a smaller fallback
            for browsers that prefer VP9 (modern Chrome / Firefox). */}
        <source src="/4uh-aka.mp4" type="video/mp4" />
        <source src="/4uh-aka.webm" type="video/webm" />
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
