/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Mengizinkan semua subdomain cloudinary.com
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com', 
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', 
      },
    ],
  },
};

export default nextConfig;