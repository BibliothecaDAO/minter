/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['replicate.delivery','adventurers.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
