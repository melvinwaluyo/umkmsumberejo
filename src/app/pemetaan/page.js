"use client"; // 1. Mark the entire page as a Client Component

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
// NOTE: We fetch data on the client-side in this approach

export default function PemetaanPage() {
    // State to hold the data
    const [umkmData, setUmkmData] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        setLoading(true);
        fetch('/api/umkm') // Fetch from your API
            .then(res => res.json())
            .then(data => {
                setUmkmData(data);
            })
            .catch(error => {
                console.error("Gagal memuat data untuk peta:", error);
                setUmkmData([]); // Set to empty array on error
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Empty dependency array means this runs once on mount

    // useMemo for dynamic import of the map component
    const GoogleMap = useMemo(() => dynamic(
        () => import('../../components/GoogleMapView'), // Correct path to your map view
        { 
            loading: () => <p className="text-center text-gray-500">Memuat peta...</p>,
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
                {/* Render the map with the fetched data */}
                {loading ? (
                    <p className="text-center text-gray-500 pt-10">Memuat data UMKM...</p>
                ) : (
                    <GoogleMap umkmData={umkmData} />
                )}
            </div>
        </div>
    );
};