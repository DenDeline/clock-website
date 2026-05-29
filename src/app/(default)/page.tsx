import HomePage from '../_components/HomePage'
import { createPageMetadata } from '../_lib/seo'
import { defaultLocale } from '@/i18n'

export const metadata = createPageMetadata(defaultLocale, 'home')

export default function Page() {
  return <HomePage locale={defaultLocale} />
}
