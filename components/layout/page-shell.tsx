import { type ReactNode } from 'react'
import { BackLink } from './back-link'
import { cn } from '@/lib/utils'

interface PageShellProps {
  children: ReactNode
  /** Page title rendered as `<h1>`. */
  title?: string
  /** One-line lede beneath the title. */
  subtitle?: string
  /** Show the back link at the top of the page. Defaults to `true`. */
  back?: boolean
  /** Where the back link points. Defaults to `/`. */
  backHref?: string
  /** Back link label. Defaults to `Back`. */
  backLabel?: string
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
  as: Tag = 'div',
  className,
}: PageShellProps) {
  const hasHeader = !!(title || subtitle)

  return (
    <Tag className={cn('flex flex-1 flex-col pt-20 sm:pt-24 pb-12 sm:pb-16', className)}>
      <div className="mx-auto flex w-full max-w-site flex-1 flex-col site-inset">
        {back && <BackLink href={backHref} label={backLabel} />}

        {hasHeader && (
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
