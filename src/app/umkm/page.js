import UmkmCard from '../components/UmkmCard';

// Fungsi untuk mengambil data UMKM dari API Anda
async function getUmkmData() {
  try {
    // Gunakan URL lengkap saat fetching di sisi server
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/umkm`, {
      cache: 'no-store', // Memastikan data selalu yang terbaru dari database
    });

    if (!res.ok) {
      // Jika respons dari API tidak berhasil (misal: error 500)
      console.error("Gagal mengambil data, status:", res.status);
      return []; // Kembalikan array kosong agar halaman tidak crash
    }

    return res.json();
  } catch (error) {
    console.error("Terjadi error saat fetch:", error);
    return []; // Kembalikan array kosong jika terjadi error koneksi
  }
}

export default async function JelajahiUmkmPage() {
  // Panggil fungsi untuk mengambil data dan tunggu hasilnya
  const umkmData = await getUmkmData();

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header dan Judul */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Jelajahi UMKM Sumberejo</h1>
          <p className="text-gray-600 mt-2">Temukan dan dukung produk lokal dari para pengusaha hebat di desa kami.</p>
        </div>

        {/* Fitur Pencarian dan Filter (UI Saja) */}
        <div className="mb-10 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
          <input 
            type="text" 
            placeholder="Cari nama UMKM atau produk..."
            className="w-full md:flex-1 p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button className="bg-green-700 text-white font-semibold py-3 px-5 rounded-lg hover:bg-green-900 transition-colors">Semua</button>
            <button className="bg-gray-200 text-gray-700 font-semibold py-3 px-5 rounded-lg hover:bg-gray-300 transition-colors">Kuliner</button>
            <button className="bg-gray-200 text-gray-700 font-semibold py-3 px-5 rounded-lg hover:bg-gray-300 transition-colors">Kerajinan</button>
          </div>
        </div>

        {/* Galeri UMKM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {umkmData && umkmData.length > 0 ? (
            // Gunakan umkmData dari hasil fetch
            umkmData.map((umkm) => (
              <UmkmCard key={umkm.id} umkm={umkm} />
            ))
          ) : (
            // Tampilkan pesan ini jika tidak ada data
            <p className="col-span-full text-center text-gray-500">
              Belum ada data UMKM yang ditambahkan atau gagal memuat data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};