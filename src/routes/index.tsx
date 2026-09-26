import home from '../../content/settings/home.json'
import { Link, createFileRoute } from '@tanstack/react-router'

import { InstagramFeed } from '@/components/instagram-feed'
import { Frame } from '@/components/media'
import { Reveal } from '@/components/reveal'
import { Container, SectionHead } from '@/components/ui/primitives'
import { menu } from '@/data/collection'
import { site } from '@/data/site'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      {/* ── Hero: the photograph fills the first screen ─────────── */}
      <section className="relative">
        <div className="relative min-h-[640px] h-[90svh] max-h-[960px] w-full overflow-hidden">
          <Frame
            photo="heroPicnic"
            ratio="cinema"
            radius="flat"
            priority
            drift
            className="absolute inset-0 h-full w-full"
            width={2400}
          />
          {/* Legibility wash — warm, never a grey scrim. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-espresso/72 via-espresso/18 to-espresso/28"
          />

          <Container className="relative flex h-full flex-col justify-end pt-28 pb-10 md:pb-14">
            <p
              className="t-label fade-in text-linen/80"
              style={{ animationDelay: '120ms' }}
            >
              {site.locationLabel}
            </p>

            <h1 className="rise t-display mt-4 overflow-hidden pb-[0.06em] text-[clamp(36px,7vw,96px)] text-linen">
              <span style={{ animationDelay: '80ms' }}>{home.heroLineOne}</span>
              <span style={{ animationDelay: '220ms' }}>{home.heroLineTwo}</span>
              <span style={{ animationDelay: '360ms' }} className="text-sand">
                {home.heroLineThree}
              </span>
            </h1>

            <div
              className="fade-in mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
              style={{ animationDelay: '700ms' }}
            >
              <p className="t-lead max-w-md text-linen/85">
                {home.heroDescription}
              </p>
              <p className="t-body text-linen">{site.hoursSummary}</p>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link to="/" hash="menu" className="btn btn-light">
                  View menu
                </Link>
                <Link
                  to="/visit"
                  className="btn border-linen/40 text-linen hover:bg-linen hover:text-espresso"
                >
                  Visit us
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>


      <section className="mt-16 md:mt-24">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <Reveal>
              <Frame photo="placeShopDog" ratio="tall" width={1200} sizes="(min-width: 768px) 46vw, 100vw" />
            </Reveal>
            <Reveal>
              <p className="t-label text-ink-faint">{home.placeLabel}</p>
              <h2 className="t-display mt-4 text-[clamp(34px,4vw,56px)]">{home.placeHeading}</h2>
              <p className="t-body mt-5 max-w-lg">{home.placeDescription}</p>
              <Link to="/visit" className="btn btn-ghost mt-6">Plan your visit</Link>
            </Reveal>
          </div>
        </Container>
      </section>
      {/* ── The menu ───────────────────────────────────────────── */}
      <section id="menu" className="mt-16 scroll-mt-28 md:mt-24">
        <Container>
          <SectionHead label="The menu" aside={home.menuCurrencyNote} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <h3 className="t-heading text-[26px]">On the bar</h3>
              <ul className="mt-5">
                {menu.coffee.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5"
                  >
                    <span className="text-[15px]">
                      {item.name}
                      <span className="mt-1 block text-[12px] text-ink-faint">
                        {item.note}
                      </span>
                    </span>
                    <span className="text-[14px] text-ink-soft">{item.price}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={90} className="lg:col-span-4">
              <h3 className="t-heading text-[26px]">Beans to take away</h3>
              <ul className="mt-5">
                {menu.beans.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3.5"
                  >
                    <span className="text-[15px]">
                      {item.name}
                      <span className="mt-1 block text-[12px] text-ink-faint">
                        {item.note}
                      </span>
                    </span>
                    <span className="text-[14px] text-ink-soft">{item.price}</span>
                  </li>
                ))}
              </ul>
              <Link to="/visit" className="btn btn-ghost mt-6">
                Hours + map
              </Link>
            </Reveal>

            <Reveal delay={170} className="lg:col-span-4">
              <Frame
                photo="menuIcedPour"
                ratio="tall"
                width={900}
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>


      <section className="mt-16 md:mt-24">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="t-label text-ink-faint">{home.clothingLabel}</p>
              <h2 className="t-display mt-4 text-[clamp(34px,4vw,56px)]">{home.clothingHeading}</h2>
              <p className="t-body mt-5 max-w-lg">{home.clothingDescription}</p>
              <Link to="/shop" className="btn btn-solid mt-6">Explore the shop</Link>
            </Reveal>
            <Reveal>
              <Frame photo="clothingCrew" ratio="wide" width={1200} sizes="(min-width: 768px) 46vw, 100vw" />
            </Reveal>
          </div>
        </Container>
      </section>

      <InstagramFeed />

      <section className="mt-16 md:mt-24">
        <Container>
          <div className="flex flex-col gap-6 border-t border-ink/15 pt-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="t-display text-[clamp(32px,4vw,52px)]">{home.visitHeading}</h2>
              <p className="t-body mt-3">{site.locationLabel}</p>
              <p className="t-body mt-2">{site.hoursSummary}</p>
            </div>
            <Link to="/visit" className="btn btn-solid self-start md:self-auto">Opening hours &amp; directions</Link>
          </div>
        </Container>
      </section>
    </>
  )
}
