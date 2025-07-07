"use client";

import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export default function PlacesAutocomplete({ onPlaceSelect }) {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      onPlaceSelect(place);
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-3/4 max-w-sm">
      <input
        ref={inputRef}
        placeholder="Cari lokasi atau alamat..."
        className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}