import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Konfigurasi koneksi ke Sanity
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production', // Nama dataset Anda (biasanya 'production')
  useCdn: true, // Gunakan CDN untuk performa lebih cepat
  apiVersion: '2024-07-10', // Gunakan tanggal hari ini
});

// Helper untuk membuat URL gambar dari Sanity
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);