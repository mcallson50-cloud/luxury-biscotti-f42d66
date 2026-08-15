import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/ui/primitives'
import { site } from '@/data/site'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${site.name} — ${site.tagline}` },
      { name: 'description', content: site.description },
      { name: 'theme-color', content: '#f4efe6' },
      { property: 'og:title', content: `${site.name} — ${site.tagline}` },
      { property: 'og:description', content: site.description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300..700;1,400&family=Anton&display=swap',
      },
      { rel: 'preconnect', href: 'https://images.unsplash.com' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Flags that JS is available before first paint, which is what turns
            on the scroll-reveal transitions. Without it everything is simply
            visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.js='true'`,
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-cream text-ink antialiased">
        <a
          href="#main"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-3 focus:text-linen"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <Container className="flex min-h-[76vh] flex-col justify-center py-40">
      <p className="t-label text-ink-faint">Error 404</p>
      <h1 className="t-display mt-5 text-[clamp(52px,10vw,132px)]">
        Nothing
        <br />
        here yet.
      </h1>
      <p className="t-lead mt-6 max-w-md">
        This page has either moved or was never made. The coffee is still
        downstairs.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-solid">
          Back home
        </Link>
        <Link to="/journal" className="btn btn-ghost">
          Read the journal
        </Link>
      </div>
    </Container>
  )
}
