/** @type {import('next').NextConfig} */
const nextConfig = {
  // 支持 ES modules
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;

