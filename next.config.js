/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  images: {
    domains: [
      'www.freetogame.com'
    ]
  },
  env: {
    DEV_EMAIL: process.env.DEV_EMAIL,
  },
}

module.exports = nextConfig
