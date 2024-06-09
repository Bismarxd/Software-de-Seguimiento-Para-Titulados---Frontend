/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  transpilePackages: ["@mui/x-charts"],
};

export default nextConfig;
