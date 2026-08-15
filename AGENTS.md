# AGENTS.md

Orientation for developers and AI agents working on the Blassa Studio site.

## What this is

A four-page marketing site for a café + clothing brand: Home/About, Shop (with
per-piece detail pages), Journal (markdown articles), Visit/Contact. Heavy on
photography and ambient video. No cart, no accounts, no database — the only
server-side primitive in play is Netlify Forms.

### Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Framework  | TanStack Start                                    |
| Frontend   | React 19, TanStack Router v1 (file-based routing) |
| Build      | Vite 7                                            |
| Styling    | Tailwind CSS 4 (`@theme` tokens, no config file)  |
| Content    | Content Collections (type-safe markdown) + marked |
| Forms      | Netlify Forms                                     |
| Language   | TypeScript 5.9, strict                            |
| Deployment | Netlify                                           |

## Directory structure

```
├── content
│   └── journal                        # Journal articles, one markdown file each
│       ├── capsule-01-six-pieces.md
│       ├── cupping-table-wednesdays.md
│       ├── nass-nass.md
│       ├── one-year-of-keeping-the-lights-on.md   # featured: true — pins the lead slot
│       └── tazi-ceramics.md
├── public
│   ├── __forms.html                   # Netlify Forms skeleton. Required. See "Forms".
│   ├── favicon.ico
│   └── media                          # Drop-in MP4 slots; see its README
├── src
│   ├── components
│   │   ├── ui/primitives.tsx          # Container, SectionHead, Rule
│   │   ├── contact-form.tsx           # Netlify Forms → "contact"
│   │   ├── newsletter-form.tsx        # Netlify Forms → "newsletter"
│   │   ├── instagram-feed.tsx         # Static curated grid (no API token yet)
│   │   ├── marquee.tsx                # CSS scrolling word strip
│   │   ├── media.tsx                  # Frame, Figure, VideoPanel + ratio scale
│   │   ├── piece-card.tsx             # Collection piece card
│   │   ├── reveal.tsx                 # IntersectionObserver fade-up
│   │   ├── site-footer.tsx
│   │   └── site-header.tsx            # Fixed wordmark + three-dot menu drawer
│   ├── data
│   │   ├── collection.ts              # Piece type, pieces[], collection, menu, coffeeStory
│   │   ├── photos.ts                  # Photo registry + src()/alt() helpers
│   │   └── site.ts                    # ⚠️ Placeholder address, hours, contact, socials
│   ├── lib
│   │   ├── forms.ts                   # FORMS_ENDPOINT + encodeForm()
│   │   ├── journal.ts                 # Sorting, categories, formatDate, findPost, relatedPosts
│   │   └── utils.ts                   # cn()
│   ├── routes
│   │   ├── __root.tsx                 # Shell: meta, fonts, header/footer, grain, 404
│   │   ├── index.tsx                  # Home / About
│   │   ├── journal.$slug.tsx          # Article
│   │   ├── journal.index.tsx          # Journal index + category filter
│   │   ├── shop.$slug.tsx             # Piece detail
│   │   ├── shop.index.tsx             # Collection
│   │   └── visit.tsx                  # Visit / Contact
│   ├── router.tsx
│   └── styles.css                     # The entire design system
├── content-collections.ts             # Zod schema for the journal collection
├── netlify.toml
└── vite.config.ts
```

## The design system lives in one file

`src/styles.css` holds every token and every custom class. There is no
`tailwind.config.js` — Tailwind 4 reads the `@theme` block.

**Cascade rule, and it matters:** every custom class sits inside
`@layer components`. Tailwind's utility layer is declared after it, so
`className="t-label text-[13px]"` behaves the way you expect — the utility wins.
If you add a custom class outside a layer, it will silently beat every utility
that touches the same property and you will chase it for an hour. Put it in the
layer.

Tokens: cream/bone/sand/linen surfaces, ink/ink-soft/ink-faint text,
clay/espresso/olive/sage accents. `Work Sans` for everything structural,
`Impact` regular (`.t-display`) for editorial display type only — sparingly.
Impact is a system face on Windows and macOS; `Anton` is loaded from Google
Fonts as the metrically-close web fallback for everything else, so the display
stack is `Impact, "Anton", …`. Radii follow the pill scale
(`--radius-pill: 300px` for buttons), and there is exactly one elevation
(`--shadow-lift`); everything else is flat.

