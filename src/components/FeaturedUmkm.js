import UmkmCard from './UmkmCard'; // Impor komponen UmkmCard

// Fungsi untuk mengambil data dari API
async function getFeaturedUmkmData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/umkm/featured`, {
      cache: 'no-store', // Selalu ambil data terbaru
    });

    if (!res.ok) {
      console.error("Gagal mengambil UMKM Unggulan, status:", res.status);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Terjadi error saat fetch UMKM Unggulan:", error);
    return [];
  }
}

// Komponen ini sekarang menjadi Server Component yang async
export default async function FeaturedUmkm() {
  const umkmData = await getFeaturedUmkmData();

  return (
    <section id="featured" className="py-20 bg-amber-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          UMKM Unggulan
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Berikut adalah beberapa UMKM yang menjadi primadona di Kalurahan Sumberejo.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {umkmData && umkmData.length > 0 ? (
            // Gunakan komponen UmkmCard di sini
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