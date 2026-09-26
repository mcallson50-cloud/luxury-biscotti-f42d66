# BLASSA editor setup

The Tina schema and generated `tina/tina-lock.json` must both be committed to
the branch selected in TinaCloud (normally `main`).

## Connect the existing TinaCloud project

1. In TinaCloud, open this project's Overview and copy its Client ID.
2. Create a read-only content token in the project's Tokens settings.
3. In Netlify, add these environment variables for builds:
   - `TINA_PUBLIC_CLIENT_ID`: the Client ID
   - `TINA_TOKEN`: the read-only content token
   - `TINA_BRANCH`: `main`
4. In TinaCloud, allow the production site origin:
   `https://luxury-biscotti-f42d66.netlify.app`.
5. Redeploy in Netlify, then open
   `https://luxury-biscotti-f42d66.netlify.app/admin/index.html` and log in.
6. Change a field and Save. Tina commits to GitHub. The change reaches the live
   site after Netlify successfully rebuilds.

Do not commit the token or put it in a public-prefixed environment variable.
The build continues to publish the public site without credentials, but does
not generate the online editor until both required variables are present.

## What is editable

- Homepage headings and descriptions, including the menu currency note
- Homepage hero, place, menu and clothing photos with accessibility descriptions
- Studio details, contact information, map coordinates, Instagram and hours
- Café drinks and beans, with descriptions, prices and list reordering

Existing placeholder contact details and menu prices are preserved for the
owner to replace. This is a form-based editor. Side-by-side live previews,
arbitrary page-section dragging, shop products and journal editing are not
included in this initial integration.

## Local development

`pnpm dev` runs the site normally. `pnpm dev:cms` runs Tina's local editor and
the site together. Open `/admin/index.html`; local editing needs no cloud token.
`pnpm build` builds the public site and, when configured, the production editor.

Content is imported from `content/settings/*.json`; keep those imports when
changing components so saved edits continue to affect the site. Regenerate and
commit `tina/tina-lock.json` whenever the schema changes.
