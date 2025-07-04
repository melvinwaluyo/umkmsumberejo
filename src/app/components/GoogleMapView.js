'use client'; // Komponen ini hanya untuk client-side

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import Link from 'next/link';

const GoogleMapView = ({ umkmData }) => {
  // Posisi tengah peta (misalnya, pusat area Sumberejo)
  const position = { lat: -7.839820, lng: 110.730224 };

  // State untuk mengelola InfoWindow yang aktif
  const [selectedUmkm, setSelectedUmkm] = useState(null);

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
            // --- PERUBAHAN DI SINI ---
            // Menggunakan latitude dan longitude dari data database
            position={{ lat: umkm.latitude, lng: umkm.longitude }}
            onClick={() => setSelectedUmkm(umkm)}
          >
            <Pin background={'#1a73e8'} glyphColor={'#fff'} borderColor={'#1a73e8'} />
          </AdvancedMarker>
        ))}

        {/* Tampilkan InfoWindow jika ada UMKM yang dipilih */}
        {selectedUmkm && (
          <InfoWindow
            // --- PERUBAHAN DI SINI ---
            position={{ lat: selectedUmkm.latitude, lng: selectedUmkm.longitude }}
            onCloseClick={() => setSelectedUmkm(null)}
          >
            <div className="font-sans p-1">
                <h3 className="font-bold text-base mb-1 text-black">{selectedUmkm.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedUmkm.category}</p>
                <Link href={`/umkm/${selectedUmkm.slug}`} className="text-green-600 hover:underline font-semibold text-sm">
                  Lihat Detail &rarr;
                </Link>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default GoogleMapView;