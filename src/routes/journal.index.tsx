import { Link, createFileRoute } from '@tanstack/react-router'

import { Frame } from '@/components/media'
import { Reveal } from '@/components/reveal'
import { Container, SectionHead } from '@/components/ui/primitives'
import { site } from '@/data/site'
import { categories, formatDate, journal, leadPost } from '@/lib/journal'
import { cn } from '@/lib/utils'

type Search = { category?: string }

export const Route = createFileRoute('/journal/')({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category:
      typeof search.category === 'string' && categories.includes(search.category)
        ? search.category
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Journal — ${site.name}` },
      {
        name: 'description',
        content:
          'Café updates, collaborations, workshop dates and notes on what is on the bar.',
      },
    ],
  }),
  component: Journal,
})

function Journal() {
  const { category } = Route.useSearch()

  const entries = category
    ? journal.filter((post) => post.categories.includes(category))
    : journal

  // The pinned entry only leads the unfiltered view.
  const lead = category ? undefined : leadPost
  const rest = lead ? entries.filter((post) => post.slug !== lead.slug) : entries

  return (
    <>
      <section className="pt-28 md:pt-36">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="t-label text-ink-faint">
                {journal.length} entries — since 2025
              </p>
              <h1 className="t-display mt-5 text-[clamp(48px,9vw,150px)]">
                Journal
              </h1>
            </div>
            <p className="t-lead lg:col-span-4 lg:pt-28">
              What is changing in the café, who we are making things with, and
              which dates are worth turning up for. Written by whoever was
              closest to it.
            </p>
          </div>

          {/* Category filter — search-param driven, so it is linkable */}
          <nav
            className="mt-12 flex flex-wrap items-center gap-2 border-t border-ink/15 pt-6"
            aria-label="Filter by category"
          >
            <Link
              to="/journal"
              search={{}}
              className={cn(
                'rounded-full border px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300',
                !category
                  ? 'border-espresso bg-espresso text-linen'
                  : 'border-ink/20 text-ink-soft hover:border-ink hover:text-ink',
              )}
            >
              Everything
            </Link>
            {categories.map((name) => (
              <Link
                key={name}
                to="/journal"
                search={{ category: name }}
                className={cn(
                  'rounded-full border px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300',
                  category === name
                    ? 'border-espresso bg-espresso text-linen'
                    : 'border-ink/20 text-ink-soft hover:border-ink hover:text-ink',
                )}
              >
                {name}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      {/* ── Lead entry ─────────────────────────────────────────── */}
      {lead ? (
        <section className="mt-12">
          <Container>
            <Reveal>
              <Link
                to="/journal/$slug"
                params={{ slug: lead.slug }}
                className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-7">
                  <Frame
                    photo={lead.photo}
                    ratio="wide"
                    zoom
                    priority
                    width={1600}
                    sizes="(min-width: 1024px) 56vw, 100vw"
                  />
                </div>
                <div className="lg:col-span-5">
                  <p className="t-label text-clay">Pinned</p>
                  <h2 className="t-display mt-4 text-[clamp(32px,4vw,60px)]">
                    {lead.title}
                  </h2>
                  <p className="t-body mt-4">{lead.summary}</p>
                  <p className="t-label mt-6 text-ink-faint">
                    {formatDate(lead.date)} — {lead.author} —{' '}
                    {lead.readingMinutes} min
                  </p>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── Entry list ─────────────────────────────────────────── */}
      <section className="mt-20 md:mt-28">
        <Container>
          <SectionHead
            index="01"
            label={category ? `Filed under ${category}` : 'All entries'}
            aside={`${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`}
          />

          {rest.length === 0 ? (
            <div className="frame mt-10 flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
              <p className="t-display relative text-[clamp(26px,3vw,40px)]">
                Nothing filed here yet.
              </p>
              <p className="t-body relative max-w-sm">
                This is a category we have plans for and no entries in. Try
                everything else, or come and ask in person.
              </p>
              <Link to="/journal" search={{}} className="btn btn-solid relative">
                Show everything
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 90}>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: post.slug }}
                    className="group block"
                  >
                    <Frame
                      photo={post.photo}
                      ratio="landscape"
                      zoom
                      width={1000}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                    />
                    <p className="t-label mt-5 text-ink-faint">
                      {post.categories.join(' · ')}
                    </p>
                    <h3 className="t-heading mt-3 text-[22px]">{post.title}</h3>
                    <p className="t-body mt-2.5 text-[14px]">{post.summary}</p>
                    <p className="t-label mt-5 text-ink-faint">
                      {formatDate(post.date)} — {post.readingMinutes} min
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
