// next.config.js
const isDev = process.env.NODE_ENV !== 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // your remotePatterns as before
    remotePatterns: [
      { protocol: 'http', hostname: 'teckstack.local', pathname: '/**' },
      { protocol: 'https', hostname: 'cms.teckstack.com', pathname: '/**' }
    ],
    unoptimized: isDev // disable optimization in dev only
  }
}

module.exports = nextConfig
