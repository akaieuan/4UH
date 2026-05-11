import { BackLink } from '@/components/layout/back-link'

export const metadata = {
  title: 'About — 4UHNYC',
  description: 'Music 4 Ur Health — bringing healthy sounding techno to NYC.',
}

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="mx-auto max-w-site site-inset">
        <BackLink />
        <h1 className="mt-10 sm:mt-14 text-lg font-light tracking-tight text-foreground">
          Music 4 Ur Health.
        </h1>
        <p className="mt-1.5 text-sm font-light text-foreground/55">
          A label bringing healthy sounding techno to NYC.
        </p>

        <section className="mt-14 sm:mt-16 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-light mb-3">
            Healthy
          </p>
          <p className="text-sm font-light leading-relaxed text-foreground/70">
            Non-consumer.
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
      </div>
    </div>
  )
}
