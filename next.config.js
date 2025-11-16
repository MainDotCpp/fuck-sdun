/** @type {import('next').NextConfig} */
const nextConfig = {
  // 设置基础路径，访问 https://domain.com/OmxoUR 才展示页面
  basePath: '/OmxoUR',
  // 支持 ES modules
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // 忽略 TypeScript 构建错误
  typescript: {
    ignoreBuildErrors: true,
  },
  // 忽略 ESLint 构建错误
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

