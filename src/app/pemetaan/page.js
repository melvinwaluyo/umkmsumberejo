import PetaLoader from '../../components/PetaLoader'; // Impor komponen baru

// Fungsi untuk mengambil data UMKM (tetap sama)
async function getUmkmData() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/umkm`, {
        cache: 'no-store',
      });
  
      if (!res.ok) {
        console.error("Gagal memuat data untuk peta, status:", res.status);
        return [];
      }
      return res.json();
    } catch (error) {
      console.error("Terjadi error saat fetch data peta:", error);
      return [];
    }
}

// Halaman ini sekarang adalah Server Component murni
export default async function PemetaanPage() {
    // 1. Ambil data di server
    const umkmData = await getUmkmData();

    return (
        <div className="w-full h-screen relative pt-16">
            <div className="absolute top-0 left-0 w-full h-16 bg-amber-50 z-10 flex items-center shadow-md">
                <div className="container mx-auto px-6">
                    <h1 className="text-2xl font-bold text-gray-800">Peta Sebaran UMKM</h1>
                    <p className="text-gray-500 text-sm">Klik penanda untuk melihat detail UMKM</p>
                </div>
            </div>

            <div className="w-full h-full">
                {/* 2. Render Client Component dan kirim data sebagai props */}
                <PetaLoader umkmData={umkmData} />
            </div>
        </div>
    );
};