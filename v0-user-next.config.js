/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5328/api/:path*", // Proxy to Express.js Backend
      },
    ]
  },
}

module.exports = nextConfig

