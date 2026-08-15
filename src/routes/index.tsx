import { Link, createFileRoute } from '@tanstack/react-router'

import { InstagramFeed } from '@/components/instagram-feed'
import { Marquee } from '@/components/marquee'
import { Figure, Frame, VideoPanel } from '@/components/media'
import { Reveal } from '@/components/reveal'
import { Container, SectionHead } from '@/components/ui/primitives'
import { coffeeStory, collection, menu } from '@/data/collection'
import { site } from '@/data/site'
import { formatDate, journal, leadPost } from '@/lib/journal'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const otherPosts = journal.filter((post) => post.slug !== leadPost?.slug).slice(0, 2)

  return (
    <>
      {/* ── Hero: the film fills the first screen ──────────────── */}
      <section className="relative">
        <div className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
          <VideoPanel
            video="/media/hero.mp4"
            poster="spaceGreenRoom"
            ratio="cinema"
            radius="flat"
            className="absolute inset-0 h-full w-full"
            width={2400}
          />
          {/* Legibility wash — warm, never a grey scrim. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-espresso/72 via-espresso/18 to-espresso/28"
          />

          <Container className="relative flex h-full flex-col justify-end pb-12 md:pb-16">
            <p
              className="t-label fade-in text-linen/80"
              style={{ animationDelay: '120ms' }}
            >
              {site.address.neighbourhood}, {site.address.city} — est. 2025
            </p>

            <h1 className="rise t-display mt-4 overflow-hidden pb-[0.06em] text-[clamp(52px,11vw,168px)] text-linen">
              <span style={{ animationDelay: '80ms' }}>Coffee.</span>
              <span style={{ animationDelay: '220ms' }}>Community.</span>
              <span style={{ animationDelay: '360ms' }} className="text-sand">
                Clothing.
              </span>
            </h1>

            <div
              className="fade-in mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              style={{ animationDelay: '700ms' }}
            >
              <p className="t-lead max-w-md text-linen/85">
                <em className="not-italic text-sand">Blassa</em> is Darija for the
                place. Ours opens at eight, empties by four, and sells the shirts
                off our own backs.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/shop" className="btn btn-light">
                  Capsule 01
                </Link>
                <Link
                  to="/visit"
                  className="btn border-linen/40 text-linen hover:bg-linen hover:text-espresso"
                >
                  Find the room
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <Marquee
        className="bg-cream"
        items={[
          'Coffee',
          'Community',
          'Clothing',
          `${site.address.neighbourhood}`,
          'Open at eight',
        ]}
      />

      {/* ── The story ──────────────────────────────────────────── */}
      <section className="mt-20 md:mt-32">
        <Container>
          <SectionHead index="01" label="The story" aside="Since 2025" />

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-display text-[clamp(34px,4.6vw,72px)]">
                We wanted somewhere to sit that did not want us to leave.
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-8">
                <p className="t-body">
                  Blassa began as an argument about chairs. Two of us had spent
                  years in rooms designed to move people through — hard seats,
                  loud rooms, a cup you were expected to finish standing up. We
                  wanted the opposite: a room built for the third hour, not the
                  first ten minutes.
                </p>
                <p className="t-body">
                  So we found a corner unit in {site.address.neighbourhood} with
                  bad plumbing and good light, put a long table in the middle of
                  it, and started roasting with friends. The clothing arrived
                  later and by accident — people kept asking where the staff
                  shirts came from.
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/12 pt-7 sm:grid-cols-4">
                {[
                  { value: '2025', label: 'Doors opened' },
                  { value: '11', label: 'Regulars before eight' },
                  { value: '120', label: 'Of each garment' },
                  { value: '19', label: 'Cups broken' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="t-label text-ink-faint">{stat.label}</dt>
                    <dd className="t-display mt-2 text-[clamp(28px,3vw,44px)]">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 lg:pt-14">
              <Figure
                photo="spaceCounter"
                ratio="portrait"
                caption="The counter, lowered eighty centimetres so you can watch the shots being pulled."
                index="Fig. 01"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── The brand ──────────────────────────────────────────── */}
      <section className="mt-24 md:mt-36">
        <Container>
          <SectionHead index="02" label="The brand" aside={collection.season} />

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-display text-[clamp(34px,4.6vw,72px)]">
                Clothes cut for the people already in the room.
              </h2>
              <p className="t-body mt-8">
                The brand started as staff aprons and got out of hand in the best
                way. Everything is drawn around an eight-hour shift behind a
                counter: boxy bodies, deep pockets, cloth that is allowed to fade
                honestly at the elbows and the cuffs.
              </p>
              <p className="t-body mt-5">
                Undyed or naturally pigmented — bone, sage, clay, terracotta. The
                palette came straight out of the café: the tiles behind the
                counter, the paper cups, the mint on the windowsill. Runs of 120,
                made in Porto, Bologna and Kraków, and no restocks.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/12 pt-7 sm:grid-cols-3">
                {[
                  { value: '6', label: 'Pieces in the capsule' },
                  { value: '120', label: 'Of each, then gone' },
                  { value: '3', label: 'Workshops, three countries' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="t-label text-ink-faint">{stat.label}</dt>
                    <dd className="t-display mt-2 text-[clamp(28px,3vw,44px)]">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/shop" className="btn btn-solid">
                  See the capsule
                </Link>
              </div>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-6">
              <Figure
                photo="clothingRack"
                ratio="slab"
                caption="The rack by the window. One hundred and twenty of each, then the hanger stays empty."
                index="Fig. 02"
                width={1200}
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── The community ──────────────────────────────────────── */}
      <section className="mt-24 md:mt-36">
        <Container>
          <SectionHead
            index="03"
            label="The community"
            aside="Everyone at one table"
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <Figure
                photo="spaceTable"
                ratio="slab"
                caption="The long table, most mornings. It fills before the two-seaters do."
                index="Fig. 03"
                width={1200}
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </Reveal>

            <Reveal delay={110} className="lg:col-span-7 lg:pt-6">
              <h2 className="t-display text-[clamp(34px,4.6vw,72px)]">
                The room only works because of who is in it.
              </h2>
              <p className="t-body mt-8 max-w-xl">
                Eleven people through the door before eight, most of them by name.
                A long table in the middle that strangers end up sharing, a shelf
                of books nobody has catalogued, and a rule we keep to: nobody gets
                moved on for sitting too long.
              </p>

              <dl className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {[
                  {
                    term: 'Cupping table',
                    detail:
                      'First Wednesday of the month, 18:00. Free, no booking — the roaster brings whatever landed that week.',
                  },
                  {
                    term: 'Mending afternoons',
                    detail:
                      'Bring anything of ours through at the elbow and we will get it darned. Bring anything else and we will try.',
                  },
                  {
                    term: 'The long table',
                    detail:
                      'Shared by default. Sundays it belongs to whoever gets there first and stays longest.',
                  },
                  {
                    term: 'Sound and wifi',
                    detail:
                      'Records until eleven, then quiet. Wifi on the chalkboard, no password on the door.',
                  },
                ].map((item) => (
                  <div key={item.term} className="border-t border-ink/12 pt-4">
                    <dt className="t-label">{item.term}</dt>
                    <dd className="t-body mt-2.5 text-[14px]">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── The coffee ─────────────────────────────────────────── */}
      <section className="mt-24 md:mt-36">
        <Container>
          <SectionHead index="04" label="The coffee" aside="Two origins" />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-display text-[clamp(34px,4.6vw,72px)]">
                {coffeeStory.heading}
              </h2>
              {coffeeStory.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="t-body mt-5">
                  {paragraph}
                </p>
              ))}
              <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-6">
                {coffeeStory.facts.map((fact) => (
                  <div key={fact.label} className="min-w-[7rem]">
                    <dd className="t-display text-[clamp(26px,2.6vw,38px)] text-clay">
                      {fact.value}
                    </dd>
                    <dt className="t-label mt-1.5 text-ink-faint">
                      {fact.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-6">
              <Figure
                photo="coffeePourOver"
                ratio="slab"
                caption="Two origins on the bar at a time. Whatever the roaster has, poured the slow way."
                index="Fig. 04"
                width={1200}
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── The menu ───────────────────────────────────────────── */}
      <section id="menu" className="mt-24 scroll-mt-28 md:mt-36">
        <Container>
          <SectionHead index="05" label="The menu" aside="Prices in euro" />
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
              <p className="t-body mt-5 text-[13px]">
                Bring your own cup and take fifty cents off anything on the bar.
              </p>
              <Link to="/visit" className="btn btn-ghost mt-6">
                Hours + map
              </Link>
            </Reveal>

            <Reveal delay={170} className="lg:col-span-4">
              <Figure
                photo="coffeeToast"
                ratio="portrait"
                caption="Two for the road, most mornings at half past eight."
                index="Fig. 05"
                width={900}
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Latest journal ────────────────────────────────────── */}
      {leadPost ? (
        <section className="mt-24 md:mt-36">
          <Container>
            <SectionHead
              index="06"
              label="Latest from the journal"
              aside={
                <Link to="/journal" className="link-rule">
                  All entries
                </Link>
              }
            />

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-10">
              <Reveal className="lg:col-span-7">
                <Link
                  to="/journal/$slug"
                  params={{ slug: leadPost.slug }}
                  className="group block"
                >
                  <Frame
                    photo={leadPost.photo}
                    ratio="wide"
                    zoom
                    width={1400}
                    sizes="(min-width: 1024px) 56vw, 100vw"
                  />
                  <p className="t-label mt-5 text-ink-faint">
                    {leadPost.categories.join(' · ')} — {formatDate(leadPost.date)}
                  </p>
                  <h3 className="t-heading mt-3 text-[clamp(26px,3vw,42px)]">
                    {leadPost.title}
                  </h3>
                  <p className="t-body mt-3 max-w-xl">{leadPost.summary}</p>
                  <span className="t-label link-rule mt-5 inline-block text-clay">
                    Read — {leadPost.readingMinutes} min
                  </span>
                </Link>
              </Reveal>

              <div className="grid gap-8 self-start lg:col-span-5 lg:pt-4">
                {otherPosts.map((post, i) => (
                  <Reveal key={post.slug} delay={100 + i * 90}>
                    <Link
                      to="/journal/$slug"
                      params={{ slug: post.slug }}
                      className="group grid grid-cols-[92px_1fr] gap-5 border-t border-ink/12 pt-5 sm:grid-cols-[128px_1fr]"
                    >
                      <Frame
                        photo={post.photo}
                        ratio="square"
                        radius="card"
                        zoom
                        width={400}
                        sizes="128px"
                      />
                      <div>
                        <p className="t-label text-ink-faint">
                          {formatDate(post.date)}
                        </p>
                        <h3 className="t-heading mt-2 text-[19px]">
                          {post.title}
                        </h3>
                        <p className="t-body mt-2 line-clamp-2 text-[13px]">
                          {post.summary}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <InstagramFeed />
    </>
  )
}
