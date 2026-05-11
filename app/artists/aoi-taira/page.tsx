import { ArtistPage } from '@/components/artist/artist-page'
import { aoiTaira } from '@/data/artists/aoi-taira'

export const metadata = {
  title: 'Aoi Taira — 4UH',
  description: 'Aoi Taira — 4UH roster.',
}

export default function AoiTairaPage() {
  return <ArtistPage artist={aoiTaira} />
}
