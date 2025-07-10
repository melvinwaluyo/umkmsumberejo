'use client';

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Impor komponen Image dari Next.js

const GoogleMapView = ({ umkmData }) => {
  const position = { lat: -7.9254, lng: 110.6534 };
  const [selectedUmkm, setSelectedUmkm] = useState(null);

  // Fungsi untuk menutup InfoWindow
  const handleClose = () => {
    setSelectedUmkm(null);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}>
      <Map
        defaultCenter={position}
        defaultZoom={14}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="umkm-map"
      >
        {umkmData.map((umkm) => (
          <AdvancedMarker
            key={umkm.id}
            position={{ lat: umkm.latitude, lng: umkm.longitude }}
            onClick={() => setSelectedUmkm(umkm)}
          />
        ))}

        {selectedUmkm && (
          <InfoWindow
            position={{ lat: selectedUmkm.latitude, lng: selectedUmkm.longitude }}
            onCloseClick={handleClose}
          >
            {/* --- KONTEN INFO WINDOW --- */}
            <div className="max-w-xs font-sans">
              {/* Gambar Banner */}
              <div className="relative w-full h-32 rounded-t-lg overflow-hidden">
                <Image
                  src={selectedUmkm.bannerUrl || "https://dummyimage.com/300x200/000/fff&text=UMKM"}
                  alt={`Banner ${selectedUmkm.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Informasi Teks */}
              <div className="p-4">
                <h3 className="font-bold text-base mb-1 text-gray-800">{selectedUmkm.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{selectedUmkm.category}</p>
                <Link 
                  href={`/umkm/${selectedUmkm.slug}`} 
                  className="text-sm text-green-700 hover:underline font-semibold"
                >
                  Lihat Detail →
                </Link>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default GoogleMapView;
