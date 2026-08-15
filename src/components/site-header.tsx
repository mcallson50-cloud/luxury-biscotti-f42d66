import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { nav, site } from '@/data/site'
import { cn } from '@/lib/utils'

/**
 * Fixed header. Transparent over hero media, then settles onto cream once the
 * page scrolls. Two elements only: the wordmark set large and centred, and a
 * three-dot trigger on the right that opens the full menu at every breakpoint.
 *
 * The row is a 1fr/auto/1fr grid rather than a flex row: the empty left cell
 * mirrors the trigger's width, so the wordmark sits on the true centre of the
 * page instead of the centre of the space left over beside the button.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on navigation and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Only the home page puts dark hero video behind the header. Everywhere else
  // the top of the page is cream, so the wordmark and dots stay ink.
  const overMedia = pathname === '/' && !scrolled && !open
  const onCream = !overMedia

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-700',
        scrolled || open
          ? 'bg-cream/92 backdrop-blur-md border-b border-ink/10'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto grid max-w-[1560px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-10 md:py-5">
        <span aria-hidden />

        <Link
          to="/"
          className={cn(
            'wordmark justify-self-center text-center text-[clamp(21px,4.4vw,46px)] transition-colors duration-700',
            onCream ? 'text-ink' : 'text-linen',
          )}
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        {/* Three dots — the only control up here. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center justify-self-end"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span aria-hidden className="flex flex-col items-center gap-[5px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  'block h-[5px] w-[5px] rounded-full transition-colors duration-700',
                  onCream ? 'bg-ink' : 'bg-linen',
                )}
              />
            ))}
          </span>
        </button>
      </div>

      {/* Menu drawer */}
      <div
        id="site-menu"
        hidden={!open}
        className="border-t border-ink/10 bg-cream px-5 pt-6 pb-9 md:px-10 md:pt-8 md:pb-12"
      >
        <nav className="grid gap-1" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="t-display border-b border-ink/8 py-3.5 text-[clamp(34px,6vw,68px)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link to="/shop" className="btn btn-solid">
            Shop the capsule
          </Link>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="t-label link-rule text-ink-faint"
          >
            {site.social.instagramHandle}
          </a>
        </div>
      </div>
    </header>
  )
}
