import { ArrowUpRight } from 'lucide-react'
import type { Artist, Release, Show, SoundCloudEmbed } from '@/data/types'
import { Collapsible } from './collapsible'
import { PageShell } from '@/components/layout/page-shell'

/**
 * Artist page — reads like the back of a record sleeve.
 *
 * Stylistic decisions worth preserving:
 *  - Mono (Geist Mono) carries the technical voice: catalog numbers,
 *    indices, dates, counts. Sans carries the prose voice: bio, titles.
 *    Two voices, never mixed in the same span.
 *  - Every list row gets a 01/02/03 tracklist index in mono — the single
 *    move that turns "list of links" into "discography".
 *  - Section headers are `// Releases · 25`, not `RELEASES`. The `//`
 *    is sleeve-note voice, not UI label.
 *  - The artist's pinned set embeds inline under the bio so the page
 *    is something you can hear, not just skim.
 */
export function ArtistPage({ artist }: { artist: Artist }) {
  const upcomingShows = artist.shows.filter(s => !s.isPast)
  const pastShows = artist.shows.filter(s => s.isPast)
  const subtitleParts = [artist.location, artist.tagline].filter(Boolean)
  const subtitle = subtitleParts.length > 0 ? subtitleParts.join(' · ') : undefined
  const pinned = artist.soundcloudPlaylist ?? artist.djSets?.[0]

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

      {pinned && <PinnedEmbed embed={pinned} />}

      <ListSection
        title="Releases"
        count={artist.releases.length}
        empty={artist.releases.length === 0}
        emptyText="First release coming soon."
        allLink={artist.links.bandcamp ? { href: artist.links.bandcamp, text: 'All on Bandcamp' } : undefined}
      >
        <Collapsible initialCount={8}>
          {artist.releases.map((r, i) => (
            <ReleaseRow key={i} index={i + 1} release={r} />
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
          <ShowRow key={`u-${i}`} index={i + 1} show={s} />
        ))}
        {pastShows.length > 0 && (
          <SubLabel className={upcomingShows.length > 0 ? 'mt-6' : ''}>Past</SubLabel>
        )}
        <Collapsible initialCount={8}>
          {pastShows.map((s, i) => (
            <ShowRow key={`p-${i}`} index={i + 1} show={s} dim />
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
          <SimpleRow key={i} index={i + 1} href={set.url} title={set.title ?? 'Untitled mix'} />
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
            index={i + 1}
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
 * AND the redundant per-row platform tags.
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

/**
 * Pinned SoundCloud embed — first thing playable on the page. Uses the
 * artist's curated playlist when present, otherwise their most recent
 * dj set. Visual-mode player so the artwork carries.
 */
function PinnedEmbed({ embed }: { embed: SoundCloudEmbed }) {
  return (
    <section className="mt-12">
      <SleeveLabel>Pinned</SleeveLabel>
      <div className="overflow-hidden rounded-md border border-border bg-card/30">
        <iframe
          width="100%"
          height="300"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          className="block h-[260px] sm:h-[300px]"
          title={embed.title ?? 'Pinned set'}
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(embed.url)}&color=%23ffffff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
        />
      </div>
    </section>
  )
}

/**
 * `// Label` — sleeve-note style header used for the pinned embed and
 * elsewhere where the standard section header would be too heavy.
 */
function SleeveLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/40">
      <span className="text-foreground/25">//&nbsp;</span>
      {children}
    </p>
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
      <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
        <span className="text-foreground/25">//&nbsp;</span>
        {title}
        {count !== undefined && count > 0 && (
          <span className="text-foreground/25"> · {count.toString().padStart(2, '0')}</span>
        )}
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
      className={`list-none mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/35 ${className}`}
    >
      <span className="text-foreground/20">//&nbsp;</span>
      {children}
    </li>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Rows — every row carries a tracklist index (01, 02, …) on the
   left in mono. That single column is what makes the page read like
   a discography rather than a list of links.
   ────────────────────────────────────────────────────────────────── */

function TrackIndex({ n, dim }: { n: number; dim?: boolean }) {
  return (
    <span
      className={`font-mono text-[11px] tabular-nums tracking-tight ${
        dim ? 'text-foreground/20' : 'text-foreground/30'
      } group-hover:text-foreground/60 transition-colors`}
    >
      {n.toString().padStart(2, '0')}
    </span>
  )
}

function RowArrow() {
  return (
    <ArrowUpRight
      className="h-3.5 w-3.5 shrink-0 text-foreground/25 group-hover:text-foreground transition-colors"
      strokeWidth={1.25}
    />
  )
}

/** Title + arrow, with tracklist index. Used for Sets and Video. */
function SimpleRow({ index, href, title }: { index: number; href: string; title: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 sm:gap-x-4 py-3 transition-colors"
      >
        <TrackIndex n={index} />
        <span className="min-w-0 truncate text-[15px] font-light text-foreground/85 group-hover:text-foreground transition-colors">
          {title}
        </span>
        <RowArrow />
      </a>
    </li>
  )
}

/**
 * Tracklist + catalog + title. Catalog ("4UH.007") sits in mono next
 * to the index. Non-default release types (`live`, `remix`, `track`)
 * fill the catalog slot when no catalog is set; `album` is the default
 * and not surfaced.
 */
function ReleaseRow({ index, release }: { index: number; release: Release }) {
  const leading =
    release.catalog ?? (release.type && release.type !== 'album' ? release.type : undefined)
  return (
    <li>
      <a
        href={release.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 sm:gap-x-4 py-3 transition-colors"
      >
        <TrackIndex n={index} />
        <span className="flex min-w-0 items-baseline gap-3 sm:gap-4">
          {leading && (
            <span className="shrink-0 min-w-[4.5rem] font-mono text-[11px] uppercase tracking-[0.05em] text-foreground/45 whitespace-nowrap">
              {leading}
            </span>
          )}
          <span className="truncate text-[15px] font-light text-foreground/85 group-hover:text-foreground transition-colors">
            {release.title}
          </span>
        </span>
        <RowArrow />
      </a>
    </li>
  )
}

/** Tracklist + mono date + title (with venue, location). */
function ShowRow({ index, show, dim }: { index: number; show: Show; dim?: boolean }) {
  const venuePart = show.venue && show.venue !== 'TBA' ? ` — ${show.venue}` : ''
  const locPart = show.location && show.location !== 'TBA' ? `, ${show.location}` : ''
  return (
    <li className={dim ? 'opacity-50' : undefined}>
      <a
        href={show.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 sm:gap-x-4 py-3 transition-colors"
      >
        <TrackIndex n={index} dim={dim} />
        <span className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-4">
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.05em] text-foreground/45 whitespace-nowrap sm:min-w-[7rem]">
            {show.date}
          </span>
          <span className="truncate text-[15px] font-light text-foreground/85 group-hover:text-foreground transition-colors">
            {show.title}
            {venuePart}
            {locPart}
          </span>
        </span>
        <RowArrow />
      </a>
    </li>
  )
}
