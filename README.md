# Blassa Studio

Website for Blassa Studio — a café and clothing brand in Neukölln, Berlin.
Coffee. Community. Clothing.

Four pages: the story on **Home**, the first capsule on **Shop**, café and brand
notes on **Journal**, and the address, hours, menu and contact form on **Visit**.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build into dist/
```

## Stack

| Layer     | What                                                 |
| --------- | ---------------------------------------------------- |
| Framework | TanStack Start (React 19, file-based routing)         |
| Build     | Vite 7                                               |
| Styling   | Tailwind CSS 4, tokens in `src/styles.css`            |
| Content   | Content Collections + `marked` for the journal        |
| Forms     | Netlify Forms                                        |
| Hosting   | Netlify                                              |

## Where things live

```
content/journal/     Journal articles (markdown + frontmatter)
public/media/        Drop-in video slots — see public/media/README.md
public/__forms.html  Netlify Forms skeleton (required, do not delete)
src/data/            Site details, collection catalogue, photo registry
src/routes/          One file per page
src/components/      Header, footer, media frames, forms, cards
src/styles.css       The whole design system
```

## Before this goes live

Three things in the repo are stand-ins, and all three are marked in place:

1. **`src/data/site.ts`** — address, phone, email, coordinates and opening hours
   are placeholders behind a comment at the top of the file. Every page reads
   from here, so correcting them once fixes the whole site, the map and the
   contact links.
2. **Photography** — the images are licensed Unsplash stand-ins registered in
   `src/data/photos.ts`. Swap the studio's own photographs in there and every
   page picks them up.
3. **Instagram** — `src/components/instagram-feed.tsx` is a hand-picked grid, not
   a live feed. A real feed needs an Instagram Graph API token; the component
   documents what to change when there is one.

Videos are optional and drop-in: put an MP4 in `public/media/` under one of the
four documented names and it starts playing. Until then each slot shows its
poster still.

See [AGENTS.md](./AGENTS.md) for the architecture and the conventions worth
knowing before editing.
