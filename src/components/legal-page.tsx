import type { ReactNode } from 'react'
import { Container } from '@/components/ui/primitives'
import { site } from '@/data/site'

export function ContactEmail() {
  return <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4">{site.contact.email}</a>
}

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="pt-28 md:pt-36">
      <Container>
        <article className="mx-auto max-w-3xl">
          <p className="t-label text-ink-faint">{site.name}</p>
          <h1 className="t-display mt-5 text-[clamp(40px,7vw,88px)]">{title}</h1>
          <p className="t-body mt-5 text-[14px]">Last updated: 22 October 2026</p>
          <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8">{children}</div>
        </article>
      </Container>
    </section>
  )
}
