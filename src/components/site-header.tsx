import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { nav, site } from '@/data/site'
import { cn } from '@/lib/utils'

/** Visible desktop navigation with a compact mobile menu. */
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

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

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
      <div className="mx-auto flex max-w-[1560px] justify-between items-center gap-4 px-5 py-4 md:px-10 md:py-5">

        <Link
          to="/"
          className={cn(
            'wordmark justify-self-center text-center text-[clamp(24px,3vw,38px)] transition-colors duration-700',
            onCream ? 'text-ink' : 'text-linen',
          )}
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className={cn('hidden items-center gap-8 md:flex', onCream ? 'text-ink' : 'text-linen')}>
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="t-label link-rule py-2" activeProps={{ 'aria-current': 'page' }} activeOptions={{ exact: true }}>{item.label}</Link>
          ))}
          <Link to="/" hash="menu" className="t-label link-rule py-2">Menu</Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn("flex h-11 items-center gap-2 px-2 text-sm md:hidden", onCream ? "text-ink" : "text-linen")}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
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
        className="border-t border-ink/10 bg-cream px-5 pt-4 pb-6 md:hidden"
      >
        <nav className="grid gap-1" aria-label="Mobile navigation">
          <Link to="/" hash="menu" onClick={() => setOpen(false)} className="t-display border-b border-ink/8 py-3.5 text-[34px]">View menu</Link>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="t-display border-b border-ink/8 py-3.5 text-[34px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-7 flex flex-wrap items-center gap-4">

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
