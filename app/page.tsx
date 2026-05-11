import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { VideoHero } from '@/components/hero/video-hero'
import { Pixelate } from '@/components/effects/pixelate'
import { GlitchSplit } from '@/components/effects/glitch-split'
import { akaIeuan } from '@/data/artists/aka-ieuan'
import { aoiTaira } from '@/data/artists/aoi-taira'
import { artistList } from '@/data/artists'

const embedShell = 'overflow-hidden rounded-md border border-border bg-card/30'

export default function HomePage() {
  // AKA's first video (jB0BhBb6szk) goes on home alongside the mixes playlist.
  const akaHomeVideo = akaIeuan.videos?.[0]
  const aoiVideo = aoiTaira.videos?.[0]
  const vm4uhPlaylist = akaIeuan.soundcloudPlaylist

  return (
    <>
      <VideoHero>
        <Pixelate
          text="Label. Born. Based. NYC."
          duration={1400}
          className="text-[11px] sm:text-xs uppercase tracking-[0.42em] text-foreground/70 font-light"
        />
      </VideoHero>

      {/* Listen — VM4UH mixes playlist + a video per artist */}
      <section className="bg-black pt-20 sm:pt-28 pb-12 sm:pb-16">
        <div className="mx-auto max-w-site site-inset">
          <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-light mb-6">
            Listen
          </p>

          {vm4uhPlaylist && (
            <div className="mb-6 sm:mb-8">
              <div className={embedShell}>
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  className="h-[260px] sm:h-[300px] block"
                  src={`https://w.soundcloud.com/player/?url=${vm4uhPlaylist.url}&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {akaHomeVideo && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-2.5 truncate">
                  aka ieuan — {akaHomeVideo.title}
                </p>
                <div className={`aspect-video ${embedShell}`}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${akaHomeVideo.videoId}`}
                    title={akaHomeVideo.title ?? 'aka ieuan'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
            )}
            {aoiVideo && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-2.5 truncate">
                  Aoi Taira — {aoiVideo.title}
                </p>
                <div className={`aspect-video ${embedShell}`}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${aoiVideo.videoId}`}
                    title={aoiVideo.title ?? 'Aoi Taira'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-light text-foreground/50">
            {akaIeuan.links.soundcloud && (
              <a
                href={akaIeuan.links.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                aka ieuan — SoundCloud <ArrowUpRight className="h-3 w-3" strokeWidth={1.25} />
              </a>
            )}
            {aoiTaira.links.soundcloud && (
              <a
                href={aoiTaira.links.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                Aoi Taira — SoundCloud <ArrowUpRight className="h-3 w-3" strokeWidth={1.25} />
              </a>
            )}
            {akaIeuan.links.bandcamp && (
              <a
                href={akaIeuan.links.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                Bandcamp <ArrowUpRight className="h-3 w-3" strokeWidth={1.25} />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Roster — list */}
      <section className="bg-black py-14 sm:py-20">
        <div className="mx-auto max-w-site site-inset">
          <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-light mb-5">
            Roster
          </p>
          <ul>
            {artistList.map(artist => (
              <li key={artist.slug}>
                <Link
                  href={`/artists/${artist.slug}`}
                  className="group grid grid-cols-[1fr_auto] gap-x-6 items-baseline py-4 transition-colors"
                >
                  <span className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="text-lg sm:text-xl font-light text-foreground tracking-tight group-hover:opacity-90 transition-opacity">
                      <GlitchSplit trigger="hover">{artist.name}</GlitchSplit>
                    </span>
                    <span className="text-[12px] sm:text-[13px] font-light text-foreground/50 truncate">
                      {[artist.location, artist.tagline].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-foreground/35 group-hover:text-foreground transition-colors"
                    strokeWidth={1.25}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
