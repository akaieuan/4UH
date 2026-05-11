import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { GlitchSplit } from '@/components/effects/glitch-split'
import { artistList } from '@/data/artists'

export const metadata = {
  title: 'Artists — 4UH',
  description: 'The 4UH roster.',
}

export default function ArtistsIndexPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 sm:pb-28">
      <div className="mx-auto max-w-site site-inset">
        <ul>
          {artistList.map(artist => (
            <li key={artist.slug}>
              <Link
                href={`/artists/${artist.slug}`}
                className="group grid grid-cols-[1fr_auto] gap-x-6 items-baseline py-4 transition-colors"
              >
                <span className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="text-lg sm:text-xl font-light text-foreground tracking-tight group-hover:opacity-90 transition-opacity">
                    <GlitchSplit trigger="hover">{artist.name}</GlitchSplit>
                  </span>
                  <span className="text-[12px] sm:text-[13px] font-light text-foreground/50 truncate">
                    {[artist.location, artist.tagline].filter(Boolean).join(' · ')}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-foreground/35 group-hover:text-foreground transition-colors"
                  strokeWidth={1.25}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
