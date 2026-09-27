import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 31622400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.americansbeautycenter.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  allowedDevOrigins: ['glitch-idealness-ragged.ngrok-free.dev'],
}

export default nextConfig
