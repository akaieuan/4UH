import { ArrowUpRight } from 'lucide-react'
import { BackLink } from '@/components/layout/back-link'

export const metadata = {
  title: 'Contact — 4UHNYC',
  description: 'Booking and demo submissions for the 4UHNYC label.',
}

const CONTACTS = [
  {
    label: 'Booking',
    display: 'laststopmgmt@gmail.com',
    href: 'mailto:laststopmgmt@gmail.com',
    external: false,
    blurb: 'Live and DJ bookings for the 4UH roster — clubs, festivals, parties.',
  },
  {
    label: 'Demos',
    display: 'SoundCloud DM — @akaieuan',
    href: 'https://soundcloud.com/akaieuan',
    external: true,
    blurb: 'Send demos as a DM to aka ieuan on SoundCloud.',
  },
] as const

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="mx-auto max-w-site site-inset">
        <BackLink />
        <h1 className="mt-10 sm:mt-14 text-lg font-light tracking-tight text-foreground">
          Contact.
        </h1>
        <p className="mt-1.5 text-sm font-light text-foreground/55">
          Pick the inbox that fits.
        </p>

        <ul className="mt-12 sm:mt-14 max-w-2xl">
          {CONTACTS.map(c => (
            <li key={c.label} className="py-5 sm:py-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/40 font-light">
                {c.label}
              </p>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group mt-2 inline-flex items-center gap-1.5 text-base font-light text-foreground hover:opacity-80 transition-opacity"
              >
                {c.display}
                <ArrowUpRight className="h-4 w-4 text-foreground/45 group-hover:text-foreground transition-colors" strokeWidth={1.25} />
              </a>
              <p className="mt-2 text-[13px] font-light text-foreground/50 leading-relaxed max-w-md">
                {c.blurb}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
