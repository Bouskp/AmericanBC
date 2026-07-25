import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.americansbeautycenter.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default config
