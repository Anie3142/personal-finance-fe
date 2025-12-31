/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.personal-finance.namelesscompany.cc'],
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:8000/api/v1/:path*',
      },
    ] : [];
  },
};

module.exports = nextConfig;
