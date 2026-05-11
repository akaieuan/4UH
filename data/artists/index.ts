import { akaIeuan } from './aka-ieuan'
import { aoiTaira } from './aoi-taira'
import type { Artist } from '../types'

export const artists: Record<string, Artist> = {
  'aka-ieuan': akaIeuan,
  'aoi-taira': aoiTaira,
}

export const artistList: Artist[] = [akaIeuan, aoiTaira]

export function getArtist(slug: string): Artist | undefined {
  return artists[slug]
}
