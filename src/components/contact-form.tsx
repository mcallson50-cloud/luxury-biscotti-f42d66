import { Link } from '@tanstack/react-router'
import { useState } from 'react'

import { contactEmailUrl } from '@/lib/contact-email'
import { site } from '@/data/site'

const subjects = [
  'Just saying hello',
  'Hold a piece for me',
  'Workshops + events',
  'Collaboration',
  'Press',
] as const

/** Prepares an email in the visitor’s mail app; no server-side form service. */
export function ContactForm() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: subjects[0] as string,
    message: '',
  })
  const [opened, setOpened] = useState(false)
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
      setOpened(false)
    }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setTouched(true)
    if (!emailValid || !fields.name.trim() || !fields.message.trim()) return
    window.location.href = contactEmailUrl(site.contact.email, fields)
    setOpened(true)
  }

  return (
    <form onSubmit={submit} className="grid gap-7" noValidate>
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
        >
          Open email app
        </button>
        <p className="t-body max-w-xs text-[13px]">
          We use your details to respond to your enquiry. Read our{' '}
          <Link to="/privacy-policy" className="underline underline-offset-4">Privacy Policy</Link>.
        </p>
      </div>

      <p className="t-body text-[13px]">
        This opens a prepared email. Send it from your email app to contact us.
        If no email app opens, copy your message and email{' '}
        <a href={`mailto:${site.contact.email}`} className="underline">{site.contact.email}</a>.
      </p>
      {opened && (
        <p role="status" className="border-t border-clay/40 pt-4 text-[14px]">
          Your email draft is ready to open. Your message has not been sent by this website.
        </p>
      )}
    </form>
  )
}
