# BLASSA Studio

Culture, café and creative space in Tamraght, Morocco.

## Hosting and editing
GitHub stores the code and content. TinaCloud edits the content. Cloudflare Workers serves the website.
See [CLOUDFLARE.md](./CLOUDFLARE.md) for dashboard settings, build variables and deployment steps.

## Development
Use Node 22.12+ and pnpm 11.25.0 (pinned in package.json).

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
```

## Stack
React 19, TanStack Start, Vite 7, Tailwind CSS 4, TinaCMS and Content Collections.
The contact form opens a prepared email in the visitor's email app. There is no server-side form submission service.

## Content
- content/settings/: homepage, menu, shop, Visit, photos and studio details
- content/policies/: four editable policy pages
- content/journal/: journal articles
- tina/config.ts: CMS fields
- tina/tina-lock.json: committed schema for TinaCloud indexing
- src/components/: interface components
- src/styles.css: design tokens and component styles
- wrangler.jsonc: Cloudflare Worker configuration

Run Tina locally using pnpm dev:cms when changing its schema, and commit the updated tina/tina-lock.json. Generated admin assets and secrets must not be committed.
See [AGENTS.md](./AGENTS.md) for coding conventions.
