import type { NextConfig } from 'next'

const devOrigins = process.env.ALLOWED_DEV_ORIGINS
  ? process.env.ALLOWED_DEV_ORIGINS.split(',')
  : []

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  typedRoutes: true,
  allowedDevOrigins: devOrigins,
}

export default nextConfig
