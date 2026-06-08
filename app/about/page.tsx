import { PageShell } from '@/components/layout/page-shell'

export const metadata = {
  title: 'About — 4UHNYC',
  description: 'Music 4 Ur Health — bringing healthy sounding techno to NYC.',
}

export default function AboutPage() {
  return (
    <PageShell
      title="Music 4 Ur Health."
      subtitle="A label bringing healthy sounding techno to NYC."
    >
      <section className="max-w-2xl space-y-4 text-sm font-light leading-relaxed text-foreground/70">
        <p>
          4UHNYC was founded to connect the NYC sound with a global network of
          underground producers crafting healthy, hypnotic techno.
        </p>
        <p>
          4UH is both a place for artists to release and perform techno music
          curated for New Yorkers by New Yorkers.
        </p>
      </section>

      <section className="mt-12 sm:mt-16 max-w-2xl space-y-4 text-sm font-light leading-relaxed text-foreground/70">
        <p>
          Consumer culture and the product of authenticity has changed DJ and
          production culture in techno music to be more spectacle than craft.
        </p>
        <p>
          NYC has been shaped by craft, with spectacle following — in that order.
        </p>
        <p>
          When we invert that relationship, we devalue the art that goes into
          the underground.
        </p>
      </section>
    </PageShell>
  )
}
