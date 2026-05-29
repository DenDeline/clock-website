import LifeClockApp from '@/components/LifeClockApp'
import {
  getDictionary,
  getLocalizedPath,
  getLocalizedUrl,
  type Locale,
} from '@/i18n'
import { getAppUrl } from '@/utils/urls'
import { Box, Container, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box component='main'>
        <Box
          component='section'
          aria-label={page.ariaLabel}
          sx={{ position: 'relative', minHeight: '100dvh' }}
        >
          <LifeClockApp messages={dictionary.app} />
        </Box>

        <Box
          component='section'
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.default',
            py: { xs: 6, md: 10 },
          }}
        >
          <Container maxWidth='md'>
            <Stack spacing={4}>
              <Box>
                <Typography component='h1' variant='h3' gutterBottom>
                  {page.intro.title}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  {page.intro.body}
                </Typography>
              </Box>

              {page.sections.map((section) => (
                <Box key={section.title}>
                  <Typography component='h2' variant='h5' gutterBottom>
                    {section.title}
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {section.body}
                  </Typography>
                </Box>
              ))}

              <Box>
                <Typography component='h2' variant='h5' gutterBottom>
                  {page.privacy.title}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  {page.privacy.beforeLink}{' '}
                  <NextLink
                    href={getLocalizedPath('/privacy', locale)}
                    style={{
                      color: 'var(--mui-palette-primary-main)',
                      textDecoration: 'underline',
                    }}
                  >
                    {page.privacy.link}
                  </NextLink>
                  .
                </Typography>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  )
}
