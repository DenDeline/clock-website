const productionUrl = 'https://clock.dendeline.com'

function createLocalUrl(): URL {
  return new URL(`http://localhost:${process.env.PORT || 3000}`)
}

function getProductionUrl(): URL {
  return new URL(process.env.WEBSITE_URL || productionUrl)
}

export function getAppUrl(): URL {
  if (process.env.NODE_ENV === 'development') {
    return createLocalUrl()
  }

  return getProductionUrl()
}
