import { Link, createFileRoute } from '@tanstack/react-router'
import { ContactEmail, LegalPage } from '@/components/legal-page'
import { site } from '@/data/site'

export const Route = createFileRoute('/terms-of-service')({
  head: () => ({
    meta: [
      { title: `Terms of Service | ${site.name}` },
      { name: 'description', content: 'Terms of Service for the BLASSA Studio website.' },
    ],
  }),
  component: Policy,
})

function Policy() {
  return (
    <LegalPage title="Terms of Service">
      <section>
        <h2 className="t-heading text-xl">About this website</h2>
        <p className="t-body mt-3 leading-relaxed">This website is provided by {site.name}, a café and creative space in {site.locationLabel}. These terms cover your use of the website. Contact us at <ContactEmail /> with any questions.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Information and availability</h2>
        <p className="t-body mt-3 leading-relaxed">We aim to keep our opening hours, menu, product details and prices accurate. Information may change, and items or services may become unavailable. Please contact us to confirm details before making a special trip or arranging a purchase.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Shop enquiries and reservations</h2>
        <p className="t-body mt-3 leading-relaxed">Our online shop is a catalogue. The website does not currently accept online payments or complete purchases. Sending an enquiry or reservation request does not confirm an order. We will confirm availability, price, payment, collection or delivery arrangements and any applicable sale terms directly with you before you decide to buy.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Using the website</h2>
        <p className="t-body mt-3 leading-relaxed">Please use this website lawfully. Do not interfere with its operation, attempt unauthorised access or submit unlawful, abusive or misleading material through our contact form.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Images and creative work</h2>
        <p className="t-body mt-3 leading-relaxed">Our branding, photographs, designs and written content belong to us or their respective owners. Please ask before copying or using them commercially. Any use permitted by applicable law remains unaffected.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">External websites</h2>
        <p className="t-body mt-3 leading-relaxed">Links to Instagram, maps and other services take you to websites operated by third parties. Their own terms and privacy policies apply. We do not control their content or availability.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Availability and your rights</h2>
        <p className="t-body mt-3 leading-relaxed">We take reasonable care in maintaining the website, but cannot promise uninterrupted access or that every detail is free from error. Nothing in these terms excludes liability that cannot lawfully be excluded or limits your mandatory consumer rights.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Privacy and updates</h2>
        <p className="t-body mt-3 leading-relaxed">Our <Link to="/privacy-policy" className="underline underline-offset-4">Privacy Policy</Link> explains how information is handled. We may update these terms as the website changes. The date above identifies the latest version.</p>
      </section>
    </LegalPage>
  )
}
