export function getBasePath(): string {
  return process.env.PAGES_BASE_PATH || ''
}

export function withBasePath(path: `/${string}`): string {
  return `${getBasePath()}${path}`
}
