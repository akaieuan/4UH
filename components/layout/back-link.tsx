import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface BackLinkProps {
  /** Destination. Defaults to the home page. */
  href?: string
  /** Label text. Defaults to 'Back'. */
  label?: string
}

export function BackLink({ href = '/', label = 'Back' }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[12px] tracking-wide text-foreground/45 hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.25} />
      {label}
    </Link>
  )
}
