BLASSA simplified design

Based on main commit 8f56f8fb413065023dc218840d832ddb07a80354.

Changes: shorter homepage; smaller hero typography; visible desktop navigation; compact mobile menu; four-image gallery; simpler footer without newsletter; product-first shop grid; journal links removed from navigation and homepage. Existing journal URLs remain available. Business details and media are unchanged.

Validation: production Vite build and TypeScript no-emit checks passed. Visual browser verification of the revised layout is still pending.

Apply using ONE method:
1. From your repository root, run git apply --check /path/to/blassa-design.patch, then git apply /path/to/blassa-design.patch.
2. Or copy the src folder and tsconfig.json from this ZIP into your repository, preserving paths and replacing the eight changed files.

Review and commit the changes, then push main to trigger your connected Netlify deployment.

The GitHub integration rejected writes with HTTP 403, Resource not accessible by integration. No remote commit or deployment was made.
