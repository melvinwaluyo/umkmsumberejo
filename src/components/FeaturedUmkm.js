import db from '@/lib/db'; // 1. Impor klien Prisma
import UmkmCard from './UmkmCard';

/**
 * Mengambil 3 artikel terbaru langsung dari database.
 */
async function getFeaturedUmkmData() {
  try {
    // 2. Ambil data langsung menggunakan Prisma
    const posts = await db.umkm.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: 3,
    });
    return posts;
  } catch (error) {
    console.error("Gagal mengambil UMKM Unggulan dari DB:", error);
    return []; // Kembalikan array kosong jika gagal
  }
}

export default async function FeaturedUmkm() {
  // Panggil fungsi yang sudah diubah
  const umkmData = await getFeaturedUmkmData();

  return (
    <section id="featured" className="py-20 bg-amber-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          UMKM Unggulan
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Berikut adalah beberapa UMKM yang menjadi primadona di Kelurahan Sumberejo.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {umkmData && umkmData.length > 0 ? (
            umkmData.map((umkm) => (
              <UmkmCard key={umkm.id} umkm={umkm} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Data UMKM unggulan tidak tersedia.</p>
          )}
        </div>
      </div>
    </section>
  );
};