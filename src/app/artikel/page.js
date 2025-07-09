import { client } from '@/lib/sanityClient';
import ArticleCard from '@/components/ArticleCard'; // Pastikan Anda sudah membuat atau memperbarui komponen ini

/**
 * Mengambil semua data artikel dari Sanity.
 * Query ini juga mengambil nama penulis dan mengubah isi artikel (body) menjadi teks biasa untuk sinopsis.
 */
async function getPosts() {
  // GROQ (GraphQL-in-JSON) query
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    "authorName": author->name,
    "plainTextBody": pt::text(body), // Konversi 'body' menjadi teks biasa
    publishedAt,
  }`;
  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    // Memberikan log error di server jika gagal mengambil data
    console.error("Gagal mengambil artikel dari Sanity:", error);
    return []; // Kembalikan array kosong agar halaman tidak crash
  }
}

// Halaman ini adalah Server Component, sehingga bisa async
export default async function ArtikelPage() {
  // Panggil fungsi untuk mengambil data dan tunggu hasilnya
  const posts = await getPosts();

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Artikel & Berita</h1>
          <p className="text-gray-600 mt-2">Wawasan terbaru seputar UMKM di Kelurahan Sumberejo.</p>
        </div>
        
        {/* Grid untuk menampilkan semua kartu artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts && posts.length > 0 ? (
            // Lakukan map pada data artikel dan render komponen ArticleCard
            posts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))
          ) : (
            // Tampilkan pesan ini jika tidak ada artikel yang ditemukan
            <p className="col-span-full text-center text-gray-500">
              Belum ada artikel yang dipublikasikan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}