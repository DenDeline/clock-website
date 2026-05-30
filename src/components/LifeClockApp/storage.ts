const CONFIG_STORAGE_KEY = 'config'

export function getBrowserDefaultUseAmPm() {
  try {
    return (
      Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions()
        .hour12 ?? false
    )
  } catch {
    return false
  }
}

export function getStoredConfig() {
  try {
    return window.localStorage?.getItem(CONFIG_STORAGE_KEY) ?? null
  } catch {
    return null
  }
}

export function saveStoredConfig(config: unknown) {
  try {
    window.localStorage?.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config))
  } catch {
    // The clock can still run for the current session when storage is blocked.
  }
}

export function clearStoredConfig() {
  try {
    window.localStorage?.removeItem(CONFIG_STORAGE_KEY)
  } catch {
    // Ignore unavailable storage and continue with a fresh setup.
  }
}
