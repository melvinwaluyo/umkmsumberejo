"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useDebounce from '@/hooks/useDebounce'; // Pastikan hook ini ada
import ArticleCard from '@/components/ArticleCard';
import { FaSearch } from 'react-icons/fa';

export default function ArtikelPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // State untuk menyimpan daftar artikel, status loading, dan query pencarian
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') || '');

    // Gunakan debounce untuk menunda pemanggilan API saat pengguna mengetik
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // useEffect untuk mengambil data setiap kali query pencarian berubah
    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearchTerm) {
            params.set('q', debouncedSearchTerm);
        }

        // Update URL di browser tanpa reload halaman
        router.replace(`${pathname}?${params.toString()}`);

        // Ambil data dari API
        setLoading(true);
        fetch(`/api/artikel?${params.toString()}`)
            .then(res => {
                if (!res.ok) throw new Error("Gagal memuat data artikel.");
                return res.json();
            })
            .then(data => {
                setPosts(data);
            })
            .catch(error => {
                console.error("Gagal mengambil artikel:", error);
                setPosts([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [debouncedSearchTerm, pathname, router]);

    return (
        <div className="bg-amber-50 min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Artikel & Berita</h1>
                    <p className="text-gray-600 mt-2">Wawasan terbaru seputar UMKM di Kelurahan Sumberejo.</p>
                </div>

                {/* --- Search Box --- */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaSearch className="text-gray-400" />
                        </span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari judul artikel..."
                            className="w-full pl-10 pr-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 shadow-sm"
                        />
                    </div>
                </div>

                {/* Grid untuk menampilkan semua kartu artikel */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <p className="col-span-full text-center text-gray-500">Memuat artikel...</p>
                    ) : posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <ArticleCard key={post._id} post={post} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            Tidak ada artikel yang ditemukan.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
