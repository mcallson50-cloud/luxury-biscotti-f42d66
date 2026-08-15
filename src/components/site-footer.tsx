import { Link } from '@tanstack/react-router'

import { NewsletterForm } from '@/components/newsletter-form'
import { nav, site } from '@/data/site'

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/12 bg-cream md:mt-32">
      <div className="mx-auto max-w-[1560px] px-5 py-14 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="t-label text-ink-faint">{site.tagline}</p>
            <p className="t-display mt-5 max-w-[9ch] text-[clamp(56px,9vw,116px)]">
              Blassa
            </p>
            <p className="t-body mt-5 max-w-sm">
              Blassa is Darija for <em>the place</em>. Ours is on{' '}
              {site.address.street} in {site.address.neighbourhood} — open early,
              quiet by four, full of the same faces.
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h2 className="t-label text-ink-faint">Pages</h2>
            <ul className="mt-4 grid gap-2.5">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-rule text-[15px]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="t-label text-ink-faint">Find us</h2>
            <address className="mt-4 grid gap-2.5 text-[15px] not-italic">
              <span>
                {site.address.street}
                <br />
                {site.address.postcode} {site.address.city}
              </span>
              <a href={`mailto:${site.contact.email}`} className="link-rule">
                {site.contact.email}
              </a>
              <a href={`tel:${site.contact.phoneHref}`} className="link-rule">
                {site.contact.phone}
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="link-rule"
              >
                {site.social.instagramHandle}
              </a>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-label text-ink-faint">Once a month, at most</h2>
            <p className="t-body mt-4 text-[14px]">
              New drops, workshop dates, and whichever filter is on the bar.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-ink/12 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="t-label text-ink-faint">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="t-label text-ink-faint">
            {site.address.city} — {site.address.country}
          </p>
        </div>
      </div>
    </footer>
  )
}
