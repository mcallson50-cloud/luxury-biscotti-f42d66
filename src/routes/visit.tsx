import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { ContactForm } from '@/components/contact-form'
import { Frame, VideoPanel } from '@/components/media'
import { Container, SectionHead } from '@/components/ui/primitives'
import { site } from '@/data/site'

export const Route = createFileRoute('/visit')({
  head: () => ({
    meta: [
      { title: `Visit — ${site.name}` },
      {
        name: 'description',
        content: `${site.tagline}. ${site.locationLabel}. ${site.hoursSummary}.`,
      },
    ],
  }),
  component: Visit,
})

/** OpenStreetMap embed — no API key, no third-party cookies. */
function mapUrls() {
  const { lat, lng } = site.coordinates
  const d = 0.006
  const bbox = [lng - d, lat - d / 2, lng + d, lat + d / 2].join('%2C')
  return {
    embed: `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`,
    link: site.mapsUrl,
    directions: site.mapsUrl,
  }
}

function Visit() {
  const maps = mapUrls()

  // Resolved after mount so the server and the visitor's clock can't disagree.
  const [today, setToday] = useState<string | null>(null)
  useEffect(() => {
    setToday(new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Africa/Casablanca' }).format(new Date()))
  }, [])

  return (
    <>
      {/* ── Masthead ───────────────────────────────────────────── */}
      <section className="pt-28 md:pt-36">
        <Container>
          <p className="t-label text-ink-faint">
            {site.locationLabel}
          </p>
          <h1 className="t-display mt-5 text-[clamp(44px,8vw,138px)]">
            Come and sit
            <br />
            for a while.
          </h1>
          <div className="mt-10 grid gap-10 border-t border-ink/15 pt-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 className="t-label text-ink-faint">The address</h2>
              <address className="t-lead mt-4 not-italic">
                {site.locationLabel}
              </address>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={maps.directions}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-solid"
                >
                  Get directions
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <h2 className="t-label text-ink-faint">Getting here</h2>
              <p className="t-body mt-4">Find BLASSA STUDIO in Tamraght, Morocco. Open our Google Maps listing for the exact location and directions.</p>
              <p className="t-body mt-4">{site.tagline}</p>
            </div>

            <div className="lg:col-span-4">
              <h2 className="t-label text-ink-faint">Get in touch</h2>
              <ul className="mt-4 grid gap-2.5 text-[15px]">
                <li>
                  <a href={`mailto:${site.contact.email}`} className="link-rule">
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.press}`} className="link-rule">
                    {site.contact.press}
                  </a>
                  <span className="text-ink-faint"> — press + stockists</span>
                </li>
                <li>
                  <a href={`tel:${site.contact.phoneHref}`} className="link-rule">
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-rule"
                  >
                    {site.social.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── The room, on film ──────────────────────────────────── */}
      <section className="mt-16 md:mt-20">
        <VideoPanel
          video="/media/counter.mp4"
          poster="spaceWindowTable"
          ratio="cinema"
          radius="flat"
          width={2400}
        />
      </section>

      {/* ── Hours + map ────────────────────────────────────────── */}
      <section className="mt-20 md:mt-28">
        <Container>
          <SectionHead
            label="Opening hours"
            aside={today ? `Today — ${today}` : 'Saturday to Thursday'}
          />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <ul>
                {site.hours.map((row) => {
                  const isToday = today ? row.days === today : false
                  return (
                    <li
                      key={row.days}
                      className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4"
                    >
                      <span className="text-[15px]">
                        {row.days}
                        {isToday ? (
                          <span className="t-label ml-3 text-clay">Today</span>
                        ) : null}

                      </span>
                      <span
                        className={
                          row.open === 'Closed'
                            ? 'text-[15px] text-ink-faint'
                            : 'text-[15px]'
                        }
                      >
                        {row.open}
                      </span>
                    </li>
                  )
                })}
              </ul>
              <p className="t-body mt-6 text-[14px]">{site.hoursNote}</p>
              <Link to="/" hash="menu" className="btn btn-ghost mt-6">
                See the full menu
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="frame frame-card aspect-[4/3] w-full">
                <iframe
                  title={`Map showing ${site.name} in ${site.locationLabel}`}
                  src={maps.embed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative h-full w-full border-0"
                  style={{ filter: 'grayscale(0.35) sepia(0.12)' }}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/12 pt-2.5">
                <p className="t-body text-[13px]">
                  {site.locationLabel}
                </p>
                <a
                  href={maps.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="t-label link-rule text-ink-faint"
                >
                  Larger map
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Contact ────────────────────────────────────────────── */}
      <section className="mt-24 md:mt-32">
        <Container>
          <SectionHead label="Write to us" aside="We reply in a day or two" />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h2 className="t-display max-w-[22ch] text-[clamp(30px,3.8vw,58px)]">
                Questions about a size, a workshop, or bringing your own beans in.
              </h2>
              <p className="t-body mt-5 max-w-md">
                For a table of more than six, or the long table on a Sunday, ring
                instead — it is faster than email and we will know straight away.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-5">
              <Frame
                photo="visitMain"
                ratio="tall"
                width={1000}
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
