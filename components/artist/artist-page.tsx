import { ArrowUpRight } from 'lucide-react'
import type { Artist, Release, Show, SoundCloudEmbed, YouTubeEmbed } from '@/data/types'
import { Collapsible } from './collapsible'
import { PageShell } from '@/components/layout/page-shell'

/**
 * Artist page — reads like the back of a record sleeve.
 *
 * Section order is intentional:
 *   bio → profile strip → FEATURED RELEASE (top SoundCloud embed) →
 *   releases → shows → PLAYLISTS (additional SoundCloud embeds) →
 *   sets → video → FKA / past-alias.
 *
 * Two voices, never mixed: Geist Sans for prose / titles, Geist Mono
 * for the technical layer (catalogs, dates, indices, counts).
 *
 * Each row carries an `01 02 03 …` tracklist index — the move that
 * turns "list of links" into a discography. Section headers are
 * sleeve-note style: `// Releases · 25`.
 */
export function ArtistPage({ artist }: { artist: Artist }) {
  const upcomingShows = artist.shows.filter(s => !s.isPast)
  const pastShows = artist.shows.filter(s => s.isPast)
  const subtitleParts = [artist.location, artist.tagline].filter(Boolean)
  const subtitle = subtitleParts.length > 0 ? subtitleParts.join(' · ') : undefined

  // Sets are whatever's listed in `djSets`. Data is the source of truth —
  // no URL-matching dedup against the embedded playlists. If a playlist
  // shouldn't appear in both places, omit it from one of them in data.
  const djSets = artist.djSets ?? []

  return (
    <PageShell
      as="article"
      backHref="/artists"
      title={artist.name}
      subtitle={subtitle}
      headerImage={artist.headerImage}
    >
      {artist.bio.length > 0 ? (
        <section className="space-y-4 text-sm font-light leading-relaxed text-foreground/70">
          {artist.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      ) : (
        <p className="text-sm font-light text-foreground/45">Bio coming soon.</p>
      )}

      <ProfileStrip artist={artist} />

      {artist.soundcloudPlaylist && (
        <FeaturedReleaseSection
          embed={artist.soundcloudPlaylist}
          allLink={
            artist.links.bandcamp
              ? { href: artist.links.bandcamp, text: 'All on Bandcamp' }
              : undefined
          }
        />
      )}

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

      <VideoSection videos={artist.videos ?? []} />

      {artist.soundcloudPlaylists && artist.soundcloudPlaylists.length > 0 && (
        <PlaylistsSection
          playlists={artist.soundcloudPlaylists}
          allLink={
            artist.links.soundcloud
              ? { href: artist.links.soundcloud, text: 'All on SoundCloud' }
              : undefined
          }
        />
      )}

      {artist.setsPlaylist ? (
        <SetsEmbedSection
          embed={artist.setsPlaylist}
          allLink={
            artist.links.soundcloud
              ? { href: artist.links.soundcloud, text: 'All on SoundCloud' }
              : undefined
          }
        />
      ) : (
        djSets.length > 0 && (
          <ListSection
            title="Sets"
            count={djSets.length}
            allLink={
              artist.links.soundcloud
                ? { href: artist.links.soundcloud, text: 'All on SoundCloud' }
                : undefined
            }
          >
            {djSets.map((set, i) => (
              <SimpleRow key={i} index={i + 1} href={set.url} title={set.title ?? 'Untitled mix'} />
            ))}
          </ListSection>
        )
      )}

      {artist.fka && <FkaSection fka={artist.fka} />}
    </PageShell>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Profile strip — inline where-to-find-them links under the bio.
   ────────────────────────────────────────────────────────────────── */

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

/* ──────────────────────────────────────────────────────────────────
   SoundCloud — featured release at the top + multi-playlist section.
   ────────────────────────────────────────────────────────────────── */

function soundCloudSrc(embed: SoundCloudEmbed) {
  const color = embed.color ?? '%23ffffff'
  return (
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(embed.url)}` +
    `&color=${color}` +
    `&auto_play=false&hide_related=false&show_comments=true` +
    `&show_user=true&show_reposts=false&show_teaser=true`
  )
}

/**
 * Top-of-page SoundCloud embed — no section header. This is the artist's
 * featured release / mix playlist, the first thing playable on the page.
 * 450px, visual mode, full container width.
 */
function FeaturedReleaseSection({
  embed,
  allLink,
}: {
  embed: SoundCloudEmbed
  allLink?: { href: string; text: string }
}) {
  return (
    <section className="mt-12">
      <div className="overflow-hidden rounded-md border border-border bg-card/30">
        <iframe
          width="100%"
          height="450"
          scrolling="no"
          frameBorder="no"
          allow="autoplay; encrypted-media"
          className="block h-[400px] sm:h-[450px]"
          title={embed.title ?? 'Featured release'}
          src={soundCloudSrc(embed)}
        />
      </div>
      {allLink && <AllLink href={allLink.href} text={allLink.text} />}
    </section>
  )
}

/**
 * Sets section — a single SoundCloud playlist embed instead of a list
 * of djSets. Used when the artist has a curated mixes playlist that
 * makes the standalone list redundant.
 */
function SetsEmbedSection({
  embed,
  allLink,
}: {
  embed: SoundCloudEmbed
  allLink?: { href: string; text: string }
}) {
  return (
    <section className="mt-14 sm:mt-16">
      <SectionHeader title="Sets" />
      <div className="overflow-hidden rounded-md border border-border bg-card/30">
        <iframe
          width="100%"
          height="450"
          scrolling="no"
          frameBorder="no"
          allow="autoplay; encrypted-media"
          className="block h-[400px] sm:h-[450px]"
          title={embed.title ?? 'Sets playlist'}
          src={soundCloudSrc(embed)}
        />
      </div>
      {allLink && <AllLink href={allLink.href} text={allLink.text} />}
    </section>
  )
}

/**
 * Additional curated SoundCloud playlists (e.g. `aka/Releases/All`,
 * `aka/Releases/Health+`). Each gets its title as a sub-label and a
 * full 450px embed.
 */
function PlaylistsSection({
  playlists,
  allLink,
}: {
  playlists: SoundCloudEmbed[]
  allLink?: { href: string; text: string }
}) {
  return (
    <section className="mt-14 sm:mt-16">
      <SectionHeader title="Selected Tracks" />
      <div className="space-y-8">
        {playlists.map((p, i) => (
          <div key={i}>
            {p.title && (
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.05em] text-foreground/45">
                {p.title}
              </p>
            )}
            <div className="overflow-hidden rounded-md border border-border bg-card/30">
              <iframe
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay; encrypted-media"
                className="block h-[400px] sm:h-[450px]"
                title={p.title ?? 'SoundCloud playlist'}
                src={soundCloudSrc(p)}
              />
            </div>
          </div>
        ))}
      </div>
      {allLink && <AllLink href={allLink.href} text={allLink.text} />}
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Video section — first video is a playable YouTube embed at the top;
   the rest become a tracklist below it.
   ────────────────────────────────────────────────────────────────── */

function VideoSection({ videos }: { videos: YouTubeEmbed[] }) {
  if (videos.length === 0) {
    return (
      <ListSection title="Video" count={0} empty emptyText="No videos yet.">
        {null}
      </ListSection>
    )
  }
  const [featured, ...rest] = videos
  return (
    <section className="mt-14 sm:mt-16">
      <SectionHeader title="Video" count={videos.length} />
      <div>
        <div className="aspect-video overflow-hidden rounded-md border border-border bg-card/30">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${featured!.videoId}`}
            title={featured!.title ?? 'Featured video'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="block h-full w-full"
          />
        </div>
        {featured!.title && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.05em] text-foreground/45">
            {featured!.title}
          </p>
        )}
      </div>
      {rest.length > 0 && (
        <ul className="mt-8">
          {rest.map((v, i) => (
            <SimpleRow
              key={i}
              index={i + 1}
              href={v.url ?? `https://www.youtube.com/watch?v=${v.videoId}`}
              title={v.title ?? 'Video'}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
   FKA / past-alias section.
   ────────────────────────────────────────────────────────────────── */

function FkaSection({
  fka,
}: {
  fka: NonNullable<Artist['fka']>
}) {
  return (
    <section className="mt-14 sm:mt-16">
      <SectionHeader title={`FKA · ${fka.name}`} />
      <p className="mb-6 text-sm font-light leading-relaxed text-foreground/70">
        {fka.bio}
      </p>
      {fka.soundcloud && (
        <div className="overflow-hidden rounded-md border border-border bg-card/30">
          <iframe
            width="100%"
            height="450"
            scrolling="no"
            frameBorder="no"
            allow="autoplay; encrypted-media"
            className="block h-[400px] sm:h-[450px]"
            title={fka.soundcloud.title ?? `${fka.name} on SoundCloud`}
            src={soundCloudSrc(fka.soundcloud)}
          />
        </div>
      )}
      {fka.spotify && (
        <iframe
          src={`https://open.spotify.com/embed/${fka.spotify.kind}/${fka.spotify.id}?utm_source=4uhnyc&theme=0`}
          width="100%"
          height="352"
          frameBorder="0"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          // Spotify embeds round their own iframe at 12px. Wrapping in a div
          // with our standard `rounded-md` shows a hairline of background
          // through the corners — render the iframe bare with its own radius.
          style={{ borderRadius: 12 }}
          className="block"
          title={fka.spotify.title ?? `${fka.name} on Spotify`}
        />
      )}
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Shared section primitives
   ────────────────────────────────────────────────────────────────── */

function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <h2 className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">
      <span className="whitespace-nowrap">
        <span className="text-foreground/25">//&nbsp;</span>
        {title}
        {count !== undefined && count > 0 && (
          <span className="text-foreground/25"> · {count.toString().padStart(2, '0')}</span>
        )}
      </span>
      {/* Hairline trailing the section title — fills out to the right edge
          of the content column so the header reads as a sleeve-divider. */}
      <span aria-hidden className="h-px flex-1 bg-foreground/10" />
    </h2>
  )
}

function AllLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 inline-flex items-center gap-1.5 text-[12px] font-light text-foreground/50 hover:text-foreground transition-colors"
    >
      {text}
      <ArrowUpRight
        className="h-3.5 w-3.5 text-foreground/30 group-hover:text-foreground transition-colors"
        strokeWidth={1.25}
      />
    </a>
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
      <SectionHeader title={title} count={count} />
      {empty ? (
        <p className="text-sm font-light text-foreground/45">{emptyText}</p>
      ) : (
        <ul>{children}</ul>
      )}
      {allLink && !empty && <AllLink href={allLink.href} text={allLink.text} />}
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
   Rows
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
