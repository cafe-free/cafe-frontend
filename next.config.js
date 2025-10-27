/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure asset prefix if needed for deployment
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
}

export default nextConfig
