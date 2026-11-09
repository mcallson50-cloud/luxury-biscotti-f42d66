import { spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'

function run(file, args = []) {
  const result = spawnSync(process.execPath, [file, ...args], { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

// Never publish a stale local-mode editor from a previous build.
rmSync('public/admin', { recursive: true, force: true })
if (Boolean(process.env.TINA_PUBLIC_CLIENT_ID) !== Boolean(process.env.TINA_TOKEN)) {
  throw new Error('Set both TINA_PUBLIC_CLIENT_ID and TINA_TOKEN in Cloudflare build variables.')
}
// Keep the public site deployable before TinaCloud credentials are configured.
if (process.env.TINA_PUBLIC_CLIENT_ID && process.env.TINA_TOKEN) {
  run('node_modules/@tinacms/cli/bin/tinacms', ['build'])
} else {
  console.warn('Tina editor not built: set TINA_PUBLIC_CLIENT_ID and TINA_TOKEN in Cloudflare build variables, then redeploy.')
}
run('node_modules/vite/bin/vite.js', ['build'])
