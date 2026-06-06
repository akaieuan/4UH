import { ArrowUpRight } from 'lucide-react'
import type { Artist, Release, Show } from '@/data/types'
import { Collapsible } from './collapsible'
import { PageShell } from '@/components/layout/page-shell'

export function ArtistPage({ artist }: { artist: Artist }) {
  const upcomingShows = artist.shows.filter(s => !s.isPast)
  const pastShows = artist.shows.filter(s => s.isPast)
  const subtitleParts = [artist.location, artist.tagline].filter(Boolean)
  const subtitle = subtitleParts.length > 0 ? subtitleParts.join(' · ') : undefined

  return (
    <PageShell as="article" backHref="/artists" title={artist.name} subtitle={subtitle}>
      {artist.bio.length > 0 ? (
        <section className="max-w-2xl space-y-4 text-sm font-light leading-relaxed text-foreground/70">
          {artist.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      ) : (
        <p className="text-sm font-light text-foreground/45">Bio coming soon.</p>
      )}

      <ProfileStrip artist={artist} />

      <ListSection
        title="Releases"
        count={artist.releases.length}
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
        count={artist.shows.length}
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
        count={artist.djSets?.length ?? 0}
        empty={!artist.djSets || artist.djSets.length === 0}
        emptyText="No mixes yet."
        allLink={artist.links.soundcloud ? { href: artist.links.soundcloud, text: 'All on SoundCloud' } : undefined}
      >
        {artist.djSets?.map((set, i) => (
          <SimpleRow key={i} href={set.url} title={set.title ?? 'Untitled mix'} />
        ))}
      </ListSection>

      <ListSection
        title="Video"
        count={artist.videos?.length ?? 0}
        empty={!artist.videos || artist.videos.length === 0}
        emptyText="No videos yet."
      >
        {artist.videos?.map((v, i) => (
          <SimpleRow
            key={i}
            href={`https://www.youtube.com/watch?v=${v.videoId}`}
            title={v.title ?? 'Video'}
          />
        ))}
      </ListSection>
    </PageShell>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Sub-components
   ────────────────────────────────────────────────────────────────── */

/**
 * Profile strip — one inline row of where-to-find-them links sitting
 * right under the bio. Replaces a full bottom-of-page "Links" section
 * AND the redundant "Bandcamp / RA / SoundCloud / YouTube" tags on
 * every release/show/set/video row below.
 */
function ProfileStrip({ artist }: { artist: Artist }) {
  const items: Array<{ label: string; href: string }> = []
  if (artist.links.spotify) items.push({ label: 'Spotify', href: artist.links.spotify })
  if (artist.links.soundcloud) items.push({ label: 'SoundCloud', href: artist.links.soundcloud })
  if (artist.links.bandcamp) items.push({ label: 'Bandcamp', href: artist.links.bandcamp })
  if (artist.links.ra) items.push({ label: 'Resident Advisor', href: artist.links.ra })
  if (artist.links.instagram) items.push({ label: 'Instagram', href: artist.links.instagram })
  if (artist.links.twitter) items.push({ label: 'Twitter', href: artist.links.twitter })
  if (artist.links.extra) {
    for (const e of artist.links.extra) items.push({ label: e.label, href: e.url })
  }
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Profiles"
      className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-light"
    >
      {items.map(item => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-foreground/55 hover:text-foreground transition-colors"
        >
          {item.label}
          <ArrowUpRight
            className="h-3 w-3 text-foreground/30 group-hover:text-foreground transition-colors"
            strokeWidth={1.25}
          />
        </a>
      ))}
    </nav>
  )
}

function ListSection({
  title,
  count,
  children,
  empty,
  emptyText,
  allLink,
}: {
  title: string
  count?: number
  children: React.ReactNode
  empty?: boolean
  emptyText?: string
  allLink?: { href: string; text: string }
}) {
  return (
    <section className="mt-14 sm:mt-16">
      <div className="mb-5 flex items-baseline gap-2">
        <h2 className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-light">
          {title}
        </h2>
        {count !== undefined && count > 0 && (
          <span className="text-[11px] font-light tabular-nums text-foreground/25">
            {count}
          </span>
        )}
      </div>
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
          className="group mt-6 inline-flex items-center gap-1.5 text-[12px] font-light text-foreground/50 hover:text-foreground transition-colors"
        >
          {allLink.text}
          <ArrowUpRight
            className="h-3.5 w-3.5 text-foreground/30 group-hover:text-foreground transition-colors"
            strokeWidth={1.25}
          />
        </a>
      )}
    </section>
  )
}

function SubLabel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <li
      className={`list-none mb-3 text-[11px] uppercase tracking-[0.22em] text-foreground/35 font-light ${className}`}
    >
      {children}
    </li>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Rows
   ────────────────────────────────────────────────────────────────── */

/** Title + arrow. Used for Sets and Video (host is obvious from the section). */
function SimpleRow({ href, title }: { href: string; title: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-x-4 py-3 transition-colors"
      >
        <span className="min-w-0 truncate text-[15px] font-light text-foreground/85 group-hover:text-foreground transition-colors">
          {title}
        </span>
        <ArrowUpRight
          className="h-3.5 w-3.5 shrink-0 text-foreground/30 group-hover:text-foreground transition-colors"
          strokeWidth={1.25}
        />
      </a>
    </li>
  )
}

/**
 * Catalog/type tag + title + arrow. The catalog ("4UH.007") or non-album
 * type ("live", "remix") sits left; "album" is treated as default and not
 * surfaced. Titles in the data often already carry "[live]" — that stays.
 */
function ReleaseRow({ release }: { release: Release }) {
  const leading =
    release.catalog ?? (release.type && release.type !== 'album' ? release.type : undefined)
  return (
    <li>
      <a
        href={release.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-3 transition-colors"
      >
        <span className="flex min-w-0 items-baseline gap-4">
          {leading && (
            <span className="shrink-0 min-w-[4.5rem] text-[11px] uppercase tracking-[0.18em] text-foreground/40 whitespace-nowrap">
              {leading}
            </span>
          )}
          <span className="truncate text-[15px] font-light text-foreground/85 group-hover:text-foreground transition-colors">
            {release.title}
          </span>
        </span>
        <ArrowUpRight
          className="h-3.5 w-3.5 text-foreground/30 group-hover:text-foreground transition-colors"
          strokeWidth={1.25}
        />
      </a>
    </li>
  )
}

/** Date + title (with venue/location) + arrow. Date column on sm+, stacked on mobile. */
function ShowRow({ show, dim }: { show: Show; dim?: boolean }) {
  const venuePart = show.venue && show.venue !== 'TBA' ? ` — ${show.venue}` : ''
  const locPart = show.location && show.location !== 'TBA' ? `, ${show.location}` : ''
  return (
    <li className={dim ? 'opacity-50' : undefined}>
      <a
        href={show.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-3 transition-colors"
      >
        <span className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-4">
          <span className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-foreground/40 whitespace-nowrap sm:min-w-[7rem]">
            {show.date}
          </span>
          <span className="truncate text-[15px] font-light text-foreground/85 group-hover:text-foreground transition-colors">
            {show.title}
            {venuePart}
            {locPart}
          </span>
        </span>
        <ArrowUpRight
          className="h-3.5 w-3.5 text-foreground/30 group-hover:text-foreground transition-colors"
          strokeWidth={1.25}
        />
      </a>
    </li>
  )
}
