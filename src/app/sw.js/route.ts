import { getLocalizedPath, locales } from '@/i18n'
import { getBasePath } from '@/utils/base-path'

export const dynamic = 'force-static'

const basePath = getBasePath()
const buildVersion = new Date().toISOString()
const cacheName = `life-clock-${buildVersion}`
const routePaths = locales.flatMap((locale) => [
  getLocalizedPath('/', locale),
  getLocalizedPath('/privacy', locale),
])
const routeUrls = routePaths.flatMap((path) => {
  const normalizedPath = path === '/' ? '' : path
  const pathname = `${basePath}${normalizedPath || '/'}`

  if (path === '/') {
    return [pathname, `${basePath}/index.html`]
  }

  return [pathname, `${basePath}${path}.html`]
})
const appShellUrls = [
  ...routeUrls,
  `${basePath}/manifest.webmanifest`,
  `${basePath}/favicon.ico`,
  `${basePath}/icon-192x192.png`,
  `${basePath}/icon-512x512.png`,
  `${basePath}/icon-maskable-192x192.png`,
  `${basePath}/icon-maskable-512x512.png`,
  `${basePath}/apple-touch-icon.png`,
]

export function GET() {
  const worker = `
const CACHE_NAME = ${JSON.stringify(cacheName)};
const APP_SHELL_URLS = ${JSON.stringify(appShellUrls)};

function collectStaticAssetUrls(html) {
  const urls = new Set();
  const assetPattern = /(?:src|href)=["']([^"']*\\/_next\\/static\\/[^"']+)["']/g;
  let match;

  while ((match = assetPattern.exec(html)) !== null) {
    const url = new URL(match[1], self.location.origin);
    urls.add(url.pathname + url.search);
  }

  return urls;
}

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME);
  const staticAssetUrls = new Set();

  await Promise.allSettled(
    APP_SHELL_URLS.map(async (url) => {
      const response = await fetch(new Request(url, { cache: 'reload' }));

      if (!response.ok) {
        return;
      }

      await cache.put(url, response.clone());

      if (response.headers.get('content-type')?.includes('text/html')) {
        for (const assetUrl of collectStaticAssetUrls(await response.text())) {
          staticAssetUrls.add(assetUrl);
        }
      }
    }),
  );

  await Promise.allSettled(
    Array.from(staticAssetUrls).map((url) =>
      cache.add(new Request(url, { cache: 'reload' })),
    ),
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(cacheAppShell());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name.startsWith('life-clock-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      ),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
          });
          return response;
        })
        .catch(() =>
          caches.match(request).then((cachedResponse) =>
            cachedResponse || caches.match(${JSON.stringify(`${basePath}/`)}),
          ),
        ),
    );
    return;
  }

  if (
    url.pathname.startsWith(${JSON.stringify(`${basePath}/_next/static/`)}) ||
    APP_SHELL_URLS.includes(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
          });
          return response;
        });
      }),
    );
  }
});
`

  return new Response(worker.trim(), {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
