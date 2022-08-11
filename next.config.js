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
    domains: ['https://www.google.com'],
  },
}
