import { Container } from '@/components/ui/primitives'
import { site } from '@/data/site'

type Policy = {
  title: string
  updated?: string
  sections?: { heading: string; body: string; links?: { label: string; url: string }[] }[]
}

function safeLink(url: string) {
  return /^(https?:\/\/|mailto:|\/(?!\/))/.test(url) ? url : undefined
}

export function LegalPage({ policy }: { policy: Policy }) {
  return (
    <section className="pt-28 md:pt-36">
      <Container>
        <article className="mx-auto max-w-3xl">
          <p className="t-label text-ink-faint">{site.name}</p>
          <h1 className="t-display mt-5 text-[clamp(40px,7vw,88px)]">{policy.title}</h1>
          {policy.updated && <p className="t-body mt-5 text-[14px]">Last updated: {policy.updated}</p>}
          <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8">
            {(policy.sections ?? []).map((section, index) => (
              <section key={index}>
                <h2 className="t-heading text-xl">{section.heading}</h2>
                <p className="t-body mt-3 whitespace-pre-line leading-relaxed">{section.body}</p>
                {!!section.links?.length && (
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}><a href={safeLink(link.url)} className="underline underline-offset-4">{link.label}</a></li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <p className="t-body mt-10 border-t border-ink/15 pt-6">
            Contact: <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4">{site.contact.email}</a>
          </p>
        </article>
      </Container>
    </section>
  )
}
