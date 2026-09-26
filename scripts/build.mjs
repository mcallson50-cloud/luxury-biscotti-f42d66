import { spawnSync } from 'node:child_process'

function run(file, args = []) {
  const result = spawnSync(process.execPath, [file, ...args], { stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

// Keep the public site deployable before the owner adds TinaCloud credentials.
if (process.env.TINA_PUBLIC_CLIENT_ID && process.env.TINA_TOKEN) {
  run('node_modules/@tinacms/cli/bin/tinacms', ['build'])
} else {
  console.warn('Tina editor not built: set TINA_PUBLIC_CLIENT_ID and TINA_TOKEN in Netlify, then redeploy.')
}
run('node_modules/vite/bin/vite.js', ['build'])
