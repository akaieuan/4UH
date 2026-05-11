import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="bg-black mt-24">
      <div className="mx-auto max-w-site site-inset py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span className="text-[13px] font-light tracking-[0.32em] text-foreground">4UHNYC</span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/40">
            Brooklyn · NYC
          </span>
        </div>
        <nav className="flex items-center gap-6 text-[10px] uppercase tracking-[0.22em] font-light" aria-label="Footer">
          <Link href="/artists" className="text-foreground/55 hover:text-foreground transition-colors">
            Artists
          </Link>
          <Link href="/about" className="text-foreground/55 hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-foreground/55 hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
      </div>
      <div className="mx-auto max-w-site site-inset pb-8">
        <p className="text-[10px] font-light tracking-wide text-foreground/30">
          © {new Date().getFullYear()} 4UHNYC
        </p>
      </div>
    </footer>
  )
}
