import type { Artist } from '../types'

/**
 * Aoi Taira — new 4UH roster artist. Fill these arrays in as content lands.
 * The artist page renders graceful empty states for any field left blank,
 * so partial population is fine. Single source of truth — no other file
 * needs to change when releases / shows / sets are added.
 */
export const aoiTaira: Artist = {
  slug: 'aoi-taira',
  name: 'Aoi Taira',
  location: '',
  tagline: '',
  bio: [],

  featuredAlbum: undefined,
  spotifyPlaylists: [],
  djSets: [],
  soundcloudPlaylist: undefined,

  videos: [
    { videoId: 'C16nXIZ8Oc4', title: 'Denko Pluto @TheLotRadio 08-16-2025' },
  ],

  releases: [],
  shows: [],

  links: {
    soundcloud: 'https://soundcloud.com/meu2djavtppz',
    instagram: 'https://www.instagram.com/aoi_tyla/',
    extra: [
      { label: 'Instagram — denko.plutotokyo', url: 'https://www.instagram.com/denko.plutotokyo/' },
    ],
  },
}
