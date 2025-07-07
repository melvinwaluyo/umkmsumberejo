"use client";

import { useState, useEffect, useCallback } from 'react';
import UmkmCard from '../../components/UmkmCard';
import useDebounce from '../../hooks/useDebounce'; // Impor custom hook

export default function JelajahiUmkmPage() {
  const [umkmData, setUmkmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Gunakan debounce untuk search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Tunda 500ms

  // Fungsi untuk mengambil data berdasarkan state saat ini
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearchTerm) {
        params.append('q', debouncedSearchTerm);
      }
      if (activeCategory && activeCategory !== 'Semua') {
        params.append('category', activeCategory);
      }
      
      const res = await fetch(`/api/umkm?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Gagal mengambil data dari server');
      }
      const data = await res.json();
      setUmkmData(data);
    } catch (error) {
      console.error("Terjadi error saat fetch:", error);
      setUmkmData([]); // Kosongkan data jika error
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, activeCategory]); // Dependency: panggil ulang jika search term atau kategori berubah

  // useEffect untuk memanggil fetchData saat dependency berubah
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categories = ['Semua', 'Kuliner', 'Kerajinan']; // Definisikan kategori

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Jelajahi UMKM Sumberejo</h1>
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
};