/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.victoriasugar.ug',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ffsddbbtgoxbqlrnvcrm.supabase.co',
        pathname: '/**',
      },
    ],
    // Disable Next.js image optimization (using Cloudflare CDN instead)
    unoptimized: true,
  },
  // Allow cross-origin for dev
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
}

nextConfig.webpack = (config, { webpack, nextRuntime }) => { if (nextRuntime === 'edge') { config.plugins.push(new webpack.DefinePlugin({ document: 'undefined' })); } return config; };
module.exports = nextConfig

