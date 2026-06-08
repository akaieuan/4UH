import { type ReactNode } from 'react'
import { BackLink } from './back-link'
import { cn } from '@/lib/utils'

interface PageShellProps {
  children: ReactNode
  /** Page title rendered as `<h1>`. Accepts a string or a node (so a
   *  text-animation component like `<Pixelate />` can be passed in). */
  title?: ReactNode
  /** One-line lede beneath the title. */
  subtitle?: ReactNode
  /** Show the back link at the top of the page. Defaults to `true`. */
  back?: boolean
  /** Where the back link points. Defaults to `/`. */
  backHref?: string
  /** Back link label. Defaults to `Back`. */
  backLabel?: string
  /**
   * Optional background image. When set, the title + subtitle render
   * over this image as a full-page-width hero card. Resolves from
   * `public/` — e.g. `/artists/aka-ieuan-header.jpg`.
   */
  headerImage?: string
  /** Tag for the outer element. */
  as?: 'div' | 'article' | 'main' | 'section'
  /** Extra classes on the outer element. */
  className?: string
}

export function PageShell({
  children,
  title,
  subtitle,
  back = true,
  backHref = '/',
  backLabel = 'Back',
  headerImage,
  as: Tag = 'div',
  className,
}: PageShellProps) {
  const hasHeader = !!(title || subtitle)
  const hasImageHero = hasHeader && !!headerImage

  return (
    <Tag className={cn('flex flex-1 flex-col pt-20 sm:pt-24 pb-12 sm:pb-16', className)}>
      <div className="mx-auto flex w-full max-w-site flex-1 flex-col site-inset">
        {back && <BackLink href={backHref} label={backLabel} />}

        {hasImageHero && (
          <div
            className={cn(
              'relative w-full overflow-hidden rounded-md border border-border bg-card/30',
              'aspect-[16/9] sm:aspect-[21/9]',
              back && 'mt-6 sm:mt-8',
            )}
          >
            {/* Background photo — full-bleed cover within the card. */}
            <img
              src={headerImage}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark vignette so the title remains legible over busy imagery. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10"
            />
            {/* Title block, bottom-left like an album credit. */}
            <div className="relative flex h-full flex-col justify-end p-5 sm:p-8 md:p-10">
              {title && (
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-foreground">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-2 text-[13px] sm:text-sm font-light text-foreground/80">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {hasHeader && !hasImageHero && (
          <header className={cn('max-w-2xl', back && 'mt-6 sm:mt-8')}>
            {title && (
              <h1 className="text-lg font-light tracking-tight text-foreground">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1.5 text-sm font-light text-foreground/55">
                {subtitle}
              </p>
            )}
          </header>
        )}

        <div
          className={cn(
            'flex-1',
            hasHeader && 'mt-10 sm:mt-12',
            !hasHeader && back && 'mt-6 sm:mt-8',
          )}
        >
          {children}
        </div>
      </div>
    </Tag>
  )
}
