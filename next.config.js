const {i18n} = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler:{
    Swiper:true,
  }
}

module.exports = {
  nextConfig,
  images: {
    domains: ['www.google.com.br'],
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {key: 'Access-Control-Allow-Origin',value: '*'}
        ]
      }
    ]
  },
  i18n
}
