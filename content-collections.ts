import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

/**
 * Journal entries live in content/journal as markdown. The collection is named
 * `posts` so the generated exports read `allPosts` / `Post`.
 *
 * `photo` is a key from src/data/photos.ts, which keeps art direction in one
 * place instead of scattering URLs through frontmatter.
 */
const posts = defineCollection({
  name: 'posts',
  directory: 'content/journal',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    categories: z.array(z.string()),
    photo: z.string(),
    author: z.string().default('Blassa Studio'),
    /** Pins an entry to the top of the journal index. */
    featured: z.boolean().default(false),
  }),
  transform: async (doc) => {
    const words = doc.content.trim().split(/\s+/).length
    return {
      ...doc,
      // Filename is the slug — stable even if the title is reworded.
      slug: doc._meta.path.replace(/\.md$/, ''),
      readingMinutes: Math.max(2, Math.round(words / 210)),
    }
  },
})

export default defineConfig({
  collections: [posts],
})
