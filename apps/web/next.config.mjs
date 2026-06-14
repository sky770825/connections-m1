/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    // 避免 Next.js 警告 multiple lockfiles
    root: process.cwd(),
  },
  experimental: {
    // Next.js 16: Server Actions 預設啟用
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  // OpenAI / Stripe / Supabase 放 server-only
  serverExternalPackages: ['@supabase/supabase-js', 'stripe', 'openai'],
};

export default nextConfig;
