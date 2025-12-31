/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'api.personal-finance.namelesscompany.cc'],
    unoptimized: true, // Required for Cloudflare Pages
  },
  // Required for @cloudflare/next-on-pages
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
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
