import { getDictionary } from '@/i18n'
import { withBasePath } from '@/utils/base-path'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  const dictionary = getDictionary('en')

  return {
    id: withBasePath('/'),
    name: dictionary.site.name,
    short_name: dictionary.site.name,
    description: dictionary.site.description,
    start_url: withBasePath('/'),
    scope: withBasePath('/'),
    display: 'standalone',
    display_override: ['standalone', 'minimal-ui', 'browser'],
    orientation: 'portrait-primary',
    background_color: '#f8fafc',
    theme_color: '#111827',
    categories: ['lifestyle', 'productivity', 'utilities'],
    icons: [
      {
        src: withBasePath('/icon-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: withBasePath('/icon-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: withBasePath('/icon-maskable-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: withBasePath('/icon-maskable-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
