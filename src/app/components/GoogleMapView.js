'use client'; // Komponen ini hanya untuk client-side

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import Link from 'next/link';

const GoogleMapView = ({ umkmData }) => {
  // Tentukan posisi tengah peta
  const position = { lat: -7.9254, lng: 110.6534 };

  // State untuk mengelola InfoWindow yang aktif
  const [selectedUmkm, setSelectedUmkm] = useState(null);

  return (
    // Gunakan APIProvider untuk menyediakan API key
    <APIProvider apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}>
      <Map
        defaultCenter={position}
        defaultZoom={14}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="my-map-id" // ID unik untuk custom styling jika perlu
      >
        {umkmData.map((umkm) => (
          <AdvancedMarker
            key={umkm.id}
            position={{ lat: umkm.coordinates[0], lng: umkm.coordinates[1] }}
            onClick={() => setSelectedUmkm(umkm)}
          >
            <Pin background={'#1a73e8'} glyphColor={'#fff'} borderColor={'#1a73e8'} />
          </AdvancedMarker>
        ))}

        {/* Tampilkan InfoWindow jika ada UMKM yang dipilih */}
        {selectedUmkm && (
          <InfoWindow
            position={{ lat: selectedUmkm.coordinates[0], lng: selectedUmkm.coordinates[1] }}
            onCloseClick={() => setSelectedUmkm(null)}
          >
            <div className="font-sans p-1">
                <h3 className="font-bold text-base mb-1">{selectedUmkm.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedUmkm.category}</p>
                <Link href={`/umkm/${selectedUmkm.slug}`} className="text-blue-600 hover:underline font-semibold text-sm">
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