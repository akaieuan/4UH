import { PageShell } from '@/components/layout/page-shell'
import { Pixelate } from '@/components/effects/pixelate'

export const metadata = {
  title: 'About — 4UHNYC',
  description: 'Music 4 Ur Health — bringing healthy sounding techno to NYC.',
}

export default function AboutPage() {
  return (
    <PageShell
      title={<Pixelate text="Music 4 Ur Health." duration={1400} />}
      subtitle="A label bringing healthy sounding techno to NYC."
    >
      <section className="max-w-2xl space-y-4 text-sm font-light leading-relaxed text-foreground/70">
        <p>
          4UHNYC was founded to connect the NYC sound with a global network of
          underground producers crafting healthy, hypnotic techno — a label
          and a stage for artists to release and perform on, curated for New
          Yorkers by New Yorkers.
        </p>
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
