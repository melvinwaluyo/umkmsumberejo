"use client";

import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function ImageModal({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  return (
    // Overlay semi-transparan yang menutupi seluruh layar
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose} // Menutup modal saat mengklik latar belakang
    >
      <div 
        className="relative w-full h-full max-w-4xl max-h-[80vh]"
        // Mencegah modal tertutup saat mengklik gambar itu sendiri
        onClick={(e) => e.stopPropagation()} 
      >
        <Image
          src={imageUrl}
          alt="Tampilan penuh gambar produk"
          fill
          className="object-contain"
        />
      </div>
      
      {/* Tombol tutup di pojok kanan atas */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
        aria-label="Tutup"
      >
        <FaTimes className="w-8 h-8" />
      </button>
    </div>
  );
}