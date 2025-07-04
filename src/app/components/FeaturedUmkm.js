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

  // Fungsi untuk memotong deskripsi jika terlalu panjang
  const truncateDescription = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

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
              <div key={umkm.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={umkm.bannerUrl || "https://via.placeholder.com/300x200?text=Produk+UMKM"} 
                  alt={umkm.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{umkm.name}</h3>
                  <p className="text-gray-600 h-20">
                    {truncateDescription(umkm.description, 120)}
                  </p>
                  <a href={`/umkm/${umkm.slug}`} className="inline-block mt-4 text-green-700 hover:text-green-900 font-semibold">
                    Lihat Detail →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Data UMKM unggulan tidak tersedia.</p>
          )}
        </div>
      </div>
    </section>
  );
};