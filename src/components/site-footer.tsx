import { Link } from '@tanstack/react-router'

import { nav, site } from '@/data/site'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ink/12 bg-cream md:mt-24">
      <div className="mx-auto max-w-[1560px] px-5 py-10 md:px-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          <div>
            <p className="t-label text-ink-faint">{site.tagline}</p>
            <p className="t-display mt-4 text-[48px]">
              Blassa
            </p>

          </div>

          <div>
            <h2 className="t-label text-ink-faint">Pages</h2>
            <ul className="mt-4 grid gap-2.5">
              <li><Link to="/" hash="menu" className="link-rule text-[15px]">Menu</Link></li>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="link-rule text-[15px]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
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

        </div>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-ink/12 pt-6 md:flex-row md:items-center md:justify-between">
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
