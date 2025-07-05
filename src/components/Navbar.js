"use client"; // WAJIB: untuk menggunakan state

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo dan Judul Website */}
          <div className="flex items-center space-x-4">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <Link href="/" className="text-xl font-bold text-green-700">
              UMKM Sumberejo
            </Link>
          </div>

          {/* Menu untuk Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-green-700">
              Home
            </Link>
            <Link href="/umkm" className="text-gray-600 hover:text-green-700">
              Jelajahi UMKM
            </Link>
            <Link href="/pemetaan" className="text-gray-600 hover:text-green-700">
              Pemetaan
            </Link>
            <Link href="/artikel" className="text-gray-600 hover:text-green-700">
              Artikel
            </Link>
          </div>

          {/* Tombol Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-800 hover:text-green-700 focus:outline-none focus:text-green-700"
              aria-label="toggle menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Panel Menu Dropdown Mobile */}
        <div className={`md:hidden mt-4 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-2">
            <Link href="/" className="px-3 py-2 text-gray-600 rounded-md hover:bg-yellow-100 hover:text-green-700">
              Home
            </Link>
            <Link href="/umkm" className="px-3 py-2 text-gray-600 rounded-md hover:bg-yellow-100 hover:text-green-700">
              Jelajahi UMKM
            </Link>
            <Link href="/pemetaan" className="px-3 py-2 text-gray-600 rounded-md hover:bg-yellow-100 hover:text-green-700">
              Pemetaan
            </Link>
            <Link href="/artikel" className="px-3 py-2 text-gray-600 rounded-md hover:bg-yellow-100 hover:text-green-700">
              Artikel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;