Type helpers: `.t-display`, `.t-heading`, `.t-label` (uppercase micro label),
`.t-body`, `.t-lead`, plus `.wordmark` for the header lockup. Buttons: `.btn`
plus `.btn-solid` / `.btn-ghost` /
`.btn-light`. Article body copy: `.prose-blassa`. Inputs: `.field`.

### Progressive enhancement

`.reveal` starts at `opacity: 0`, which would blank the page for anyone without
JavaScript — so it is scoped to `[data-js="true"] .reveal`, and `__root.tsx`
sets `document.documentElement.dataset.js` in an inline head script before paint.
Same idea for `prefers-reduced-motion`, which disables the reveals, the drift,
the marquee and the video slots.

## Media conventions

All imagery is registered once in `src/data/photos.ts` under a semantic key
(`spaceCounter`, `coffeePourOver`, `clothingRack`, …) with real alt text.
Components take the key, never a URL:

```tsx
<Frame photo="spaceCounter" ratio="portrait" width={1000} />
```

`src(key, width)` builds the URL and passes through anything that already starts
with `/` or `http`, so replacing a stand-in with a local file means editing the
`id` in the registry and nothing else. `alt(key)` reads the same record.

`Frame` fades an image in on load (with a `useEffect` fallback, because a cached
image never fires `onLoad` after hydration) over a woven cream placeholder.
`VideoPanel` layers an autoplaying muted `<video>` over a real `<img>` poster, so
a missing MP4 degrades to the still rather than to a black box — that is why the
`public/media/*.mp4` slots can be empty and the site still looks finished.
`Figure` adds a caption and a `Fig. NN` index.

## Content

Journal articles are markdown in `content/journal/`, validated by
`content-collections.ts` and imported as `allPosts`. Frontmatter: `title`,
`summary`, `date`, `categories[]`, `photo` (a photo registry key), `author`
(defaults to "Blassa Studio"), `featured` (defaults to false — the newest
featured post pins the lead slot). The transform derives `slug` and
`readingMinutes`. Adding an article means adding a file; the index, the category
filters and the related-post links all follow.

Markdown → HTML happens in the route loader (`marked.parse(..., { async: false })`)
so it runs once on the server, not on every client render. It is fed to
`dangerouslySetInnerHTML`, which is safe here only because the source is
in-repo authored content — never render user input through that path.

The collection catalogue and the café menu are plain typed modules in
`src/data/collection.ts`. Shop routes derive everything from `pieces[]`, so a
seventh piece is one array entry.

## Forms

Netlify Forms needs a static HTML form at build time to register a form, which a
TanStack Start SSR app does not produce. The workaround, which is load-bearing:

1. `public/__forms.html` holds a hidden skeleton of every form — matching
   `name`, matching field names, `data-netlify="true"`,
   `netlify-honeypot="bot-field"`. **A field that is not in the skeleton is
   dropped from the submission.**
2. The React forms POST to `/__forms.html` (`FORMS_ENDPOINT`), never to `/` —
   an SSR route swallows the body.
3. Content type is `application/x-www-form-urlencoded`, with a hidden
   `form-name` field naming the form and a hidden `bot-field` honeypot.

Adding a field means editing both the component and `public/__forms.html`.
Submissions only process on a deploy, not in `pnpm dev`.

## Placeholders

Three things are deliberately stand-ins and are marked where they live:

- `src/data/site.ts` — address, coordinates, phone, email, hours. Behind a
  ⚠️ comment at the top. Everything (map embed, directions link, `tel:`/`mailto:`,
  the Visit page's "Today" badge) reads from here.
- `src/data/photos.ts` — licensed Unsplash stand-ins.
- `src/components/instagram-feed.tsx` — a curated static grid; a live feed needs
  an Instagram Graph API token.

## Conventions

- Components PascalCase, utilities camelCase, route files kebab-case following
  TanStack's dotted convention (`shop.$slug.tsx`).
- Import via the `@/` alias; `type`-only imports use the `type` keyword.
- `noUnusedLocals` and `noUnusedParameters` are on — a leftover import fails the
  build.
- `strict` is on but `noUncheckedIndexedAccess` is not; index access is still
  guarded by hand where it can miss (`weekdays[new Date().getDay()] ?? null`).
- Nothing time- or locale-dependent renders during SSR. The Visit page resolves
  today's weekday in a `useEffect` and falls back to static copy, so the server
  and the visitor's clock cannot disagree and trigger a hydration mismatch.
- Local state only; there is no store and nothing needs one.

## Commands

```bash
pnpm dev      # dev server on :3000
pnpm build    # vite build → dist/client (per netlify.toml)
```
