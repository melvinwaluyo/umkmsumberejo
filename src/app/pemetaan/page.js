'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Data dummy sama seperti sebelumnya
const dummyUmkmData = [
    {
      id: 1, name: "Keripik Singkong Bu Yuni", slug: "keripik-bu-yuni", category: "Kuliner",
      coordinates: [-7.9231, 110.6552],
    },
    {
      id: 2, name: "Batik Tulis Sekar Jagad", slug: "batik-sekar-jagad", category: "Kerajinan",
      coordinates: [-7.9285, 110.6519],
    },
    {
      id: 3, name: "Gula Aren Murni Pak Jono", slug: "gula-aren-pak-jono", category: "Agrobisnis",
      coordinates: [-7.9211, 110.6588],
    },
    {
      id: 4, name: "Jasa Las Pak Budi", slug: "jasa-las-pak-budi", category: "Jasa",
      coordinates: [-7.9299, 110.6565],
    }
];

const PemetaanPage = () => {

  // Muat komponen Google Maps secara dinamis
  const GoogleMap = useMemo(() => dynamic(
    () => import('../components/GoogleMapView'), // <-- GANTI DENGAN KOMPONEN BARU
    { 
      loading: () => <p className="text-center text-gray-500">Memuat peta Google...</p>,
      ssr: false 
    }
  ), []);

  return (
    <div className="w-full h-screen relative pt-16">
      <div className="absolute top-0 left-0 w-full h-16 bg-amber-50 z-10 flex items-center shadow-md">
        <div className="container mx-auto px-6">
            <h1 className="text-2xl font-bold text-gray-800">Peta Sebaran UMKM</h1>
            <p className="text-gray-500 text-sm">Klik penanda untuk melihat detail UMKM</p>
        </div>
      </div>

      <div className="w-full h-full">
        <GoogleMap umkmData={dummyUmkmData} />
      </div>
    </div>
  );
};

export default PemetaanPage;