import { useState } from 'react'

import { encodeForm, FORMS_ENDPOINT } from '@/lib/forms'
import { site } from '@/data/site'

type State = 'idle' | 'sending' | 'done' | 'error'

const subjects = [
  'Just saying hello',
  'Hold a piece for me',
  'Workshops + events',
  'Collaboration',
  'Press',
] as const

/**
 * Netlify Forms contact form. Registered at build time via the skeleton in
 * public/__forms.html — submissions only process on a deploy, not in dev.
 */
export function ContactForm() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: subjects[0] as string,
    message: '',
  })
  const [state, setState] = useState<State>('idle')
  const [touched, setTouched] = useState(false)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)
  const showEmailError = touched && fields.email.length > 0 && !emailValid

  const update =
    (key: keyof typeof fields) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setFields((prev) => ({ ...prev, [key]: event.target.value }))
      if (state === 'error') setState('idle')
    }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setTouched(true)
    if (!emailValid || !fields.name || !fields.message) return
    if (state === 'sending') return

    setState('sending')
    try {
      const response = await fetch(FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({ 'form-name': 'contact', ...fields }),
      })
      if (!response.ok) throw new Error(String(response.status))
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className="border-t border-clay/40 pt-7">
        <p className="t-display text-[clamp(26px,3vw,40px)] text-clay">
          Thank you — that’s landed.
        </p>
        <p className="t-body mt-4 max-w-sm">
          Someone reads these between services, so give us a day or two. If it is
          urgent, the phone is quicker: {site.contact.phone}.
        </p>
        <button
          type="button"
          onClick={() => {
            setFields({ name: '', email: '', subject: subjects[0], message: '' })
            setTouched(false)
            setState('idle')
          }}
          className="btn btn-ghost mt-7"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-7" noValidate>
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this in <input name="bot-field" tabIndex={-1} />
        </label>
      </p>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="t-label text-ink-faint">Your name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            value={fields.name}
            onChange={update('name')}
            onBlur={() => setTouched(true)}
            aria-invalid={touched && !fields.name}
            className="field mt-2"
            placeholder="Hafida Tazi"
          />
        </label>

        <label className="block">
          <span className="t-label text-ink-faint">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={update('email')}
            onBlur={() => setTouched(true)}
            aria-invalid={showEmailError}
            aria-describedby={showEmailError ? 'email-error' : undefined}
            className="field mt-2"
            placeholder="you@email.com"
          />
          {showEmailError ? (
            <span id="email-error" className="mt-2 block text-[13px] text-[#9a4a34]">
              That address is missing something.
            </span>
          ) : null}
        </label>
      </div>

      <label className="block">
        <span className="t-label text-ink-faint">What is it about</span>
        <select
          name="subject"
          value={fields.subject}
          onChange={update('subject')}
          className="field mt-2"
        >
          {subjects.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="t-label text-ink-faint">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          value={fields.message}
          onChange={update('message')}
          onBlur={() => setTouched(true)}
          aria-invalid={touched && !fields.message}
          className="field mt-2"
          placeholder="Tell us what you need."
        />
      </label>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="btn btn-solid"
          disabled={state === 'sending'}
        >
          {state === 'sending' ? 'Sending' : 'Send it'}
        </button>
        <p className="t-body max-w-xs text-[13px]">
          We keep your email for replying and nothing else.
        </p>
      </div>

      {state === 'error' ? (
        <p className="border-t border-[#9a4a34]/40 pt-4 text-[14px] text-[#9a4a34]">
          Something went wrong sending that. Try again in a moment, or email{' '}
          <a href={`mailto:${site.contact.email}`} className="underline">
            {site.contact.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  )
}
