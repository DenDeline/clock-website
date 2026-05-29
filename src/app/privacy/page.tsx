import { getAppUrl } from '@/utils/urls'
import { Box, Container, Link, Stack, Typography } from '@mui/material'
import type { Metadata } from 'next'

const title = 'Privacy Policy | Life Clock'
const description =
  'Learn how Life Clock stores your clock settings locally in your browser and uses Google Analytics to understand site usage and performance.'
const appUrl = getAppUrl()
const privacyUrl = new URL('/privacy', appUrl)
const ogImage = '/opengraph-image'
const effectiveDate = 'May 29, 2026'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title,
    description,
    url: '/privacy',
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
  '@type': 'PrivacyPolicy',
  name: title,
  url: privacyUrl.toString(),
  dateModified: '2026-05-29',
  publisher: {
    '@type': 'Person',
    name: 'DenDeline',
    url: 'https://dendeline.com',
  },
}

export default function PrivacyPage() {
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
                Privacy Policy
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Effective date: {effectiveDate}
              </Typography>
            </Box>

            <PolicySection title='Who operates Life Clock'>
              Life Clock is operated by DenDeline. For privacy questions or
              requests, contact{' '}
              <Link href='mailto:contact@dendeline.com'>
                contact@dendeline.com
              </Link>
              .
            </PolicySection>

            <PolicySection title='Information stored on your device'>
              Life Clock stores your clock configuration in your browser&apos;s
              local storage. This includes your start date, your end date, and
              whether the end date was entered directly or calculated from an
              end age. This information stays on your device and is used to
              reopen the clock with the same settings.
            </PolicySection>

            <PolicySection title='Information not sent to Life Clock'>
              Life Clock does not send your start date, end date, or end age to
              an application server. The clock calculation runs in your browser.
              Because those settings are stored locally, clearing browser site
              data for Life Clock will remove them.
            </PolicySection>

            <PolicySection title='Analytics and performance data'>
              In production, Life Clock uses Google Analytics to understand
              aggregate site usage and performance. Google Analytics may receive
              information such as the page URL, IP address, browser and device
              details, cookies or similar identifiers, and web-vitals event data
              such as loading and interaction metrics. Life Clock does not send
              your clock dates to Google Analytics.
            </PolicySection>

            <PolicySection title='How information is used'>
              Local clock settings are used to operate the clock and remember
              your preferences on your device. Analytics and performance data
              are used to understand how visitors use the site, identify
              technical issues, and improve the experience.
            </PolicySection>

            <PolicySection title='Sharing'>
              Life Clock does not sell personal information. Analytics and
              performance data is processed by Google Analytics according to
              Google&apos;s terms and privacy practices. Learn more about how
              Google uses data from sites that use its services at{' '}
              <Link href='https://policies.google.com/technologies/partner-sites'>
                policies.google.com/technologies/partner-sites
              </Link>
              .
            </PolicySection>

            <PolicySection title='Retention'>
              Your local clock settings remain in your browser until you clear
              local storage, clear site data, or reset your browser profile.
              Google Analytics retention is controlled by Google Analytics
              settings and Google&apos;s own retention practices.
            </PolicySection>

            <PolicySection title='Your choices'>
              You can clear Life Clock&apos;s local settings by clearing site
              data for this website in your browser. You can also block or clear
              cookies and similar identifiers through your browser settings. If
              you do not want Google Analytics to be used in your browser, you
              can install Google&apos;s Analytics opt-out browser add-on. You
              may also contact{' '}
              <Link href='mailto:contact@dendeline.com'>
                contact@dendeline.com
              </Link>{' '}
              with privacy questions or requests.
            </PolicySection>

            <PolicySection title='Children'>
              Life Clock is not directed to children and does not knowingly
              collect personal information from children.
            </PolicySection>

            <PolicySection title='Updates'>
              This policy may be updated when Life Clock&apos;s privacy
              practices change. The effective date above indicates when this
              policy was last updated.
            </PolicySection>

            <Box>
              <Link href='/'>Back to Life Clock</Link>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

function PolicySection({
  title,
  children,
}: Readonly<{
  title: string
  children: React.ReactNode
}>) {
  return (
    <Box component='section'>
      <Typography component='h2' variant='h5' gutterBottom>
        {title}
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        {children}
      </Typography>
    </Box>
  )
}
