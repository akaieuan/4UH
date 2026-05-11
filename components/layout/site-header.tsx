'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/artists', label: 'Artists' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: scrolled ? 1 : 0,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      />
      <div className="relative mx-auto flex max-w-site items-center justify-between site-inset h-14">
        <Link
          href="/"
          className="text-[13px] font-light tracking-[0.32em] text-foreground transition-opacity hover:opacity-70"
          aria-label="4UH home"
        >
          4UH
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map(link => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[11px] uppercase tracking-[0.22em] font-light transition-colors',
                  active ? 'text-foreground' : 'text-foreground/55 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-l border-border">
            <SheetTitle className="text-[13px] font-light tracking-[0.32em]">4UH</SheetTitle>
            <nav className="mt-10 flex flex-col gap-6" aria-label="Mobile primary">
              {NAV_LINKS.map(link => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'text-base font-light tracking-wide transition-colors',
                      active ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
