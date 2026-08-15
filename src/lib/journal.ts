import { allPosts, type Post } from 'content-collections'

/** Journal entries, newest first. */
export const journal: Post[] = [...allPosts].sort((a, b) =>
  b.date.localeCompare(a.date),
)

/** The pinned entry, falling back to the most recent one. */
export const leadPost: Post | undefined =
  journal.find((post) => post.featured) ?? journal[0]

export const categories: string[] = [
  ...new Set(journal.flatMap((post) => post.categories)),
].sort()

const formatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatDate(date: string): string {
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? date : formatter.format(parsed)
}

export function findPost(slug: string): Post | undefined {
  return journal.find((post) => post.slug === slug)
}

/** Other entries to offer at the end of an article. */
export function relatedPosts(post: Post, limit = 2): Post[] {
  const scored = journal
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      shared: candidate.categories.filter((c) => post.categories.includes(c))
        .length,
    }))
    .sort((a, b) => b.shared - a.shared)

  return scored.slice(0, limit).map((entry) => entry.candidate)
}
