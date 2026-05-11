import Link from 'next/link'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import type { Artist, Release, Show } from '@/data/types'
import { Collapsible } from './collapsible'

export function ArtistPage({ artist }: { artist: Artist }) {
  const upcomingShows = artist.shows.filter(s => !s.isPast)
  const pastShows = artist.shows.filter(s => s.isPast)

  return (
    <article className="pt-28 sm:pt-32 pb-24 sm:pb-28">
      <div className="mx-auto max-w-site site-inset">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] tracking-wide text-foreground/45 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.25} />
          Back
        </Link>

        <header className="mt-10 sm:mt-14 max-w-2xl">
          <h1 className="text-lg font-light tracking-tight text-foreground">
            {artist.name}
          </h1>
          {(artist.location || artist.tagline) && (
            <p className="mt-1.5 text-sm font-light text-foreground/55">
              {[artist.location, artist.tagline].filter(Boolean).join(' · ')}
            </p>
          )}
        </header>

        {artist.bio.length > 0 ? (
          <section className="mt-10 max-w-2xl space-y-4 text-sm font-light leading-relaxed text-foreground/70">
            {artist.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ) : (
          <p className="mt-10 text-sm font-light text-foreground/45">Bio coming soon.</p>
        )}

        <ListSection
          title="Releases"
          empty={artist.releases.length === 0}
          emptyText="First release coming soon."
          allLink={artist.links.bandcamp ? { href: artist.links.bandcamp, text: 'All on Bandcamp' } : undefined}
        >
          <Collapsible initialCount={8}>
            {artist.releases.map((r, i) => (
              <ReleaseRow key={i} release={r} />
            ))}
          </Collapsible>
        </ListSection>

        <ListSection
          title="Shows"
          empty={artist.shows.length === 0}
          emptyText="No shows announced yet."
          allLink={artist.links.ra ? { href: artist.links.ra, text: 'All on Resident Advisor' } : undefined}
        >
          {upcomingShows.length > 0 && <SubLabel>Upcoming</SubLabel>}
          {upcomingShows.map((s, i) => (
            <ShowRow key={`u-${i}`} show={s} />
          ))}
          {pastShows.length > 0 && (
            <SubLabel className={upcomingShows.length > 0 ? 'mt-6' : ''}>Past</SubLabel>
          )}
          <Collapsible initialCount={8}>
            {pastShows.map((s, i) => (
              <ShowRow key={`p-${i}`} show={s} dim />
            ))}
          </Collapsible>
        </ListSection>

        <ListSection
          title="Sets"
          empty={!artist.djSets || artist.djSets.length === 0}
          emptyText="No mixes yet."
          allLink={artist.links.soundcloud ? { href: artist.links.soundcloud, text: 'All on SoundCloud' } : undefined}
        >
          {artist.djSets?.map((set, i) => (
            <Row key={i} href={set.url} title={set.title ?? 'Untitled mix'} meta="SoundCloud" />
          ))}
        </ListSection>

        <ListSection
          title="Video"
          empty={!artist.videos || artist.videos.length === 0}
          emptyText="No videos yet."
        >
          {artist.videos?.map((v, i) => (
            <Row
              key={i}
              href={`https://www.youtube.com/watch?v=${v.videoId}`}
              title={v.title ?? 'Video'}
              meta="YouTube"
            />
          ))}
        </ListSection>

        <ListSection title="Links" empty={!hasAnyLink(artist)} emptyText="Links coming soon.">
          {artist.links.spotify && <Row href={artist.links.spotify} title="Spotify" />}
          {artist.links.soundcloud && <Row href={artist.links.soundcloud} title="SoundCloud" />}
          {artist.links.bandcamp && <Row href={artist.links.bandcamp} title="Bandcamp" />}
          {artist.links.ra && <Row href={artist.links.ra} title="Resident Advisor" />}
          {artist.links.instagram && <Row href={artist.links.instagram} title="Instagram" />}
          {artist.links.twitter && <Row href={artist.links.twitter} title="Twitter" />}
          {artist.links.extra?.map((link, i) => (
            <Row key={`extra-${i}`} href={link.url} title={link.label} />
          ))}
        </ListSection>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────── */

function ListSection({
  title,
  children,
  empty,
  emptyText,
  allLink,
}: {
  title: string
  children: React.ReactNode
  empty?: boolean
  emptyText?: string
  allLink?: { href: string; text: string }
}) {
  return (
    <section className="mt-14 sm:mt-16">
      <h2 className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-light mb-5">
        {title}
      </h2>
      {empty ? (
        <p className="text-sm font-light text-foreground/45">{emptyText}</p>
      ) : (
        <ul>{children}</ul>
      )}
      {allLink && !empty && (
        <a
          href={allLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-light text-foreground/50 hover:text-foreground transition-colors"
        >
          {allLink.text} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.25} />
        </a>
      )}
    </section>
  )
}

function SubLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <li className={`list-none mb-3 text-[11px] uppercase tracking-[0.22em] text-foreground/35 font-light ${className}`}>
      {children}
    </li>
  )
}

function Row({
  href,
  title,
  meta,
  dim,
  leading,
}: {
  href: string
  title: string
  /** Right-side metadata label (e.g. "Bandcamp", "RA"). */
  meta?: string
  /** Left-side leading info (e.g. release catalog, show date). */
  leading?: string
  dim?: boolean
}) {
  return (
    <li className={dim ? 'opacity-50' : undefined}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[1fr_auto] gap-x-4 sm:gap-x-6 items-baseline py-3 transition-colors"
      >
        <span className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-5">
          {leading && (
            <span className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-foreground/40 whitespace-nowrap sm:min-w-[7rem]">
              {leading}
            </span>
          )}
          <span className="text-[15px] sm:text-[15px] font-light text-foreground/85 group-hover:text-foreground transition-colors truncate">
            {title}
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/35 group-hover:text-foreground transition-colors whitespace-nowrap">
          {meta ?? ''}
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.25} />
        </span>
      </a>
    </li>
  )
}

function ReleaseRow({ release }: { release: Release }) {
  return (
    <Row
      href={release.url}
      leading={release.catalog ?? release.type}
      title={release.title}
      meta={hostLabel(release.url)}
    />
  )
}

function ShowRow({ show, dim }: { show: Show; dim?: boolean }) {
  const venuePart = show.venue && show.venue !== 'TBA' ? ` — ${show.venue}` : ''
  const locPart = show.location && show.location !== 'TBA' ? `, ${show.location}` : ''
  return (
    <Row
      href={show.url}
      leading={show.date}
      title={`${show.title}${venuePart}${locPart}`}
      meta={!show.isPast && show.isTicketLink ? 'Tickets' : hostLabel(show.url)}
      dim={dim}
    />
  )
}

function hasAnyLink(artist: Artist): boolean {
  const { spotify, soundcloud, bandcamp, ra, instagram, twitter, extra } = artist.links
  if (spotify || soundcloud || bandcamp || ra || instagram || twitter) return true
  return !!extra && extra.length > 0
}

function hostLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    if (host.includes('bandcamp')) return 'Bandcamp'
    if (host.includes('spotify')) return 'Spotify'
    if (host.includes('soundcloud')) return 'SoundCloud'
    if (host.includes('ra.co')) return 'RA'
    if (host.includes('youtube') || host.includes('youtu.be')) return 'YouTube'
    if (host.includes('posh')) return 'Posh'
    return ''
  } catch {
    return ''
  }
}
