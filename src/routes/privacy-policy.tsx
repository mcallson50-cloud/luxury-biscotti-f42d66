import { createFileRoute } from '@tanstack/react-router'
import { ContactEmail, LegalPage } from '@/components/legal-page'
import { site } from '@/data/site'

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({
    meta: [
      { title: `Privacy Policy | ${site.name}` },
      { name: 'description', content: 'Privacy Policy for the BLASSA Studio website.' },
    ],
  }),
  component: Policy,
})

function Policy() {
  return (
    <LegalPage title="Privacy Policy">
      <section>
        <h2 className="t-heading text-xl">Who we are</h2>
        <p className="t-body mt-3 leading-relaxed">{site.name} is a café and creative space in {site.locationLabel}. This policy explains how personal information is handled through this website. For privacy enquiries or requests, email <ContactEmail />.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Information you provide</h2>
        <p className="t-body mt-3 leading-relaxed">When you use our contact form, we receive your name, email address, selected subject and message. Name, email and message are required to submit the form so we can understand and reply to your enquiry. If you contact us by email, we receive the information you choose to include. Please avoid sending sensitive personal information.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">How we use information</h2>
        <p className="t-body mt-3 leading-relaxed">We use enquiry details to reply, discuss reservations or purchases, manage your request and keep relevant correspondence. Technical information may also be used to operate and secure the website, prevent abuse and meet applicable legal obligations. We do not use contact enquiries to subscribe you to marketing.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Hosting and service providers</h2>
        <p className="t-body mt-3 leading-relaxed">The website and contact form use Netlify. Hosting and form services may process technical details such as IP address, browser information and request times, as well as submitted form data. Our email provider also processes messages sent to or from us. These providers process information to deliver their services and may use infrastructure outside Morocco. We may also disclose information where required by law.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">External content and links</h2>
        <p className="t-body mt-3 leading-relaxed">The website loads fonts from Google Fonts, may load images from Unsplash, and includes an OpenStreetMap map on the Visit page. Loading this content sends technical information, including your IP address, to those providers. Outbound links to Instagram and Google Maps are subject to those services’ privacy policies when you open them.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Cookies and analytics</h2>
        <p className="t-body mt-3 leading-relaxed">We do not currently use Google Analytics, advertising pixels or analytics tracking on this website. This does not prevent essential hosting or security processing or the external-content requests described above. If we introduce Google Analytics in the future, we will update this policy and put any required consent controls in place before activating it.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Retention and security</h2>
        <p className="t-body mt-3 leading-relaxed">We retain enquiry information only for as long as needed to respond, manage any related arrangement and meet applicable legal obligations. We use reasonable measures to protect information, but no internet transmission or storage system can be guaranteed completely secure.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Your choices and rights</h2>
        <p className="t-body mt-3 leading-relaxed">Subject to applicable law, you can request access to or correction of your personal information and object to its processing. You can also ask us to delete information where applicable. Email <ContactEmail /> to make a request; we may need to verify your identity. You can raise a concern with Morocco’s data protection authority, the <a href="https://www.cndp.ma/personnes-concernees/" target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">CNDP</a>.</p>
      </section>
      <section>
        <h2 className="t-heading text-xl">Changes to this policy</h2>
        <p className="t-body mt-3 leading-relaxed">We will update this page if our services or data practices change. The date above identifies the latest version. Contact us if you have questions about this policy.</p>
      </section>
    </LegalPage>
  )
}
