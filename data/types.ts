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
  bio: string[]
  featuredAlbum?: SpotifyEmbed
  spotifyPlaylists?: SpotifyEmbed[]
  djSets?: SoundCloudEmbed[]
  soundcloudPlaylist?: SoundCloudEmbed
  videos?: YouTubeEmbed[]
  releases: Release[]
  shows: Show[]
  links: ArtistLinks
}
