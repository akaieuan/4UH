import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Pixelate } from '@/components/effects/pixelate'
import { PageShell } from '@/components/layout/page-shell'
import { artistList } from '@/data/artists'

export const metadata = {
  title: 'Artists — 4UHNYC',
  description: 'The 4UHNYC roster.',
}

export default function ArtistsIndexPage() {
  return (
    <PageShell>
      <ul>
        {artistList.map(artist => (
          <li key={artist.slug}>
            <Link
              href={`/artists/${artist.slug}`}
              className="group grid grid-cols-[1fr_auto] gap-x-6 items-baseline py-4 transition-colors"
            >
              <span className="min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
                <span className="text-lg sm:text-xl font-light text-foreground tracking-tight">
                  <Pixelate text={artist.name} trigger="hover" duration={900} />
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
    </PageShell>
  )
}
