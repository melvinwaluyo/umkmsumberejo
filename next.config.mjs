/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wordpress.com', // Mengizinkan semua subdomain wordpress.com
      },
      {
        protocol: 'https',
        hostname: 'creatorspace.imgix.net', // Mengizinkan semua subdomain imgix.net
      },

    ],
  },
};

export default nextConfig;