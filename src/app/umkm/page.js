"use client";

import { useState, useEffect } from 'react';
// 1. Impor hooks yang diperlukan untuk navigasi dan parameter URL
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import UmkmCard from '@/components/UmkmCard';
import useDebounce from '@/hooks/useDebounce';

// Komponen utama dipisahkan agar bisa menggunakan hooks
function JelajahiUmkmComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 2. Inisialisasi state langsung dari parameter URL saat halaman dimuat
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState(() => searchParams.get('kategori') || 'Semua');
  
  const [umkmData, setUmkmData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gunakan debounce agar tidak memanggil API setiap kali mengetik
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 3. useEffect ini sekarang menangani pembaruan URL dan pengambilan data
  useEffect(() => {
    // Siapkan parameter untuk API backend
    const apiParams = new URLSearchParams();
    // Siapkan parameter untuk URL di browser
    const urlParams = new URLSearchParams();

    // Tambahkan parameter pencarian jika ada
    if (debouncedSearchTerm) {
      apiParams.set('q', debouncedSearchTerm);
      urlParams.set('q', debouncedSearchTerm);
    }

    // Tambahkan parameter kategori jika bukan 'Semua'
    if (activeCategory && activeCategory !== 'Semua') {
      apiParams.set('category', activeCategory); // 'category' untuk API
      urlParams.set('kategori', activeCategory); // 'kategori' untuk URL browser
    }

    // 4. Update URL browser tanpa me-reload halaman
    // router.replace() lebih baik dari router.push() untuk filter
    router.replace(`${pathname}?${urlParams.toString()}`);

    // 5. Ambil data dari API dengan parameter yang sesuai
    setLoading(true);
    fetch(`/api/umkm?${apiParams.toString()}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        return res.json();
      })
      .then(data => {
        setUmkmData(data);
      })
      .catch(error => {
        console.error("Terjadi error saat fetch:", error);
        setUmkmData([]);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [debouncedSearchTerm, activeCategory, pathname, router]); // Jalankan efek ini jika filter berubah

  const categories = ['Semua', 'Kuliner', 'Kerajinan'];

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Jelajah UMKM Sumberejo</h1>
          <p className="text-gray-600 mt-2">Temukan dan dukung produk lokal dari para pengusaha hebat di desa kami.</p>
        </div>

        {/* Fitur Pencarian dan Filter */}
        <div className="mb-10 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
          <input 
            type="text" 
            placeholder="Cari nama UMKM..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:flex-1 p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`${
                  activeCategory === category 
                    ? 'bg-green-700 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } font-semibold py-3 px-5 rounded-lg transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Galeri UMKM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="col-span-full text-center text-gray-500">Memuat data...</p>
          ) : umkmData.length > 0 ? (
            umkmData.map((umkm) => (
              <UmkmCard key={umkm.id} umkm={umkm} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada UMKM yang ditemukan dengan kriteria tersebut.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Wrapper untuk memastikan hooks bisa digunakan (best practice)
export default function JelajahiUmkmPage() {
    return <JelajahiUmkmComponent />;
}