'use client'

import type { Dictionary } from '@/i18n'
import { Alert, Button, Snackbar } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'

type PwaMessages = Dictionary['app']['pwa']

export default function PwaUpdatePrompt({
  basePath,
  messages,
}: Readonly<{
  basePath: string
  messages: PwaMessages
}>) {
  const [isUpdateReady, setIsUpdateReady] = useState(false)
  const waitingWorkerRef = useRef<ServiceWorker | null>(null)
  const isRefreshingRef = useRef(false)

  const handleUpdate = useCallback(() => {
    const waitingWorker = waitingWorkerRef.current

    if (!waitingWorker) {
      return
    }

    waitingWorker.postMessage({ type: 'SKIP_WAITING' })
  }, [])

  const handleLater = useCallback(() => {
    setIsUpdateReady(false)
  }, [])

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.NEXT_PUBLIC_ENABLE_PWA_IN_DEV !== 'true'
    ) {
      return
    }

    if (!('serviceWorker' in navigator)) {
      return
    }

    const serviceWorkerPath = `${basePath}/sw.js`
    const serviceWorkerScope = `${basePath}/`

    function handleControllerChange() {
      if (isRefreshingRef.current) {
        return
      }

      isRefreshingRef.current = true
      window.location.reload()
    }

    function trackInstallingWorker(
      installingWorker: ServiceWorker | null,
      hasExistingController: boolean,
    ) {
      if (!installingWorker) {
        return
      }

      installingWorker.addEventListener('statechange', () => {
        if (installingWorker.state === 'installed' && hasExistingController) {
          waitingWorkerRef.current = installingWorker
          setIsUpdateReady(true)
        }
      })
    }

    async function registerServiceWorker() {
      try {
        const registration = await navigator.serviceWorker.register(
          serviceWorkerPath,
          {
            scope: serviceWorkerScope,
            updateViaCache: 'none',
          },
        )

        if (registration.waiting && navigator.serviceWorker.controller) {
          waitingWorkerRef.current = registration.waiting
          setIsUpdateReady(true)
        }

        registration.addEventListener('updatefound', () => {
          trackInstallingWorker(
            registration.installing,
            Boolean(navigator.serviceWorker.controller),
          )
        })

        await registration.update()
      } catch (error) {
        console.error('Service worker registration failed', error)
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState !== 'visible') {
        return
      }

      navigator.serviceWorker.getRegistration(serviceWorkerScope).then(
        (registration) => {
          registration?.update().catch((error) => {
            console.error('Service worker update check failed', error)
          })
        },
        (error) => {
          console.error('Service worker lookup failed', error)
        },
      )
    }

    navigator.serviceWorker.addEventListener(
      'controllerchange',
      handleControllerChange,
    )
    document.addEventListener('visibilitychange', handleVisibilityChange)
    registerServiceWorker()

    return () => {
      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        handleControllerChange,
      )
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [basePath])

  return (
    <Snackbar
      open={isUpdateReady}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        bottom: {
          xs: 'calc(72px + env(safe-area-inset-bottom))',
          sm: 24,
        },
      }}
    >
      <Alert
        severity='info'
        variant='filled'
        action={
          <>
            <Button color='inherit' size='small' onClick={handleLater}>
              {messages.later}
            </Button>
            <Button color='inherit' size='small' onClick={handleUpdate}>
              {messages.update}
            </Button>
          </>
        }
        sx={{ alignItems: 'center' }}
      >
        {messages.updateAvailable}
      </Alert>
    </Snackbar>
  )
}
