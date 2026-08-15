import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { marked } from 'marked'

import { Frame } from '@/components/media'
import { Reveal } from '@/components/reveal'
import { Container, SectionHead } from '@/components/ui/primitives'
import { site } from '@/data/site'
import { findPost, formatDate, relatedPosts } from '@/lib/journal'

export const Route = createFileRoute('/journal/$slug')({
  loader: ({ params }) => {
    const post = findPost(params.slug)
    if (!post) throw notFound()

    return {
      post,
      // Rendered once on the server rather than on every client render.
      html: marked.parse(post.content, { async: false }) as string,
      related: relatedPosts(post),
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — ${site.name}` },
          { name: 'description', content: loaderData.post.summary },
          { property: 'og:title', content: loaderData.post.title },
          { property: 'og:description', content: loaderData.post.summary },
          { property: 'og:type', content: 'article' },
        ]
      : [],
  }),
  component: Article,
})

function Article() {
  const { post, html, related } = Route.useLoaderData()

  return (
    <article className="pt-28 md:pt-36">
      <Container>
        <nav className="t-label flex flex-wrap items-center gap-2.5 text-ink-faint">
          <Link to="/journal" search={{}} className="link-rule">
            Journal
          </Link>
          <span aria-hidden>/</span>
          {post.categories.map((category) => (
            <Link
              key={category}
              to="/journal"
              search={{ category }}
              className="link-rule text-ink"
            >
              {category}
            </Link>
          ))}
        </nav>

        <header className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h1 className="t-display lg:col-span-8 text-[clamp(38px,6.4vw,104px)]">
            {post.title}
          </h1>
          <div className="lg:col-span-4 lg:pt-4">
            <p className="t-lead">{post.summary}</p>
            <dl className="mt-7 grid gap-3 border-t border-ink/15 pt-5">
              <div className="flex justify-between gap-4">
                <dt className="t-label text-ink-faint">Written by</dt>
                <dd className="text-[14px]">{post.author}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="t-label text-ink-faint">Published</dt>
                <dd className="text-[14px]">{formatDate(post.date)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="t-label text-ink-faint">Reading</dt>
                <dd className="text-[14px]">{post.readingMinutes} minutes</dd>
              </div>
            </dl>
          </div>
        </header>
      </Container>

      <Container className="mt-12">
        <Frame
          photo={post.photo}
          ratio="cinema"
          priority
          drift
          width={2000}
          sizes="100vw"
        />
      </Container>

      <Container width="narrow" className="mt-14 md:mt-20">
        {/* Markdown is authored in-repo under content/journal, not user input. */}
        <div
          className="prose-blassa"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-ink/15 pt-7">
          <p className="t-label mr-2 text-ink-faint">Filed under</p>
          {post.categories.map((category) => (
            <Link
              key={category}
              to="/journal"
              search={{ category }}
              className="rounded-full border border-ink/20 px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-linen"
            >
              {category}
            </Link>
          ))}
        </div>
      </Container>

      {/* ── Keep reading ───────────────────────────────────────── */}
      {related.length > 0 ? (
        <section className="mt-24 md:mt-32">
          <Container>
            <SectionHead
              index="→"
              label="Keep reading"
              aside={
                <Link to="/journal" search={{}} className="link-rule">
                  All entries
                </Link>
              }
            />
            <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {related.map((entry, i) => (
                <Reveal key={entry.slug} delay={i * 100}>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: entry.slug }}
                    className="group block"
                  >
                    <Frame
                      photo={entry.photo}
                      ratio="landscape"
                      zoom
                      width={1200}
                      sizes="(min-width: 768px) 46vw, 100vw"
                    />
                    <p className="t-label mt-5 text-ink-faint">
                      {formatDate(entry.date)}
                    </p>
                    <h3 className="t-heading mt-3 text-[clamp(22px,2.4vw,30px)]">
                      {entry.title}
                    </h3>
                    <p className="t-body mt-2.5 text-[14px]">{entry.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  )
}
