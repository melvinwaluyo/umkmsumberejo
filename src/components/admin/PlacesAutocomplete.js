"use client";

import { useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export default function PlacesAutocomplete({ onPlaceSelect }) {
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    // Gunakan elemen autocomplete yang baru dari Google
    const autocomplete = new places.Autocomplete(inputRef.current, {
        fields: ["geometry", "name", "formatted_address"],
        // Anda bisa menambahkan batasan lain di sini jika perlu
        // contoh: componentRestrictions: { country: "id" } // Membatasi pencarian ke Indonesia
    });

    // Tambahkan listener untuk event 'place_changed'
    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      
      // Pastikan place dan geometrinya valid sebelum memanggil callback
      if (place && place.geometry && place.geometry.location) {
        onPlaceSelect(place);
      }
    });

    // Bersihkan listener saat komponen di-unmount
    return () => {
      listener.remove();
    };
  }, [places, onPlaceSelect]);

  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-3/4 max-w-sm">
      <input
        ref={inputRef}
        placeholder="Cari lokasi atau alamat..."
        className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
