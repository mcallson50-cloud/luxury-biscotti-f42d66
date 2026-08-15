/**
 * Netlify Forms helpers.
 *
 * Submissions must be POSTed to the static skeleton in public/ rather than to
 * a route — a POST to "/" is swallowed by the SSR handler and never reaches
 * Netlify's form processing. Forms only accept submissions on a deploy, not in
 * local dev.
 */

export const FORMS_ENDPOINT = '/__forms.html'

export function encodeForm(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}
