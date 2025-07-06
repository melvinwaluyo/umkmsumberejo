"use client";

import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';

// Komponen peta yang bisa diklik untuk memilih lokasi
function ClickableMap({ onLocationSelect, externalLat, externalLng }) {
    const map = useMap(); // Dapatkan instance peta
    const defaultPosition = { lat: -7.9254, lng: 110.6534 };
    
    // State internal untuk posisi marker
    const [markerPos, setMarkerPos] = useState(null);

    // Efek ini berjalan saat latitude/longitude dari input manual berubah
    useEffect(() => {
        // Cek apakah data dari props valid
        if (externalLat && externalLng) {
            const newPos = { lat: parseFloat(externalLat), lng: parseFloat(externalLng) };
            setMarkerPos(newPos);
            // Pindahkan view peta ke lokasi pin yang baru
            if(map) map.panTo(newPos);
        }
    }, [externalLat, externalLng, map]);

    const handleMapClick = (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        const newPos = { lat, lng };
        
        setMarkerPos(newPos);
        onLocationSelect(lat, lng); // Kirim data kembali ke form
    };

    return (
        <Map
            defaultCenter={defaultPosition}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            onClick={handleMapClick}
            mapId="location-picker-map"
            className="w-full h-full"
        >
            {markerPos && <AdvancedMarker position={markerPos} />}
        </Map>
    );
}

// Wrapper untuk menyediakan API Key dan meneruskan props
export default function LocationPickerMap({ onLocationSelect, latitude, longitude }) {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY}>
            <ClickableMap 
                onLocationSelect={onLocationSelect} 
                externalLat={latitude}
                externalLng={longitude}
            />
        </APIProvider>
    );
}