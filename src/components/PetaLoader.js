"use client"; // Menandakan ini adalah Client Component

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Komponen ini menerima data UMKM sebagai properti (props)
export default function PetaLoader({ umkmData }) {
    // Logika untuk memuat GoogleMapView secara dinamis tetap di sini
    const GoogleMap = useMemo(() => dynamic(
        () => import('./GoogleMapView'), // Path ke komponen peta Anda
        { 
            loading: () => <p className="text-center text-gray-500">Memuat peta...</p>,
            ssr: false 
        }
    ), []);

    // Render komponen peta dengan data yang diterima
    return <GoogleMap umkmData={umkmData} />;
}