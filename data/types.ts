export type ReleaseType = 'album' | 'ep' | 'single' | 'remix' | 'live' | 'track'

export interface Release {
  title: string
  catalog?: string
  type: ReleaseType
  url: string
}

export interface Show {
  date: string
  title: string
  venue: string
  location: string
  url: string
  isPast?: boolean
  isTicketLink?: boolean
}

export interface SpotifyEmbed {
  kind: 'album' | 'playlist' | 'track' | 'artist'
  id: string
  title?: string
  externalUrl?: string
}

export interface SoundCloudEmbed {
  url: string
  title?: string
  color?: string
  isPlaylist?: boolean
}

export interface YouTubeEmbed {
  videoId: string
  title?: string
  /**
   * Override for the outbound list link. Use this when the YouTube URL
   * carries a timestamp (`t=`), playlist (`list=`), or radio mode that
   * the bare `watch?v=` reconstruction would drop. The embed iframe at
   * the top of the section still builds from `videoId`.
   */
  url?: string
}

export interface ArtistLinks {
  spotify?: string
  soundcloud?: string
  bandcamp?: string
  ra?: string
  instagram?: string
  twitter?: string
  email?: string
  /** Extra labelled links — rendered after the standard ones. */
  extra?: { label: string; url: string }[]
}

export interface Artist {
  slug: string
  name: string
  location?: string
  tagline?: string
  /**
   * Optional photo used as a background hero behind the artist name +
   * subtitle on their page. Path resolves from `public/` — e.g.
   * `/artists/aka-ieuan-header.jpg`. Falls back to the plain text header
   * when omitted.
   */
  headerImage?: string
  bio: string[]
  featuredAlbum?: SpotifyEmbed
  spotifyPlaylists?: SpotifyEmbed[]
  djSets?: SoundCloudEmbed[]
  /** Featured SoundCloud playlist — shown as the page's top embed (no header). */
  soundcloudPlaylist?: SoundCloudEmbed
  /** Additional curated SoundCloud playlists — rendered as their own section. */
  soundcloudPlaylists?: SoundCloudEmbed[]
  /** When set, the Sets section is this single embed (no list, no djSets). */
  setsPlaylist?: SoundCloudEmbed
  videos?: YouTubeEmbed[]
  releases: Release[]
  shows: Show[]
  links: ArtistLinks
  /** Optional FKA / past-alias section (e.g. yion for aka ieuan). */
  fka?: {
    name: string
    bio: string
    soundcloud?: SoundCloudEmbed
    spotify?: SpotifyEmbed
  }
}
