import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/legal-page'
import { site } from '@/data/site'
import policy from '../../content/policies/terms-of-service.json'

export const Route = createFileRoute('/terms-of-service')({
  head: () => ({
    meta: [
      { title: `${policy.title} | ${site.name}` },
      { name: 'description', content: policy.description },
    ],
  }),
  component: () => <LegalPage policy={policy} />,
})
