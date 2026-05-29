import PrivacyPage from '../../_components/PrivacyPage'
import { createPageMetadata } from '../../_lib/seo'
import { defaultLocale } from '@/i18n'

export const metadata = createPageMetadata(defaultLocale, 'privacy')

export default function Page() {
  return <PrivacyPage locale={defaultLocale} />
}
