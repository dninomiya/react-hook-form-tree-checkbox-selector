/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.REPOSITORY_NAME,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
