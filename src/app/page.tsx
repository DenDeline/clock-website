import LifeClockApp from '@/components/LifeClockApp'
import { getAppUrl } from '@/utils/urls'
import { Box, Container, Link, Stack, Typography } from '@mui/material'
import type { Metadata } from 'next'

const title = 'Life Clock | Visualize Your Life as a 24-Hour Clock'
const description =
  'A reflective life clock that turns your lifespan into a 24-hour view, helping you see time, progress, and perspective at a glance.'
const appUrl = getAppUrl()
const ogImage = '/opengraph-image'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Life Clock',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Life Clock visualizing a lifespan as a 24-hour clock',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${appUrl}#web-application`,
      name: 'Life Clock',
      url: appUrl.toString(),
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Any',
      description,
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
      name: 'DenDeline',
      url: 'https://dendeline.com',
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Box component='main'>
        <Box
          component='section'
          aria-label='Interactive life clock'
          sx={{ position: 'relative', minHeight: '100dvh' }}
        >
          <LifeClockApp />
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
                  Life Clock
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Life Clock is a reflective tool that visualizes your life as a
                  24-hour clock. Add a starting date and an estimated endpoint
                  to see where the current moment sits in a simple daily rhythm.
                </Typography>
              </Box>

              <Box>
                <Typography component='h2' variant='h5' gutterBottom>
                  What it shows
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  The clock maps the time between your chosen start and end
                  dates onto one full day. It is designed for perspective, not
                  prediction, so the result works best as a calm visual reminder
                  of time passing.
                </Typography>
              </Box>

              <Box>
                <Typography component='h2' variant='h5' gutterBottom>
                  How it works
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Choose a birth date or another meaningful start date, then
                  enter either an end age or an exact end date. The app
                  calculates your progress through that span and displays it as
                  the current time on a 24-hour clock face.
                </Typography>
              </Box>

              <Box>
                <Typography component='h2' variant='h5' gutterBottom>
                  Privacy
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Your dates stay in your browser. Life Clock stores the
                  configuration locally on your device so the clock can reopen
                  with the same settings, and it does not send those dates to a
                  server. Read the full{' '}
                  <Link href='/privacy'>Privacy Policy</Link>.
                </Typography>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  )
}
