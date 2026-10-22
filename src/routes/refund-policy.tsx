import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/legal-page'
import { site } from '@/data/site'
import policy from '../../content/policies/refund-policy.json'

export const Route = createFileRoute('/refund-policy')({
  head: () => ({
    meta: [
      { title: `${policy.title} | ${site.name}` },
      { name: 'description', content: policy.description },
    ],
  }),
  component: () => <LegalPage policy={policy} />,
})
