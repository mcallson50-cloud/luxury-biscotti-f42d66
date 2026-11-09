# BLASSA hosting on Cloudflare

This project uses TanStack Start server rendering and is configured for **Cloudflare Workers with static assets**, not a Pages upload of dist/client.

## Connect the existing Worker
1. In Cloudflare Workers & Pages, open the Worker that should serve BLASSA and connect this GitHub repository, branch main, to Workers Builds.
2. The Worker name must match the name in wrangler.jsonc (currently luxury-biscotti-f42d66). If your existing Worker has a different name, change that one field before deployment. Do not create a duplicate Worker or move a custom domain unintentionally.
3. Use Node 22.12+ (Node 24 is supported). Install with pnpm install --frozen-lockfile.
4. Build command: pnpm build
5. Deploy command: pnpm exec wrangler deploy
6. Set build variables TINA_PUBLIC_CLIENT_ID, TINA_TOKEN (secret), and TINA_BRANCH=main. Copy the values from your TinaCloud project; never commit the token.
7. TinaCloud must be connected to the same repository and branch. Ensure the production site origin is allowed in TinaCloud.
8. Open /admin/index.html after deployment, log in, edit a small item and save. Confirm that the GitHub commit triggers a successful Cloudflare build and appears on the public site.

If you currently use Cloudflare Pages, create/migrate to a Worker using this repository first, test its workers.dev URL, then attach your existing custom domain. This repository change alone does not move the live domain.

## Editing
TinaCloud writes content to GitHub. Cloudflare builds the new commit. No Netlify service is involved.
The build deliberately clears public/admin to avoid publishing an old local editor. With neither Tina variable configured, only the public site is built. With only one configured, the build fails with an actionable message.

## Contact
The form opens a prepared email in the visitor's mail app. It does not send messages or store form submissions on the server. The user must press Send in their email app. The page also provides the studio email address if no app opens.

## Local checks and deployment
- pnpm dev
- pnpm typecheck
- pnpm build
- pnpm preview
- pnpm exec wrangler deploy --dry-run
- pnpm deploy (requires your Cloudflare login or API credentials)

No Cloudflare account ID, API token, custom-domain route or Tina secret is committed.
After deployment, check home, shop detail URLs, Visit, policy pages, images and /admin/index.html. Then test an email draft and Tina content publishing before retiring your old Netlify project.
