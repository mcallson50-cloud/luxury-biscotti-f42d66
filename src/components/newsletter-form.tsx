import { useState } from 'react'

import { encodeForm, FORMS_ENDPOINT } from '@/lib/forms'

type State = 'idle' | 'sending' | 'done' | 'error'

/** Netlify Forms signup. Registered via the skeleton in public/__forms.html. */
export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (state === 'sending') return
    setState('sending')
    try {
      const response = await fetch(FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({ 'form-name': 'newsletter', email }),
      })
      if (!response.ok) throw new Error(String(response.status))
      setState('done')
      setEmail('')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <p className="mt-5 border-t border-clay/40 pt-4 text-[15px] text-clay">
        You’re on the list. Nothing will arrive until there’s something worth
        sending.
      </p>
    )
  }

  return (
    <form onSubmit={submit} className="mt-5" noValidate>
      <input type="hidden" name="form-name" value="newsletter" />
      <p className="hidden">
        <label>
          Don’t fill this in <input name="bot-field" tabIndex={-1} />
        </label>
      </p>

      <div className="flex items-end gap-3">
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (state === 'error') setState('idle')
            }}
            aria-invalid={state === 'error'}
            className="field"
          />
        </label>
        <button
          type="submit"
          className="btn btn-ghost px-5 py-2.5"
          disabled={state === 'sending'}
        >
          {state === 'sending' ? 'Sending' : 'Join'}
        </button>
      </div>

      {state === 'error' ? (
        <p className="mt-2.5 text-[13px] text-[#9a4a34]">
          That didn’t go through. Try again, or email{' '}
          <a href="mailto:hej@blassastudio.com" className="underline">
            hej@blassastudio.com
          </a>
          .
        </p>
      ) : null}
    </form>
  )
}
