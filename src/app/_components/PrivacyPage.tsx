import {
  getDictionary,
  getLocalizedPath,
  getLocalizedUrl,
  type Locale,
} from '@/i18n'
import { getAppUrl } from '@/utils/urls'
import { Box, Container, Link, Stack, Typography } from '@mui/material'

export default function PrivacyPage({ locale }: Readonly<{ locale: Locale }>) {
  const dictionary = getDictionary(locale)
  const page = dictionary.routes.privacy
  const appUrl = getAppUrl()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PrivacyPolicy',
    name: page.title,
    url: getLocalizedUrl('/privacy', locale, appUrl),
    dateModified: page.dateModified,
    publisher: {
      '@type': 'Person',
      name: dictionary.site.author,
      url: dictionary.site.authorUrl,
    },
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box
        component='main'
        sx={{
          bgcolor: 'background.default',
          minHeight: '100dvh',
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth='md'>
          <Stack spacing={4}>
            <Box>
              <Typography component='h1' variant='h3' gutterBottom>
                {page.heading}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                {page.effectiveDateLabel}: {page.effectiveDate}
              </Typography>
            </Box>

            {page.sections.map((section) => (
              <Box component='section' key={section.title}>
                <Typography component='h2' variant='h5' gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  {section.body}
                </Typography>
              </Box>
            ))}

            <Box>
              <Link href={getLocalizedPath('/', locale)}>{page.backLink}</Link>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
