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
    ],
  },
};

export default nextConfig;