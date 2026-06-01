import LifeClockApp from '@/components/LifeClockApp'
import { getDictionary, getLocalizedUrl, type Locale } from '@/i18n'
import { getAppUrl } from '@/utils/urls'
import { Box } from '@mui/material'

export default function HomePage({ locale }: Readonly<{ locale: Locale }>) {
  const dictionary = getDictionary(locale)
  const page = dictionary.routes.home
  const appUrl = getAppUrl()
  const localizedUrl = getLocalizedUrl('/', locale, appUrl)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${localizedUrl}#web-application`,
        name: dictionary.site.name,
        url: localizedUrl,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Any',
        description: page.description,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        creator: {
          '@id': `${appUrl}#creator`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${appUrl}#creator`,
        name: dictionary.site.author,
        url: dictionary.site.authorUrl,
      },
    ],
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Box component='main'>
        <Box
          component='section'
          aria-label={page.ariaLabel}
          sx={{
            position: 'relative',
            minHeight: 'var(--life-app-height, 100dvh)',
          }}
        >
          <LifeClockApp locale={locale} messages={dictionary.app} />
        </Box>
      </Box>
    </>
  )
}
