"use client";

import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import PlacesAutocomplete from './PlacesAutocomplete';

// Komponen peta utama
function InteractiveMap({ onLocationSelect, externalLat, externalLng }) {
    const map = useMap();
    const defaultPosition = { lat: -7.9254, lng: 110.6534 };

    // State internal untuk posisi marker, dimulai dari null
    const [markerPos, setMarkerPos] = useState(null);

    // useEffect ini HANYA bereaksi terhadap perubahan dari input manual (props)
    useEffect(() => {
        // Jika ada koordinat dari luar (form) dan map sudah siap
        if (externalLat && externalLng && map) {
            const newPos = { lat: parseFloat(externalLat), lng: parseFloat(externalLng) };
            setMarkerPos(newPos); // Set posisi pin
            map.panTo(newPos);   // Pindahkan tampilan peta ke lokasi pin
        }
    }, [externalLat, externalLng, map]); // <-- Hapus 'markerPos' dari dependency

    // Efek ini HANYA berjalan sekali saat peta pertama kali dimuat
    useEffect(() => {
        if (map && externalLat && externalLng) {
             // Langsung pusatkan peta ke lokasi awal saat mode edit
            map.panTo({ lat: parseFloat(externalLat), lng: parseFloat(externalLng) });
        }
    }, [map]); // <-- Hanya bergantung pada map

    // Handler saat peta diklik (ini sekarang tidak akan terganggu oleh useEffect)
    const handleMapClick = (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        const newPos = { lat, lng };
        setMarkerPos(newPos);
        onLocationSelect(lat, lng);
    };

    // Handler saat lokasi dipilih dari search box
    const handlePlaceSelect = (place) => {
        if (!place.geometry) return;
        
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const newPos = { lat, lng };

        setMarkerPos(newPos);
        onLocationSelect(lat, lng);
        if(map) {
            map.panTo(newPos);
            map.setZoom(15);
        }
    };

    return (
        <div className="relative w-full h-full">
            <PlacesAutocomplete onPlaceSelect={handlePlaceSelect} />
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
        </div>
    );
}

// Wrapper untuk menyediakan API Key (tidak ada perubahan di sini)
export default function LocationPickerMap({ onLocationSelect, latitude, longitude }) {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_Maps_API_KEY} libraries={['places']}>
            <InteractiveMap 
                onLocationSelect={onLocationSelect} 
                externalLat={latitude}
                externalLng={longitude}
            />
        </APIProvider>
    );
}