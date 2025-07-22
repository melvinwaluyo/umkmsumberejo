"use client"; // Menandakan ini adalah Client Component

import { useState, useEffect, use } from 'react';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from "@/components/Breadcrumb";
import { FaMapMarkerAlt, FaWhatsapp, FaInfoCircle, FaLink } from 'react-icons/fa';
import Image from "next/image";
import ImageModal from '@/components/ImageModal';

export default function UmkmDetailPage({ params }) {
  const [umkm, setUmkm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Unwrap params using React.use()
  const resolvedParams = use(params);

  // useEffect untuk mengambil data saat komponen dimuat atau saat slug berubah
  useEffect(() => {
    // Ambil slug dari resolved params
    const { slug } = resolvedParams;

    // Pastikan slug ada sebelum melakukan fetch
    if (!slug) {
      setLoading(false);
      setError(true);
      return;
    }

    async function fetchUmkmDetail() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/umkm/${slug}`);
        if (!res.ok) {
          throw new Error('Data UMKM tidak ditemukan.');
        }
        const data = await res.json();
        setUmkm(data);
      } catch (err) {
        console.error("Gagal mengambil detail UMKM:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchUmkmDetail();
  }, [resolvedParams]);

  // Tampilan saat loading
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50 text-gray-500">Memuat data...</div>;
  }

  // Tampilan jika terjadi error atau data tidak ditemukan
  if (error || !umkm) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50 text-gray-500">Gagal memuat data atau UMKM tidak ditemukan.</div>;
  }

  // Definisikan jejak breadcrumb setelah data UMKM berhasil dimuat
  const breadcrumbCrumbs = [
    { href: '/', label: 'Home' },
    { href: '/umkm', label: 'Jelajah UMKM' },
    { href: `/umkm/${umkm.slug}`, label: umkm.name }
  ];

  return (
    <>
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      <div>
        {/* Bagian Banner */}
        <div className="relative h-64 md:h-80">
          <Image 
            src={(umkm.bannerUrl || "https://dummyimage.com/1200x400/a8a29e/ffffff&text=Banner+UMKM").trim()}
            alt={`Banner ${umkm.name}`} 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4 drop-shadow-lg">{umkm.name}</h1>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 bg-amber-50">
          <Breadcrumb crumbs={breadcrumbCrumbs} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
            {/* Kolom Kiri: Katalog Produk */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Katalog Produk</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {umkm.products && umkm.products.length > 0 ? (
                  umkm.products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onImageClick={() => setSelectedImage(product.imageUrl)}
                    />
                  ))
                ) : (
                  <p className="text-center col-span-full text-gray-500">Belum ada produk untuk UMKM ini.</p>
                )}
              </div>
            </div>

            {/* Kolom Kanan: Informasi UMKM */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md border sticky top-28">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 flex items-center gap-3">
                  <FaInfoCircle className="text-green-500" /> Tentang Kami
                </h3>
                <p className="text-gray-600 mb-6 whitespace-pre-line">{umkm.description}</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-gray-500 mt-1 w-5 h-5 flex-shrink-0" />
                    <p className="text-gray-700">{umkm.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaWhatsapp className="text-gray-500 w-5 h-5 flex-shrink-0" />
                    <a 
                      href={`https://wa.me/${umkm.whatsapp}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      Hubungi via WhatsApp
                    </a>
                  </div>
                  {umkm.linktreeUrl && (
                    <div className="flex items-center gap-3">
                      <FaLink className="text-gray-500 w-5 h-5 flex-shrink-0" />
                      <a 
                        href={ umkm.linktreeUrl.startsWith('http') ? umkm.linktreeUrl : `https://${umkm.linktreeUrl}` }
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline break-all"
                      >
                        {umkm.linktreeUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}