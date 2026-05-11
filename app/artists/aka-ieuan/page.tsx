import { ArtistPage } from '@/components/artist/artist-page'
import { akaIeuan } from '@/data/artists/aka-ieuan'

export const metadata = {
  title: 'aka ieuan — 4UH',
  description:
    'aka ieuan — Brooklyn-born and based electronic musician crafting live-recorded, hypnotic techno.',
}

export default function AkaIeuanPage() {
  return <ArtistPage artist={akaIeuan} />
}
