"use client";

import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useState, useEffect, useCallback } from 'react';
import PlacesAutocomplete from './PlacesAutocomplete'; // Impor komponen baru

// Komponen peta utama
function InteractiveMap({ onLocationSelect, externalLat, externalLng }) {
    const map = useMap();
    const defaultPosition = { lat: -7.9254, lng: 110.6534 };
    const [markerPos, setMarkerPos] = useState(null);

    // Efek untuk meng-update pin dari input manual
    useEffect(() => {
        if (externalLat && externalLng) {
            const newPos = { lat: parseFloat(externalLat), lng: parseFloat(externalLng) };
            if (markerPos?.lat !== newPos.lat || markerPos?.lng !== newPos.lng) {
                setMarkerPos(newPos);
                if(map) map.panTo(newPos);
            }
        }
    }, [externalLat, externalLng, map, markerPos]);

    // Handler saat peta diklik
    const handleMapClick = (event) => {
        const lat = event.detail.latLng.lat;
        const lng = event.detail.latLng.lng;
        setMarkerPos({ lat, lng });
        onLocationSelect(lat, lng);
    };

    // Handler saat lokasi dipilih dari search box
    const handlePlaceSelect = useCallback((place) => {
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
    }, [map, onLocationSelect]);

    return (
        <div className="relative w-full h-full">
            {/* Tempatkan Search Box di atas peta */}
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

// Wrapper untuk menyediakan API Key
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