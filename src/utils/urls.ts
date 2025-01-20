function createLocalUrl(): URL {
  return new URL(`http://localhost:${process.env.PORT || 3000}`)
}

function getProductionUrl(): URL | undefined {
  const url = process.env.WEBSITE_URL
  return url ? new URL(url) : undefined
}

export function getAppUrl(): URL | undefined {
  let url
  if (process.env.NODE_ENV === 'development') {
    url = createLocalUrl()
  } else if (process.env.NODE_ENV === 'production') {
    url = getProductionUrl()
  }
  return url
}
