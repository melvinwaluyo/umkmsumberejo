import db from '@/lib/db'; 
import { client } from '@/lib/sanityClient'; 

export const dynamic = 'force-dynamic';
export const revalidate = 3600; 
export const dynamicParams = true;

export default async function sitemap() {
  // URL dasar website
  const baseUrl = "https://www.umkm-sumberejo.com"; 

  // 1. Ambil semua slug UMKM dari database
  const umkms = await db.umkm.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const umkmUrls = umkms.map((umkm) => ({
    url: `${baseUrl}/umkm/${umkm.slug}`,
    lastModified: umkm.updatedAt,
  }));

  // 2. Ambil semua slug artikel dari Sanity
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current, "lastModified": _updatedAt }`);

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/artikel/${post.slug}`,
    lastModified: post.lastModified,
  }));

  // 3. Gabungkan dengan halaman statis
  const staticUrls = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/umkm`, lastModified: new Date() },
    { url: `${baseUrl}/pemetaan`, lastModified: new Date() },
    { url: `${baseUrl}/artikel`, lastModified: new Date() },
  ];

  // 4. Kembalikan semua URL yang sudah digabung
  return [...staticUrls, ...umkmUrls, ...postUrls];
}
